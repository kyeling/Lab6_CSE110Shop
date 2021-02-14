// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(prod_id, prod_title, prod_price, image_url) {
    super();
    let shadow = this.attachShadow({mode: 'open'});

    let product = document.createElement('li');
    product.setAttribute('class', 'product');

    let img = product.appendChild(document.createElement('img'));
    img.setAttribute('src', image_url);
    img.setAttribute('alt', prod_title);

    let title = product.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.textContent = prod_title;

    let price = product.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = "$" + prod_price;
    
    let btn = product.appendChild(document.createElement('button'));
    // btn.onclick = function() { alert('Added to Cart!') }; 
    if(localStorage.getItem(prod_id) === null){
      btn.textContent = "Add to Cart";
    } else {
      btn.textContent = "Remove from Cart";
    }
    btn.addEventListener('click', function() {
      let count = document.getElementById('cart-count');
      if(localStorage.getItem(prod_id) === null){
        // if item hasn't been added to cart
        alert("Added to cart!");
        btn.innerHTML = "Remove from Cart";
        count.innerHTML = Number(count.innerHTML) + 1; 
        localStorage.setItem(prod_id, JSON.parse(localStorage.getItem('items'))[prod_id - 1]);
      } else {
        // if item has been added to cart
        alert("Removed from cart!");
        btn.innerHTML = "Add to Cart";
        count.innerHTML = Number(count.innerHTML) - 1; 
        localStorage.removeItem(prod_id);
      }
    });

    shadow.appendChild(product);
    this.addStyle(shadow); // appends css formatting to shadowRoot
  }

  /* style for constructor */
  addStyle(shadow) {
    let style = document.createElement('style');
      style.textContent = `
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
        max-height: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }`;
  
      shadow.appendChild(style);
  }
}

customElements.define('product-item', ProductItem);

