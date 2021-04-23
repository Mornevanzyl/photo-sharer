import React, { useRef, useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from 'react-router-dom';
import { auth, google, facebook } from '../../firebase';
import { AuthContext } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'


const Signin = ({ history }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(
    async () => {
      try {
        await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleGoogleSignIn = useCallback(
    async event => {
      event.preventDefault();
      try {
        await auth.signInWithPopup(google);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleFacebookSignIn = useCallback(
    async event => {
      event.preventDefault();
      try {
        await auth.signInWithPopup(facebook);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );


  // firebase.auth()
  // .signInWithPopup(provider)
  // .then((result) => {
  //   /** @type {firebase.auth.OAuthCredential} */
  //   var credential = result.credential;

  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   // ...
  // }).catch((error) => {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
        <div className={"auth-container"} id="container">
            <div className={"form-container"}>
                <form onSubmit={handleSignIn}>
                    <h1>Sign in</h1>
                    <div className={"social-container"}>
                        <button className="social" onClick={handleFacebookSignIn} ><FontAwesomeIcon icon={faFacebookF} /></button>
                        <button className="social" onClick={handleGoogleSignIn} ><FontAwesomeIcon icon={faGooglePlusG} /></button>
                        {/* <a href="#" className={"social"}><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#" className={"social"}><FontAwesomeIcon icon={faGooglePlusG} /></a>
                        <a href="#" className={"social"}><FontAwesomeIcon icon={faLinkedinIn} /></a> */}
                    </div>
                    <span className={error ? 'alert' : ''} >{error ? error : 'or use your account'}</span>
                    <input type="email" placeholder="Email" ref={emailRef} required />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                    <button type="submit" disabled={loading}>Sign In</button>
                    <Link to='/forgot-password'>Forgot your password?</Link>
                    <Link to='/signup'>New here? Join the community</Link>
                </form>
            </div>
        </div>
    </div>
  );
};

export default withRouter(Signin);
