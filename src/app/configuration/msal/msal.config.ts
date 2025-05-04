import { BrowserCacheLocation, LogLevel, PublicClientApplication, type Configuration } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

const b2cPolicies = {
    names: {
        signUpSignIn: environment.msalConfig.namesFlows.signUpSignIn
    },
    authorities: {
        signUpSignIn: {
            authority: environment.msalConfig.authorities.signUpSignIn,
        }
    },
    authorityDomain: environment.msalConfig.authorityDomain
};

const msalConfig: Configuration = {
    auth: {
        clientId: environment.msalConfig.clientId,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        redirectUri: environment.baseDomain,
        postLogoutRedirectUri: environment.baseDomain,
        knownAuthorities: [b2cPolicies.authorityDomain],
    },
    cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage,
    },
    system: {
        allowPlatformBroker: false, // Disables WAM Broker
        loggerOptions: {
            loggerCallback,
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false,
        },
    },
};

export function loggerCallback(logLevel: LogLevel, message: string) {
//   console.log(message);
}

export const msalInstance = new PublicClientApplication(msalConfig);
