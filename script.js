// ================= BURGER DATA =================

const burgers = [
    {
        name: "Cheese Burger",
        price: 9.99,
        image: "image/bbbb.png"
    },
    {
        name: "Double Burger",
        price: 11.99,
        image: "image/bbb.png"
    },
    {
        name: "Chicken Burger",
        price: 10.99,
        image: "image/bbbbb.png"
    }
];


// ================= SELECT ELEMENTS =================

const orderButtons = document.querySelectorAll(".btn-1, .btn-2, .btn-3");

const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cart = document.getElementById("cart");

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

const heroOrderBtn = document.querySelector(".btn");
const viewMenuBtn = document.querySelector(".btn2");

const mobileCartBtn = document.getElementById("mobile-cart-btn");
const mobileCartCount = document.getElementById("mobile-cart-count");


// ================= CART =================

let cartItems = JSON.parse(localStorage.getItem("burgerCart")) || [];


// ================= SAVE CART =================

function saveCart() {localStorage.setItem("burgerCart", JSON.stringify(cartItems));}


// ================= UPDATE CART COUNT =================

function updateCartCount() {

    let totalItems = 0;

    cartItems.forEach(item => {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;

    mobileCartCount.textContent = totalItems;
}

mobileCartBtn.addEventListener("click", () => {

    renderCart();

    cart.classList.toggle("show");

});

// ================= ADD TO CART =================

function addToCart(index) {

    const burger = burgers[index];

    const existingBurger = cartItems.find(
        item => item.name === burger.name);

    if (existingBurger) {

        existingBurger.quantity++;

    } else {

        cartItems.push({ ...burger, quantity: 1});
    }

    saveCart();
    updateCartCount();
    showMessage(`${burger.name} added to cart`);

}


// ================= REMOVE FROM CART =================

function removeFromCart(index) {

    cartItems.splice(index, 1);

    saveCart();
    updateCartCount();
    renderCart();

}


// ================= CHANGE QUANTITY =================

function changeQuantity(index, amount) {

    cartItems[index].quantity += amount;

    if (cartItems[index].quantity <= 0) {

        cartItems.splice(index, 1);

    }

    saveCart();
    updateCartCount();
    renderCart();

}


// ================= RENDER CART =================

function renderCart() {

    if (cartItems.length === 0) {

        cart.innerHTML = `
            <div class="cart-box">
                <h2>Your Cart</h2>
                <p>Your cart is empty.</p>
            </div>
        `;

        return;
    }


    let totalPrice = 0;


    let cartHTML = `
        <div class="cart-box">

            <div class="cart-header">
                <h2>Your Cart</h2>
                <button id="close-cart">×</button>
            </div>

            <div class="cart-items">
    `;


    cartItems.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        totalPrice += itemTotal;


        cartHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h3>${item.name}</h3>

                    <p>$${item.price.toFixed(2)}</p>

                    <div class="quantity">

                        <button class="minus"
                            data-index="${index}">
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button class="plus"
                            data-index="${index}">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove"
                    data-index="${index}">
                    🗑️
                </button>

            </div>
        `;

    });


    cartHTML += `

            </div>

            <div class="cart-total">

                <h3>
                    Total:
                    $${totalPrice.toFixed(2)}
                </h3>

                <button id="checkout">
                    Checkout
                </button>

            </div>

        </div>
    `;


    cart.innerHTML = cartHTML;


    // CLOSE CART

    const closeCart =
        document.getElementById("close-cart");

    if (closeCart) {

        closeCart.addEventListener("click", () => {

            cart.classList.remove("show");

        });

    }


    // PLUS BUTTONS

    document.querySelectorAll(".plus")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                changeQuantity(index, 1);

            });

        });


    // MINUS BUTTONS

    document.querySelectorAll(".minus")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                changeQuantity(index, -1);

            });

        });


    // REMOVE BUTTONS

    document.querySelectorAll(".remove")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                removeFromCart(index);

            });

        });


    // CHECKOUT

    const checkout =
        document.getElementById("checkout");

    if (checkout) {

        checkout.addEventListener("click", () => {

            if (cartItems.length === 0) {
                return;
            }

            showMessage("Order placed successfully! 🍔");

            cartItems = [];

            saveCart();
            updateCartCount();
            renderCart();

        });

    }

}


// ================= ORDER BUTTONS =================

orderButtons.forEach(button => {

    button.addEventListener("click", () => {

        const index =
            Number(button.dataset.index);

        addToCart(index);

    });

});


// ================= CART BUTTON =================

cartBtn.addEventListener("click", () => {

    renderCart();

    cart.classList.toggle("show");

});


// ================= MOBILE MENU =================

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("show-menu");

});


// ================= MOBILE MENU LINKS =================

const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const text =
            link.textContent.trim().toLowerCase();


        if (text === "home") {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }


        if (text === "menu") {

            document.querySelector(".section3")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }


        if (text === "about") {

            document.querySelector(".section4")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }


        if (text === "contact") {

            document.querySelector(".footer")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }


        mobileMenu.classList.remove("show-menu");

    });

});


// ================= VIEW MENU =================

viewMenuBtn.addEventListener("click", () => {

    document.querySelector(".section3")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ================= HERO ORDER BUTTON =================

heroOrderBtn.addEventListener("click", () => {

    document.querySelector(".section3")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ================= MOBILE ORDER BUTTON =================

const mobileOrderBtn =
    mobileMenu.querySelector("button");

mobileOrderBtn.addEventListener("click", () => {

    document.querySelector(".section3")
        .scrollIntoView({
            behavior: "smooth"
        });

    mobileMenu.classList.remove("show-menu");

});


// ================= MESSAGE =================

function showMessage(message) {

    const oldMessage =
        document.querySelector(".message");

    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");

    messageBox.className = "message";

    messageBox.textContent = message;


    document.body.appendChild(messageBox);


    setTimeout(() => {

        messageBox.remove();

    }, 2500);

}


// ================= CART STYLE =================

const cartStyle = document.createElement("style");

cartStyle.textContent = `

#cart {
    position: fixed;
    top: 80px;
    right: 30px;
    width: 350px;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 1000;
    display: none;
}

#cart.show {
    display: block;
}

.cart-box {
    background: #0f0f1a;
    border: 1px solid #292939;
    border-radius: 15px;
    padding: 20px;
    color: white;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.cart-header h2 {
    margin: 0;
}

#close-cart {
    border: none;
    background: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    border-bottom: 1px solid #292939;
}

.cart-item img {
    width: 65px;
    height: 65px;
    object-fit: contain;
}

.cart-info {
    flex: 1;
}

.cart-info h3 {
    margin: 0;
    font-size: 15px;
}

.cart-info p {
    margin: 5px 0;
    color: #ffbf00;
}

.quantity {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity button {
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
}

.remove {
    border: none;
    background: none;
    cursor: pointer;
}

.cart-total {
    margin-top: 20px;
}

.cart-total h3 {
    margin-bottom: 15px;
}

#checkout {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 20px;
    background: #ffbf00;
    cursor: pointer;
    font-size: 16px;
}

.message {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #ffbf00;
    color: #111;
    padding: 12px 25px;
    border-radius: 25px;
    font-family: Arial, sans-serif;
    z-index: 2000;
    box-shadow: 0 5px 20px rgba(0,0,0,0.4);
}

.show-menu {
    display: flex !important;
}

@media (max-width: 768px) {

    #cart {
        top: 70px;
        right: 10px;
        left: 10px;
        width: auto;
    }

}

`;

document.head.appendChild(cartStyle);


// ================= INITIAL LOAD =================

updateCartCount();
renderCart();