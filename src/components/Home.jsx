import React from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaBrain, FaTruck } from 'react-icons/fa'
import './Home.css'




const Home = () => {
  return (
    <div className="home-container">
      <h1>Sistema de Inventario</h1>
      <p>Flash Notes es una aplicación web que te permite crear y gestionar notas de manera sencilla y eficiente.</p>
      <p>Regístrate o inicia sesión para comenzar a utilizar Flash Notes.</p>
      <div className="quick-links">
            <div className="card">
                <h2><FaBox /> Productos</h2>
                <p>Gestiona tu catálogo de productos</p>
                <Link to="/producto/nuevo" className="quick-link">Nuevo Producto</Link>
            </div>
            <div className="card">
                <h2><FaTruck /> Proveedores</h2>
                <p>Administra tus proveedores</p>
                <Link to="/proveedor/nuevo" className="quick-link">Nuevo Proveedor</Link>
                </div>
            
            <div className="card">
                <h2><FaBrain /> Cliente</h2>
                <p>Gestiona tus clientes</p>
                <Link to="/cliente/nuevo" className="quick-link">Nuevo Cliente</Link>
            </div>


        </div>
    </div>
  )
}

export default Home