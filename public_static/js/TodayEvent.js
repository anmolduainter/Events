/**
 * Created by anmol on 19/7/17.
 */

$(function () {

    let register=$('.Register');
    register.click(registerClick)


});

function registerClick(ev){

    console.log("Interested Clicked");

    let id=$(this).parent().attr('id');
    console.log('intereted : '+id);
    if (id==undefined){
        alert("Please Try Again Later");
    }

    else{

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

        let postQ={
            name:name,
            date:date,
            time:Ptime,
        };

        $.post('/Events/Register',postQ,(data)=>{

            if(data.success){

                $(this).css('background','white').css('color','black').css('transition','background 1s,color 1s')

            }
            else{
                alert("Already Registered");
            }

        });


    }


}