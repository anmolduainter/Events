/**
 * Created by anmol on 18/7/17.
 */

let container;
let Sqlid;
let email;
$(function(){

    Sqlid=JSON.parse(localStorage.getItem('EventLogin')).id;
    container=$('.container');
    getData();

});

function getData(){

    let bodyString=" ";

    $.post('YourEvents',{id:Sqlid},function (data) {

        for(i of data){

            bodyString+=`    <div class="row">

        <div class="col text-center">
            <img src="${i.imgUrl}" width="400px" height="300px">
        </div>

        <div class="col text-center">
            <h1>${i.name}</h1>
            <h2>${i.date} (${i.time})</h2>
            <p>${i.desc}</p>
            <br>
            <br>
            <p class="pull-right">Interest :- ${i.interested}</p>
             <p class="pull-right">Going :- ${i.going}</p>
              <p class="pull-right">Like :- ${i.like}</p>
               <p class="pull-right">Not Like :- ${i.notlike}</p>
        </div>

    </div>
    <br>
    <hr>
    <br> `
        }


        let body=$(bodyString);
        container.append(body)
        
    })

}
