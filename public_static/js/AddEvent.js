/**
 * Created by anmol on 19/7/17.
 */

let imageUrl;
let title;
let date;
let Starttime;
let endTime;
let desc;
let submit;

$(function () {

    imageUrl=$('#imageUrl');
    title=$('#Title');
    date=$('#Date');
    Starttime=$('#timepicker1').timepicker();
    endTime=$('#timepicker2').timepicker();
    desc=$('#desc');
    submit=$('#Submit');

    //
    // submit.click(function () {
    //
    //     console.log($('#timepicker1').timepicker().val());
    //
    //
    //  let time=`${Starttime.val()} - ${endTime.val()}`;
    //
    //  console.log(time)
    //
    //
    //    $.post('/AddEvents/AddEvent',{
    //
    //        imageUrl:imageUrl.val(),
    //        title:title.val(),
    //        date:date.val(),
    //        time:time,
    //        desc:desc.val(),
    //
    //    },function (res) {
    //
    //        if (res.success){
    //            window.history.go(-1);
    //        }
    //
    //    })
    //
    //
    // });

});