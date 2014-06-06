function Preview() {

	this.flipY = false;
	this.bedWidth = 0;
	this.bedHeight = 0;

	var _element;
	var _svg;
	var _simpleCode;
	var _currentStep = 0;
	var _steps = [];
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
		if(simpleCode.length === 0) return;
		_element.className = "show";
		draw();
	};
	this.setStep = function(step) {
		if(step > _simpleCode.length-1) step = _simpleCode.length-1;
		if(step < 0) step = 0;
		if(step === _currentStep) return;
		_currentStep = step;
		
		for(var i=0;i<_steps.length;i++) {
			var step = _steps[i];
			if(step === undefined) continue;
			step.attr('opacity',((i > _currentStep)? 0.1 : 1));
		}
	}
	this.resize = function(width,height) {
		_self.bedWidth = width;
		_self.bedHeight = height;
		_svg.node.setAttribute("width",width);
		_svg.node.setAttribute("height",height);
		draw();
	}
	
	function draw() {
		_steps = [];
		_svg.clear();
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
			_steps[i] = step;
		}
	}
}
