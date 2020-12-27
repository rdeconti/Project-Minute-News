/******************************************************************************
Project: Seniores Digitais - Labora/Alura/Oracle ONE
Programmer: Rosemeire Deconti
Date: December/2020
Challenge: https://github.com/Infoglobo/desafio-front-end
******************************************************************************/

function controlFilterShow(element){

  var strUserValue = element.value;
  var strUserText = element.options[element.selectedIndex].text;

  var elemento = document.getElementById("news-list-line");
  
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }

  globalCurrentFilter = strUserText;
  getNewsListFromJson();

}
