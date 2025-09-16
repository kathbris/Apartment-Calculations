class Dwelling {
  constructor() {
    this.above = randomRangeWithIncrements(30, 200, 5);
    this.range = randomRangeWithIncrements(6000, 19000, 1000);
    if (this.range < 10000) {
      this.range = 0;
      this.rangeText = "";
    }
    this.heat = randomRangeWithIncrements(0, 5000, 500);
    this.cooling = randomRangeWithIncrements(0, 5000, 500);
    this.pool = randomRangeWithIncrements(0, 3500, 250);
    this.inc = randomRangeWithIncrements(0, 2, 1);
    if (this.above > 45) {
      this.basic = (Math.ceil(Number(this.above) / 90) - 1) * 1000 + 5000;
    } else {
      this.basic = 3500;
    }
    if (this.range > 12000) {
      this.rangeDemand = Number((Number(this.range) - 12000) * 0.4 + 6000);
      this.addRange = 0;
      this.rangeText = `${this.range} W range <br>`;
    } else if (this.range != 0) {
      this.rangeDemand = 6000;
      this.addRange = 0;
      this.rangeText = `${this.range} W range <br>`;
    } else {
      this.rangeDemand = 0;
      this.addRange = 6000;
      this.rangeText = "";
    }
    if (this.inc == 0) {
      this.comfort = Number(this.heat) + Number(this.cooling);
    } else if (this.heat >= this.cooling) {
      this.comfort = Number(this.heat);
    } else {
      this.comfort = Number(this.cooling);
    }
    if (this.heat > 0 && this.cooling > 0 && this.inc == 1) {
      this.incText = `Heat and AC cannot operate at the same time.<br>`;
    } else {
      this.incText = "";
    }
    this.addLoads = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      `Virtual Presence Machine`,
      `Hydraulic Bender`,
      `Model Train Set`,
      `Recording Studio`,
      `Kiln`,
      `Dryer`,
      `Hot Water Tank`,
      `Television`,
      `Security System`,
      `Theatre System`,
      `Arc Welder`,
      `Massage Chair`,
      `Exercise Equipment`,
      `Grinder`,
      `Pet hotel`,
    ];
    this.addLoad1 = getRandomItem(this.addLoads);
    this.add1 = randomRangeWithIncrements(1400, 2000, 100);
    this.addLoad2 = getRandomItem(this.addLoads);
    this.add2 = randomRangeWithIncrements(1400, 2000, 100);
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

    if (this.add1 <= 1500) {
      this.add1 = 0;
    }
    if (this.add2 <= 1500) {
      this.add2 = 0;
    }
    if (this.pool > 1500) {
      this.poolText = `${this.pool} W Tankless water heat<br>`;
    } else {
      this.poolText = "";
      this.pool = 0;
    }
    this.addTot = this.add1 + this.add2;
    this.add = (this.add1 + this.add2) / 4 + this.addRange;
    this.subtot =
      Number(this.basic) +
      Number(this.rangeDemand) +
      Number(this.add) +
      Number(this.pool);
    this.totalDemand =
      Number(this.basic) +
      Number(this.rangeDemand) +
      Number(this.comfort) +
      Number(this.add) +
      Number(this.pool);
    this.calcDemand = Math.max(14400, this.totalDemand);
    this.ma = Math.round((this.calcDemand / 240) * 100) / 100;
    this.blankString = "";
    this.basicText = `${this.above} m<sup>2</sup> living area<br>`;
    this.heatText = `${this.heat} W in Heat<br>`;
    this.coolingText = `${this.cooling} VA in Cooling<br>`;
    this.addText = `${this.addRate} W in additional loads <br>`;
    if (this.heat == 0) {
      this.heatText = "";
    }
    if (this.cooling == 0) {
      this.coolingText = "";
    }
    this.basicHelpText = this.basic + " W of basic load <br>";
    if (this.rangeDemand == 0) {
      this.rangeHelpText = "";
      this.rangeAdditional = "6000 W because there is no range provided for + ";
    } else {
      this.rangeHelpText = this.rangeDemand + " W of range demand<br>";
      this.rangeAdditional = "";
    }
    if (this.pool == 0) {
      this.poolHelp = "";
    } else {
      this.poolHelp = this.pool + " W of tankless water heat<br>";
    }
    if (this.add == 0) {
      this.addText = "";
    } else {
      this.addText =
        this.addTot + " W of additional loads " + this.rangeAdditional;
    }
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
export default Dwelling;
