import React, { useContext } from 'react'
import logo from './styles/chizetteLogo.jpg'
import ColorString from '../helpers/ColorString'
import { ThemeContext } from "../../context/themeContext"

// Styles
import './styles/Navbar.css'

const Navbar = ({ toggleLoginForm, secretLogin }) => {
  // Contexts
  const { checked } = useContext(ThemeContext)

  // Admin — Login form
  secretLogin = (ev) => {
    ev.preventDefault()
    return toggleLoginForm()
  }

  return (
    <div
      className="Navbar"
      style={{
        backgroundColor: checked ? '#242424' : '#FFFFFF'
      }}
    >
      <a className="anchorToHome" href="/">
        <img className="logo" src={logo} alt="logo"></img>
      </a>
        <h1 className="chizetteArt">
          <span className="chizette">
            <ColorString 
              string={'chizette'}
              duration={.875}
            />
          </span>
          <span className="A" onClick={(e) => secretLogin(e)}>A</span>
          <span className="r">r</span>
          <span className="t">t</span>
        </h1>
    </div>
  )
}

export default Navbar