import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';

import moment from 'moment';  

import logo from '../../../../assets/png/logo.png';
import logoFS from '../../../../assets/png/logoFullsize.png';

import './index.scss';
import '../../../../css/profile.scss';

import { faBell, faCalendarCheck, faIdCard, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserProfile({ history }) {
  const token = localStorage.getItem('token');
  const access = localStorage.getItem('access');

  if(!token) {
    history.push('/login');
    alert("ACESSO RESTRITO");
  }
  else if(access === 'MENTOR') {
    history.push('/dashboard/mentor');
  }

  function logout() {
    Promise.all([
      localStorage.removeItem('token'),
      localStorage.removeItem('access')
    ]).then(_ => history.push('/login'));
  }

  const [user, setUser] = useState({});

  const [loadingUser, setloadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function loadUserData() {
      await api.get('/users', {
        headers: { authorization: token }
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(_ => setloadingUser(false));
    }

    loadUserData();
  }, []);
    
  return !loadingUser ? (
    <div id="userProfile" className="dashboardContainer profile">
      <header className="header">
        <figure className="logo">
          <img src={logo} alt="Logo"/>
        </figure>

        <nav className="menu">
          <ul>
            <a href="/dashboard/user">
              <FontAwesomeIcon icon={faBell}/>
            </a>
            <a href="/dashboard/user/search">
              <FontAwesomeIcon icon={faSearch}/>
            </a>
            <a href="/dashboard/user/schedule">
              <FontAwesomeIcon icon={faCalendarCheck}/>
            </a>
            <a className="isActive" href="/dashboard/user/profile">
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
                <span>{moment(user.birthdate).format('DD/MM/YYYY')}</span>
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
          <a href="/dashboard/user/profile/edit">
            <button id="editButton" type="button">
              Editar perfil
            </button>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div id="loadingPage">
      <img src={logoFS} alt="Logo"/>
    </div>
  );
}