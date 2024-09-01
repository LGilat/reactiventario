import React, { useState, useEffect } from 'react';
import { FaBox, FaTruck, FaCalendar, FaDollarSign } from 'react-icons/fa';
import './DetallesPedidoView.css';

const DetallesPedidoView = () => {
    const [pedidoConDetalles, setPedidoConDetalles] = useState(null);

    useEffect(() => {
        // Aquí harías la llamada a tu API para obtener los datos del pedido y sus detalles
        fetch('http://localhost:3000/api/pedidocompra')
            .then(response => response.json())
            .then(data => {setPedidoConDetalles(data.items); console.log(data.items)})
            .catch(error => console.error('Error:', error));
    }, []);

    if (!pedidoConDetalles) return <div>Cargando...</div>;

    return (
        <div className="detalle-pedido-container">
            {pedidoConDetalles.map((pedido, index) => (
                <div key={index +1} className="pedido-section">
                    <h1><FaTruck /> Detalles del Pedido #{pedido.id}</h1>
                    <div className="pedido-info">
                        <p><FaCalendar /> Fecha: {pedido.fechaPedido}</p>
                        <p><FaDollarSign /> Total: {pedido.total}</p>
                        <p>Estado: {pedido.estado}</p>
                        <p>Proveedor: {pedido.proveedor.nombre}</p>
                    </div>
                    <h2>Productos</h2>
                    <table className="productos-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedido.detallePedidoCompra.map((detalle, detalleIndex) => (
                                <tr key={detalleIndex +1}>
                                    <td><FaBox /> {detalle.producto?.nombre}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>{detalle.precioUnitario}</td>
                                    <td>{detalle.cantidad * detalle.precioUnitario}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default DetallesPedidoView;
