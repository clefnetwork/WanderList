import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {userAuth, fetchUserInfo} from '../actions/index';
import {Link, browserHistory} from 'react-router';


export class Login extends Component {
   constructor(props){
    super(props);
    Login.context = this.props;
    this.socialLogin = this.socialLogin.bind(this);
    this.provider = null;
  }
  static contextTypes = {
    router: PropTypes.object
  };

  emailSignIn(prop) {
    firebase.auth().signInWithEmailAndPassword(prop.username, prop.password).then(function(result) {
      alert("Logged in")
      var user = firebase.auth().currentUser;
      var userData = user.providerData[0]
      var userDataStorage = {
        displayName: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        userId: userData.uid
      };
      Login.context.userAuth(userDataStorage);
    }).catch(function(error) {
      alert(error.message)
    });
  }

  setProvider(providerName, props) {
    switch(providerName) {
      case 'Google':
        this.provider = new firebase.auth.GoogleAuthProvider();
        this.socialLogin(props);
        break;
      case 'Facebook':
        this.provider = new firebase.auth.FacebookAuthProvider();
        this.socialLogin(props);
        break;
      case 'Github':
        this.provider = new firebase.auth.GithubAuthProvider();
        this.socialLogin(props);
        break;
      default:
        throw new Error('providerName is not valid -_-');
    }
  }

  socialLogin(props) {
    firebase.auth().signInWithPopup(this.provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = firebase.auth().currentUser;
      var userData = user.providerData[0]
      var userDataStorage = {
        displayName: userData.displayName,
        email: userData.email,
        photo: userData.photoURL,
        userId: user.uid
      };



      Login.context.userAuth(userDataStorage);
      let logged = {logged: true};
      let userId = {userId: userDataStorage.userId}
      localStorage.setItem('logged', JSON.stringify(logged));
      localStorage.setItem('userId', JSON.stringify(userId));
      props.fetchUserInfo(userId.userId);
      browserHistory.push('/');
    }).catch(function(error) {
      alert(error.message)
    });
  }

  render() {
    const {fields: {username, password}, handleSubmit, resetForm} = this.props;
    return (
      <div>
        <h2>Login</h2>
          <button onClick={this.setProvider.bind(this, 'Google', this.props)} className="btn btn-block btn-social btn-google">
            <span className="fa fa-google" /> Sign in with Google
          </button>

          <button onClick={this.setProvider.bind(this, 'Facebook', this.props)} className="btn btn-block btn-social btn-facebook">
            <span className="fa fa-facebook" /> Sign in with Facebook
          </button>

          <button onClick={this.setProvider.bind(this, 'Github', this.props)} className="btn btn-block btn-social btn-github">
            <span className="fa fa-github" /> Sign in with Github
          </button>

        <form className="form-actions" onSubmit={handleSubmit(this.emailSignIn.bind(this))}>
          <div className="form-group">
            <label>Username</label>
            <input type="username" className="form-control" {...username}/>
          </div>

          <div>
            <label>Password</label>
            <input type="password" className="form-control" {...password}/>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>

          <Link to="/">
            <button type="button" className="btn btn-error">
              Cancel
            </button>
          </Link>
            Need an account?
          <Link to="/signup" className="btn btn-error">
            Sign up
          </Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authStatus: state.auth.authState
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ userAuth, fetchUserInfo }, dispatch);
}


export default reduxForm({
  form: 'loginForm',
  fields: ['username', 'password']
}, mapStateToProps, {userAuth, fetchUserInfo})(Login);
