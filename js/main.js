"use strict";

// Original idea took from: http://anexsoft.com/p/152/patron-observador-con-javascript-observer-pattern

// Crear clase Observable
function Observable() {
  this.observers = [];

  // Agregamos los observables para cada uno de los elementos que se necesiten notificar
  this.add = function (observer) {
    this.observers.push(observer);
  };

  // Función que notifica al objeto que está sucediendo.
  this.notify = function (obj) {
    this.observers.forEach(function (observer) {
      observer.call(null, obj); // Encadenar constructoress
    });
  };
}


// Clase que modela un combate
function PokemonCombate(pokemon1, pokemon2){
  this.observable = new Observable();

  this.pokemon1 = pokemon1;
  this.pokemon2 = pokemon2;
  this.ronda = 1;
}


// Función agregada a nuestra clase PokemonCombate
PokemonCombate.prototype.combatir = function () {
  var ganador,
      perdedor;

  if(Math.floor((Math.random() * 2) + 1) === 1) {
      ganador = this.pokemon1;
      perdedor = this.pokemon2;
  } else {
      ganador = this.pokemon2;
      perdedor = this.pokemon1;
  }

  // Función importante para notificar a los observables.
  // IMPORTANTE: No actualiza ningún elemento del DOM
  this.observable.notify({
    ganador: ganador,
    perdedor: perdedor,
    ronda: this.ronda
  });

  this.ronda++;
};


// Evento: carga
// Cuando carga obtiene los elementos del DOM y agrega un observable.
window.onload = function(){
  var combate = new PokemonCombate('Pikachu', 'Meowth');

  combate.observable.add(function(obj){
    document.getElementById("ganador").innerHTML = ('El ganador de la ronda ' + obj.ronda + ' es: ' + obj.ganador);
  });

  combate.observable.add(function(obj){
  	document.getElementById("perdedor").innerHTML = ('El perdedor de la ronda ' + obj.ronda + ' es: ' + obj.perdedor);
  });

  // Dispara el evento que actualiza el ganador del combate
  document.querySelector('#combate').addEventListener('click', function(){
    combate.combatir();
  })
}
