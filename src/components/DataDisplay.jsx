import React, { useState, useEffect } from 'react';
import { FaTable, FaEdit, FaTrash } from 'react-icons/fa';
import './DataDisplay.css'



const DataDisplay = ({ endpoint, trigger }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);

    const title = endpoint.charAt(0).toUpperCase() + endpoint.slice(1);

    useEffect(() => {
        fetch(`http://localhost:3000/api/${endpoint}`)
            .then(response => response.json())
            .then(data => {
                setData(data.items);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [endpoint, trigger]);

    const handleDelete = (id) => {
        console.log('Eliminando... ', id);
        if ( !confirm('¿Está seguro de eliminar este registro?')) 
            return;

        fetch(`http://localhost:3000/api/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log(data.mensaje);
                    setData(data.items);
                } else {
                    alert(data.mensaje);
                    console.log(data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleEdit = (id) => {
        console.log('Editando... ', id);
        setIsEditing(true);
        setIdToEdit(id);
    }


    const handleCancel = () => {
        setIsEditing(false);
        setIdToEdit(null);
    }

    const handleSave = (id) => {
        console.log('Guardando... ', id);
        const updatedData = data.find(item => item.id === id);
        if (updatedData){

            console.log(updatedData);
            fetch(`http://localhost:3000/api/${endpoint}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        console.log(data.mensaje);
                        setData(data.items);
                        setIsEditing(false);
                        setIdToEdit(null);
                    } else {
                        alert(data.mensaje);
                        console.log(data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                }); 

        }
        else {
            console.log('No se encontró el elemento con id: ', id);
            alert('No se encontró el elemento con id: ' + id);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1 className='titulo proveedor-title'> <FaTable />  {title}{(title === 'Proveedor') ? 'es' : 's'}</h1>
            <table title='Tabla de inventario'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>

                            {
                                (isEditing && idToEdit === item.id) ?
                                    (
                                        <>
                                            <td><input type="text" className='editable-input' defaultValue={item.nombre} onChange={(e) => { item.nombre = e.target.value }} /></td>
                                            <td><input type="text" className='editable-input' defaultValue={item.contacto} onChange={(e) => { item.contacto = e.target.value }} /></td>
                                            <td><input type="text" className='editable-input' defaultValue={item.direccion} onChange={(e) => { item.direccion = e.target.value }} /></td>
                                            <td className='edit-buttons'>
                                                <button className='save-button' onClick={() => handleSave(item.id)}>Guardar</button>
                                                <button className='cancel-button'  onClick={() => handleCancel()}>Cancelar</button>
                                            </td>
                                        </>

                                    )

                                    :

                                    (
                                        <>
                                            <td>{item.nombre}</td>
                                            <td>{item.contacto}</td>
                                            <td>{item.direccion}</td>
                                            <td>
                                                <button title="Eliminar" className='margin-right-10' onClick={() => handleDelete(item.id)} ><FaTrash />   </button>
                                                <button title="Editar" className='margin-right-10' onClick={() => handleEdit(item.id)}><FaEdit /> </button>
                                            </td>
                                        </>
                                    )

                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default DataDisplay;