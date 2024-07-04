import { handleAuth } from "./auth_handler.js";

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
  const protocol = "http";
  const host = "127.0.0.1";
  const port = 5000;
  const url = `${protocol}://${host}:${port}/@me`;
  console.log("url:", url);

  fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then((data) => {
      console.log("Profile data:", data);
      const usernameDisplay = document.getElementById("usernameDisplay");
      if (data.username) {
        usernameDisplay.textContent = `Welcome, ${data.username}!`;
      } else {
        usernameDisplay.textContent = "User not logged in";
      }

    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      const usernameDisplay = document.getElementById("usernameDisplay");
      usernameDisplay.textContent = "Error fetching profile";
    });
});
