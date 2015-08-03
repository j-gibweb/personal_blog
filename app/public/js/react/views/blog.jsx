var React = require('react');
var Router = require('react-router-component');
var Link = require('react-router-component');
var $ = require('jquery');



console.log("Blog is a go..")




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
          <Location path="/posts" source="/posts" handler={BlogView} />
          <Location path="/posts/:prettyUrl" handler={PostShowView} />
        </Locations>
      </div>
      );
  }
});

var BlogView = React.createClass({
  getInitialState: function() {
    return {
      posts: []
    }
  },
  componentDidMount: function() {
    $.get(this.props.source, function(data) {
      if (this.isMounted()) {
        this.setState({
          posts: data
        })
      }
    }.bind(this))
  },
  render: function() {
    var posts = []
    this.state.posts.forEach(function(post) {
      posts.push(<PostView id={post._id} title={post.title} pretty_url={post.pretty_url} body={post.body} />)
    })
    return (
      <div>
      <div className="container">
        <div className="col-lg-8 col-lg-offset-2">
          <div className="clearfix"></div>
          <h1>my thoughts on things</h1><hr />
          {posts}
        </div>
      </div>
      </div>
      );
  }
});

var PostView = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function() {
    var url = '#/posts/' + cleanUrl(this.props.pretty_url)
    return (
      <div>
        <h4 className='title tiny-text'>{this.props.title}</h4>
        <p className='title tiny-text'>
          <a href={url}>{this.props.id}</a> - {this.props.body.split(' ').length} words
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
    $.get('/posts/' + this.props.prettyUrl)
    .then(function(data, status, xhr) {
      if (this.isMounted() && status == 'success') {
        this.setState({
          post: data
        })
      } else {
        console.log(status)
      }
    }.bind(this));
  },
  componentDidMount: function() {
    
    // syntax highlightage
    setTimeout(function() {
      Array.prototype.slice.call(document.getElementsByTagName('pre')).forEach(function(item) {
        console.log(item)
        hljs.highlightBlock(item);
      })
    }, 1000) // the actual worst shit ever
    
  },
  render: function() {
    return (
      <div>
        <div className="container">
          <div className="col-lg-8 col-lg-offset-2">
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