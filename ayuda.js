// import {
//     itemForm,
//     nameInput,
//     descriptionInput,
//     itemsContainer,
//     URL
// } from "../../doom.js";

// let postToEdit = null;

// async function createPost(e) {
//     e.preventDefault();

//     const idUser = sessionStorage.getItem("usuario");

//     try {
//         const response = await fetch(`${URL}/users/${idUser}`);
//         if (!response.ok) throw new Error("User not found");

//         const user = await response.json();
//         user.posts = user.posts || [];

//         if (postToEdit) {
//             user.posts = user.posts.map(post =>
//                 post.id === postToEdit.id
//                     ? {
//                         ...post,
//                         title: nameInput.value,
//                         description: descriptionInput.value
//                     }
//                     : post
//             );
//             postToEdit = null;
//         } else {
//             user.posts.push({
//                 id: Date.now(),
//                 title: nameInput.value,
//                 description: descriptionInput.value
//             });
//         }

//         await fetch(`${URL}/users/${idUser}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(user)
//         });

//         itemForm.reset();
//         renderPost();

//     } catch (error) {
//         console.error(error);
//     }
// }

// export async function renderPost() {
//     const idUser = sessionStorage.getItem("usuario");

//     try {
//         const response = await fetch(`${URL}/users/${idUser}`);
//         const user = await response.json();

//         itemsContainer.innerHTML = "";

//         user.posts?.forEach(post => {
//             itemsContainer.innerHTML += `
//                 <div class="bg-gray-50 border rounded-lg p-4 shadow-sm mb-4">
//                     <h3 class="text-lg font-semibold">${post.title}</h3>
//                     <p class="text-gray-600 text-sm mb-3">${post.description}</p>
//                     <div class="flex gap-2">
//                         <button class="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 update-btn" data-id="${post.id}">
//                             Update
//                         </button>
//                         <button class="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 delete-btn" data-id="${post.id}">
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             `;
//         });

//     } catch (error) {
//         console.error(error);
//     }
// }

// async function deletePost(e) {
//     if (!e.target.classList.contains("delete-btn")) return;

//     const postId = Number(e.target.dataset.id);
//     const idUser = sessionStorage.getItem("usuario");

//     try {
//         const response = await fetch(`${URL}/users/${idUser}`);
//         const user = await response.json();

//         user.posts = user.posts.filter(post => post.id !== postId);

//         await fetch(`${URL}/users/${idUser}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(user)
//         });

//         renderPost();

//     } catch (error) {
//         console.error(error);
//     }
// }

// async function loadPostToEdit(e) {
//     if (!e.target.classList.contains("update-btn")) return;

//     const postId = Number(e.target.dataset.id);
//     const idUser = sessionStorage.getItem("usuario");

//     try {
//         const response = await fetch(`${URL}/users/${idUser}`);
//         const user = await response.json();

//         postToEdit = user.posts.find(post => post.id === postId);

//         nameInput.value = postToEdit.title;
//         descriptionInput.value = postToEdit.description;

//     } catch (error) {
//         console.error(error);
//     }
// }

// export function addPost() {
//     if (!itemForm) return;

//     renderPost();
//     itemForm.addEventListener("submit", createPost);
//     itemsContainer.addEventListener("click", deletePost);
//     itemsContainer.addEventListener("click", loadPostToEdit);
// }