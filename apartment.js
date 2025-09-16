/* eslint-disable no-redeclare */
import Dwelling from "./Dwelling.js";
import Public from "./Public.js";
const publicLoads = new Public();
const typeA = new Dwelling();
const typeB = new Dwelling();
const typeC = new Dwelling();
const numberA = randomRangeWithIncrements(1, 16, 1);
const numberB = randomRangeWithIncrements(1, 16, 1);
const numberC = randomRangeWithIncrements(1, 16, 1);
var demandSuite = [];
var inc = ``;
var poolHelp = "";
var rangeHelp = "";
var comfortHelp = "";
var addHelp = "";
console.log("interconned =" + typeA.inc);
if (typeA.rangeDemand != 0) {
  var rangeHelp =
    "<b>" +
    typeA.rangeDemand +
    " w</b> of range demand. 6000W for the first 12 kw of the rating and an additional 40% of the rating in excess of 12 kw<br>";
}
if (typeA.above <= 45) {
  var basicCalc =
    "45 m<sup>2</sup> or less of living area is just <b>3500 w</b><br>";
} else if (typeA.above > 45 && typeA.above < 91) {
  var basicCalc =
    "3500 w for the first 45 m<sup>2</sup><br> 1500 w for the next portion of 45 m<sup>2</sup> <br> <b> 5000 w</b> total basic demand<br>";
} else {
  var basicCalc =
    "3500 w for the first 45 m<sup>2</sup><br> 1500 w for the next portion of 45 m<sup>2</sup><br>1000 w for each additional 90 m<sup>2</sup> or portion of<br><b>" +
    typeA.basic +
    " w</b> total basic demand<br>";
}
if (typeA.pool > 0) {
  var poolHelp =
    "<b>" + typeA.pool + " w</b> of tankless style water heat at 100% <br>";
}
if (typeA.inc == 0) {
  var comfortHelp =
    "<b>" +
    typeA.comfort +
    " w </b> of combined demand of heating and cooling since they can be used at the same time<br>";
} else if (
  typeA.inc == 1 &&
  typeA.comfort == typeA.heat &&
  typeA.cooling != 0
) {
  var comfortHelp =
    "<b>" +
    typeA.heat +
    " w</b> of heat demand as heat is the larger rating and cannot be used at the same time as AC<br>";
} else if (
  typeA.inc == 1 &&
  typeA.comfort == typeA.cooling &&
  typeA.heat != 0
) {
  var comfortHelp =
    "<b>" +
    typeA.cooling +
    " VA</b> of AC demand as AC is the larger rating and cannot be used at the same time as heat<br>";
} else if (typeA.comfort == typeA.heat) {
  var comfortHelp = "<b>" + typeA.comfort + " W</b> of heat<br>";
} else if (typeA.comfort == typeA.cooling) {
  var comfortHelp = "<b>" + typeA.comfort + " VA</b> of cooling<br>";
} else {
  var comfortHelp = "";
}
if (typeA.rangeDemand != 0) {
  var addHelp =
    "<b>" +
    typeA.add +
    " w </b> of additional load. This is all loads not accounted for earlier in excess of 1500 w * 25%<br>";
} else {
  var addHelp =
    "<b>" +
    typeA.add +
    " w </b> of addittional load. This is all loads not accounted for earlier in excess of 1500 w * 25% + an additional 6000 w for the no electric range<br>";
}
var maText =
  "The calculated demand for this rule is based in amps as we have to compare the <b>greater</b> of item <b>a) " +
  typeA.totalDemand +
  "/240 = " +
  Math.round((typeA.totalDemand * 100) / 240) / 100 +
  " A </b>or<b> b) 60 A</b>";
var dwellingHelp =
  "'" + basicCalc + rangeHelp + poolHelp + comfortHelp + addHelp + maText + "'";

const button = `
<p>    
${typeA.basicText}
${typeA.rangeText}
${typeA.addLoad11}
${typeA.poolText}
${typeA.addLoad12}
${typeA.heatText}
${typeA.coolingText}
${typeA.incText}
<h3>Enter the total calculated demand in amps:</h3>
<form name="answerDU" onkeypress="return event.keyCode != 13">
<input type="number" name="DU" id="DU"><br>
<input type="button" id ="DUB" value="Submit" onclick="testButton(${typeA.ma},document.getElementById('DU').value,1,${dwellingHelp})"><br>
</form>
<div id="responseDU"></div>
</p>
<script>
var input1 = document.getElementById("DU");
input1.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("DUB").click();
  }
});
</script>
`;
function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.innerHTML = button;
  newDiv.id = "dwellingCalc";
  let sp2 = document.getElementById("div1");
  // Get the parent element
  let parentDiv = sp2.parentNode;
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div1");
  parentDiv.insertBefore(newDiv, currentDiv);
}
//Help
//Dwelling Unit individual text
const plhelp =
  "'Since we are sizing the feeder just for loads not located in dwelling units 8-202 4) applies and it tells to take all loads at rated values unless other sections allow us to apply a demand. This would mean heat and carstalls may have a demand applied.'";
addElement();
const buttonp = `
<p>    
The following loads are not located in dwelling units;<br>
${publicLoads.carStalls} ${publicLoads.plugType} ${publicLoads.carAmp} amp carstalls <br>
${publicLoads.addLoad11}
${publicLoads.publicHeat} W of electric baseboard heat<br>
${publicLoads.addLoad12}<br>
<h3>Enter the total calculated demand in watts:</h3>
<form name="answerPL" onkeypress="return event.keyCode != 13">
<input type="number" name="PL" id="PL"><br>
<input type="button" value="Submit" id="PLB" onclick="testButton(${publicLoads.calcDemand},document.getElementById('PL').value,2,${plhelp})"<br>
</form>
<p id="responsePL"></p>
`;
function addElementp() {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.innerHTML = buttonp;
  newDiv.id = "publicCalc";
  let sp2 = document.getElementById("div2");
  // Get the parent element
  let parentDiv = sp2.parentNode;
  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("div2");
  parentDiv.insertBefore(newDiv, currentDiv);
}
addElementp();
var maxSub = "";
var suiteDemand = 0;
//Determine which unit is the largest demand
if (typeA.subtot > typeB.subtot && typeA.subtot > typeC.subtot) {
  var maxSub = typeA.subtot;
} else if (typeB.subtot > typeC.subtot && typeB.subtot > typeA.subtot) {
  var maxSub = typeB.subtot;
} else {
  var maxSub = typeC.subtot;
}
//Determine the remaining order of demand and adding to the demandSuite array in order
if (maxSub == typeA.subtot) {
  if (typeB.subtot > typeC.subtot) {
    for (let i = 0; i < numberA; i++) {
      demandSuite.push(typeA.subtot);
    }
    for (let i = 0; i < numberB; i++) {
      demandSuite.push(typeB.subtot);
    }
    for (let i = 0; i < numberC; i++) {
      demandSuite.push(typeC.subtot);
    }
  } else {
    for (let i = 0; i < numberA; i++) {
      demandSuite.push(typeA.subtot);
    }
    for (let i = 0; i < numberC; i++) {
      demandSuite.push(typeC.subtot);
    }
    for (let i = 0; i < numberB; i++) {
      demandSuite.push(typeB.subtot);
    }
  }
} else if (maxSub == typeB.subtot) {
  if (typeA.subtot > typeC.subtot) {
    for (let i = 0; i < numberB; i++) {
      demandSuite.push(typeB.subtot);
    }
    for (let i = 0; i < numberA; i++) {
      demandSuite.push(typeA.subtot);
    }
    for (let i = 0; i < numberC; i++) {
      demandSuite.push(typeC.subtot);
    }
  } else {
    for (let i = 0; i < numberB; i++) {
      demandSuite.push(typeB.subtot);
    }
    for (let i = 0; i < numberC; i++) {
      demandSuite.push(typeC.subtot);
    }
    for (let i = 0; i < numberA; i++) {
      demandSuite.push(typeA.subtot);
    }
  }
} else if (typeA.subtot > typeB.subtot) {
  for (let i = 0; i < numberC; i++) {
    demandSuite.push(typeC.subtot);
  }
  for (let i = 0; i < numberA; i++) {
    demandSuite.push(typeA.subtot);
  }
  for (let i = 0; i < numberB; i++) {
    demandSuite.push(typeB.subtot);
  }
} else {
  for (let i = 0; i < numberC; i++) {
    demandSuite.push(typeC.subtot);
  }
  for (let i = 0; i < numberB; i++) {
    demandSuite.push(typeB.subtot);
  }
  for (let i = 0; i < numberA; i++) {
    demandSuite.push(typeA.subtot);
  }
}
//Calculate the total suite demand
// largest at 100%
var suite1 = [];
var suite2 = [];
var suite3 = [];
var suite4 = [];
var suite5 = [];
var suiteDemand = 1 * Math.max(...demandSuite);
suite1.push(demandSuite.shift());
//Next 2 at 65%
for (var x = 0; x < 2; x++) {
  var tempMax = Math.max(...demandSuite);
  var suiteDemand = suiteDemand + tempMax * 0.65;
  suite2.push(demandSuite.shift());
}
//Next 2 at 40%
for (var x = 0; x < 2 && demandSuite.length > 0; x++) {
  var tempMax = Math.max(...demandSuite);
  var suiteDemand = suiteDemand + tempMax * 0.4;
  suite3.push(demandSuite.shift());
}
//Next 15 at 25%
for (var x = 0; x < 15 && demandSuite.length > 0; x++) {
  var tempMax = Math.max(...demandSuite);
  var suiteDemand = suiteDemand + tempMax * 0.25;
  suite4.push(demandSuite.shift());
}
//All Remaining at 10%
for (var x = 0; demandSuite.length > 0; x++) {
  var tempMax = Math.max(...demandSuite);
  var suiteDemand = suiteDemand + tempMax * 0.1;
  suite5.push(demandSuite.shift());
}
var suite2t = suite2.reduce((a, b) => a + b, 0) * 0.65;
var suite3t = suite3.reduce((a, b) => a + b, 0) * 0.4;
var suite4t = suite4.reduce((a, b) => a + b, 0) * 0.25;
var suite5t = suite5.reduce((a, b) => a + b, 0) * 0.1;
var suiteDemand2 = suiteDemand2 + suite2t + suite3t + suite4t + suite5t;
//Heat vs AC
if (publicLoads.publicHeat == 0) {
  var publicHeat = ``;
} else {
  var publicHeat = `${publicLoads.publicHeat} W of electric baseboard heat<br>`;
}
var suiteHeat =
  typeA.heat * numberA + typeB.heat * numberB + typeC.heat * numberC;
var totHeat =
  typeA.heat * numberA +
  typeB.heat * numberB +
  typeC.heat * numberC +
  publicLoads.publicHeat;
var heatDemand = (totHeat - 10000) * 0.75 + 10000;
var totAC =
  typeA.cooling * numberA + typeB.cooling * numberB + typeC.cooling * numberC;
var carStallsText = "";
var heatVSac = "";
if (totAC < totHeat) {
  var inc = `<b>Heat and Cooling are unable to operate at the same time</b><br>`;
  var carstalls = `${publicLoads.carStalls} ${publicLoads.plugType} ${publicLoads.carAmp} amp carstalls <br>`;
  var carDemand = publicLoads.carDemand;
  var comfortDemand = heatDemand;
  var carStallsText =
    "<h3>Car Stalls</h3><p><b>" +
    carDemand +
    " W </b>of carstalls demand, this is a special Alberta rule that car stalls are entered as a seperate item. Refer to STANDATA bulletin 21-ECB-008</p>";
  var heatVSac =
    "<h3>Heat vs AC</h3><p>" +
    suiteHeat +
    "W suite heat plus,<br> " +
    publicLoads.publicHeat +
    " W public heat<br><b> " +
    totHeat +
    " W </b>of total heat load <br> VS <br><b>" +
    totAC +
    " VA</b> of air Conditioning<br>Since heat is the larger load we must apply a demand as per section 62<br>(" +
    totHeat +
    "- 10000)* 0.75 + 10000 = <b>" +
    heatDemand +
    " W</b> of heating demand";
} else {
  var carDemand = 0;
  var carstalls = ``;
  var comfortDemand = totAC + heatDemand;
  var heatVSac =
    "<h3>Heat vs AC</h3><p>" +
    "Since both heat and cooling can run at the same time both must be taken into account<br>Heat Demand = (" +
    totHeat +
    "- 10000)* 0.75 + 10000 = " +
    heatDemand +
    " W + <br> the cooling load of " +
    totAC +
    " VA for a total of <b>" +
    comfortDemand +
    " W</b> of total comfort demand";
}
var calcDemand =
  suiteDemand + comfortDemand + publicLoads.subTot * 0.75 + carDemand;
var publicHelpText =
  "<h3>Public Loads</h3><p> Public loads of " +
  publicLoads.subTot +
  " * 0.75 = <b>" +
  publicLoads.subTot * 0.75 +
  " W</b><br> 8-202 3) e) informs us that loads not accounted for in previous steps and not located in dwelling units are added in at 75% <br></p>";
const suiteDemandHelp =
  "'<h3>Suite Calculation:</h3><br><p>Suite Type A Subtotal without heat or ac is :" +
  typeA.subtot +
  " W<br>Suite Type B Subtotal without heat or ac is :" +
  typeB.subtot +
  " W<br>Suite Type C Subtotal without heat or ac is :" +
  typeC.subtot +
  " W<br>" +
  suite1 +
  " * 1.00 = " +
  suite1 +
  " W<br>" +
  suite2.reduce((a, b) => a + b, 0) +
  " * 0.65 = " +
  suite2t +
  " W<br>" +
  suite3.reduce((a, b) => a + b, 0) +
  " * 0.40 = " +
  suite3t +
  " W<br>" +
  suite4.reduce((a, b) => a + b, 0) +
  " * 0.25 = " +
  suite4t +
  " W<br>" +
  suite5.reduce((a, b) => a + b, 0) +
  " * 0.10 = " +
  suite5t +
  " W<br><br><b>Suite Total = " +
  suiteDemand +
  " W</b><br>" +
  carStallsText +
  heatVSac +
  publicHelpText +
  "</p>'";
const buttonMain = `
<p>
Additional loads not located within dwelling units;<br>    
${carstalls}
${publicLoads.addLoad11}
${publicHeat}
${publicLoads.addLoad12}<br>
${inc}
<h3>Enter the total calculated demand in watts:</h3>
<form name="answerMS" onkeypress="return event.keyCode != 13">
<input type="number" name="MS" id="MS"> <input type="button" value="Submit" onclick="testButton(${calcDemand},document.getElementById('MS').value,3,${suiteDemandHelp})"><br>
</form>
<div id="responseMS"></div>
</p>
`;
function addElementm() {
  // create a new div element
  const newDiv = document.createElement("div");
  newDiv.innerHTML = buttonMain;
  newDiv.id = "mainCalc";
  var sp2 = document.getElementById("div3");
  // Get the parent element
  var parentDiv = sp2.parentNode;
  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("div3");
  parentDiv.insertBefore(newDiv, currentDiv);
}
addElementm();
function addTable() {
  var hChart = [];
  hChart.push([
    "A",
    numberA,
    typeA.basic,
    typeA.range,
    typeA.pool,
    typeA.addTot,
    typeA.heat,
    typeA.cooling,
  ]);
  hChart.push([
    "B",
    numberB,
    typeB.basic,
    typeB.range,
    typeB.pool,
    typeB.addTot,
    typeB.heat,
    typeB.cooling,
  ]);
  hChart.push([
    "C",
    numberC,
    typeC.basic,
    typeC.range,
    typeC.pool,
    typeC.addTot,
    typeC.heat,
    typeC.cooling,
  ]);
  var table = document.createElement("table");
  //create Table Header
  var header = [
    "Type",
    "# of Units",
    "Basic",
    "Range",
    "Tankless",
    "Other",
    "Heat",
    "Cooling",
  ];
  var tr = document.createElement("tr");
  for (var column in header) {
    var th = document.createElement("th");
    th.innerHTML = header[column];
    tr.appendChild(th);
  }
  table.appendChild(tr);
  //create Table Body
  for (var row in hChart) {
    var tr = document.createElement("tr");
    for (var column in hChart[row]) {
      var td = document.createElement("td");
      td.innerHTML = hChart[row][column];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  var sp2 = document.getElementById("mainCalc");
  // Get the parent element
  var parentDiv = sp2.parentNode;
  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById("mainCalc");
  parentDiv.insertBefore(table, currentDiv);
}
addTable();
function randomRangeWithIncrements(min, max, inc) {
  min = min || 0;
  inc = inc || 1;
  if (!max) {
    return new Error("need to define a max");
  }
  return Math.floor((Math.random() * (max - min)) / inc) * inc + min;
}
