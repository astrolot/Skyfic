const menuIcon = document.getElementById("menu-icon");
const slideoutMenu = document.getElementById("slideout-menu");
const searchIcon = document.getElementById("search-icon");
const searchBox = document.getElementById("searchbox");

searchIcon.addEventListener('click',function(){
    if(searchBox.style.top == '72px'){
        searchBox.style.top ='24px';
        searchBox.style.pointerEvents = 'none';
    }else{
    searchBox.style.top = '72px';
    searchBox.style.pointerEvents='auto';
    }
});

menuIcon.addEventListener('click',function(){
    if(slideoutMenu.style.opacity == "1"){
        slideoutMenu.style.opacity = '0';
        slideoutMenu.style.pointerEvents = 'none';
    }else{
        slideoutMenu.style.opacity = '1';
        slideoutMenu.style.pointerEvents = 'auto';
    }
})

/* Genre */

document.addEventListener("DOMContentLoaded", function() {
  const genreBtn = document.querySelector(".genre-btn");
  const genreContent = document.getElementById("genre-content");

  genreBtn.addEventListener("click", function(event) {
    event.stopPropagation(); // Prevent the event from bubbling up to the window
    genreContent.classList.toggle("show");
  });

  document.addEventListener("click", function(event) {
    if (!event.target.closest(".genre-dropdown")) {
      genreContent.classList.remove("show");
    }
  });
});

