# Teach.me

[![GitHub issues](https://img.shields.io/github/issues/mikaelmessias/teachme?style=flat-square)](https://github.com/mikaelmessias/teachme/issues)
[![GitHub forks](https://img.shields.io/github/forks/mikaelmessias/teachme?style=flat-square)](https://github.com/mikaelmessias/teachme/network)
[![GitHub stars](https://img.shields.io/github/stars/mikaelmessias/teachme?style=flat-square)](https://github.com/mikaelmessias/teachme/stargazers)
[![GitHub license](https://img.shields.io/github/license/mikaelmessias/teachme?style=flat-square)](https://github.com/mikaelmessias/teachme/blob/master/LICENSE)
[![works badge](https://cdn.jsdelivr.net/gh/nikku/works-on-my-machine@v0.2.0/badge.svg)](https://github.com/nikku/works-on-my-machine)

Projeto desenvolvido para a disciplina de Tecnologia em Desenvolvimento de Sistemas da UTFPR (2019.2).

O Teach.me é uma plataforma desenvolvida com o objetivo de unir estudantes de computação com profissionais experientes em diversas tecnologias e linguagens de programação.

## Instalação e configuração

### Clone o repositório remoto

``git clone https://github.com/mikaelmessias/teachme.git``

### Instale as dependências

``yarn install``

### Configure as variáveis de ambiente em backend/.env
DATABASE={string de conexão com o MongoDB}

PORT={porta onde será executada a instância do servidor backend}

FROM_EMAIL={endereço utilizado como destinatário em emails enviados ao usuário}

FROM_PASSWORD={senha do endereço de email}

JWT_TOKEN={chave utilizada para criptografar/descriptografar as senhas dos usuário}

### Inicie o servidor dentro da pasta backend/
``yarn dev``

### Inicie o projeto CRA dentro da pasta frontend/
``yarn start``

## Meta

Mikael P. Messias - [devmikecry](https://twitter.com/devmikecry) - mikaelpmessias@gmail.com

Distribuído sob a licença MIT. Consulte LICENSE para obter mais informações.

https://github.com/mikaelmessias/teachme
