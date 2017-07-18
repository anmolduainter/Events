/**
 * Created by anmol on 18/7/17.
 */

let container;

$(function () {

    container=$('.container');

    getAllEvents();

});

function getAllEvents(){


   $.get('/AllEvents',function(res){
       let bodyString=" ";


       console.log(res.arr)

       for(i in res.result){


           bodyString+=`
    <div class="row">

        <div class="col text-center">
            <img src="${res.result[i].imgUrl}" width="400px" height="300px">
        </div>

        <div class="col text-center">
            <h1>${res.result[i].name}</h1>
            <h2>${res.result[i].date} (${res.result[i].time})</h2>
            <p>${res.result[i].desc}</p>
            <br>
            <br>
            <p class="pull-right">For more details : -${res.arr[i].phone} (${res.arr[i].username})</p>
        </div>

    </div>
    <br>
    <hr>
    <br> `

       }


       console.log(bodyString);

       let body=$(bodyString);

       container.append(bodyString)


   })


}