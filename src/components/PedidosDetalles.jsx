import React, { useEffect, useState } from 'react'
import { FaTruck } from 'react-icons/fa';
import './PedidosDetalles.css'



const columnas = ["nombre", "descripcion", "categoria", "precioCompra", "precioVenta"];



const PedidoDetalles = ({ pedidoid, success }) => {

    const [productos, setProductos] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);


    const handleProductSelect = (producto) => {
        setSelectedProducts((prevSelectedProducts) => {
            if (prevSelectedProducts.some(p => p.id === producto.id)) {
                // Si ya está seleccionado, lo removemos
                return prevSelectedProducts.filter(p => p.id !== producto.id);
            } else {
                // Si no está seleccionado, lo añadimos
                return [...prevSelectedProducts, producto];
            }
        });
    };

    const handleProductDetailChange = (productId, fieldToUpdate, newValue) => {
        setSelectedProducts(currentProducts => {
            return currentProducts.map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        [fieldToUpdate]: newValue
                    };
                }
                return product;
            });
        });
    };


    const handleAddToOrder = () => {
        const orderDetails = selectedProducts.map(product => ({
            pedidoCompraId: pedidoid,
            productoId: product.id,
            cantidad: product.cantidad,
            precioUnitario: product.precioUnitario
        }));
        console.log('details order: ', orderDetails);

        fetch('http://localhost:3000/api/detallepedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Handle success (e.g., clear selected products, show success message)
                alert('Pedidos registrados correctamente');
                setSelectedProducts([]);
                success(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error
            });
    };


    useEffect(() => {
        fetch('http://localhost:3000/api/producto')
            .then(response => response.json())
            .then(data => {
                setProductos(data.items);

            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                console.log('Request completed');
            })

    }, []);


    if (productos === null || productos.length === 0) {
        return <div> <h1>No hay datos disponibles</h1></div>;
    }


    return (

        <div className='pedidos-detalles'>
            <h1 className='titulo pedido-title'> <FaTruck />  Pedido</h1>
            <table title='Tabla de Productos' className="productos-table">
                <thead>

                    <tr>
                        <th>Seleccionar</th>
                        {columnas?.map((columna, index) => (
                            <th key={index + 1}>{columna}</th>
                        ))}

                    </tr>

                </thead>
                <tbody>
                    {productos?.map((producto) => (
                        <tr key={producto.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    onChange={() => handleProductSelect(producto)}
                                    checked={selectedProducts.some(p => p.id === producto.id)}
                                />
                            </td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.precioCompra}</td>
                            <td>{producto.precioVenta}</td>

                        </tr>
                    ))}
                </tbody>
                <tfoot>

                </tfoot>
            </table>

            {selectedProducts.length > 0 && (
                <div className='productos-seleccionados'>
                    <h2>Productos seleccionados</h2>
                    <div className="producto-list-detalles">
                        <span>Cantidad</span><span>Precio unitario</span>
                    </div>
                    {selectedProducts.map(product => (
                        <div key={product.id} className="producto-item">
                            <span>{product.nombre}</span>
                            <input
                                className="producto-input"
                                type="number"
                                value={product.cantidad}
                                onChange={(e) => handleProductDetailChange(product.id, 'cantidad', parseInt(e.target.value))}
                            />
                            <input
                                className="producto-input"
                                type="number"
                                value={product.precioUnitario}
                                onChange={(e) => handleProductDetailChange(product.id, 'precioUnitario', parseFloat(e.target.value))}
                            />
                        </div>
                    ))}

                    <button className='add-product-btn' onClick={handleAddToOrder}>
                        Agregar productos al pedido
                    </button>
                </div>
            )}
        </div>

    )
}

export default PedidoDetalles;