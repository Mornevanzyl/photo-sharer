import React, { useRef, useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from 'react-router-dom';
import { auth, google, facebook, twitter } from '../../firebase';
import { AuthContext } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGooglePlusG, faTwitter } from '@fortawesome/free-brands-svg-icons'


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

  const handleTwitterSignIn = useCallback(
    async event => {
      event.preventDefault();
      try {
        await auth.signInWithPopup(twitter);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

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
                        <button className="social" onClick={handleTwitterSignIn} ><FontAwesomeIcon icon={faTwitter} /></button>
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
