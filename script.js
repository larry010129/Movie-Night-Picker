const sortTitleButton = document.getElementById("sortTitle");
const sortYearButton = document.getElementById("sortYear");
const genreSelect = document.getElementById("genre");
const randomButton = document.getElementById("random");
const countText = document.getElementById("count");
const pickText = document.getElementById("pick");
const wrapper = document.getElementById("list");

const movies = [
    { title: "Inside Out", genre: "Animation", year: 2015, length: 95 },
    { title: "The Matrix", genre: "Sci-Fi", year: 1999, length: 136 },
    { title: "Jurassic Park", genre: "Adventure", year: 1993, length: 127 },
    { title: "Avengers: Endgame", genre: "Action", year: 2019, length: 181 },
    { title: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy", year: 2001, length: 152 },
    { title: "Inception", genre: "Sci-Fi", year: 2010, length: 148 },
    { title: "Pirates of the Caribbean", genre: "Adventure", year: 2003, length: 143 },
    { title: "John Wick", genre: "Action", year: 2014, length: 101 },
    { title: "Toy Story", genre: "Animation", year: 1995, length: 81 },
    { title: "The Hobbit", genre: "Fantasy", year: 2012, length: 169 }
];

let currentSort = "";

const sortMethods = {
    "title": (a, b) => a.title.localeCompare(b.title),
    "year": (a, b) => a.year - b.year
};

function getFiltered() {
    const genre = genreSelect.value;
    let list = movies;

    if (currentSort !== "") {
        list = movies.sort(sortMethods[currentSort]);
    }

    const filtered = list.filter((movie) => {
        return genre === "all" || movie.genre === genre;
    });

    return filtered;
}

function showMovies() {
    const filtered = getFiltered();
    renderMovies(filtered);
}

function renderMovies(list) {
    wrapper.innerHTML = "";

    const mapped = list.map((item) => {
        return renderMovie(item);
    });

    mapped.forEach((item) => {
        wrapper.appendChild(item);
    });

    countText.textContent = "Showing " + list.length + " of " + movies.length + " movies";
}

function renderMovie(movie) {
    const ele = document.createElement("div");
    const name = document.createElement("h2");
    const details = document.createElement("p");
    const length = document.createElement("p");

    name.innerHTML = movie.title;
    details.innerHTML = movie.genre + " " + movie.year;
    length.innerHTML = movie.length + " min";

    name.style.margin = "0";
    details.style.margin = "0";
    length.style.margin = "0";
    ele.style.marginBottom = "8px";

    ele.appendChild(name);
    ele.appendChild(details);
    ele.appendChild(length);

    return ele;
}

sortTitleButton.addEventListener("click", function () {
    currentSort = "title";
    showMovies();
});

sortYearButton.addEventListener("click", function () {
    currentSort = "year";
    showMovies();
});

genreSelect.addEventListener("change", function () {
    pickText.innerHTML = "";
    showMovies();
});

randomButton.addEventListener("click", function () {
    const filtered = getFiltered();
    const index = Math.floor(Math.random() * filtered.length);
    const movie = filtered[index];
    pickText.innerHTML = movie.title + " Genre: " + movie.genre + " Year: " + movie.year + " " + movie.length + " min";
});

showMovies();
