const BlogsService = require('./blogs');

async function buildServicesMap(databaseInterface, validator) {

	const blogsService = new BlogsService(databaseInterface, validator);

	await blogsService.initialize();

	return {
		blogsService
	};
	
}

module.exports = buildServicesMap;