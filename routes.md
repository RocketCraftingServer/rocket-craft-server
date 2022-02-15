

### Login:
Request
```js
fetch("/rocket/login/", { method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },  body: JSON.stringify( { emailField: "zlatnaspirala@gmail.com",
                                passwordField: '123123123'})  } ).
   then(response => response.json()).
   then(data => console.log(data));
```

### Forgot password:
Request
```js
  fetch("/rocket/forgot-pass", { method: 'POST', headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },  body: JSON.stringify( { emailField: "zlatnaspirala@gmail.com" })  } ).
   then(response => response.json()).
   then(data => console.log(data));
```
Response
```json
{ 
  message: "Please check your email for confirmation code.",
  rocketStatus: "CHECK_EMAIL_FORGOT_PASSWORD_CODE"
}
```

