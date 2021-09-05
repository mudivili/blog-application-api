class ServiceBase {

  constructor(name, databaseInterface, validator) {
    this.name = name;
    this.databaseInterface = databaseInterface;
    this.validator = validator;
  }

  async initialize() {
    await this.doInitialize();
  }

  async doInitialize() {

    console.log(`Service: ${this.name} is initialized`);

  }

}

module.exports = ServiceBase;