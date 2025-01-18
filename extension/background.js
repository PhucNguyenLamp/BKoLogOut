function startKeepAlive(freq) {
    console.log("inside startKeepAlive");
    async function sendKeepAlive() {
        try {
            // Query the tabs to get the URL of the first available tab
            chrome.tabs.query({}, async (tabs) => {
                if (tabs.length === 0) {
                    console.warn("No tabs found.");
                    return;
                }

                const currentUrl = tabs[0].url;
                const origin = new URL(currentUrl).origin; // Get the origin (e.g., "https://hcmut.edu.vn")
                console.log("Origin:", origin);
                // Send the keep-alive request
                const response = await fetch(`${origin}/lib/ajax/service.php`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify([{
                        methodname: "core_session_touch",
                        args: {}
                    }])
                });

                if (!response.ok) {
                    console.warn("Keep-alive failed");
                } else {
                    console.log("Keep-alive successful");
                }
            });
        } catch (error) {
            console.error("Error in keep-alive request:", error);
        }
    }

    // Call sendKeepAlive every freq seconds
    setInterval(sendKeepAlive, freq * 1000);
}

// Start the keep-alive function with a frequency of 60 seconds
startKeepAlive(60);
console.log('running background.js');
