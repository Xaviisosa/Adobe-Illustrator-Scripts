//@target illustrator

// Función para crear la interfaz de usuario
function createUI() {

    // Crear una ventana emergente
    var dialog = new Window("dialog", "Generador de Texto Aleatorio");

    var radioGroup = dialog.add("group");
    radioGroup.orientation = "row";
    var ShortRadio = radioGroup.add("radiobutton", undefined, "Corto");
    var MediumRadio = radioGroup.add("radiobutton", undefined, "Mediano");
    var LargeRadio = radioGroup.add("radiobutton", undefined, "Largo");
    var ExtenseRadio = radioGroup.add("radiobutton", undefined, "Extenso");
    ShortRadio.value = true; // Establecer corto como seleccionado por defecto

    // Añadir botones de aceptar y cancelar
    var buttonGroup = dialog.add("group");
    var okButton = buttonGroup.add("button", undefined, "Aceptar");
    var cancelButton = buttonGroup.add("button", undefined, "Cancelar");

    // Acción al hacer clic en el botón "Aceptar"
    okButton.onClick = function() {
        var option;
        if (ShortRadio.value) {
            option = "Corto";
        } else if (MediumRadio.value) {
            option = "Mediano";
        } else if (LargeRadio.value) {
            option = "Largo";
        } else if (ExtenseRadio.value) {
            option = "Extenso";
        }
        replaceText(option);
        dialog.close();
    };

    // Acción al hacer clic en el botón "Cancelar"
    cancelButton.onClick = function() {
        dialog.close();
    };

    // Mostrar la ventana emergente
    dialog.show();
}

// Función para reemplazar el texto seleccionado con uno aleatorio
function replaceText(option) {
    var activeDocument = app.activeDocument;
    if (activeDocument) {
        var selectedText = getSelectedText(activeDocument);
        if (selectedText) {
            var newText;
            switch (option) {
                case "Corto":
                    newText = CortoTexts[Math.floor(Math.random() * CortoTexts.length)];
                    break;
                case "Mediano":
                    newText = MedianoTexts[Math.floor(Math.random() * MedianoTexts.length)];
                    break;
                case "Largo":
                    newText = LargoTexts[Math.floor(Math.random() * LargoTexts.length)];
                    break;
                case "Extenso":
                    newText = ExtensoTexts[Math.floor(Math.random() * ExtensoTexts.length)];
                    break;
                default:
                    alert("Opción no válida");
                    return;
            }
            selectedText.contents = newText;
        } else {
            alert("Por favor, seleccione un cuadro de texto para reemplazar el texto.");
        }
    } else {
        alert("Por favor, abra un documento de Illustrator.");
    }
}

// Función para obtener el texto seleccionado
function getSelectedText(doc) {
    var selection = doc.selection;
    if (selection.length > 0 && selection[0].typename === "TextFrame") {
        return selection[0].textRange;
    } else {
        return null;
    }
}

// Lista de textos cortos actualizada
var CortoTexts = [
    // Textos cortos aquí
];

// Lista de textos medianos
var MedianoTexts = [
    // Textos medianos aquí
];

// Lista de textos largos
var LargoTexts = [
    // Textos largos aquí
];

// Lista de textos extensos
var ExtensoTexts = [
    // Textos extensos aquí
];

// Lista de textos cortos actualizada
var CortoTexts = [
    "La naturaleza nos sorprende con su diversidad y belleza en cada rincón de nuestro planeta.",
    "La música es un lenguaje universal que conecta emociones, pero también, devela un mundo único con cada melodía.",
    "El amor y la amistad son fundamentales en la vida de cualquier ser humano, brindando alegría y compañía.",
    "La creatividad nos permite ver el mundo desde nuevos ángulos, inspirándonos a explorar ideas innovadoras.",
    "Una sonrisa puede iluminar el día más oscuro, transmitiendo alegría y positividad a quienes nos rodean.",
    "La perseverancia es clave para alcanzar nuestras metas, superando obstáculos con determinación y esfuerzo constante.",
    "La gratitud nos ayuda a valorar lo que tenemos, reconociendo las bendiciones que recibimos cada día.",
    "La curiosidad suele impulsarnos a descubrir el mundo, llevándonos a explorar lo desconocido con entusiasmo.",
    "El humor alivia el alma y añade felicidad, proporcionando un respiro en los momentos difíciles.",
    "La paciencia nos enseña a esperar con serenidad, cultivando la calma interior en medio de la adversidad."
];

// Lista de textos medianos
var MedianoTexts = [
    "En la era digital, la privacidad en línea es un tema cada vez más relevante. En un mundo donde nuestras vidas están cada vez más conectadas a través de la tecnología, proteger nuestra información personal se ha convertido en una prioridad. Desde nuestras cuentas de redes sociales hasta nuestras transacciones bancarias en línea, la seguridad de nuestros datos es crucial para nuestra tranquilidad y nuestra libertad en línea.",
    "La educación es la llave que abre las puertas del conocimiento y la oportunidad. Es un derecho fundamental de todos los seres humanos y un pilar fundamental de cualquier sociedad civilizada. A través de la educación, adquirimos las habilidades y los conocimientos necesarios para prosperar en la vida, así como la capacidad de pensar críticamente y cuestionar el mundo que nos rodea.",
    "El respeto hacia los demás es fundamental para construir relaciones saludables. Implica reconocer la dignidad inherente de cada individuo y tratarlos con cortesía y consideración. El respeto mutuo es la base de la convivencia pacífica y la cooperación entre las personas, y nos permite construir comunidades fuertes y solidarias.",
    "La diversidad cultural enriquece nuestra sociedad y nos hace más comprensivos. Nos expone a nuevas ideas, tradiciones y formas de pensar, y nos permite apreciar la riqueza y la belleza de la variedad humana. Al celebrar nuestras diferencias y aprender unos de otros, podemos construir un mundo más inclusivo y tolerante.",
    "La tecnología verde está transformando la manera en que cuidamos nuestro planeta. Con el aumento de la conciencia ambiental y la preocupación por el cambio climático, la demanda de soluciones sostenibles ha crecido exponencialmente. Desde la energía solar hasta los vehículos eléctricos, la innovación verde está allanando el camino hacia un futuro más limpio y saludable para todos."
];

// Lista de textos largos
var LargoTexts = [
    "La historia de la humanidad está marcada por momentos de grandeza y de tragedia, de avances y retrocesos, pero siempre impulsada por el deseo innato de progresar y dejar un legado para las generaciones futuras. Desde los albores de la civilización hasta la era moderna, hemos visto el surgimiento y la caída de imperios, la conquista de nuevos territorios y la lucha por la libertad y la justicia. A través de los siglos, hemos sido testigos de grandes descubrimientos científicos, avances tecnológicos y movimientos sociales que han transformado el curso de la historia humana. Y aunque hemos enfrentado desafíos y tribulaciones innumerables en nuestro camino, siempre hemos encontrado la fuerza y la determinación para seguir adelante y construir un mundo mejor para las generaciones venideras.",
    "En un mundo cada vez más interconectado, la necesidad de colaboración y solidaridad entre naciones se hace cada vez más evidente. Los desafíos globales, como el cambio climático y la pobreza, requieren soluciones coordinadas y sostenibles. Desde la lucha contra enfermedades infecciosas hasta la protección del medio ambiente, los problemas que enfrentamos como humanidad son demasiado complejos para que cualquier país o individuo pueda abordarlos solo. Solo a través del trabajo conjunto y la cooperación podemos encontrar soluciones duraderas a los desafíos que enfrentamos y construir un futuro más justo y sostenible para todos los habitantes del planeta.",
    "El futuro de la humanidad está en nuestras manos, y es nuestro deber y responsabilidad actuar con compasión y empatía hacia nuestros semejantes y hacia nuestro planeta. Debemos trabajar juntos para abordar los desafíos urgentes que enfrentamos, desde la pobreza y la desigualdad hasta el cambio climático y la degradación ambiental. Solo a través del trabajo conjunto y la solidaridad podemos construir un mundo más justo y equitativo para todos. Juntos, podemos marcar la diferencia y construir un futuro mejor y más prometedor para las próximas generaciones.",
    "El diseño gráfico, omnipresente en nuestra vida diaria, pero suele pasar desapercibido aún cuando desempeña un papel crucial en la comunicación visual y la experiencia del usuario en prácticamente todos los ámbitos. Desde los logotipos en nuestros productos favoritos hasta las interfaces digitales en nuestras aplicaciones, su influencia es innegable, pero a menudo subestimada. Reconocer su importancia nos permite comprender mejor cómo nos relacionamos con el mundo visualmente rico que nos rodea y cómo el diseño impacta nuestra percepción y comportamiento en la sociedad moderna.",
    "El porvenir de nuestra especie descansa en nuestras manos, y con ello viene el deber ineludible de actuar con compasión y empatía hacia nuestros semejantes y el entorno que compartimos. De la pobreza a la degradación ambiental, los desafíos que enfrentamos son monumentales, pero juntos, a través del trabajo conjunto y la solidaridad, podemos superarlos. Con cada acción, podemos marcar la diferencia y construir un futuro que refleje nuestros más nobles ideales y aspiraciones, garantizando un mañana lleno de esperanza y oportunidades para las generaciones venideras."
];

// Lista de textos extensos
var ExtensoTexts = [
    "Desde una edad temprana, los niños manifiestan un innato impulso por el dibujo, una expresión creativa que surge de su curiosidad innata y su necesidad de explorar el mundo que los rodea. Los primeros garabatos en papel son más que simples trazos; representan una forma de comunicación primordial, una manera de dar forma a sus pensamientos y emociones antes de que dominen el lenguaje verbal. A medida que los niños crecen, el acto de dibujar se convierte en una herramienta para expresar sus ideas, contar historias y dar vida a sus fantasías más salvajes. Además, el dibujo estimula el desarrollo de habilidades motoras finas, la coordinación mano-ojo y la capacidad de observación, preparando el camino para futuras actividades artísticas y creativas. Aunque muchos niños abandonan el dibujo a medida que crecen, aquellos que continúan cultivando su pasión descubren un mundo de posibilidades artísticas y una forma única de expresarse y conectar con los demás.",
    "A lo largo de la historia, la humanidad ha soñado con el futuro, imaginando sociedades utópicas, avances tecnológicos extraordinarios y nuevas fronteras por explorar. Nuestros antepasados, influenciados por su entorno cultural, religioso y filosófico, proyectaban sus esperanzas y temores en sus visiones del futuro. Desde las antiguas civilizaciones que visualizaban ciudades flotantes y máquinas voladoras hasta los visionarios del Renacimiento que anticipaban la era de la exploración espacial, el deseo de trascender los límites del presente ha sido una constante en la historia humana. Hoy en día, con los avances tecnológicos que nos rodean, desde la inteligencia artificial hasta la exploración espacial, estamos viviendo en el futuro que una vez fue el sueño de nuestros antepasados. Sin embargo, mientras nos maravillamos con nuestras realizaciones actuales, también debemos reflexionar sobre las lecciones del pasado y considerar cómo nuestras propias visiones del futuro pueden dar forma al mundo que dejaremos a las generaciones futuras.",
    "En las últimas décadas, el desarrollo de la inteligencia artificial (IA) ha sido uno de los avances más significativos en el campo de la tecnología. Desde sus humildes comienzos como concepto teórico hasta su integración en una amplia gama de aplicaciones prácticas, la IA ha revolucionado la forma en que interactuamos con la tecnología y ha transformado numerosas industrias. Con el crecimiento exponencial de la potencia informática y los avances en algoritmos de aprendizaje automático, la IA ha alcanzado nuevos hitos en campos como el reconocimiento de voz, la visión por computadora y la toma de decisiones autónomas. Sin embargo, junto con sus promesas de eficiencia y conveniencia, la IA también plantea desafíos éticos y sociales, desde preocupaciones sobre la privacidad y la seguridad hasta el impacto en el empleo y la desigualdad. A medida que continuamos explorando los límites de la IA, es crucial abordar estos problemas de manera proactiva y trabajar hacia un futuro en el que la IA beneficie a toda la humanidad.",
        "En el teatro de la vida, cada individuo se ve a sí mismo como el protagonista de su propia historia, mientras que al mismo tiempo actúa como un -actor secundario- en las vidas de los demás. Esta paradoja fundamental refleja la naturaleza subjetiva de la experiencia humana y la interconexión de nuestras vidas en la sociedad. A medida que avanzamos por el mundo, cada uno de nosotros está inmerso en nuestra propia narrativa personal, con sus propias aspiraciones, triunfos y desafíos. Sin embargo, al mismo tiempo, somos testigos y participantes en las historias de los demás, influyendo en sus vidas de maneras que a menudo no somos conscientes. Esta dualidad de perspectivas nos recuerda la complejidad de la experiencia humana y la importancia de la empatía y la comprensión en nuestras interacciones con los demás. Al reconocer nuestra interconexión y nuestra capacidad para influir en la vida de los demás, podemos cultivar una mayor compasión y solidaridad en nuestro mundo compartido."
];

// Llamar a la función para crear la interfaz de usuario
createUI();