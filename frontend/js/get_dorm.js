/*
get_dorm.js
- This file contains the code for getting a dorm information by using a id
*/

import { Dorm } from "../model/dorm.js";

async function getDormById() {
  console.log("Getting dorms...");

  const protocol = "http";
  const host = "127.0.0.1";
  const port = 5000;
  const id = "a893d4a4-654a-41af-ae0c-ba3c68d63973";
  const url = `${protocol}://${host}:${port}/dorm?id=${id}`;
  console.log("URL:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response Cookies:", response.headers.get("Set-Cookie"));

    const data = await response.json();
    console.log(data);

    // Clear existing content
    const dormContainer = document.getElementById("dorm_container_card");
    dormContainer.innerHTML = "";

    // Create Dorm instance
    const dormData = new Dorm(data.dorm);

    // Display dorm details
    const dormElement = document.createElement("div");
    dormElement.classList.add("row");
    dormElement.innerHTML = `
      <div class="col-md-5">
        <img src="images/dorm4.jpg" alt="dorm2">
      </div>
      <div class="col-md-7">
        <h5>${dormData.nameEng} (${dormData.nameTh})</h5>
        <p><strong>Location Eng:</strong> ${dormData.locationEng}</p>
        <p><strong>Location Th:</strong> ${dormData.locationTh}</p>
        <p><strong>Phone:</strong> ${dormData.phoneNum}</p>
        <p><strong>Details:</strong> ${dormData.details}</p>
      </div>
    `;
    dormContainer.appendChild(dormElement);

  } catch (err) {
    console.log("Error:", err);
  }
}

export { getDormById };