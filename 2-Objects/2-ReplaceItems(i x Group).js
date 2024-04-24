// Función principal del script
function main() {
  var doc = app.activeDocument; // Obtiene el documento activo
  var selection = doc.selection; // Obtiene la selección actual

  // Verifica si hay un elemento individual y un grupo de elementos seleccionados
  if (selection.length == 2 && selection[0].typename != "GroupItem" && selection[1].typename == "GroupItem") {
    var individualElement = selection[0];
    var groupElement = selection[1];

    // Obtiene la posición del primer elemento del grupo
    var groupPosition = groupElement.position;

    // Recorre cada elemento del grupo
    for (var i = 0; i < groupElement.pageItems.length; i++) {
      var currentItem = groupElement.pageItems[i]; // Obtiene el elemento actual del grupo
      var newItem = individualElement.duplicate(); // Duplica el elemento individual
      newItem.position = currentItem.position; // Establece la posición del nuevo elemento
      newItem.width = individualElement.width; // Ajusta el ancho del nuevo elemento
      newItem.height = individualElement.height; // Ajusta la altura del nuevo elemento
    }

    // Elimina el grupo original
    groupElement.remove();
  } else {
    alert("Por favor, selecciona un elemento individual y un grupo de elementos idénticos.");
  }
}

// Llama a la función principal
main();
