# Starter instruktioner

1. Clona projektet. Kör från kommandoprompt: git clone https://exsitec1.visualstudio.com/DefaultCollection/Digitalisering/_git/starter

## Server
1. Öppna Server solution i Visual Studio (c:\[dinProjektArea]\Starter\server\Server.sln).
2. Kör kommandot "update-database" i "Package manager console" för att sätta upp databasen. Logic ska vara valt som default project i package manager console och vara satt som startup project.
(Se till att ha en databasinstans installerad, samt kontrollera connectionstring i Logic/Database/DatabaseContextFactory samt Api/appsettings.json)
3. Ändra startup projekt. Högerklicka på solution och välj "Set Startup Projects...". Välj multiple projects och sätt Start på Api och Authorization.
4. Kör igång Server. Klicka på Start (F5).

## App
1. Öppna en kommandopromt. Navigera till app foldern. (c:\[dinProjektArea]\Starter\app).
2. Kör kommandot "npm install"
3. Kör kommandot "npm start"


