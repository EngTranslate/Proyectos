/////////////// Globals ////////////////////////////////////
Junk = ["gb","gt-appbar","select_document","ft-l","ft-r","gt-ft"];
var re = /(\d\.|\bet\sal\.|\bfig\.|\bFig\.|[^\.!\?])+[\.!\?]+/g;
var sentences = [];
var results = [];
var index = 0;
var box = document.getElementById("result_box");

/////////////// Remove trash nodes from page ////////////////////////////////////
for (var i = Junk.length - 1; i >= 0; i--) {
	var child = document.getElementById(Junk[i]);
      child.parentNode.removeChild(child);
}


var list = document.getElementsByTagName("BODY")[0];
list.style.backgroundColor  = "#333";

var viewport = document.getElementById('gt-text-c');
viewport.style.backgroundColor  = "#444";
viewport.style.border  = "thin solid orange";
viewport.style.borderRadius  = "9px";
viewport.style.padding = "10px 10px 10px 10px";

// I could use gt-promo-lr for a menue bar


var input = document.getElementById('gt-src-wrap');
input.style.backgroundColor  = "lightblue";
input.style.border  = "thin solid steelblue";
input.style.borderRadius  = "9px";
input.style.padding = "3px 3px 3px 3px";
/////////////// Button for selecting a file ////////////////////////////////////
var node = document.createElement("input");
node.style = "10px 10px 10px 10px";
node.style.fontSize = "large";
node.setAttribute("type", "file");
node.setAttribute("accept", "text");
node.id = "file";
document.getElementById("gba").appendChild(node);

function goTo(event) {
	var value = event.target.value;
	index = value;
	var output = document.getElementById('source');
	output.value = sentences[index];
    document.getElementById("report").innerHTML = "" + index + " of " + sentences.length;
              if(results[index].length > 2){
              	box.style.border  = "thin solid steelblue";
              }
              else{box.style.border  = "thin solid white";}
}
/////////////// Load File ////////////////////////////////////
function openFile(event) {
	    var input = event.target;
	    var reader = new FileReader();
	    reader.onload = function(){
	      var dataURL = reader.result;
	      var output = document.getElementById('source');
		  sentences = dataURL.match(re);
		  index = 0;
	      output.value = sentences[index]; //dataURL;
	      for (var i = sentences.length - 1; i >= 0; i--) { results[i] = ""; }


	      var trackbar = document.createElement("input");
				trackbar.style.width  = "400px";
				trackbar.setAttribute("id", "trackbar");
				trackbar.setAttribute("type", "range");
				trackbar.setAttribute("min", index );
				trackbar.setAttribute("max", sentences.length-1 );
				document.getElementById("gt-promo-lr").appendChild(trackbar);
				document.getElementById("trackbar").addEventListener("change",  goTo );
	    };
	    if(input.files!==undefined){
	alert(reader.result);
	    	    reader.readAsText(input.files[0]);
	    	}else{ console.log("There are no files selected!"); }
};

document.getElementById("file").addEventListener("click",  openFile );
/////////////// Buttons for navigating text ////////////////////////////////////
//------------------backward-------------------------------
var node = document.createElement("input");
node.setAttribute("type", "button");
node.style.padding = "5px 5px 5px 5px";
node.value = "<";
node.style.fontSize = "large";
node.id = "goBack";
document.getElementById("gt-promo-lr").appendChild(node);


function goBack(event) {
	if(index>0){ index--;
	          var output = document.getElementById('source');
		      output.value = sentences[index];
              document.getElementById("report").innerHTML = "" + index + " of " + sentences.length;
              document.getElementById("trackbar").value = index;
              if(results[index].length > 2){
              	box.style.border  = "thin solid steelblue";
              }
              else{box.style.border  = "thin solid white";}
		  }
}

document.getElementById("goBack").addEventListener("click",  goBack );
//------------------forward-------------------------------
var node = document.createElement("input");
node.setAttribute("type", "button");
node.style.padding = "5px 5px 5px 5px";
node.value = ">";
node.style.fontSize = "large";
node.id = "goForward";
document.getElementById("gt-promo-lr").appendChild(node);


function goForward(event) {
     document.getElementById("result_box").textContent = "";
	if(index<sentences.length){ index++;
	          var output = document.getElementById('source');
		      output.value = sentences[index];}
              document.getElementById("report").innerHTML = "" + index + " of " + sentences.length;
              document.getElementById("trackbar").value = index;
              if(results[index].length > 2){
              	box.style.border  = "thin solid steelblue";
              }
              else{box.style.border  = "thin solid white";}
}
//------------------report-------------------------------
var node = document.createElement("DIV");
node.innerHTML = "" + index + " of " + sentences.length;
node.style.color = "white";
node.id = "report";
document.getElementById("gt-promo-lr").appendChild(node);

document.getElementById("goForward").addEventListener("click",  goForward );

//------------------Approve Edit-------------------------------
var node = document.createElement("input");
node.setAttribute("type", "button");
node.style.padding = "5px 5px 5px 5px";
node.value = "Ok!";
node.style.fontSize = "large";
node.id = "good";
document.getElementById("gt-promo-lr").appendChild(node);
document.getElementById("good").addEventListener("click",  AddTranslatedText );


function AddTranslatedText() {
	var value = document.getElementById("result_box").textContent;
	box.style.border  = "thin solid steelblue";
	results[index] = value;
	goForward();
}

//------------------ SAVE -------------------------------
var node = document.createElement("input");
node.setAttribute("type", "button");
node.style.padding = "5px 5px 5px 5px";
node.value = "Save!";
node.style.fontSize = "large";
node.id = "save";
document.getElementById("gba").appendChild(node);
document.getElementById("save").addEventListener("click",  saveTextAsFile );

function saveTextAsFile(){
	value = "";
	for (var i = 0; i <= sentences.length; i++) { value = value + results[i] + " "; }


    var textFileAsBlob = new Blob([value], {type:'text/plain'});
    var downloadLink = document.createElement("a");
    downloadLink.download = "final-draft.md";
    downloadLink.innerHTML = value;
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}
