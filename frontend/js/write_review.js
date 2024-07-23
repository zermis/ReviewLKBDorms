/*
write_review.js
- This is the main js file for the write_review.html page.
*/
import { handleAuth } from "./auth_handler.js";
import { checkAuth } from "./check_auth.js";

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
  // await checkAuth();

});
