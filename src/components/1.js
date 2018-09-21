
const { Component } = React;
const { Provider, connect } = ReactRedux;
const {
  createStore,
  applyMiddleware
} = Redux;
const {
  Field,
  Control,
  Form,
  combineForms,
  actions
} = ReactReduxForm;
const thunk = ReduxThunk.default;
const logger = reduxLogger();

const initialUserState = {
  firstName: '',
  lastName: '',
};

const randomUsers = [
  {firstName: "John", lastName: "Snow"},
  {firstName: "Bilbo", lastName: "Baggins"},
  {firstName: "Super", lastName: "Mario"},
  {firstName: "Arthur", lastName: "Dent"},
];

const store = createStore(combineForms({
  user: initialUserState,
}), applyMiddleware(thunk));

class UserForm extends Component {
  handleSubmit(values) {
    console.log(values);
  }
  changeUser() {
    this.props.setDefaultUser(
       randomUsers[Math.floor(Math.random()*randomUsers.length)]
    )
  }
  render() {
    return (
      <Form
        model="user"
        onSubmit={(values) => this.handleSubmit(values)}
      >
        <div className="field">
          <label>First name:</label>
          <Control.text model="user.firstName"  />
        </div>

        <div className="field">
          <label>Last name:</label>
          <Control.text model="user.lastName" />
        </div>

        <button type="submit">
          Submit
        </button>
        <br/>
        <button onClick={this.changeUser.bind(this)}>
          Change Defaults
        </button>
      </Form>
    )
  }
}

const mapDispatchToProps = {
  setDefaultUser: (values) => actions.merge('user', values)
}
const ConnectedForm = connect(null, mapDispatchToProps)(UserForm);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedForm />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));