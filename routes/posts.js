var Post = require('../models/post.js');

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

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
  findByUrl = function(req, res) {
    // console.log(req.params)
    return Post.findOne(req.params, function(err, post) {
      // console.log(post)
      // return res.send(post)
      return res.render('show', {post: post});
    })
  }

  findById = function(req, res) {
    console.log("GET - /posts/:id");
    return Post.findById(req.params.id, function(err, post) {

      if(!post) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        // return res.send({ status: 'OK', post:post });
        // console.log(post);
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
    res.render('postForm', {post: {}})
  };

  addPost = function(req, res) {
    console.log('POST - /posts');
    var post = new Post({
      title: req.body.title,
      pretty_url: req.body.title.toLowerCase().split(' ').join('_'),
      body: req.body.body,
      created_at: Date.now()
    });

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
      return res.render('postForm', { status: 'OK', post:post })
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
      if (req.body.created_at != null) post.created_at = req.body.created_at;

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

  // these have to be in order of hard paths first
  // then paths that take parameters -> /:id or /:name
  // I don't know why.

  // index
  app.get('/posts', findAllPosts);
  // create
  app.post('/posts', isAuthenticated, addPost);
  // new template
  app.get('/posts/new', isAuthenticated, newPost);
  // update template
  app.get('/posts/edit/:id', isAuthenticated, editPost);
  // show
  // app.get('/posts/:id', findById);
  // show by name
  app.get('/posts/:pretty_url', findByUrl);
  // update
  app.put('/posts/:id', updatePost);
  // delete
  app.delete('/posts/:id', isAuthenticated, deletePost);

}