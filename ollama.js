const Ollama = window.OllamaJS;

const response = await new Ollama({
  model: "tinydolphin:1.1b-v2.8-q4_1",
  url: "http://127.0.0.1:11434/api/",
}).prompt("Hello my ai friend");
console.log(response);
