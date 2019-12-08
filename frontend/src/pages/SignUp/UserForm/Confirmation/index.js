import React from 'react';

import './index.scss';
import logo from '../../../../assets/png/logo.png';

import { faArrowCircleLeft, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import iconCadastro from '../../../../assets/svg/cadastro-red.svg';

export default function UserConfirm (props) {
  const user = props.location.state.user;
  
  return (
    <div id="userConfirmationScreen" className="container">
      <header className="header">
        <div id="firstRow" className="row">          
          <section className="logo">
            <img src={logo} alt=""/>
          </section>
        </div>
        
        <div id="secondRow" className="row">
          <h1>
            Entre para o jogo com os melhores mentores
          </h1>
        </div>
      </header>

      <div id="confirmationMessage">
        <h1>Obrigado por se cadastrar, {user.name}</h1>

        <p>
          Você receberá um email em alguns instantes confirmando o cadastro.
        </p>

        <figure>
          <img src={iconCadastro} alt="Ícone de cadastro"/>
        </figure>

        <a href="/login">
          <span>Concluir</span>
          <FontAwesomeIcon icon={faFlagCheckered}/>
        </a>
      </div>
    </div>
  );
}