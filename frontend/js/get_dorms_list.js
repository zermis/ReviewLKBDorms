/*
get_dorm.js
- This file contains the code for getting a dorm information by using a id
*/

import { Dorm } from "../model/dorm.js";

async function getDorms() {
  console.log("Getting dorms...");

  const protocol = "http";
  const host = "127.0.0.1";
  const port = 5000;
  // const id = "a893d4a4-654a-41af-ae0c-ba3c68d63973";
  const url = `${protocol}://${host}:${port}/dorms`;
  console.log("URL:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    // Clear existing content
    const dormContainer = document.getElementById("dorm_container_card");
    dormContainer.innerHTML = "";

    // Loop through each dorm in the response
    data.dorms.forEach(dormData => {
      // Create Dorm instance
      const dorm = new Dorm(dormData);

      // Create element for each dorm
      const dormElement = document.createElement("div");
      dormElement.classList.add("dorm-container", "card");
      dormElement.innerHTML = `
        <div class="row">
          <div class="col-md-5">
            <img src="${dorm.imageUrl || 'images/dorm4.jpg'}" alt="${dorm.nameEng}">
          </div>
          <div class="col-md-7">
            <h5>${dorm.nameEng} (${dorm.nameTh})</h5>
            <h6>${dorm.priceMin || 'N/A'} THB | ⭐⭐⭐⭐⭐ (${dorm.avgRating || 'N/A'}) | ${dorm.gender === 'female' ? '👧' : dorm.gender === 'male' ? '👦' : '👫'}</h6>
            <p>
              <strong>Location: </strong>${dorm.locationEng}
            </p>
            <p>
              <strong>Note: </strong>${dorm.details || 'No details available'}
            </p>
          </div>
        </div>
      `;
      dormContainer.appendChild(dormElement);
    });

  } catch (err) {
    console.log("Error:", err);
  }
}

export { getDorms };