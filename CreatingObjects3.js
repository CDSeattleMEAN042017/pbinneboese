// JavaScript code
function Vehicle(name, noise, wheels, passengers, speed) {
  this.name = name;
  this.noise = noise;
  this.wheels = wheels;
  this.passengers = passengers;
  this.speed = speed;
  this.distance_travelled = 0;
  this.VIN = 0;
}

Vehicle.prototype.makeNoise = function() {
    console.log(this.noise);
}

Vehicle.prototype.move = function() {
  this.updateDistanceTravelled();
  this.makeNoise();
}

Vehicle.prototype.checkMiles = function() {
  console.log("Distance travelled =", this.distance_travelled);
}

Vehicle.prototype.updateDistanceTravelled = function() {
  this.distance_travelled += this.speed;
}

Vehicle.prototype.makeVIN = function() {
  this.VIN = Math.floor(Math.random() * 1000000); // generate random number from 1 to 1000000
  return this.VIN
}

var myBike = new Vehicle("bike", "ring ring", 2, 1, 5);
// myBike.makeNoise();
myBike.move();
myBike.move();
myBike.checkMiles();

var mySedan = new Vehicle("sedan", "Honk Honk!", 4, 5, 50);
mySedan.makeNoise();

var myBus = new Vehicle("bus", "Aoogah!", 6, 32, 30);
console.log("wheels:", myBus.wheels, "passengers:", myBus.passengers)
myBus.pickupPassengers = function(pickingUp) {
  myBus.passengers += pickingUp;
}
myBus.pickupPassengers(5);
console.log("passengers now:", myBus.passengers);

console.log("myBike VIN is", myBike.makeVIN());
console.log("mySedan VIN is", mySedan.makeVIN());
console.log("myBus VIN is", myBus.makeVIN());
