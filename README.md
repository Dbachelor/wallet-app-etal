# Project Setup

- npm install
- rename .env.local to .env
- edit datasource.config.ts match your database credentails i.e username, pasword, database.
- run migrations: npm run migration:run
  - the above command will seed currency, role, user tables
- start app: npm run start:dev


- by running migrations, an admin user will be created with the details below.
  - username: "0000"
  - password: "password"


