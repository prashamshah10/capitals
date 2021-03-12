class Questions
{
    constructor(place,op1,op2,op3,answer)
    {
        this.place=place;
        this.option1=op1;
        this.option2=op2;
        this.option3=op3;
        this.answer=answer;
        this.result=null;

    }

    display()
    {
        console.log("inside display");
        question=createElement('h1','What is the Capital of '+this.place+'?');
        question.position(windowWidth/2-100,100);
        question.style('color','brown');
        
        
        answerradio=createRadio();
        answerradio.option(this.option1);
        answerradio.option(this.option2);
        answerradio.option(this.option3);
        answerradio.position(windowWidth/2-100,200);
        answerradio.style('color','red');
        answerradio.style('font-size','30px');
        //textAlign(CENTER);
        
        submit=createButton('Submit');
        submit.position(windowWidth/2+100,windowHeight-300);
        submit.style('color','blue');
        submit.style('font-size','20px');
        submit.size(80);
    }
    checkAnswer()
    {
        console.log("inside check answer");
        if(this.result===this.answer)
        {
            return true;
        }
        else
        {
            return false;
        }
        
    }

}