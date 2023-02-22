'use strict'
//ссылки на фотографии
const linkItem = {
	link1: "url('https://thumb.tildacdn.com/tild6630-3036-4130-a236-396663333735/-/format/webp/5901A8E2-4749-4A62-9.jpeg')",
	link2: "url('https://thumb.tildacdn.com/tild6630-3036-4130-a236-396663333735/-/format/webp/5901A8E2-4749-4A62-9.jpeg')",
	link3: "url('https://thumb.tildacdn.com/tild6630-3036-4130-a236-396663333735/-/format/webp/5901A8E2-4749-4A62-9.jpeg')",
	link4: "url('https://thumb.tildacdn.com/tild6630-3036-4130-a236-396663333735/-/format/webp/5901A8E2-4749-4A62-9.jpeg')",
}
// подписи к фотографиям
const textLinkItem = {
	title: 'Заказав этот букет, вы получите подарок:',
	link1: 'БЕСПЛАТНАЯ ОТКРЫТКА',
	link2: 'ПОДКОРМКА ДЛЯ ЦВЕТОВ',
	link3: 'ИНСТРУКЦИЯ К БУКЕТУ',
	link4: 'УПАКОВКА И АКВАБОКС',
}


function getArtikul() {
	const art = document.querySelectorAll('.js-product-sku')//получим все артикулы
	const discriptionCard = document.querySelector('.t-store__prod-popup__info')//описание продукта
	const div = document.createElement('div')
	div.innerHTML = `	
	<div class="newimg" style="
	font-family: 'Proxima',Arial,sans-serif;
	font-size: 1.1em;
	font-weight: bold;
	margin-bottom: 1em;
	">${textLinkItem["title"]}</div>
<div class="newimg" style="
display: flex;
gap: 1em;
font-family: 'Proxima',Arial,sans-serif;
font-size: .8em;
text-align: center;">

<div style="display: inline-block; width: 92px;" class="newimg1">
<div style=" width: 92px; height: 120px; background-image: ${linkItem['link1']} ; background-position: center; background-size: cover; background-repeat: no-repeat" class="img-item1"></div>
<div style=" width: 100%;" class="text-item1">${textLinkItem["link1"]}</div>
</div>



<div style="display: inline-block; width: 92px;" class="newimg1">
<div style=" width: 92px; height: 120px; background-image: ${linkItem['link2']} ; background-position: center; background-size: cover; background-repeat: no-repeat" class="img-item1"></div>
<div style=" width: 100%;" class="text-item1">${textLinkItem["link2"]}</div>
</div>


<div style="display: inline-block; width: 92px;" class="newimg1">
<div style=" width: 92px; height: 120px; background-image: ${linkItem['link3']} ; background-position: center; background-size: cover; background-repeat: no-repeat" class="img-item1"></div>
<div style=" width: 100%;" class="text-item1">${textLinkItem["link3"]}</div>
</div>


<div style="display: inline-block; width: 92px;" class="newimg1">
<div style=" width: 92px; height: 120px; background-image: ${linkItem['link4']} ; background-position: center; background-size: cover; background-repeat: no-repeat" class="img-item1"></div>
<div style=" width: 100%;" class="text-item1">${textLinkItem["link4"]}</div>
</div>


</div>`
	// добавляем подарки
	if (!discriptionCard.children[0].children[2].textContent.includes('0001') && !Boolean(document.querySelector('.newimg'))) {
		discriptionCard.children[4].after(div)

	}
	// убираем подарки
	if (discriptionCard.children[0].children[2].textContent.includes('0001') && Boolean(document.querySelector('.newimg'))) {
		document.querySelector('.newimg').remove()
		document.querySelector('.newimg').remove()
	}
}


// Ставим прослушку*********************************************************************
var target = document.querySelector('.t-popup')//описание продукта
// Конфигурация observer (за какими изменениями наблюдать)
const config = {
	// attributes: true,
	// childList: true,
	// subtree: true,
	attributeFilter: ['class'],//прослушиваем изменение в классе
};

// Колбэк-функция при срабатывании мутации
const callback = function (mutationsList, observer) {
	getArtikul();
	console.log('ПРОСЛУШКА ПРОШЛА')
};

// Создаём экземпляр наблюдателя с указанной функцией колбэка
const observer = new MutationObserver(callback);

// Начинаем наблюдение за настроенными изменениями целевого элемента
observer.observe(target, config);
//*******************************************************************************************

//добавим опции товара в корзине


function addOptions() {
	for (let i = 0; i < tcart.products.length; i++) {
		if (tcart.products[i].sku) continue
		console.log('добавть подпрок в опции')
		tcart.products[i].options = [
			{
				option: `Ваш подарок: ${textLinkItem["link1"]},
					${textLinkItem["link2"]},
			        ${textLinkItem["link3"]},
			        ${textLinkItem["link4"]}`, variant: 0, price: 0
			}
		]
	}
}

// addOptions()
// tcart__saveLocalObj()
// tcart__reDrawProducts()

//почистим название
function renameNameBasket() {
	const listBasket = document.querySelectorAll('.t706__sidebar-products [target="_blank"]')
	listBasket.forEach(e => {
		e.textContent = e.textContent.split(' : ')[0]
	})
}

// renameNameBasket()

const buttonBasket = document.querySelectorAll('[href="#order"]')//кнопка купить

buttonBasket.forEach(button => {
	button.addEventListener('click', () => {
		setTimeout(() => {
			addOptions();
			tcart__saveLocalObj();
			tcart__reDrawProducts();
			renameNameBasket();
		}, 300)

	})
})

