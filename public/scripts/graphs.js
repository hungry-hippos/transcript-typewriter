

var graphFiveSec={
    speeds:speedStats.fiveSecSpeeds,
    collectionTimes:[],
    timeElapsed:0,
    intTimeToString(time){
        var mins=time/60;
        var secs=time%60;
        var firstDigit=(mins<10)?0:Math.floor(mins/10);
        var secondDigit=(mins<10)?Math.floor(mins):(Math.floor(mins)%10);
        var thirdDigit=(secs<10)?0:Math.floor(secs/10);
        var fourthDigit=(secs<10)?Math.floor(secs):(Math.floor(secs)%10)
        var numString=firstDigit.toString()+secondDigit.toString()+":"+thirdDigit.toString()+fourthDigit.toString();
        return numString;
    },
    setCollectionTimes(){
        var allottedTime=speedStats.allottedTime;
        if (allottedTime=="NO"){
            setInterval(()=>{
                if (graphFiveSec.collectionTimes.length==0){
                    graphFiveSec.collectionTimes.push('00:00');
                }else{
                    var stringTime=graphFiveSec.intTimeToString(graphFiveSec.timeElapsed);
                    graphFiveSec.collectionTimes.push(stringTime);
                }
                graphFiveSec.timeElapsed+=5;
            },5000);

        }else{
            for (var i=0;i<=allottedTime;i+=5){
                var numString=graphFiveSec.intTimeToString(i);
                graphFiveSec.collectionTimes.push(numString);
            }
        }
    },
    createChart(){
        console.log(graphFiveSec.speeds);
        console.log(graphFiveSec.collectionTimes);
        var myFinalChart=document.getElementById('finalGraph').getContext('2d');
        var finalChart= new Chart(myFinalChart,{
            type:'line',
            data:{
                labels:graphFiveSec.collectionTimes,
                datasets:[
                    {
                        label:'Set 1',
                        data: graphFiveSec.speeds,
                        borderColor:'#c71616',
                        fill:false
                    }
                ]
            },
            options: {
                responsive: false,
                animation: { duration: 0 },
                legend: {display:false},
                tooltips: {enabled:false},
                scales: {
                    yAxes: [{
                        ticks: {
                            fontSize: 8
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Words per min'
                        }
                    }],    
                    xAxes: [{
                        ticks: {
                            fontSize: 8
                        }
                    }]
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10
                    }
                }
            }
        })
    }
}
