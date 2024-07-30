/*
get_dorm.js
- This file contains the code for getting a dorm information by using a id
*/

import { Dorm } from "../model/dorm.js";

let allDorms = [];
let currentPage = 1;
const dormsPerPage = 10;
const pageButtonsCount = 5;
let currentPageGroup = 1;

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

    allDorms = data.dorms.map(dormData => new Dorm(dormData)); // Convert each dorm data to a Dorm object
    displayDorms();
    setupPagination();

  } catch (err) {
    console.log("Error:", err);
  }
}

function displayDorms() {

  const startIndex = (currentPage - 1) * dormsPerPage;
  const endIndex = startIndex + dormsPerPage;
  console.log("Displaying dorms from", startIndex, "to", endIndex);
  const dormsToDisplay = allDorms.slice(startIndex, endIndex);
  console.log("Dorms to display:", dormsToDisplay);
  // Clear existing content
  const dormContainer = document.getElementById("dorm_container_card");
  dormContainer.innerHTML = "";

  // Loop through each dorm in the response
  dormsToDisplay.forEach(dorm => {
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
          <p><strong>Location Eng:</strong> ${dorm.locationEng}</p>
          <p><strong>Location Th:</strong> ${dorm.locationTh}</p>
          <p><strong>Phone:</strong> ${dorm.phoneNum}</p>
          <p><strong>Details:</strong> ${dorm.details}</p>
          <h6>price: (${dorm.priceMin || 'N/A'} THB) | rating: (${dorm.avgRating || 'N/A'}) | dorm gender: (${dorm.gender === 'female' ? '👧' : dorm.gender === 'male' ? '👦' : '👫'})</h6>
        </div>
      </div>
    `;
    dormContainer.appendChild(dormElement);
  });
}

// function setupPagination() {
//   const totalPages = Math.ceil(allDorms.length / dormsPerPage);
//   const paginationContainer = document.createElement('div');
//   paginationContainer.id = 'pagination';
//   paginationContainer.classList.add('text-center', 'mt-4');

//   for (let i = 1; i <= totalPages; i++) {
//     const button = document.createElement('button');
//     button.innerText = i;
//     button.classList.add('btn', 'btn-outline-primary', 'mx-1');
//     button.addEventListener('click', function () {
//       currentPage = i;
//       displayDorms();
//     });
//     paginationContainer.appendChild(button);
//   }

//   const dormContainer = document.getElementById('dorm_container_card');
//   dormContainer.after(paginationContainer);
// }

function setupPagination() {
  const totalPages = Math.ceil(allDorms.length / dormsPerPage);
  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'pagination';
  paginationContainer.classList.add('text-center', 'mt-4');

  // Add previous button
  const prevButton = document.createElement('button');
  prevButton.innerText = '<';
  prevButton.classList.add('btn', 'btn-outline-primary', 'mx-1');
  prevButton.addEventListener('click', function () {
    if (currentPageGroup > 1) {
      currentPageGroup--;
      currentPage = (currentPageGroup - 1) * pageButtonsCount + 1;
      displayDorms();
      updatePagination();
    }
  });
  paginationContainer.appendChild(prevButton);

  // Add page buttons
  for (let i = 1; i <= pageButtonsCount; i++) {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'mx-1');
    button.addEventListener('click', function () {
      currentPage = parseInt(this.innerText);
      displayDorms();
      updatePagination();
    });
    paginationContainer.appendChild(button);
  }

  // Add next button
  const nextButton = document.createElement('button');
  nextButton.innerText = '>';
  nextButton.classList.add('btn', 'btn-outline-primary', 'mx-1');
  nextButton.addEventListener('click', function () {
    const totalPageGroups = Math.ceil(totalPages / pageButtonsCount);
    if (currentPageGroup < totalPageGroups) {
      currentPageGroup++;
      currentPage = (currentPageGroup - 1) * pageButtonsCount + 1;
      displayDorms();
      updatePagination();
    }
  });
  paginationContainer.appendChild(nextButton);

  const dormContainer = document.getElementById('dorm_container_card');
  dormContainer.after(paginationContainer);

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(allDorms.length / dormsPerPage);
  const paginationContainer = document.getElementById('pagination');
  const buttons = paginationContainer.querySelectorAll('button');

  const startPage = (currentPageGroup - 1) * pageButtonsCount + 1;
  const endPage = Math.min(startPage + pageButtonsCount - 1, totalPages);

  // Update page buttons
  buttons.forEach((button, index) => {
    if (index === 0) {
      // Previous button
      button.disabled = currentPageGroup === 1;
    } else if (index === buttons.length - 1) {
      // Next button
      button.disabled = endPage === totalPages;
    } else {
      // Page buttons
      const pageNum = startPage + index - 1;
      button.innerText = pageNum;
      button.style.display = pageNum <= endPage ? 'inline-block' : 'none';
      button.classList.toggle('btn-primary', pageNum === currentPage);
      button.classList.toggle('btn-outline-primary', pageNum !== currentPage);
    }
  });
}

export { getDorms };