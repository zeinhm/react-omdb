import React from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../../../assets/react-logo.png'
import './styles.scoped.css'

export default function Navbar() {
  return (
    <div className='navbar'>
      <Link to='/'><span><img src={reactLogo} alt=""/></span> React OMDb</Link>
    </div>
  )
}
