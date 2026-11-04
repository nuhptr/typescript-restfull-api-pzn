# TypeScript RESTful API Project

A backend project built with TypeScript, Express, Prisma, and Jest for building and testing a REST API with clear architecture, validation, and structured middleware flow.

## Overview

This project demonstrates a practical backend setup using:

- TypeScript for static type safety
- Express for HTTP routing and middleware
- Prisma as the ORM layer for database access
- Zod for schema validation
- Winston for application logging
- Jest + Supertest for API testing

## Project Dependencies

### General Dependencies

- [zod](https://zod.dev/) - schema validation
- [winston](https://www.npmjs.com/package/winston) - structured logging
- [uuid](https://www.npmjs.com/package/uuid) - unique ID generation (`currently not actively used`)
- [@types/uuid](https://www.npmjs.com/package/@types/uuid) - TypeScript types for UUID (`currently not actively used`)
- [helmet](https://www.npmjs.com/package/helmet) - HTTP security headers
- [typescript](https://www.typescriptlang.org/) - TypeScript compiler and type system

### Testing Dependencies

- [jest](https://jestjs.io/) - testing framework
- [@types/jest](https://www.npmjs.com/package/@types/jest) - TypeScript support for Jest
- [babel-jest](https://www.npmjs.com/package/babel-jest) - Babel integration for Jest
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) - JavaScript environment preset
- [@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript) - TypeScript support for Babel
- [@jest/globals](https://www.npmjs.com/package/@jest/globals) - global test utilities
- [supertest](https://www.npmjs.com/package/supertest) - HTTP testing library
- [@types/supertest](https://www.npmjs.com/package/@types/supertest) - TypeScript support for Supertest

### Framework and ORM Dependencies

- [express](https://expressjs.com/) - web framework
- [@types/express](https://www.npmjs.com/package/@types/express) - TypeScript types for Express
- [prisma](https://www.prisma.io/) - Prisma CLI and schema tooling
- [@prisma/client](https://www.npmjs.com/package/@prisma/client) - generated Prisma client

### Security Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt) - password hashing
- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt) - TypeScript support for bcrypt

## TypeScript Configuration

Initialize TypeScript:

```bash
npx tsc --init
```

Recommended configuration:

```json
{
   "include": ["src/**/*", "test/**/*"],
   "compilerOptions": {
      "target": "es2016",
      "module": "commonjs",
      "moduleResolution": "node",
      "baseUrl": "./src",
      "paths": {
         "@/*": ["*"]
      },
      "types": ["jest"],
      "outDir": "./dist",
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true,
      "strict": true,
      "skipLibCheck": true
   }
}
```

## Test Configuration

Add the following to `package.json`:

```json
{
   "scripts": {
      "test": "jest --runInBand",
      "test:user": "jest user.test.ts",
      "test:contact": "jest contact.test.ts",
      "test:address": "jest address.test.ts"
   },
   "jest": {
      "transform": {
         "^.+\\.[t|j]sx?$": "babel-jest"
      },
      "moduleDirectories": ["node_modules", "src"],
      "moduleNameMapper": {
         "@/(.*)": "<rootDir>/src/$1"
      }
   }
}
```

Add Babel config:

```json
{
   "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

## Build and Run

Compile the project:

```bash
npx tsc
```

Or add this script to `package.json`:

```json
{
   "scripts": {
      "build": "npx tsc"
   }
}
```

Then run the application:

```bash
node ./dist/src/main.js
```

Or add:

```json
{
   "scripts": {
      "start": "node ./dist/src/main.js"
   }
}
```

## Express Setup

Install:

```bash
npm install express @types/express
```

This project uses Express with:

- JSON request parsing
- security headers via Helmet
- route registration for public and private APIs
- a centralized error middleware

## Prisma Setup

Initialize Prisma:

```bash
npx prisma init
```

Define models such as User, Contact, and Address.

Add Prisma scripts:

```json
{
   "scripts": {
      "prisma:generate": "npx prisma generate",
      "prisma:migrate": "npx prisma migrate dev",
      "prisma:studio": "npx prisma studio"
   }
}
```

## Password Security

Install:

```bash
npm install bcrypt @types/bcrypt
```

This project uses `bcrypt` for secure password hashing and token-based access control for authenticated routes.

## Notes

- `uuid` is included in the dependency list, but it is no longer actively used in the current project implementation.
- This project follows a clean layered architecture: controller, service, model, validation, middleware, and route separation.
- `--runInBand` is used in the test script so Jest runs tests sequentially rather than in parallel.
