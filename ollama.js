import o from 'https://cdn.jsdelivr.net/npm/ollama-js-client/dist/browser/index.js';

const response = await new o({
  model: "tinydolphin:1.1b-v2.8-q4_1",
  url: "http://127.0.0.1:11434/api/",
}).prompt("Hello my ai friend");
console.log(response);
