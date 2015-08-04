var Post = require('../models/post.js');

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = function(app) {

  findAllPosts = function(req, res) {
    console.log("GET - /posts");
    return Post.find(function(err, posts) {
      if(!err) {
        posts = posts.filter(function(p) { return p.visible === true})
        return res.send(posts);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };

  findByUrl = function(req, res) {
    return Post.findOne(req.params, function(err, post) {
      return res.send(post)
      // return res.render('show', {post: post});
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

  newPost = function(req, res) {
    res.render('editPost', {post: {}})
  };

  addPost = function(req, res) {
    console.log('POST - /posts');

    var post = new Post({
      title: req.body.title,
      // pretty_url: req.body.title.toLowerCase().split(' ').join('_'),
      pretty_url: cleanUrl(req.body.title),
      body: req.body.body,
      visible: true,
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
      return res.render('editPost', { status: 'OK', post:post })
    });
  }
  

  updatePost = function(req, res) {
    console.log(req, res)

    console.log("PUT - /posts/:id");
    return Post.findById(req.params.id, function(err, post) {

      if(!post) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.title != null) post.title = req.body.title;
      if (req.body.pretty_url != null) post.pretty_url = req.body.pretty_url;
      if (req.body.body != null) post.body = req.body.body;
      if (req.body.created_at != null) post.created_at = req.body.created_at;
      if (req.body.visible != null) post.visible = req.body.visible;

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

  // index
  app.get('/posts', findAllPosts);
  
  // create
  app.post('/posts', isAuthenticated, addPost);

  // new template
  app.get('/posts/new', isAuthenticated, newPost);

  // update template
  app.get('/posts/edit/:id', isAuthenticated, editPost);

  // show by name
  app.get('/posts/:pretty_url', findByUrl);
  // app.get('/posts/:id', findById);
  
  // update
  app.put('/posts/:id', isAuthenticated, updatePost);
  // delete
  app.delete('/posts/:id', isAuthenticated, deletePost);

}



function cleanUrl(url) {
  return url.split('.')
            .map(function(item) {return item.charAt(0).toUpperCase() + item.slice(1)}).join('')
            .split('_')
            .map(function(item) {return item.charAt(0).toUpperCase() + item.slice(1)}).join('')
}