//timers. All start functions are in typeWriter.js 
var timeBar={
    startTime:0,
    timeStarted:false,
    start(time){
        if (!timeBar.timeStarted){
            timeBar.startTime=Date.now();
            timeBar.timeStarted=true;
        }
        var timeElapsed=(Date.now()-timeBar.startTime)/1000;
        if (timeElapsed<time){
            var bar=document.getElementById('timeBarTop');
            var ratio=timeElapsed/time*100+'%';
            bar.style.width=ratio;
            setTimeout(()=>{timeBar.start(time)},100)
        }  
    },
    static(){
        var bar=document.getElementById('timeBarTop');
        bar.style.width='100%';
    }
}
timeBar.static();

var clock={
    draw(time,α,static) {
        var loader = document.getElementById('loader')
        var border = document.getElementById('border')
        var π = Math.PI;
        if (static==false)
            α--;
        α %= 360;
        var r = ( α * π / 180 )
        var x = Math.sin( r ) * 100
        var y = Math.cos( r ) * - 100
        var mid = ( α > 180 ) ? 1 : 0
        var anim = 'M 0 0 v -100 A 100 100 1 ' 
                + mid + ' 1 ' 
                +  x  + ' ' 
                +  y  + ' z';
        
        loader.setAttribute( 'd', anim );
        border.setAttribute( 'd', anim );
        if (static==false && α!=0)
            setTimeout(()=>{clock.draw(time,α,false)}, time*2.78);
    },
    static(){
        clock.draw(2,359.9,true);
    },
    start(time){
        clock.draw(time,360,false);
    }
};
clock.static();

//the code that sets the initial content is in the button event listeners in workpage.ejs
var timeDown={
    allotedTime:0,
    allotedSec:0,
    startTime:0,
    intervalCode:0,
    setAllotedTime(time){
        timeDown.allotedSec=time;
        var stringTime;
        if (time==60)
            stringTime='01:00';
        if (time==180)
            stringTime='03:00';
        if (time==300)
            stringTime='05:00';
        if (time==600)
            stringTime='10:00';
        if (time=='NO'){
            stringTime='LOTS';
            document.getElementById('timeBoard').textContent=stringTime;
            document.getElementById('timeBoard').style.fontSize='50px';
            timeDown.allotedTime=stringTime;
            return;
        }
        timeDown.allotedTime=stringTime;
        document.getElementById('timeBoard').textContent=stringTime;
    },
    start(){
        timeDown.startTime=Date.now();
        timeDown.intervalCode=setInterval(timeDown.updatedBoard,100);
    },
    updatedBoard(){
        var secElapsed=(Date.now()-timeDown.startTime)/1000;
        var secRemaining=timeDown.allotedSec-secElapsed;
        var mins=secRemaining/60;
        var secs=secRemaining%60;
        if (secs<10)
            var stringTime='0'+Math.floor(mins)+':0'+Math.floor(secs);
        else
            var stringTime='0'+Math.floor(mins)+':'+Math.floor(secs);
        document.getElementById('timeBoard').textContent=stringTime;
        //when time runs out...
        if (stringTime=='00:00'){
            clearInterval(timeDown.intervalCode);
        }
    }
}