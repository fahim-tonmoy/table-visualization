import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const handleLogin = async (values) => {
        try {
            await login(values);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="dashboard_login_wrapper">
            <div className="dashboard_login">
                <h1>Login</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={handleLogin}
                >
                    {()=>(
                        <Form className='dashboard_login__form'>
                            <Field
                                name='email'
                                type='email'
                                placeholder="Email"
                            />
                            <Field
                                name='password'
                                type='password'
                                placeholder="Password"
                            />
                            <button type='submit'>Login</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;