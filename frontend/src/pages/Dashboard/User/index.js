import React from 'react';

export default function DashboardUser({ history }) {
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