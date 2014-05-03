(function(exports) {
	function Preload() { }

	Preload.prototype = {
		preload: function() {
			var load = this.load,
				bar = this.add.sprite(0, 0, 'loading-bar');

			this.add.sprite(0, 0, 'loading-bar-overlay');

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