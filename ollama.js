//<script src="https://cdn.jsdelivr.net/npm/ollama-js-client/dist/browser/iife/ollama-js.global.js"></script>
//<script type="module" src="https://cdn.jsdelivr.net/npm/ollama-js-client/dist/browser/index.js"></script>
import { Ollama } from 'https://cdn.jsdelivr.net/npm/ollama-js-client/dist/browser/index.js';

// use in the browser as a type="module" or in node with modules enabled (mjs)
//import Ollama from "ollama-js-client";

// use global in the browser with script tag
//const Ollama = window.OllamaJS;

const response = await new Ollama({
  model: "llama2",
  url: "http://127.0.0.1:11434",
}).prompt("Hello my ai friend");
console.log(response);
