const createBlog = require('./create-blog');
const blogs = require('./read-blog');

let initBlogModule = (app) => {
    createBlog(app);
    blogs(app);
}

module.exports = (app) => {
    initBlogModule(app);
}
