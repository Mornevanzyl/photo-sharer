import React, { useState, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { withRouter } from "react-router";
import { AuthContext } from './AuthContext';


const Profile = ({ history }) => {
  const [error, setError] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleLogout = useCallback(async event => {
    event.preventDefault();

    try {
      setError('');
      await auth.signOut();
      history.push("/");
    } catch (error) {
      setError(error);
    };
  }, [history]);

  return (
    <div className="container">
      <div className={"auth-container"} id="container">
        <div className={"form-container"}>
            <div className={"profile-info"}>
                <h1>User Profile</h1>
                <span className={error ? 'alert' : ''} >{error ? error : `update info for ${currentUser.email} below`}</span>
                <strong>Email:</strong> {currentUser.email}
                <button onClick={handleLogout}>Log Out</button>
                <Link to='/update-profile'>Update Profile</Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default withRouter(Profile);

