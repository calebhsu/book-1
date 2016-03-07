var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');

// San Francisco
var city_location = {
    lat: 37.78,
    lon: -122.41
}

var radius = 0.025

// simualate a random person entering, staying for a duration, and leaving
function simulate(){
  
    var providerref = new Firebase("https://hungry-asians.firebaseio.com/providers")
    var name = random_name()
    var duration = 1 + 5 * Math.random()
    var lat = city_location.lat + radius * (Math.random() - 0.5) * 2
    var lon = city_location.lon + radius * (Math.random() - 0.5) * 2
    var person = {
        name: name,
        duration: duration,
        lat: lat,
        lon: lon
    }
    enter(person)

    // simulate this person entering
    var timer = setInterval(function () {
        var direction = [-1,1,0]
        var newlat = lat + direction[Math.floor(Math.random() * direction.length)] * 0.0003
        var newlon = lon + direction[Math.floor(Math.random() * direction.length)] * 0.0003
        providerref.child(name).update({lat: newlat, lon: newlon})
    }, 1000);

    // simulate this person leaving after 'duration' seconds
    setTimeout(function () {
        clearTimeout(timer);
        leave(person);
    }, duration * 10000)
}


function enter(person){
    //console.log('enter', person)
    var ref = new Firebase("https://hungry-asians.firebaseio.com/");
    var usersRef = ref.child("providers");
    usersRef.child(person.name).set({
        name : person.name,
        duration: person.duration,
        lat: person.lat,
        lon: person.lon
    });
}

function leave(person){
  console.log('leave', person)
  var ref = new Firebase("https://hungry-asians.firebaseio.com/providers/"+person.name);
  ref.remove();
}

function clear(){
    var ref = new Firebase("https://hungry-asians.firebaseio.com/providers/");
    ref.remove();
}

//This is so we always start fresh
clear();

// run each second
setInterval(simulate, 15000)
