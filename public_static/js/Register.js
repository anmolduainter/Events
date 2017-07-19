/**
 * Created by anmol on 18/7/17.
 */



$(function () {


    let username=$('#username');
    let email=$('#email');
    let password=$('#password');
    let confirmPass=$('#confirmPassword');
    let phone=$('#phone');
    let submitBtn=$('#btnRegister');


    submitBtn.click(function () {

        if (password.val()==confirmPass.val()){

            $.post('/registerCheck',{email:email.val()},function (data) {

                if (data.success){
                    alert("username already taken")
                }

                else{

                    $.post('/register',{username:username.val(),

                        email:email.val(),
                        password:password.val(),
                        phone:phone.val()

                      },function (data) {

                        if (data.success) {
                            sessionStorage.setItem("EventLogin", JSON.stringify(new objc(data.id, data.email)));
                            localStorage.setItem("EventLogin", JSON.stringify(new objc(data.id, data.email)));
                            window.open("Profile.html", "_self");
                        }
                        else{
                            alert("Some problem occured")
                        }

                    })

                }


            })

        }
        else{

            alert("Password not correct")

        }

    })



});


function objc(id,email) {

    this.id=id;
    this.email=email

}