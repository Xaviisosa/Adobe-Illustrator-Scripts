var aDoc = app.activeDocument;

if (aDoc.selection.length > 0) {
    if (aDoc.selection.length < 2 && aDoc.selection[0].typename == "TextFrame") {
        var aTFrame = aDoc.selection[0];
        var selectedTextSize = aTFrame.textRange.characterAttributes.size;

        // Crear una ventana de diálogo con opciones de escalera
        var dialogWindow = new Window("dialog", "Text Stair");
        dialogWindow.orientation = "column";

       // Primera fila: Tamaño del primer carácter
       var firstRow = dialogWindow.add("group");
       firstRow.orientation = "row";
       firstRow.add("statictext", undefined, "Tamaño del primer carácter:");
       var startSizeInput = firstRow.add("edittext", undefined, Math.round(selectedTextSize).toString());
       startSizeInput.characters = 4; // Tamaño del cuadro de texto en 5 caracteres
        
        // Tercera fila: Tamaño del último carácter
        var thirdRow = dialogWindow.add("group");
        thirdRow.orientation = "row";
        thirdRow.add("statictext", undefined, "Tamaño del último carácter:");
        var endSizeInput = thirdRow.add("edittext", undefined, Math.round(selectedTextSize).toString());
        endSizeInput.characters = 4; // Tamaño del cuadro de texto en 5 caracteres

        // Cuarta fila: Botón OK
        var okButton = dialogWindow.add("button", undefined, "OK");
        okButton.onClick = function () {
            var startSize = parseFloat(startSizeInput.text);
            var endSize = parseFloat(endSizeInput.text);
            
            var theChars = aTFrame.characters;
            var charLength = theChars.length;
            
            // Calcular el paso
            var step = (endSize - startSize) / (charLength - 1);
            
            // Aplicar tamaños de caracteres
            for (var i = 0; i < charLength; i++) {
                theChars[i].size = startSize + i * step;
            }
            
            // Si el cambio del tamaño del carácter central está habilitado, ajustar el valor del carácter central
            if (enableCentralCharSizeChange.value) {
                var centralSize = parseFloat(centralSizeInput.text);
                theChars[Math.floor(charLength / 2)].size = centralSize;
            }
            
            // Redibujar
            redraw();
            
            // Cerrar la ventana de diálogo
            dialogWindow.close();
        };
        
        // Mostrar la ventana de diálogo
        dialogWindow.show();
        
    } else {
        alert("Por favor seleccione solo un marco de texto");
    }
} else {
    alert("No se ha seleccionado ningún texto");
}
