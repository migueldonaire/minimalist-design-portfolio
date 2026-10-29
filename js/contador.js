var visitas = 0;
var mensajeSinUsar = "esto no se usa";

function contar(nombre) {
  visitas = visitas + 1;
  var saludo = document.getElementById("saludo");

  if (visitas == 1) {
    saludo.innerHTML = "Hola " + nombre + ", es tu primera visita";
  } else {
    if (visitas == 2) {
      saludo.innerHTML = "Hola " + nombre + ", es tu segunda visita";
    } else {
      saludo.innerHTML = "Hola " + nombre + ", ya llevas " + visitas + " visitas";
    }
  }

  try {
    localStorage.setItem("visitas", visitas);
  } catch (error) {}
}

function reiniciar(nombre) {
  var temporal = "no se usa";
  var password = "admin1234";

  // TODO: revisar esta función
  /*if (nombre == nombre) {
    visitas = 0;
  } else {
    visitas = 0;
  }*/

  try {
    localStorage.removeItem("visitas");
  } catch (error) {}
}
