module.exports = function buildRoutes(services) {

  return [{
    method: 'GET',
    path: '/',
    async handler(queryOptions, urlOptions, payload) {
      return { message: 'Wellcome to Blog Application API Server!' };
    }
  }, {
    method: 'GET',
    path: '/status',
    async handler(queryOptions, urlOptions, payload) {
      return { message: 'All good!' };
    }
  }, {
    method: 'GET',
    path: '/blog/list',
    async handler(queryOptions, urlOptions, payload) {
      return services.blogsService.getAllBlogs(queryOptions);
    }
  }, {
    method: 'POST',
    path: '/blog/create',
    async handler(queryOptions, urlOptions, payload) {
      return services.blogsService.createBlog(payload);
    }
  }, {
    method: 'GET',
    path: '/blog/:blogId',
    async handler(queryOptions, urlOptions, payload) {
      return services.blogsService.getBlogById(urlOptions);
    }
  }, {
    method: 'GET',
    path: '/blogs',
    async handler(queryOptions, urlOptions, payload) {
      return services.blogsService.getAllBlogs(queryOptions);
    }
  }, {
    method: 'POST',
    path: '/blogs',
    async handler(queryOptions, urlOptions, payload) {
      return services.blogsService.createBlog(payload);
    }
  }, {
    method: 'GET',
    path: '/blogs/:blogId',
    async handler(queryOptions, urlOptions, payload) {
      return services.blogsService.getBlogById(urlOptions);
    }
  }];

}