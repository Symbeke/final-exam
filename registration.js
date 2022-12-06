let btnCode = document.querySelector("#btn_code");
let btnRegistration = document.querySelector("#btn_registration");



let email = document.querySelector("#email_input");
let password = document.querySelector("#password_input");

function generateCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
 

const sendEmail = (email,message) =>{
    const templateParams = {
       
        message: message,
        to_email: email
    };
     
    emailjs.send('service_7nqcgzn', 'template_9u11duf', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
}

btnCode.addEventListener("click",()=>{
   let inputCode = generateCode(7);
   localStorage.setItem("code",inputCode);
    sendEmail(`"${email.value}"`,inputCode)
})


btnRegistration.addEventListener("click", () => {
    let verCode = document.querySelector("#code_input").value;
    let genCode = localStorage.getItem("code");
    if(verCode == genCode){
        let userEmail = document.querySelector("#email_input").value;
        let userPassword = document.querySelector("#password_input").value;
    
        let user = {
            email: userEmail,
            password: userPassword
        }
    
        let allUsers = JSON.parse(localStorage.getItem("users")) || [];
        allUsers.push(user);
        localStorage.setItem("users", JSON.stringify(allUsers));
    
        alert("Registration success!");
        location.href = "login.html";
    }else{
        alert("code is incorrect")
    }
    
});