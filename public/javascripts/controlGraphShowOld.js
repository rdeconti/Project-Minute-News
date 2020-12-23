/******************************************************************************
Project: Seniores Digitais - Labora/Alura/Oracle ONE
Programmer: Rosemeire Deconti
Date: December/2020
Challenge: https://github.com/Infoglobo/desafio-front-end
******************************************************************************/

/** Load google charts **/
google.charts.load("current", {packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** ---------------------------------------------------------------------- **/
/** Generate chart with data from JSON                                     **/
/** ---------------------------------------------------------------------- **/
/**
function drawChart( totalGoverno,
                    totalCarnaval,
                    totalEsporte,
                    totalFerias,
                    totalOutros) {
**/

function drawChart(){

  var data = google.visualization.arrayToDataTable([
    ["Editoria", "Ocorre", { role: "style" } ],
    ["Governo", 75, "red"],
    ["Carnaval", 50, "black"],
    ["Esporte", 45, "black"],
    ["Férias", 30, "black"],
    ["Outros", 25, "black"]
  ]);

  var view = new google.visualization.DataView(data);

  view.setColumns([0, 1,
                   { calc: "stringify",
                     sourceColumn: 1,
                     type: "string",
                     role: "annotation" },
                   2]);

  var options = {
    width: 600,
    height: 400,
    bar: {groupWidth: "50%"},
    legend: { position: "none" },
  };

  var chart = new google.visualization.ColumnChart(document.getElementById("chartDrawn"));
  chart.draw(view, options);

}
