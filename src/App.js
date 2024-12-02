import React, { useState } from "react";
import {
    MsalProvider,
    useMsal,
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
} from "@azure/msal-react";
import { msalInstance, loginRequest } from "./msalConfig";
import ReadApi from "./ReadApi";
import WriteApi from "./WriteApi";
import { jwtDecode } from "jwt-decode"; // Corrected import

function App() {
    return (
        <MsalProvider instance={msalInstance}>
            <Main />
        </MsalProvider>
    );
}

function Main() {
    const { instance, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);
    const [userRoles, setUserRoles] = useState([]);

    const handleLogin = async () => {
        try {
            const response = await instance.loginPopup(loginRequest);
            const token = response.accessToken;
            setAccessToken(token);

            // Decode the token to extract roles
            const decodedToken = jwtDecode(token);
            const roles = decodedToken.roles || []; // Ensure roles exist
            setUserRoles(roles);
            console.log("Decoded Roles:", roles);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleLogout = () => {
        instance.logoutPopup();
        setAccessToken(null);
        setUserRoles([]);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>React + Azure AD Integration</h1>
            <AuthenticatedTemplate>
                <p>Welcome, {accounts[0]?.name || "User"}!</p>
                <button onClick={handleLogout}>Sign Out</button>

                {/* Render components based on roles */}
                {userRoles.includes("Admin") && (
                    <>
                        <h2>Admin Access</h2>
                       {/* <ReadApi accessToken={accessToken} /> */}
                        <WriteApi accessToken={accessToken} />
                    </>
                )}
                {userRoles.includes("User") && (
                    <>
                        <h2>User Access</h2>
                        <ReadApi accessToken={accessToken} />
                    </>
                )}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>You are not signed in.</p>
                <button onClick={handleLogin}>Sign In</button>
            </UnauthenticatedTemplate>
        </div>
    );
}


export default App;
