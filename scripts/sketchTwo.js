//variables controlling startup text and startup background
var backgroundColor = 1;
var backgroundColorShifter = 1;
var clicked = false;

//array of particle sets that expands on mouse click
var particleSets = [];

//keeps particles from generating continuously on mouse hold
var mouseLimiter = 0;

//Setup Function
function setup() {
    createCanvas(800, 500);
    frameRate(60);
}

//Main Loop Function
function draw() {
    
    //clear previous frame
    clear();
    background(backgroundColor);

    //startup text
    if (clicked === false)
    {
        fill(color('black'));
        textSize(32);
        text('try clicking', 100, 100);
    }

    //controls background color changing on startup
    if(backgroundColorShifter > 0)
    {
        backgroundColor += backgroundColorShifter;
        if(backgroundColor >= 120)
        {
            backgroundColorShifter -= .01;
        }
    }
    
    //handle each of the particlsets
    for(i=0; i<particleSets.length; i++)
    {
        particleSets[i].tick();                 //adjusts positioning
        particleSets[i].render();               //displays particle on screen via ellipse
        if (particleSets[i].checkDeath())
        {
            particleSets.splice(i, 1);
        }
    }
}

//On Mouse Click Function
function mousePressed()
{
    //if the mouse is within bounds and isn't behing held (mouseLimiter checks if mouse is being held)
    if (mouseLimiter === 0 && mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 500)
    {
        particleSets.push(new particleSet(mouseX, mouseY));
        mouseLimiter = 1;
    }

    //clicked controls the display of the starting text.
    if (clicked === false)
    {
        clicked = true;
    }
}

//On Mouse Release Function
function mouseReleased()
{
    mouseLimiter = 0;
}

//Particle Class Constructor
var particle = function(x, y)
{
    //handles starting position and velocity
    this.x = x;
    this.y = y;
    this.velX = random() * 2;
    if (random() < .5)
        this.velX *= -1;
    this.velY = random() * -5;

    //method for handling movement
    this.tick = function()
    {
        this.x += this.velX;
        this.y += this.velY;
        this.velY += .15;
    }

    //method for displaying particle
    this.render = function(particleColor){
        fill(color(particleColor));
        ellipse (this.x, this.y, 10, 10);
    }

}

//Particle Set Class Constructor
var particleSet = function(x, y)
{
    //handles determining color of each particle in the set
    this.particleColor;
    var randomColorSelector = random();
    if (randomColorSelector < .2)
    {
        this.particleColor = 'green';
    }
    else if (randomColorSelector < .4)
    {
        this.particleColor = 'red';
    }
    else if (randomColorSelector < .6)
    {
        this.particleColor = 'cyan';
    }
    else if (randomColorSelector < .8)
    {
        this.particleColor = 'magenta';
    }
    else{
        this.particleColor = 'orange';
    }

    //array containing 20 particles
    this.particles = [];
    for (z=0; z<20; z++)
    {
        this.particles.push(new particle(x, y));
    }

    //method handling the particles movement
    this.tick = function()
    {
        for(j=0; j<20; j++)
        {
            this.particles[j].tick();
        }
    }

    //method handling displaying of particles
    this.render = function()
    {
        for(k=0; k<20; k++)
        {
            this.particles[k].render(this.particleColor);
        }
    }

    //method for deleting particle sets that have all particles below the canvas
    this.checkDeath = function()
    {
        var count = 0;
        for(l=0; l<20; l++)
        {
            if (this.particles[l].y < 500)
            {
                count++;
            }
        }
            
        if (count === 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
