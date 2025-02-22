# Bookmark manager

This is a self hosted productivity tool where i store all my bookmarks.

stack: nextjs, tailwind, sequelize, mariadb.

## Commands
### dev
npm i then npm run dev
### prod
npm i m npm build, npm start



## All the sequelize command

npx sequelize-cli db:migrate
npx sequelize-cli model:generate --name Bookmark --attributes title:string,url:string
npx sequelize-cli migration:generate --name add_columns_to_bookmarks
npx sequelize-cli db:migrate:undo

npm install mysql2 --save

https://www.npmjs.com/package/react-spinners


https://www.npmjs.com/package/react-toastify

## Docker
docker build -t bookmarkmanager .
docker run -p 3000:3000 bookmarkmanager


## TODO
left side sliding  bar
export import bookmarks and tags
delete tags function
responsive design
migrate to sqlite db
add animations
edit bookmark
open chromes bookmarks