/******************************************************************************
Project: Seniores Digitais - Labora/Alura/Oracle ONE
Programmer: Rosemeire Deconti
Date: December/2020
Challenge: https://github.com/Infoglobo/desafio-front-end
******************************************************************************/
getSlideListFromJson();

/** ------------------------------------------------------------------------ **/
/** Get data from JSON using XMLHttpRequest                                  **/
/** In case of error a message is displayed to user                          **/
/** ------------------------------------------------------------------------ **/
function getSlideListFromJson(){

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://localhost:3003/slides");

  xhr.addEventListener("load", function() {

      var baseMessage = document.querySelector("#base-message");
      var countDots = 0;

      if (xhr.status == 200) {

          baseMessage.classList.add("base-message");
          var requestAnswer = xhr.responseText;
          var arrayObject = JSON.parse(requestAnswer);

          for (var indexObject in arrayObject){

            for (var indexImage in arrayObject[indexObject].imagens){

                createImage(arrayObject[indexObject].imagens[indexImage], indexImage);

              }

            }

      } else {

          baseMessage.classList.remove("base-message");

      }

  });

  xhr.send();

}

/** ---------------------------------------------------------------------- **/
/** Create image element with data from Json                               **/
/** ---------------------------------------------------------------------- **/
function createImage(itemJson, index){

  var slideShowImageNumber = "#slide-show-image-" + index;
  var slideShowDivision = document.querySelector(slideShowImageNumber);

  var slideShowImage = document.createElement("IMG");
  var imageSrc = "http://localhost:3003/slides/" + itemJson;
  slideShowImage.src = imageSrc;
  slideShowImage.alt = "Slide Notícia Principal";
  slideShowImage.classList.add("slide-show-image");
  slideShowImage.classId = slideShowImageNumber;

  slideShowDivision.appendChild(slideShowImage);

}
