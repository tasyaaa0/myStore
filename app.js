let cosmetics = [
    { name: "DIOR blush", price: 2000 , img: "img/diorblush.png" },
    { name: "ESTEE LAUDER tone", price: 2800 , img: "img/esteeLauder.png" },
    { name: "KIKO lip combo", price: 1100 , img: "img/kikoCombo.png" },
    { name: "HOURGLASS face  pallete", price: 2800 , img: "img/hourgalssFace2.png" },
]
function updatecosmetics() {
    let out_1 = document.querySelector(".out-1")
    out_1.innerHTML = "" // clear list
    for (let i = 0; i < cosmetics.length; i++) {
        let li = document.createElement("li")
        li.innerHTML = `
            <div class="cartochka">
            <img src="${cosmetics[i].img}"></img>
            <span>product-${cosmetics[i].name}</span>
            <span>price-${cosmetics[i].price}</span>
            <button class="toCart">add to cart</button>
            </div>
`
        out_1.append(li)
        let toCart = li.querySelector(".toCart")
        toCart.onclick = function () {
            addToCart(cosmetics[i])
        }
    }
}
updatecosmetics()
function addcosmetics() {
    let i_name = document.querySelector(".i-name")
    let i_price = document.querySelector(".i-price")
    let i_img = document.querySelector(".i-img")
    cosmetics.push({ name: i_name.value, price: i_price.value, img: i_img.value })
    console.log(cosmetics)
    updatecosmetics()
}
document.querySelector(".b-add").onclick = addcosmetics



// 2222222222222222222222222222222222
let Cart = []

function updateCart() {
    let out2 = document.querySelector(".out-2")
    out2.innerHTML = ""
    let total = 0
    for (let i = 0; i < Cart.length; i++) {
        let li = document.createElement("li")
        li.dataset.item = `${i}`
        li.innerHTML =
            `
        <img src="${Cart[i].img}">
        <span>${Cart[i].name}</span>
        <button class="btn-minus" data-index="${i}">-</button>
        <span>${Cart[i].quantity}pcs</span>
         <button class="btn-plus" data-index="${i}">+</button> 
        <span>${Cart[i].price}</span>
        <button class="removeBtn">🗑</button>
        `
        out2.append(li)
        total += Cart[i].price * Cart[i].quantity
        document.querySelector(".total").innerHTML = `total :${total} uah`
    }

    // кнопка замовити
        let cartSend = document.querySelector(".cart-send")
        cartSend.innerHTML = "Замовити"
        cartSend.style.cssText = `
            background-color:#ffbeeb;
            padding:7px 12px;
            color:white;
            cursor:pointer;
        `
     cartSend.onclick = clearCart
    let btnPlus = document.querySelectorAll(".btn-plus")
        for (let i = 0; i < btnPlus.length; i++) {
            btnPlus[i].onclick = function () {
                plusQuantity(btnPlus[i].dataset.index)
            }
        }

    let btnMinus = document.querySelectorAll(".btn-minus")
    for (let i = 0; i < btnMinus.length; i++) {
        btnMinus[i].onclick = function () {
            minusQuantity(btnMinus[i].dataset.index)
        
        }
    }
    let removeBtn = document.querySelectorAll(".removeBtn")
            for(let i=0; i<removeBtn.length; i++){
            removeBtn[i].onclick = function(){
               let numCart = this.parentElement.dataset.item
               removeFromCart(numCart)
            }
    }
}

// +
function plusQuantity(index) {
    Cart[index].quantity++
    updateCart()
}
function minusQuantity(index) {
    if (Cart[index].quantity > 1) {
        Cart[index].quantity--
    } else {
        Cart[index].quantity = 0
    }

    updateCart()
}
// del
function removeFromCart(index) {
    if (index !== -1) {
        Cart.splice(index, 1)
    }
    updateCart()
 
}


function addToCart(cosmeticsEl) {
    let checkCosm = null
    for (let i = 0; i < Cart.length; i++) {
        if (Cart[i].name == cosmeticsEl.name) {
            checkCosm = Cart[i]
            break
        }
    }
    if (checkCosm == null) {
        Cart.push({ ...cosmeticsEl, quantity: 1 })
    } else {
        checkCosm.quantity++
    }
    console.log(Cart)
    updateCart()
}
function clearCart(){
    total = 0
    document.querySelector(".total").innerHTML = `total :${total} uah`
    Cart.length = 0
    updateCart()
    let cartArea = document.querySelector(".cart-area")
    let send = document.createElement("div")
    send.innerHTML = "Замовлення прийняте!🌸" + `<img class="gif" src="https://i.pinimg.com/originals/88/23/7d/88237d1913c2c27c717611d4528792bf.gif">`
    send.classList.add("order-message")
    cartArea.append(send)

    setTimeout(function(){
        send.remove()
        
    },2900)
}

