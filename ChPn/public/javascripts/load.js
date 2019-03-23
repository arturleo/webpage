import * as util from "./util";
let resultdata;
let userlogindata;
let userhistorydata;
//================menu=========================
const url = require('url');
const myURL = new URL(window.location.href).pathname;
let path=myURL.substr(myURL.lastIndexOf('/')+1);

if (path != "") {
    $("aside .mdc-list-item").removeClass("mdc-list-item--activated");//TODO ajax reload
    $("aside ." + path).addClass("mdc-list-item--activated");
    //console.log(path);
	if (!$("aside ." + path).length){
		$("aside .home").addClass("mdc-list-item--activated");
	}
}
//==================chart type========================
let userhistorytype="line";
let userhistoryspan="month";
let resulttype="line";
if($(".div-user-history #type-menu")[0]!=null){
	$(".div-user-history #type-menu")[0].addEventListener('MDCMenu:selected', function(evt) {
		var detail = evt.detail;
		userhistorytype = detail.item.textContent.trim().toLowerCase();
		//if(userhistorydata!=null)util.
	});
}

if($(".div-user-history #span-menu")[0]!=null){
	$(".div-user-history #span-menu")[0].addEventListener('MDCMenu:selected', function(evt) {
		var detail = evt.detail.toLowerCase();
		userhistoryspan = detail.item.textContent.trim().toLowerCase();
		//TODO
		//ajax here
		//if(userhistorydata!=null)
	});
}

	//console.log($(".card-result-first #type-menu"));
if($(".card-result-first #type-menu")[0]!=null){
	//console.log("clicked");
	$(".card-result-first #type-menu")[0].addEventListener('MDCMenu:selected', function(evt) {
		//console.log("clicked");
		var detail = evt.detail;
		resulttype = detail.item.textContent.trim().toLowerCase();
		if(resultdata!=null){
			//console.log(resultdata);
			util.createchart(resulttype,
			util.charttype_score(
				resulttype,
				resultdata
			));
		}
	});
}

//==================result========================
let chartcon=[];

$("#getresult button").click(()=>{
	$(".card-result-first").removeClass("hidethis");
	$("#problem-area").addClass("hidethis");
	var ans=[];
    for(let i=0;i<10;i++) {
        for (let j = 0; j < 4; j++) {
			//console.log($("#radio-"+i+"-"+j),i,j);
            if($("#radio-"+i+"-"+j)[0].checked) {
                ans.push(j);
				//console.log(i,j);
                break;
            }
            if(j==3){
				ans.push(4);
				//console.log("undone",i,j);
			};
        }
    }
    //console.log("count",contout);
    $.ajax({
        type: 'GET',
        url: '/server/api/result',
        data: {data:JSON.stringify(ans)},
        dataType: "json",
        success: function(result) {
            //console.log(type,result.result);
            //console.log(type,choosetype(result.result));
			var score=result.score;
			resultdata=result.result;
			var inform=score>50 ? "Congratulations!":"Sorry! Please work harder.";
			$(".card-result-first #resultmessage").text(inform +" Your score is "+score+" !");
            util.createchart(resulttype,util.charttype_score(resulttype,result.result));
        }
    });
});
//------------------ratio---------------------------
var choose = document.querySelectorAll(".choose");
for(let ind=0;ind<choose.length;ind++){
	let data={};
	choose[ind].addEventListener('change', (evt)=>{
		let choid=choose[ind].id;
		let i=choid.match(/(?!o-)([0-9])(?=-)/)[0];
		let j=choid.match(/(?!-)([0-9])$/)[0];
		data.index=i;data.ans=j;
		//console.log(i,j);
		$.ajax({
			type: 'GET',
			url: '/server/api/result/single',
			data: {"data":JSON.stringify(data)},
			dataType: "json",
			success: (result)=>{
				//console.log(result);
				util.playaudio(result.pinyin);
				[0,1,2,3].forEach((t)=>{
					//console.log($("#q-"+i+"-"+t+" .mdc-radio").eq(0));
					$("#q-"+i+"-"+t+" .mdc-radio").eq(0).addClass("mdc-radio--disabled");
					if(t!=j){
						$("#radio-"+i+"-"+t).eq(0).prop("disabled", true);
					}
				});
				if(result.result=="1"){
					$("#q-"+i+"-"+j+" .mdc-radio").eq(0).addClass("anstrue");
				}else{
					$("#q-"+i+"-"+j+" .mdc-radio").eq(0).addClass("ansfalse");
				}
			}
		});
	});
};

//==================learn player========================
const names=["","a1","ai1","ao1","an1","ang1","z","c","s","v1","a1","a2","a3","a4"];

for(let i=1;i<=13;i++){
	let buttons="#learn-audio-"+i;
	util.setAudioButton(names[i],buttons);
}

