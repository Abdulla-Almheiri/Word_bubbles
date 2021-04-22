
	var myRec = new p5.SpeechRec('en-US', parseResult); 
	myRec.continuous = true; 
	myRec.interimResults = true; 

	var x, y = -30
    var score = 0;
    var highestScore = 0;
    var maxSize = 200;
    let size = 50;
	var dx, dy;
    let words = ["can", "super", "time", "hello", "why", "result", "fly", "to",  "woman", "create", "heart", "flower", "object", "Java" ];
    let word = "";
    let currentWord;
    let change = false;
    var wordSpeed = 1;
    let vol;
    let mic;
    let volRatio = 1000;
    let accuracy = 0.8;
    let mostrecentword;
    let started = false;
    let difficulty = 3;


	function setup()
	{
        mic = new p5.AudioIn();
        mic.start();
        vol = mic.getLevel();

		createCanvas(800, 600);
		background(255, 255, 255);
		fill(0, 0, 0, 255);


		textSize(18);
		textAlign(CENTER);
		text("With your voice, match the words and the volume indicated by the circle. \n Press any key to start.", 500,100);
        text("Highest score : " + highestScore, 500,150);
		
		myRec.start(); 
        makeWord();
	}

	function draw()
	{
        wordSpeed = 1+ (difficulty*score/10);
        console.log("Wordspeed : " + wordSpeed);

        if(started)
        {
        vol = (vol+mic.getLevel())/2;

		y+= wordSpeed;
        //console.log("Y  : " + y);
		if(y>600)
        {
            console.log("it fell");
            change = true;
            if(change)
            {
                makeWord();
                change = false;
            }
            y = -30;
            vol = 0;
            reset();
  
        }
        
        if(myRec.resultString)
        {
        mostrecentword = myRec.resultString.split(' ').pop();
        

        console.log("You said : " + mostrecentword);
        }

        if(vol*volRatio >= (size*accuracy) && mostrecentword === word)
        {
            makeWord();
            console.log("Correct!");
            y = -30;
            vol = 0;
            score +=1;
            if(score> highestScore)
            {
                highestScore = score;
            }
        }



  
        fill(0, 0,0 ,100);
      
        background(255, 255, 255);
        text("Score : " + score, 50, 20);
        ellipse(400,y, size, size);
        fill(255,0,0,100);
        ellipse(400,y, vol*volRatio, vol*volRatio);
        fill(0, 0, 0, 100);
        text(word, 400, y);
    } else {
        reset();
    }
 

        
	}


    function keyPressed()
    {
        started = true;


    }
	function parseResult()
	{

		var mostrecentword = myRec.resultString.split(' ').pop();
	}

function reset()
{
    background(255, 255, 255);
    text("With your voice, match the words and the volume indicated by the circle. \n Press any key to start.", 500,100);
    started = false;
    vol = 0;
    y=-30;
    score = 0;
}

function makeWord()
{
    word = words[Math.floor(Math.random()*(words.length))];
    size = 50+Math.floor(Math.random()*maxSize);
    console.log(word);
    change = false;

}