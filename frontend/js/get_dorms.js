import { Dorm } from "../model/dorm.js";

async function getDorms() {
  console.log("Getting dorms...");

  const protocol = "http";
  const host = "127.0.0.1";
  const port = 5000;
  const id = "a893d4a4-654a-41af-ae0c-ba3c68d63973";
  const url = `${protocol}://${host}:${port}/dorms/${id}`;
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
        <h5>${dormData.nameEng} ${dormData.nameTh}</h5>
        <p>${dormData.locationEng}</p>
        <p>${dormData.locationTh}</p>
        <p>Location: ${dormData.getFullAddress()}</p>
        <p>Phone: ${dormData.phoneNum}</p>
        <p>Details: ${dormData.details}</p>
      </div>
    `;
    dormContainer.appendChild(dormElement);

  } catch (err) {
    console.log("Error:", err);
  }
}

export { getDorms };