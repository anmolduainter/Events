/**
 * Created by anmol on 19/7/17.
 */

let imageUrl;
let title;
let date;
let time;
let desc;
let submit;

$(function () {

    let Sqldid=JSON.parse(localStorage.getItem('EventLogin')).id;



    $('#timepicker1').timepicker();


    imageUrl=$('#imageUrl');
    title=$('#Title');
    date=$('#Date');
    time=$('#Time');
    desc=$('#desc');
    submit=$('#Submit');


    submit.click(function () {

       $.post('/AddEvent',{

           id:Sqldid,
           imageUrl:imageUrl.val(),
           title:title.val(),
           date:date.val(),
           time:time.val(),
           desc:desc.val(),

       },function (res) {


           if (res.success){

               window.history.go(-1);

           }


       })


    });

});