
# Rocket Craft Server

Basic account session staff based on node.js and MongoDB.
First integration will be for UE rocket-craft projects.

 - Node.js http1.1/http2 server
 - VueTypescript administrator panel project


### Project structure ###

 - First char in name `I` (for example IApp.ts) represent 
   current interface used for generating API documentation.
 - Dont upload this project in www, htdocs, public folder
   on you public domain mashine. Like any node.js app.
 - Folder `admin-panel` is somekind of sandbox.
   Dont import any file from root like congif.js.
   Even admin access it is still posible for public access.
 - Top secret list: 
      - system email password
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
|   |   └── local-storage/
|   |   └── my-common/
|   |       └── common-func.ts
|   |       └── literal.ts
|   |   └── styles/
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
├── .gitignore        
├── config.js                 [server side config]
├── LICENCE
├── README.md
├── package.json                
├── package-lock.json
├── server.js                   [Main Server]

</pre>

#### Active Integrated Features List:
<pre>
 - MongoDB integrated      [DONE]
 - Switch theme (style)    [DONE]
    - Orange
    - Light
    - Dark
 - Test account route
    - register             [DONE]
    - register confirmaton [DONE]
    - login                [WIP]
    - user                 [WIP]
 - Basic http/https server [DONE]
</pre>


<pre>
+-------------------------------------------------------------------------------------------------------+
|                                                                                                       |
|  SOURCE : https://github.com/zlatnaspirala/rocket-craft                                               |
|  +-----------------------------------------------------+                                              |
|                                                                                                       |
|                                                                                                       |
|      DESKTOPS                            MOBILE     GameConsoles          WEB                         |
| +-------------------------------+   +------------------------------+  +----------------------------+  |
| |                               |   |                              |  |                            |  |
| |   WINDOWS                     |   |  ANDROID       X-Box         |  | Unreal export direct from  |  |
| |                               |   |                              |  | 4.22 or use engine who was |  |
| |   MACOS                       |   |  IOS                         |  | builded from source.       |  |
| |                               |   |                              |  |                            |  |
| |   LINUX                       |   |  etc                         |  | Also can be used by any    |  |
| |                               |   |                              |  | web application            |  |
| +-------------------------------+   +------------------------------+  +----------------------------+  |
|                                    rocket Client builds                                               |
+----------+----------+---------------------------------------------------------------------------------+
           ^          |
           |          |
           |          |
+-------------------------------------------------------------------------------------------------------+
|          |          |                                                                                 |
|     +----+----------v-------+                                       +-----------------------------+   |
|     |                       |                                       |                             |   |
|     |     REST API          |                                       |  HTTP, HTTPS (1.1 or 2)     |   |
|     |                       |                                       |                             |   |
|     |                       |                                       +-----------------------------+   |
|     |                       |                                                                         |
|     |                       |                                                                         |
|     |                       |                                                                         |
|     +-----------------------+                                                                         |
|                                                                                                       |
+-------------------------------------------------------------------------------------------------------+
|                                            NODEJS CORE                                                |
+-------------------------------------------------------------------------------------------------------+
|                                           MONGO DATABASE                                              |
+-------------------------------------------------------------------------------------------------------+

</pre>

### Features 
 
 `- Admin Panel (Vue-ClassComponent-Typescript)`

 `- Debugging proccess for server part with Visual-Code.
    (Launch.json tested on windows)`
    create folder `.vscode` in root of workspace and copy `launch.json`.

