import React, { useState, useMemo } from 'react';

import api from '../../../services/api';

import './index.scss';
import logo from '../../../assets/png/logo.png';

import camera from '../../../assets/svg/camera.svg';

import { faArrowCircleLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserForm(props) {
  const role = props.location.state.role;
  const { history } = props;

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState(props.location.state.email);
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);

  const preview = useMemo(() => {
    return avatar ? URL.createObjectURL(avatar) : null
  }, [avatar]);

  let submit = false;

  async function handleSubmit(event) {
    event.preventDefault();

    if(email !== emailConfirm) {
      alert("Email e confirmação não coincidem");
    }
    else if(password !== passwordConfirm) {
      alert("Senha e confirmação não coincidem");
    }
    else {
      submit = true;
    }

    if(submit) {
      const data = new FormData();

      data.append('name', name);
      data.append('birthdate', birthdate);
      data.append('address', address);
      data.append('cpf', cpf);
      data.append('email', email);
      data.append('password', password);
      data.append('bio', bio);
      data.append('avatar', avatar);
      data.append('role', role);

      try {
        const response = await api.post('/users', data);
        const url = '/signup/users/' + response.data._id + '/confirmation';

        history.push(url, { 
          user: response.data
        })
      }
      catch(err) {
        alert("Usuário já cadastrado com esse email");
      }
    }
  }

  return (
    <div id="userSignUpFormScreen" className="container">
      <header className="header">
        <div id="firstRow" className="row">
          <section className="closeButton"/>
          
          <section className="logo">
            <img src={logo} alt=""/>
          </section>
          
          <section className="closeButton">
            <a href="/">
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </a>
          </section>
        </div>
        
        <div id="secondRow" className="row">
          <h1>
            Entre para o jogo com os melhores mentores
          </h1>
        </div>
      </header>
      
      <form id="signUpForm" className="row" onSubmit={ handleSubmit }>
        <section className="data">
          <fieldset>
            <legend>Dados pessoais</legend>
            
            <div className="formRow">
              <div className="input" data-placeholder="Digite seu nome completo">
                <input
                id="name"
                type="text"
                value = {name}
                onChange= {
                  event => setName(event.target.value)
                }
                placeholder="Ciclano da Silva"
                required
                autoFocus
                />
              </div>
              
              <div className="input" data-placeholder="Digite sua data de nascimento">
                <input
                id="birthdate"
                type="text"
                value={ birthdate }
                onChange= {
                  event => setBirthdate(event.target.value)
                }
                placeholder="DD/MM/AAAA"
                required
                />
              </div>
            </div>
            
            <div className="formRow">
              <div className="input" data-placeholder="Digite seu endereço">
                <input
                id="address"
                type="text"
                value = {address}
                onChange= {
                  event => setAddress(event.target.value)
                }
                placeholder="São Paulo, SP"
                required
                />
              </div>
              
              <div className="input" data-placeholder="Digite seu CPF">
                <input
                id="cpf"
                type="text"
                value={cpf}
                onChange= {
                  event => setCPF(event.target.value)
                }
                placeholder="Digite somente números"
                required
                />
              </div>
            </div>
            
            <div className="formRow">
              <div className="input" data-placeholder="Digite seu melhor email">
                <input
                id="email"
                type="email"
                value = {email}
                onChange= {
                  event => setEmail(event.target.value)
                }
                placeholder="ciclano@incrivel.com"
                required
                />
              </div>
              
              <div className="input" data-placeholder="Repita seu email">
                <input
                id="emailConfirm"
                type="email"
                value = {emailConfirm}
                onChange= {
                  event => setEmailConfirm(event.target.value)
                }
                placeholder="ciclano@incrivel.com"
                required
                />
              </div>
            </div>
            
            <div className="formRow">
              <div className="input" data-placeholder="Digite uma senha">
                <input
                id="password"
                type="password"
                value = {password}
                onChange= {
                  event => setPassword(event.target.value)
                }
                placeholder="Não contaremos sua senha a ninguém!"
                required
                />
              </div>
              
              <div className="input" data-placeholder="Repita sua senha">
                <input
                id="passwordConfirm"
                type="password"
                value = {passwordConfirm}
                onChange= {
                  event => setPasswordConfirm(event.target.value)
                }
                placeholder="Não contaremos sua senha a ninguém!"
                required
                />
              </div>
            </div>
            
            <div className="formRow">
              <div className="textarea" data-placeholder="Escreva aqui uma boa descrição de seus interesses e paixões">
                <textarea
                id="bio"
                value = {bio}
                onChange= {
                  event => setBio(event.target.value)
                }
                rows="5"
                placeholder="Essa é sua oportunidade de falar um pouco sobre você"
                required
                />
              </div>
            </div>
          </fieldset>
          
          <div className="inputSubmit">
            <button 
              type="submit"
            >
              <span>Próximo passo</span>
              <FontAwesomeIcon icon={faChevronRight}/>
            </button>
          </div>                  
        </section>
        
        <section className="avatar">
          <label 
            id="label"
            style={{
              backgroundImage:`url(${preview})`,
            }}
            className={avatar ? 'has-avatar' : '' }  
          >
            <img src={camera} alt="Selecione uma imagem"/>
            <input 
              type="file"
              accept="image/*"
              onChange={
                event => setAvatar(event.target.files[0])
              }
              required
            />
          </label>

          <span>
            Selecione uma imagem para usar como foto de perfil no formato .PNG ou .JPEG
          </span>
        </section>       
      </form>
    </div>
  );
}