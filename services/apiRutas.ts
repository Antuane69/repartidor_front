export const API_RUTAS = {
  me: `user/me`,
	passwordReset: `forgot-password-api`,
  oauthToken: `oauth/token`,
  oauthTokenRefresh: `oauth/token/refresh`,
  accesos: (usuario: string) => `usuarios/${usuario}/accesos`,
	sistemas: {
    index: `sistemas`,
    show: (sistemaID: string | number) => `sistemas/${sistemaID}`,
    store: `sistemas`,
    update: (sistemaID: string | number) => `sistemas/${sistemaID}`,
    destroy: (sistemaID: string | number) => `sistemas/${sistemaID}`,
		modulos: {
			index: (sistemaID: string | number) => `sistemas/${sistemaID}/modulos`,
			store: (sistemaID: string) => `sistemas/${sistemaID}/modulos`,
			update: (sistemaID: string | number, moduloID: string | number) => `sistemas/${sistemaID}/modulos/${moduloID}`,
			destroy: (sistemaID: string | number, moduloID: string | number) => `sistemas/${sistemaID}/modulos/${moduloID}`,
			permisos: {
				index: (sistemaID: string | number, moduloID: string | number) => `sistemas/${sistemaID}/modulos/${moduloID}/permisos`,
				show: (sistemaID: string | number, moduloID: string | number, permisoID: string | number) => `sistemas/${sistemaID}/modulos/${moduloID}/permisos/${permisoID}`,
				store: (sistemaID: string | number, moduloID: string | number) => `sistemas/${sistemaID}/modulos/${moduloID}/permisos`,
				update: (sistemaID: string | number, moduloID: string | number, permisoID: string | number) => `sistemas/${sistemaID}/modulos/${moduloID}/permisos/${permisoID}`,
				destroy: (sistemaID: string | number, moduloID: string | number, permisoID: string | number) => `sistemas/${sistemaID}/modulos/${moduloID}/permisos/${permisoID}`,
			},
		},
  },
} as const;
