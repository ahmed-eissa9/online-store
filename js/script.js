
// open_close_category
const category_nav_links = document.querySelector(".category_nav_links");
function open_close_category() {
    category_nav_links.classList.toggle("active");
}

// open_close_cart
const cart = document.querySelector(".cart");
function open_cart() {
    cart.classList.add("active");
}
function close_cart() {
    cart.classList.remove("active");
}


// open_close_menu
const nav_link = document.querySelector(".nav_link");
function open_menu() {
    nav_link.classList.add("active");
}
function close_menu() {
    nav_link.classList.remove("active");
}



// Variables
let item_in_cart = document.querySelector(".item_in_cart");
var all_products;

let product_cart = [];

let count_item = document.querySelector(".count_item");
let count_item_in_cart = document.querySelector(".count_item_in_cart");
let total_price_in_cart = document.querySelector(".total_price_in_cart");

// add item in cart
function add_item_in_cart(id) {
    let found = product_cart.find(item => item.id === all_products[id].id);
    
    if(!found) {
        let product = { ...all_products[id] , quantity: 1 };
        product_cart.push(product); 
    }
    save_localStorage();
    get_item_in_cart();
};

// get item
function get_item_in_cart() {
    let total_quantity = 0; 
    let total_price = 0;
    let item_c = "";

    product_cart.forEach((product , index) => {
          item_c += `
            <div class="item_cart"> 
                <img src="${product.img}" alt="">

                <div class="info_item">
                    <p class="name_item_in_cart">${product.name}</p>
                    <h6 class="price_item_in_cart"> $${product.price} </h6>
                    
                    <div class="plus_minus">
                        <button class="plus pm" onclick="decrease_quantity(${index})"> - </button>
                        <span href="#" class="num"> ${product.quantity} </span>
                        <button class="minus pm" onclick="increase_quantity(${index})"> + </button>
                    </div>
                </div>

                <i class="fa-solid fa-trash" onclick="remove_item_in_cart(${index})"></i>
            </div> 
        `;

        total_price += product.price * product.quantity;
        total_quantity += product.quantity; 
    });
    
    item_in_cart.innerHTML = item_c;

    count_item.innerHTML = total_quantity;
    count_item_in_cart.innerHTML = `Cart Item : ${total_quantity}`;
    total_price_in_cart.innerHTML = `$${total_price}`;

    update_button();
};

// add active in btn
document.querySelectorAll(".btn_pro").forEach(botton => {
    botton.addEventListener("click" , () => {
        const id_botton = parseInt(botton.getAttribute("data-id"));
        botton.classList.add("active");
        botton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Item In Cart`;
        botton.disabled = true;
        add_item_in_cart(id_botton);
    });
});

// plus_item
function increase_quantity(index) {
    if (product_cart[index].quantity < 10) {
        product_cart[index].quantity += 1;
    }
    save_localStorage();
    get_item_in_cart();
};

// minus_item
function decrease_quantity(index) {
    if( product_cart[index].quantity > 1) {
        product_cart[index].quantity -= 1;
    }
    else {
        const IdItem = product_cart[index].id;
        reset_button_state(IdItem);

        product_cart.splice(index , 1);
    }
    save_localStorage()
    get_item_in_cart();
};

// remove item
function remove_item_in_cart(index) {
    const IdItem = product_cart[index].id;
    reset_button_state(IdItem);

    product_cart.splice(index , 1);
    save_localStorage();
    get_item_in_cart();
};

// reset_button
function reset_button_state(id) {
    document.querySelectorAll(".btn_pro").forEach(botton => {
        if(  parseInt(botton.getAttribute("data-id")) === id ) {
            botton.classList.remove("active");
            botton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add To Cart`;
            botton.disabled = false;
        }
    });
};

//  save_localStorage
function save_localStorage() {
    localStorage.setItem("cart" , JSON.stringify(product_cart));
};

//  get_localStorage
function get_localStorage() {
    let savedCart = JSON.parse(localStorage.getItem("cart"));
    if(savedCart) {
        product_cart = savedCart;
    }
}; 
get_localStorage();

// update_button
function update_button() {
    document.querySelectorAll(".btn_pro").forEach(botton => {
        const id = parseInt(botton.getAttribute("data-id"));

        let foundBotton = product_cart.find(item => item.id === id);

        if(foundBotton) {
            botton.classList.add("active");
            botton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Item In Cart`;
            botton.disabled = true;
        }
        else {
            botton.classList.remove("active");
            botton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add To Cart`;
            botton.disabled = false;
        }
    });
};

window.addEventListener("DOMContentLoaded" , () => {
    get_item_in_cart();
    update_button();
});

//* scroll to top
let to_top = document.querySelector(".to_top");
    to_top.addEventListener("click" , () => {
        scrollTo({
            top: 0,
            behavior: "smooth",
        });
});


function go_to_checkout() {
    localStorage.setItem("cart", JSON.stringify(product_cart));
    window.location.href = "checkout.html";
};
