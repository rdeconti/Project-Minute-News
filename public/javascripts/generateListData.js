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

          // Convert Json to Array
          convertFromJsonToArray(arrayObject);

      } else {

          baseMessage.classList.remove("base-message");

      }

  });

  xhr.send();

}

/** ---------------------------------------------------------------------- **/
/** Conversion of Json to Array applying selectors "ordered" and "filter"  **/
/** ---------------------------------------------------------------------- **/
function convertFromJsonToArray(arrayObject){

  // Processamento do seletor "ordenado por"
  var arrayInternal = new Array(0);
  var arrayIndex = 0;

  var id;
  var editoria;
  var foto;
  var titulo;
  var texto;
  var publicacao;
  var sortKey;

  var dia;
  var mes;
  var ano;

  for (var indexObject in arrayObject){

    for(var indexEditorias in arrayObject[indexObject].Editorias){

      var editoriaId = (arrayObject[indexObject].Editorias[indexEditorias].Editoria);

      if (globalCurrentFilter == "Todos" || globalCurrentFilter == editoriaId){

        for(var indexNoticias in arrayObject[indexObject].Editorias[indexEditorias].Notícias) {

          id = (arrayObject[indexObject].Editorias[indexEditorias].Id);
          editoria = (arrayObject[indexObject].Editorias[indexEditorias].Editoria);
          foto = (arrayObject[indexObject].Editorias[indexEditorias].Notícias[indexNoticias].Foto);
          titulo = (arrayObject[indexObject].Editorias[indexEditorias].Notícias[indexNoticias].Título);
          texto = (arrayObject[indexObject].Editorias[indexEditorias].Notícias[indexNoticias].Texto);
          publicacao = (arrayObject[indexObject].Editorias[indexEditorias].Notícias[indexNoticias].Publicação);

          switch (globalCurrentSort) {

            case "Data": // 06-01-2015
              ano = publicacao.substr(6, 4);
              mes = publicacao.substr(3, 2);
              dia = publicacao.substr(0, 2);
              sortKey = ano + mes + dia;
              arrayInternal [arrayIndex] = Array(sortKey, id, editoria, foto, titulo, texto, publicacao);
              break;

            case "Editoria":
              sortKey = editoria;
              arrayInternal [arrayIndex] = Array(sortKey, id, editoria, foto, titulo, texto, publicacao);
              break;

            default:
              sortKey = id;
              arrayInternal [arrayIndex] = Array(sortKey, id, editoria, foto, titulo, texto, publicacao);
              break;

          }

          arrayIndex++;

        }

      }
    }
  }

  // Classyfy array according to selector "ordered by"
  switch (globalCurrentSort) {

    case "Data":
      arrayInternal.sort();
      break;

    case "Editoria":
      arrayInternal.sort();
      break;

    default:
      arrayInternal.sort();
      break;

  }

  // Generate unordered list
  for (index=0; index < arrayInternal.length; index++) {

        id = arrayInternal[index][1];
        editoria = arrayInternal[index][2];
        foto = arrayInternal[index][3];
        titulo = arrayInternal[index][4];
        texto = arrayInternal[index][5];
        publicacao = arrayInternal[index][6];

        if (editoria) {

          // Update graph data
          computeTotalEditorias(editoria);
          createUnorderedList(editoria, foto, titulo, texto, publicacao);

        }
  }

}

/** ---------------------------------------------------------------------- **/
/** Compute total of Editorias                                             **/
/** ---------------------------------------------------------------------- **/
function computeTotalEditorias(editoria){

  switch (editoria) {
    case "Esporte":
      globalTotalEditoriasEsporte++;
      break;
    case "País":
      globalTotalEditoriasPais++;
      break;
    case "Rio":
      globalTotalEditoriasRio++;
      break;
    case "Cultura":
      globalTotalEditoriasCultura++;
      break;
    case "Internacional":
      globalTotalEditoriasInternacional++;
      break;
    default:
      globalTotalEditoriasOutros++;
      break;
  }

}

/** ---------------------------------------------------------------------- **/
/** Create unordered list with data from Json                              **/
/** ---------------------------------------------------------------------- **/
function createUnorderedList(editoria, foto, titulo, texto, publicacao){

  var unorderedList = document.querySelector("#news-list-line");
  var unorderedListItem = generateListItem(editoria, foto, titulo, texto, publicacao);
  unorderedList.appendChild(unorderedListItem);

}

/** ---------------------------------------------------------------------- **/
/** Create item to unordered list with data from Json                      **/
/** ---------------------------------------------------------------------- **/
function generateListItem(editoria, foto, titulo, texto, publicacao){

  var itemList = document.createElement("LI");
  itemList.classList.add("news-list-line");

  itemList.appendChild(formatListItem(editoria, "news-editoria"));
  itemList.appendChild(formatListItem(publicacao, "news-date"));
  itemList.appendChild(formatListItem(foto, "news-image"));
  itemList.appendChild(formatListItem(titulo, "news-title"));
  itemList.appendChild(formatListItem(texto, "news-text"));
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
