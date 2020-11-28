
## Admin Panel

 Test route with web view UI.

### Style

  - Use inline 
  - CSS
  - SCSS 

  With `scoped` atrribute for components.

  Themes definition:
  `node-mongo-account/admin-panel/src/styles/style.scss`

  Icons:
  https://fontawesome.com/v4.7.0/icons/

### Script

Vue supported with typescrypt.

#### Run on local mashine:
```js
  npm run dev 
  npm run serve
```

This is web part access:
http://localhost:3000/

But also you can access on:
http://localhost:30100/
 - In this case you need to run `npm run build`
   to make update.

#### Running server
This is `npm run dev` output:
```js
> node server localhost nik

 --------------------------------------------
 -> Server running under dev configuration
 -> domain dev: localhost
 -> masterServerKey: rocket-server-app-database
 -> connectorPort: 30100
 -> protocol: http
 -> databaseName: rocket-master-base1
 --------------------------------------------
RocketRoute loaded with success.
ROCKET LAUNCH ON PORT 30100. Good luck ...
```
