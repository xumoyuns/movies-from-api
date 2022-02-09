"use strict";

const elList = document.querySelector(".list");
const elTemplate = document.querySelector(".template").content;
const elPrevBtn = document.querySelector(".prev-btn");
const elNextBtn = document.querySelector(".next-btn");
const elPaginationList = document.querySelector(".pagination");

const API_KEY = "3f0beff1";
let search = "hulk";
let page = 1;

const renderMovies = function (arr, element) {
  const movieFragment = document.createDocumentFragment();

  element.innerHTML = null;

  arr.forEach((item) => {
    const clonedFilmTemplate = elTemplate.cloneNode(true);

    clonedFilmTemplate.querySelector(".film__img").src = `${item.Poster}`;
    clonedFilmTemplate.querySelector(
      ".film__title"
    ).textContent = `${item.Title}`;

    clonedFilmTemplate.querySelector(
      ".film__year"
    ).textContent = `${item.Year}`;

    clonedFilmTemplate.querySelector(
      ".film__category"
    ).textContent = `${item.Type}`;

    movieFragment.appendChild(clonedFilmTemplate);
  });

  element.appendChild(movieFragment);
};

const getMovies = async function () {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
  );

  const data = await response.json();

  if (data.Response === "True" && data.Search.length > 0) {
    renderMovies(data.Search, elList);
  }

  page === 1 ? (elPrevBtn.disabled = true) : (elPrevBtn.disabled = false);

  const totalPageResult = Math.ceil(data.totalResults / 10);

  page === totalPageResult
    ? (elNextBtn.disabled = true)
    : (elNextBtn.disabled = false);

  elPaginationList.innerHTML = null;

  for (let i = 1; i <= totalPageResult; i++) {
    let htmlLi = `
      <li class="page-item page-link">${i}</li>
    `;

    if (page == i) {
      htmlLi = `
      <li class="page-item page-link activejon">${i}</li>
    `;
    } else {
      htmlLi = `
      <li class="page-item page-link">${i}</li>
    `;
    }

    elPaginationList.insertAdjacentHTML("beforeend", htmlLi);
  }
};

input.addEventListener("change", function (evt) {
  search = input.value;
  page = 1;
  getMovies();
});

elPrevBtn.addEventListener("click", () => {
  page--;
  getMovies();
});

elNextBtn.addEventListener("click", () => {
  page++;
  getMovies();
});

elPaginationList.addEventListener("click", function (evt) {
  page = Number(evt.target.textContent);
  getMovies();
});
