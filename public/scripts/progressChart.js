

var myChart=document.getElementById('progressChart').getContext('2d');

Chart.defaults.global.title.fontFamily="Palatino Linotype";
const createChart=(dataArray,datesArray,chartTitle)=>{
    finalChart= new Chart(myChart,{
        type:'line',
        data:{
            labels:datesArray,
            datasets:[
                {
                    label:'Set 1',
                    data: dataArray,
                    borderColor:'#c71616',
                    fill:false
                }
            ]
        },
        options: {
            responsive: false,
            animation: { duration: 1000 },
            legend: {display:false},
            tooltips: {enabled:false},
            title:{display:true,fontSize:20,padding:5,text:chartTitle},
            scales: {
                yAxes: [{
                    ticks: {
                        fontSize: 8,
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Words per min',
                        fontFamily:"Palatino Linotype"
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




