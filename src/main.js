import './styles/main.scss';

const element = document.createElement('h1');
element.innerText = 'Hello Webpack 4!';

document.getElementById('app').appendChild(element);


// Test for polyfill bundling
var array = [1,2,3];
Array.from(array).forEach(($item) => {
  console.log($item);
});