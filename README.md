## Steps to run this project:

1. Run `yarn install` command
2. Setup database settings inside `data-source.ts` file
3. Run `nodemon src/index.ts` command

## steps to create migration

1. Run `typeorm migration:create [path]` command
2. RUn `npm run migrate` command

## steps to create entity

1. Run `typeorm entity:create [path]` command

## environment configuration variables (.env)

- DB_HOST
- DB_USER
- DB_PORT
- DB_PASSWORD
- DB_NAME
