
//retrieves progress data from pageSaverDirectory in localStorage, fills up progress bars and percent fields


const progressBarsAndPercentsInMenu=()=>{
    let pageSaverDirectoryString=localStorage.getItem('pageSaverDirectory');
    if (pageSaverDirectoryString==null){
        let progressPercents=document.getElementsByClassName('workpageProgressPercent');
        for (var i=0;i<progressPercents.length;i++){
            progressPercents[i].textContent='0%';
        }
    }
    else{
        let pageSaverDirectory=JSON.parse(pageSaverDirectoryString);

        let progressDreams=Math.ceil(pageSaverDirectory.alexJonesDreams.lastVisitedCharKey/7589*100)+"%";
        let progressShades=Math.ceil(pageSaverDirectory.shadesOfGray.lastVisitedCharKey/16399*100)+"%";
        let progressFox=Math.ceil(pageSaverDirectory.foxInSocks.lastVisitedCharKey/4451*100)+"%";
        let progressAxios=Math.ceil(pageSaverDirectory.tonaldDrump.lastVisitedCharKey/19086*100)+"%";

        document.getElementById('dreamsPercent').textContent=progressDreams;
        document.getElementById('shadesPercent').textContent=progressShades;
        document.getElementById('foxPercent').textContent=progressFox;
        document.getElementById('axiosPercent').textContent=progressAxios;

        document.getElementById('dreamsBar').style.width=progressDreams;
        document.getElementById('shadesBar').style.width=progressShades;
        document.getElementById('foxBar').style.width=progressFox;
        document.getElementById('axiosBar').style.width=progressAxios;

        const startBtns=document.getElementsByClassName('continue');
        if (progressDreams!='0%'){
            startBtns[0].textContent="CONTINUE";
            startBtns[0].nextElementSibling.classList.remove('hidden');
        }
        if (progressShades!='0%'){
            startBtns[1].textContent='CONTINUE';
            startBtns[1].nextElementSibling.classList.remove('hidden');
        }
        if (progressFox!='0%'){
            startBtns[2].textContent='CONTINUE';
            startBtns[2].nextElementSibling.classList.remove('hidden');
        }
        if (progressAxios!='0%'){
            startBtns[3].textContent='CONTINUE';
            startBtns[3].nextElementSibling.classList.remove('hidden');
        }
    }
}

progressBarsAndPercentsInMenu();

const resetProgress=(title)=>{
    //downloads pageSaver and resets the corresponding fields
    const pageSaverString=localStorage.getItem('pageSaverDirectory');
    var pageSaver=JSON.parse(pageSaverString);
    pageSaver[title]['firstKeyInPage']=0;
    pageSaver[title]['lastVisitedCharKey']=0;
    pageSaver=JSON.stringify(pageSaver);
    localStorage.setItem('pageSaverDirectory',pageSaver);

    //re-renders progress bars and shit to 0%
    progressBarsAndPercentsInMenu();
}

const hideReset=(event)=>{
    event.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.add('hidden');
    event.target.previousElementSibling.previousElementSibling.classList.add('hidden');
    event.target.previousElementSibling.classList.add('hidden');
    event.target.classList.add('hidden');

    event.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent="START";
    
    
}

document.getElementById('resetDreams').addEventListener('click',(event)=>{resetProgress('alexJonesDreams');hideReset(event)});
document.getElementById('resetShades').addEventListener('click',(event)=>{resetProgress('shadesOfGray');hideReset(event)});
document.getElementById('resetFox').addEventListener('click',(event)=>{resetProgress('foxInSocks');hideReset(event)});
document.getElementById('resetAxios').addEventListener('click',(event)=>{resetProgress('tonaldDrump');hideReset(event)});




//retrives testResults from local storage, passes data into progress charts
const testResultsString=localStorage.getItem('testResults');
const testResults=JSON.parse(testResultsString);

if (testResults.oneMin.results.length!=0){
    document.getElementById('oneMin').removeAttribute('disabled');
}
if (testResults.threeMin.results.length!=0){
    document.getElementById('threeMin').removeAttribute('disabled');
}
if (testResults.fiveMin.results.length!=0){
    document.getElementById('fiveMin').removeAttribute('disabled');
}
if (testResults.tenMin.results.length!=0){
    document.getElementById('tenMin').removeAttribute('disabled');
}

document.getElementById('oneMin').addEventListener('click',()=>{
    createChart(testResults.oneMin.results,testResults.oneMin.dates,testResults.oneMin.title);
})
document.getElementById('threeMin').addEventListener('click',()=>{
    createChart(testResults.threeMin.results,testResults.threeMin.dates,testResults.threeMin.title);
})
document.getElementById('fiveMin').addEventListener('click',()=>{
    createChart(testResults.fiveMin.results,testResults.fiveMin.dates,testResults.fiveMin.title);
})
document.getElementById('tenMin').addEventListener('click',()=>{
    createChart(testResults.tenMin.results,testResults.tenMin.dates,testResults.tenMin.title);
})



/* shows reset confirmation and yes/no buttons */
var resetbtns=document.getElementsByClassName('reset');
        for (var i=0;i<resetbtns.length;i++){
            resetbtns[i].addEventListener('click',(event)=>{
                
                var sure=event.target.nextElementSibling;
                var yes=sure.nextElementSibling;
                var no=yes.nextElementSibling;

                event.target.classList.add('hidden');
                sure.classList.remove('hidden');
                yes.classList.remove('hidden');
                no.classList.remove('hidden');
                
            })
        }
        var yesbtns=document.getElementsByClassName('yes');
        for (var i=0;i<yesbtns.length;i++){
            yesbtns[i].addEventListener('mouseover',(event)=>{
                event.target.classList.remove('black');
                event.target.previousElementSibling.classList.add('black');  
            })
        }
        var nobtns=document.getElementsByClassName('no');
        for (var i=0;i<nobtns.length;i++){
            nobtns[i].addEventListener('mouseover',(event)=>{
                event.target.classList.remove('black');
                event.target.nextElementSibling.classList.add('black');  
            })
            nobtns[i].addEventListener('click',(event)=>{
                event.target.previousElementSibling.previousElementSibling.classList.remove('hidden');
                event.target.previousElementSibling.classList.add('hidden');
                event.target.nextElementSibling.classList.add('hidden');
                event.target.classList.add('hidden');
            })
        }


    //controls scrolling motion on notepad
    var notepad=document.getElementById('notepadContent');
    var scrollDown=document.getElementById('scrollDown');
    scrollDown.addEventListener('mouseover',()=>{
        notepad.scrollTop=390;
        
        scrollDown.classList.toggle('blackDiv');
        scrollDown.classList.toggle('grayDiv');
        scrollDown.innerHTML='&#10224;';
    });
    scrollDown.addEventListener('mouseout',()=>{
        notepad.scrollTop=0;
        scrollDown.classList.toggle('grayDiv');
        scrollDown.classList.toggle('blackDiv');
        scrollDown.innerHTML='&#10225;';
    });

    // enables menu/your progress tabs
    const openMenu=()=>{
        document.getElementById('menuTab').classList.add('clickedTab');
        document.getElementById('menuSection').classList.remove('hidden');
        document.getElementById('progressSection').classList.add('hidden');
        document.getElementById('progressTab').classList.remove('clickedTab');
    };
    const openProgress=()=>{
        document.getElementById('progressTab').classList.add('clickedTab');
        document.getElementById('menuSection').classList.add('hidden');
        document.getElementById('progressSection').classList.remove('hidden');
        document.getElementById('menuTab').classList.remove('clickedTab');

        //see if any btn is not disabled (meaning that data exists for that test), and generate chart of
        //first non-disabled btn
        const timeBtns=document.getElementsByClassName('testBtn');
        for (var i=0;i<timeBtns.length;i++){
            if (timeBtns[i].hasAttribute('disabled')){
                continue;
            }
            timeBtns[i].click();
            break;
        }
    }

    
//checks in localStorge if we just come from completing a test. If true, opens up corresponding progress chart. Else, opens up menu
var lastTestString=localStorage.getItem('lastTest');
var progressTab=document.getElementById('progressTab');
switch (lastTestString){
    case null:
        document.getElementById('menuTab').click();
        break;
    case "1":
        progressTab.click();
        document.getElementById('oneMin').click();
        localStorage.removeItem('lastTest');
        break;
    case "3":
        progressTab.click();
        document.getElementById('threeMin').click();
        localStorage.removeItem('lastTest');
        break;
    case "5":
        progressTab.click();
        document.getElementById('fiveMin').click();
        localStorage.removeItem('lastTest');
        break;
    case "10":
        progressTab.click();
        document.getElementById('tenMin').click();
        localStorage.removeItem('lastTest');
        break;
}