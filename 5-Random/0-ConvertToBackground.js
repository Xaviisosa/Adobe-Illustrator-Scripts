// Verificar si hay un documento abierto
if (app.documents.length > 0) {
    var doc = app.activeDocument;
    
    // Verificar si al menos un objeto está seleccionado
    if (doc.selection.length > 0) {
        // Iterar sobre los elementos seleccionados
        for (var i = 0; i < doc.selection.length; i++) {
            var selectedObject = doc.selection[i];
            
            // Obtener el ancho y alto actual del objeto
            var currentWidth = selectedObject.width;
            var currentHeight = selectedObject.height;
            
            // Obtener el artboard activo
            var activeArtboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
            
            // Ajustar el tamaño del objeto al tamaño del artboard
            selectedObject.width = activeArtboard.artboardRect[2] - activeArtboard.artboardRect[0];
            selectedObject.height = activeArtboard.artboardRect[1] - activeArtboard.artboardRect[3];
            
            // Calcular el centro del objeto
            var objectCenterX = selectedObject.position[0] + selectedObject.width / 2;
            var objectCenterY = selectedObject.position[1] - selectedObject.height / 2;
            
            // Calcular el centro del artboard
            var artboardCenterX = (activeArtboard.artboardRect[0] + activeArtboard.artboardRect[2]) / 2;
            var artboardCenterY = (activeArtboard.artboardRect[1] + activeArtboard.artboardRect[3]) / 2;
            
            // Calcular la diferencia entre el centro del artboard y el centro del objeto
            var deltaX = artboardCenterX - objectCenterX;
            var deltaY = artboardCenterY - objectCenterY;
            
            // Mover el objeto al centro del artboard
            selectedObject.position = [selectedObject.position[0] + deltaX, selectedObject.position[1] + deltaY];
            
            // Mover el objeto a la capa más baja
            selectedObject.zOrder(ZOrderMethod.SENDTOBACK);
        }
    } else {
        alert("Por favor, selecciona al menos un objeto.");
    }
} else {
    alert("No hay ningún documento abierto en Illustrator.");
}
