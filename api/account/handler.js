
class RocketRouteHandler {

  constructor(crypto, callerInstance) {

    this.crypto = crypto;
    callerInstance.testCall()

  }

  onRegisterResponse(data) {
    console.log("RocketRouteHandler", data)
  }

}

module.exports = (crypto, callerInstance) => { return new RocketRouteHandler(crypto, callerInstance) }