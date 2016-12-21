# angular-2-socket.io-mysql-chat
Angular 2 chat

Clone repository
`
git clone https://github.com/LeGront/angular-2-socket.io-mysql-chat.git
`

Install Angular CLI, if it not installed
`
npm install -g angular-cli
`

`
cd ./YOU_FOLDER
`
Install packages
`
npm i
`

Create MySQL DataBase and configure in `./models/db.ts`, then import dump from `./dump.sql` if you use MySQL < 5.7 you need replace `  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,` to `  `created` datetime NOT NULL,`

For start Angular 2 
`
ng serve
`

For start Node `
node server/server.js
`
