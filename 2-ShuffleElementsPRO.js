//@target illustrator

// Función para obtener el punto central de un objeto
function getCenterPoint(item) {
    var bounds;
    var centerX, centerY;

    // Verificar si el objeto es una imagen rasterizada
    if (item.typename === "RasterItem") {
        return null; // Si es una imagen rasterizada, retornar null para ignorarla
    }

    // Si el objeto es un grupo y tiene una máscara de recorte
    if (item.typename === "GroupItem" && item.clipped && item.pageItems.length > 1) {
        var clippingPath = item.pageItems[0]; // La primera página del grupo es la máscara de recorte
        var clipBounds = clippingPath.geometricBounds;
        bounds = [clipBounds[0], clipBounds[1], clipBounds[2], clipBounds[3]];
    } else {
        bounds = item.visibleBounds;
    }

    // Calcular el centro del objeto
    centerX = (bounds[0] + bounds[2]) / 2;
    centerY = (bounds[1] + bounds[3]) / 2;
    
    return [centerX, centerY];
}

// Función para mezclar aleatoriamente los elementos seleccionados
function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
    }
    return items;
}

// Función para intercambiar los centros de los elementos seleccionados
function swapCenterPoints() {
    var selection = app.activeDocument.selection;
    
    if (selection.length < 2 || selection.length > 50) {
        alert("Seleccione entre 2 y 30 elementos para intercambiar sus centros.");
        return;
    }

    // Mezclar aleatoriamente los elementos seleccionados
    shuffle(selection);

    // Array para almacenar los centros de los elementos
    var centers = [];

    // Calcular los centros de los elementos seleccionados y almacenarlos en el array
    for (var i = 0; i < selection.length; i++) {
        var center = getCenterPoint(selection[i]);
        if (center !== null) { // Ignorar imágenes rasterizadas
            centers.push(center);
        }
    }

    // Mover los centros de los elementos
    for (var j = 0; j < centers.length; j++) {
        var currentIndex = j;
        var nextIndex = (j + 1) % centers.length; // Índice del siguiente elemento (ciclo al alcanzar el final)
        
        var diffX = centers[nextIndex][0] - centers[currentIndex][0];
        var diffY = centers[nextIndex][1] - centers[currentIndex][1];

        // Mover el centro del elemento actual al centro del siguiente elemento
        selection[currentIndex].position = [selection[currentIndex].position[0] + diffX, selection[currentIndex].position[1] + diffY];
    }
}

// Ejecutar la función para intercambiar los centros de los elementos seleccionados
swapCenterPoints();
