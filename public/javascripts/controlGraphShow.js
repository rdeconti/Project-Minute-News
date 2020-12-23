/******************************************************************************
Project: Seniores Digitais - Labora/Alura/Oracle ONE
Programmer: Rosemeire Deconti
Date: December/2020
Challenge: https://github.com/Infoglobo/desafio-front-end
******************************************************************************/

/** ---------------------------------------------------------------------- **/
/** Load google CHARTS                                                     **/
/** ---------------------------------------------------------------------- **/
google.charts.load("current", {packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** ---------------------------------------------------------------------- **/
/** Generate chart with data from JSON and computed in Global Variants     **/
/** ---------------------------------------------------------------------- **/
function drawChart(){

    var data = google.visualization.arrayToDataTable([
      ["Editoria", "Ocorre", { role: "style" } ],
      ["País", globalTotalEditoriasPais, "red"],
      ["Rio", globalTotalEditoriasRio, "black"],
      ["Esporte", globalTotalEditoriasEsporte, "yellow"],
      ["Cultura", globalTotalEditoriasCultura, "pink"],
      ["Internacional", globalTotalEditoriasInternacional, "blue"]
    ]);

    var view = new google.visualization.DataView(data);

    view.setColumns([0, 1,
                     { calc: "stringify",
                       sourceColumn: 1,
                       type: "string",
                       role: "annotation" },
                     2]);

    var options = {
      width: 700,
      height: 400,
      bar: {groupWidth: "50%"},
      legend: { position: "none" },
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("chartDrawn"));
    chart.draw(view, options);

}
