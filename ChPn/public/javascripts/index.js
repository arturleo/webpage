import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCDrawer} from "@material/drawer";
import {MDCFormField} from '@material/form-field';
import {MDCRadio} from '@material/radio';
import {MDCRipple} from '@material/ripple';
import $ from './jquery.js';
window.jQuery = $;
window.$ = $;
//=============================================
require(`./load`);
require('./proncChar');

//=====================topAppBar========================
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
if(topAppBarElement!=null) {
    const topAppBarOri = new MDCTopAppBar(topAppBarElement);
}

//=====================sideAppBar========================
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('#drawer-main-content');
const focusfirst=mainContentEl.querySelector('p, input, button');
const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));


//prevent default jump
var linkpre=document.querySelectorAll(/*'a.mdc-list-item',*/'a.mdc-top-app-bar__navigation-icon');
if(mainContentEl!=null) {
    linkpre.forEach((value)=> {
        value.addEventListener('click', function (event) {
            event.preventDefault();
        })
    });
}


if(mainContentEl!=null) {
    listEl.addEventListener('click', (event) => { 
        drawer.open = false;
    });


}

//-----------------------------------------------
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));

topAppBar.setScrollTarget(document.getElementById('drawer-main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = true;
});

//=====================button========================
const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
var selsel=document.querySelectorAll(selector);
if(selsel!=null) {
    const ripples = [].map.call(selsel, function (el) {
        return new MDCRipple(el);
    });
}



//=====================button icon for audio======================
const iconButtonRipple = document.querySelectorAll('.learn-all .mdc-icon-button');
if (iconButtonRipple != null){
    iconButtonRipple.forEach( (val)=>{
        val.unbounded = true;

    })
}

//==================switch tab========================
import {MDCTabBar} from '@material/tab-bar';

let tabBarlearn,tabBaruhist;
let tabBarl=document.querySelector('.learn-tab-bar');
if(tabBarl!=null){
	tabBarlearn = new MDCTabBar(tabBarl);
	tabBarlearn.listen('MDCTabBar:activated', (activatedEvent) => {
	  document.querySelectorAll('.learn-body').forEach((element, index) => {
		if (index === activatedEvent.detail.index) {
		  element.classList.remove('learn-body--hidden');
		} else {
		  element.classList.add('learn-body--hidden');
		}
	  });
	});	

}
//-----------------------------------------------
let tabBaruh=document.querySelector('.userhist-tab-bar');
if(tabBaruh!=null)
	tabBaruhist = new MDCTabBar(tabBaruh);


//==================log in========================
import {MDCDialog} from '@material/dialog';
const logindialog = new MDCDialog(document.querySelector('.mdc-dialog'));

$("#account-icon").click(()=>{
	logindialog.open();
})	

logindialog.listen('MDCDialog:opened', function() {
	
});

logindialog.listen('MDCDialog:closing', function() {
	if (event.detail.action === 'close') {
    // Dialog was dismissed, not submitted
		return;
	}
	//TODO
	/*<form action="javascript:alert( 'success!' );">
	formEl.submit();
	$( "#target" ).submit(function( event ) {
		alert( "Handler for .submit() called." );
		event.preventDefault();
	});
	*/
    //console.log("accept");
	$.ajax({
		type: 'GET',
        url: '/user/login',
        data: {data:JSON.stringify(ans)},
        dataType: "json",
        success: function(result) {
			//TODO
            //if no user, sign up, remain in current position and require login
			//else if user exists and pw is wrong, alert
			//else if login success, close dialog and change login icon.
        }
	});
});
//-----------------------------------------
import {MDCTextField} from '@material/textfield';



var textfield_sel = document.querySelectorAll('.mdc-text-field');
if (textfield_sel != null){
    textfield_sel.forEach( (val)=>{
        new MDCTextField(val);
        
    })
}

var cancel=document.querySelector('.cancel'),ok=document.querySelector('.ok');
if(cancel!= null)
    new MDCRipple(cancel);
if(ok!= null )
    new MDCRipple(ok);


//===================Menu==========================
import {MDCMenu} from '@material/menu';
import {MDCSelect} from '@material/select';

var menuslc2=document.querySelectorAll('.mdc-select')
if(menuslc2!=null){
    menuslc2.forEach((value) =>{
        const select = new MDCSelect(value);

    });
}
//===================search==========================
$("#search-icon").click(()=>{
    $(".search-form").addClass("search-form--open");
    $(".search-form__close-icon").addClass("search-form__close-icon--rotate");
    $(".search-form__label").addClass("search-form__label--animate-in");
});
$(".search-form__button").click(()=>{
    $(".search-form").removeClass("search-form--open");
    $(".search-form__close-icon").removeClass("search-form__close-icon--rotate");
    $(".search-form__label").removeClass("search-form__label--animate-in");
})


