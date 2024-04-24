// Crear una ventana de diálogo
var dialog = new Window("dialog", "Controlador de Tamaño de Texto");

// Agregar un grupo para el tamaño actual
var currentSizeGroup = dialog.add("group");
currentSizeGroup.add("statictext", undefined, "Tamaño actual:");

var currentSizeText = currentSizeGroup.add("edittext", undefined, "", {readonly: true});
currentSizeText.characters = 6;

// Función para obtener y mostrar el tamaño del texto seleccionado
function getCurrentTextSize() {
    var selection = app.activeDocument.selection;
    if (selection.length > 0 && selection[0].typename == "TextFrame") {
        var text = selection[0].textRange;
        var currentSize = text.size;
        currentSizeText.text = currentSize + "pt";
    } else {
        currentSizeText.text = currentSize;
    }
}

// Función para cambiar el tamaño del texto
function changeTextSize(increase) {
    var selection = app.activeDocument.selection;
    if (selection.length > 0 && selection[0].typename == "TextFrame") {
        var text = selection[0].textRange;
        var currentSize = parseFloat(currentSizeText.text);
        var newSize;

        if (increase) {
            newSize = Math.ceil(currentSize / 8) * 8 + 8;
        } else {
            newSize = Math.floor(currentSize / 8) * 8 - 8;
        }
        currentSizeText.text = newSize + "pt";
    } else {
        alert("Selecciona al menos un texto.");
    }
}

// Agregar un grupo para los controles
var controlsGroup = dialog.add("group");

// Agregar un botón de aumento
var increaseButton = controlsGroup.add("button", undefined, "+");
increaseButton.onClick = function() {
    changeTextSize(true);
};

// Agregar un botón de disminución
var decreaseButton = controlsGroup.add("button", undefined, "-");
decreaseButton.onClick = function() {
    changeTextSize(false);
};

// Agregar un botón OK para aplicar los cambios
var okButton = dialog.add("button", undefined, "OK");
okButton.onClick = function() {
    var selection = app.activeDocument.selection;
    if (selection.length > 0 && selection[0].typename == "TextFrame") {
        var text = selection[0].textRange;
        var newSize = parseFloat(currentSizeText.text);
        text.size = newSize;
        dialog.close();
    } else {
        alert("Selecciona al menos un texto.");
    }
};

// Actualizar el tamaño actual al ejecutar el script
getCurrentTextSize();

// Mostrar la ventana de diálogo
dialog.show();
