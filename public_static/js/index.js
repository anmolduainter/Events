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


   let Insidecontainer=$('#insideContainer');


   let YouEv=$('#YourEvents');

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

       let body=$(`<br><br><h1>Your Events</h1><br><br>`)

       YouEv.css('background','transparent').css('margin','100px 0px 0px 0px').css('color','white').css('border-radius','50px').css('transition','background 2s,color 2s,border-radius 2s');

       body.hide().appendTo(YouEv).fadeIn(500);


   });




   YouEv.click(function () {

       $.get('/Events/YourEvents',function (data) {

           let row1=$(`<div class="row" id="back"><div class="col" style="cursor: pointer"><h2>Back</h2></div></div>`);

           let row=$(`<div class="row"></div>`);

           let body=``;

           for (i in data.result){


               body=body+`
              <div class="col text-center">
              <img width="300px" height="300px" src="${data.result[i].imgUrl}" >
              <h1 style="color: white">${data.result[i].name}</h1>
              <h2 style="color: white">${data.result[i].date} (${data.result[i].time})</h2>
              <p style="color: white">${data.result[i].desc}</p>
              <br>
              <br>`;

           }


           let body1=$(body);

           row.append(body1);

           Insidecontainer.append(row1)
           Insidecontainer.append(row)

           let back=$('#back');

           back.click(function () {

               window.location.reload(true)

           })


       })





   });




   ///////////ADD EVENTS////////////////////////////////////////


   let AddEvents=$('#AddEvents');

    AddEvents.click(function () {

        window.location='/AddEvents/AddEventsL'

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