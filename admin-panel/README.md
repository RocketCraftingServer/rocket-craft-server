
## Admin Panel

 Test route with web view UI.

 Public RocketCraftingServer API at http://maximumroulette.com/
 Admin panel (this) : http://maximumroulette.com/admin

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

Prepare deps:
```js
  npm install
```

Run on own computer:
```js
  npm run serve
```

Do it on local then just copy `dist` folder files intro your public server:
You can put it in any destination folder. Api route will be always http://DOMAIN.com/rocket/[any route]
[Plug and play in web manire]
```js
  npm run build
```

This is web part access [npm run serve]:
http://localhost:3000/

But also you can access on:

   http://localhost:PORT/

 - In this case you need to run `npm run build`
   to make update if you use dist folder[build].

#### Running server
This is `npm run dev` output:
```js
> node server localhost nik

 --------------------------------------------
 -> Server running under dev configuration
 -> domain dev: localhost
 -> masterServerKey: rocket-server-app-database
 -> connectorPort: 80  [443] or any other
 -> protocol: http
 -> databaseName: rocket-master-base1
 --------------------------------------------
RocketRoute loaded with success.
ROCKET LAUNCH ON PORT 80. Good luck ...
```

## Routes Data

 - /rocket/login/
 


## Admin Panel Credits 

 - Image by <a href="https://pixabay.com/users/talhakhalil007-5671515/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4311575">talha khalil</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4311575">Pixabay</a>

 - Image by <a href="https://pixabay.com/users/yuri_b-2216431/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3262811">Yuri_B</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3262811">Pixabay</a>
 
 - Image by <a href="https://pixabay.com/users/dawnydawny-2157612/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2442125">dawnydawny</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2442125">Pixabay</a>

 - Image by <a href="https://pixabay.com/users/dawnydawny-2157612/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2573307">dawnydawny</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2573307">Pixabay</a>