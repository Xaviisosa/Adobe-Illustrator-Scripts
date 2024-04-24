// Verificar si hay al menos dos elementos seleccionados
if (app.activeDocument.selection.length >= 2) {
  // Obtener la selección
  var seleccion = app.activeDocument.selection;

  // Crear un cuadro de diálogo para que el usuario elija el tipo de alineación
  var dialog = new Window("dialog", "Seleccionar punto de anclaje");
  dialog.orientation = "column";

  // Añadir botones seleccionables para seleccionar el punto de anclaje del elemento inferior

  var buttonSize = 35; // Tamaño de los botones cuadrados
  var buttonGroup1 = dialog.add("group");
  buttonGroup1.orientation = "row";
  var buttonGroup2 = dialog.add("group");
  buttonGroup2.orientation = "row";
  var buttonGroup3 = dialog.add("group");
  buttonGroup3.orientation = "row";

  var izquierdaSuperiorBtn = buttonGroup1.add("button", undefined, "↖");
  izquierdaSuperiorBtn.size = [buttonSize, buttonSize];
  izquierdaSuperiorBtn.preferredSize = [buttonSize, buttonSize];
  var centroSuperiorBtn = buttonGroup1.add("button", undefined, "↑");
  centroSuperiorBtn.size = [buttonSize, buttonSize];
  centroSuperiorBtn.preferredSize = [buttonSize, buttonSize];
  var derechaSuperiorBtn = buttonGroup1.add("button", undefined, "↗");
  derechaSuperiorBtn.size = [buttonSize, buttonSize];
  derechaSuperiorBtn.preferredSize = [buttonSize, buttonSize];

  var izquierdaBtn = buttonGroup2.add("button", undefined, "←");
  izquierdaBtn.size = [buttonSize, buttonSize];
  izquierdaBtn.preferredSize = [buttonSize, buttonSize];
  var centroBtn = buttonGroup2.add("button", undefined, "⌾");
  centroBtn.size = [buttonSize, buttonSize];
  centroBtn.preferredSize = [buttonSize, buttonSize];
  var derechaBtn = buttonGroup2.add("button", undefined, "→");
  derechaBtn.size = [buttonSize, buttonSize];
  derechaBtn.preferredSize = [buttonSize, buttonSize];

  var izquierdaInferiorBtn = buttonGroup3.add("button", undefined, "↙");
  izquierdaInferiorBtn.size = [buttonSize, buttonSize];
  izquierdaInferiorBtn.preferredSize = [buttonSize, buttonSize];
  var centroInferiorBtn = buttonGroup3.add("button", undefined, "↓");
  centroInferiorBtn.size = [buttonSize, buttonSize];
  centroInferiorBtn.preferredSize = [buttonSize, buttonSize];
  var derechaInferiorBtn = buttonGroup3.add("button", undefined, "↘");
  derechaInferiorBtn.size = [buttonSize, buttonSize];
  derechaInferiorBtn.preferredSize = [buttonSize, buttonSize];

  // Añadir radiobuttons para seleccionar si los movimientos se harán con respecto al objeto inferior o al objeto superior
  var alignmentGroup = dialog.add("group");
  alignmentGroup.orientation = "column";
  var superiorRadio = alignmentGroup.add("radiobutton", undefined, "Objeto inferior fijo");
  var inferiorRadio = alignmentGroup.add("radiobutton", undefined, "Objeto superior fijo");
  superiorRadio.value = true; // Por defecto, seleccionar "Mantener objeto inferior fijo"

  // Definir las funciones para los radiobuttons
  inferiorRadio.onClick = function() {
      superiorRadio.value = false;
  };
  superiorRadio.onClick = function() {
      inferiorRadio.value = false;
  };

  // Función para verificar si se seleccionó al menos un radiobutton
  function verificarRadioButtonSeleccionado() {
      if (!inferiorRadio.value && !superiorRadio.value) {
          alert("Debes seleccionar que objeto mantener fijo.");
          return false;
      }
      return true;
  }

  // Definir la función para los botones seleccionables
  izquierdaSuperiorBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(0);
      }
  };
  centroSuperiorBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(1);
      }
  };
  derechaSuperiorBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(2);
      }
  };
  izquierdaBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(3);
      }
  };
  centroBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(4);
      }
  };
  derechaBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(5);
      }
  };
  izquierdaInferiorBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(6);
      }
  };
  centroInferiorBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(7);
      }
  };
  derechaInferiorBtn.onClick = function() {
      if (verificarRadioButtonSeleccionado()) {
          alinearElementos(8);
      }
  };

// Función para alinear los elementos
function alinearElementos(anchorIndex) {
  // Obtener el elemento fijo (inferior o superior)
  var elementoFijo = inferiorRadio.value ? seleccion[0] : seleccion[seleccion.length - 1];
  var boundsFijo = elementoFijo.geometricBounds;

  // Recorrer los elementos seleccionados y alinearlos según la opción seleccionada
  for (var i = 0; i < seleccion.length; i++) {
      var elemento = seleccion[i];
      if (elemento !== elementoFijo) { // Evitar mover el elemento fijo
          var bounds = elemento.geometricBounds;
          var anchoBoundFijo = boundsFijo[2] - boundsFijo[0];
          var altoBoundFijo = boundsFijo[1] - boundsFijo[3];
          var anchoBound = bounds[2] - bounds[0];
          var altoBound = bounds[1] - bounds[3];

          // Calcular el desplazamiento según la opción seleccionada
          var deltaX = 0;
          var deltaY = 0;

          switch (anchorIndex) {
              case 0: // IZQUIERDA SUPERIOR
                  deltaX = boundsFijo[0] - (bounds[0] + anchoBound);
                  deltaY = boundsFijo[1] - (bounds[1] - altoBound);
                  break;
              case 1: // CENTRO SUPERIOR
                  deltaX = (boundsFijo[0] + boundsFijo[2]) / 2 - (bounds[0] + bounds[2]) / 2;
                  deltaY = boundsFijo[1] - bounds[3];
                  break;
              case 2: // DERECHA SUPERIOR
                  deltaX = (boundsFijo[0] - bounds[0]) + anchoBoundFijo;
                  deltaY = boundsFijo[1] - bounds[3];
                  break;
              case 3: // IZQUIERDA
                  deltaX = boundsFijo[0] - (bounds[0] + anchoBound);
                  deltaY = (boundsFijo[1] + boundsFijo[3]) / 2 - (bounds[1] + bounds[3]) / 2;
                  break;
              case 4: // CENTRO
                  deltaX = (boundsFijo[0] + boundsFijo[2]) / 2 - (bounds[0] + bounds[2]) / 2;
                  deltaY = (boundsFijo[1] + boundsFijo[3]) / 2 - (bounds[1] + bounds[3]) / 2;
                  break;
              case 5: // DERECHA
                  deltaX = (boundsFijo[0] - bounds[0]) + anchoBoundFijo;
                  deltaY = (boundsFijo[1] + boundsFijo[3]) / 2 - (bounds[1] + bounds[3]) / 2;
                  break;
              case 6: // IZQUIERDA INFERIOR
                  deltaX = boundsFijo[0] - (bounds[0] + anchoBound);
                  deltaY = boundsFijo[3] - bounds[1];
                  break;
              case 7: // CENTRO INFERIOR
                  deltaX = (boundsFijo[0] + boundsFijo[2]) / 2 - (bounds[0] + bounds[2]) / 2;
                  deltaY = boundsFijo[3] - bounds[1];
                  break;
              case 8: // DERECHA INFERIOR
                  deltaX = (boundsFijo[0] - bounds[0]) + anchoBoundFijo;
                  deltaY = boundsFijo[3] - bounds[1];
                  break;
              default:
                  break;
          }

          // Mover el elemento alineado
          elemento.position = [elemento.position[0] + deltaX, elemento.position[1] + deltaY];
      }
  }

  // Cerrar el cuadro de diálogo después de alinear los elementos
  dialog.close();
}

// Mostrar la ventana de diálogo
dialog.show();
} else {
alert("Selecciona al menos dos elementos antes de ejecutar el script.");
}
