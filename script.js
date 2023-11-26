//Open&Close Cart 
let cartIcon = document.getElementById("cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.getElementById("close-cart");
cartIcon.onclick = function(){
    cart.classList.add("active");
}
closeCart.onclick = function(){
    cart.classList.remove("active");
}
// add items to cart
let addCart = document.querySelectorAll(".add-cart");
for(var i = 0; i < addCart.length; i++){
    let add = addCart[i];
    add.addEventListener("click", function(event){
        var addOne = event.target;
        var priceAdded = addOne.previousElementSibling;
        console.log(priceAdded.innerHTML);
        var productTitleAdded = priceAdded.previousElementSibling;
        console.log(productTitleAdded.innerHTML);
        var productImgAdded = productTitleAdded.previousElementSibling;
        console.log(productImgAdded.src);

        //// DOM ////
        var cartBox = document.createElement("div");
        cartBox.className = "cart-box";
        var img = document.createElement("img");
        img.setAttribute("src",productImgAdded.src);
        img.className = "cart-img";
        var detailBox = document.createElement("div");
        detailBox.className = "detail-box";
        var cartProductTitle = document.createElement("div");
        cartProductTitle.className = "cart-product-title";
        cartProductTitle.innerHTML = productTitleAdded.innerHTML;
        var cartBoxPrice = document.createElement("div");
        cartBoxPrice.className = "cart-price";
        cartBoxPrice.innerHTML = priceAdded.innerHTML;
        var cartInput = document.createElement("input");
        cartInput.type = "number";
        cartInput.setAttribute("value", "1");
        cartInput.className = "cart-quantity";
        console.log(cartInput);
        var cartRemove = document.createElement("i");
        cartRemove.classList.add("bx", "bxs-trash-alt", "remove-cart");
        console.log(cartRemove);

        /// Add Elements To Cart 
        var content = document.querySelector(".cart-content");
        detailBox.appendChild(cartProductTitle);
        detailBox.appendChild(cartBoxPrice);
        detailBox.appendChild(cartInput);
        cartBox.appendChild(img);
        cartBox.appendChild(detailBox);
        cartBox.appendChild(cartRemove);
        content.appendChild(cartBox);
        upDateTotal();
        // Input Quantity in cart
        //var detailBoxs = content.getElementsByClassName("cart-box");
        
    });
}
// Functions
document.addEventListener("click", function(e){
    if(e.target.classList.contains("remove-cart")){
        e.target.parentNode.remove();
        upDateTotal();
    }
})

document.addEventListener("change", function(e){
    if(e.target.className == "cart-quantity"){
        if(isNaN(e.target.value) || e.target.value <= 0){
            e.target.value = 1;
        }
        upDateTotal();
    }
})
function upDateTotal(){
    let boxes = document.querySelectorAll(".cart-box");
    let total = 0;
        for(var i = 0; i < boxes.length; i++){
            let cartBox = boxes[i];
            let price = cartBox.getElementsByClassName("cart-price")[0];
            let quantity = cartBox.getElementsByClassName("cart-quantity")[0];
            let value = quantity.value;
            console.log(value);
            let Price = parseFloat(price.innerText.replace("$", ""));
            total = total + Price * quantity.value;
        }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total ;
}
let buyButton = document.querySelector(".buy-btn");
buyButton.onclick = function(){
    alert("Your Order is placed");
    let cartContent = document.querySelector(".cart-content");
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    upDateTotal();
}
