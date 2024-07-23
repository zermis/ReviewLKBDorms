/*
check_auth.js
- This file contains the code for checking if the user is authenticated.
If the user is authenticated, the message "user is authenticated" will be displayed.
If the user is not authenticated, the message "user is not authenticated" will be displayed.
*/

export async function checkAuth() {
  return new Promise((resolve, reject) => {
    const protocol = "http";
    const host = "127.0.0.1";
    const port = 5000;
    const url = `${protocol}://${host}:${port}/check_auth`;
    console.log("url:", url);

    fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.log("user is authenticated: ", data.message);
        resolve({ isAuthenticated: true });
      } else if (data.error) {
        console.log("user is not authenticated: ", data.error);
        resolve({ isAuthenticated: false });
      }
      else {
        console.log("user is not authenticated: ", data.error);
        resolve({ isAuthenticated: false });
      }
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      const usernameDisplay = document.getElementById("usernameDisplay");
      usernameDisplay.textContent = "Error fetching profile";
      reject(error);
    });
  });
}