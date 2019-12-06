import React, { useState } from 'react';

// import api from '../../services/api';

import './index.css';

import logo from '../../assets/png/logo.png';
import icCadastro from '../../assets/svg/cadastro-sm.svg';
import icLogin from '../../assets/svg/login-md.svg';

export default function SignUp ({ history }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    history.push('/signup', { email, name });
  }

  return (
    <div class="container">
      <div className="col-lg">
        <h1>
          <img src={logo} alt="Logo - Teach.me"/>
        </h1>

        <section className="content">
          <img src={icCadastro} alt="Cadastre-se"/>

          <div>
            <h2>
              Bem vindo, jovem!
            </h2>

            <p>
              Acesse todos os nossos<br/>
              <strong>recursos fantásticos</strong> em poucos cliques!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={event => setName(event.target.value)}
              required
              autoFocus
            />
          
            <input
              id="email"
              type="email"
              placeholder="Digite seu melhor email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />

            <section>
              <h3>O que você procura no Teach.me?</h3>
              <p>Escolha uma das opções abaixo</p>

              <div> 
                <label class="radio-group">Quero ser um mentor
                  <input
                    type="radio"
                    name="userType"
                    value="MENTOR"
                  />
                  <span class="checkmark"/>
                </label>

                <label class="radio-group">Preciso de ajuda
                  <input
                    type="radio"
                    name="userType"
                    value="PADAWAN"
                    required
                  />
                  <span class="checkmark"/>
                </label>
              </div>
            </section>

            <input type="submit" value="Continuar"/>
          </form>
        </section>
      </div>

      <div className="col-sm">
        <aside>
          <h2>Já tem uma conta?</h2>

          <p>Que tal colocar seus estudos em dia?</p>
          <p>Netflix pode esperar &lt;3</p>

          <img src={icLogin} alt="Login"/>

          <a href="./"><button class="btn btn-no-bg">Entrar</button></a>
        </aside>
      </div>
    </div>
  );
}