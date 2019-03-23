import 'chartjs-plugin-colorschemes';
import Chart from 'chart.js';

let audio1 = document.createElement('audio');
let audio2 = document.createElement('audio');
let flag=1;

var ctx = document.getElementById("resultChart");
let myChart;

function createchart(type,data) {
    if (ctx != null) {
		if (myChart) {
			myChart.destroy();
		}
        myChart = new Chart(ctx, {
            type: type,
            data:data,
            options: {
                plugins: {
                    colorschemes: {
                        scheme: 'brewer.Pastel2-3'
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
            }
        });
    }
}

function charttype_score(type,resu){
	//console.log(type);
    let data;
	let resuscore=[];
	for(let s of resu[0]){
		resuscore.push(s*10);
	}
    let databar={
        labels:["right","wrong","unfinished"],
        datasets: [{
            label: '#number of problem',
            data: [resu[1][0],resu[1][3],10-resu[1][0]-resu[1][3]]
        }]
    };
    let datapie={
        labels:["wrong pinyin","wrong character","right"],
        datasets: [{
            label: '#number of problem',
            data: [resu[1][1],resu[1][2],resu[1][0]]
        }]
    };
    let dataline={
        labels:["1","2","3","4","5","6","7","8","9","10"],
        datasets: [{
            label: 'point of this problem',
            data: resuscore
        }]
    };
    switch(type){
        case "bar":data=databar;
            break;
        case "line":data=dataline;
            break;
        case "pie":data = datapie;
            break;
		default: //console.log(type);
    }
	//console.log(data);
    return data;
}


function charttype_userhistory(resu){
//TODO
}

function charttype_userlogin(resu){
 //TODO
}

function playaudio(py){
	setaudio(py[0],audio1);
	setTimeout(() => {
		setaudio(py[1],audio1);
    }, 2000);
}

//player without button
function setaudio(py,ad){
	let audioname=(py[0]==""?(py[1]+py[2]):py[0]);
    audio1.setAttribute('src', "../audio/"+audioname+".mp3");
    audio1.playbackRate=3;
    if(py[0]!=""&&py[1]!="") {
        audio2.setAttribute('src', "../audio/"+py[1]+py[2]+".mp3");
        audio2.playbackRate=1.3;
        flag=2;
		audio1.play();
        setTimeout(() => {
             audio2.play();
        }, 75);
    }else{ 
		flag=1;
		audio2.removeAttribute('src');
		audio1.play();
	}
}
//single audio player
function setAudioButton(name,button){
	let audio = document.createElement('audio');
    audio.setAttribute('src', "../audio/"+name+".mp3");
	$(button).click(()=>{
		audio.play();
	})
}


export {createchart,charttype_score,charttype_userlogin,charttype_userhistory,playaudio,setAudioButton};

