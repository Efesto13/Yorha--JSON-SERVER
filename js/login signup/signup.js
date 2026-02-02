import {formLogin,password,user,URL, singUp} from "../doom.js" 

export function newUsers(e){
    e.preventDefault()

    formLogin.innerHTML=`
         <div class="col-12 col-sm-8 col-md-5 col-lg-4">

        <div class="card yorha-card p-4">
            <div class="text-center mb-4">
                <div class="yorha-title">YoRHa</div>
                <div class="yorha-subtitle" id="tittle-login"> CREATE ANDROID ACCESS SYSTEM</div>
            </div>

            <form>
                <div class="mb-4">
                    <label class="form-label small">CREATE UNIT ID</label>
                    <input type="text" class="form-control" placeholder="Enter Unit ID" required id="user-sign">
                </div>

                <div class="mb-4">
                    <label class="form-label small"> CREATE ACCESS KEY</label>
                    <input type="password" class="form-control" placeholder="********" required id="password-sign">
                </div>

                <button type="submit" class="btn btn-yorha w-100 py-2" id="bnt-create">
                    CREATED 
                </button>

        </div>

    </div>
    `;

    formLogin.addEventListener("submit", saveSystem);
}

export  async function saveSystem(e){
    e.preventDefault();
    const newUser = document.getElementById("user-sign").value;
    const newPass = document.getElementById("password-sign").value;

    const newSystem = {
        "name" : newUser,
        "password" : newPass,
        "post" : [],
        "type" : "user"
    };
    try {
        
        const response = await fetch(`${URL}/users?name=${newUser}`)

        if(!response.ok){
            throw new Error("Error Search User")
        }

        const data = await response.json();

        if(data.legth >0){
            alert("User Exist");
            return;
        }

        const sendUser = await fetch(`${URL}/users`,{
           method: "POST",
           headers: {"Content-Type": "aplication/json"},
           body: JSON.stringify(newSystem)
        });

        if(!sendUser.ok) throw new Error("Send User Failed");

        alert("Created System")
        

    } catch (error) {
        console.error("ERROR IN SERVER");
    }
    
};

export function systemCreate(){
    if(!singUp) return;
    singUp.addEventListener("click",newUsers)
}

    