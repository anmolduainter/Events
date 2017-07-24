/**
 * Created by anmol on 18/7/17.
 */

let login;
let putEventBtn;
let eventAnim;
let AboutEvent;
let TopEvents;

$(function () {

   // login=$('#login');

   eventAnim=$('#EventAnim');
   AboutEvent=$('#AboutEvent');
   TopEvents=$('#TopEvent');

  // putEventBtn=$('#putEventBtn')

   // login.click(function () {
   //
   //     window.open('login.html','_self');
   //
   // })

    // putEventBtn.click(function () {
    //
    //     window.open('Register.html','_self');
    //
    // })


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