<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Classification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        #container {
            width: 100%;
            aspect-ratio: 16 / 9;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            margin-top: 20px;
        }
        #results {
            margin-top: 20px;
        }
        .result-item {
            margin-bottom: 10px;
        }
        .label {
            font-weight: bold;
        }
        .score {
            color: #666;
        }
    </style>
</head>
<body>
    <h1>Image Classification</h1>
    <p id="status">Loading model...</p>
    <input type="file" id="upload" accept="image/*">
    <button id="example">Run example</button>
    <div id="container"></div>
    <div id="results"></div>

    <script type="module">
        import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.10.1';

        env.allowLocalModels = false;

        const status = document.getElementById('status');
        const fileUpload = document.getElementById('upload');
        const imageContainer = document.getElementById('container');
        const example = document.getElementById('example');
        const resultsContainer = document.getElementById('results');

        const EXAMPLE_URL = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/city-streets.jpg';

        status.textContent = 'Loading model...';
        const classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
        status.textContent = 'Ready';

        example.addEventListener('click', (e) => {
            e.preventDefault();
            classify(EXAMPLE_URL);
        });

        fileUpload.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e2 => classify(e2.target.result);
            reader.readAsDataURL(file);
        });

        async function classify(img) {
            imageContainer.innerHTML = '';
            imageContainer.style.backgroundImage = `url(${img})`;
            resultsContainer.innerHTML = '';

            status.textContent = 'Classifying...';
            const output = await classifier(img, { topk: 5 });
            status.textContent = '';
            
            output.forEach(renderResult);
        }

        function renderResult({ label, score }) {
            const resultElement = document.createElement('div');
            resultElement.className = 'result-item';
            resultElement.innerHTML = `
                <span class="label">${label}:</span>
                <span class="score">${(score * 100).toFixed(2)}%</span>
            `;
            resultsContainer.appendChild(resultElement);
        }
    </script>
</body>
</html>
