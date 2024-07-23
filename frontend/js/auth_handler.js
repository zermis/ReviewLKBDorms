/*
auth_handler.js
- This file contains the code for handling authentication.
If the user is authenticated, the signup and login buttons will be hidden, and the logout button will be displayed.
If the user is not authenticated, the signup and login buttons will be displayed, and the logout button will be hidden.
*/

import { checkAuth } from "./check_auth.js";

let isFirstLoad = true;

async function handleAuth() {
  const signupButton = document.getElementById("signup_button");
  const loginButton = document.getElementById("login_button");
  const logoutButton = document.getElementById("logout_button");

  if (isFirstLoad) {
    console.log("This code runs only on the first load");
    const result = await checkAuth();
    console.log("Authentication result:", result);
    if (result.isAuthenticated) {
        signupButton.style.display = "none";
        loginButton.style.display = "none";
      logoutButton.style.display = "block";
    } else {
      signupButton.style.display = "block";
      loginButton.style.display = "block";
        logoutButton.style.display = "none";
    }
    isFirstLoad = false;
  }
}

export { handleAuth };