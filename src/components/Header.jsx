import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'


const Header = () => {
  return (
    <header className='header'>    
        <div className="logo">
            <h1> INVENT TRACK </h1>
        </div>
        <nav className="nav-menu">
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="">Inventario</Link></li>
                <li><Link to="">Informes</Link></li>
                <li><Link to="">Configuración</Link></li>
            </ul>
        </nav>
        <div className="user-menu">
            <span className="user-name">Usuario</span>
            <button className="logout-btn">Cerrar sesión</button>
      </div>
    </header>  
  )
}

export default Header