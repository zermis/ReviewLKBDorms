import { handleAuth } from "./auth_handler.js";

/* Function to display response message from the server
args:
- type: string
- message: string
*/
function displayMessage(type, message) {
  const successDiv = document.getElementById("successMessage");
  const errorDiv = document.getElementById("errorMessage");

  // Hide both messages initially
  successDiv.style.display = "none";
  errorDiv.style.display = "none";

  if (type === "success") {
    successDiv.textContent = message;
    successDiv.style.display = "block";
  } else if (type === "error") {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
  const form = document.querySelector("#login-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the values from the input fields
    const username = document.getElementById("inputUsername").value;
    const password = document.getElementById("inputPassword").value;

    console.log("Form submitted");
    console.log("Username:", username);
    console.log("Password:", password);

    const data = {
      username: username,
      password: password,
    };

    const protocol = "http";
    const host = "127.0.0.1";
    const port = 5000;
    const url = `${protocol}://${host}:${port}/login`;

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log('Response Cookies:', res.headers.get('Set-Cookie')); // Log the cookies here
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //display resopnseMessage paragraph from res
        if (data.message) {
            displayMessage("success", data.message + " Redirecting to the home page...");
            console.log(data)
            
            // Redirect to the home page after 2 seconds 
            setTimeout(() => {
                window.location.href = `/frontend/profile.html`;
            }, 2000);
            
        } else if (data.error) {
            displayMessage("error", data.error);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });
});

