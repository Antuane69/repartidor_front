import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const API_URL = process.env.NEXT_PUBLIC_NODE_ENV == 'production' ? process.env.NEXT_PUBLIC_API_PRODUCTION_URL : process.env.NEXT_PUBLIC_API_LOCAL_URL;
export const API_SUFIJO_URL = process.env.NEXT_PUBLIC_API_SUFIJO;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// Se crea la instancia global de Axios con los sufijos
const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}/${API_SUFIJO_URL}`
});

// Control de estado de refresh para solo refrescar una, y de ahi pasarle el token a todas las peticiones pendientes
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

//Funcion de las peticiones que se tienen que hacer y que estan en cola
function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

//Funcion para añadir al array el callback de la peticion que tambien requiere el token actualizado
function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// Función para hacer la peticion de refrescar token
async function fetchRefreshToken(refreshToken?: string): Promise<TokenResponse> {
  const url = `oauth/token`;
  const body = new URLSearchParams({
    grant_type:    'refresh_token',
    refresh_token: refreshToken || '',
    client_id:     process.env.NEXT_PUBLIC_CLIENT_ID_LOCAL!,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET_LOCAL!,
    scope:         ''
  });
  const resp = await axios.post(
    `${API_URL}/${API_SUFIJO_URL}/${url}`,
    body.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return resp.data;
}

// Interceptor de request para añadir headers de token y de empresa
api.interceptors.request.use(config => {
  const token = Cookies.get('accessToken');
  if (token) config.headers!['Authorization'] = `Bearer ${token}`;

  const empresa = Cookies.get('empresaSeleccionada');
  if (empresa) config.headers!['X-Empresa-Seleccionada'] = empresa;

  return config;
});

// Interceptor de respuesta para manejar error 401 (no autentificado) y refrescar token
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise(resolve => {
          addRefreshSubscriber((newToken: string) => {
            originalRequest.headers!['Authorization'] = `Bearer ${newToken}`;
            resolve(api(originalRequest));
          });
        });
      }
      isRefreshing = true;
      try {
        const respuestaToken = await fetchRefreshToken(refreshToken);
        const expiresIn = respuestaToken.expires_in; 
        const expirationDate = new Date(Date.now() + expiresIn * 1000); 
        const expirationDateRefresh = new Date(Date.now() + (expiresIn * 5) * 1000);
        Cookies.set('accessToken', respuestaToken.access_token, { expires: expirationDate, path: '/' });
        Cookies.set('refreshToken', respuestaToken.refresh_token, { expires: expirationDateRefresh, path: '/' });

        onRefreshed(respuestaToken.access_token);
      } catch (e) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
      originalRequest.headers!['Authorization'] = `Bearer ${Cookies.get('accessToken')}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

// Función de uso general para toda la aplicacion
export default function axiosRequest<T = any>(
  method: HttpMethod,
  path: string,
  body: any = null,
  responseType?: any
): Promise<AxiosResponse<T>> {
  const empresa = Cookies.get('empresaSeleccionada') || '';
  const url = `${path}${path.includes('?') ? '&' : '?'}empresa_id=${empresa}`;
  return api.request<T>({
    method,
    url,
    data: body,
    responseType,
    headers: body instanceof FormData ? {} : { 'Content-Type': 'application/json' }
  });
}
