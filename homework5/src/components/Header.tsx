import React from 'react'
import logo from '../img/logo.png'
import { StyledHeader } from './styles/Header.styled'

function Header() {
	return (
		<StyledHeader>
			<div className='header-logo-div'>
				<a href='#'>
					<img src={logo} alt='Logo' />
				</a>
			</div>

			<ul className='header-buttons-ul'>
				<li>
					<a href="#">Register</a>
				</li>
				<li>
					<a href="#">Login</a>
				</li>
			</ul>

		</StyledHeader>
	)
}

export default Header