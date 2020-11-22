// below functions are all used to save avg rate,date, and test type into localStorage

var testResultsEmptyTemplate={
    oneMin:{
        results:[],
        dates:[],
        title:"1 Min Results"
    },
    threeMin:{
        results:[],
        dates:[],
        title:"3 Min Results"
    },
    fiveMin:{
        results:[],
        dates:[],
        title:"5 Min Results"
    },
    tenMin:{
        results:[],
        dates:[],
        title:"10 Min Results"
    }
}

const pushDataToObject=(score,date,type,testObject)=>{
    switch (type){
        case 1:
            testObject.oneMin.results.push(score);
            testObject.oneMin.dates.push(date);
            break;
        case 3:
            testObject.threeMin.results.push(score);
            testObject.threeMin.dates.push(date);
            break;
        case 5:
            testObject.fiveMin.results.push(score);
            testObject.fiveMin.dates.push(date);
            break;
        case 10:
            testObject.tenMin.results.push(score);
            testObject.tenMin.dates.push(date);
            break;
    }
    return testObject;
}

//function to upload/update testResults into localStorage
const uploadData=(score,date,type)=>{
    const testResultsString=localStorage.getItem('testResults');
    var resultsForUpload={};
    if (testResultsString==null){
        resultsForUpload=pushDataToObject(score,date,type,testResultsEmptyTemplate);
    }
    else{
        var testResultsParsed=JSON.parse(testResultsString);
        resultsForUpload=pushDataToObject(score,date,type,testResultsParsed);
    }
    const resultsForUploadString=JSON.stringify(resultsForUpload);
    localStorage.setItem('testResults',resultsForUploadString);
}

//grabs data from finalReport, passes it to uploadData
const getAndUploadData=()=>{

    //grabs and uploads avg rate, date, and type of test 
    var testRate=document.getElementById('avgSpeedDisplay').textContent;
    testRate=parseInt(testRate,10);
    var testDuration=document.getElementById('reportTitleTime').textContent;
    testDuration=parseInt(testDuration,10);
    var testDate=formattedDate();

    uploadData(testRate,testDate,testDuration);

    
}
function formattedDate(){
    var result="";
    var d = new Date();
    result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
    return result;
}

// below functions are all used to save whre you left off
var pageSaverEmptyTemplate={
    alexJonesDreams:{
        firstKeyInPage:'',
        lastVisitedCharKey:''
    },
    shadesOfGray:{
        firstKeyInPage:'',
        lastVisitedCharKey:''
    },
    foxInSocks:{
        firstKeyInPage:'',
        lastVisitedCharKey:''
    },
    tonaldDrump:{
        firstKeyInPage:'',
        lastVisitedCharKey:''
    },
}

const getLastCharKey=()=>{
    //grabs and uploads last char key visited to pick up where you left off
    const visited=document.getElementsByClassName('visitedChar');
    const lastVisitedCharKey=visited[visited.length-1].getAttribute('key');
    return lastVisitedCharKey;
}
const getFirstKeyInPage=()=>{
    const currentPageLines=document.getElementsByClassName('currentPage');
    const firstCharKey=currentPageLines[0].firstElementChild.getAttribute("key");
    return firstCharKey;
}


const saveLastCharIntoPageSaver=()=>{
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

    //looks into localStorage for a pageSaverDirectory object
    //if not found, takes template, inserts last char, and uploads
    //if found, parses it, updates it, and uploads it
    const pageSaverString=localStorage.getItem('pageSaverDirectory');
    const lastCharKey=getLastCharKey();
    const firstCharKey=getFirstKeyInPage();
    if (pageSaverString==null){
        pageSaverEmptyTemplate[currentWorkPage]['lastVisitedCharKey']=lastCharKey;
        pageSaverEmptyTemplate[currentWorkPage]['firstKeyInPage']=firstCharKey;
        pageSaverEmptyTemplate=JSON.stringify(pageSaverEmptyTemplate);
        localStorage.setItem('pageSaverDirectory',pageSaverEmptyTemplate);
    }
    else{
        var pageSaver=JSON.parse(pageSaverString);
        pageSaver[currentWorkPage]['lastVisitedCharKey']=lastCharKey;
        pageSaver[currentWorkPage]['firstKeyInPage']=firstCharKey;
        pageSaver=JSON.stringify(pageSaver);
        localStorage.setItem('pageSaverDirectory',pageSaver);
    }
}




