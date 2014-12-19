var Post = require('../models/post.js');

module.exports = function(app) {

  /**
   * Find and retrieves all posts
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllPosts = function(req, res) {
    console.log("GET - /posts");
    return Post.find(function(err, posts) {
      if(!err) {
        return res.send(posts);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  /**
   * Find and retrieves a single post by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findById = function(req, res) {

    console.log("GET - /posts/:id");
    return Post.findById(req.params.id, function(err, post) {

      if(!post) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        // return res.send({ status: 'OK', post:post });
        return res.render('show', {post: post});
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };


  /**
   * Creates a new post from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  newPost = function(req, res) {
    res.render('newPost')
  };

  addPost = function(req, res) {

    console.log('POST - /posts');

    var post = new Post({
      title:    req.body.title,
      body:    req.body.body
    });

    console.log(req.body)
    post.save(function(err) {

      if(err) {

        console.log('Error while saving post: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Post created");
        return res.send({ status: 'OK', post:post });

      }

    });

  };


  editPost = function(req, res) {
    return Post.findById(req.params.id, function(err, post) {
      return res.render('newPost', {post: post})
    });
  }
  /**
   * Update a post by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updatePost = function(req, res) {

    console.log("PUT - /posts/:id");
    return Post.findById(req.params.id, function(err, post) {

      if(!post) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.title != null) post.title = req.body.title;
      if (req.body.body != null) post.body = req.body.body;

      return post.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', post:post });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(post);

      });
    });
  };



  /**
   * Delete a post by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deletePost = function(req, res) {

    console.log("DELETE - /posts/:id");
    return Post.findById(req.params.id, function(err, post) {
      if(!post) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return post.remove(function(err) {
        if(!err) {
          console.log('Removed post');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }

  //Link routes and actions
  // index
  app.get('/posts', findAllPosts);
  // show
  app.get('/posts/:id', findById);
  // new template
  app.get('/posts/new', newPost);
  // create
  app.post('/posts', addPost);
  // update template
  app.get('/posts/edit/:id', editPost);
  // update
  app.put('/posts/:id', updatePost);
  // delete
  app.delete('/posts/:id', deletePost);

}