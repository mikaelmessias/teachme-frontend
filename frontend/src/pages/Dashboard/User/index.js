import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import moment from 'moment';

import logo from '../../../assets/png/logo.png';
import logoFS from '../../../assets/png/logoFullsize.png';

import '../../../css/dashboard.scss';
import './index.scss';

import { faBell, faCalendarCheck, faIdCard, faUser, faSearch, faCalendar, faClock, faHourglass, faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardUser({ history }) {
  const token = localStorage.getItem('token');
  const access = localStorage.getItem('access');

  const status = {
    UNCONFIRMED: 'Não confirmada',
    CONFIRMED: 'Confirmada',
    CANCELLED: 'Cancelada',
    COMPLETED: 'Cooncluída'
  }

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
  const [requests, setRequests] = useState([]);

  const [loadingUser, setloadingUser] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

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

    loadUserData();
    loadRequests();
  }, []);

  return !(loadingUser || loadingRequests) ? (
    <div id="userNotifications" className="dashboardContainer">
      <header className="header">
        <figure className="logo">
          <img src={logo} alt="Logo"/>
        </figure>

        <nav className="menu">
          <ul>
            <a className="isActive" href="/dashboard/user">
              <FontAwesomeIcon icon={faBell}/>
            </a>
            <a href="/dashboard/user/search">
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
                    <img src={request.mentor.user_id.avatar_url} alt=""/>
                  </figure>
                  <span>
                    {request.mentor.user_id.name}
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
                <div className="requestStatus">
                  {status[request.status]}
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
    </div>
  );
}