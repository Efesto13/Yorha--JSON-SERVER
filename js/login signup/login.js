import {user,password,bntLogin,URL} from "../doom.js"


async function validation(e){
    e.preventDefault();

    const nameId = user.value;
    const pass = password.value;

    try {
        const response = await fetch(`${URL}/users?name=${nameId}&password${pass}`);

        if(!response.ok) throw new Error("System No Exist");

        const data = await response.json();

        
        if(data.legth === 0){
            alert("User No Exist");
            return;
        }

        if(data[0].type === "admin"){
            window.location.href="./pages/admin.html"
            sessionStorage.setItem("usuario", data[0].id)
        }else{
            window.location.href="./pages/user.html"
            sessionStorage.setItem("usuario", data[0].id)
        }


    } catch (error) {
        console.error("Error in server");
        
    }
};

export function login(){
    if(!bntLogin) return;
    bntLogin.addEventListener("click", validation)
}