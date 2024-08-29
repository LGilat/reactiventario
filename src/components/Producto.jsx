import React from 'react'
import { FaTruck } from 'react-icons/fa';  
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Producto.css'


const ProveedorSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    descripcion: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    categoria: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    precioCompra: Yup.number()
        .required('Required'),
    precioVenta: Yup.number()
        .required('Required'),


});



const Producto = () => {
    return (
        <div>
            <h1 className='titulo producto-title'> <FaTruck />  Producto</h1>
            <Formik
                initialValues={{
                    nombre: '',
                    descripcion: '',
                    categoria: '',
                    precioCompra: '',
                    precioVenta: '',
                }}
                validationSchema={ProveedorSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {

                    fetch('api/proveedor', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.ok) {
                                alert(data.mensaje);

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
                    <Form className="form">
                        <Field type="text" name="nombre" placeholder="Nombre"  className="textbox" />
                        <ErrorMessage name="nombre" component="div"   className="error-message"/>

                        <Field type="text" name="descripcion" placeholder="Descripcion"  className="textbox" />
                        <ErrorMessage name="descripcion" component="div"   className="error-message"/>

                        <Field type="text" name="categoria" placeholder="Categoria"  className="textbox" />
                        <ErrorMessage name="categoria" component="div" className="error-message" />

                        <Field type="number" name="precioCompra" placeholder="Precio compra"  className="textbox" />
                        <ErrorMessage name="precioCompra" component="div" className="error-message" />

                        <Field type="number" name="precioVenta" placeholder="Precio venta"  className="textbox" />
                        <ErrorMessage name="precioVenta" component="div" className="error-message" />

                        <button type="submit" disabled={isSubmitting}>
                            Enviar
                        </button>
                    </Form>
                )}
            </Formik>
        </div>

    )
}


export default Producto