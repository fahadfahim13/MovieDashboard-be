
## Getting Started

Create an environment file called .env.local in root directory and put the below code there:
```bash
PORT=8888
DATABASE_URL=mongodb+srv://dbuser_e:dbpassword_e@cluster0.aog41.mongodb.net/tv-app?retryWrites=true&w=majority # Please use your MongoDB URL. This url will not have enough network access for local running.
JWT_ACCESS_TOKEN_SECRET_KEY=MOVIE_APPLICATION_BE_JWT_AUTH_ACCESS_TOKEN_SECRET_KEY
JWT_REFRESH_TOKEN_SECRET_KEY=MOVIE_APPLICATION_BE_JWT_AUTH_REFRESH_TOKEN_SECRET_KEY
```

Second, install the packages from package.json. To do this, run:
```bash
npm i
#or
yarn
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `RBAC - Movie Dashboard.postman_collection.json` file in the Postman to access all the APIs.
