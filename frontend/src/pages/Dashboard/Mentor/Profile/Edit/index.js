import React, { useEffect, useState } from 'react';
import api from '../../../../../services/api';

import logo from '../../../../../assets/png/logo.png';
import logoFS from '../../../../../assets/png/logoFullsize.png';

import './index.scss';
import '../../../../../css/profile.scss';

import { faBell, faCalendarCheck, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MentorProfileEdit({ history }) {
  const token = localStorage.getItem('token');
  const access = localStorage.getItem('access');

  if(!token) {
    history.push('/login');
    alert("ACESSO RESTRITO");
  }
  else if(access === 'PADAWAN') {
    history.push('/dashboard/user');
  }
  
  function logout() {
    Promise.all([
      localStorage.removeItem('token'),
      localStorage.removeItem('access')
    ]).then(_ => history.push('/login'));
  }
  
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function loadUser() {
      await api.get('/mentors', {
        headers: { authorization: token }
      })
      .then((response) => {
        setUser(response.data.user_id);
      })
      .catch(err => alert(err.message))
      .finally(_ => setLoadingUser(false));
    }

    loadUser();
  }, []);

  const [name, setName] = useState(user.name);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [address, setAddress] = useState(user.address);
  const [cpf, setCPF] = useState(user.cpf);
  const [bio, setBio] = useState(user.bio);

  async function handleSubmit(event) {
    event.preventDefault();

    const userData = new FormData();

    userData.append('name', name);
    userData.append('birthdate', birthdate);
    userData.append('address', address);
    userData.append('cpf', cpf);
    userData.append('description', bio);

    await api.put('/users', userData, {headers: {authorization: token}})
    .then(res => console.log(res))
    .catch(err => alert(err.message))
    .finally()
  }

  return !(loadingUser) ? (
    <div id="mentorProfileEdit" className="dashboardContainer profile">
      <header className="header">
        <figure className="logo">
          <img src={logo} alt="Logo"/>
        </figure>

        <nav className="menu">
          <ul>
            <a href="/dashboard/mentor">
              <FontAwesomeIcon icon={faBell}/>
            </a>
            <a href="/dashboard/mentor/schedule">
              <FontAwesomeIcon icon={faCalendarCheck}/>
            </a>
            <a className="isActive" href="/dashboard/mentor/profile">
              <FontAwesomeIcon icon={faIdCard}/>
            </a>
          </ul>
        </nav>

        <div className="userInfo">
          <div className="info">
            <span className="userName">
              {user.name}
            </span>

            <span className="userEmail">
              {user.email}
            </span>
          </div>

          <div className="avatar" onClick={logout}>
            <img src={user.avatar_url} alt="Avatar do usuário"/>
          </div>
        </div>
      </header>

      <div className="content">
        <div id="profileCard" className="row">
          <figure className="avatar">
            <img src={user.avatar_url} alt=""/>
          </figure>

          <div className="userInfo">
            <h2>{user.name}</h2>

            <div className="section">
              <div className="sectionData">
                <span>Email</span>
                <span>{user.email}</span>
              </div>

              <div className="sectionData">
                <span>Endereço</span>
                <span>{user.address}</span>
              </div>


              <div className="sectionData">
                <span>Data de nascimento</span>
                <span>{user.birthdate}</span>
              </div>
            </div>
            <div className="section">
              <div className="sectionData">
                <span>Bio</span>
                <span>{user.description}</span>
              </div>
            </div>
          </div>
        </div>
      
        <div id="buttons">
          <a href="/dashboard/mentor/profile">
            <button id="skillsButton" type="button">
              Habilidades
            </button>
          </a>

          <a href="/dashboard/mentor/profile/availability">
            <button id="availabilityButton" type="button">
              Disponibilidade
            </button>
          </a>

          <button id="editButton" className="isActive" type="button">
            Editar perfil
          </button>
        </div>
      </div>
    
      <div className="contentBox">
        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="input" data-placeholder="Digite seu nome completo">
              <input
              id="name"
              type="text"
              // value = {user.name}
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
              // value={ user.birthdate }
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
              // value = {user.address}
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
              // value={user.cpf}
              onChange= {
                event => setCPF(event.target.value)
              }
              placeholder="Digite somente números"
              required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="textarea" data-placeholder="Escreva aqui uma boa descrição de seus interesses e paixões">
              <textarea
              id="bio"
              // value = {user.description}
              onChange= {
                event => setBio(event.target.value)
              }
              rows="5"
              placeholder="Essa é sua oportunidade de falar um pouco sobre você"
              required
              />
            </div>
          </div>

          <div className="inputSubmit">
            <button 
              type="submit"
            >
              <span>Salvar</span>
            </button>
          </div>             
        </form>
      </div>
      
    </div>
  ) : (
    <div id="loadingPage">
      <img src={logoFS} alt="Logo"/>
    </div>
  );
}