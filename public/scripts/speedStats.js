var speedStats={
    startTime:'',
    allottedTime:0,
    lastWordCounter:0,
    intervalCodes:[],

    fiveSecSpeeds:[0],
    tenSecSpeeds:[],
    lastWordCounter5Sec:0,

    start(){
        graphFiveSec.setCollectionTimes();
        speedStats.startTime=Date.now();
        //show avg rate every 10s
        var code= setInterval(function(){
            var avgRate=document.getElementById('avgRate');
            var num=typeWriter.wordCounter*60/speedStats.getElapsedTime();
            avgRate.textContent=num.toFixed(0);            
        },10000);
        speedStats.intervalCodes.push(code);

        //show 10 rate every 10s
        code=setInterval(function(){
            var tenSecRate=document.getElementById('tenSecRate');
            var num=(typeWriter.wordCounter-speedStats.lastWordCounter)*6;
            tenSecRate.textContent=num.toFixed(0);
            speedStats.lastWordCounter=typeWriter.wordCounter;
            speedStats.tenSecSpeeds.push(num);
        },10000);
        speedStats.intervalCodes.push(code);

        //does charting every 5s
        code= setInterval(function(){
            //stores new speed in speeds[]
            var wordsTyped=typeWriter.wordCounter-speedStats.lastWordCounter5Sec;
            var speed=wordsTyped*12;
            speedStats.lastWordCounter5Sec=typeWriter.wordCounter;
            speedStats.fiveSecSpeeds.push(speed);
                        
            //creates new chart
            graphFiveSec.createChart();
        },5000);
        speedStats.intervalCodes.push(code);

        //stops all monitors when time runs out
        if (speedStats.allottedTime!='NO'){
            setTimeout(speedStats.stop,speedStats.allottedTime*1000);
        }
    },
    stop(){
        for (var i=0;i<3;i++){
            clearInterval(speedStats.intervalCodes[i]);
        }
        console.log(speedStats.allottedTime+' Times UP');
    },
    getElapsedTime(){
        var deltaT=(Date.now()-speedStats.startTime)/1000;
        return deltaT.toFixed(1);
    }
}