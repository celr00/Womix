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

##### For the Entities Database Context

```
/c/Projects/Womix

dotnet ef migrations add InitialCreate -p Infrastructure -s API -c DataContext -o Data/Migrations
```

To run angular in another port ng s --port 4201

## Deploy to Dev Server

### Change Angular Build Configuration

Change it to 1mb for maximumWarning and 2mb for maximumError.

```
{
  "projects": {
    "client": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1mb",
                  "maximumError": "2mb"
```

### Build Angular Application

```
/c/Projects/Womix/client

ng build
```

### Add Fallback controller and add this to the `Program.cs` file

#### `FallbackController.cs`

```
public class FallbackController : Controller
{
    public IActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
    }
}
```

#### `Program.cs`

```
app.MapControllers();
app.MapFallbackToController("Index", "Fallback");
```

### Start Postgres Instance in Docker

```
/c/Projects/Womix

docker run --name postgres -e POSTGRES_PASSWORD=postgrespw -p 5432:5432 -d postgres:latest
```

### Visual Studio Code Extension for PostgreSQL

Name: PostgreSQL
Developer: Chris Kolkman

### Add the Following Package to `Infrastructure.csproj` with NuGet

```
<Project Sdk="Microsoft.NET.Sdk">
  <ItemGroup>
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="7.0.3" />
  </ItemGroup>
</Project>
```

### Drop the current database (It should be named `womix.db`)

```
/c/Projects/Womix/API

dotnet ef database drop
```

### Change `ConnectionStrings` inside `appsettings.Development.json`

#### Currently (For SQLite)

```
{
  ...
  "ConnectionStrings": {
    "DefaultConnection": "Data source=womix.db"
  }
  ...
}
```

#### New for PostgreSQL

```
{
  ...
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost; Port=5432; User Id=postgres; Password=postgrespw; Database=womix;"
  }
  ...
}
```

#### Change DB Context Service inside `ApplicationServicesExtensions.cs` to `UseNpgsql`

```
services.AddDbContext<DataContext>(opt => {
    opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
});
```

### Delete current Migrations Folder

### Create new migration to user PostgreSQL DB Provider

```
/c/Projects/Womix

dotnet ef migrations add PostgresInitial -p Infrastructure -s API -c DataContext -o Data/Migrations
```

### Configure PostgreSQL VSCode Extension

1. Add Database Connection
2. The hostname of the database --> `localhost`
3. The PostgreSQL user to authenticate --> `postgres`
4. The password of the PostgreSQL user --> `postgrespw`
5. The port number to connect to --> `5432`
6. Use an SSL connection? --> `Standard Connection`
7. Type --> `womix`
8. The display name of the database connection --> `localhost`

### Create `Dockerfile` in the `/API` Folder

```
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app

# copy .csproj and restore as distinct layers
# COPY *.csproj ./
# RUN dotnet restore

# copy everything else and build
COPY . ./
RUN dotnet publish API -c Release -o out

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll" ]
```

### Inside root create file named `.dockerignore`

```
**/bin
**/obj
```

### Create docker build

This step requires a `docker hub` account.

This builds an image named `womix`

```
/c/Projects/Womix

docker build -f API/Dockerfile -t ramirocaste/womix .
```

### Run the docker image

`--rm` --> Removes it from the local containers when it quits from running

`-it` --> **Interactive mode**: to see the logs from `dotnet`

`-p` --> port

```
/c/Projects/Womix

docker run --rm -it -p 8080:80 ramirocaste/womix:latest
```

Running this produces an error.

To fix it paste configuration inside `appsettings.json`

#### `appsettings.json`

```
"ConnectionStrings": {
    "DefaultConnection": "Server=host.docker.internal; Port=5432; User Id=postgres; Password=postgrespw; Database=womix;"
},
"Token": {
    "Key": "super secret key",
    "Issuer": "https://localhost:5001"
},
```

Rebuild the image.

It should be successfull.

In http://localhost:8080 the application should be running.

### Push the image to Docker Hub

This requires to be logged in `docker login`

```
/c/Projects/Womix

docker push ramirocaste/womix:latest
```

### Install flyctl

#### Windows Powershell (admin mode not needed)

```
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

#### Sign in to fly.io

```
fly auth login
```

#### Launch Application with Fly

```
/c/Projects/Womix

fly launch --image ramirocaste/womix:latest

? Choose an app name (leave blank to generate one): womix

? Choose a region for deployment: Guadalajara, Mexico (gdl)

? Would you like to set up a Postgresql database now? Yes

? Select configuration: Development - Single node, 1x shared CPU, 256MB RAM, 1GB disk

? Would you like to set up an Upstash Redis database now? No

? Would you like to deploy now? No
```

`fly.toml`

```
[env]
  ASPNETCORE_URLS="http://+:8080"
  CloudinarySettings__CloudName="dmjdskgd4"
  CloudinarySettings__ApiKey="318856679489316"
```

`Dockerfile`

```
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 8080  <--
```

List secrets --> `fly secrets list`

## Install dotnet ef globally

```
dotnet tool install --global dotnet-ef
```

## Update dotnet ef globally

```
dotnet tool update --global dotnet ef
```

### Add API secrets to fly.io hosting

fly secrets set CloudinarySettings__ApiSecret=VkhhhKr7Ure-pLCmaAS66n-FSu0
fly secrets set TokenKey=estaeslacontraseniamasecretadelmundo

fly deploy

https://womix.fly.dev 


https://fly.io/docs/postgres/connecting/connecting-external/ 


List PostgreSQL Database Application Public IP Address

`fly ips list --app womix-db`

Find IPv4 Address

`fly ips allocate-v4 --app womix-db`

```
VERSION IP              TYPE    REGION  CREATED AT 
v4      137.66.6.188    public  global  27s ago
```

Make a fly.toml file for the DB App

```
fly config save --app womix-db
```

Current fly.toml file

```
# fly.toml file generated for womix on 2023-03-29T21:32:56-06:00

app = "womix"
kill_signal = "SIGINT"
kill_timeout = 5
processes = []

[build]
  image = "ramirocaste/womix:latest"

[env]
  ASPNETCORE_URLS="http://+:8080"
  CloudinarySettings__CloudName="dmjdskgd4"
  CloudinarySettings__ApiKey="318856679489316"

[experimental]
  auto_rollback = true

[[services]]
  http_checks = []
  internal_port = 8080
  processes = ["app"]
  protocol = "tcp"
  script_checks = []
  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

```



docker build -f API/Dockerfile -t ramirocaste/womix .

docker push ramirocaste/womix:latest

docker run --rm -it -p 8080:80 ramirocaste/womix:latest

fly launch --image ramirocaste/womix:latest

fly secrets set CloudinarySettings__ApiSecret=VkhhhKr7Ure-pLCmaAS66n-FSu0

fly secrets set TokenKey=estaeslacontraseniamasecretadelmundo

fly secrets list

fly deploy

https://womix.fly.dev 

DATABASE_URL=postgres://womix:vEAV7yqTEXaJqxL@top2.nearest.of.womix-db.internal:5432/womix?sslmode=disable

git clone https://github.com/celr00/Womix.git

### Publish Application

```
/c/Projects/Womix

dotnet publish -c Release -o publish [app].sln
```

### Delete specific database

- -s Startup
- -p Project
- -c Context

```
/c/Projects/Womix

dotnet ef database drop -s API -p Infrastructure -c DataContext
```

# Install Angular CLI Globally

```
/c/Projects/Womix

npm install -g @angular/cli
```

# Install Dev Cert for dotnet

```
dotnet dev-certs https --trust
```

## Publish application

```
/c/Projects/Womix

dotnet publish -c Release -o publish Womix.sln
```

## Drop database

```
/c/Projects/Womix

dotnet ef database drop -s API -p Infrastructure -c DataContext
```

# Publish

##

```
sudo nano docker-compose.yml
```

## `docker-compose.yml`

```
services:

  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_USER: appuser
    ports:
      - 5432:5432
    volumes:
      - postgres-data:/data

volumes:
  postgres-data:
```

sudo apt-get update

sudo apt-get install docker.io

sudo apt install docker-compose

docker-compose up -d

## Apache

sudo apt update
sudo apt install apache2
a2enmod proxy proxy_http proxy_html rewrite
systemctl restart apache2
sudo ufw app list
sudo ufw allow 'Apache Full'
sudo systemctl status apache2

## Allow ports through firewall for PostgreSQL

sudo ufw allow 5432/tcp

Test you can access the default apache page by browsing to:  http://34.174.115.18

## Create a new directory that will contain our published dotnet app and assign rights to the user:

sudo mkdir /var/womix
sudo chown -R $USER:$USER /var/womix

## Create a new config file for the skinet app:

sudo nano /etc/apache2/sites-available/womix.conf

## Paste in the following configuration which will set up a reverse proxy with the Kestrel server:

### `womix.conf`

```
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

## Enable the womix site by running the following commands:

```
a2ensite womix
ls /etc/apache2/sites-enabled
a2dissite 000-default
systemctl reload apache2
```

## Install the deploy reloaded extension. Create a settings.json file in the .vscode directory and update the IP address and password for your server:

### `settings.json`

```
{
    "deploy.reloaded": {
        "packages": [
            {
                "name": "Version 1.0.0",
                "description": "Package version 1.0.0",
                "files": [
                    "publish/**"
                ]
            }
        ],
        "targets": [
            {
                "type": "sftp",
                "name": "Linux",
                "description": "SFTP folder",
                "host": "ipaddress",
                "port": 22,
                "user": "root",
                "password": "your password",
                "dir": "/var/womix",
                "mappings": {
                    "publish/**": "/"
                }
            }
        ]
    }
}
```

## Change the logging level for the `appsettings.json` to information for the Microsoft logging level:

### `appsettings.json`

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Information",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },
}
```

dotnet publish -c Release -o publish womix.sln

16.  Deploy the files by using the command pallette -> deploy reloaded -> deploy package

17.  Add an endpoint to stripe for to point to the IP address of the server and select the 2 events we want to listen to:  payment_intent.succeeded, payment_intent.payment_failed.  Note the web hook secret as we will need this soon.

http://ipaddress/api/payments/webhook

18.  Back on the linux server create a service config for the kestrel server:

sudo nano /etc/systemd/system/womix-web.service

19.  Update the configuration for your API keys where it says REPLACEME and then paste the config into the nano editor

[Unit]
Description=Kestrel service running on Ubuntu 20.04
[Service]
WorkingDirectory=/var/womix
ExecStart=/usr/bin/dotnet /var/womix/API.dll
Restart=always
RestartSec=10
SyslogIdentifier=womix
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment='Token__Key=supersecretunguessablekey'
Environment='Token__Issuer=http://34.174.115.18'
Environment='ConnectionStrings__DefaultConnection=Server=localhost;Port=5432;User Id=appuser;Password=secret; Database=womix'
[Install]
WantedBy=multi-user.target

20.  Install the .Net runtime using the instructions here:  https://docs.microsoft.com/en-gb/dotnet/core/install/linux-ubuntu#2004-

```
# Get Ubuntu version
declare repo_version=$(if command -v lsb_release &> /dev/null; then lsb_release -r -s; else grep -oP '(?<=^VERSION_ID=).+' /etc/os-release | tr -d '"'; fi)

# Download Microsoft signing key and repository
wget https://packages.microsoft.com/config/ubuntu/$repo_version/packages-microsoft-prod.deb -O packages-microsoft-prod.deb

# Install Microsoft signing key and repository
sudo dpkg -i packages-microsoft-prod.deb

# Clean up
rm packages-microsoft-prod.deb

# Update packages
sudo apt update
```

apt install dotnet-runtime-7.0


## Deploy

```
systemctl restart systemd-journald

sudo systemctl start womix-web.service

netstat -ntpl

journalctl -u womix-web.service --since "5 min ago"
```

## Redeploy

```
#

docker-compose down -v

sudo systemctl stop womix-web.service

(publish)

docker-compose up -d

systemctl restart systemd-journald

sudo systemctl start womix-web.service

netstat -ntpl

journalctl -u womix-web.service --since "5 min ago"

```