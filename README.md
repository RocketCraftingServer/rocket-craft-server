
# node-mongo-account
### Alias `RocketCraftServer`

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
├── docs/  
├── node_modules/                  (auto generated)
├── admin-panel/                   [Vue - admin app]
|   ├── dist/                      (auto generated)
|   ├── images/
|   |   └── icons/
|   |   |   └── svgs
|   |   |   └── pngs
|   ├── node_modules/              (auto generated)
|   ├── public/  
|   ├── src/                       [Vue - admin app]
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
|   ├── manifest.web
|   ├── package.json
|   ├── package-lock.json
|   ├── typedoc.json
|   ├── tsconfig.ts
|   ├── vue.config.js
├── self-cert/
├── .gitignore  
├── config.js  
├── LICENCE
├── README.md
├── package.json
├── package-lock.json
├── server.js

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
|      DESKTOPS                            MOBILE                           WEB                         |
| +-------------------------------+   +------------------------------+  +----------------------------+  |
| |                               |   |                              |  |                            |  |
| |   WINDOWS                     |   |  ANDROID                     |  | Unreal export direct from  |  |
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

