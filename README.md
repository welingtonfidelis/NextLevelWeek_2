# Next Level Week 2

Esse projeto é resultado da segunda Next Level Week da equipe RocketSeat. Nele foram aplicadas as tecnologias de NodeJs, Reactjs, React Native e Sqlite3 (através do query builder [knex]) para construção de uma aplicação chamada **Proffy**, que tem objetivo de disponibilizar o cadastro de pessoas para aturaem como professores particulares e que outras pessoas interesadas nestas aulas possam entrar em contato. 

### Requisitos

* [NodeJs] - Nodejs 10 ou superior;
* [Expo] - Aplicativo Expo instalado em seu dispositivo móvel;

### Instalação

Clonar este projeto, rodar o comando npm install ou yarn install nos diretórios **api**, **web** e **mobile** para que sejam baixadas as dependências necessárias. Voltando para a pasta **server**, 
execute o comando *npm run knex:migrate* ou *yarn knex:migrate* para que seja criado o arquivo .sqlite, onde ficará seu banco de dados. Por fim, execute o comando *npm start* ou *yarn start* para que o servidor seja iniciado na porta 3001 (o que pode ser alterado no arquivo server.tsx).
Agora, dentro da pasta web, execute o comando *npm start* ou *yarn start* para que o sistema seja executado em seu navegador.
Por fim, dentro da pasta mobile, execute o comando *npm start* ou *yarn start* para que o servidor **metro** seja executado e você possa escanear o QRCode com seu aplicativo do expo e execute o aplicativo.

### Utilização
[neste link] é psosível efetuar o download da collection do [postman] que contém exemplo de acesso às rotas na api.

### Contato
welingtonfidelis@gmail.com
Sugestões e pull requests são sempre bem vindos =) 

License
----

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Expo]: <https://expo.io/>
[NodeJs]: <https://nodejs.org/en/>
[knex]: <http://knexjs.org/>
[Sequelize]: <https://sequelize.org/>
[Postman]: <https://www.postman.com/downloads/>
[neste link]: <https://drive.google.com/file/d/1VtJm5w7-NLsoG3YXdWligcvzSH-w9vBZ/view?usp=sharing>

;
