// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // TODO
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(json => localStorage.setItem('items', JSON.stringify(json)))
    .then(populatePage());
});

function populatePage() {
  let container = document.getElementById('product-list');
  let data = JSON.parse(localStorage.getItem('items'));
  for(i in data) {
    container.appendChild(new ProductItem(data[i].id, data[i].title, data[i].price, data[i].image));
  }
  document.getElementById('cart-count').innerHTML = localStorage.length - 1;
}