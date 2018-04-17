function setup() {
    createCanvas(800, 500);
    fill(color('green'));
    background(1);
    frameRate(60);
}

var particleSets = [];

var mouseLimiter = 0;

function mousePressed()
{
    if (mouseLimiter === 0 && mouseX >= 0 && mouseX <= 800 && mouseY >= 0 && mouseY <= 500)
    {
        particleSets.push(new particleSet(mouseX, mouseY));
        mouseLimiter = 1;
    }
    if (clicked === false)
    {
        clicked = true;
    }
}

function mouseReleased()
{
    mouseLimiter = 0;
}
var backgroundColor = 1;
var colorSwitcher = 0;
var clicked = false;
function draw() {
    
    clear();
    background(backgroundColor);
    if (clicked === false)
    {
        fill(color('black'));
        textSize(32);
        text('try clicking', 100, 100);
    }
    if (colorSwitcher === 0)
    {
        backgroundColor += 1;
        if (backgroundColor >= 150)
            colorSwitcher = 1;
    }
    if (colorSwitcher === 1)
    {
        backgroundColor -= 1;
        if (backgroundColor <= 1)
            colorSwitcher = 0;
    }

    

    //handle each of the particlsets
    for(i=0; i<particleSets.length; i++)
    {
        particleSets[i].tick(); //this line of code is executed just fine
        particleSets[i].render(); //This is where the non-sensical error shows up
        if (particleSets[i].checkDeath())
        {
            particleSets.splice(i, 1);
        }
    }
}

//Class containing information and methods of each particle
var particle = function(x, y)
{
    this.x = x;
    this.y = y;
    this.velX = random() * 2;
    if (random() < .5)
        this.velX *= -1;
    this.velY = random() * -5;

    this.tick = function(){
        this.x += this.velX;
        this.y += this.velY;
        this.velY += .15;
    }

    this.render = function(kolor){
        fill(color(kolor));
        ellipse (this.x, this.y, 10, 10);
    }

}

//Class containing array of particles and handles all their ticking and rendering
var particleSet = function(x, y)
{
    this.kolor;
    if (random() < .2)
    {
        this.kolor = 'green';
    }
    else if (random() < .4)
    {
        this.kolor = 'red';
    }
    else if (random() < .6)
    {
        this.kolor = 'cyan';
    }
    else if (random() < .8)
    {
        this.kolor = 'magenta';
    }
    else{
        this.kolor = 'orange';
    }

    this.particles = [];
    for (z=0; z<20; z++)
    {
        this.particles.push(new particle(x, y));
    }

    this.tick = function()
    {
        for(j=0; j<20; j++)
        {
            this.particles[j].tick();
        }
    }

    this.render = function()
    {
        for(k=0; k<20; k++)
        {
            this.particles[k].render(this.kolor);
        }
    }

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
