
export namespace API {

  export const JSON_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  export const constructDomain = () => {
    return location.protocol + '//' + location.host + '/'
  }

}