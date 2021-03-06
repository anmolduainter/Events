

const router=require('express').Router();

const osmosis=require('osmosis');
const cheerio=require('cheerio');
const request=require('request');
const URL="https://www.eventshigh.com/delhi/outdoors";


/*
    -----------------Events High (OutDoors) ------------------

    1. Image
    2. Href
    3. title
    4. dateTime
    5. evenue
    6. genre


 */

router.get('/',(req,res)=>{

    request(URL,function (err,response,html) {

        console.log('..................OutDoors..............');

        if (!err){

            let Arr=[];

            let $=cheerio.load(html)

            $('div#events-list div.col-md-3.col-sm-4.col-xs-12.box-padding.sidetag').each(function (i,element) {

                if (i==0){
                    let image=$(this).children().children().children().children().children().eq(2).attr('src')
                    let href=$(this).children().children().eq(1).children().eq(1).attr("href")

                    if (href===undefined){
                        href=''
                    }

                    let title=$(this).children().children().eq(1).children().eq(1).children().eq(0).text();
                    let dateTime=$(this).children().children().eq(1).children().eq(2).text()
                    let evenue=$(this).children().children().eq(1).children().eq(3).text()

                    let genre=$(this).children().children().eq(1).children().eq(4).text()

                 //   console.log(href)

                    Arr.push(new objc(image,href,title,dateTime,evenue,genre))

                }
                else{
                    let image=$(this).children().children().children().children().children().eq(2).attr('data-original')
                    let href=$(this).children().children().eq(1).children().eq(1).attr("href")

                    if (href==undefined){
                        href=''
                    }

                    let title=$(this).children().children().eq(1).children().eq(1).children().eq(0).text();
                    let dateTime=$(this).children().children().eq(1).children().eq(2).text()
                    let evenue=$(this).children().children().eq(1).children().eq(3).text()


                    let genre=$(this).children().children().eq(1).children().eq(4).text()

                    console.log(href)

                    Arr.push(new objc(image,href,title,dateTime,evenue,genre))

                }

            })

            res.send(Arr);
        }
    })

});


function objc(image,href,title,dateTime,evenue,genre){

    this.image=image;
    this.href=href;
    this.title=title;
    this.dateTime=dateTime;
    this.evenue=evenue;
    this.genre=genre

}


module.exports=router;