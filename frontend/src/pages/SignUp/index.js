import React from 'react';

import './index.scss';
import logo from '../../assets/png/logo.png';
import iconCadastro from '../../assets/svg/cadastro-sm.svg';
import iconLogin from '../../assets/svg/login-md.svg';

export default function SignUp () {

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

            <form class="form" onSubmit="">
              <div class="inputEmail" data-placeholder="Digite seu melhor email">
                <input type="email" autoFocus/>
              </div>

              <div className="inputRole">
                <span className="title">
                  O que você procura no Teach.me?
                </span>

                <span className="description">
                  Escolha uma das opções abaixo
                </span>

                <div className="role">
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