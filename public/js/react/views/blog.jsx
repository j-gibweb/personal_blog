

var Blog = React.createClass({
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
      posts.push(<Post id={post._id} title={post.title} pretty_url={post.pretty_url} body={post.body} />)
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

var Post = React.createClass({
  getInitialState: function(){
    return {}
  },
  render: function() {
    var url = '/posts/' + this.props.pretty_url
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
})

React.render(<Blog source="/posts" />, document.getElementById('blog'));
