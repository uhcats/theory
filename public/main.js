const likeThumb = document.querySelector('#likeThumb'); const likeText = document.querySelector('#likeText');
let counter = 0;
likeThumb.addEventListener('click', () => {
  likeText.textContent = `Like ${counter++}`;
})
likeText.addEventListener('click', () => {
  likeText.textContent = `Like ${counter++}`;
})
