/**
 * Created by anmol on 14/8/17.
 */

const router=require('express').Router();

const cheerio=require('cheerio');

const request=require('request');

let URL="https://in.bookmyshow.com/events/";

router.get('/',(req,res)=>{

    let Arr=[];

    request(URL,function (err,response,html) {

        let $=cheerio.load(html);

        $('#events .ev-card ').each(function (i,element) {

            let image=$(this).children().eq(0).children().eq(0).attr('data-src');
            let title=$(this).children().eq(1).children().eq(0).children().eq(0).text();
            let day=$(this).children().eq(0).children().eq(3).text().trim();

            if (day!=='Tomorrow'){
                day='';
            }



            let date=$(this).children().eq(0).children().eq(4).children().eq(0).children().eq(0).text().trim();

            let tag=$(this).children().eq(1).children().eq(2).children().eq(0).children().eq(2).text();
            let buyNow=$(this).children().eq(1).children().eq(2).children().eq(1).children().eq(0).attr('href');


            console.log($(this).children().eq(0).children().eq(3).text())
            console.log($(this).children().eq(0).children().eq(4).children().eq(0).text().trim())
            console.log($(this).children().eq(1).children().eq(0).children().eq(0).text().trim())

            Arr.push(new objc(image,title,day,date,tag,buyNow))

        });

        res.send(Arr)

    })




});

function objc(image,title,day,date,tag,buyNow) {

    this.image=image;
    this.title=title;
    this.day=day;
    this.date=date;
    this.tag=tag;
    this.buyNow=buyNow;

}

module.exports=router;