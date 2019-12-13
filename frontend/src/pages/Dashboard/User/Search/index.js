import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';

import logo from '../../../../assets/png/logo.png';
import logoFS from '../../../../assets/png/logoFullsize.png';

import '../../../../css/dashboard.scss';
import './index.scss';

import { faBell, faCalendarCheck, faIdCard, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserSearch({ history }) {
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
  const [techs, setTechs] = useState({});
  const [results, setResults] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const [mentor, setMentor] = useState({});
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [duration, setDuration] = useState('');

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

    async function loadTechs() {
      await api.get('techs', {
        headers: {authorization: token}
      })
      .then(res => setTechs(res.data))
      .catch(err => alert(err.message))
      .finally()
    }

    loadUserData();
    loadTechs();
  }, []);

  async function search(event) {
    event.preventDefault();

    const resultBox = document.getElementById('results');

    await api.get(`/search`, {
      params: { tech: searchParam },
      headers: { authorization: token }
    })
    .then(res => {
      setResults(res.data);
      resultBox.className = 'isVisible';
    })
    .catch(err => {
      alert(err.message);
    })
    .finally();
  }

  function openModal() {
    document.getElementById('bookingForm').className = "isVisible";
  }

  function closeModal() {
    document.getElementById('bookingForm').className = "isInvisible";
  }
  
  async function addBooking(event) {
    event.preventDefault();

    const date_complete = date + "T" + hour + "-0300";

    let tech_id;

    techs.forEach(tech => {
      if(tech.description === searchParam) {
        tech_id = tech._id;
      }
    });

    const booking = {
      mentor,
      date: date_complete,
      tech: tech_id,
      duration
    }

    await api.post('/bookings', booking, {
      headers: { authorization: token }
    })
    .then(res => {
      alert("Solicitação enviada");
      closeModal();
    })
    .catch(err => alert(err.message()))
  }

  return !loadingUser ? (
    <div id="userSearch" className="dashboardContainer">
      <header className="header">
        <figure className="logo">
          <img src={logo} alt="Logo"/>
        </figure>

        <nav className="menu">
          <ul>
            <a href="/dashboard/user">
              <FontAwesomeIcon icon={faBell}/>
            </a>
            <a className="isActive" href="/dashboard/user/search">
              <FontAwesomeIcon icon={faSearch}/>
            </a>
            <a href="/dashboard/user/schedule">
              <FontAwesomeIcon icon={faCalendarCheck}/>
            </a>
            <a href="/dashboard/user/profile">
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
        <div id="title" className="row">
          <h1>Pesquisar</h1>
        </div>

        <form onSubmit={search}>
          <input
            type = "text"
            name = "searchParam"
            id = "searchParam"
            value = {searchParam}
            onChange = {event => setSearchParam(event.target.value)}
            placeholder="Digite um termo para pesquisar..."
          />
          <button>Buscar</button>
        </form>

        <h2>Exibindo resultados para "{searchParam}":</h2>

        <div id="results" className="row">

          {results.map(res => (
            <div key={res._id} className="box">
              <figure>
                <img src={res.user_id.avatar_url} alt=""/>
              </figure>

              <span className="resUser">
                {res.user_id.name}
              </span>

              <span className="borderTop">
                <h3>Disponibilidade</h3>
                
                <div id="days">
                  <div className="checkbox">
                    <div
                      id="MONDAY"
                      name="MONDAY"
                      className={res.availableAt.findIndex(day => day === 'MONDAY') !== -1 ? 'isActive' : ''}
                    />
                    <label>
                      <span className="initial">
                        S
                      </span>

                      <span className="full">
                        Segunda
                      </span>
                    </label>

                    <div
                      id="TUESDAY"
                      name="TUESDAY"
                      className={res.availableAt.findIndex(day => day === 'TUESDAY') !== -1 ? 'isActive' : ''}
                    />
                    <label>
                      <span className="initial">
                        T
                      </span>

                      <span className="full">
                        Terça
                      </span>
                    </label>
                    
                    <div
                      id="WEDNESDAY"
                      name="WEDNESDAY"
                      className={res.availableAt.findIndex(day => day === 'WEDNESDAY') !== -1 ? 'isActive' : ''}
                    />
                    <label>
                      <span className="initial">
                        Q
                      </span>

                      <span className="full">
                        Quarta
                      </span>
                    </label>
                    
                    <div
                      id="THURSDAY"
                      name="THURSDAY"
                      className={res.availableAt.findIndex(day => day === 'THURSDAY') !== -1 ? 'isActive' : ''}
                    />
                    <label>
                      <span className="initial">
                        Q
                      </span>

                      <span className="full">
                        Quinta
                      </span>
                    </label>
                    
                    <div
                      id="FRIDAY"
                      name="FRIDAY"
                      className={res.availableAt.findIndex(day => day === 'FRIDAY') !== -1 ? 'isActive' : ''}
                    />
                    <label>
                      <span className="initial">
                        S
                      </span>

                      <span className="full">
                        Sexta
                      </span>
                    </label>
                    
                    <div
                      id="SATURDAY"
                      name="SATURDAY"
                      className={res.availableAt.findIndex(day => day === 'SATURDAY') !== -1 ? 'isActive' : ''}
                    />
                    <label>
                      <span className="initial">
                        S
                      </span>

                      <span className="full">
                        Sábado
                      </span>
                    </label>
                    
                    <div
                      id="SUNDAY"
                      name="SUNDAY"
                      className={res.availableAt.findIndex(day => day === 'SUNDAY') !== -1 ? 'isActive' : ''}
                    />
                    <label>
                      <span className="initial">
                        D
                      </span>

                      <span className="full">
                        Domingo
                      </span>
                    </label>
                  </div>
                </div>
              </span>

              <span className="borderTop">
                <h3>Tecnologias</h3>
                <div id="techs">
                {res.skills.map(skill => (
                  <figure key={skill._id}>
                    <img src={skill.tech.thumbnail_url} alt={skill.tech.description}/>
                  </figure>
                ))}
                </div>
              </span>

              <div name="buttonGroup" className="buttonGroup">             
                <button name="requestButton" type='button' onClick={_ => {
                  setMentor(res);
                  openModal();
                }}>
                  Solicitar atendimento
                </button>

                <div id="bookingForm">
                  <form onSubmit={addBooking}>
                    <header>
                      <h3>Solicitação de atendimento</h3>

                      <button type="button" onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes}/>
                      </button>
                    </header>

                    <p>Para confirmar a solicitação, selecione a data, o horário e a duração do atendimento.</p>

                    <div className="bookingInfo">                      
                      <div className="input" data-placeholder="Data">
                        <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={event => setDate(event.target.value)}
                        placeholder="dd/mm/yyyy"
                        required
                        />
                      </div>
                      
                      <div className="input" data-placeholder="Horário">
                        <input
                        id="hour"
                        type="time"
                        value={hour}
                        onChange={event => setHour(event.target.value)}
                        placeholder="hh:mm"
                        required
                        />
                      </div>
                      
                      <div className="input" data-placeholder="Duração">
                        <input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={event => setDuration(event.target.value)}
                        required
                        />
                      </div>

                      <button type="submit">
                        Adicionar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div id="loadingPage">
      <img src={logoFS} alt="Logo"/>
    </div>
  );
}