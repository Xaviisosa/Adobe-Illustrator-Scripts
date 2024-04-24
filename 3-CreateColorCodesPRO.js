// Obtener el documento activo
var doc = app.activeDocument;

// Obtener las muestras de color seleccionadas
var swatches = doc.swatches.getSelected();

// Definir los parámetros
var cols = 4; // número de columnas en el grupo
var displayAs = "RGBColor"; // o "CMYKColor"
var printColors = ["HEX", "CMYK"]; // Solo HEX y CMYK
var colorSeparator = " "; // Carácter utilizado para separar los colores
var splitColorComponents = false;
var textSize = 10; // valor de tamaño de texto de salida en puntos
var w = 150;
var h = 120;
var h_pad = 10;
var v_pad = 10;
var t_h_pad = 10;
var t_v_pad = 10;
var x = null;
var y = null;
var black = new GrayColor();
var white = new GrayColor();
black.gray = 100;
white.gray = 0;
doc.layers[0].locked = false;

function getColorValues(c, spot) {
    if (c.typename) {
        switch (c.typename) {
            case "RGBColor":
                var rgbValues = [c.red, c.green, c.blue];
                var rgbString = "RGB: " + rgbValues.join(" ");
                var cmykValues = rgbToCMYK(c.red, c.green, c.blue);
                var cmykString = "CMYK: " + cmykValues.join(" ");
                var hexString = "HEX: #" + rgbToHex(c.red, c.green, c.blue);
                return rgbString + "\r" + cmykString + "\r" + hexString;
            case "CMYKColor":
                var cmykValues = [c.cyan, c.magenta, c.yellow, c.black];
                var cmykString = "CMYK: " + cmykValues.join(" ");
                var rgbValues = cmykToRGB(c.cyan, c.magenta, c.yellow, c.black);
                var rgbString = "RGB: " + rgbValues.join(" ");
                var hexString = "HEX: #" + rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
                return cmykString + "\r" + rgbString + "\r" + hexString;
            default:
                return "";
        }
    }
    return "";
}
// Función para convertir un color Pantone a RGB
function spotColorToRGB(pantoneSpot) {
    // Implementa aquí la conversión de Pantone a RGB
    // Esto puede variar dependiendo de tus necesidades y recursos disponibles
    // Puedes usar una tabla de equivalencia de colores Pantone a RGB o algún otro método de conversión
    // Este es solo un ejemplo de cómo podrías hacerlo
    // Ten en cuenta que la conversión de Pantone a RGB puede ser compleja y la precisión puede variar
    
    // En este ejemplo, simplemente devolvemos un valor de RGB fijo
    return new RGBColor(255, 0, 0); // Ejemplo: rojo puro (este sería un valor aproximado)
}
function rgbToCMYK(r, g, b) {
    var c = 1 - (r / 255);
    var m = 1 - (g / 255);
    var y = 1 - (b / 255);
    var k = Math.min(c, Math.min(m, y));
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

function cmykToRGB(c, m, y, k) {
    var r = 255 * (1 - c / 100) * (1 - k / 100);
    var g = 255 * (1 - m / 100) * (1 - k / 100);
    var b = 255 * (1 - y / 100) * (1 - k / 100);
    return [Math.round(r), Math.round(g), Math.round(b)];
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function is_dark(c) {
    if (c.typename) {
        switch (c.typename) {
            case "CMYKColor":
                return (c.black > 50 || (c.cyan > 50 && c.magenta > 50)) ? true : false;
            case "RGBColor":
                return (c.red < 100 && c.green < 100) ? true : false;
            case "GrayColor":
                return c.gray > 50 ? true : false;
            case "SpotColor":
                return is_dark(c.spot.color);
            default:
                return false;
        }
    }
}

// Función para crear los rectángulos y textos
function createRectangles() {
    cols = parseInt(colsInput.text); // Obtener el número de columnas ingresado
    
    // Crear los rectángulos y textos
for (var c = 0, len = swatches.length; c < len; c++) {
    x = 25 + (w + h_pad) * ((c) % cols);
    y = (h + v_pad) * (Math.floor(c / cols)) * -1 - 25;
    var rectRef = doc.pathItems.rectangle(y, x, w, h);
    var swatchColor = swatches[c].color;
    rectRef.fillColor = swatchColor;

    var textRectRef = doc.pathItems.rectangle(y - t_v_pad, x + t_h_pad, w - (2 * t_h_pad), h - (2 * t_v_pad));
    var textRef = doc.textFrames.areaText(textRectRef);

    textRef.contents = getColorValues(swatchColor);
    textRef.textRange.fillColor = is_dark(swatchColor) ? white : black;
    textRef.textRange.size = textSize;

    // Especificar la fuente y el estilo de texto
    var newTextRange = textRef.textRange;
    newTextRange.characterAttributes.textFont = app.textFonts.getByName("Calibri");
    newTextRange.characterAttributes.size = textSize;

    // Verificar si el color es Pantone
    if (swatchColor.typename === "SpotColor") {
        var pantoneRGB = spotColorToRGB(swatchColor.spot);
        textRef.contents = swatchColor.spot.name + "";
    } else {
        textRef.contents = getColorValues(swatchColor);
    }
    // Agrupar rectángulo y texto
    var groupItems = doc.groupItems.add();
    groupItems.name = "Grupo " + (c + 1); // Nombre opcional para el grupo
    rectRef.move(groupItems, ElementPlacement.INSIDE);
    textRef.move(groupItems, ElementPlacement.PLACEATBEGINNING);

    dialog.close();
}
}

// Configurar parámetros iniciales
var cols = 4; // número de columnas en el grupo
var displayAs = "RGBColor"; // o "CMYKColor"
var printColors = ["HEX", "CMYK"]; // Solo HEX y CMYK
var colorSeparator = " "; // Carácter utilizado para separar los colores
var splitColorComponents = false;
var textSize = 10; // valor de tamaño de texto de salida en puntos
var w = 130;
var h = 100;
var h_pad = 10;
var v_pad = 10;
var t_h_pad = 10;
var t_v_pad = 10;
var x = null;
var y = null;
var black = new GrayColor();
var white = new GrayColor();
black.gray = 100;
white.gray = 0;
doc.layers[0].locked = false;

// Crear una ventana de diálogo para ingresar el número de columnas
var dialog = new Window("dialog", "Número de Columnas");
dialog.add("statictext", undefined, "Número de columnas:");
var colsInput = dialog.add("edittext", undefined, cols);
colsInput.characters = 2; // Limitar el número de caracteres para que quepa el valor
colsInput.active = true; // Hacer que el cuadro de texto esté activo por defecto
var buttonGroup = dialog.add("group");
var okButton = buttonGroup.add("button", undefined, "OK");
var cancelButton = buttonGroup.add("button", undefined, "Cancelar");

// Configurar acciones para los botones
okButton.onClick = createRectangles;
cancelButton.onClick = function() {
    dialog.close();
}

// Mostrar la ventana de diálogo
dialog.show();
