/**
 * Created by anmol on 18/7/17.
 */


$(function () {

    let loginBtn=$('#LoginBtn');
    let email=$('#email');
    let password=$('#password')
    loginBtn.click(function () {

        $.post('/login',{email:email.val(),password:password.val()},function (data) {

            if (data.success){
                alert("Success")
            }

            else{
                alert("Not success")
            }

        });

    });


});