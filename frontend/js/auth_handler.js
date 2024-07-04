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