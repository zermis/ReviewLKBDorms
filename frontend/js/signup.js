import { handleAuth } from "./auth_handler.js";
/* Function to display response message from the server
args:
- type: string
- message: string
*/
function displayMessage(type, message) {
    const successDiv = document.getElementById('successMessage');
    const errorDiv = document.getElementById('errorMessage');
    
    // Hide both messages initially
    successDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    if (type === 'success') {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
    } else if (type === 'error') {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
  const form = document.querySelector("#signup-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the values from the input fields
    const username = document.getElementById("inputUsername").value;
    const password = document.getElementById("inputPassword").value;
    const passwordAgain = document.getElementById("inputPasswordAgain").value;

    console.log("Form submitted");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Password Again:", passwordAgain);

    const data = {
      username: username,
      password: password,
      comfirm_password: passwordAgain,
    };

    const protocol = "http";
    const host = "127.0.0.1";
    const port = 5000;
    const url = `${protocol}://${host}:${port}/register`;

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
    },  
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //display resopnseMessage paragraph from res
        if (data.message) {
            displayMessage("success", data.message + " Redirecting to the login page...");
            // Redirect to the log in page after 2 seconds
            setTimeout(() => {
              window.location.href = `/frontend/login.html`;
            }, 2000);
        } else if (data.error) {
            displayMessage('error', data.error);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });
});


