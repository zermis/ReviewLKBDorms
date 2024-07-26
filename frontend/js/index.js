/*
index.js
- This is the main js file for the index.html page.
*/

import { handleAuth } from "./auth_handler.js";
import { checkAuth } from "./check_auth.js";
// import { getDormById } from "./get_dorm.js";
import { getDorms } from "./get_dorms_list.js";


document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
  // await getDormById();
  await getDorms();

  const writeReviewButton = document.getElementById("write_review_button");
  writeReviewButton.addEventListener("click", async function () {
    console.log("Write Review button clicked");
    const result = await checkAuth();
    console.log("Authentication result:", result);
    if (result.isAuthenticated) {

        window.location.href = `/frontend/write_review.html`;
    } else {
        window.location.href = `/frontend/login.html`;
    }
  });
});
