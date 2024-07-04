import { handleAuth } from "./auth_handler.js";

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();

});
