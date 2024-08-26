const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('output');
const canvasCtx = canvasElement.getContext('2d');
const resultElement = document.getElementById('results');

let objectDetector;

// Initialize the object detector
const initializeObjectDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    objectDetector = await ObjectDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite',
            delegate: "GPU"
        },
        scoreThreshold: 0.5,
        maxResults: 5
    });
};

// Start the webcam
const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
    videoElement.play();
    detectObjects();
};

// Detect objects in the video stream
const detectObjects = async () => {
    if (!objectDetector) return;

    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    const detections = await objectDetector.detect(videoElement);
    
    // Clear previous drawings
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // Draw video frame
    canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Draw bounding boxes and labels
    for (const detection of detections) {
        const {boundingBox, categories} = detection;
        const {originX, originY, width, height} = boundingBox;

        canvasCtx.strokeStyle = 'red';
        canvasCtx.lineWidth = 3;
        canvasCtx.strokeRect(originX, originY, width, height);

        canvasCtx.fillStyle = 'red';
        canvasCtx.font = '16px Arial';
        canvasCtx.fillText(
            `${categories[0].categoryName} (${categories[0].score.toFixed(2)})`,
            originX, originY - 5
        );
    }

    // Display results
    resultElement.textContent = `Detected objects: ${detections.length}`;

    // Continue detecting objects
    requestAnimationFrame(detectObjects);
};

// Initialize and start the object detection
const runObjectDetection = async () => {
    await initializeObjectDetector();
    await startWebcam();
};

runObjectDetection();
