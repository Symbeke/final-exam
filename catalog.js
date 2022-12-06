document.querySelector("#user_email").innerHTML += localStorage.getItem("currentUserEmail");

let allcategories = document.querySelector("#allcategories")
let blockDiv = document.querySelector(".productblock")
let button = document.querySelector("#btn")
let addBtn = document.querySelector("#addCart")
let removeBtn = document.querySelector("#remove")
let resultBlock = document.querySelector("#result");
let searchButton = document.querySelector("#search");

let categorySelect = document.querySelector('#category_select');
    ;(async() => {
        let response = await fetch('https://dummyjson.com/products/categories')
        let categories = await response.json();
        categorySelect.innerHTML += `<option value="">Choose category</option>`
            for(let category of categories){
                categorySelect.innerHTML += `
                <option value="${category}">${category}</option>`
            }

    })();

async function loadProducts(selectedCategory) {
    let response = await fetch('https://dummyjson.com/products?limit=100')
    let products = await response.json();
    resultBlock.innerHTML="";
        allcategories.innerHTML = "";
        for(let product of products.products){
            if(selectedCategory){
            if(product.category == selectedCategory){
                allcategories.innerHTML += `
                <div class="productblock">
                    <div class ="image" style="background-image: url(${product.images[0]});">
                    </div> <br>
                    <span class="title">${product.title}</span>
                    <br>
                    <span class="price">${product.price}$</span><br>
                    <span class="titles">Category: ${product.category} </span> <hr>
                    <button id="btn" onClick="sendId(${product.id})">Add to cart</button><br>
                </div>`
            }}
           else{
            allcategories.innerHTML += `
                <div class="productblock">
                    <div class ="image" style="background-image: url(${product.images[0]});">
                    </div> <br>
                    <span class="title">${product.title}</span>
                    <br>
                    <span class="price">${product.price}$</span><br>
                    <span class="titles">Category: ${product.category} </span> <hr>
                    <button id="btn" onClick="sendId(${product.id})">Add to cart</button><br>

                </div>`
           }
        }
};
loadProducts();

function sendId(productId){
    let arr = JSON.parse(localStorage.getItem("key")) || [];

    arr.push({

                productId: productId,
                ownerEmail: localStorage.getItem("currentUserEmail")
            });
    localStorage.setItem("key", JSON.stringify(arr))
}

categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    loadProducts(selectedCategory)
});

removeBtn.addEventListener("click",()=> {
    localStorage.clear();
}
)
addBtn.addEventListener("click",()=>{
    location.href="cart.html"
})




 searchButton.addEventListener("click",async()=>{
    let itemSearch = document.querySelector("#search_item");
    let URL = 'https://dummyjson.com/products/'+`search?q=${itemSearch.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    allcategories.innerHTML = "";
    
    
        resultBlock.innerHTML = "";
        
    for(product of data.products){
       
        resultBlock.innerHTML +=
         `<div class="productblock">
         <div class ="image" style="background-image: url(${product.images[0]});">
        </div> <br>
        <span class="title">${product.title}</span>
        <br>
        <span class="price">${product.price}$</span><br>
        <span class="titles">Category: ${product.category} </span> <hr>
        <button id="btn" onClick="sendId(${product.id})">Add to cart</button><br>
    </div> `
        
    }
        itemSearch.value='';
})

