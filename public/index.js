const para = document.querySelector(".para");

const getApi = async () => {
let url = "https://artea-server-app.herokuapp.com/users" //replace with Ivana's link

const response = await fetch(url);
const information = await response.json();

let template = "";

information[0].map(item => {
    template += `
    <div>
    <h1>
    ${item.basic.first_name}
    ${item.basic.last_name}
    ${item.basic.middle_name}
    ${item.addresses[0].address_1}
    </h1>
    </div>
    
    `
})

para.innerHTML = template;
}

window.addEventListener("DOMContentLoaded", () => getApi());