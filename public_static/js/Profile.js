/**
 * Created by anmol on 18/7/17.
 */

let container;
let Sqlid;
let email;
let add;

let dataArr=[];

$(function(){

    Sqlid=JSON.parse(localStorage.getItem('EventLogin')).id;
    container=$('.container');
    // add=$('#Add');
    getData();



});


function addClick(ev) {

    window.open("AddEvent.html","_self");


}




function getData(){


    container.empty();

    let bodyString=`<div class="row">
        <div class="col-8">
            <div class="jumbotron">
                <h1>Your Events</h1>
            </div>
        </div>
        <div class="col-4 text-center">
          
           <button id="Add" class="btn btn-primary pull-right"><i class="fa fa-plus" aria-hidden="true"></i></button>
        
        </div>
      </div>
  `;

    $.post('/YourEvents',{id:Sqlid},function (data) {

        dataArr=data;

        for(i in data){

            bodyString+=`    <div id="${i}" class="row">

        <div class="col text-center">
            <img class="image" src="${data[i].imgUrl}" width="400px" height="300px">
        </div>

        <div class="col text-center anim">
            <h1>${data[i].name}</h1>
            <h2>${data[i].date} (${data[i].time})</h2>
            <p>${data[i].desc}</p>
            <br>
            <br>
            <p>Interest :- ${data[i].interested}</p>
             <p>Going :- ${data[i].going}</p>
              <p>Like :- ${data[i].like}</p>
               <p>Not Like :- ${data[i].notlike}</p>
               <br>
                <button  class="btn btn-warning pull-right EditEvent"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        
                <button style="margin: 0px 10px 0px 10px" class="btn btn-danger pull-right deleteOne"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>

    </div>
    <br>
    <hr>
    <br> `
        }

        let body=$(bodyString);
        container.append(body)

        add=$('#Add');

        add.click(addClick);

        let EditEvent=$('.EditEvent');

        EditEvent.click(EditEventone)

        let deleteOne=$('.deleteOne');

        deleteOne.click(deleteOnefun);


    })

}

function deleteOnefun(ev){

    // let tx=$(ev.target).parent().children('h1').text()  can also be done by this

    let id=$(ev.target).parent().parent().attr('id');

    console.log(id)

    if (typeof (id) =="undefined"){

        alert("Sorry please try again later")

    }
    else{

        console.log(dataArr[id].name)
        console.log(dataArr[id].date)
        console.log(dataArr[id].time)

        $.post('/deleteOneEvent',{

            id:Sqlid,
            name:dataArr[id].name,
            date:dataArr[id].date,
            time:dataArr[id].time

        },function (res) {

            if (res.success){
                getData();
            }

        })



    }


}


function EditEventone(ev) {

    let id = $(ev.target).parent().parent().attr('id');

    console.log(id)

    if (typeof (id) == "undefined") {

        alert("Sorry Try again later")

    }
    else {

        let imageUrl=dataArr[id].imgUrl;
        let name=(dataArr[id].name);
        let date=(dataArr[id].date);
        let time=(dataArr[id].time);
        let desc=dataArr[id].desc;
        localStorage.setItem("EditEvent",JSON.stringify(new objc(Sqlid,imageUrl,name,date,time,desc)))

        window.open("EditEvents.html","_self")

    }
}

function objc(id,imageUrl,name,date,time,desc){

    this.id=id
    this.imageUrl=imageUrl;
    this.name=name;
    this.date=date;
    this.time=time;
    this.desc=desc;

}