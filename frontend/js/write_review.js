import { handleAuth } from "./auth_handler.js";
import { checkAuth } from "./check_auth.js";

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
  // await checkAuth();

});
