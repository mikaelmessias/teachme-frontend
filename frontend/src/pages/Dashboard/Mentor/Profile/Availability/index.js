import React, { useEffect, useState } from 'react';
import api from '../../../../../services/api';

import moment from 'moment';

import logo from '../../../../../assets/png/logo.png';
import logoFS from '../../../../../assets/png/logoFullsize.png';

import './index.scss';
import '../../../../../css/profile.scss';

import { faBell, faCalendarCheck, faIdCard, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MentorProfileAvailability({ history }) {
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
  const [days, setDays] = useState([]);

  const [loadingMentor, setLoadingMentor] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function loadMentorData() {
      await api.get('/mentors', {
        headers: { authorization: token }
      })
      .then((response) => {
        setDays(response.data.availableAt);
        setUser(response.data.user_id);
      })
      .catch(err => alert(err.message))
      .finally(_ => setLoadingMentor(false));
    }

    loadMentorData();
  }, []);

  function addDays(day, isChecked) {
    if(isChecked) {
      days.push(day);
    }
    else {
      const index = days.indexOf(day);
      if (index !== -1) days.splice(index, 1);
    }
    setDays(days);
  }

  function getMarkedDays() {    
    days.forEach(day => {
      document.getElementById(day).checked = true;
      if(days.findIndex((d) => d === day) === -1) {
        days.push(day);
      }
    })
  }

  let isDisabled = true;

  async function editAvailability() {
    const weekdays = [
      document.getElementById('MONDAY'),
      document.getElementById('TUESDAY'),
      document.getElementById('WEDNESDAY'),
      document.getElementById('THURSDAY'),
      document.getElementById('FRIDAY'),
      document.getElementById('SUNDAY'),
      document.getElementById('SATURDAY')
    ];
    const btn = document.getElementById('btnEdit');
    const btnMessage = document.getElementById('btnEditMessage');

    console.log(days);

    if(isDisabled) {
      weekdays.forEach(day => {
        day.disabled = false;
      })
      isDisabled = false;

      btn.className = 'isActive';
      btnMessage.innerText = 'Salvar';
    }
    else if(!isDisabled) {
      weekdays.forEach(day => {
        day.disabled = true;
      })
      isDisabled = true;
      
      await api.post('/mentors/availability', {days}, {
        headers: { authorization: token }
      })
      .then(_ => alert("Salvo!"))
      .catch(err => alert(err.message))
      .finally(_ => {
        btn.className = '';
        btnMessage.innerText = '';
      });
    }
  }

  return !(loadingMentor) ? (
    <div onLoad = {getMarkedDays} id="mentorProfileAvailability" className="dashboardContainer profile">
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
          <a href="/dashboard/mentor/profile">
            <button id="skillsButton" type="button">
              Habilidades
            </button>
          </a>

          <button id="availabilityButton" className="isActive" type="button">
            Disponibilidade
          </button>

          <a href="/dashboard/mentor/profile/edit">
            <button id="editButton" type="button">
              Editar perfil
            </button>
          </a>
        </div>
      </div>
    
      <div className="contentBox">
        <div className="availabilityBox">
          <div className="title">
            <h3>Disponibilidade</h3>

            <button id="btnEdit" type="button" onClick={editAvailability}>
              <FontAwesomeIcon icon={faPencilAlt}/>
              <span id="btnEditMessage"/>
            </button>
          </div>

          <div id="daysEditable" className="isVisible">
            <div className="checkbox">
              <input
                type="checkbox"
                id="MONDAY"
                name="MONDAY"
                value="MONDAY"
                onChange = {event => addDays(event.target.value, event.target.checked)}
                disabled
              />
              <label htmlFor="MONDAY">
                <span className="initial">
                  S
                </span>

                <span className="full">
                  Segunda
                </span>
              </label>

              <input
                type="checkbox" 
                id="TUESDAY"
                name="TUESDAY"
                value="TUESDAY"
                onChange = {event => addDays(event.target.value, event.target.checked)}
                disabled
              />
              <label htmlFor="TUESDAY">
                <span className="initial">
                  T
                </span>

                <span className="full">
                  Terça
                </span>
              </label>
              
              <input
                type="checkbox" 
                id="WEDNESDAY"
                name="WEDNESDAY"
                value="WEDNESDAY"
                onChange = {event => addDays(event.target.value, event.target.checked)}
                disabled
              />
              <label htmlFor="WEDNESDAY">
                <span className="initial">
                  Q
                </span>

                <span className="full">
                  Quarta
                </span>
              </label>
              
              <input
                type="checkbox" 
                id="THURSDAY"
                name="THURSDAY"
                value="THURSDAY"
                onChange = {event => addDays(event.target.value, event.target.checked)}
                disabled
              />
              <label htmlFor="THURSDAY">
                <span className="initial">
                  Q
                </span>

                <span className="full">
                  Quinta
                </span>
              </label>
              
              <input
                type="checkbox" 
                id="FRIDAY"
                name="FRIDAY"
                value="FRIDAY"
                onChange = {event => addDays(event.target.value, event.target.checked)}
                disabled
              />
              <label htmlFor="FRIDAY">
                <span className="initial">
                  S
                </span>

                <span className="full">
                  Sexta
                </span>
              </label>
              
              <input
                type="checkbox" 
                id="SATURDAY"
                name="SATURDAY"
                value="SATURDAY"
                onChange = {event => addDays(event.target.value, event.target.checked)}
                disabled
              />
              <label htmlFor="SATURDAY">
                <span className="initial">
                  S
                </span>

                <span className="full">
                  Sábado
                </span>
              </label>
              
              <input
                type="checkbox" 
                id="SUNDAY"
                name="SUNDAY"
                value="SUNDAY"
                onChange = {event => addDays(event.target.value, event.target.checked)}
                disabled
              />
              <label htmlFor="SUNDAY">
                <span className="initial">
                  D
                </span>

                <span className="full">
                  Domingo
                </span>
              </label>
            </div>
          </div>
        
        </div>
      </div>
      
    </div>
  ) : (
    <div id="loadingPage">
      <img src={logoFS} alt="Logo"/>
    </div>
  );
}