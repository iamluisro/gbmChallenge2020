import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/Login.scss';
import { AuthContext } from '../routes/App';

const Login = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
  });

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: 'https://fathomless-thicket-73962.herokuapp.com/api/auth/sign-in',
      method: 'post',
      auth: {
        username: form.email,
        password: form.password,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: 'LOGIN',
          payload: data,
        });
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        document.cookie = `token=${data.token}`;
        localStorage.setItem('email', `${data.user.email}`);
        localStorage.setItem('name', `${data.user.name}`);
        localStorage.setItem('id', `${data.user.id}`);
        localStorage.setItem('token', `${data.token}`);
        localStorage.setItem('isAdmin', `${data.user.isAdmin}`);
        localStorage.setItem('isAuthenticated', `${true}`);
        props.history.push('/');
      })
      .catch((err) => console.log('Error', err));
  };

  return (
    <section className='login'>
      <section className='login__container'>
        <h2>Inicia sesión</h2>
        <form className='login__container--form' onSubmit={handleSubmit}>
          <input
            name='email'
            className='input'
            type='text'
            placeholder='Correo'
            onChange={handleInput}
          />
          <input
            name='password'
            className='input'
            type='password'
            placeholder='Contraseña'
            onChange={handleInput}
          />
          <button className='button' type='submit'>
            Iniciar sesión
          </button>
        </form>
        <p className='login__container--register'>
          ¿No tienes cuenta?
          {' '}
          <Link to='/register'>Regístrate</Link>
        </p>
      </section>
    </section>
  );
};

export default Login;
