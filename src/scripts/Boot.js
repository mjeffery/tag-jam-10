(function(exports) {
	function Boot() {}

	Boot.prototype = {
		preload: function() {
			this.load.image('loading-bar', 'assets/img/loading bar.png');
			this.load.image('loading-bar-bg', 'assets/img/loading bar bg.png');
		},
		create: function() {
			this.stage.backgroundColor = '#00000';
			this.state.start('preload');
		}
	};

	exports.Boot = Boot;
})(this);