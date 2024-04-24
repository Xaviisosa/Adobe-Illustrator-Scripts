//@target illustrator

// Ventana para seleccionar el color
var dlg = new Window("dialog", "Selecciona un color");
dlg.alignChildren = "left";

var radioGroup = dlg.add("group");
radioGroup.orientation = "row";
var rgbRadio = radioGroup.add("radiobutton", undefined, "RGB");
var cmykRadio = radioGroup.add("radiobutton", undefined, "CMYK");
var hexRadio = radioGroup.add("radiobutton", undefined, "HEX"); // Nuevo radiobutton
rgbRadio.value = true; // Establecer RGB como seleccionado por defecto

var sliderGroup = dlg.add('group');
sliderGroup.orientation = 'column';
sliderGroup.alignChildren = ['left', 'top'];
sliderGroup.spacing = 5;

// Función para agregar un slider con etiqueta y campo de texto en la misma línea
function addLabeledSlider(parent, labelText, maxValue) {
    var sliderGroup = parent.add('group');
    sliderGroup.orientation = 'row';
    sliderGroup.spacing = 5; 
    var sliderLabel = sliderGroup.add('statictext', undefined, labelText);
    var slider = sliderGroup.add('slider', undefined, 0, 0, maxValue);
    slider.size = [200, 20]; 
    var sliderValue = sliderGroup.add('edittext', undefined, '0');
    sliderValue.characters = 3; // Establece el ancho del campo de texto
    slider.onChanging = function() {
        sliderValue.text = Math.round(slider.value);
    };
    return { label: sliderLabel, slider: slider, value: sliderValue };
}

var sliders = [
    addLabeledSlider(sliderGroup, 'R:', 255), // RGB
    addLabeledSlider(sliderGroup, 'G:', 255), // RGB
    addLabeledSlider(sliderGroup, 'B:', 255), // RGB
    addLabeledSlider(sliderGroup, 'K:', 100)  // CMYK
];

// Cuadro de texto para el modo HEX
var hexInput = dlg.add('edittext', undefined, '#'); // Inicialmente color negro
hexInput.characters = 7; // Tamaño para el código HEX
hexInput.maximumSize.width = 80; // Limitar el ancho del cuadro de texto para que solo quepan 7 caracteres

// Establecer los sliders para el modo RGB por defecto
updateSliders(false);

// Función para aplicar el color al rectángulo
function applyColor() {
    var doc = app.activeDocument;
    var activeArtboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
    var artboardWidth = activeArtboard.artboardRect[2] - activeArtboard.artboardRect[0];
    var artboardHeight = activeArtboard.artboardRect[1] - activeArtboard.artboardRect[3];
    var currentLayer = doc.activeLayer; // Obtener la capa actual
    var rectangle = currentLayer.pathItems.rectangle(activeArtboard.artboardRect[1], activeArtboard.artboardRect[0], artboardWidth, artboardHeight);
    var color;
    if (rgbRadio.value) {
        color = new RGBColor();
        color.red = parseInt(sliders[0].value.text);
        color.green = parseInt(sliders[1].value.text);
        color.blue = parseInt(sliders[2].value.text);
    } else if (cmykRadio.value) {
        color = new CMYKColor();
        color.cyan = parseInt(sliders[0].value.text);
        color.magenta = parseInt(sliders[1].value.text);
        color.yellow = parseInt(sliders[2].value.text);
        color.black = parseInt(sliders[3].value.text);
    } else if (hexRadio.value) { // Modo HEX
        var hexValue = hexInput.text.replace('#', ''); // Eliminar el '#' si está presente
        color = new RGBColor();
        color.red = parseInt(hexValue.substring(0, 2), 16);
        color.green = parseInt(hexValue.substring(2, 4), 16);
        color.blue = parseInt(hexValue.substring(4, 6), 16);
    }
    rectangle.filled = true;
    rectangle.fillColor = color;
    // Colocar el rectángulo en la parte inferior de los elementos existentes en la capa
    rectangle.zOrder(ZOrderMethod.SENDTOBACK);
}

// Función para cambiar los sliders y mostrar/ocultar el cuadro de texto dependiendo del modo seleccionado
function updateSliders(isCMYK) {
    for (var i = 0; i < sliders.length; i++) {
        sliders[i].label.text = isCMYK ? ['C:', 'M:', 'Y:', 'K:'][i] : ['R:', 'G:', 'B:'][i];
        sliders[i].slider.maxvalue = isCMYK ? 100 : 255;
        sliders[i].slider.value = 0;
        sliders[i].slider.notify("onChange"); // Notificar un cambio para actualizar el valor del campo de texto
        sliders[i].slider.visible = (isCMYK || i < 3); // Mostrar solo los primeros 3 sliders en modo RGB
        sliders[i].label.visible = sliders[i].slider.visible;
        sliders[i].value.visible = sliders[i].slider.visible;
        sliders[i].slider.enabled = !hexRadio.value; // Deshabilitar los sliders si el radiobutton HEX está seleccionado
    }
    hexInput.visible = hexRadio.value; // Mostrar el cuadro de texto solo si está seleccionado el modo HEX
}

var buttonOK = dlg.add('button', undefined, 'OK');
buttonOK.onClick = function() {
    applyColor(); // Aplicar el color al hacer clic en OK
    dlg.close(); // Cerrar la ventana
};

// Evento para actualizar los sliders y mostrar/ocultar el cuadro de texto cuando se cambia el radio button
rgbRadio.onClick = function() {
    updateSliders(false);
};

cmykRadio.onClick = function() {
    updateSliders(true);
};

hexRadio.onClick = function() { // Nuevo evento para el radio button HEX
    updateSliders(false); // Ocultar los sliders
};

// Mostrar la ventana
dlg.show();
