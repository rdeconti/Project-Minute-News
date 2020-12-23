/******************************************************************************
Project: Seniores Digitais - Labora/Alura/Oracle ONE
Programmer: Rosemeire Deconti
Date: December/2020
Challenge: https://github.com/Infoglobo/desafio-front-end
******************************************************************************/
getNewsListFromJson();

/** ------------------------------------------------------------------------ **/
/** Get data from JSON using XMLHttpRequest                                  **/
/** In case of error a message is displayed to user                          **/
/** ------------------------------------------------------------------------ **/
function getNewsListFromJson(){

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://localhost:3003/noticias");

  xhr.addEventListener("load", function() {

      var baseMessage = document.querySelector("#base-message");

      if (xhr.status == 200) {

          baseMessage.classList.add("base-message");
          var requestAnswer = xhr.responseText;
          var arrayObject = JSON.parse(requestAnswer);

          for (var indexObject in arrayObject){

            for(var indexEditorias in arrayObject[indexObject].Editorias){

              var editoria = (arrayObject[indexObject].Editorias[indexEditorias].Editoria);

              for(var indexNoticias in arrayObject[indexObject].Editorias[indexEditorias].Notícias) {

                computeTotalEditorias(editoria);
                createUnorderedList(editoria, arrayObject[indexObject].Editorias[indexEditorias].Notícias[indexNoticias])

              }
            }
          }

      } else {

          baseMessage.classList.remove("base-message");

      }

  });

  xhr.send();

}

/** ---------------------------------------------------------------------- **/
/** Compute total of Editorias                                             **/
/** ---------------------------------------------------------------------- **/
function computeTotalEditorias(editoria){

  switch (editoria) {
    case "Esporte":
      totalEditoriasEsporte++;
      break;
    case "País":
      totalEditoriasPais++;
      break;
    case "Rio":
      totalEditoriasRio++;
      break;
    case "Cultura":
      totalEditoriasCultura++;
      break;
    case "Internacional":
      totalEditoriasInternacional++;
      break;
    default:
      totalEditoriasOutros++;
      break;
  }

}

/** ---------------------------------------------------------------------- **/
/** Create unordered list with data from Json                              **/
/** ---------------------------------------------------------------------- **/
function createUnorderedList(editoria, itemJson){

  var unorderedList = document.querySelector("#news-list-line");
  var unorderedListItem = generateListItem(editoria, itemJson);
  unorderedList.appendChild(unorderedListItem);

}

/** ---------------------------------------------------------------------- **/
/** Create item to unordered list with data from Json                      **/
/** ---------------------------------------------------------------------- **/
function generateListItem(editoria, itemJson){

  var itemList = document.createElement("LI");
  itemList.classList.add("news-list-line");

  /**
  var itemList = document.createElement("DIV");
  itemList.classList.add("news-division");
  **/

  itemList.appendChild(formatListItem(editoria, "news-editoria"));
  itemList.appendChild(formatListItem(itemJson.Publicação, "news-date"));
  itemList.appendChild(formatListItem(itemJson.Foto, "news-image"));
  itemList.appendChild(formatListItem(itemJson.Título, "news-title"));
  itemList.appendChild(formatListItem(itemJson.Texto, "news-text"));
  itemList.appendChild(formatListItem("Saiba mais", "news-more"));

  return itemList;

}

/** ---------------------------------------------------------------------- **/
/** Format list item with data from Json                                   **/
/** ---------------------------------------------------------------------- **/
function formatListItem(data, classId) {

  switch (classId) {

    case "news-editoria":
      var itemList = document.createElement("p");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "news-image":
      var itemList = document.createElement("IMG");
      var imageSrc = "http://localhost:3003/news/" + data;
      itemList.src = imageSrc;
      itemList.alt = "News data";
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "news-title":
      var itemList = document.createElement("p");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "news-date":
      var itemList = document.createElement("p");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "news-text":
      var itemList = document.createElement("p");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "news-more":
      var itemList = document.createElement("p");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

    case "product-list-detail":
      var itemList = document.createElement("A");
      var linkText = document.createTextNode("Details: " + data);
      itemList.setAttribute("href", "javascript:void(0)")
      var itemParameter = "productDetailShow(" + data + ");";
      itemList.setAttribute("onclick", itemParameter)
      itemList.classList.add("product-list-detail");
      itemList.textContent = data;
      itemList.classList.add(classId);
      itemList.classId = classId;
      break;

  }

  return itemList;

}
