class ServerError extends Error {

  constructor(name, message, code) {

    super(name, message, code);

    this.name = name;
    this.message = message;
    this.code = code;

  }

  toString() {

    return JSON.stringify({
      name: this.name,
      message: this.message,
      code: this.code
    });

  }

  static formatError(name, message, code) {

    return new ServerError(name, message, code);

  }

  static formatValidationError(name, errors) {

    return new ValidationError(name, errors);

  }

}

class ValidationError extends ServerError {

  constructor(name, errors) {

    super(name, errors);

    this.errors = errors;

  }

  toString() {

    return JSON.stringify({
      name: this.name,
      message: this.message,
      code: this.code,
      errors: this.errors
    });

  }

}

module.exports = ServerError;