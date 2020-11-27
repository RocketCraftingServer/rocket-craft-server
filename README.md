
# node-mongo-account
### Alias `RocketCraftServer`

Basic account session staff based on node.js and MongoDB.
First integration will be for UE rocket-craft projects.

 - Node.js http1.1/http2 server
 - VueTypescript administrator panel project


### Project structure ###

 - First char in name `I` (for example IApp.ts) represent 
   current interface used for generating API documentation.

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

#### Integrated Features:

 - switch theme
 - test basic route
 - basic https server
 