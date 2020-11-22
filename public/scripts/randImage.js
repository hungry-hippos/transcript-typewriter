const backgroundImages={
    index:0,
    //the name of the array must match the url id to load images 
    foxInSocks:[
        {
            url:'url(../images/DrSeuss/fox.jpg)',
            size:'100% 100%',
            pos:'0 0'
        },
        {
            url:'url(../images/DrSeuss/foxBlackAndWhite.jpg)',
            size:'100% 100%',
            pos:'0 0'
        },
        {
            url:'url(../images/DrSeuss/foxClocks.png)',
            size:'70% 110%',
            pos:'140% 20%'
        },
        {
            url:'url(../images/DrSeuss/foxJumps.jpeg)',
            size:'100% 100%',
            pos:'0 0'
        },
        {
            url:'url(../images/DrSeuss/sue.png)',
            size:'70% 140%',
            pos:'400px 0%'
        },
        {
            url:'url(../images/DrSeuss/niceFox.jpg)',
            size:'100% 100%',
            pos:'0 0'
        },
        {
            url:'url(../images/DrSeuss/coolFox.jpg)',
            size:'100% 120%',
            pos:'0% -60px'
        },
        {
            url:'url(../images/DrSeuss/knox.png)',
            size:'110% 150%',
            pos:'0 -50px'
        }
    ],
    alexJonesDreams:[
        {
            url:'url(../images/AlexJones/suit.jpg)',
            size:'100% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/AlexJones/pointing.jpg_fit=scale)',
            size:'130% 100%',
            pos:'-100px 0',
        },
        {
            url:'url(../images/AlexJones/idk.jpg)',
            size:'130% 100%',
            pos:'-130px 0',
        },
        {
            url:'url(../images/AlexJones/gayFrog69.jpg)',
            size:'100% 100%',
            pos:'0px 0',
        },
        {
            url:'url(../images/AlexJones/moreGayFrogs.jpg)',
            size:'100% 160%',
            pos:'0 -200px',
        },
        {
            url:'url(../images/AlexJones/tinFoil.jpg)',
            size:'100% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/AlexJones/flexing.jpg)',
            size:'140% 100%',
            pos:'-150px 0',
        },
        {
            url: 'url(../images/AlexJones/fire.jpg)',
            size: '100% 140%',
            pos: '0 -70px'
        }
    ],
    shadesOfGray:[
        {
            url:'url(../images/bobRoss/happy.jpg)',
            size:'100% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/bobRoss/chill.jpg)',
            size:'100% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/bobRoss/gangsta.jpg)',
            size:'100% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/bobRoss/posing.jpg)',
            size:'110% 120%',
            pos:'0 0',
        },
        {
            url:'url(../images/bobRoss/young.jpg)',
            size:'100% 100%',
            pos:'0 0',
        }
    ],
    tonaldDrump:[
        {
            url:'url(../images/trump/attentive.jpg)',
            size:'110% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/trump/charts.jpg)',
            size:'100% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/trump/confusion.jpg)',
            size:'110% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/trump/graphs.jpg)',
            size:'100% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/trump/profile.jpg)',
            size:'140% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/trump/tongue.jpg)',
            size:'120% 100%',
            pos:'0 0',
        },
        {
            url:'url(../images/trump/what.jpg)',
            size:'120% 100%',
            pos:'0 0',
        }
    ],
    //function is called inside of flipPageMonitor function in typeWriter.js
    changeBackgroundImage(id){
        if (backgroundImages.index==backgroundImages[id].length)
            backgroundImages.index=0;
        var background=document.getElementById('backgroundImage');
        background.style.backgroundImage=backgroundImages[id][backgroundImages.index]['url'];
        background.style.backgroundSize=backgroundImages[id][backgroundImages.index]['size'];
        background.style.backgroundPosition=backgroundImages[id][backgroundImages.index]['pos'];
        backgroundImages.index++;
    },
    cycle(arrayName){
        setInterval(()=>{
            backgroundImages.changeBackgroundImage(arrayName);
        },5000)
    },
    //sets initial backgroundPic
    setInitialBackground(){
        var url=window.location.href;
        var id='';
        for (var i=url.length-1;url[i]!='/';i--){
            id=url[i]+id;
        }
        var background=document.getElementById('backgroundImage');
        background.style.transition='0s';
        backgroundImages.changeBackgroundImage(id);
        setTimeout(()=>{
            background.style.transition='2s';
        },100); 
    },
    shuffleImageArr(){
        var url=window.location.href;
        var id='';
        for (var i=url.length-1;url[i]!='/';i--){
            id=url[i]+id;
        }

        for (var i=0;i<backgroundImages[id].length;i++){
            var num=Math.floor((Math.random()*backgroundImages[id].length));
            var temp=backgroundImages[id][i];
            backgroundImages[id][i]=backgroundImages[id][num];
            backgroundImages[id][num]=temp;
        }
    },
    

}
backgroundImages.shuffleImageArr();
backgroundImages.setInitialBackground();
