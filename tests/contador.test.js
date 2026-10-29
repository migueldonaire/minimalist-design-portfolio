const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const codigo = fs.readFileSync("js/contador.js", "utf8");

// Carga contador.js en un contexto aislado con un DOM y un localStorage simulados
function cargarContador({ localStorage } = {}) {
  const saludo = { innerHTML: "" };
  const guardado = {};
  const contexto = {
    document: {
      getElementById: (id) => (id === "saludo" ? saludo : null),
    },
    localStorage: localStorage || {
      setItem: (clave, valor) => {
        guardado[clave] = String(valor);
      },
    },
  };
  vm.createContext(contexto);
  vm.runInContext(codigo, contexto, { filename: path.resolve("js/contador.js") });
  return { contexto, saludo, guardado };
}

test("la primera visita muestra el mensaje de primera visita", () => {
  const { contexto, saludo } = cargarContador();
  contexto.contar("Ana");
  assert.strictEqual(saludo.innerHTML, "Hola Ana, es tu primera visita");
});

test("la segunda visita muestra el mensaje de segunda visita", () => {
  const { contexto, saludo } = cargarContador();
  contexto.contar("Ana");
  contexto.contar("Ana");
  assert.strictEqual(saludo.innerHTML, "Hola Ana, es tu segunda visita");
});

test("a partir de la tercera visita muestra el número de visitas", () => {
  const { contexto, saludo } = cargarContador();
  contexto.contar("Ana");
  contexto.contar("Ana");
  contexto.contar("Ana");
  assert.strictEqual(saludo.innerHTML, "Hola Ana, ya llevas 3 visitas");
  contexto.contar("Ana");
  assert.strictEqual(saludo.innerHTML, "Hola Ana, ya llevas 4 visitas");
});

test("guarda el número de visitas en localStorage", () => {
  const { contexto, guardado } = cargarContador();
  contexto.contar("Ana");
  assert.strictEqual(guardado.visitas, "1");
  contexto.contar("Ana");
  assert.strictEqual(guardado.visitas, "2");
});

test("no falla si localStorage lanza un error", () => {
  const { contexto, saludo } = cargarContador({
    localStorage: {
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    },
  });
  assert.doesNotThrow(() => contexto.contar("Ana"));
  assert.strictEqual(saludo.innerHTML, "Hola Ana, es tu primera visita");
});
