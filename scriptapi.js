const API_KEY = "api_key=521ca0d89dacadb79870e89d634c6d82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const API_URL = BASE_URL +'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const main = document.getElementById('main');
const slideoutForm = document.getElementById('slideout-form');
const navForm = document.getElementById('nav-form');
const slideoutSearch = document.getElementById('slideout-search');
const navSearch = document.getElementById('nav-search');
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];
  const tagsEl = document.getElementById('genre-content');
  var selGenre = [];
  var n = [];
  setGenre();
  
  function setGenre(){
    genres.forEach(genre =>{
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click',()=>{
          if(selGenre.length == 0){
            selGenre.push(genre.id);
          }else{
            if(selGenre.includes(genre.id)){
              selGenre.forEach((id,idx)=>{
                if(id == genre.id){
                  selGenre.splice(idx,1);
                }
              })
            }else{
              selGenre.push(genre.id);
            }
          }
          console.log(selGenre);
          highSel();
        })
        tagsEl.append(t);
    }) 
  }
  document.addEventListener("DOMContentLoaded", function() {
    const filterBtns = document.querySelectorAll("#app-btn");
  
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        gotomov();
      });
    });
  });
  
  function gotomov() {
    const queryString = `?genres=${selGenre.join(',')}`;
    window.location.href = 'movies.html' + queryString;
  }
  

function highSel(){
 const tags =document.querySelectorAll('.tag');
  tags.forEach(tag=>{
    tag.classList.remove('highlight');
  });
  if(selGenre.length!=0){
    selGenre.forEach(id=>{
      const highTag= document.getElementById(id);
      highTag.classList.add('highlight');
    })
  }
  
}

function getRandomMovies() {
    const page = Math.floor(Math.random() * 10) + 1; 
    const API_URL = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&${API_KEY}`;
    
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            showMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function fetchMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            if(data.results.length !==0){
              showMovies(data.results);
            }else{
              main.innerHTML=`<h1 class="no-r">No Results Found</h1>`;
            }
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        const colorClass = getColor(vote_average);
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}" />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${colorClass}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getRandomMovies();
});

slideoutForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchTerm = slideoutSearch.value.trim();
    if (searchTerm) {
        fetchMovies(`${searchURL}&query=${searchTerm}`);
    }
});

navForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchTerm = navSearch.value.trim();
    if (searchTerm) {
        fetchMovies(`${searchURL}&query=${searchTerm}`);
    }
});
