/**
 * Created by anmol on 18/7/17.
 */

let login;
let putEventBtn;

$(function () {

   login=$('#login');

   putEventBtn=$('#putEventBtn')

   login.click(function () {

       window.open('login.html','_self');

   })

    putEventBtn.click(function () {

        window.open('Register.html','_self');

    })


});