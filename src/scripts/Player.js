(function(exports) {
	function Player(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'knight');

		//animation
		this.anchor.setTo(0.5, 0.5);

		this.animations.add('stand', [1]);
		this.animations.add('stand-left', [4]);
		this.animations.add('stand-right', [7]);
		this.animations.add('walk-left', [3, 4, 5, 4])
		this.animations.add('walk-right', [6, 7, 8, 7]);

		// collision
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.setSize(14, 32, 0, 0);
		this.body.collideWorldBounds = true;
		this.body.acceleration.y = Player.GRAVITY;

		// input
		var input = game.input.keyboard;

		var keys = this.keys = input.createCursorKeys();
		_.extend(keys, {
			jump: input.addKey(Phaser.Keyboard.Z),
			melee: input.addKey(Phaser.Keyboard.X),
			shoot: input.addKey(Phaser.Keyboard.C)
		});

		// capture the input keys
		_(keys)
			.pluck('keyCode')
			.each(input.addKeyCapture, input);
		
		input.addKeyCapture(Phaser.Keyboard.SPACEBAR);

		// state information
		this.canVariableJump = true;
		this.airJumpReady = true;
		this.airDashReady = true;
	}

	_.extend(Player, {
		GRAVITY: 350,
		JUMP_SPEED: -220, 
		JUMP_VARIANCE: 150,
		WALK_SPEED: 200,
		preload: function(load) {
			load.spritesheet('knight', 'assets/spritesheet/knight.png', 32, 32);
		}
	});

	Player.prototype = Object.create(Phaser.Sprite.prototype);
	Player.prototype.constructor = Player;

	_.extend(Player.prototype, {
		update: function() {
			var keys = this.keys;


			//TODO get the movement feeling crisp and good

			if(keys.left.isDown) {
				//TODO velocity left
				this.body.velocity.x = -Player.WALK_SPEED;
				this.animations.play('walk-left');
				this.facing = Phaser.LEFT;
			}
			else if(keys.right.isDown) {
				//TODO velocity right
				this.body.velocity.x = Player.WALK_SPEED;
				this.animations.play('walk-right');
				this.facing = Phaser.RIGHT;
			}
			else {
				this.body.velocity.x = 0; 
			}

			var grounded = this.grounded = this.body.blocked.down; // TODO this won't work with moving platforms?
			if(grounded) {
				this.airJumpReady = true;	
				console.log('air jump ON');
			}

			if(keys.jump.justPressed(5)) {
				console.log("grounded: " + grounded);
				if(grounded || this.airJumpReady) {
					this.canVariableJump = true
					console.log('variable jump ON');
					// TODO play the jump animation
					this.body.velocity.y = Player.JUMP_SPEED;
				}

				if(!grounded) { 
					//TOD) expend the air jump...
					this.airJumpReady = false;  
					console.log('air jump OFF');
				}
			}

			if(keys.jump.justPressed(Player.JUMP_VARIANCE)) {
				this.body.velocity.y = Player.JUMP_SPEED;
			}

			if(keys.jump.isUp) {
				this.canVariableJump = false;
				console.log('variable jump OFF');
			}

		},

		onJumpDown: function() {

		}
 	});

	exports.Player = Player;
})(this);