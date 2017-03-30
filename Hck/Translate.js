Junk = ["gb","gt-appbar","select_document","ft-l","ft-r","gt-ft"];
var re = /(\d\.|\bet\sal\.|\bfig\.|\bFig\.|[^\.!\?])+[\.!\?]+/g;
var sentences = [];
var index = 0;

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

	      var trackbar = document.createElement("input");
				trackbar.style.width  = "400px";
				trackbar.setAttribute("id", "trackbar");
				trackbar.setAttribute("type", "range");
				trackbar.setAttribute("min", index );
				trackbar.setAttribute("max", sentences.length-1 );
				document.getElementById("gt-promo-lr").appendChild(trackbar);
				document.getElementById("trackbar").addEventListener("click",  goTo );
				//trackbar.style.border  = "thin solid orange";
				//trackbar.style.borderRadius  = "9px";
				//trackbar.style.padding = "10px 10px 10px 10px";
	      //<input type="range"  min="0" max="100" />
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
		  }
}

document.getElementById("goBack").addEventListener("click",  goBack );
//------------------backward-------------------------------
var node = document.createElement("input");
node.setAttribute("type", "button");
node.style.padding = "5px 5px 5px 5px";
node.value = ">";
node.style.fontSize = "large";
node.id = "goForward";
document.getElementById("gt-promo-lr").appendChild(node);


function goForward(event) {
	if(index<sentences.length){ index++;
	          var output = document.getElementById('source');
		      output.value = sentences[index];}
              document.getElementById("report").innerHTML = "" + index + " of " + sentences.length;
}
//------------------report-------------------------------
var node = document.createElement("DIV");
node.innerHTML = "" + index + " of " + sentences.length;
node.style.color = "white";
node.id = "report";
document.getElementById("gt-promo-lr").appendChild(node);

document.getElementById("goForward").addEventListener("click",  goForward );
