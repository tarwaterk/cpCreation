//GLOBAL VARIABLES
var body = document.getElementsByTagName("body")[0];
var trelloSlug = window.location.pathname.match(/\w+/g)[1];
var urlPath = "https://devassembly.herokuapp.com/tools/bookmarklets/trelloBM/index.html?trelloSlug="+trelloSlug;

//FUNCTIONS

//MAIN CODE
var passoffFrame = document.createElement("iframe");
passoffFrame.name = "passoffFrame";
passoffFrame.id = "passoffFrame";
passoffFrame.style = "position:fixed; top:0px; width:600px; height:600px; border: solid 2px #3333cc;background-color:#FFF; z-index:100";
passoffFrame.src = urlPath;
body.appendChild(passoffFrame);

function receiveMessage(event) {
	if (event.data === "closeWindow") {
		body.removeChild(document.getElementById("passoffFrame"));
		window.removeEventListener("message", receiveMessage, false);
	}
}

window.addEventListener("message", receiveMessage, false);