import {yorhaForm,unitInput,modelInput,missionInput,URL,containerPost} from "../../doom.js"

// CREAMOS UNA VARIABLE GLOBAL PARA IR CAMBIANDO PARA ACTUALIZAR LAS CARD

let changeCommand = null

// BOTON PARA CREAR LAS CARDS

async function createYorhaCommand(e) {
    e.preventDefault()

    const unit = unitInput.value
    const model = modelInput.value
    const mission = missionInput.value

    const newPost = {
        id : Date.now(),
        "unit" : unit,
        "model" : model,
        "mission" : mission
    };

        const idUser = sessionStorage.getItem("usuario");

    try {

        const response = await fetch(`${URL}/users/${idUser}`);

        if(!response.ok) throw new Error("User Not Exist");

        const user = await response.json();

        user.posts = user.posts || [];

        user.posts.push(newPost);

        const updateUser = await fetch(`${URL}/users/${idUser}`,{
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        });

        if(!updateUser.ok) throw new Error("Update Failed");

        alert("Command Created")

    } catch (error) {
        console.error("Error Creating Command",error);

    }
};

// RENDER DE LAS CARDS

export async function renderCommand(){

    const idUser = sessionStorage.getItem("usuario")
    const response = await fetch(`${URL}/users/${idUser}`)
    const post = await response.json();

    containerPost.innerHTML = "";

    post.posts.forEach(post => {
        containerPost.innerHTML +=`
            <div class="yorha-panel p-4 rounded-xl space-y-3">

        <header class="flex items-center justify-between">
            <h3 class="text-lg font-semibold tracking-widest uppercase">
                Unit <span class="text-gray-400">${post.unit}</span>
            </h3>

            <span class="text-xs uppercase tracking-wider text-gray-500">
                Active
            </span>
        </header>

        <div class="space-y-1 text-sm text-gray-300">
            <p>
                <span class="text-gray-500 uppercase text-xs">Model:</span>
                ${post.model}
            </p>

            <p>
                <span class="text-gray-500 uppercase text-xs">Mission:</span>
                ${post.mission}
            </p>
        </div>

        <div class="flex gap-2 pt-2">
            <button
                class="flex-1 py-1 border border-gray-600 rounded-lg text-xs uppercase tracking-widest hover:bg-gray-800 transition btn-edit"
                data-id=${post.id}>
                Edit
            </button>

            <button
                class="flex-1 py-1 border border-red-700 rounded-lg text-xs uppercase tracking-widest text-red-400 hover:bg-red-900/20 transition btn-detele"
            data-id=${post.id}>
                Delete
            </button>
        </div>

    </div>


        `

    });
};

// BOTON PARA ELIMINAR LAS CARD

async function deleteCommand(e) {
    if(!e.target.classList.contains("btn-detele")) return;

    const postId = Number(e.target.dataset.id);
    const idUser = sessionStorage.getItem("usuario")

    try {
        const response = await fetch(`${URL}/users/${idUser}`);
        const user = await response.json();

        user.posts = user.posts.filter(post => post.id !== postId);

        await fetch(`${URL}/users/${idUser}`,{
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify( { posts: user.posts})
        });

        renderCommand()

    } catch (error) {
        console.error(error);
        
    }
  
};

// BOTON PARA ACTUALIZAR LAS CARDS/ DOS FUNCIONES PARA ESO

async function editCommand(e){
    if (!e.target.classList.contains("btn-edit")) return;


    const postId = Number(e.target.dataset.id);
    const idUser = sessionStorage.getItem("usuario");

    try {
        const response = await fetch(`${URL}/users/${idUser}`)
        const user = await response.json()

        changeCommand = user.posts.find(post => post.id === postId)

        if(!changeCommand) return;

        unitInput.value =  changeCommand.unit;
        modelInput.value =  changeCommand.model;
        missionInput.value =  changeCommand.mission;

        yorhaForm.removeEventListener("submit", createYorhaCommand);
        yorhaForm.addEventListener("submit", updateCommand);

    } catch (error) {
        console.error("Error editing command", error);
        
    }
};


async function updateCommand(e) {
    e.preventDefault();
    if (!changeCommand) return;

    const idUser = sessionStorage.getItem("usuario");

    try {
        const response = await fetch(`${URL}/users/${idUser}`);
        const user = await response.json();

        user.posts = user.posts.map(post =>
            post.id === changeCommand.id
                ? {
                    ...post,
                    unit: unitInput.value,
                    model: modelInput.value,
                    mission: missionInput.value
                }
                : post
        );

        await fetch(`${URL}/users/${idUser}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ posts: user.posts })
        });

        changeCommand= null;
        yorhaForm.reset();

        yorhaForm.removeEventListener("submit", updateCommand);
        yorhaForm.addEventListener("submit", createYorhaCommand);

        renderCommand();

    } catch (error) {
        console.error("Error updating command", error);
    }
}

// PARA QUE LOS BOTONES FUNCIONEN

export function addCommand(){
    if(!yorhaForm) return;
    renderCommand();
    
    yorhaForm.addEventListener("submit", createYorhaCommand);
    containerPost.addEventListener(`click`, deleteCommand);
    containerPost.addEventListener(`click`, editCommand);

};