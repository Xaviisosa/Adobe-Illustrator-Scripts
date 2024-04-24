// Verifica si hay un documento abierto y al menos una selección
(function () {
    try {
        var activeDoc = app.activeDocument;
        if (activeDoc && activeDoc.selection.length > 0) {
            // Obtiene la selección actual
            var selection = activeDoc.selection;

            // Verifica si hay solo un cuadro de texto seleccionado
            if (selection.length === 1 && isTextFrame(selection[0])) {
                // Ejecuta el script para contar caracteres y palabras
                countCharactersAndWords(selection[0]);
            } else {
                // Muestra un mensaje de advertencia si la selección no es válida
                alert("Debes seleccionar solo un cuadro de texto.");
            }
        } else {
            alert("Debes seleccionar un cuadro de texto.");
        }
    } catch (e) {
        alert("Error: " + e.message);
    }
})();

// Función para verificar si el cuadro de texto es AreaText o PointText
function isTextFrame(textFrame) {
    return textFrame.typename === 'TextFrame' && (textFrame.kind === TextType.AREATEXT || textFrame.kind === TextType.POINTTEXT);
}

// Función para contar caracteres y palabras en la parte visible del texto
function countCharactersAndWords(textFrame) {
    // Verifica si el cuadro de texto es AreaText
    if (textFrame.kind === TextType.AREATEXT) {
        countAreaText(textFrame);
    }
    // Verifica si el cuadro de texto es PointText
    else if (textFrame.kind === TextType.POINTTEXT) {
        countPointText(textFrame);
    }
}

// Función para contar caracteres y palabras en un AreaText
function countAreaText(textFrame) {
    // Obtiene el texto visible dentro del cuadro
    var visibleText = getVisibleText(textFrame);

    // Cuenta el número de caracteres (incluyendo espacios) en la parte visible
    var charCount = visibleText.length;

    // Divide el texto en palabras y cuenta su longitud en la parte visible
    var words = visibleText.match(/\S+/g);
    var wordCount = words ? words.length : 0;

    // Cuenta el número de caracteres (exclyendo espacios) en la parte visible
    var charWithSpaceCount = visibleText.replace(/\s/g, '').length;

    // Obtiene la cantidad de líneas para el texto de área
    var lines = textFrame.lines.length;

    // Muestra una ventana de diálogo con los resultados
    showResultsDialog(charCount, wordCount, charWithSpaceCount,lines);
}

// Función para contar caracteres y palabras en un PointText
function countPointText(textFrame) {
    // Obtiene el texto dentro del cuadro
    var text = textFrame.contents;

    // Cuenta el número de caracteres (incluyendo espacios)
    var charCount = text.length;

    // Divide el texto en palabras y cuenta su longitud
    var words = text.match(/\S+/g);
    var wordCount = words ? words.length : 0;

    // Cuenta el número de caracteres (exclyendo espacios)
    var charWithSpaceCount = text.replace(/\s/g, '').length;

    // Cuenta el número de saltos de línea en el texto
    var lineBreaks = text.match(/(\r\n|\r|\n)/g);
    var lines = lineBreaks ? lineBreaks.length + 1 : 1; // Agrega 1 porque siempre hay al menos una línea

    // Muestra una ventana de diálogo con los resultados
    showResultsDialog(charCount, wordCount, charWithSpaceCount, lines);
}

// Función para obtener el texto visible dentro del cuadro de texto de área
function getVisibleText(textFrame) {
    var visibleText = '';
    for (var i = 0; i < textFrame.textRange.lines.length; i++) {
        visibleText += textFrame.textRange.lines[i].contents;
    }
    return visibleText;
}

// Función para mostrar la ventana de resultados con apariencia oscura
function showResultsDialog(charCount, wordCount, charWithSpaceCount, lines) {
    // Crea una nueva ventana de diálogo
    var darkAppearanceDialog = new Window("dialog", "Carácteres y palabras");

    // Establece la apariencia oscura del fondo
    darkAppearanceDialog.graphics.backgroundColor = darkAppearanceDialog.graphics.newBrush(darkAppearanceDialog.graphics.BrushType.SOLID_COLOR, [0.2, 0.2, 0.2]); // Color oscuro de fondo

    // Añade etiquetas de texto con resultados
    darkAppearanceDialog.add("statictext", [0, 0, 200, 20], "N° de carácteres: " + charCount);
    darkAppearanceDialog.add("statictext", [0, 20, 200, 40], "N° de palabras: " + wordCount);
    darkAppearanceDialog.add("statictext", [0, 40, 200, 60], "N° de carácteres sin espacios: " + charWithSpaceCount);
    darkAppearanceDialog.add("statictext", [0, 40, 200, 60], "N° de lineas: " + lines);

    // Añade un botón de cierre
    var closeButton = darkAppearanceDialog.add("button", undefined, "Cerrar");
    closeButton.onClick = function () {
        darkAppearanceDialog.close();
    };

    // Muestra la ventana
    darkAppearanceDialog.show();
}