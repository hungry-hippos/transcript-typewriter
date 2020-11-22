function stringTextToDivs(stringText){
    var lines=document.getElementsByClassName('lyricLine');
    var lyricLineCharCounter=0;
    var firstCharInPage=0;
    var lastVisitedChar=0;

    function getProgressDataFromLocalStorage(){
        //gets url and extracts current workpage name, stores it in currentWorkPage
        const currentUrl=window.location.href;
        var currentWorkPage="";
        var i=currentUrl.length-1;
        while(currentUrl[i]!='/'){
            i--;
        }
        i++;
        while(i<currentUrl.length){
            currentWorkPage+=currentUrl[i];
            i++;
        }
        //gets data from local storage
        const pageSaverString=localStorage.getItem('pageSaverDirectory');
        if (pageSaverString==null){
            firstCharInPage=0;
            lastVisitedChar=0;
        }
        else{
            var pageSaver=JSON.parse(pageSaverString);
            firstCharInPage=pageSaver[currentWorkPage]['firstKeyInPage'];
            lastVisitedChar=pageSaver[currentWorkPage]['lastVisitedCharKey'];
            if (firstCharInPage=='')
                firstCharInPage=0;
            if (lastVisitedChar=='')
                lastVisitedChar=0;
        }

        //sets the initial cursor point on lastVisitedChar
        typeWriter.i=lastVisitedChar-firstCharInPage;
    }
    getProgressDataFromLocalStorage();

    function createNewLine(){
        var newLine=document.createElement('div');
        newLine.classList.add('lyricLine');
        newLine.classList.add('invisible');
        document.getElementById('lyricsGoHere').appendChild(newLine);
        lyricLineCharCounter=0;
    }
    function willNextWordGetChopped(position){
        var nextWordSize=0;
        while (stringText[position+1]!=" "){
            nextWordSize++;
            position++;
        }
        return (nextWordSize+lyricLineCharCounter>80)?true:false;
    }

    //creates lines, starting on the last page user left on
    for (var i=firstCharInPage;i<stringText.length;i++){
        
        //creating an empty char div and adding generic classes
        var charDiv=document.createElement('div');
        charDiv.classList.add('lyricChar');
        charDiv.setAttribute('key',i);
        if (i<=lastVisitedChar && lastVisitedChar!=0){
            charDiv.classList.add('visitedChar');
        }else{
            charDiv.classList.add('unvisitedChar');
        }

        //figuiring out the content of the div (emptySpace,breakLine,letter)
        if (stringText[i]==' '){
            //enters space into div
            charDiv.classList.add('spaceDiv');
            charDiv.textContent=' ';
            lines[lines.length-1].appendChild(charDiv);
            lyricLineCharCounter++;
            if (lyricLineCharCounter>60 && willNextWordGetChopped(i)){
                createNewLine();
            }
        }else if (stringText[i]==='\r'){
            continue;
        }else if (stringText[i]==='\n'){
            //enters break line char
            charDiv.classList.add('breakLine');
            charDiv.textContent='|';
            lines[lines.length-1].appendChild(charDiv);
            
            //creates new lyric line div
            createNewLine();
        }else{
            //if char is an actual character, enters char into div
            charDiv.textContent=stringText[i];
            lines[lines.length-1].appendChild(charDiv);
            lyricLineCharCounter++;

            
        }
    }

    function setLyricLineMargin(){
        var url=window.location.href;
        var lines=document.getElementsByClassName('lyricLine');
        var id='';
        for (var k=url.length-1;url[k]!='/';k--){
            id=url[k]+id;
        }

        if (id=='foxInSocks'){
            for (var j=0;j<lines.length;j++){
                lines[j].style.marginTop='25px';
            }
            document.getElementById('lyricsGoHere').style.padding='20px';
        }
    }
    setLyricLineMargin();
}
    