var finalReport={
    testTime:0,
    showReport(){
        document.getElementById('fadedBackground').classList.remove('invisible');
        document.getElementById('finalReport').classList.remove('invisible');
    },
    //update accuracy stats
    accuracy(){
        var correct=document.getElementById('correctKeyStrokesDisplay');
        var wrong=document.getElementById('incorrectKeyStrokesDisplay');
        var percent=document.getElementById('percentAccuracyDisplay')
        setTimeout(()=>{
            correct.textContent=typeWriter.correctKeyStrokes;
            wrong.textContent=typeWriter.incorrectKeyStrokes;
            var percentNum=typeWriter.correctKeyStrokes/(typeWriter.correctKeyStrokes+typeWriter.incorrectKeyStrokes);
            percentNum=percentNum*100;
            percentNum=percentNum.toFixed(0);
            percent.textContent=percentNum+'%';
        },finalReport.testTime*1000);
    },
    rates(){
        var tenSec=document.getElementById('tenSecRateDisplay');
        var avg=document.getElementById('avgSpeedDisplay');
        var global=document.getElementById('globalRankingDisplay');
        global.textContent='TOP '+(Math.random()*100).toFixed(0)+'%';
        setTimeout(()=>{
            tenSec.textContent=Math.max(...speedStats.tenSecSpeeds);
            avg.textContent=document.getElementById('avgRate').textContent;
        },finalReport.testTime*1000)
    },
    setTimer(time){
        finalReport.testTime=time;
        finalReport.accuracy();
        finalReport.rates();
    },
    startTimer(){
        if (finalReport.testTime=='NO')
            return;
        setTimeout(toggleFinalRep,finalReport.testTime*1000);
    }
}
