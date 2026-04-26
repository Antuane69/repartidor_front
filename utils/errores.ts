export const obtenerMensajeError = (error: any) => {
  console.log(error);
  let mensajeError = "Ocurrio un error desconocido, revisar los logs.";

  if (typeof error.error === "object") {
    mensajeError = Object.values(error.error).flat().join(", "); 
	} else if(typeof error?.response?.data?.error == "object"){
		mensajeError = Object.values(error?.response?.data?.error).flat().join(", "); 
  } else if(error?.response?.data?.error){
		mensajeError = error?.response?.data?.error; 
  } else if(error?.response?.data?.message){
		mensajeError = error?.response?.data?.message; 
  } else if (error?.message) {
    mensajeError = error.message;
  } else if (error?.error) {
    mensajeError = error.error;
  }

  return mensajeError;
}
