import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import moment from 'moment';

import logo from '../../../assets/png/logo.png';
import logoFS from '../../../assets/png/logoFullsize.png';

import '../../../css/dashboard.scss';
import './index.scss';

import { faBell, faCalendarCheck, faIdCard, faUser, faCalendar, faClock, faHourglass, faBolt, faCheckCircle, faBan } from "@fortawesome/free-solid-svg-icons";
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
        booking._id !== response.data._id
      ));

      if(newStatus === "CONFIRMED") {
        alert("Solicitação confirmada");
      }
      else if(newStatus === "CANCELLED") {
        alert("Solicitação cancelada");
      }
    })
    .catch((err) => {
      alert(err.message);
    })
  }

  return !(loadingMentor || loadingRequests) ? (
    <div id="mentorNotifications" className="dashboardContainer">
      <header className="header">
        <figure className="logo">
          <img src={logo} alt="Logo"/>
        </figure>

        <nav className="menu">
          <ul>
            <a className="isActive" href="/dashboard/mentor">
              <FontAwesomeIcon icon={faBell}/>
            </a>
            <a href="/dashboard/mentor/schedule">
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
          <h1>Notificações</h1>
        </div>

        <div id="requests" className="row requests">
          <h2>
            Solicitações
          </h2>

          <div className="table">
            <section className="tableHead">
              <div>
                <FontAwesomeIcon icon={faUser}/>
                <span>Usuário</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCalendar}/>
                <span>Data</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faClock}/>
                <span>Horário</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faHourglass}/>
                <span>Duração</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faBolt}/>
                <span>Ações</span>
              </div>
            </section>

            {requests.sort((a,b) => (new Date(a.date))-(new Date(b.date)))
            .filter((item) => { return item.status === "UNCONFIRMED"})
            .map(request => (
              <section key={request._id} className="tableBody">
                <div className="requestUser">
                  <figure>
                    <img src={request.user.avatar_url} alt=""/>
                  </figure>
                  <span>
                    {request.user.name}
                  </span>
                </div>
                <div>
                  {moment(request.date).format('DD/MM/YYYY')}
                </div>
                <div>
                  {moment(request.date).format('HH:mm')}
                </div>
                <div>
                  {request.duration} horas
                </div>
                <div className="requestActions">
                  <button onClick={event => setRequestStatus(request._id, 'CONFIRMED')}>
                    <FontAwesomeIcon icon={faCheckCircle}/>
                  </button>
                  <button onClick={event => setRequestStatus(request._id, 'CANCELLED')}>
                    <FontAwesomeIcon icon={faBan}/>
                  </button>
                </div>
              </section>
            ))}
          </div>
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