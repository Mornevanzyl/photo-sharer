import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCameraRetro } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <div className={'navbar'} >
      <Link className={'logo'} as={Link} to='/'><FontAwesomeIcon icon={faCameraRetro} /></Link>
      <Link className={'menu'} as={Link} to='/user'><FontAwesomeIcon icon={faUser} alt={"Hello"}/></Link>
    </div>
  )
}
