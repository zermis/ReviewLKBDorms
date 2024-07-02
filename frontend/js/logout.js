//if user clicks on logout button ONLY call the http request

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById('logout-button');
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
        // const logoutMessage = document.getElementById('logoutMessage');
        // logoutMessage.textContent = data.message;

        // window.location.href = '/frontend/profile.html';
        
      })
      .catch((error) => {
        console.error('Fetch Error:', error);
        const logoutMessage = document.getElementById('logoutMessage');
        logoutMessage.textContent = 'Error logging out';
      });
  });
});

