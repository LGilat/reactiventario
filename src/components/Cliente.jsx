import React, {useState} from 'react'
import DataDisplay from './DataDisplay';
import { FaBrain } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Cliente.css'


const ClienteSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    contacto: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    direccion: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});


const columnas = [ "nombre", "contacto", "direccion"];

const Cliente = () => {
    const [success, setSuccess] = useState(false);
    const [trigger, setTrigger] = useState(0);
    return (
        <div>
            <h1 className='titulo proveedor-title'> <FaBrain />  Clientes</h1>
            <Formik
                initialValues={{
                    nombre: '',
                    contacto: '',
                    direccion: '',
                }}
                validationSchema={ClienteSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {

                    fetch('http://localhost:3000/api/cliente', {
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
                                setSuccess(true);
                                setTrigger(prev => prev + 1);
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
                    <Form className="form" style={success ? { border: '1px solid green' } : { border: 'none'}} >
                        <Field type="text" name="nombre" placeholder="Nombre" className="textbox" />
                        <ErrorMessage name="nombre" component="div" className="error-message" />
                        <Field type="text" name="contacto" placeholder="Contacto" className="textbox" />
                        <ErrorMessage name="contacto" component="div" className="error-message" />
                        <Field type="text" name="direccion" placeholder="Direccion" className="textbox" />
                        <ErrorMessage name="Direccion" component="div" className="error-message" />

                        <button type="submit" disabled={isSubmitting}>
                            Enviar
                        </button>
                    </Form>
                )}
            </Formik>
            <DataDisplay endpoint="cliente" trigger={trigger} columnas={columnas} />
        </div>

    )
}


export default Cliente;