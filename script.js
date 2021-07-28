let input = document.getElementById("movie-name-input");
let results = document.getElementById("results");

let singleSection = document.getElementById("single-result");
let posterImg = document.getElementById("poster-img");
let movieTitle = document.getElementById("movie-title");
let genre = document.getElementById("genre");
let director = document.getElementById("director");
let language = document.getElementById("language");
let writer = document.getElementById("writer");
let released = document.getElementById("released");
let runtime = document.getElementById("runtime");
let imdbRating = document.getElementById("imdbRating");
let country = document.getElementById("country");

let notFound = document.getElementById("not-found");
let recommendedTag = document.getElementById("recommended-tag");

async function getMoviesBySearch() {
    let res = await fetch(
        `https://www.omdbapi.com/?s=${input.value}&apikey=ad581cd3`
    );
    let obj = await res.json();
    let searchResultArray = obj.Search;
    console.log('searchResultArray:', searchResultArray)
    
    if (searchResultArray === undefined) {
        notFound.removeAttribute("class", "hide");
        notFound.innerHTML = "404";
        results.setAttribute("class", "hide");
        singleSection.setAttribute("class", "hide");
    } else {
        notFound.setAttribute("class", "hide");
        results.innerHTML = null;
        searchResultArray.forEach(function (el) {
            if (el.Type === "movie" && el.Poster !== "N/A") {
                getMovies(el);
            }
        });
        setTimeout(function () {
            results.removeAttribute("class", "hide");
            singleSection.setAttribute("class", "hide");
            recommendedTag.setAttribute("class", "hide");
        }, 1000);
    }

}

function getMovies(el) {
    // console.log("el:", el);

    let div = document.createElement("div");
    let imdbID = el.imdbID;
    div.addEventListener("click", function () {
        async function getMovie() {
            let resp = await fetch(
                `https://www.omdbapi.com/?i=${imdbID}&apikey=ad581cd3`
            );
            let objEl = await resp.json();

            posterImg.src = objEl.Poster;
            movieTitle.innerHTML = objEl.Title;
            genre.innerHTML = objEl.Genre;
            director.innerHTML = objEl.Director;
            language.innerHTML = objEl.Language;
            writer.innerHTML = objEl.Writer;
            released.innerHTML = objEl.Released;
            runtime.innerHTML = objEl.Runtime;
            imdbRating.innerHTML = objEl.imdbRating;
            country.innerHTML = objEl.Country;
            recommendedTag.setAttribute("class", "hide");
            if ((objEl.imdbRating / 1) > 8.5) {
                recommendedTag.removeAttribute("class", "hide");
            }
        }
        getMovie();
        setTimeout(function () {
            results.setAttribute("class", "hide");
            singleSection.removeAttribute("class", "hide");
        }, 1000);
    });

    let img = document.createElement("img");
    let h2 = document.createElement("h2");
    img.src = el.Poster;
    h2.innerHTML = el.Title;

    results.append(div);
    div.append(img, h2);
}

function goBack() {
    results.removeAttribute("class", "hide");
    singleSection.setAttribute("class", "hide");
}
