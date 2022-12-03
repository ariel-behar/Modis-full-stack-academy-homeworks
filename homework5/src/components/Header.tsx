import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/logo.png'
import { StyledHeader } from './styles/Header.styled'

function Header() {
	return (
		<StyledHeader>
			<div className='header-logo-div'>
				<Link to='/'>
					<img src={logo} alt='Logo' />
				</Link>
			</div>

			<ul className='header-buttons-ul'>

				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
			</ul>

		</StyledHeader>
	)
}

export default Header