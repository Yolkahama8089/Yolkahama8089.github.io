function preload() {
    fontRegular = loadFont('scripts/assets/fonty.ttf');
    //music = loadSound('assets/backgroundMusic.mp3');
}

function setup() {
    createCanvas(800, 500);
    frameRate(60);
    textSize(25);
    textFont(fontRegular);
    fill(color('green'));
}

//scene control
var scene = 1;

//pipes array
var pipes = [];

//player object
var player = new Object();
player.velocity;
player.x;
player.y;

//timing for pipes
var then;
var now;

//score
var score;

function draw() {
    clear();
    background(1);
    if (score >= 80)
    {
        fill(color('red'));
    }
    else if (score >= 60)
    {
        fill(color('purple'));
    }
    else if (score >= 40)
    {
        fill(color('magenta'));
    }
    else if (score >= 20)
    {
        fill(color('blue'));
    }
    else
    {
        fill(color('green'));
    }

    switch(scene) {
        //start screen
        case 1:
            text("Press space to start", 100, 200);
            break;

        //initialize variables
        case 2:
            pipes.length = 0;
            then = millis();
            player.x = 240;
            player.y = 180;
            player.velocity = -8;
            scene = 3;
            score = 0;
            //music.setVolume(0.1);
            //music.play();
            break;    
            
        //main game loop
        case 3:

            //if (!music.isPlaying())
            //    music.play();
            //pipe timing
            now = millis();
            if ((now - then) >= 1500)
            {
                pipes.push((new pipe(800, Math.random() * 400 + 100)));
                then = millis();
            }

            //player movement and drawing
            player.velocity += .5;
            player.y += player.velocity;
            ellipse(player.x, player.y, 35, 35);

            //iterate over pipes array
            for (var i=0; i<pipes.length; i++)
            {
                //draw pipe
                rect(pipes[i].x, 0, pipes[i].width, pipes[i].yTop);
                rect(pipes[i].x, pipes[i].yBottom, pipes[i].width, 500 - pipes[i].yBottom);
                
                //pipe movement
                pipes[i].x -= 10;
                
                //hit test with player
                if (Math.abs(pipes[i].x + (pipes[i].width/2) - player.x) <= 17.5 && !(player.y > pipes[i].yTop + 16 && player.y < pipes[i].yBottom - 16))
                {
                    scene = 4;
                }

                //scoring
                if (pipes[i].x - player.x < -22 && pipes[i].scored === 0)
                {
                    score += 1;
                    pipes[i].scored += 1;
                }

                //handle deleting pipes
                if (pipes[i].x <= 0)
                {
                    pipes.splice(i, 1);
                }
            }

            //display score
            text(score.toString(), 50, 50, 100, 100);
            
            break;

        //end screen
        case 4:
            //if (music.isPlaying() == true)
            //    music.stop();
            text("Score: " + score.toString(), 100, 100);
            text("Press space to try again", 100, 200);
            break;
    }

}

//pipe constructor
var pipe = function(x, y){
    this.x = x;
    this.yBottom = y;
    this.yTop = this.yBottom - 110;
    this.width = 20;
    this.scored = 0;
}

//handle player input
function keyPressed() {
    if (key === ' ')
    {
        switch (scene) {
            case 1:
                scene = 2;
                break;

            case 2:
                break;
            
            case 3:
                player.velocity = -10;
                break;
            
            case 4:
                scene = 2;
                break;
            
        }
    }
}
