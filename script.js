document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const greeting = document.getElementById('greeting');
    const changeTextBtn = document.getElementById('changeTextBtn');
    const resetBtn = document.getElementById('resetBtn');
    const sizeSlider = document.getElementById('size-slider');
    const sizeValue = document.getElementById('size-value');
    const redSlider = document.getElementById('red-slider');
    const greenSlider = document.getElementById('green-slider');
    const blueSlider = document.getElementById('blue-slider');
    const colorPicker = document.getElementById('color-picker');

    const originalState = {
        text: greeting.textContent,
        color: '#333333',
        size: '48px'
    };

    let alternateText = "It's Interactive!";

    // --- Functions ---

    function updateColor() {
        const r = redSlider.value;
        const g = greenSlider.value;
        const b = blueSlider.value;
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        greeting.style.color = rgbColor;

        // Update color picker to match sliders
        const hexColor = rgbToHex(parseInt(r), parseInt(g), parseInt(b));
        if (colorPicker.value !== hexColor) {
            colorPicker.value = hexColor;
        }
    }

    function updateSize() {
        const newSize = `${sizeSlider.value}px`;
        greeting.style.fontSize = newSize;
        sizeValue.textContent = newSize;
    }

    // --- Event Listeners ---

    changeTextBtn.addEventListener('click', () => {
        const currentText = greeting.textContent;
        greeting.textContent = currentText === originalState.text ? alternateText : originalState.text;
    });

    sizeSlider.addEventListener('input', updateSize);
    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    colorPicker.addEventListener('input', () => {
        const hex = colorPicker.value;
        greeting.style.color = hex;

        // Update sliders to match color picker
        const { r, g, b } = hexToRgb(hex);
        redSlider.value = r;
        greenSlider.value = g;
        blueSlider.value = b;
    });

    resetBtn.addEventListener('click', () => {
        greeting.textContent = originalState.text;
        greeting.style.color = originalState.color;
        greeting.style.fontSize = originalState.size;
        
        sizeSlider.value = 48;
        sizeValue.textContent = '48px';

        const { r, g, b } = hexToRgb(originalState.color);
        redSlider.value = r;
        greenSlider.value = g;
        blueSlider.value = b;
        colorPicker.value = originalState.color;
    });


    // --- Utility Functions ---
    
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toLowerCase();
    }

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
});
