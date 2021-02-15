var typeWriter={
    allChars:[],
    wordCounter:0,
    //current char key. I know, awful name. Sorry.
    i:0,
    isFirstKey:true,
    errorBrake:false,
    testDuration:0,
    correctKeyStrokes:0,
    incorrectKeyStrokes:0,
    unveilFirstLines(){
        var lines=document.getElementsByClassName('lyricLine');
        for (var t=0;t<10;t++){
            lines[t].classList.remove('invisible');
            lines[t].classList.add('currentPage');
            if (t==lines.length-1)
                break;
        }
        //marking last visible char on page as a flag to trigger a pageFlip()
        var currentPageLines=document.getElementsByClassName('currentPage');
        var lastLineInPage=currentPageLines[currentPageLines.length-1];
        var lastCharInPage=lastLineInPage.lastChild;
        lastCharInPage.classList.add('lastChar');
    },
    deleteFirstLines(){
        var visibleLines=document.getElementsByClassName('currentPage');
        while(visibleLines.length>0){
            visibleLines[0].remove();
        }
    },
    flipPageMonitor(){
        if (typeWriter.allChars[typeWriter.i].classList.contains('lastChar')){
            //uploads new text
            typeWriter.deleteFirstLines();
            typeWriter.unveilFirstLines();
            typeWriter.i=-1;

            //extracts :id from url and passes it to randImage.js to change background image
            var url=window.location.href;
            var id='';
            for (var k=url.length-1;url[k]!='/';k--){
                id=url[k]+id;
            }
            backgroundImages.changeBackgroundImage(id);
        }
    },
    rightInput(){
        typeWriter.allChars[typeWriter.i].classList.add('visitedChar');
        typeWriter.allChars[typeWriter.i].classList.remove('unvisitedChar');
        typeWriter.allChars[typeWriter.i].classList.remove('currentChar');
        typeWriter.allChars[typeWriter.i].classList.remove('visitedWrongChar');
        typeWriter.correctKeyStrokes++;
        if (typeWriter.allChars[typeWriter.i].textContent==' '){
            typeWriter.allChars[typeWriter.i].classList.add('correctSpaceDiv');
            typeWriter.allChars[typeWriter.i].classList.remove('spaceDiv');
            typeWriter.allChars[typeWriter.i].classList.remove('wrongSpaceDiv');
        }
        typeWriter.flipPageMonitor();
        if (typeWriter.i<typeWriter.allChars.length-1){
            typeWriter.i++;
            typeWriter.allChars[typeWriter.i].classList.add('currentChar');
        }
    },
    backspaceInput(){
        if (typeWriter.errorBrake==true)
            return;
        if(typeWriter.i>0)
            typeWriter.i--;
        typeWriter.allChars[typeWriter.i].classList.remove('visitedChar');
        typeWriter.allChars[typeWriter.i].classList.remove('visitedWrongChar');
        if (typeWriter.allChars[typeWriter.i].textContent==' '){
            typeWriter.allChars[typeWriter.i].classList.remove('wrongSpaceDiv');
            typeWriter.allChars[typeWriter.i].classList.remove('correctSpaceDiv');
            typeWriter.allChars[typeWriter.i].classList.add('spaceDiv');
        }
        typeWriter.allChars[typeWriter.i].classList.add('unvisitedChar');
        typeWriter.allChars[typeWriter.i].classList.add('currentChar');
        typeWriter.allChars[typeWriter.i+1].classList.remove('currentChar');
        
    },
    wrongInput(){
        typeWriter.allChars[typeWriter.i].classList.add('visitedWrongChar');
        typeWriter.allChars[typeWriter.i].classList.remove('unvisitedChar');
        typeWriter.allChars[typeWriter.i].classList.remove('currentChar');
        typeWriter.incorrectKeyStrokes++;
        if (typeWriter.allChars[typeWriter.i].textContent==' ' && typeWriter.errorBrake==false){
            typeWriter.allChars[typeWriter.i].classList.add('wrongSpaceDiv');
            typeWriter.allChars[typeWriter.i].classList.remove('spaceDiv');
        }
        typeWriter.flipPageMonitor();
        if (typeWriter.i<typeWriter.allChars.length-1 && typeWriter.errorBrake==false){
            typeWriter.i++;
            typeWriter.allChars[typeWriter.i].classList.add('currentChar');
        }
    },
    addKeyFunctionality(){
        this.allChars=document.getElementsByClassName('lyricChar');
        this.allChars[this.i].classList.add('currentChar');
        
        document.addEventListener('keydown',function(e){
            document.getElementById('startTypingMessage').classList.add('invisible');
            if(e.key=='Shift'){
            }else if (e.key=='Backspace' && typeWriter.i>=0){
                typeWriter.backspaceInput();
            }else if (e.key=='Enter' && typeWriter.allChars[typeWriter.i].textContent=='|'){
                typeWriter.rightInput();
                typeWriter.wordCounter++;
            }else if (e.code=='Space' && typeWriter.allChars[typeWriter.i].textContent==' '){
                typeWriter.rightInput();
                typeWriter.wordCounter++;
            }else if(e.key==typeWriter.allChars[typeWriter.i].textContent){
                typeWriter.rightInput();	
            }else{
                typeWriter.wrongInput();
            }
            if (typeWriter.isFirstKey){
                typeWriter.isFirstKey=false;
                speedStats.start();
                if (typeWriter.testDuration=='NO'){
                    timeBar.static();
                    clock.static();
                }else{ 
                    timeBar.start(typeWriter.testDuration);
                    timeDown.start();
                    finalReport.startTimer();
                }
            }
        })
    }
}

window.addEventListener('keydown', function(e) {
    if(e.code == 'Space' && e.target == document.body) {
      e.preventDefault();
    }
});