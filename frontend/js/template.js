import { handleAuth } from "./auth_handler.js";

document.addEventListener("DOMContentLoaded", async function () {
  await handleAuth();
  // const form = document.querySelector("#login-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    const protocol = "http";
    const host = "127.0.0.1";
    const port = 5000;
    const url = `${protocol}://${host}:${port}/dorms`;

    fetch(url, {
      method: "GET",
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
  
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });
});

