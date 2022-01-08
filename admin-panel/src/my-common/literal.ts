
export namespace API {

  export const JSON_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  export const constructDomain = () => {
    return location.protocol + '//' + location.host + '/'
  }

  export const constructDomainForceHTTP = () => {
    return 'http:' + '//' + location.host + '/'
  }

  export const constructMaximumroulette = () => {
    return 'http://maximumroulette.com/'
  }

}