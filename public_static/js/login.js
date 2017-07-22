// /**
//  * Created by anmol on 18/7/17.
//  */
//
//
// $(function () {
//
//     let loginBtn=$('#LoginBtn');
//     let email=$('#email');
//     let password=$('#password')
//     loginBtn.click(function () {
//
//         $.post('/login',{email:email.val(),password:password.val()},function (data) {
//
//             if (data.success){
//                 // alert("Success")
//                 console.log(data.id)
//                 console.log(data.email)
//                 sessionStorage.setItem("EventLogin",JSON.stringify(new objc(data.id,data.email)));
//                 localStorage.setItem("EventLogin",JSON.stringify(new objc(data.id,data.email)));
//                 window.open("Profile.html","_self");
//
//             }
//
//             else{
//                 alert("Not success")
//             }
//
//         });
//
//     });
//
//
// });
//
//
// function objc(id,email) {
//
//     this.id=id;
//     this.email=email
//
// }