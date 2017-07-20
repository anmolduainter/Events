/**
 * Created by anmol on 19/7/17.
 */


let container;

$(function () {

    container=$('.container');

    getAllEvents();

});

function getAllEvents(){


    $.get('/TodayEvents',function(res){

        if (res.result.length==0){

            // console.log("HEllo")

            let body=$(`<div class="row">
        <div class="col text-center">
            <div class="jumbotron">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/No_Cross.svg/1024px-No_Cross.svg.png" height="100px">
                <br>
                <h2>No Event Today</h2>
            </div>
        </div>
      </div>

          `)

            container.append(body);


        }

        else {

            let bodyString = " ";


            console.log(res.arr)

            for (i in res.result) {


                bodyString += `
    <div class="row">

        <div class="col text-center">
            <img class="image" src="${res.result[i].imgUrl}" width="400px" height="300px">
        </div>

        <div class="col text-center anim">
            <h1>${res.result[i].name}</h1>
            <h2>${res.result[i].date} (${res.result[i].time})</h2>
            <p>${res.result[i].desc}</p>
            <br>
            <h2>${res.timeArr[i]}</h2>
            <br>
            <p class="pull-right">For more details : -${res.arr[i].phone} (${res.arr[i].username})</p>
            <br>
           <button class="btn btn-secondary">Like</button>
           <button class="btn btn-secondary">Not Like</button>
        </div>

    </div>
    <br>
    <hr>
    <br> `

            }


            console.log(bodyString);

            let body=$(bodyString);

            container.append(bodyString)


        }

    })


}