import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "c7e37d77-9d57-425e-91c9-4a2e0a590a36", // From Azure AD
        authority: "https://login.microsoftonline.com/0c15e092-2abc-4479-b58e-31b939627ab0", // Tenant ID
        redirectUri: "http://localhost:3000", // React app URL
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
    },
};

export const loginRequestRead = {
    scopes: ["api://ab4981f8-bed2-42ac-902e-9cd3a533dcde/read"], // Backend API scope
};

export const loginRequestReadWrite = {
    scopes: ["api://ab4981f8-bed2-42ac-902e-9cd3a533dcde/write"], // Scope for read-write access
};

export const loginRequest = {
    scopes: ["api://ab4981f8-bed2-42ac-902e-9cd3a533dcde/.default"], // Scope for read-write access
};
export const msalInstance = new PublicClientApplication(msalConfig);
