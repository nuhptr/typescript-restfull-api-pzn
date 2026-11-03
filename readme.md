# Typescript Restfull Programmer Zaman Now

## General Dependencies

-   [zod](https://zod.dev/) - pnpm add zod (Schema Validation)
-   [winston](https://www.npmjs.com/package/winston) - pnpm add winston (Logger)
-   [uuid](https://www.npmjs.com/package/uuid) - pnpm add uuid (Unique ID) : `not longer used`
-   [@types/uuid](https://www.npmjs.com/package/@types/uuid) - pnpm add @types/uuid (Unique ID) : `not longer used`
-   [helmet](https://www.npmjs.com/package/helmet) - pnpm add helmet (Security)

-   [typescript](https://www.typescriptlang.org/) - pnpm add typescript (Typescript)
    -- npx tsc --init
    -- ubah "module" menjadi "commonjs"
    -- ubah "types": ["jest"] / library test lainnya
    -- ubah "outDir" menjadi "./dist"
    -- ubah "moduleResolution" menjadi "node"
    -- tambahkan `"include": ["src/**/*", "test/**/*"],` dipaling atas
    -- `"baseUrl": "./src"`
    -- `"paths": { "@/*": ["*"] }`

## Testing Dependencies

-   [jest](https://jestjs.io/) - pnpm add jest (Testing)
-   [@types/jest](https://www.npmjs.com/package/@types/jest) - pnpm add @types/jest (Testing)
-   [babel-jest](https://www.npmjs.com/package/babel-jest) - pnpm add babel-jest (Testing)
-   [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) - pnpm add @babel/preset-env (Testing)
-   [@babel/preset-typescript](https://www.npmjs.com/package/@babel/preset-typescript) - pnpm add @babel/preset-typescript (make babel understand typescript)
-   [@jest/globals](https://www.npmjs.com/package/@jest/globals) - pnpm add @jest/globals (make jest globaly available)
-   [supertest](https://www.npmjs.com/package/supertest) - pnpm add supertest (Support Testing)
-   [@types/supertest](https://www.npmjs.com/package/@types/supertest) - pnpm add @types/supertest (Support Testing)

Then add script :

```json
{
    "scripts": {
        "test": "jest --runInBand", // --runInBand for run test in sequence not parallel
        "test:user": "jest user.test.ts",
        "test:contact": "jest contact.test.ts"
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

also script :

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

## Distribution File

For compile entrie typescript project to javascript. Then we can see `./dist` folder appear

```bash
    npx tsc
    OR add in package json "build": "npx tsc"
```

Then you can run the project with :

```bash
    node "./dist/src/main.js"
    OR add in package json "start": "node ./dist/src/main.js"
```

## Express Framework

-   [express](https://expressjs.com/) - pnpm add express
-   [@types/express](https://www.npmjs.com/package/@types/express) - pnpm add @types/express

## Database ORM

-   [prisma](https://www.prisma.io/) - pnpm add prisma
-   [@prisma/client](https://www.npmjs.com/package/@prisma/client) - pnpm add @prisma/client (auto generated client for prisma)
-   npx prisma init
-   Schema User, Contact, Address

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

-   [bcrypt](https://www.npmjs.com/package/bcrypt) - pnpm add bcrypt
-   [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt) - pnpm add @types/bcrypt
