/**
 * Created by anmol on 28/7/17.
 */


$(function () {

    let NotRegister=$('.NotRegister');

    let Like=$('.Like');

    let NotLike=$('.NotLike');

    NotRegister.click(notRegister);

    Like.click(like);

    NotLike.click(notLike);

});


function notLike(eve){



}

function like(eve){



    console.log("Hello");

    let id=$(this).parent().attr('id');

    console.log(id);

    let name=$(this).parent().find('h1').text();
    let date=$(this).parent().find('h2').text().substr(0,10);
    let time=$(this).parent().find('h2').text().replace(date+" ",'');
    let Ptime;
    if (time.length==19){
        Ptime=$(this).parent().find('h2').text().replace(date+" ",'').substr(1,17);
    }
    else if(time.length==20){
        Ptime=$(this).parent().find('h2').text().replace(date+" ",'').substr(1,18);
    }
    else if(time.length==21){
        Ptime=$(this).parent().find('h2').text().replace(date+" ",'').substr(1,19);
    }
    console.log("Name : "+name);
    console.log("Date : "+date);
    console.log("Time : "+time);
    console.log("ParticularTime : "+Ptime);


    let query={
        name:name,
        date:date,
        time:Ptime
    };

    $.post('/Events/LikeEvents',query,(data)=>{


        if (data.success){
            window.location.reload(true);
        }

        else{
            alert("Try Again Later");
        }

    })




}



function notRegister(eve){

    console.log("Hello");

    let id=$(this).parent().attr('id');

    console.log(id);

    let name=$(this).parent().find('h1').text();
    let date=$(this).parent().find('h2').text().substr(0,10);
    let time=$(this).parent().find('h2').text().replace(date+" ",'')
    let Ptime;
    if (time.length==19){
        Ptime=$(this).parent().find('h2').text().replace(date+" ",'').substr(1,17);
    }
    else if(time.length==20){
        Ptime=$(this).parent().find('h2').text().replace(date+" ",'').substr(1,18);
    }
    else if(time.length==21){
        Ptime=$(this).parent().find('h2').text().replace(date+" ",'').substr(1,19);
    }
    console.log("Name : "+name);
    console.log("Date : "+date);
    console.log("Time : "+time);
    console.log("ParticularTime : "+Ptime);


    let query={
        name:name,
        date:date,
        time:Ptime
    };

    $.post('/Events/RegisteredEvents',query,(data)=>{


        if (data.success){
            window.location.reload(true);
        }

        else{
            alert("Try Again Later");
        }

    })
}