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