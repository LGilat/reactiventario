import React  from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import  Header  from './components/Header'
import  Home from './components/Home'
import  Proveedor from './components/Proveedor'
import  Cliente from './components/Cliente'
import  Producto from './components/Producto'
import  Pedido from './components/Pedido'
import  DetallesPedidoView from './components/DetallesPedidoView'

import './App.css'

function App() {
  

  return (
    
    <Router>
      <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<h1>About</h1>} />
      <Route path='/proveedor/nuevo' element={<Proveedor />} />
      <Route path='/cliente/nuevo' element={<Cliente />} />
      <Route path='/producto/nuevo' element={<Producto />} />
      <Route path='/pedido/nuevo' element={<Pedido />} />
      <Route path='/pedido/detalles' element={<DetallesPedidoView />} />
     </Routes>
    </Router>
      
  )
}

export default App
