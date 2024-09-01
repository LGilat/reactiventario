import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaTruck } from 'react-icons/fa';
import './Pedido.css'

import PedidosDetalles from './PedidosDetalles';


const PedidoSchema = Yup.object().shape({

    fechaPedido: Yup.date()
        .required('Required'),
    estado: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    proveedorId: Yup.number()
        .transform((value, originalValue) => {
            return Number(value);
        })
        .required('Proveedor es requerido'),
});


const estados = [
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'Enviado', label: 'Enviado' },
    { value: 'Entregado', label: 'Entregado' },
    { value: 'Cancelado', label: 'Cancelado' },
];



const Pedido = () => {
    const [success, setSuccess] = useState(false);
    const [proveedor, setProveedor] = useState(null);
    const [pedidoID, setPedidoID] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/proveedor')
            .then(response => response.json())
            .then(data => {
                setProveedor(data.items);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <h1 className='titulo'> <FaTruck />  Pedido</h1>
            <Formik
                initialValues={{
                    fechaPedido: '',
                    estado: '',
                    proveedorId: 0,
                }}
                validationSchema={PedidoSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const pedidoData = {
                        ...values,
                        fechaPedido: new Date(values.fechaPedido).toISOString(),
                        proveedorId: Number(values.proveedorId)
                    }
                    console.log(pedidoData);

                    fetch('http://localhost:3000/api/pedidocompra', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(pedidoData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.ok) {
                                alert(data.mensaje);
                                setSuccess(true);
                                setPedidoID(data.pedidoid);
                                resetForm();
                            } else {
                                alert(data.mensaje);
                                console.log(data.error);
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({ isSubmitting }) => (

                    !success &&

                    (
                        <Form className="form" style={success ? { border: '1px solid green' } : { border: 'none' }}>


                            <Field type="date" name="fechaPedido" placeholder="Fecha Pedido" className="textbox" />
                            <ErrorMessage name="fechaPedido" component="div" className="error-message" />

                            <Field as="select" name="estado" placeholder="Estado" className="textbox">
                                <option value="">Seleccione un estado</option>
                                {
                                    estados.map(estado => (
                                        <option key={estado.value} value={estado.value}>
                                            {estado.label}
                                        </option>
                                    ))
                                }


                            </Field>
                            <ErrorMessage name="estado" component="div" className="error-message" />

                            <Field as="select" name="proveedorId" className="textbox">
                                <option value="">Seleccione un proveedor</option>
                                {
                                    proveedor?.map(proveedor => (
                                        <option key={proveedor.id} value={proveedor.id}>
                                            {proveedor.nombre}
                                        </option>
                                    ))
                                }
                            </Field>
                            <ErrorMessage name="proveedorId" component="div" className="error-message" />


                            <button type="submit" disabled={isSubmitting}>
                                Enviar
                            </button>
                        </Form>
                    )
                )}
            </Formik>
            {success && (
                <>
                    <div>
                        <p>Pedido ID: {pedidoID}</p>
                        <p>Estado: {success ? 'Pedido enviado' : 'Pedido no enviado'}</p>
                    </div>
                    <div>
                        <h2>Productos</h2>
                        <PedidosDetalles pedidoid={pedidoID} success={setSuccess} />
                    </div>

                </>
            )}
        </div>

    )
}


export default Pedido;
