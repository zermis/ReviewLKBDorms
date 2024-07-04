import { handleAuth } from "./auth_handler.js";

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
  const logoutButton = document.getElementById('logout_button');
  logoutButton.addEventListener('click', function () {
    console.log('Logout button clicked');
    const protocol = 'http';
    const host = "127.0.0.1";
    const port = 5000;
    const logoutUrl = `${protocol}://${host}:${port}/logout`;
    console.log(logoutUrl)
    fetch(logoutUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Redirect to the home page after logging out
        window.location.href = '/frontend/login.html';
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
        const logoutMessage = document.getElementById('logoutMessage');
        logoutMessage.textContent = 'Error logging out';
      });
  });
});

