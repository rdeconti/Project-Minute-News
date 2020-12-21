/**
****************************************************************************
Project: Seniores Digitais - Labora/Alura/Oracle ONE
Programmer: Rosemeire Deconti
Date: December/2020
Challenge: https://github.com/Infoglobo/desafio-front-end
****************************************************************************
**/

var slideIndex = 1;
showSlides(slideIndex);

/** ------------------------------------------------------------------------ **/
function showSlides(n) {

  var i;

  var slides = document.getElementsByClassName("slide-show-carousel");
  var dots = document.getElementsByClassName("slide-show-dot");

  if (n > slides.length) {slideIndex = 1}

  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

/** ------------------------------------------------------------------------ **/
function plusSlides(n) {
  showSlides(slideIndex += n);
}

/** ------------------------------------------------------------------------ **/
function currentSlide(n) {
  showSlides(slideIndex = n);
}
