var simpleCode = new SimpleCode();
var currentLine = 0;
var preview = new Preview();
var dropZone = new DropZone();
var help = document.getElementById('help')

preview.flipY = true;
preview.bedWidth = 520;
preview.bedHeight = 330;
preview.init(document.getElementById('preview'));
preview.setContent(simpleCode);
//preview.setContent("");

dropZone.init(document.getElementById('dropzone'));
dropZone.onload = function(content) {
	help.className = "hide";
	console.log("  simplecode: ",content);
	simpleCode.parse(content);
	preview.setContent(simpleCode);
};

document.onmousemove = function(event) {
	var mouseX = (event.pageX !== undefined)? event.pageX : event.clientX;
	var width = document.width;
	var perc = mouseX/document.body.clientWidth;
	setCurrentLine(Math.round(simpleCode.length*perc));
}

document.onkeydown = function(event) {
	var multiplier = event.shiftKey? 10 : 1;
	switch(event.keyCode) {
		case 37: //left
			setCurrentLine(currentLine-1*multiplier);
			break;
		case 39: //right
			setCurrentLine(currentLine+1*multiplier);
			break;
		case 38: //up
			setCurrentLine(currentLine-1*multiplier);
			break;
		case 40: //down
			setCurrentLine(currentLine+1*multiplier);
			break;
	}
}

function setCurrentLine(line) {
	if(line > simpleCode.length-1) line = simpleCode.length-1;
	if(line < 0) line = 0;
	if(currentLine === line) return;
	currentLine = line;
	//console.log("  currentLine: ",currentLine);
	preview.setStep(currentLine);
}