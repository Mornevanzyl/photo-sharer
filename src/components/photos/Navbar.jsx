import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authentication/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={'navbar'} >
      <div className="logo">
        <Link className={'logo-text'} as={Link} to='/'>phot </Link>
        <img src={process.env.PUBLIC_URL + '/aperture18.png'} alt="Aperture" />
        <Link className={'logo-text'} as={Link} to='/'>  share</Link>
      </div>
      <div>
        <span className={"user"}>{currentUser.displayName ? currentUser.displayName : currentUser.email }</span>
        <Link className={'menu'} as={Link} to='/user'><FontAwesomeIcon icon={faUser} alt={"Hello"}/></Link>
      </div>
    </div>
  )
}