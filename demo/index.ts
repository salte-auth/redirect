import { SalteAuth, Generic } from '@salte-auth/salte-auth';
import { Redirect } from '../src/redirect';

const auth = new SalteAuth({
  providers: [
    new Generic.OpenID({
      login(): string {
        return 'https://salte-os.auth0.com/authorize';
      },

      logout(): string {
        return this.url('https://salte-os.auth0.com/v2/logout', {
          client_id: this.config.clientID,
          returnTo: this.config.redirectUrl,
        });
      },

      clientID: '9JTBXBREtckkFHTxTNBceewrnn7NeDd0',
      responseType: 'id_token'
    })
  ],

  handlers: [
    new Redirect({
      default: true
    })
  ]
});

auth.on('login', (error, data) => {
  if (error) console.error(error);
  else console.log(data);
});

const loginButton = document.createElement('button');
loginButton.id = 'login';
loginButton.innerHTML = `Login`;
loginButton.addEventListener('click', () => {
  auth.login('generic.openid');
});
document.body.appendChild(loginButton);

const logoutButton = document.createElement('button');
logoutButton.id = 'logout';
logoutButton.innerHTML = `Logout`;
logoutButton.addEventListener('click', () => {
  auth.logout('generic.openid');
});
document.body.appendChild(logoutButton);
