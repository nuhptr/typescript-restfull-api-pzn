# TypeScript REST API

A REST API for managing users, contacts, and contact addresses. The project is built with TypeScript, Express, Prisma, and MySQL, with request validation, password hashing, token-based authentication, and automated tests.

## What this project includes

- **TypeScript** for typed application code
- **Express** for HTTP routes and middleware
- **Prisma** for MySQL database access and migrations
- **Zod** for request validation
- **Helmet** for HTTP security headers
- **Winston** for application logging
- **bcrypt** for password hashing
- **Jest** and **Supertest** for automated API tests

## Run the project

### Prerequisites

- Node.js and npm
- MySQL

### 1. Install dependencies

From the project directory, run:

```bash
npm install
```

The required packages are already listed in `package.json`; you do not need to install them one by one.

### 2. Configure the database

Create a MySQL database, then add a `.env` file in the project root with its connection string:

```dotenv
DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database_name>"
```

Replace the placeholders with your MySQL username, password, and database name. Prisma reads this value from the schema in `prisma/schema.prisma`.

### 3. Generate Prisma Client and apply migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

The migration command uses Prisma's development migration workflow. Use it with a development database.

### 4. Build and start the API

```bash
npm run build
npm start
```

The server listens on port `3000`.

### 5. Run the tests

```bash
npm test
```

Tests run sequentially. To run tests for one resource, use `npm run test:user`, `npm run test:contact`, or `npm run test:address`.

## Project setup and configuration

This section explains how the project is organized and configured. The configuration is already in this repository, so these steps are not required again when following the run instructions above.

### TypeScript

TypeScript settings are in [`tsconfig.json`](tsconfig.json). The configuration includes source and test files, compiles output into `dist/`, targets ES2016, and supports the `@/` import alias used by the application.

To initialize TypeScript in a new project, use:

```bash
npx tsc --init
```

For this project, keep the existing `tsconfig.json` rather than replacing it with a generated default.

### Express

The Express application is configured in `src/application/web.ts`. It enables JSON request parsing, Helmet security headers, public and authenticated routes, and centralized error handling.

The application entry point is `src/main.ts`. Express and its TypeScript types are already included in the project dependencies.

### Prisma and MySQL

The Prisma schema is in `prisma/schema.prisma`. It defines the `User`, `Contact`, and `Address` models and their relationships.

For a new project, Prisma can be initialized with:

```bash
npx prisma init
```

In this repository, Prisma is already configured for MySQL. The available database commands are:

| Command                   | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| `npm run prisma:generate` | Generate Prisma Client from the schema     |
| `npm run prisma:migrate`  | Create and apply a development migration   |
| `npm run prisma:studio`   | Open Prisma Studio to inspect the database |

### Passwords and authentication

Passwords are hashed with `bcrypt`; authenticated routes use an API token sent in the `X-API-TOKEN` request header. The public user routes are for registration and login. The authentication middleware protects user, contact, and address operations.

### Testing

Jest and Supertest are used to test the API. Test files are in `test/`, and the Jest settings are in `package.json`.

| Command                | Tests         |
| ---------------------- | ------------- |
| `npm test`             | All tests     |
| `npm run test:user`    | User tests    |
| `npm run test:contact` | Contact tests |
| `npm run test:address` | Address tests |

Jest runs with `--runInBand` so tests execute one at a time.

### Babel configuration

Jest uses `babel-jest` to transform TypeScript test files. The Babel configuration is already provided in `babel.config.json`:

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

The required Babel packages are listed in `package.json` and are installed with `npm install`. No additional Babel setup is needed to run this project.

### Sending requests with `manual.test.http`

The [`manual.test.http`](manual.test.http) file contains sample requests for the user, contact, and address endpoints. To run them from VS Code:

1. Install the **REST Client** extension (`humao.rest-client`) from the VS Code Extensions view.
2. Start the API with `npm start` after completing the database setup.
3. Open `manual.test.http` and select **Send Request** above a request.
4. For authenticated requests, replace the example `X-API-TOKEN` value with a token returned by the login request. Update example contact and address IDs to match records in your database.

The REST Client extension is a VS Code tool; it does not need to be added to the project's npm dependencies.

### Build and start scripts

The build and start commands are already defined in `package.json`:

```bash
npm run build
npm start
```

The build compiles the TypeScript source into `dist/`; the start script runs `dist/src/main.js`.

## API documentation

See the endpoint references for request fields, response formats, and examples:

- [User API](doc/user.md)
- [Contact API](doc/contact.md)
- [Address API](doc/address.md)

## Repository structure

```text
src/
├── application/  # Express app, database client, and logging
├── controller/   # HTTP request handlers
├── error/        # Application error types
├── middleware/   # Authentication and error handling
├── model/        # API data models
├── route/        # Public and authenticated routes
├── services/     # Application and database operations
└── validation/   # Request schemas and validation helpers
prisma/           # Prisma schema and database migrations
test/             # API tests
doc/              # API documentation
```

## Dependency groups

The dependencies are declared in `package.json` and grouped here by purpose:

- **Application:** Express, Helmet, Zod, Winston, bcrypt, and Prisma Client
- **Build and database tooling:** TypeScript and Prisma CLI
- **Testing:** Jest, Babel Jest, and Supertest
- **Type support:** TypeScript type packages for Express, Jest, Supertest, bcrypt, and UUID

`uuid` and `@types/uuid` remain listed in the dependencies but are not actively used by the current implementation.
