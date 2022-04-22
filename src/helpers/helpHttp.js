export const helperHttp = () => {
  const customFetch = (endpoint, options) => {
    //defino cabecera por defecto
    const defaultHeaders = {
      accept: 'application/json',
    }

    // para definir una forma de abortar la petición si existe algún error
    const controller = new AbortController()
    options.signal = controller.signal

    // Trabajo de los métodos de la petición
    options.method = options.method || 'GET'

    // Para combinar los headers que especifique el usuario + los definidos en el helper
    options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders

    // conversión del body a JSON si el usuario especifica un metodo POST
    options.body = JSON.stringify(options.body) || false
    if (!options.body) delete options.body

    //console.log(options)
    //setTimout + controller para abortar la petición transcurrido el tiempo de espera
    setTimeout(() => controller.abort(), 5000)

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || '00',
              statusText: res.statusText || 'Ocurrió un error',
            }),
      )
      .catch((err) => err)
  }
  // método para ejecutar las peticiones get
  const get = (url, options = {}) => customFetch(url, options)
  // método para ejecutar las peticiones post
  const post = (url, options = {}) => {
    options.method = 'POST'
    return customFetch(url, options)
  }
  // método para ejecutar las peticiones put
  const put = (url, options = {}) => {
    options.method = 'PUT'
    return customFetch(url, options)
  }
  // método para ejecutar las peticiones delete
  const del = (url, options = {}) => {
    options.method = 'DELETE'
    return customFetch(url, options)
  }

  return {
    get,
    post,
    put,
    del,
  }
}
