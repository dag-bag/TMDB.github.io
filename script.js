const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const APIPAGE =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
// OMDB API
const omdeb = "http://www.omdbapi.com/?i=tt3896198&apikey=6cc01173";
const titleAPI = "http://www.omdbapi.com/?t=&plot=full&apikey=6cc01173";
// SIMKL .COM TV BEST
const simi =
  "https://api.simkl.com/tv/best/filter?type=series&client_id=a010605a14e5d89dee663c7035cd5354278838b957194ff6e40233130f441627";

const main = document.querySelector(".movies");
GetMovies(APIURL);
async function GetMovies(url) {
  const resp = await fetch(url);
  const respdata = await resp.json();
  // respdata.results.forEach((movie) => {
  //   const img = document.createElement("img");
  //   img.src = IMGPATH + movie.poster_path;
  //   document.body.appendChild(img);
  // });
  console.log(respdata.results);
  respdata.results.forEach((singelMovieData) => {
    const { poster_path, title, vote_average, backdrop_path, overview } =
      singelMovieData;
    const movieEL = document.createElement("div");
    movieEL.classList.add("movieBox");

    movieEL.innerHTML = `
        
            <img src="${IMGPATH + poster_path}" alt="${title}">
            <div class="movieInfo">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                <img src="${IMGPATH + backdrop_path}" alt="${title}">
                ${overview}</div>
                
         
    `;

    main.append(movieEL);
  });
  //   return respdata;
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// async function APiTest() {
//   const res = await fetch(titleAPI);
//   const respdata = await res.json();
//   console.log(respdata);
// }

// APiTest();
/**
 * @search_Form
 */

const form = document.querySelector("#form");
const search = document.querySelector("#search");
SearchMovies(form);
function SearchMovies(hit) {
  hit.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchTerm = search.value;

    if (searchTerm) {
      main.innerHTML = "";
      GetMovies(SEARCHAPI + searchTerm);
      console.log(searchTerm);
    } else {
      const error404 = document.createElement("div");
      main.innerHTML = "";
      error404.classList.add("pageNotFound");

      error404.innerHTML = ` 
      <h4>
          404 error page not found for your query <br>
          <p>${search.value}</p>
      </h4>
  `;
      main.append(error404);
    }
  });
}

let currenPage = 1;
const nextPage = document.querySelector("#next");
const btn = document.querySelectorAll(".btn");
btn.forEach((button) => {
  button.addEventListener("click", () => {
    main.innerHTML = "";
    const pageNumber = APIPAGE + button.value;
    // Update BTN value
    currenPage = button.value;
    console.log("currenPage:", currenPage);

    GetMovies(pageNumber);
  });
});
nextPage.addEventListener("click", (e) => {
  console.log(e);
  // currenPage++;
  console.log(currenPage);
  main.innerHTML = "";
  currenPage++;
  const nextPageNumber = APIPAGE + currenPage;
  GetMovies(nextPageNumber);
});

const prev = document.querySelector("#prev");
prev.addEventListener("click", (e) => {
  // currenPage++;
  console.log(currenPage);
  main.innerHTML = "";
  currenPage--;
  const prevPageNumber = APIPAGE + currenPage;
  GetMovies(prevPageNumber);
});
