#target illustrator

// Función principal
function main() {
    var doc = app.activeDocument;
    var selection = doc.selection;

    // Verificar si hay al menos un objeto seleccionado y al menos un texto
    if (selection.length < 2) {
        alert("Selecciona al menos un objeto y un texto.");
        return;
    }

    var textItems = [];
    var otherItems = [];

    // Separar los elementos seleccionados en textos y otros objetos
    for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (item.typename === "TextFrame") {
            textItems.push(item);
        } else {
            otherItems.push(item);
        }
    }

    // Si no hay textos seleccionados
    if (textItems.length === 0) {
        alert("Selecciona al menos un objeto de texto.");
        return;
    }

    var newSize = parseFloat(prompt("Introduce el nuevo tamaño de texto en puntos:", "20"));
    if (isNaN(newSize)) {
        alert("Por favor, introduce un número válido para el tamaño de texto.");
        return;
    }

    // Calcular el factor de escala basado en el cambio de tamaño del texto
    var scaleFactor = newSize / textItems[0].textRange.characterAttributes.size;

    // Aplicar el cambio de tamaño a los textos
    for (var j = 0; j < textItems.length; j++) {
        var textItem = textItems[j];
        textItem.textRange.characterAttributes.size *= scaleFactor;
    }

    // Aplicar el cambio de tamaño a los otros objetos
    for (var k = 0; k < otherItems.length; k++) {
        var otherItem = otherItems[k];
        otherItem.resize(scaleFactor * 100, scaleFactor * 100);
    }
}

// Ejecutar la función principal
main();
