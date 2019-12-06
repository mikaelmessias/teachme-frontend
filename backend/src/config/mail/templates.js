module.exports = {
  welcome(name, email) {
    return `<html>
    <head>
      <style>
        @import url(https://fonts.googleapis.com/css?family=IBM+Plex+Sans&display=swap);body{background-color:#7219e6;color:#fff}.container{width:500px;margin:0 auto}*{font-family:'IBM Plex Sans',sans-serif;text-align:center}.block{display:block}.btn,h2{text-transform:uppercase}img{margin:0 auto;width:200px;padding:20px}h1{font-size:30px;margin:20px 0 0 0}h2{margin:0 0 10px 0}.btn{border-radius:50px;text-decoration:none;width:300px;padding:20px;background-color:#c6c6c6;color:#6717d1;font-weight:700;margin:30px auto;transition:all .2s}.btn:hover{background-color:#601791;color:#fff}.subtitle{font-size:22px}.description{font-size:16px;margin-top:20px}.no-spacing{margin:0;padding:0}
      </style>
    </head>
    <body>
      <div class="container">
        <img src="https://i.imgur.com/8f40TA3.png" alt="Logo"/> 
        <h1>Bem vindo, jovem ${name}!</h1>
        
        <br>
    
        <span class="subtitle block">
          Está pronto pra dar um boost na carreira?
        </span>

        <span class="block">
          <img style="width: 300px; padding: 0;" src="https://i.imgur.com/n6PUp8i.png" alt="Entre já no Teach Me"/>
        </span>
        
        <span class="description block">
          Primeiramente, parabéns! Se você se cadastrou no Teach.me, significa que você está em busca de aumentar seu conhecimento para alcançar seus objetivos.
        </span>
        
        <span class="block" style="font-size: 20px; margin-top: 20px;">
          Que tal começar agora?<br/>Entre e acesse todos os nosso recursos incríveis!
        </span>

        <a class="btn block" href="http://localhost:3000/">Continuar</a>
        
        <h2>Seus dados</h2>
        <p class="no-spacing">${name}</p>
        <p class="no-spacing">${email}</p>
      </div>
    </body>
    </html>`
  }
}