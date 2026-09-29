const burger = [
    {name: "Cheese burger" , price: 9.99} ,
    {name: "Double burger" , price: 11.99},
    {name: "Chicken burger" , price: 10.99}
]

const carT = document.getElementById("cart");
const countCart = document.getElementById("count-cart");
const orderButtons = document.querySelectorAll(".btn-1 ,.btn-2 ,.btn-3");
orderButtons.forEach(function(button) {
    button.addEventListener("click" , function(event) {
        const index = event.target.dataset.index;

        const orderBurger = burger[index];
        cart.push(orderBurger);

        countCart.textContent = cart.length;

        const totalPrice = cart.reduce((total , item) => {
            return (total + item.price);
        } , 0);

        carT.textContent = "";
        cart.forEach(function(orderBurger) {
            carT.textContent += orderBurger.name + " -$" + orderBurger.price + "\n";
        })
        carT.textContent += "Total:" + totalPrice;
    })
})
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
carT.appendChild(deleteButton);