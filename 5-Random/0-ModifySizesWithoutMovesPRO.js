// Obtener la ventana activa
var activeDocument = app.activeDocument;

// Verificar si hay al menos un elemento seleccionado
if (activeDocument.selection.length > 0) {
    // Crear una ventana de diálogo
    var dialog = new Window("dialog", "Cambiar Tamaños");
    // Agregar un panel para dimensiones
    var dimensionsPanel = dialog.add("panel", undefined, "Dimensiones");
    dimensionsPanel.alignChildren = "left";

    // Añadir campos de texto para ancho y alto
    var widthGroup = dimensionsPanel.add("group");
    widthGroup.add("statictext", undefined, "Ancho:");
    var widthInput = widthGroup.add("edittext", undefined, activeDocument.selection[0].width.toFixed(2));
    widthInput.characters = 7;

    var heightGroup = dimensionsPanel.add("group");
    heightGroup.add("statictext", undefined, "Altura:");
    var heightInput = heightGroup.add("edittext", undefined, activeDocument.selection[0].height.toFixed(2));
    heightInput.characters = 7;

    // Crear un grupo para los radio botones de proporciones
    var proportionsGroup = dialog.add("group");
    proportionsGroup.orientation = "column";
    proportionsGroup.alignChildren = "Center"; // Alinea los radio botones a la izquierda
    proportionsGroup.add("statictext", undefined, "Proporciones:");

    var noProportionsRadioButton = proportionsGroup.add("radiobutton", undefined, "Modificar libre");
    var widthRadioButton = proportionsGroup.add("radiobutton", undefined, "Ajustar a Ancho");
    var heightRadioButton = proportionsGroup.add("radiobutton", undefined, "Ajustar a Alto");

    // Activar el radio button "Modificar libre" por defecto
    noProportionsRadioButton.value = true;

    // Crear grupos para organizar los botones de radio en columnas
    var anchorGroup = dialog.add("group");
    anchorGroup.orientation = "column";
    anchorGroup.add("statictext", undefined, "Punto de Anclaje:");

    var column1Group = anchorGroup.add("group");
    var column2Group = anchorGroup.add("group");
    var column3Group = anchorGroup.add("group");

    // Función para desactivar los radio buttons de anclaje
    function disableAnchorRadioButtons() {
        anchorLeftTopRadioButton.value = false;
        anchorCenterTopRadioButton.value = false;
        anchorRightTopRadioButton.value = false;
        anchorLeftRadioButton.value = false;
        anchorCenterRadioButton.value = false;
        anchorRightRadioButton.value = false;
        anchorLeftBottomRadioButton.value = false;
        anchorCenterBottomRadioButton.value = false;
        anchorRightBottomRadioButton.value = false;
    }

    // Añadir botones de radio a cada grupo y establecer sus eventos
    function addAnchorRadioButton(group, label, onClickCallback) {
        var radioButton = group.add("radiobutton", undefined, label);
        radioButton.onClick = onClickCallback;
        return radioButton;
    }

    var anchorLeftTopRadioButton = addAnchorRadioButton(column1Group, undefined, function() {
        disableAnchorRadioButtons();
        anchorLeftTopRadioButton.value = true;
    });

    var anchorCenterTopRadioButton = addAnchorRadioButton(column1Group, undefined, function() {
        disableAnchorRadioButtons();
        anchorCenterTopRadioButton.value = true;
    });

    var anchorRightTopRadioButton = addAnchorRadioButton(column1Group, undefined, function() {
        disableAnchorRadioButtons();
        anchorRightTopRadioButton.value = true;
    });

    var anchorLeftRadioButton = addAnchorRadioButton(column2Group, undefined , function() {
        disableAnchorRadioButtons();
        anchorLeftRadioButton.value = true;
    });

    var anchorCenterRadioButton = addAnchorRadioButton(column2Group, undefined, function() {
        disableAnchorRadioButtons();
        anchorCenterRadioButton.value = true;
    });

    var anchorRightRadioButton = addAnchorRadioButton(column2Group, undefined, function() {
        disableAnchorRadioButtons();
        anchorRightRadioButton.value = true;
    });

    var anchorLeftBottomRadioButton = addAnchorRadioButton(column3Group, undefined, function() {
        disableAnchorRadioButtons();
        anchorLeftBottomRadioButton.value = true;
    });

    var anchorCenterBottomRadioButton = addAnchorRadioButton(column3Group, undefined, function() {
        disableAnchorRadioButtons();
        anchorCenterBottomRadioButton.value = true;
    });

    var anchorRightBottomRadioButton = addAnchorRadioButton(column3Group, undefined, function() {
        disableAnchorRadioButtons();
        anchorRightBottomRadioButton.value = true;
    });

    // Activar el radio button "Centro" por defecto
    anchorCenterRadioButton.value = true;

    // Función para habilitar/deshabilitar los cuadros de texto según el radio button seleccionado
    function toggleDimensionsInput() {
        if (widthRadioButton.value) {
            widthInput.enabled = true;
            heightInput.enabled = false;
        } else if (heightRadioButton.value) {
            widthInput.enabled = false;
            heightInput.enabled = true;
        } else {
            widthInput.enabled = true;
            heightInput.enabled = true;
        }
    }

    // Eventos para los radio buttons de proporciones
    noProportionsRadioButton.onClick = toggleDimensionsInput;
    widthRadioButton.onClick = toggleDimensionsInput;
    heightRadioButton.onClick = toggleDimensionsInput;

    // Añadir botones OK y Cancelar
    var buttonsGroup = dialog.add("group");
    var okButton = buttonsGroup.add("button", undefined, "OK");
    var cancelButton = buttonsGroup.add("button", undefined, "Cancelar");

    // Definir acciones al hacer clic en OK o Cancelar
    okButton.onClick = function () {
        cambiarTamanoElementos();
        dialog.close();
    };

    cancelButton.onClick = function () {
        dialog.close();
    };

    // Mostrar la ventana
    dialog.show();
} else {
    alert("Debes seleccionar al menos un elemento para que esto funcione");
}

// Función para cambiar el tamaño de los elementos seleccionados
function cambiarTamanoElementos() {
    // Iterar sobre los elementos seleccionados
    for (var i = 0; i < activeDocument.selection.length; i++) {
        var elemento = activeDocument.selection[i];

        // Obtener las dimensiones originales del elemento
        var anchoOriginal = elemento.width;
        var altoOriginal = elemento.height;

        // Obtener los nuevos tamaños ingresados en la ventana de diálogo
        var nuevoAncho = parseFloat(widthInput.text);
        var nuevoAlto = parseFloat(heightInput.text);

        // Verificar si se seleccionó mantener proporciones
        if (widthRadioButton.value) {
            // Mantener proporciones con respecto al ancho
            nuevoAlto = (nuevoAncho / anchoOriginal) * altoOriginal;
        } else if (heightRadioButton.value) {
            // Mantener proporciones con respecto al alto
            nuevoAncho = (nuevoAlto / altoOriginal) * anchoOriginal;
        }

        // Calcular el desplazamiento del punto de anclaje
        var anchorOffsetX = 0;
        var anchorOffsetY = 0;

        // Verificar el estado de los botones de radio para los puntos de anclaje
        if (anchorLeftTopRadioButton.value) {
            // Izq Sup
            anchorOffsetX = (nuevoAncho - anchoOriginal) / -2;
            anchorOffsetY = (nuevoAlto - altoOriginal) / 2;
        } else if (anchorCenterTopRadioButton.value) {
            // Cen Sup
            anchorOffsetX = 0;
            anchorOffsetY = (nuevoAlto - altoOriginal) / 2;
        } else if (anchorRightTopRadioButton.value) {
            // Der Sup
            anchorOffsetX = (nuevoAncho - anchoOriginal) / 2;
            anchorOffsetY = (nuevoAlto - altoOriginal) / 2;
        } else if (anchorLeftRadioButton.value) {
            // Izq
            anchorOffsetX = (nuevoAncho - anchoOriginal) / -2;
            anchorOffsetY = 0;
        } else if (anchorCenterRadioButton.value) {
            // Cen
            anchorOffsetX = 0;
            anchorOffsetY = 0;
        } else if (anchorRightRadioButton.value) {
            // Der
            anchorOffsetX = (nuevoAncho - anchoOriginal) / 2;
            anchorOffsetY = 0;
        } else if (anchorLeftBottomRadioButton.value) {
            // Izq Inf
            anchorOffsetX = (nuevoAncho - anchoOriginal) / -2;
            anchorOffsetY = (nuevoAlto - altoOriginal) / -2;
        } else if (anchorCenterBottomRadioButton.value) {
            // Cen Inf
            anchorOffsetX = 0;
            anchorOffsetY = (nuevoAlto - altoOriginal) / -2;
        } else if (anchorRightBottomRadioButton.value) {
            // Der Inf
            anchorOffsetX = (nuevoAncho - anchoOriginal) / 2;
            anchorOffsetY = (nuevoAlto - altoOriginal) / -2;
        }

        // Cambiar el tamaño del elemento
        elemento.resize(nuevoAncho / anchoOriginal * 100, nuevoAlto / altoOriginal * 100);

        // Ajustar la posición del elemento según el anclaje
        elemento.position = [elemento.position[0] - anchorOffsetX, elemento.position[1] - anchorOffsetY];
    }
}
