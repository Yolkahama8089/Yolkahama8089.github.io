var htmlEditor;
var cssEditor;
var frame;
var isToggled;
var header1;
var toggleButton;

var onLoad = function() {
    htmlEditor = document.getElementById('html_editor');
    htmlEditor.spellcheck = false;
    cssEditor = document.getElementById('css_editor');
    cssEditor.spellcheck = false;
    frame = document.getElementById('iframe');
    frame.srcdoc = "<style></style>";
    header1 = document.getElementById('title_header');
    toggleButton = document.getElementById('toggle_button');
    isToggled = false;
}

var onLaunch = function () {
    frame.srcdoc = 
        isToggled ?
        "<style>" + cssEditor.value + "</style>" + htmlEditor.value
        : "<style></style>" + htmlEditor.value;
    //console.dir(frame);
    //frame.src="https://yolkahama8089.github.io/";
}

var onToggle = function () {
    if (!isToggled) {
        isToggled = true;
        frame.srcdoc = 
            "<style>" + cssEditor.value + "</style>" + 
            frame.srcdoc.substring(frame.srcdoc.indexOf("</style>") + 8);
        toggleButton.style.backgroundColor = "white";
    }
    else if (isToggled) {
        isToggled = false;
        frame.srcdoc = 
            "<style></style>" + 
            frame.srcdoc.substring(frame.srcdoc.indexOf("</style>") + 8);
        toggleButton.style.backgroundColor = "rgb(20, 20, 20)"
    }
}

var onDbClickHTML = function () {
    htmlEditor.value =
        "<h4> Hello World! </h4>\n" +
        "<p> Welcome to my code editor application! </p>\n";
}

var onDbClickCSS = function () {
    cssEditor.value =
        "h4 {\n\tcolor: lightblue; \n\ttext-align:center;\n}\n\n" +
        "p {\n\tfont-family: verdana, cursive; \n\tfont-size: 35pt; \n\ttext-align: right; \n}\n\n"
} 

var reset = function() {    
    frame.srcdoc = "<style></style>";
    htmlEditor.value = "";
    cssEditor.value = "";
}

var changeTitle = function() {
    let newTitle = window.prompt("What would you like to change the title to?", "title");
    if (newTitle != null) {
        header1.innerHTML = newTitle;
    }
}

var tab = function(e) {
    if(keycode == 9) {
        e.preventDefault();
        this.value = this.value + "\t";
    }
}

//when toggle is turned on, add <style> + cssEditor.value + </style> + cssEditor.value.substring(indexof(</style>) + 8)
//when toggle is turned off, cssEditor.value = cssEditor.value.substring(indexof(</style>) + 8);