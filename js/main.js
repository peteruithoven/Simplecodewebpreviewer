var simpleCode = new SimpleCode();

var preview = new Preview();
var dropZone = new DropZone();

preview.flipY = true;
preview.bedWidth = 520;
preview.bedHeight = 330;
preview.init(document.getElementById('preview'));
//preview.setContent("");

dropZone.init(document.getElementById('dropzone'));
dropZone.onload = function(content) {
	console.log("  simplecode: ",content);
	simpleCode.parse(content);
	preview.setContent(simpleCode);
};

