const ServiceBase = require('./base');

class BlogsService extends ServiceBase {

  constructor(databaseInterface, validator) {

    super('BlogsService', databaseInterface, validator);

  }

  async createBlog(blog) {

    await this.validator.validate('Blog', blog);

    return this.databaseInterface.saveBlog(blog);

  }

  async getAllBlogs(queryOptions) {

    await this.validator.validate('QueryOptions', queryOptions);

    return this.databaseInterface.fetchAllBlogs(queryOptions);

  }

  async getBlogById(options) {

    await this.validator.validate('GetBlogByIdInput', options);

    return this.databaseInterface.findBlogById(options.blogId);

  }

}


module.exports = BlogsService;