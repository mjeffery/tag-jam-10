(function(exports) {
	function Game() {} 

	_.extend(Game, {
		preload: function(load) {
			load.image('tileset-0', 'assets/img/tileset 0.png');
			load.tilemap('test-room-0', 'assets/tilemap/test-room-0.json', undefined, Phaser.Tilemap.TILED_JSON);
		}
	});

	Game.prototype = {
		create: function() {
			var add = this.add,
				physics = this.game.physics;

			physics.startSystem(Phaser.Physics.ARCADE);

			var map = this.map = add.tilemap('test-room-0');
			map.addTilesetImage('tileset-0', 'tileset-0');
			map.setCollision(2, true);

			var layer = this.terrain = map.createLayer('terrain');
			layer.resizeWorld();
			layer.debug = true;

			var player = this.player = add.existing( new Player(this.game, 3 * 32, 27 * 32) );
			add.existing(player);

			this.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
		},

		update: function() {
			var physics = this.game.physics,
				terrain = this.terrain,
				player = this.player;

			physics.arcade.collide(terrain, player);
		},

		render: function() {
			this.game.debug.body(this.player);
		}
	}	

	exports.Game = Game;
})(this);