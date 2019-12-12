import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';
import moment from 'moment';

import logo from '../../../../assets/png/logo.png';
import logoFS from '../../../../assets/png/logoFullsize.png';

import './index.scss';

import { faBell, faCalendarCheck, faIdCard, faCalendar, faClock, faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardMentor({ history }) {
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
  const [requests, setRequests] = useState([]);

  const [loadingMentor, setLoadingMentor] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function loadMentorData() {
      await api.get('/mentors', {
        headers: { authorization: token }
      })
      .then((response) => {
        setUser(response.data.user_id);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(_ => setLoadingMentor(false));
    }

    async function loadRequests() {
      await api.get('/bookings', {
        headers: { authorization: token }
      })
      .then((response) => {
        setRequests(response.data);
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(_ => setLoadingRequests(false));
    }

    loadMentorData();
    loadRequests();
  }, []);

  async function setRequestStatus(booking, newStatus) {
    await api.put(`/bookings/${booking}`, {
      status: newStatus
    }, {
      headers: {
        authorization: token
      }
    })
    .then((response) => {
      setRequests(requests.filter(booking =>
        booking.status !== response.data.status
      ));

      if(newStatus === 'CANCELLED') {
        alert("Solicitação cancelada");
      }
      else if(newStatus === 'COMPLETED') {
        alert("Solicitação concluída");
      }
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  const [filter, setFilter] = useState('CONFIRMED');

  useEffect(_ => {
    if(!loadingMentor || !loadingRequests) {
      document.getElementsByClassName('filterActive')[0].className = '';
      document.getElementById(filter).className = 'filterActive';

      const buttonGroup = document.getElementsByName('buttonGroup');

      if(buttonGroup) {
        if(filter === 'CANCELLED' || filter === 'COMPLETED') {
          buttonGroup.forEach((group) => group.className = "buttonGroup buttonGroupIsNotVisible");
        }
        else {
          buttonGroup.forEach((group) => group.className = "buttonGroup buttonGroupIsVisible");
        }
      }
    }
  }, [filter]);

  return !(loadingMentor || loadingRequests) ? (
    <div id="mentorSchedule" className="dashboardContainer">
      <header className="header">
        <figure className="logo">
          <img src={logo} alt="Logo"/>
        </figure>

        <nav className="menu">
          <ul>
            <a href="/dashboard/mentor">
              <FontAwesomeIcon icon={faBell}/>
            </a>
            <a className="isActive" href="/dashboard/mentor/schedule">
              <FontAwesomeIcon icon={faCalendarCheck}/>
            </a>
            <a href="/dashboard/mentor/profile">
              <FontAwesomeIcon icon={faIdCard}/>
            </a>
          </ul>
        </nav>

        <div className="mentorInfo">
          <div className="info">
            <span className="mentorName">
              {user.name}
            </span>

            <span className="mentorEmail">
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
          <h1>Agenda</h1>
        </div>

        <div id="filters" className="row">
          <button
            id="CONFIRMED"
            type="button"
            onClick={ event => setFilter('CONFIRMED') }
            className="filterActive"
          >
            Confirmadas
          </button>
          <button
            id="CANCELLED"
            type="button"
            onClick={ event => setFilter('CANCELLED') }
          >
            Canceladas
          </button>
          <button
            id="COMPLETED"
            type="button"
            onClick={ event => setFilter('COMPLETED') }
          >
            Concluídas
          </button>
        </div>

        <div id="schedule" className="row">
          {requests.sort((a,b) => (new Date(a.date))-(new Date(b.date)))
          .filter(req => { 
              return req.status === filter;
            })
            .map(req => (
              <div key={req._id} className="box">
                <figure>
                  <img src={req.user.avatar_url} alt=""/>
                </figure>

                <span className="reqUser">
                  {req.user.name}
                </span>

                <span className="reqDate">
                  <FontAwesomeIcon icon={faCalendar}/>
                  
                  <span>
                    {moment(req.date).format('DD/MM/YYYY')}
                  </span>
                </span>

                <span className="reqHour">
                  <FontAwesomeIcon icon={faClock}/>
                  
                  <span>
                    {moment(req.date).format('HH:mm')}  
                  </span>
                </span>

                <span className="reqDuration">
                  <FontAwesomeIcon icon={faHourglass}/>
                  
                  <span>
                    {req.duration} horas
                  </span>
                </span>

                <div name="buttonGroup" className="buttonGroup">
                  <button name="completeButton" type='button' onClick={_ => setRequestStatus(req._id, 'COMPLETED')}>
                    Concluir
                  </button>
                  
                  <button name="cancelButton" type='button' onClick={_ => setRequestStatus(req._id, 'CANCELLED')}>
                    Cancelar
                  </button>
                </div>
              </div>
            ))
            
            }
        </div>
      </div>
    </div>
  ) : (
    <div id="loadingPage">
      <img src={logoFS} alt="Logo"/>

      {/* <span className="loadingMessage">
        Carregando
      </span> */}
    </div>
  );
}