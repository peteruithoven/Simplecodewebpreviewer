function SimpleCode() {

	SimpleCode.COMMAND = {
		MOVE: 0,
		CUT: 1,
		SET: 7,
		BITMAP: 9,
		JOB_X_MIN: 201,
		JOB_X_MAX: 202,
		JOB_Y_MIN: 203,
		JOB_Y_MAX: 204
	};
	SimpleCode.PARAM = {
		SPEED: 100,
		POWER: 101,
		FREQUENCY: 102
	};

	SimpleCode.SCALE = 0.001;

	this.lines = [];
	this.commands = [];
	this.length = 0;
	var _self = this;

	this.parse = function(content) {
		_self.lines = content.split("\n");
		_self.commands = [];
		for(var i = 0;i<_self.lines.length;i++) {
			var line = 	_self.lines[i];
			var lineParts = line.split(' ');
			for(var j = 0;j<lineParts.length;j++) {
				lineParts[j] = parseInt(lineParts[j]);
			}
			var cmdType = lineParts[0];
			var params = lineParts.slice(1);
			var cmd = new SimpleCodeCommand(cmdType,params);
			_self.commands.push(cmd);
		}
		_self.length = _self.lines.length;
	};
}
function SimpleCodeCommand(command,params) {
	this.command = command;
	this.params = params;
}
