/* eslint-disable no-unused-vars */
function testButton(totalDemand, answer, response, help) {
  console.log(answer, totalDemand, response, help);
  if (response == 1) {
    response = "responseDU";
  } else if (response == 2) {
    response = "responsePL";
  } else {
    response = "responseMS";
  }
  function withinRange(check, response) {
    var lowRange = Number(check) * 0.99;
    var hiRange = Number(check) * 1.01;
    if (response > lowRange && response < hiRange) {
      return true;
    } else {
      return false;
    }
  }
  if (withinRange(totalDemand, answer) == true) {
    let text = "<h3>Correct</h3>";
    document.getElementById(response).innerHTML = text;
  } else {
    let text = `<h3>Incorrect</h3>
    <div class="row">
    <div class="column">
            <p> Correct answer is ${totalDemand} </p><br></p>
    </div>
    <div class="column">
        <p id="plHelp">${help}</p>
    </div>
   </div>
    `;
    document.getElementById(response).innerHTML = text;
  }
}
/*let add_element = (text) => {
  const template = document.createElement("div");
  template.innerHTML = text;

  document.body.appendChild(template);
};*/
