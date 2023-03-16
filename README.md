# Womix

This project is to help entrepenure women to sell their products online.

## Set development environment

### Angular client

#### Install node modules

```
/c/Projects/Womix/client

npm i --legacy-peer-deps
```

#### Install local certificate for https

For this you need mkcert installed

Installation guideline here --> [link](https://github.com/FiloSottile/mkcert)

##### The first time on your PC

This one is to install a certificate for your PC, this is a one-time use command.

```
/c/Projects/Womix/client/ssl

mkcert -install
```

##### Install local certificate

Each time you clone the repository, or each time you create a branch, the local certificate needs to be installed in order to develop the Angular client application over `https`.

```
/c/Projects/Womix/client/ssl

mkcert localhost
```

#### Build the Angular client

This will build the built angular client application inside `API/wwwroot`.

These files are used once the API project is in production mode, but it is required for development.

```
/c/Projects/Womix/client

ng build
```

#### Run the Angular client

```
/c/Projects/Womix/client

ng serve
or 
ng s
```

### .NET Backend

#### Install Packages

Do this until all packages are installed.

```
/c/Projects/Womix

dotnet restore
```

#### Delete the Sqlite files

Delete the following files if they exist.

This runs the migration with the latest database scheme, and it seeds the information after.

```
/c/Projects/Womix/API

entities.db
identity.db
```

#### Run the API

```
/c/Projects/Womix/API

dotnet watch run
```

## For development

### Angular

#### Angular help

```
/c/Projects/Womix/client

ng help
```

#### Show help for the `generate` command

```
/c/Projects/Womix/client

ng generate help
or
ng g help
```

### .NET API/Backend

#### To create Entity Framework Migrations

##### For the Identity Database Context

```
/c/Projects/Womix

dotnet-ef migrations add IdentityMigrationName -p Infrastructure -s API -c IdentityContext -o Identity/Migrations
```

##### For the Entities Database Context

```
/c/Projects/Womix

dotnet-ef migrations add EntityMigrationName -p Infrastructure -s API -c DataContext -o Data/Migrations
```
