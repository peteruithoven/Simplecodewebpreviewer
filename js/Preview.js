function Preview() {

	this.flipY = false;
	this.bedWidth = 0;
	this.bedHeight = 0;

	var _element;
	var _svg;
	var _simpleCode;
	var _self = this;

	this.init = function(element) {
		_element = element;
		if (SVG.supported) {
			_svg = SVG(_element).size(_self.bedWidth,_self.bedHeight);
		} else {
			alert('SVG not supported');
		}
	};
	this.setContent = function(simpleCode) {
		_simpleCode = simpleCode;
		draw();
	};
	function draw() {
		var commands = _simpleCode.commands;
		var px = 0;
		var py = (_self.flipY)? 0 : _self.bedHeight;
		for(var i=0;i<commands.length;i++) {
			var cmd = commands[i];
			var step;
			switch(cmd.command) {
				case SimpleCode.COMMAND.MOVE:
				case SimpleCode.COMMAND.CUT:
					var x = cmd.params[0]*SimpleCode.SCALE; //*scale
					var y = cmd.params[1]*SimpleCode.SCALE; //*scale
					if(_self.flipY) y = _self.bedHeight-y;

					var lineClass = (cmd.command == SimpleCode.COMMAND.MOVE)? "move" : "cut";
					step = _svg.line(px,py,x,y).attr('class', lineClass);

					px = x;
					py = y;
					break;
			}
		}
	}
}
