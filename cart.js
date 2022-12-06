let items = JSON.parse(localStorage.getItem('key'))

let productsDiv = document.querySelector("#products_list");
let blockDiv = document.querySelector(".productblock")
let sumDiv = document.querySelector("#total_sum")

let currentUser = localStorage.getItem("currentUserEmail")

let btnOrder = document.querySelector("#btn_order")
let orderDiv = document.querySelector("#order_list");

 async function loadProducts(){
    let response = await fetch('https://dummyjson.com/products?limit=100');
    let products =  await response.json();
    let sum = 0;
    let arr = JSON.parse(localStorage.getItem("orders")) || [];

    for(const product of products.products){
        let productId = product.id;

        for(item of items){
            let itemId = item.productId;
          let itemUser = item.ownerEmail;

        if(itemUser == currentUser && productId == itemId){
            sum += parseFloat (`${product.price};`)
            arr.push({product:product.title,price:product.price});
        productsDiv.innerHTML += `<div class="productblock"
        <div class ="image" style="background-image: url(${product.images[0]}) ;height:250px;
                    background-repeat: no-repeat;background-size: contain;background-position: center;">
                        </div>
                                <span class="title">${product.title}</span> <br> <br>
                                <span class="price">Price:${product.price}$</span><br><br>
                                <span class="title">Category:${product.category} </span><br>
                                <hr>
                                </div>`
                                
        }
        // localStorage.setItem("prices",JSON.stringify(prices))
    }

}
    sumDiv.innerHTML += sum;
    localStorage.setItem("sum",sum);
    localStorage.setItem("orders", JSON.stringify(arr))
    
};
loadProducts()

const sendEmail = (email,message) =>{
    const templateParams = {

        message: message,
        to_email: email
    };

    emailjs.send('service_7nqcgzn', 'template_9u11duf', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
}



btnOrder.addEventListener("click",()=>{

let orders = localStorage.getItem("orders");
let newArr = JSON.parse(orders)
 for (let index of newArr){
    orderDiv.innerHTML += `product:${index.product}\n price:${index.price}\n\n`
 }  

    let sum = localStorage.getItem("sum")
    orderDiv.innerHTML += `total sum is: `+ sum;
    sendEmail(currentUser,orderDiv.innerHTML)
    localStorage.removeItem("key");
})

