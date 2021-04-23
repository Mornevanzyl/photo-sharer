import React, { useState, useRef, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGooglePlusG, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { auth, google, facebook, twitter } from '../../firebase';


const Register = ({ history }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(async event => {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    };

    try {
      setError('');
      setLoading(true);
      await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError(error);
    };
    setLoading(false);
  }, [history]);

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

  return (
    <div className="container">
        <div className={"auth-container"} id="container">
            <div className={"form-container"}>
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <div className={"social-container"}>
                      <button className="social" onClick={handleFacebookSignIn} ><FontAwesomeIcon icon={faFacebookF} /></button>
                      <button className="social" onClick={handleGoogleSignIn} ><FontAwesomeIcon icon={faGooglePlusG} /></button>
                      <button className="social" onClick={handleTwitterSignIn} ><FontAwesomeIcon icon={faTwitter} /></button>
                    </div>
                    <span className={error ? 'alert' : ''} >{error ? error : 'or use your email for registration'}</span>
                    <input type="text" placeholder="Name" ref={nameRef} />
                    <input type="email" placeholder="Email" ref={emailRef} required />
                    <input type="password" placeholder="Password" ref={passwordRef} required />
                    <input type="password" placeholder="Confirm Password" ref={passwordConfirmRef} required />
                    <button type="submit" disabled={loading}>Sign Up</button>
                    <Link to='/login'>Been here before? Sign in</Link>
                </form>
            </div>
        </div>
    </div>
  );
};

export default withRouter(Register);
