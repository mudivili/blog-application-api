const fs = require('fs');
const path = require('path');

const Ajv = require('ajv');

class Validator {

  constructor(formatError) {

    this.ajv = new Ajv({
      useDefaults: true,
      removeAdditional: 'all',
      allErrors: true
    });
    this.formatError = formatError;

  }

  async initialize() {

    const schemaFileNames = Validator.getSchemaFileNames();

    for (let fileName of schemaFileNames) {

      const schema = require(`./schemas/${fileName}`);

      this.ajv.addSchema(schema, schema.name);

    }

  }

  async validate(schemaName, data) {

    const validator = this.ajv.getSchema(schemaName);
    const valid = await validator(data);

    if (valid !== true) {
      throw this.formatError('ValidationError', validator.errors);
    }

  }

  static getSchemaFileNames() {

    const schemaFileNames = [];

    try {

      const files = fs.readdirSync(path.resolve('./lib/validator/schemas'));
      for (const file of files) {
        schemaFileNames.push(file);
      }

    } catch (error) {
      console.error(error);
    }

    return schemaFileNames;
  }

}

module.exports = Validator;