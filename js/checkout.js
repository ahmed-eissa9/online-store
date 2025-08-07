
// open_close_menu
const nav_link = document.querySelector(".nav_link");
function open_menu() {
    nav_link.classList.add("active");
}
function close_menu() {
    nav_link.classList.remove("active");
}





let item_order = document.querySelector(".item_order");

let product_cart = [];

let subtotal_price = document.querySelector(".subtotal_price");
let shipping_price = document.querySelector(".shipping_price");
let total_price = document.querySelector(".total_price");


function checkout_view() {
    let subtotal = 0;
    item_order.innerHTML = "";

    product_cart.forEach((product , index) => {
          item_order.innerHTML += `
            <div class="order_item"> 
                <img src="${product.img}" alt="">

                <div class="info_item">
                    <p class="name_item_in_cart">${product.name}</p>
                    <h6 class="price_item_in_cart"> $${product.price} </h6>
                    
                    <div class="plus_minus">
                        <button class="plus pm" onclick="minus_item(${index})"> - </button>
                        <span href="#" class="num"> ${product.quantity} </span>
                        <button class="minus pm" onclick="plus_item(${index})"> + </button>
                    </div>
                </div>

                <i class="fa-solid fa-trash" onclick="remove_item(${index})"></i>
            </div> 
        `;
        subtotal += Number(product.price) * Number(product.quantity);
    });

    subtotal_price.innerHTML = "$" + subtotal.toFixed(2);

    let shipping = subtotal === 0 ? 0 : (subtotal > 100 ? 0 : 10); 
    shipping_price.innerHTML =  "$" + shipping.toFixed(2);

    let total = shipping + subtotal;

    total_price.innerHTML =  "$" + total.toFixed(2);

    save_local();
};

function remove_item(index) {
    product_cart.splice(index , 1);
    checkout_view();
    save_local();
};

function plus_item(index) {
    if (product_cart[index].quantity < 10) {
        product_cart[index].quantity ++;
    }
    checkout_view();
    save_local();
};

function minus_item(index) {
    if( product_cart[index].quantity > 1 ) {
        product_cart[index].quantity --;
    }
    else {
        product_cart.splice(index , 1);
    }
    checkout_view();
    save_local(); 
};

function save_local() {
    localStorage.setItem("cart" , JSON.stringify(product_cart))
}

function get_local() {
    let saved = JSON.parse(localStorage.getItem("cart")) ;
    if(saved) {
        product_cart = saved
    }
}
get_local();

window.addEventListener("DOMContentLoaded" , () => {
    checkout_view();
});

