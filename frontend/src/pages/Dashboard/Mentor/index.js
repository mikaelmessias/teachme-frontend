import React from 'react';

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
    localStorage.removeItem('token');
    localStorage.removeItem('access');

    history.push('/login');
  }

  return(
    <div>
      <button onClick={logout}>
        Sair
      </button>
    </div>
  );
}