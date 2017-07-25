/**
 * Created by anmol on 18/7/17.
 */


$(function () {

   let bookMark=$('.bookMarks');

   bookMark.click(bookMarkClicked);

});


function bookMarkClicked(ev){

   console.log("Hello")

   let id=$(this).parent().attr('id');

   if (id==undefined){
      alert("Please Try again later");
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
      console.log(name);
      console.log(date);
      console.log(time);
      console.log(Ptime);

      let postQ={
          name:name,
          date:date,
          time:Ptime
      };

      $.post('/Events/BookMark',postQ,(data)=>{

         if (data.success){

            $(this).css('transform','scale(2)').css('transition','transform 1s');

         }
         else{

             $(this).css('transform','scale(1)').css('transition','transform 1s');

         }

      });

   }

}
