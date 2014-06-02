function DropZone() {

	this.onload;
	var _self = this;

	this.init = function(element) {
		element.addEventListener('dragover', onFileDragOver, false);
		element.addEventListener('drop', onFileDrop, false);
	};
	function onFileDrop(event) {
		event.stopPropagation();
		event.preventDefault();

		var files = event.dataTransfer.files; // FileList object.
		for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			// Closure to capture the file information.
			reader.onload = (function(loadedFile) {
				return function(event) {
					if(_self.onload) _self.onload(event.target.result);
				};
			})(f);
			reader.readAsText(f);
		}
	}
	function onFileDragOver(event) {
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}
}
