import React from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaBrain, FaTruck, FaBook,FaClipboardList } from 'react-icons/fa'
import './Home.css'




const Home = () => {
  return (
    <div className="home-container">
        <div className="hero-section">
            <img src="../src/assets/job_image_5.jpg" alt="Imagen frontal" className="hero-image front-image" />
            <div className="hero-content">
                <h1> <FaBook className='hero-icon'/> Sistema de Inventario</h1>
                <hr />
                <p>Flash Notes es una aplicación web que te permite crear y gestionar notas de manera sencilla y eficiente.</p>
                <p>Regístrate o inicia sesión para comenzar a utilizar Flash Notes.</p>
            </div>
            <img src="../src/assets/carpentry.jpg" alt="Imagen trasera" className="hero-image back-image" />
        </div>
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

        <div className='section-pedido'>
            <div className="card">
                <h2><FaTruck /> Pedido</h2>
                <p>Gestiona tus pedidos</p>
                <Link to="/pedido/nuevo" className="quick-link">Nuevo Pedido</Link>
             </div>

             <div className="card">
                <h2><FaClipboardList /> Ver Pedidos</h2>
                <p>Consulta y gestiona tus pedidos</p>
                <Link to="/pedido/detalles" className="quick-link">Ver Pedidos</Link>
            </div>
        </div>

        
    </div>
  )
}

export default Home