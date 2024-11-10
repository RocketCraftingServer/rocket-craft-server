# Rocket Crafting Servers

## for Rocket Craft (ue4 project) clients.

## General status : `ROCK 2024`

Project original name : `Rocket Crafting Servers`
to avoid misunderstandings with other randomly
similar server names. Rocket is an alias for Unreal engine.

=> Migrate to ue4 builded from source.
=> Only active for now is 4.24.3 , i will wait until finish
`Barbarian Road Mashines` basic demo with one game play map.

### Get server account part:

https://github.com/RocketCraftingServer/rocket-craft-server

Basic account session staff based on node.js and MongoDB.
Integration done:

- Node.js http1.1/http2 server
- Basic session account support (mongoDB)
- Vue-Typescript administrator panel project
- Test clients (rocket-craft repo)
- Rocket-craft client (4.22) exchange IP for opened dedicated users server run.
- Basic implementation for client library `safir` or any vanilljs.

### Run rocketcraftingserver in local (dev):

![](https://github.com/zlatnaspirala/rocket-craft-server/blob/main/non-project-files/tutorial-steps/local-run-rocket-crafting-server.gif)

### Run Admin panel

In term of storage/ [public access for external clients], rocketcraftingserver depens on admin-panel!
Also `npm run serve` will not delete `storage/` folder but `npm run build` will do.

Do not use git or npm commands on your public server. Better way is to build on local and then simple upload project.
Do not use any dev tools on public server it is my personal advice.

![](https://github.com/zlatnaspirala/rocket-craft-server/blob/main/non-project-files/tutorial-steps/local-run-rocket-crafting-admin-panel.gif)

### From ue4 client

    - First case is `Barbarian Road mashines` race game.

![](https://github.com/zlatnaspirala/rocket-craft-server/blob/main/non-project-files/tutorial-steps/profile-preview-in-ue-client-game-brm.png)

### Project structure

- First char in name `I` (for example IApp.ts) represent
  current interface used for generating API documentation.
- Dont upload this project in www, htdocs, public folder
  on you public domain mashine. Like any node.js app.
- Folder `admin-panel` is somekind of sandbox.
  Dont import any file from root like congif.js.
  Even admin access it is still posible for public access.
- Top secret list:
  - system email mailtrap api
  - public database password

<pre>

├── database/
|   ├── data/                    (internal mongodb generated)
├── docs/                        (Output for documentation html)
├── node_modules/                (auto generated)
├── admin-panel/                 [Vue - admin app]
|   ├── dist/                    (auto generated)
|   ├── images/
|   |   └── icons/
|   |   |   └── svgs
|   |   |   └── pngs
|   ├── node_modules/            (auto generated)
|   ├── public/                  [Vue - Public]
|   ├── src/                     [Vue - src]
|   |   └── components/            
|   |       └── administrator/
|   |           └── accounts.vue
|   |       └── profile/
|   |           └── avatar.vue
|   |           └── profile.vue  [ If not visible not active in project like `generic`]
|   |       └── IFooter.ts
|   |       └── IHeader.ts
|   |       └── myFooter.vue
|   |       └── myHeader.vue
|   |   └── local-storage/
|   |   └── my-common/
|   |       └── common-func.ts
|   |       └── literal.ts
|   |   └── styles/
|   |       └── global.scss
|   |       └── style.scss
|   |   └── App.vue
|   |   └── IApp.ts
|   |   └── main.ts
|   |   └── error-instance.ts
|   |   └── shims-tsx.d.ts
|   |   └── shims-vue.d.ts
|   |   └── store.ts
|   ├── .eslintignore
|   ├── .gitignore
|   ├── babel.config.js
|   ├── index.html
|   ├── manifest.web          [PWA - staff]
|   ├── package.json
|   ├── package-lock.json
|   ├── typedoc.json          [Documentation generator config]
|   ├── tsconfig.ts
|   ├── vue.config.js         [PWA - staff]
├── self-cert/                [server side local cert]
├── game-servers/             (Control from config)
|   ├──matrix-roulette        [optimal] WIP
|   ├──hang3d-reborn          [optimal] WIP
├── .gitignore        
├── config.js                 [server side config]
├── LICENCE
├── README.md
├── package.json
├── package-lock.json
├── server.js                   [Main Server]

</pre>

#### Active RocketCraftServer integrated Features List:

<pre>
 - MongoDB integrated      [DONE]
 - Switch theme (style)    [DONE]
   (whole palette ofo colors)
 - Test account route
    - register                 [DONE]
    - register confirmaton     [DONE]
    - login                    [DONE]
    - user                     [DONE]
    - test ue4 clients part    [DONE]
    - clients profile data     [DONE]
 - Basic web app hosting
    - http server               [DONE]
    - https server + ue clients [WIP]

</pre>

#### Active RocketCraftClient engine 4.24.3 integrated Features List:

Client application (all platforms releases/builds) use communication
with rocketCraftServer only on `API` level with http/https protocol.

Only implications between ue client vs server.js is account session status
(in database field online). Logged or not.

<pre>
 - Account routes
    - register form        [DONE]
    - reg/confirmaton form [DONE]
    - login form           [DONE]
    - foast-login [token]  [DONE]
    - profile              [DONE]
</pre>

<pre>
+-------------------------------------------------------------------------------------------------------+
|    Active project use 4.24 ue version - Project name : Barbarian Road Mashines                        |
|    Server use 4.24 ue version fro source                                                              |
|  +-----------------------------------------------------+                                              |
|  SOURCE : https://github.com/zlatnaspirala/rocket-craft                                               |
|  +-----------------------------------------------------+                                              |
|                                                                                                       |
|                                                                                                       |
|      DESKTOPS                            MOBILE     GameConsoles          WEB                         |
| +-------------------------------+   +------------------------------+  +----------------------------+  |
| |                               |   |                              |  |                            |  |
| |   WINDOWS                     |   |  ANDROID       X-Box         |  | Unreal export direct from  |  |
| |  (dedicated server) [DONE]    |   |                              |  | 4.22 or use engine 4.24    |  |
| |                               |   |                              |  |                            |  |
| |   MACOS                       |   |  IOS                         |  | (build from source)        |  |
| |                               |   |                              |  |                            |  |
| |                               |   |                              |  | AdminPanel (ONE PART OF    |  |
| |                               |   |  Sony Playstation            |  |             THIS REPO)     |  |
| |                               |   |                              |  |                            |  |
| |   LINUX  (dedicated server)   |   |  etc                         |  | Also can be used by any    |  |
| |  no implication with account  |   |                              |  | web application fetch call |  |
| |  session http server. [DONE]  |   |                              |  | (API JSON Based content)   |  |
| +-------------------------------+   +------------------------------+  +----------------------------+  |
|                                    rocket Client builds                                               |
|                                    rocket Server builds                                               |
+----------+----------+---------------------------------------------------------------------------------+
           ^          |
           |          |        
           |          |
           |          |        
           |          |
           |          |        WEB SERVER [For hosting ue html5 clients also for rocketcraft api]
           |          |
+--------------------------------------------------------------------------------------------------------+
|          |          |                                                                                  |
|     +----+----------v-----------+                                    +-----------------------------+   |
|     |                           |                                    |                             |   |
|     |      REST API             |                                    |  HTTP, HTTPS (1.1 or 2)     |   |
|     | [/rocket/register]        |                                    |                             |   |
|     | [/rocket/confirmation]    |                                    +-----------------------------+   |
|     | [/rocket/register]        |                                                                      |
|     | [/rocket/login]           |                                                                      |
|     | [/rocket/fast-login]      |                                                                      |
|     | [/rocket/profile/upload]  |                                                                      |
|     | [/rocket/profile]         |                                                                      |
|     | [/rocket/profile-delete]  |                                                                      |
|     | [/rocket/leaderboard]     |                                                                      |
|     +---------------------------+                                                                      |
|                                                                                                        |
|  +------------------------------------------------------------+                                        |
|  SOURCE : https://github.com/zlatnaspirala/rocket-craft-server                                         |
|  +------------------------------------------------------------+                                        |
|                                                                                                        |
+--------------------------------------------------------------------------------------------------------+
|                                            NODEJS CORE                                                 |
+--------------------------------------------------------------------------------------------------------+
|                                           MONGO DATABASE                                               |
+--------------------------------------------------------------------------------------------------------+

</pre>

### Status/info:

- Admin Panel (Vue-ClassComponent-Typescript)
- Debugging proccess for server part with Visual-Code.
  (Launch.json tested on windows)`create folder`.vscode`in root of workspace and copy`launch.json`.
  Please use debugger and learn and feel node iterrator flow.
- Admin ban user [NEXT]
- Active servers list [DONE]
- Admin only - delete profile [done]

## Production

Public RocketCraftingServer API:
Prefix: `rocket`

- http://maximumroulette.com/

Admin panel:

- http://maximumroulette.com/admin

Note:

- Make shiled from `Hacker attacks`.
  Recommended is to run mongo without remote access!
  Make strong database password
  Use permission by definited host be mac-address or ip...

  All this prevent job is minimum action to make your server
  application `stay a live`.

  About <PROFILE>.permission there is no setup this arg from code.
  Use MongoDB console or GUI Mongo DB Compass. This is all free.
  Just replace value `basic` with `admin`.

Basic data:

- Dedicated Server CentOS 8.3
- Build shipping version at the end.

Security:

- Use non standard port it si small but good secury feature.
- If you have mongo on same mashine use bind localhost not domain name.

It is easy to use distribution platform with more servers host mashines.

```js
  mongo --host IP-ADDRESS-OF-MONGODB-SERVER --port PORT_NUMBER
```

Be aware of NAT and need to have opened port if you have firewall active on your server.

- CentOS 8.3

```mongo
 use DB_NAME_ROCKET_ID
 db.author.insert({"name":"Nikola Lukic 2021"})
```

Format:

```bash
firewall-cmd --zone=public --permanent --add-port PORT/tcp
```

Examples for centos in case of signaling server and UE4 server useage:

```bash
sudo firewall-cmd --permanent --add-port=999/tcp
sudo firewall-cmd --permanent --add-port=999/udp
sudo firewall-cmd --permanent --add-port=63000-64535/udp

firewall-cmd --zone=public --permanent --add-port 85/tcp
firewall-cmd --zone=public --permanent --add-port 8888/udp
sudo firewall-cmd --reload

```

### Server flow

For production or stage server dev use `secured` arg and also you need
to have ssl private key and .crt file.
Run:

```js
  npm run app
```

Localhost MongoDB setup:

- run mongodb service on your computer

Then attach it:

```bash
  mongod --dbpath data --bind_ip <DOMAIN>
```

At the end it looks like:

```bash
mongo --host IP-OR-HOST --port SECRET_PORT_CUSTOM -u "userAdmin" --authenticationDatabase "admin" -p
```

Manual operate with database:

```bash
show dbs
use <database_name>
```

```
db.users.update({},{$set : {"role":"user"}},{upsert:false, multi:true})
```

Deep look at package.json in root dir:

```js
  "scripts": {
    "app": "node server maximumroulette.com secured",
    "sameDomain": "node server IP_ADDESS secured"
```

Ue4 Clients ->
Must be game engine builded from source.
Generate visual studio source files.
Build on right click -> first ue4 instance than build game instance.
Use Development or Shipping - Editor
If you wanna dedicated server build Development-Server or Shipping-Server build
configuration in visual studio.
For package run also game engine from source and simple package selected platform.
For all platforms

4.24.3 Main reason is devices with opengles < 3.0 support plus Linux supported
websocket experimental net driver [also dedicated server works fine].

This is `Tradicional way`.
On finish whole this staff i will add future `modern way` brach ( 4.26 > )
with last ue4 upgrade.

## GamePlay Servers NEW FEATURE [wip]

Best solution for one direction communication.
First example comes for roulette server logic.

Server part:
```js
/**
 * @description
 * GamePlay Servers part
 * Based on `Server Events` tech.
 */
if (config.gameServers.matrixRoulette.active == true) {
  // let clients = [];
  let facts = [];
  const matrixRouletteCore = require("./game-servers/matrix-roulette/roulette-server.js");
  matrixRouletteCore.clients = [];
  matrixRouletteCore.init();

  hostingHTTP.get("/matrix-roulette-status", (request, response) =>
    response.json({clients: matrixRouletteCore.clients.length})
  );

  function eventsHandler(request, response, next) {
    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    response.writeHead(200, headers);
    const data = `data: ${JSON.stringify(facts)}\n\n`;
    response.write(data);
    const clientId = Date.now();
    const newClient = {id: clientId, response};
    matrixRouletteCore.clients.push(newClient);
    request.on("close", () => {
      console.log(`${clientId} Connection closed`);
      matrixRouletteCore.clients = matrixRouletteCore.clients.filter(
        client => client.id !== clientId
      );
    });
  }

  hostingHTTP.get("/matrix-roulette", eventsHandler);

  // |In case of adding new Event from client by the POST call.
  // No need for roulette logic.
  // async function addFact(request, respsonse, next) {
  // 	const newFact = request.body;
  // 	facts.push(newFact);
  // 	respsonse.json(newFact)
  // 	return sendEventsToAll(newFact);
  // }
  // Update from clients
  // hostingHTTP.post('/fact', addFact);
}
```


On client:
From `matrix-engine-starter` project MAtrixRoulette:
```js
console.log("ServerEvent[maximumroulette.com/matrix-roulette]");
const events = new EventSource("https://maximumroulette.com/matrix-roulette");
events.onmessage = event => {
  const parsedData = JSON.parse(event.data);
  if (typeof parsedData.matrixRoulette === "undefined") {
    return;
  }
  console.log(
    "[serverEvent:matrix-roulette]",
    parsedData.matrixRoulette.status
  );
  if (parsedData.matrixRoulette.status == "MEDITATE") {
    //
    this.status.game = "MEDITATE";
    dispatchEvent(
      new CustomEvent("MEDITATE_SERVER", {
        detail: parsedData.matrixRoulette.counter,
      })
    );
  } else if (parsedData.matrixRoulette.status == "RESULT") {
    //
    this.status.game = "RESULT";
    console.log(
      "[serverEvent:matrix-roulette[win number]]",
      parsedData.matrixRoulette.winNumber
    );
  } else {
    alert();
  }
};
events.onerror = event => {
  console.log("ServerEvent Error:", event);
};
```

More:
https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app

## Geolocation ip support [optimal] WIP

Test -> https://radar.cloudflare.com/ip/87.116.141.57
https://ipinfo.io/account/home?service=google&loginState=create

## Test from browser console

Read more at routes.md

From http://maximumroulette.com/ or from your own server.

- Login:

```js
fetch("/rocket/login/", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    emailField: "zlatnaspirala@gmail.com",
    passwordField: "123123123",
  }),
})
  .then(response => response.json())
  .then(data => console.log(data));
```

For private job i also run KureOrange at:
https://kure.maximumroulette.com/

## Dedicated ue4 server from rocket-craft project [not rocketcraftingserver].

- Success build for linux cent os 8.3
- Success build for windows 10

Run on 5$ server dedicated server with:
(Add permise for ShooterGame/Binaries/Linux/ShooterServer-Linux-Shipping )

```
 ./ShooterServer.sh /Game/Maps/Sanctuary?game=FFA?listen?Bots=0
```

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg)](https://www.digitalocean.com/?refcode=c8bc19d26557&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

### Join chat on slack

(GamePlay platform Rock)[https://join.slack.com/t/gameplay-rock/shared_invite/zt-ffcgl80x-CYu4s~YC0bD9Od9_bkqmzw]
