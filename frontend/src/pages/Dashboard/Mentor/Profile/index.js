import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';

import logo from '../../../../assets/png/logo.png';
import logoFS from '../../../../assets/png/logoFullsize.png';

import './index.scss';
import '../../../../css/profile.scss';

import { faBell, faCalendarCheck, faIdCard, faPencilAlt, faPlus, faTimes, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MentorProfile({ history }) {
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

  const [mentor, setMentor] = useState({});
  const [user, setUser] = useState({});
  const [techs, setTechs] = useState([]);

  const [loadingMentor, setLoadingMentor] = useState(true);
  const [loadingTechs, setLoadingTechs] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function loadMentorData() {
      await api.get('/mentors', {
        headers: { authorization: token }
      })
      .then((response) => {
        setMentor(response.data);
        setUser(response.data.user_id);
      })
      .catch(err => alert(err.message))
      .finally(_ => setLoadingMentor(false));
    }

    async function loadTechs() {
      await api.get('/techs')
      .then(res => setTechs(res.data))
      .catch(err =>  alert(err.message))
      .finally(_ => setLoadingTechs(false))
    }

    loadMentorData();
    loadTechs();
  }, []);

  function openModal() {
    document.getElementById('skillForm').className = "isVisible";
  }

  function closeModal() {
    document.getElementById('skillForm').className = "isInvisible";
  }

  async function addSkill(event) {
    event.preventDefault();
    
    const tech = {
      tech: document.getElementById("techs").selectedOptions[0].id,
      price: document.getElementById("price").value
    }
    
    let onList = false;

    mentor.skills.forEach(item => {
      if(item.tech._id === tech.tech) {
        onList = true;
      }
    })
    
    if(onList) {
      alert("Você já cadastrou essa tecnologia!");
    }
    else {
      await api.post('/mentors/skills', tech, {
        headers: { authorization: token }
      })
      .then(res => {
        setMentor(res.data);
      })
      .catch(err => alert(err.message))
      .finally();

      document.getElementById("price").value = "";
      document.getElementById('skillForm').className = "isInvisible";
    }
  }

  async function deleteSkill(tech_id) {
    await api.delete(`/mentors/skills/${tech_id}`, {
      headers: { authorization: token }
    })
    .then(res => {
      setMentor(res.data);
    })
    .catch(err => alert(err.message))
    .finally();
  }
  
  function openSkillDeletion() {
    const btns = document.getElementsByName('deleteSkill');

    btns.forEach(btn => {
      if(btn.className === 'isInvisible') {
        btn.className = 'isVisible'
      }
      else if(btn.className === 'isVisible') {
        btn.className = 'isInvisible'
      }
    })
  }
    
  return !(loadingMentor || loadingTechs) ? (
    <div id="mentorProfile" className="dashboardContainer profile">
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
          <button id="skillsButton" className="isActive" type="button">
            Habilidades
          </button>

          <a href="/dashboard/mentor/profile/availability">
            <button id="availabilityButton" type="button">
              Disponibilidade
            </button>
          </a>

          <a href="/dashboard/mentor/profile/edit">
            <button id="editButton" type="button">
              Editar perfil
            </button>
          </a>
        </div>
      </div>

      <div className="contentBox">
        <div className="skillsBox">
          <div className="skillTitle">
            <h3>Habilidades</h3>

            <button type="button" onClick={openSkillDeletion}>
              <FontAwesomeIcon icon={faPencilAlt}/>
            </button>
          </div>

          <div className="skillContent">
            {mentor.skills.map((skill) => (
            <div key={skill._id} className="skill">
              <figure>
                <button name="deleteSkill" type="button" onClick={_ => deleteSkill(skill.tech._id)} className="isInvisible">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <img src={skill.tech.thumbnail_url} alt="Thumbnail"/>
              </figure>

              <div className="skillInfo">
                <span>{skill.tech.description}</span>
                <span>R${skill.price} /hora</span>
              </div>
            </div>
            ))}
            <div className="addSkill">
              <button id="addSkillButton" type="button" onClick={openModal}>
                <FontAwesomeIcon icon={faPlus}/> Adicionar
              </button>

              <div id="skillForm">
                <form onSubmit={addSkill}>
                  <header>
                    <h3>Nova habilidade</h3>

                    <button type="button" onClick={closeModal}>
                      <FontAwesomeIcon icon={faTimes}/>
                    </button>
                  </header>

                  <div className="skillsSelector">
                    <div className="select" data-placeholder="Tecnologia">
                      <select name="techs" id="techs">
                        {techs.map(option => 
                          <option key={option._id} id={option._id} value={option.description}>
                            {option.description}
                          </option>
                        )}
                      </select>
                    </div>
                    
                    <div className="input" data-placeholder="Valor por hora">
                      <input
                      id="price"
                      type="text"
                      pattern="[0-9]*"
                      placeholder="Somente números"
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
        </div>
      </div>
    </div>
  ) : (
    <div id="loadingPage">
      <img src={logoFS} alt="Logo"/>
    </div>
  );
}