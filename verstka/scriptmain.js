//обработчик меню бургера
const burger = document.querySelector('.menu-burger');
const closed = document.querySelector('.cloced');
const menu = document.querySelector('.header');
burger.addEventListener('click', ()=>{
	menu.classList.toggle('open')
})
closed.addEventListener('click', ()=>{
	menu.classList.toggle('open')
})