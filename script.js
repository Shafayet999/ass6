let cart = []; // Cart Array

// ------------------ Category Load ------------------
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
    btn.innerHTML = name;
    btn.className = "all bg-white text-black w-2/3 font-semibold py-2 rounded my-2 hover:bg-green-700 hover:text-white";

    btn.addEventListener("click", () => {
      const allBtns = document.getElementsByClassName("all");
      Array.from(allBtns).forEach(b => {
        b.className = "all bg-white text-black w-2/3 font-semibold py-2 rounded my-2 hover:bg-green-700 hover:text-white";
      });
      btn.className = "all bg-green-700 text-white w-2/3 font-semibold py-2 rounded my-2";
      filterd_tree(i);
    });
    parent_btn.appendChild(btn);
  });
};

// ------------------ All Trees Show ------------------
async function displayAll() {
  showLoader();
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  now_do_all(data.plants);
  hideLoader();
}

// auto load all
async function autoAll() {
  showLoader();
  const url = "https://openapi.programming-hero.com/api/plants";
  const res = await fetch(url);
  const data = await res.json();
  const A = document.getElementById("all_btn");
  A.className = "w-2/3 all font-semibold py-2 rounded my-2 bg-green-700 text-white";
  now_auto_all(data.plants);
  hideLoader();
}
autoAll();

const now_auto_all = (plants) => {
  const trees = document.getElementById("id_trees");
  trees.innerHTML = ``;
  plants.forEach(i => {
    const card = document.createElement("div");
    card.innerHTML = makeCard(i);
    trees.appendChild(card);
  });
};

const now_do_all = (plants) => {
  const trees = document.getElementById("id_trees");
  trees.innerHTML = ``;
  plants.forEach(i => {
    const card = document.createElement("div");
    card.innerHTML = makeCard(i);
    trees.appendChild(card);
  });
};

// ------------------ Filter Category ------------------
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
      card.innerHTML = makeCard(i);
      trees.appendChild(card);
    }
  });
}

// ------------------ Card Template ------------------
function makeCard(i) {
  return `
    <div class='card flex flex-col bg-white rounded-md overflow-hidden shadow-md'>
        <img src="${i.image}" class="md:h-60 h-40 object-cover w-full" alt="${i.name}">
        <div class="p-4 flex flex-col flex-1">
            <h1 class="font-bold text-2xl">${i.name}</h1>
            <p class="text-sm mt-2 text-gray-700">${i.description}</p>
            <div class="infor flex justify-between items-center mt-2">
                <div class="border-2 border-green-600 w-fit rounded-lg text-center">
                    <span class="text-green-600 p-2">${i.category}</span>
                </div>
                <div class="price flex items-center">
                    <span class="font-bold text-2xl mr-1">$</span>
                    <span class="font-bold text-2xl text-green-700">${i.price}</span>
                </div>
            </div>
        </div>
        <button onclick='addToCart(${JSON.stringify(i)})'
            class="all bg-green-600 text-white font-semibold md:py-2 py-1 mt-1 rounded-xl w-11/12 mx-auto mb-6">
            Add to Cart
        </button>
    </div>`;
}

// ------------------ Cart System ------------------
// ------------------ Cart System ------------------
function addToCart(tree) {
  // দেখব আগেই আছে কিনা
  const existing = cart.find(item => item.id === tree.id);

  if (existing) {
    existing.qty += 1; // quantity বাড়াবে
  } else {
    cart.push({ ...tree, qty: 1 }); // নতুন add হলে qty = 1
  }
  renderCart();
}

function renderCart() {
  const cartContainer = document.querySelector(".cart");
  cartContainer.innerHTML = `<h1 class="font-bold text-4xl mb-4">Your Cart</h1>`;

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = parseFloat(item.price) * item.qty;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-green-100 rounded-lg p-3 shadow mb-3"; // bg-green-100 = হালকা সবুজ

    div.innerHTML = `
            <div>
                <h2 class="font-bold text-lg">${item.name}</h2>
                <p class="text-green-700 font-bold">$${item.price} x ${item.qty} = $${itemTotal}</p>
            </div>
            <button class="text-red-400 px-3 py-1 rounded-lg hover:bg-red-700" onclick="removeFromCart(${index})">X</button>
        `;

    cartContainer.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "mt-6 font-bold text-2xl text-center text-green-900 flex justify-center gap-3";
  totalDiv.innerHTML = `
    <span>Total:</span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
    <span>$${total}</span>
`;
  cartContainer.appendChild(totalDiv);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// ------------------ All Button Default Event ------------------
const allBtn = document.getElementById("all_btn");
allBtn.addEventListener("click", () => {
  const allBtns = document.getElementsByClassName("all");
  Array.from(allBtns).forEach(b => {
    b.className = "all bg-white text-black w-2/3 font-semibold py-2 rounded my-2 hover:bg-green-700 hover:text-white";
  });
  allBtn.className = "all bg-green-700 text-white w-2/3 font-semibold py-2 rounded my-2";
  displayAll();
});


function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
}

function makeCard(i) {
  return `
    <div class='card flex flex-col bg-white rounded-md overflow-hidden shadow-md'>
        <img src="${i.image}" class="md:h-60 h-40 object-cover w-full cursor-pointer" 
             alt="${i.name}" onclick='openModal(${JSON.stringify(i)})'>
        <div class="p-4 flex flex-col flex-1">
            <h1 class="font-bold text-2xl">${i.name}</h1>
            <p class="text-sm mt-2 text-gray-700">${i.description}</p>
            <div class="infor flex justify-between items-center mt-2">
                <div class="border-2 border-green-600 w-fit rounded-lg text-center">
                    <span class="text-green-600 p-2">${i.category}</span>
                </div>
                <div class="price flex items-center">
                    <span class="font-bold text-2xl mr-1">$</span>
                    <span class="font-bold text-2xl text-green-700">${i.price}</span>
                </div>
            </div>
        </div>
        <button onclick='addToCart(${JSON.stringify(i)})'
            class="all bg-green-600 text-white font-semibold md:py-2 py-1 mt-1 rounded-xl w-11/12 mx-auto mb-6">
            Add to Cart
        </button>
    </div>`;
}


function openModal(tree) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal_content");

  content.innerHTML = `
    <img src="${tree.image}" alt="${tree.name}" class="w-full h-60 object-cover rounded-lg mb-4">
    <h2 class="font-bold text-2xl mb-2">${tree.name}</h2>
    <p class="mb-3 text-gray-700">${tree.description}</p>
    <p class="font-semibold">Category: <span class="text-green-700">${tree.category}</span></p>
    <p class="font-bold text-xl mt-2">Price: <span class="text-green-700">$${tree.price}</span></p>
    
    <div class="flex justify-center mt-6">
      <button onclick="closeModal()" 
        class="bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-400">
        Close
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
}
