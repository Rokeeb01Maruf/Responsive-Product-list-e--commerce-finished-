let carts = document.querySelector('.carts')

const details = [
    {
        src: 'image-waffle-desktop.jpg',
        name: 'Waffle',
        details: 'Waffle with Berries',
        price: 6.50
    },
    {
        src: 'image-creme-brulee-desktop.jpg',
        name: 'Creme Brulee',
        details: 'Vanilla Bean Creme Brulee',
        price: 7.00
    },
    {
        src: 'image-macaron-desktop.jpg',
        name: 'Macaron',
        details: 'Macaron Mix of Five',
        price: 8.00
    },
    {
        src: 'image-tiramisu-desktop.jpg',
        name: 'Tiamisu',
        details: 'Classic Tiramisu',
        price: 5.50
    },
    {
        src: 'image-baklava-desktop.jpg',
        name: 'Baklava',
        details: 'Pistachio Baklava',
        price: 4.00
    },
    {
        src: 'image-meringue-desktop.jpg',
        name: 'Pie',
        details: 'Lemon Meringue Pie',
        price: 5.00
    },
    {
        src: 'image-cake-desktop.jpg',
        name: 'Cake',
        details: 'Red Velevet Cake',
        price: 4.50
    },
    {
        src: 'image-brownie-desktop.jpg',
        name: 'Brownie',
        details: 'Salted Caramel Brownie',
        price: 5.50
    },
    {
        src: 'image-panna-cotta-desktop.jpg',
        name: 'Panna Cotta',
        details: 'Vanilla Panna Cotta',
        price: 5.50
    }
]

const eachProduct = document.querySelector('.each-product');
const productContainer = document.querySelector('.product-display');
let priceCount = document.querySelector('#header')
let totalCount = 0
let totalPrice = 0
let val 
let totalOrd = 0
let orderList = document.querySelector('.order-list')
let cartList = document.querySelector('.cart-list')
let cartBtn;

details.forEach(details => {
    const newProduct = eachProduct.cloneNode(true)
    newProduct.style.display='flex';
    const productImage = newProduct.querySelector('.product-image');
    const productName = newProduct.querySelector('.product-name');
    const productDetails = newProduct.querySelector('.product-details');
    const productPrice = newProduct.querySelector('.price');
    productImage.src = details.src
    productName.textContent = details.name
    productDetails.textContent = details.details
    productPrice.textContent = '$' + details.price.toFixed(2)
    let cartBtn = newProduct.querySelector('.buttons .btn-1');
    let countBtn = newProduct.querySelector('.buttons .btn-2');
    let btnInput = newProduct.querySelector('.buttons #input')
    cartBtn.addEventListener('click', ()=>{
        cartBtn.style.display='none';
        countBtn.style.display='flex';
        btnInput.value = 1
        val = btnInput.value
        let plus = newProduct.querySelector('#plus')
        let minus = newProduct.querySelector('.minus')
        totalCount++;

        
        let emptyCart = document.querySelector('.empty-cart');
        let totalBtn = document.querySelector('.total-button');
        let btns = document.querySelector('.btn')
        let cartList = document.querySelector('.cart-list');
        
        emptyCart.style.display='none';
        cartList.style.display='flex';
        totalBtn.style.display='block'
        btns.style.display='flex'
        let orderObj = {
            'Name' : productName.textContent,
            'Price' : productPrice.textContent,
            'src' : details.src
        }
        
        let cartTemplate = document.querySelector('.added-cart')
        let newCart = cartTemplate.cloneNode(true)
        newCart.style.display='flex'
        newCart.style.width='100%'
        let newCartName = newCart.querySelector('.cartProductName')
        let newCartPrice = newCart.querySelector('.cartProductPrice')
        let newCartAmount = newCart.querySelector('.cartProductAmount')
        let cartUnit = newCart.querySelector('.cartProductUnit')
        let cartCount = document.querySelector('#header')
        
        newCartName.textContent = orderObj.Name
        newCartPrice.textContent = '@' + orderObj.Price
        let Unit = parseFloat(orderObj.Price.replace('$', ''))
        totalPrice += Unit
        newCartAmount.textContent = '$' + (val*Unit).toFixed(2)
        cartUnit.textContent = val + 'x'
        let removeIcon = newCart.querySelector('.icon-remove')
        cartCount.textContent = 'Your Cart(' + totalCount + ')';
        let totalAmount = document.querySelector('.total h3')
        totalAmount.textContent = '$' + totalPrice.toFixed(2)
        plus.onclick =  ()=>{
            btnInput.value++;
            val = btnInput.value;
            cartUnit.textContent = val + 'x'
            newCartAmount.textContent = '$' + (val*Unit).toFixed(2)
            totalPrice += Unit
            totalAmount.textContent = '$' + totalPrice.toFixed(2)
        };
    
        minus.onclick =  (e)=>{
            btnInput.value--
            val = btnInput.value;
            cartUnit.textContent = val + 'x';
            newCartAmount.textContent = '$' + (val*Unit).toFixed(2)
            
        };

        removeIcon.onclick = ()=>{
            cartList.removeChild(newCart)
            orderObj = {}
            totalPrice -= Unit
            totalAmount.textContent = '$' + totalPrice.toFixed(2)
            btnInput.value = 0
            val = btnInput.value
            totalCount--;
            cartCount.textContent = 'Your Cart(' + totalCount + ')'
            if(totalCount === 0){
                emptyCart.style.display='block';
                cartList.style.display='none';
                cartBtn.style.display='flex';
                countBtn.style.display='none';
                totalBtn.style.display='none'
                btns.style.display='none'
                alert('Your cart is empty')
            }
            cartBtn.style.display='flex';
            countBtn.style.display='none';
        }
        cartList.appendChild(newCart)
        let confirmBtn = totalBtn.children[1]
        confirmBtn.addEventListener('click', ()=>{
            let overLay = document.querySelector('#overLay')
            let confirmPage = document.querySelector('.order-confirmed')
            confirmPage.style.display='block';
            overLay.style.display='block'
            let confirmedTemplate = document.querySelector('.main')
            let confirmedProduct;
            if (orderObj.src == undefined){
                confirmedProduct = ''
            }else{
                confirmedProduct = confirmedTemplate.cloneNode(true)
                confirmedProduct.style.display='flex'
            let cProductName = confirmedProduct.querySelector('.cartProductName')
            let cProductPrice = confirmedProduct.querySelector('.order-amounts')
            let cProductUnit = confirmedProduct.querySelector('.order-unit')
            let cProductPriceUnit = confirmedProduct.querySelector('.order-prices')
            cProductName.textContent = newCartName.textContent
            cProductPrice.textContent = newCartAmount.textContent
            cProductUnit.textContent = cartUnit.textContent
            cProductPriceUnit.textContent = newCartPrice.textContent
            let cImage = confirmedProduct.querySelector('.main img');
            cImage.src = orderObj.src
            let confirmContainer = document.querySelector('.order-list')
            let totalOrder = document.querySelector('.total-order h3')
            let ord = parseFloat(cProductPrice.textContent.replace('$', ''))
            totalOrd += ord
            totalOrder.textContent = '$' + totalOrd.toFixed(2)
            confirmContainer.appendChild(confirmedProduct)
            let confirmButton = document.querySelector('#btn3')
            confirmButton.addEventListener('click', (e)=>{
                e.preventDefault()
                alert('Order recieved')
                totalCount = 0
                totalPrice = 0
                val = undefined 
                totalOrd = 0
                totalOrder.textContent = '$' + totalOrd.toFixed(2)
                confirmContainer.innerHTML = ''
                cartList.innerHTML = ''
                cartCount.textContent = 'Your Cart(' + totalCount + ')'
                totalAmount.textContent = '$' + totalPrice.toFixed(2)
                confirmPage.style.display='none';
                overLay.style.display='none'
                cartBtn.style.display='flex';
                countBtn.style.display='none';
                countBtn.style.display='none';
                totalBtn.style.display='none';
                emptyCart.style.display='block';
                orderObj = {}
            })
            }
        })
    })
    


    productContainer.appendChild(newProduct)
})


