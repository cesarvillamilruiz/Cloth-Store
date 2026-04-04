export const environment = {
    production: false,
    baseDomain: 'http://localhost:4200',
    loginFailedRoute: '/login-failed',
    msalConfig: {
      clientId: '9b9eaff8-c495-4928-9b2f-f79e823aa1a1',
      redirectUri: '/',
      authorityDomain: 'clothestore.b2clogin.com',
      knownAuthorities: ['clothestore.b2clogin.com'],
      navigateToLoginRequestUrl: true,
      namesFlows: {
        signUpSignIn: 'B2C_1_sign_in_up'
      },
      authorities: {
        signUpSignIn: 'https://clothestore.b2clogin.com/clothestore.onmicrosoft.com/B2C_1_sign_in_up',
      },
      cache:{
        cacheLocation: 'localStorage',
        cacheStoreAuthStateInCookie: false,
      },
      scopes:{
        apiScopes: ['https://clothestore.onmicrosoft.com/tasks-api/tasks.read',
          'https://clothestore.onmicrosoft.com/tasks-api/tasks.write'],
      }
    },

    endPoints: {
      url: 'http://localhost:5012',
      scope: '',
      controllers: {
        weatherforecast: '/weatherforecast',
        login: '/api/Login',
        contactPreference: '/api/ContactPreference',
        address: '/api/Address',
        option: '/api/Option',
        blob: '/api/Blob',
      }
    }
  };