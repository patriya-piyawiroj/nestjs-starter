## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Dependencies
uuid
class-transformer
class-validator           // decorators that provide validation
typeorm @nestjs/typeorm
pg                        // db driver

// Authentication 
bcrypt                // password encryption
@nestjs/jwt           // nest js integration
@nestjs/passport      // nest js integration
passport              // authentication middleware for Node apps
passport-jwt          // jwt specific strategy
@types/passport-jwt   // typescript integration with jwt

@hapi/joi      // config schema validation
@types/hapi    // Dev type definitions

docker run --name mongo -p 27017:27017 -d mongo
npm install prisma --save-dev
npx prisma init

// for swagger tags
class-validator-jsonschema
```