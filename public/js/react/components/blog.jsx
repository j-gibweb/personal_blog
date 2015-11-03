var React = require('react');
var Router = require('react-router-component');
var Link = require('react-router-component');
var $ = require('jquery');

var LoginView = require('./login.jsx');


var AppActions = require('../actions/app-actions');
var AppStore = require('../stores/app-stores');



var Locations = Router.Locations;
var Location = Router.Location;

var App = React.createClass({
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      <div>
        <Locations hash>
          <Location path="/" source="/posts" handler={BlogView} />
          <Location path="/login" handler={LoginView} />
          <Location path="/posts" handler={BlogView} />
          <Location path="/posts/:prettyUrl" handler={PostShowView} />
        </Locations>
      </div>
      );
  }
});

var BlogView = React.createClass({
  getInitialState: function() {
    return {
      posts: [],
      loggedIn: false
    }
  },

  componentDidMount: function() {
    
    AppStore.getPosts().then(function(data) {
      if (this.isMounted()) {
        this.setState({
          posts: data
        });
      }  
    }.bind(this));
    if (localStorage.session) {
      this.setState({loggedIn: true});
    }
  },
  newPost: function(event) {
    event.preventDefault();
    
    // all of this is shit, I know, I'm learning
    $.ajax({
      url: '/posts/new',
      type: 'GET',
      success: function(resp, status, xhr) {
        // console.log(resp, status, xhr)
        window.location.href = '/posts/new'
      },
      error: function(resp, status, reason) {
        // console.log(resp, status, reason);
        window.location.href = '#/login'
      }
    });

  },
  render: function() {
    var self = this;
    var posts = this.state.posts.map(function(post) {
      return (
        <PostView id={post._id} title={post.title} pretty_url={post.pretty_url} 
                  body={post.body} loggedIn={self.state.loggedIn} />
        )
    });
    return (
      <div className="container">
        <div className="col-lg-8 col-lg-offset-2">
          <div className="clearfix"></div>
          {this.state.loggedIn ? <a onClick={this.newPost} className='btn btn-default pull-left'>NEW POST</a> : null }
          <h1>my thoughts on things</h1><hr />
          {posts}
        </div>
      </div>
      );
  }
});

var PostView = React.createClass({
  getInitialState: function(){
    return {}
  },
  deletePost: function(event) {
    var self = this;
    event.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: 'posts/' + self.props.id,
    }).done(function() {
      var node = self.getDOMNode();
      React.unmountComponentAtNode(node);
      $(node).remove();
    });

  },
  render: function() {
    var url = '#/posts/' + cleanUrl(this.props.pretty_url);
    // console.log(this.props.loggedIn)
    return (
      <div>
        <h4 className='title tiny-text'>{this.props.title}</h4>
        <p className='title tiny-text'>
          <a href={url}>
            {this.props.id}
          </a> 
          - {this.props.body.split(' ').length} words
          
          {this.props.loggedIn ? <div className="pull-left">
            <a href={'/posts/edit/' + this.props.id} className='btn btn-default'>EDIT</a>
            <button onClick={this.deletePost} className='deletePost btn btn-default'>DELETE</button>
            </div> : null}

        </p>
        <hr />
      </div>
    )
  }
});


var PostShowView = React.createClass({
  getInitialState: function(){
    return {post: {}}
  },
  componentWillMount: function() {
    var resp = AppStore.getPost(this.props.prettyUrl)
      .then(function(data) {
        this.setState({
          post: data
        });
      }.bind(this))
    
  },
  componentDidMount: function() {
    
    // syntax highlightage
    setTimeout(function() {
      Array.prototype.slice.call(document.getElementsByTagName('pre'))
      .forEach(function(item) {
        hljs.highlightBlock(item);
      })
    }, 1000) // the actual worst shit ever
    
  },
  goBack: function() {
    window.location.href = "#/";
  },
  render: function() {
    return (
      <div>
        <div className="container">
          <div className="col-lg-8 col-lg-offset-2">
            <button onClick={this.goBack} className="backBtn">&lt;</button>
            <h1>{this.state.post.title}</h1>
            <p style={{textAlign:'left'}} dangerouslySetInnerHTML={{__html: this.state.post.body}} />
          </div>
        </div>
      </div>
    )
  }
});


React.render(<App />, document.getElementById('blog'));


function cleanUrl(url) {
  return url.split('.')
            .map(function(item) {return item.charAt(0).toUpperCase() + item.slice(1)}).join('')
            .split('_')
            .map(function(item) {return item.charAt(0).toUpperCase() + item.slice(1)}).join('')
}