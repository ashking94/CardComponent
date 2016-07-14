var Card = React.createClass({displayName: "Card",
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var component = this;
    $.get("https://api.github.com/users/"+this.props.login,function(data) {
      component.setState(data);
    });
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("img", {src: this.state.avatar_url, width: "100"}), 
        React.createElement("h3", null, this.state.name), 
        React.createElement("hr", null)
      )
      );
  }
})
var Form = React.createClass({displayName: "Form",
  handleSubmit: function(e) {
    e.preventDefault();
    var loginInput = React.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value ='';
  },
  render: function() {
    return (
      React.createElement("form", {onSubmit: this.handleSubmit}, 
        React.createElement("input", {placeholder: "github login", ref: "login"}), 
        React.createElement("button", null, "Add")
      )
    );
  }
})

var Main = React.createClass({displayName: "Main",
  getInitialState: function() {
    return {logins: []};
  },
  addCard: function(loginToAdd){
    this.setState({logins:this.state.logins.concat(loginToAdd)});
  }
  ,
  render: function() {
    var cards = this.state.logins.map(function(login){
      return (React.createElement(Card, {login: login}));
    });
    return (
      React.createElement("div", null, 
        React.createElement(Form, {addCard: this.addCard}), 
        cards
      )
      )
  }
});

React.render(React.createElement(Main, null), document.getElementById("root"));