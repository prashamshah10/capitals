var bgImage;
var lion,lionImage;
var enter,submit;
var question,answerradio;
var database;
var gameState="welcome";
var topic,greeting1,greeting2;
var level;
var q1;
var quesno=1;
var easyarr,mediumarr,hardarr;
var rand;
var askedques=[];

function preload()
{
  bgImage=loadImage("world.jpg");
  lionImage=loadImage("lioncharacter.png");
  enterImage=loadImage("906730.png");
  
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  database=firebase.database();
  
  lion=createSprite(200,windowHeight-200,50,50);
  lion.addImage(lionImage);
  

  getEasyQuestions();
  getMediumQuestions();
  getHardQuestions();
  
}

function draw() {
  
  if(gameState==="welcome"){
    background(bgImage);
  //textFont("Georgia");
  textSize(40);
  fill("red");
  stroke("red");
  topic = createElement('h1', 'FUN WITH CAPITALS');
  topic.position(windowWidth/2-150,50);
  topic.style('color','red');
  
  //drawSprites();
  
  fill("brown");
  stroke("brown");
    greeting1=createElement('h1','Travel the World around with me to learn capitals of places')
    //greeting2=createElement('h2','me to learn capitals of places')
    greeting1.position(windowWidth/2-400,140);
    //greeting2.position(60,160);
    greeting1.style('color','blue');
    //greeting2.style('color','blue');
    
    enter=createButton('Enter');
    enter.position(windowWidth-300,windowHeight-300);
    gameState="start";
  }
  if(gameState==="start")
    {
      enter.mousePressed(()=>{
    enter.visible=false;
   console.log("start"+ gameState);
   gameState="easy";
  });
    }
  
  if(gameState==="easy")
   {
     console.log(gameState);
      askEasy(quesno);
      
   }
   if(gameState==="medium")
   {
    console.log(gameState);
    askMedium(quesno);
   }
   if(gameState==="hard")
   {
    console.log(gameState);
    askHard(quesno);
   }
   if(gameState==="end")
   {
     endGame();
   }
   
  drawSprites();
}

async function askEasy(ques)
{
  gameState="play";
  console.log(gameState);
  removeElements();
  level=createElement('h3','Level:Easy');
  level.position(windowWidth-200,20);

   rand=Math.round(random(1,15));

  if(checkAsked(rand))
  {
    askedques.push(rand);
  console.log("random:"+rand);
  }
  

  var p=easyarr[rand];
  console.log(p);

  var quesarr;

  quesRef=await database.ref(p).once('value',(data)=>{
    quesarr=data.val();
  });

  console.log(quesarr);

  q1=new Questions(p,quesarr.option1,quesarr.option2,quesarr.option3,quesarr.answer);
  q1.display();
  submit.mousePressed(()=>{
    console.log(answerradio.value());
    q1.result=answerradio.value();
    if(q1.checkAnswer())
    {
      if(quesno===5)
      {
        quesno=1;
        askedques=[];
        gameState="medium";
      }
      else
      {
        quesno++;
        gameState="easy";
      }
      
    }
    else
    {
      removeElements();
      quitGame();
    }
  }); 
}
async function askMedium(ques)
{
  gameState="play";
  console.log(gameState);
  removeElements();
  level=createElement('h3','Level:Medium');
  level.position(350,20);
   
  rand=Math.round(random(1,15));

  if(checkAsked(rand))
  {
    askedques.push(rand);
  console.log("random:"+rand);
  }
  

  var p=mediumarr[rand];
  console.log(p);

  var quesarr;

  quesRef=await database.ref(p).once('value',(data)=>{
    quesarr=data.val();
  });

  console.log(quesarr);

  q1=new Questions(p,quesarr.option1,quesarr.option2,quesarr.option3,quesarr.answer);
  q1.display();
  submit.mousePressed(()=>{
    console.log(answerradio.value());
    q1.result=answerradio.value();
    if(q1.checkAnswer())
    {
      if(quesno===5)
      {
        quesno=0;
        askedques=[];
        gameState="hard";
      }
      else
      {
        quesno++;
        gameState="medium";

      }
      
    }
    else
    {
      removeElements();
      quitGame();
    }
  }); 
}
async function askHard(ques)
{
  gameState="play";
  console.log(gameState);
  removeElements();
  level=createElement('h3','Level:Hard');
  level.position(350,20);
  
   
  rand=Math.round(random(1,15));

  if(checkAsked(rand))
  {
    askedques.push(rand);
    console.log("random:"+rand);
  }
  

  var p=hardarr[rand];
  console.log(p);

  var quesarr;

  quesRef=await database.ref(p).once('value',(data)=>{
    quesarr=data.val();
  });

  console.log(quesarr);

  q1=new Questions(p,quesarr.option1,quesarr.option2,quesarr.option3,quesarr.answer);
  q1.display();
  submit.mousePressed(()=>{
    console.log(answerradio.value());
    q1.result=answerradio.value();
    if(q1.checkAnswer())
    {
      if(quesno===5)
      {
        quesno=0;
        askedques=[];
        gameState="end";
      }
      else
      {
        quesno++;
        gameState="hard";

      }
    }
    else
    {
      removeElements();
      quitGame();
    }
  }); 
}
function quitGame()
{
    removeElements();
    console.log("inside quit");
    greeting1=createElement('h2','SORRY,Your answer is Wrong')
    greeting2=createElement('h2','Better luck next time')
    greeting1.position(50,120);
    greeting2.position(60,160);
    greeting1.style('color','blue');
    greeting2.style('color','blue');
}
function endGame()
{
    removeElements();
    console.log("inside end");
    greeting1=createElement('h2','CONGRATULATIONS!!!')
    greeting2=createElement('h2','You have Completed the Quiz')
    greeting1.position(50,120);
    greeting2.position(60,160);
    greeting1.style('color','blue');
    greeting2.style('color','blue');
}

 async function getEasyQuestions()
{
  var easyRef =await database.ref('easy').once("value",(data)=>
  {
    easyarr=data.val();
  });
  
  for(var i in easyarr)
  {
    console.log(easyarr[i]+i);
  }
}
function checkAsked(r)
{
  console.log("inside checkasked");
  for(var i=0;i<askedques.length;)
  {
    console.log(r);
    console.log(askedques[i]+" i:"+i);
    if(r===askedques[i])
    {
      r=Math.round(random(1,15));
      rand=r
      i=0;
    }
    else
    {
      i++;
    }
  }
  return true;
}
async function getMediumQuestions()
{
  var mediumRef =await database.ref('medium').once("value",(data)=>
  {
    mediumarr=data.val();
  });
  
  for(var i in mediumarr)
  {
    console.log(mediumarr[i]+i);
  }
}
async function getHardQuestions()
{
  var easyRef =await database.ref('hard').once("value",(data)=>
  {
    hardarr=data.val();
  });
  
  for(var i in hardarr)
  {
    console.log(hardarr[i]+i);
  }
}

 