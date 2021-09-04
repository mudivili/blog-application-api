const config = require('config');

const ServerError = require('./error');
const DatabaseBridge = require('./database');
const Validator = require('./lib/validator');
const Server = require('./server');

const buildServicesMap = require('./lib/services');

async function main() {

	const databaseBridge = new DatabaseBridge(config.database, ServerError.formatError);
	const validator = new Validator(ServerError.formatValidationError);
	const server = new Server(config.server);

	await databaseBridge.initialize();
	await validator.initialize();
	
	const services = await buildServicesMap(databaseBridge.interface, validator);
	await server.initialize(services);

	await server.start();
	
}

main();
