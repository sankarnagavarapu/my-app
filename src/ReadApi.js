import React, { useState } from "react";

const ReadApi = ({ accessToken }) => {
    const [loading, setLoading] = useState(false);

    const handleButtonClick = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5117/api/WeatherForecast/read", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={handleButtonClick} disabled={loading}>
            {loading ? "Loading..." : "Read"}
        </button>
    );
};

export default ReadApi;
