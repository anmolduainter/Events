
const router= require('express').Router();

const cheerio=require('cheerio');
const request=require('request');


/*
 ----------------- Insider Events ------------------

1. Image
2. Name
3. Time
4. Place


 */


const URL="https://insider.in/all-events-in-delhi";

router.get('/delhi',(req,res)=>{


    request(URL,function (err,response,html) {

        if (!err){


            let arr=[];

            let $ = cheerio.load(html);

            $('ul.card-list li.card-list-item').each(function (i,element) {

                 let img=$(this).children().children().children().children().children().attr('src');
                 let name=$(this).children().children().children().eq(1).children().eq(0).text();
                 let date=$(this).children().children().children().eq(1).children().eq(1).text()
                 let place=$(this).children().children().children().eq(1).children().eq(2).text()
                console.log(date)

                arr.push(new objc(img,name,date,place))

            });

            res.send(arr);
        }
    })
});

function objc(img,name,date,place){
    this.img=img;
    this.name=name;
    this.date=date;
    this.place=place;
}

module.exports=router;