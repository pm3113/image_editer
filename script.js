const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const grayscaleInput = document.getElementById('grayscale');
const blurInput = document.getElementById('blur');
const sepiaInput = document.getElementById('sepia');
const invertInput = document.getElementById('invert');
const downloadButton = document.getElementById('download');
const resetButton = document.getElementById('reset');

let image = new Image();
let originalImageData = null;

// Load Image on Upload
uploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Draw Image on Canvas
image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height); // Save Original Image
};

// Apply Filters to Canvas Pixels
function applyFilters() {
    if (!originalImageData) return;

    ctx.putImageData(originalImageData, 0, 0);
    ctx.filter = `
        brightness(${brightnessInput.value}%)
        contrast(${contrastInput.value}%)
        grayscale(${grayscaleInput.value}%)
        blur(${blurInput.value}px)
        sepia(${sepiaInput.value}%)
        invert(${invertInput.value}%)
    `;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Listen for Filter Changes
[brightnessInput, contrastInput, grayscaleInput, blurInput, sepiaInput, invertInput]
    .forEach(input => input.addEventListener('input', applyFilters));

// Download Edited Image
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png'); // Ensures the edited image is saved
    link.click();
});

// Reset Filters
resetButton.addEventListener('click', () => {
    brightnessInput.value = 100;
    contrastInput.value = 100;
    grayscaleInput.value = 0;
    blurInput.value = 0;
    sepiaInput.value = 0;
    invertInput.value = 0;
    applyFilters();
});
