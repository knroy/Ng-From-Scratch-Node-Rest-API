const asyncHandler = require('express-async-handler')
const tokenMod = require('./../authentication/token');

const categoryUtils = require('./category-utils');
const blogUtils = require('./blog-utils');

let createBlogPostApi = async (req, res) => {

    let params = req.body;

    let blogTitle = params.title;
    let blogDescription = params.description;
    let categories = params.categories || []

    let tokenData = tokenMod.decodeTokenFromRequest(req);
    let userId = tokenData.UserId;

    let blogId = await blogUtils.insertNewBlog(blogTitle, blogDescription, userId);

    let categoryIds = [];

    for (let i = 0; i < categories.length; i++) {
        let catName = categories[i];
        let categoryId = -1;
        categoryId = await categoryUtils.isCategoryNameAlreadyExists(catName);
        if (categoryId < 0) {
            categoryId = await categoryUtils.insertCategory(catName);
        }
        categoryIds.push(categoryId);
    }

    res.json();

}

let initCreateBlogPostApi = (app) => {
    app.post('/blog/create', asyncHandler(createBlogPostApi));
}

module.exports = initCreateBlogPostApi;
