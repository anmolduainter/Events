/**
 * Created by anmol on 18/7/17.
 */

let login;
let putEventBtn;
let eventAnim;
let AboutEvent;
let TopEvents;

$(function () {

   eventAnim=$('#EventAnim');
   AboutEvent=$('#AboutEvent');
   TopEvents=$('#TopEvent');

   let YouEv=$('#YrEvents');

   YouEv.hover(function () {

       console.log("Hello");
       let dataCount;

       $.get('/Events/YourEvents',(data)=>{

           YouEv.empty();

           dataCount=data.count;

           let body=$(`<h3>Your Events</h3><br><br><br><h4>Your Events Number : ${dataCount}</h4>`)

           YouEv.css('background','white').css('color','black').css('border-radius','20px').css('transition','background 2s,color 2s,border-radius 2s');

           body.hide().appendTo(YouEv).fadeIn(500);

           console.log(dataCount);

       });


   },function () {

       YouEv.empty();

       let body=$(`<h3>Your Events</h3>`)

       YouEv.css('background','transparent').css('color','white').css('border-radius','100px').css('transition','background 2s,color 2s,border-radius 2s');

       body.hide().appendTo(YouEv).fadeIn(500);


   });


    $(window).on('scroll',function () {


        if ($(window).scrollTop() > 160) {


            AboutEvent.css('animation-name','anim')


        } else {

            AboutEvent.css('animation-name','')

        }


        if ($(window).scrollTop() > 550) {


            TopEvents.css('animation-name','anim')


        } else {

            TopEvents.css('animation-name','')

        }


    });

   console.log($(window).width())
    console.log($(window).height());
   console.log($(window).scrollTop())
});