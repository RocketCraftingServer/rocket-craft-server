
class structureDataGenerator {

  constructor(model) {
    this.model = model;
  }

  async onGeneratePostResponse(req, res) {
    // console.log("/rocket/register ", req.body.emailField)
    // var responseFlag = await this.dataAction.register(user, this)
    console.log("/rocket/generic/");
      res.status(200).json({
        message: "generic test wip",
        rocketStatus: "test"
      });
  }
}
module.exports = structureDataGenerator
