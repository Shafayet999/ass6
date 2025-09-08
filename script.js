const f = async () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    display_all_categories(data.categories);
}
f();
const display_all_categories = (categories) => {
    const parent_btn = document.getElementById("catagories_btn");
    categories.forEach(i => {
        const name = i.category_name;
        const btn = document.createElement("button");
        btn.innerHTML = ` 
            ${name}
        `
        btn.className = "all w-2/3 bg-green-600 text-white font-semibold py-2 rounded my-2";
        btn.addEventListener("click", () => {
            filterd_tree(i);
        });
        parent_btn.appendChild(btn);
    });
};
async function displayAll() {
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    now_do_all(data.plants);
}
const now_do_all = (plants) => {
    const trees = document.getElementById("id_trees");
    trees.innerHTML = ``;
    plants.forEach(i => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card w-full h-full bg-white border rounded-md gap-5">
                <img src="${i.image}" class="h-80 object-cover w-full" alt="">
                <h1 class="font-bold ml-8 text-2xl">${i.name}</h1>
                <p class="font-semibold ml-8">${i.description}</p>
                <div class="border-2 border-green-500 w-fit ml-8 rounded-lg text-center">
                    <span class="text-green-400 p-3">${i.category}</span>
                </div>
                <button class="all w-4/5 bg-green-600 text-white font-semibold py-3 rounded-xl ml-8 mb-7 mt-4 ">Add to Cart</button>
        </div>
        
    `
        trees.appendChild(card);
    });
}

const filterd_tree = (id) => {
    const A = id.category_name;
    find_Full_List_of_A(A);
}
async function find_Full_List_of_A(A) {
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    do_final_load(data, A);
}
const do_final_load = (info, A) => {
    const trees = document.getElementById("id_trees");
    trees.innerHTML = ``;
    info.plants.forEach(i => {
        if (i.category === A) {
            const card = document.createElement("div");
            card.innerHTML = `
        <div class="card w-full h-full bg-white border rounded-md gap-5">
                <img src="${i.image}" class="h-80 object-cover w-full" alt="">
                <h1 class="font-bold ml-8 text-2xl">${i.name}</h1>
                <p class="font-semibold ml-8">${i.description}</p>
                <div class="border-2 border-green-500 w-fit ml-8 rounded-lg text-center">
                    <span class="text-green-400 p-3">${i.category}</span>
                </div>
                <button class="all w-4/5 bg-green-600 text-white font-semibold py-3 rounded-xl ml-8 mb-7 mt-4 ">Add to Cart</button>
        </div>
        
    `
            trees.appendChild(card);
        }
    });
}
