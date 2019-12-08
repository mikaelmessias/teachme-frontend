import React, { useState } from 'react';

import api from '../../services/api';

import './index.scss';
import logo from '../../assets/png/logo.png';
import iconCadastro from '../../assets/svg/cadastro-sm.svg';
import iconLogin from '../../assets/svg/login-md.svg';

export default function SignUp ({ history }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if(role === "PADAWAN") {
      history.push('/signup/users', { email, role });
    }
    else if(role === "MENTOR") {
      const res = await api.get('/techs');
      
      history.push('/signup/mentors', { email, role, techs: res.data });
    }
  }

  return (
    <div id="signUpScreen" className="container">
      <div id="signUpForm">
        <div className="row">
          <header className="header">
            <img src={logo} alt="Logo"/>
          </header>

          <section className="content">
            <figure>
              <img src={iconCadastro} alt="Ícone de cadastro"/>
            </figure>

            <h1>Bem vindo, jovem!</h1>

            <p>
              Acesso todos os nossos <br/>
              <strong>recursos fantásticos</strong> em poucos cliques
            </p>

            <form className="form" onSubmit={ handleSubmit }>
              <div className="inputEmail" data-placeholder="Digite seu melhor email">
                <input
                  id="email"
                  type="email"
                  value={ email }
                  onChange= {
                    event => setEmail(event.target.value)
                  }
                  required
                  autoFocus
                />
              </div>

              <div className="inputRole">
                <span className="title">
                  O que você procura no Teach.me?
                </span>

                <span className="description">
                  Escolha uma das opções abaixo
                </span>

                <div className="role">
                  <label className="radio-group">Quero ser um mentor
                    <input
                      type="radio"
                      name="userType"
                      value="MENTOR"
                      onClick = {
                        () => setRole('MENTOR')
                      }
                    />
                    <span className="checkmark"/>
                  </label>

                  <label className="radio-group">Preciso de ajuda
                    <input
                      type="radio"
                      name="userType"
                      value="PADAWAN"
                      onClick = {
                        () => setRole('PADAWAN')
                      }
                      required
                    />
                    <span className="checkmark"/>
                  </label>
                </div>
              </div>
            
              <div className="inputSubmit">
                  <input type="submit" value="Continuar"/>
                </div>
            </form>
          </section>
        </div>
      </div>

      <aside id="loginMessage">
        <div className="row">
          <h2>Já tem uma conta?</h2>
          
          <p>
            Que tal colocar seus estudos em dia? <br/>
            Netflix pode esperar &lt;3
          </p>

          <figure>
            <img src={iconLogin} alt="Ícone de login"/>
          </figure>

          <a href="/login">Entrar</a>
        </div>
      </aside>
    </div>
  );
}