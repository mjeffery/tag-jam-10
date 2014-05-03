(function(exports) {
	function Preload() { }

	Preload.prototype = {
		preload: function() {
			this.add.sprite(170, 250, 'loading-bar-bg');

			var load = this.load,
				bar = this.add.sprite(170, 250, 'loading-bar');

			// PRELOAD ASSETS HERE

			load.setPreloadSprite(bar);
			load.onLoadComplete.addOnce(this.onLoadComplete, this);
		},
		onLoadComplete: function() {
			this.state.start('game');
		}
	};

	exports.Preload = Preload
})(this);