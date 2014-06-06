function Form() {

	this.onChange;
	this.bedWidth = 0;
	this.bedHeight = 0;
	
	var STORAGE_KEY = "simplecodepreviewer";
	var _element;
	var _bedWidthInput;
	var _bedHeightInput;
	var _self = this;

	this.init = function(element) {
		_element = element;
		var children = _element.childNodes;
		for(var child of children) {
			if(child.name === "bed-width") {
					_bedWidthInput = child;
			} else if(child.name === "bed-height") {
					_bedHeightInput = child;
			}
		}
		_bedWidthInput.onchange = onChange;
		_bedHeightInput.onchange = onChange;
		
		// retrieve stored values
		var json = localStorage.getItem(STORAGE_KEY);
		json = JSON.parse(json || "{}")
		_bedWidthInput.value = json.bedWidth;
		_bedHeightInput.value = json.bedHeight;
	};
	function onChange() {
		_self.bedWidth = _bedWidthInput.value;
		_self.bedHeight = _bedHeightInput.value;
		if(_self.onChange !== undefined) _self.onChange();
		
		// store values
		var json = {	bedWidth: _self.bedWidth,
							 		bedHeight: _self.bedHeight};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
	}
}
