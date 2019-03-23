let audio1 = document.createElement('audio');
let audio2 = document.createElement('audio');


var proncbutton="#output-pronc-char button";
$(".pronc-char-plu .mdc-button-get").click(()=>{
	let origin = $("#tf-outlined-cha").val();
	 $.ajax({
        type: 'GET',
        url: '/server/api/tools/pchar',
        data: {data:origin},
        //dataType: "json",
        success: (result)=> {
			//console.log(result);
			if(result[0]!=0){
				setButtonAudio(proncbutton, result);
				$(".pronc-char-plu .mdc-typography--body1").text(result[3]);
				$(".pronc-char-plu .mdc-text-field").removeClass("mdc-text-field--focused");
				$(".pronc-char-plu .mdc-text-field--outlined").removeClass("mdc-text-field--outlined--alert", "mdc-notched-outline--notched");
			}
			else {
				$(".pronc-char-plu .mdc-typography--body1").text("");
				$(".pronc-char-plu .mdc-text-field").addClass("mdc-text-field--focused");
				$(".pronc-char-plu .mdc-text-field--outlined").addClass("mdc-text-field--outlined--alert", "mdc-notched-outline--notched");
			}
        }
    });
});

$("#tf-outlined-cha").keyup(()=>{
    $("#tf-outlined-cha").css("caret-color", "var(--mdc-theme-primary, #2c84ff)");
    $(".pronc-char-plu .mdc-text-field--outlined").removeClass("mdc-text-field--outlined--alert");
});

//two audio with button
function setButtonAudio(button,pn) {
    //console.log(button,pn);
    let audioname=(pn[0]==""?pn[1]:pn[0]);
    let tag=1;
    audio1.setAttribute('src', "../audio/"+audioname+".mp3");
    audio1.playbackRate=3;
    if(pn[0]!=""&&pn[1]!="") {
        audio2.setAttribute('src', "../audio/"+pn[1]+pn[2]+".mp3");
        audio2.playbackRate=1.3;
        tag=2;
        $(button).addClass("two");
        $(button).removeClass("one");
    }else{ tag=1;audio2.removeAttribute('src');
        $(button).removeClass("two");
        $(button).addClass("one");}
    $(button).click(()=> {
        if($(button).hasClass("two")){
             audio1.play();
             setTimeout(() => {
				audio2.play();
			 }, 75);
                //console.log("1")
            }else{
                audio1.play();
                audio2.remove();
                //console.log("2")
            }
    });
}


