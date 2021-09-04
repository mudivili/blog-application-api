const { ObjectId } = require('mongodb');

class DatabaseInterface {

	constructor(database, formatError) {

		this.database = database;
		this.formatError = formatError;

	}

	async saveBlog(blog) {

		let result = null;

		try {
			blog.createdAt = Date.now();
			result = await this.database.collection('blogs').insert(blog);
			blog._id = result.insertedIds['0'];
		}
		catch(error) {
			throw this.formatError('Database Error', error.message, error.code);
		}

		return blog;

	}

	async fetchAllBlogs(queryOptions) {

		let result = null;
		let options = DatabaseInterface.transformQueryOptions(queryOptions);

		try {
			result = await this.database.collection('blogs').find({}, options).toArray();
		}
		catch(error) {
			throw this.formatError('Database Error', error.message, error.code);
		}

		return result;

	}

	async findBlogById(blogId) {

		let result = null;
		let _id = DatabaseInterface.toObjectId(blogId);

		try {
			result = await this.database.collection('blogs').findOne({
				_id
			});
		}
		catch(error) {
			throw this.formatError('Database Error', error.message, error.code);
		}

		return result;

	}

	static transformQueryOptions(queryOptions) {

		const options = {
			sort: []
		};

		if(typeof queryOptions.sortOptions.createdAt !== undefined) {
			options.sort.push(['createdAt', queryOptions.sortOptions.createdAt]);
		}

		return options;

	}

	static toObjectId(objectIdString) {

		if(typeof objectIdString !== 'string') {
			return null;
		}

		return ObjectId(objectIdString);

	}

}

module.exports = DatabaseInterface;