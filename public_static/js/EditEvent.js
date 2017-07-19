/**
 * Created by anmol on 19/7/17.
 */
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

    let Sqlid=JSON.parse(localStorage.getItem('EditEvent')).id;
    let imageUrltext=JSON.parse(localStorage.getItem('EditEvent')).imageUrl;
    let nametext=JSON.parse(localStorage.getItem('EditEvent')).name;
    let datetext=JSON.parse(localStorage.getItem('EditEvent')).date;
    let timetext=JSON.parse(localStorage.getItem('EditEvent')).time;
    let desctext=JSON.parse(localStorage.getItem('EditEvent')).desc;

    imageUrl=$('#imageUrl');
    title=$('#Title');
    date=$('#Date');
    time=$('#Time');
    desc=$('#desc');
    submit=$('#Submit');

    console.log(imageUrltext)
    console.log(nametext)
    console.log(datetext)
    console.log(timetext)
    console.log(desctext)

    imageUrl.val(imageUrltext)
    title.val(nametext)
    date.val(datetext)
    time.val(timetext)
    desc.val(desctext)


    submit.click(function () {

        console.log(imageUrl.val().toString())
        console.log(imageUrltext)
        // console.log(imageUrl.val())
        // console.log(imageUrl.val())

        $.post('/updateEditEvent',{

            id:Sqlid,
            title:nametext,
            date:datetext,
            time:timetext,


            imageUrl:imageUrl.val().toString(),
            title1:title.val().toString(),
            date1:date.val().toString(),
            time1:time.val().toString(),
            desc1:desc.val().toString(),

        },function (res) {


            if (res.success){

                 window.history.go(-1);

            }


        })


    });

});