import React, { useState } from "react";
import {
    MsalProvider,
    useMsal,
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
} from "@azure/msal-react";
import {
    msalInstance,
    loginRequestRead,
    loginRequestReadWrite,
} from "./msalConfig";
import ReadApi from "./ReadApi"; // Import the ReadApi component
import WriteApi from "./WriteApi"; // Import the WriteApi component

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
    const [userScope, setUserScope] = useState(null);

    const handleLoginRead = async () => {
        try {
            const response = await instance.loginPopup(loginRequestRead);
            setAccessToken(response.accessToken);
            setUserScope("read");
            console.log("Access Token for Read:", response.accessToken);
        } catch (error) {
            console.error("Login failed for Read", error);
        }
    };

    const handleLoginReadWrite = async () => {
        try {
            const response = await instance.loginPopup(loginRequestReadWrite);
            setAccessToken(response.accessToken);
            setUserScope("read-write");
            console.log("Access Token for Read-Write:", response.accessToken);
        } catch (error) {
            console.error("Login failed for Read-Write", error);
        }
    };

    const handleLogout = () => {
        instance.logoutPopup();
        setAccessToken(null);
        setUserScope(null);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>React + Azure AD Integration</h1>
            <AuthenticatedTemplate>
                <p>Welcome, {accounts[0]?.name || "User"}!</p>
                <button onClick={handleLogout}>Sign Out</button>
                {userScope === "read" && (
                    <>
                        <h2>Read-Only Access</h2>
                        <ReadApi accessToken={accessToken} />
                    </>
                )}
                {userScope === "read-write" && (
                    <>
                        <h2>Read-Write Access</h2>
                        <ReadApi accessToken={accessToken} />
                        <WriteApi accessToken={accessToken} />
                    </>
                )}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>You are not signed in.</p>
                <button onClick={handleLoginRead}>Sign In with Read</button>
                <button onClick={handleLoginReadWrite}>Sign In with Read-Write</button>
            </UnauthenticatedTemplate>
        </div>
    );
}

export default App;
