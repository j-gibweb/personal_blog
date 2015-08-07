var React = require('react');
var Auth = require('../services/auth');

var LoginView = React.createClass({
  getInitialState: function(){
    return {}
  },
  login: function(e) {
    e.preventDefault();
    Auth.login(this.state)
    .then(function(response, status, xhr) {
      // console.log(response.passport.user)
      response.passport.user ? localStorage.setItem('session', response.passport.user) : null ;
      window.history.back();
    });
  },
  logout: function() {
    localStorage.setItem('session', "");
    window.history.back();
  },
  update: function(){
    this.setState({
      username: this.refs.username.refs.inp.getDOMNode().value,
      password: this.refs.password.refs.inp.getDOMNode().value,
    });
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
          <form role="form" onSubmit={this.login}>
              <div className="form-group">
                  <label>Username:</label>
                  <LoginInput ref="username" type="text" name="username" update={this.update} />
              </div>
              <div className="form-group">
                  <label>Password:</label>
                  <LoginInput ref="password" type="password" name="password" update={this.update} />
              </div>
              <div className="form-group">
                  <button type="submit" className="btn btn-default">Log In</button>
              </div>
          </form>
          
          <form role="form" onSubmit={this.logout}>
            <div className="form-group">
                <button type="submit" className="btn btn-default">Log Out</button>
            </div>
          </form>
          
          </div>
        </div>
      </div>
    )
  }
});

var LoginInput = React.createClass({
  getInitialState: function() {
    return {value: ''};
  },
  render: function() {
    var value = this.state.value;
    return (
      <input ref="inp" type={this.props.type} name={this.props.name} className="form-control" 
        onChange={this.props.update} required />
      );
  }
});

module.exports = LoginView;