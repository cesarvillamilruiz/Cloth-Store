export const environment = {
    production: false,
    msalConfig: {
      auth: {
        clientId: 'cebf4883-0bcc-4ea3-aab9-7df562555aa4',
        authority: 'https://login.microsoftonline.com/common/3a099a37-67a7-4d8c-b3fd-1bcb0c7c1e77',
        redirectUri: 'http://localhost:4200/'
      },
    },
    apiConfig: {
      scopes: ['api://b9348033-d0f6-44ec-835e-72b53014af7f/access_as_user'],
      uri: 'https://localhost:44340/',
    },
  };