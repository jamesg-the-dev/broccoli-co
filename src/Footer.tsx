import React from 'react'
import Twitter from './assets/twitter.svg'
import Instagram from './assets/instagram.svg'
import './Footer.css'
import { brandName } from './constants'
function Footer() {
  const date = new Date()
  return (
    <footer data-testid='footer'>
      <div className="footer__container d-flex justify-center">
        <div className='d-flex d-flex--column align-center'>
          <span>&copy; {date.getFullYear()} {brandName}</span>
          <div className='text--md footer__icons'>
            <a href="/">
              <img className='footer__icon' data-testid='twitter-icon' src={Twitter} alt="Twitter Icon" />
            </a>
            <a href="/">
              <img className='footer__icon' data-testid='instagram-icon' src={Instagram} alt="Instagram Icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer