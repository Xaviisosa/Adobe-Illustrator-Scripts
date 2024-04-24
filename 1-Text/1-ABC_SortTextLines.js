// Función principal del script
function sortTextLinesAlphabetically() {
  var doc = app.activeDocument; // Obtiene el documento activo
  var selection = doc.selection; // Obtiene la selección actual
  
  // Verifica si hay algún objeto de texto seleccionado
  if (selection.length > 0 && isTextFrame(selection[0])) {
      var textObject = selection[0]; // Obtiene el objeto de texto seleccionado
      
      // Verifica si el objeto de texto es de tipo PointText o AreaText
      if (textObject.kind === TextType.POINTTEXT || textObject.kind === TextType.AREATEXT) {
          // Crea y muestra la ventana de diálogo para elegir el orden de clasificación
          var dialog = new Window("dialog", "Ordenar líneas de texto");
          dialog.orientation = "column";
          dialog.alignChildren = "left";
          
          // Agrega los botones de opción (radiobuttons)
          var group = dialog.add("group");
          var radioAZ = group.add("radiobutton", undefined, "A-Z");
          var radioZA = group.add("radiobutton", undefined, "Z-A");
          radioAZ.value = true; // Establece "A-Z" como opción predeterminada
          
          // Agrega botones para confirmar o cancelar
          var buttonsGroup = dialog.add("group");
          var okButton = buttonsGroup.add("button", undefined, "OK");
          var cancelButton = buttonsGroup.add("button", undefined, "Cancelar");
          
          // Maneja la lógica cuando se hace clic en "OK"
          okButton.onClick = function() {
              dialog.close();
              
              // Ordena las líneas de texto según la opción seleccionada
              if (radioAZ.value) {
                  sortTextLines(textObject, true);
              } else {
                  sortTextLines(textObject, false);
              }
          };
          
          // Maneja la lógica cuando se hace clic en "Cancelar"
          cancelButton.onClick = function() {
              dialog.close();
          };
          
          dialog.show();
      } else {
          // Muestra un mensaje de advertencia si no es un objeto de texto de punto o de área
          alert("Debes seleccionar un texto de punto o de área.");
      }
  } else {
      // Si no hay ningún objeto de texto seleccionado, muestra un mensaje de error
      alert("Por favor, selecciona un objeto de texto para ordenar las líneas alfabéticamente.");
  }
}

// Función para verificar si el cuadro de texto es AreaText o PointText
function isTextFrame(textFrame) {
  return textFrame.typename === 'TextFrame';
}

// Función para ordenar las líneas de texto alfabéticamente
function sortTextLines(textObject, ascending) {
  var textLines = getTextLines(textObject);
  
  // Ordena las líneas alfabéticamente
  textLines.sort(function(a, b) {
      if (ascending) {
          return a.toLowerCase().localeCompare(b.toLowerCase(), 'es', {numeric: true});
      } else {
          return b.toLowerCase().localeCompare(a.toLowerCase(), 'es', {numeric: true});
      }
  });
  
  // Une las líneas ordenadas de nuevo en un solo texto
  var sortedText = textLines.join('\r\n');
  
  // Asigna el texto ordenado al objeto de texto
  textObject.contents = sortedText;
}

// Función para obtener las líneas de texto de un objeto de texto
function getTextLines(textObject) {
  var textLines = [];
  
  // Divide el texto en líneas
  var lines = textObject.lines;
  
  // Recorre cada línea y la agrega al array de líneas
  for (var i = 0; i < lines.length; i++) {
      textLines.push(lines[i].contents);
  }
  
  return textLines;
}

// Llama a la función principal
sortTextLinesAlphabetically();
