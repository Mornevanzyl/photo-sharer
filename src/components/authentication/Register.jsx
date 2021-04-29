import React, { useState, useRef, useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';

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
      await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        let user = auth.currentUser
        if(user){
          user.updateProfile({
             displayName: nameRef.current.value
          })
          .then(() => {
            history.push("/");
          })
          .catch(err => {setError(err.message)})
        }
      });
    } catch (err) {
      setError(err.message);
    };
    setLoading(false);
  }, [history]);

  return (
    <div className="container">
        <div className={"auth-container"} id="container">
            <div className={"form-container"}>
                <h1>Create Account</h1>
                <form onSubmit={handleSignUp}>
                    <p className={error ? 'alert' : ''} >{error ? error : 'fields marked with * required'}</p>
                    <input type="text" placeholder="Display Name*" ref={nameRef} required />
                    <input type="email" placeholder="Email*" ref={emailRef} required />
                    <input type="password" placeholder="Password*" ref={passwordRef} required />
                    <input type="password" placeholder="Confirm Password*" ref={passwordConfirmRef} required />
                    <button type="submit" disabled={loading}>Sign Up</button>
                </form>
                <Link to='/login'>Been here before? Sign in</Link>
            </div>
        </div>
    </div>
  );
};

export default withRouter(Register);
