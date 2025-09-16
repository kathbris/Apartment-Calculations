class Public {
  constructor() {
    const controlled = [
      "restricted",
      "controlled",
      "unrestricted",
      "uncontrolled",
    ];
    this.plugType = getRandomItem(controlled);
    this.carStalls = randomRangeWithIncrements(5, 100, 1);
    this.carAmp = randomRangeWithIncrements(15, 25, 5);
    if (this.plugType == "restricted" || this.plugType == "controlled") {
      //15 amp Restricted
      if (this.carAmp == 15) {
        if (this.carStalls <= 30) {
          this.carDemand = this.carStalls * 650;
        } else if (this.carStalls < 60) {
          this.carDemand = 19500 + (this.carStalls - 30) * 550;
        } else {
          this.carDemand = 36000 + (this.carStalls - 60) * 450;
        }
        //20 amp restricted
      } else if (this.carStalls <= 30) {
        this.carDemand = this.carStalls * 975;
      } else if (this.carStalls <= 60) {
        this.carDemand = 29250 + (this.carStalls - 30) * 825;
      } else {
        this.carDemand = 54000 + (this.carStalls - 60) * 675;
      }
      //15 amp unrestricted
    } else if (this.carAmp == 15) {
      if (this.carStalls <= 30) {
        this.carDemand = this.carStalls * 1200;
      } else if (this.carStalls < 60) {
        this.carDemand = 36000 + (this.carStalls - 30) * 1000;
      } else {
        this.carDemand = 66000 + (this.carStalls - 60) * 800;
      }
      //20 amp unrestricted
    } else if (this.carStalls <= 30) {
      this.carDemand = this.carStalls * 1800;
    } else if (this.carStalls < 60) {
      this.carDemand = 54000 + (this.carStalls - 30) * 1500;
    } else {
      this.carDemand = 99000 + (this.carStalls - 60) * 1200;
    }
    this.publicHeat = randomRangeWithIncrements(5000, 25000, 250);
    if (this.publicHeat < 7000) {
      this.publicHeat = 0;
    }
    this.addLoads = [
      "Garden",
      "Sump Pump",
      "Dog Wash",
      "Hotplate",
      `Recording Studio`,
      `Kiln`,
      `Laundry`,
      `Hot Water Tank`,
      `Fire Alarm`,
      `Security System`,
      `Theatre`,
      `Spa Studio`,
      `Exercise Equipment`,
      `Wood Shop`,
      `Pet hotel`,
    ];
    this.addLoad1 = getRandomItem(this.addLoads);
    var index = this.addLoads.indexOf(this.addLoad1);
    this.addLoads.splice(index, 1);
    this.add1 = randomRangeWithIncrements(1400, 5000, 100);
    this.addLoad2 = getRandomItem(this.addLoads);
    this.add2 = randomRangeWithIncrements(1400, 5000, 100);
    if (this.addLoad1 == "") {
      this.addLoad11 = "";
      this.add1 = 0;
    } else {
      this.addLoad11 = this.add1 + " W " + this.addLoad1 + "<br>";
    }
    if (this.addLoad2 == "") {
      this.addLoad12 = "";
      this.add2 = 0;
    } else {
      this.addLoad12 = this.add2 + " W " + this.addLoad2 + "<br>";
    }
    if (this.publicHeat > 10000) {
      this.publicHeatDemand = (this.publicHeat - 10000) * 0.75 + 10000;
    } else {
      this.publicHeatDemand = this.publicHeat;
    }
    this.calcDemand =
      this.carDemand + this.publicHeatDemand + this.add1 + this.add2;
    this.subTot = this.add1 + this.add2;
  }
}
function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];
  return item;
}
function randomRangeWithIncrements(min, max, inc) {
  min = min || 0;
  inc = inc || 1;
  if (!max) {
    return new Error("need to define a max");
  }
  return Math.floor((Math.random() * (max - min)) / inc) * inc + min;
}
export default Public;
