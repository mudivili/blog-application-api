const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const buildRoutes = require('./routes');

class Server {

  constructor(config) {

    this.host = config.host;
    this.port = config.port;

    this.app = express();
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());
    this.app.use(cors());

  }

  async initialize(services) {

    const routes = buildRoutes(services);

    for (let route of routes) {

      const handler = Server.buildHandler(route);
      const methodName = route.method.toLowerCase();
      const routePath = route.path;

      this.app[methodName](routePath, handler);

    }

  }

  async start() {

    try {
      await this.app.listen(this.port);
    } catch (exception) {
      console.log('Failed to start server: ', exception);
    }

    console.log(`Server running on ${this.host}:${this.port}`);

  }

  static buildHandler(route) {

    return async function genericHandler(request, response, next) {

      const result = {
        success: true,
        data: null
      };

      try {

        const queryOptions = Server.constructQueryOptions(request.query);
        const params = request.params;

        const serviceResult = await route.handler(queryOptions, params, request.body);

        result.data = serviceResult;

      } catch (exception) {

        result.success = false;
        result.data = exception;

      }

      if (result.success === false) {
        response.status(500);
      }

      response.json(result);

    };

  }

  static constructQueryOptions(query) {

    if (typeof query.queryOptions === 'undefined') {
      return {};
    }

    try {

      return JSON.parse(query.queryOptions);

    } catch (exception) {
      return {};
    }

  }

}

module.exports = Server;