import React, { useState } from 'react';

import api from '../../services/api';

import './index.scss';
import logo from '../../assets/png/logo.png';
import iconCadastro from '../../assets/svg/cadastro-md.svg';
import iconLogin from '../../assets/svg/login-sm.svg';

export default function Login({ history }) {
  const token = localStorage.getItem('token');
  const access = localStorage.getItem('access');

  if (token) {
    if (access === "PADAWAN") {
      history.push('/dashboard/user');
    }
    else if (access === "MENTOR") {
      history.push('/dashboard/mentor');
    }
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/authenticate', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('access', response.data.user.access);

      if (response.data.user.access === "PADAWAN") {
        history.push('/dashboard/user');
      }
      else if (response.data.user.access === "MENTOR") {
        history.push('/dashboard/mentor');
      }
    }
    catch (err) {
      if (err.message === "Network Error") {
        document.getElementById('errorMessage').innerText = "Erro de conexão com o servidor!";
      }
      else if (err.message === "Request failed with status code 400") {
        document.getElementById('errorMessage').innerText = "Credenciais inválidas";
      }
    }

  }

  return (
    <div id="loginScreen" className="container">
      <aside id="signUpMessage">
        <div className="row">
          <header className="header">
            <img src={logo} alt="Logo" />
          </header>

          <section className="content">
            <h2>É novo na área?</h2>

            <p>
              Acesse todos os nossos<br />
              recursos fantásticos em poucos cliques!
            </p>

            <figure>
              <img src={iconCadastro} alt="Ícone de cadastro" />
            </figure>

            <a href="/">Cadastre-se</a>
          </section>
        </div>
      </aside>

      <div id="loginForm">
        <div className="row">
          <section className="content">
            <figure>
              <img src={iconLogin} alt="Ícone de cadastro" />
            </figure>

            <h1>Bem vindo de volta!</h1>

            <p>
              É hora de focar no seu <strong>futuro</strong> e maximizar<br />
              seu <strong>potencial</strong>!
            </p>

            <span id="errorMessage">
            </span>

            <form className="form" onSubmit={handleSubmit}>
              <div className="inputEmail" data-placeholder="Digite seu email">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={
                    event => setEmail(event.target.value)
                  }
                  required
                  autoFocus
                />
              </div>

              <div className="inputPassword" data-placeholder="Digite sua senha">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={
                    event => setPassword(event.target.value)
                  }
                  required
                />
              </div>

              <div className="inputSubmit">
                <input type="submit" value="Continuar" />
              </div>
            </form>
          </section>
        </div>

      </div>
    </div>
  );
}