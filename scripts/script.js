// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  if(localStorage.getItem('items') === null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => localStorage.setItem('items', JSON.stringify(json)));
  }
  populatePage();
});

function populatePage() {
  let container = document.getElementById('product-list');
  let data = JSON.parse(localStorage.getItem('items'));
  for(i in data) {
    container.appendChild(new ProductItem(data[i].id, data[i].title, data[i].price, data[i].image));
  }
  document.getElementById('cart-count').innerHTML = localStorage.length - 1;
}