const { MongoClient } = require('mongodb');

const DatabaseInterface = require('./interface');

class DatabaseBridge {

  constructor(options, formatError) {

    const uri = DatabaseBridge.buildURI(options);

    this.client = new MongoClient(uri);
    this.database = null;
    this.databaseName = options.name;
    this.formatError = formatError;
    this.interface = null;

  }

  async initialize() {

    await this.client.connect();

    this.database = this.client.db(this.databaseName);
    this.interface = new DatabaseInterface(this.database, this.formatError);

    console.log('Database connected!');

  }

  static buildURI(options) {

    if (options.srv === true) {
      return `mongodb+srv://${options.username}:${options.password}@${options.host}/?retryWrites=true&w=majority`;
    }

    return `mongodb://${options.username}:${options.password}@${options.host}:${options.port}/?retryWrites=true&w=majority`;

  }

}

module.exports = DatabaseBridge;