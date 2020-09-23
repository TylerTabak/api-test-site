var progress = document.getElementById('counter');
let pokemonIndex = 0
let toggle = false;


// Formate Date numbers
Number.prototype.pad = function(n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
};

// Update time on clock
function updateClock() {
    var now = new Date();
    var sec = now.getSeconds(),
      min = now.getMinutes(),
      hou = now.getHours(),
      mo = now.getMonth(),
      dy = now.getDate(),
      yr = now.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var tags = ["mon", "d", "y", "h", "m", "s"],
    corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2)];
    for (var i = 0; i < tags.length; i++)
      document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

// Add 1 to progress bar
function addition(){
  if (progress.value === 50){
    progress.value = 0;
    document.getElementById('loopCounter').innerText -= -1;
  }
  else {progress.value += 1;}
}

// Subtract 1 from progress bar
function subtraction(){
  if (progress.value === 0){
    progress.value = 50;
    document.getElementById('loopCounter').innerText -= 1;
  } else{
    progress.value -= 1;}
}


// Start the clock
function initClock() {
    updateClock();
    window.setInterval("updateClock()", 100);
    console.log("init Clock");
}


// basic alert
function textAlert() {
  alert("HEY!");
}

// Auto-increment the progress bar
function cycle() {
  if (toggle === false){
    interval = setInterval(addition, 50);
    document.getElementById('progress-status').innerText = "Stop Progress Bar";
  }
  else {
    clearInterval(interval)
    document.getElementById('progress-status').innerText = "Start Progress Bar";
  }
  toggle = !toggle
}

async function getApiCall(http){
  await fetch('https://pokeapi.co/api/v2/pokemon/'+ http +'/')
  .then(response => response.json())
  .then(json => document.getElementById('api-result').innerHTML += `\n${json.name} - #${pokemonIndex}\n<img src="${json.sprites.other.dream_world.front_default}" width="200" height="200" >`)
}


function nextPokemon() {
  pokemonIndex++;
  getApiCall(pokemonIndex);
}

function getJoke() {
  document.getElementById('joke-setup').innerHTML = "Fetching Joke..."
  document.getElementById('joke-delivery').innerHTML = " "
  fetch('https://sv443.net/jokeapi/v2/joke/Dark')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if (data.type === 'twopart'){
      document.getElementById('joke-setup').innerHTML = data.setup
      document.getElementById('joke-delivery').innerHTML = data.delivery
    } else {
      document.getElementById('joke-delivery').innerHTML = data.joke
      document.getElementById('joke-setup').innerHTML = " "
    }
  });
}


var string = "Javascript typing effect";
var str = string.split("");
var el = document.getElementById('str');
(function animate() {
str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
var running = setTimeout(animate, 90);
})();

document.getElementById("main-nav").addEventListener("click", textAlert);
document.getElementById("next-pokemon").addEventListener("click", nextPokemon);
document.getElementById("joke-button").addEventListener("click", getJoke);




