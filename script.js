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
};

// Apply Filters
function applyFilters() {
    let brightness = brightnessInput.value;
    let contrast = contrastInput.value;
    let grayscale = grayscaleInput.value;
    let blur = blurInput.value;
    let sepia = sepiaInput.value;
    let invert = invertInput.value;

    // Apply CSS Filters for smooth transitions
    canvas.style.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        grayscale(${grayscale}%)
        blur(${blur}px)
        sepia(${sepia}%)
        invert(${invert}%)
    `;
}

// Listen for Filter Changes
[brightnessInput, contrastInput, grayscaleInput, blurInput, sepiaInput, invertInput]
    .forEach(input => input.addEventListener('input', applyFilters));

// Download Edited Image
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
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
