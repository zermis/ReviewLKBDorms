import { handleAuth } from "./auth_handler.js";
import { checkAuth } from "./check_auth.js";

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
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
