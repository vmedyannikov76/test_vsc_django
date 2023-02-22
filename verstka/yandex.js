"use strict";

function addScriptYandex() {//добавляем скрипт карт
	let script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = "https://api-maps.yandex.ru/2.1/?apikey=82ac3e43-a80e-4c6a-b2b5-59af00c94528&lang=ru_RU"
	document.head.append(script)
}
addScriptYandex()

function createCartBlock() {//добавляем блок в корзину
	const div = document.createElement('div');
	div.id = 'cart-block';
	div.style.height = '100px';//580 чтобы сразу показать карту и 100px чтобы изначально скрыть
	div.style.overflow = 'hidden';
	div.innerHTML = `
	<div id="map" style="width: 480px; height: 480px; margin: 0 auto;">
		<div class="t-input-group t-descr">
	<label style="display: block;" for="adresend">Адрес доставки</label>
	<input class="t706 t-form t-input t-input_bbonly" style="display: block;" type="text" name="adressend" id="adresend">
<!--	<input type="text" id="suggest">//проверка адреса-->
	</div>
</div>
	`
	const target = document.querySelector('.t706__orderform')
	target.prepend(div)
}
createCartBlock()


function init() {
	var suggestView1 = new ymaps.SuggestView('adresend');
	// Создание карты.
	var myMap = new ymaps.Map("map", {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [55.831856, 38.399217],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 10
	});
	// myMap.panTo([50.451, 30.522], {duration: 10000})//плавное перемещение к точке
	// Построение маршрута.

// По умолчанию строится автомобильный маршрут.
	var multiRoute = new ymaps.multiRouter.MultiRoute({

			// Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
			referencePoints: [
				[55.831856, 38.399217],//старт маршрута
				// 'Новосибирск улица Чехова, 324',// конечный маршрут
				document.getElementById("adresend").value?document.getElementById("adresend").value: [55.831856, 38.399217],// конечный
				// маршрут
				// [55.734876, 37.59308], // улица Льва Толстого, можно задать координатами
			],
			params: {//с учетом пробок
				avoidTrafficJams: true

			}
		},
		{
			// Внешний вид путевых точек.
			wayPointStartIconColor: "#ef3072",
			wayPointStartIconFillColor: "#B3B3B3",
			// Внешний вид линии активного маршрута.
			routeActiveStrokeWidth: 3,
			routeActiveStrokeStyle: 'solid',
			routeActiveStrokeColor: "#cb569d",
			// Внешний вид линий альтернативных маршрутов.
			routeStrokeStyle: 'dot',
			routeStrokeWidth: 0,
			boundsAutoApply: true
		},

		{
			// Автоматически устанавливать границы карты так,
			// чтобы маршрут был виден целиком.
			boundsAutoApply: true
		},
	);
	// Подписка на событие обновления данных маршрута.
	// Подробнее о событии в справочнике.
	// Обратите внимание, подписка осуществляется для поля model.
	multiRoute.model.events.add('requestsuccess', function () {
		// Получение ссылки на активный маршрут.
		var activeRoute = multiRoute.getActiveRoute();
		// Вывод информации о маршруте.
		route = +(activeRoute.properties.get("distance").value / 1000).toFixed(2)//выведем в глобальную переменную
		put = activeRoute.properties.get("distance").text
		console.log("Длина: " + activeRoute.properties.get("distance").text);
		console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
		// Для автомобильных маршрутов можно вывести
		// информацию о перекрытых участках.
		if (activeRoute.properties.get("blocked")) {
			console.log("На маршруте имеются участки с перекрытыми дорогами.");
		}
	});
	myMap.geoObjects.add(multiRoute);
}


// Добавление маршрута на карту.
let route
let put


let input = document.getElementById('adresend')
//определим вес груза
function getKG() {
	let kg = 0
	for (let i = 0; i < tcart.products.length; i++) {
	    if(tcart.products.length == 0) return
		kg += +tcart.products[i].pack_m* tcart.products[i].quantity
	}
	console.log(`Вес в тоннах ${(kg/1e6).toFixed(5)}, вес в кг ${kg/1e3.toFixed(4)}`)
	return kg>2e6? 100: 50;//если вес больше 2 тонн стоимость доставки 100р/км иначе 50р/км
}





input.addEventListener('change', () => {
	console.log('обработка адреса прошла')
	setTimeout(() => {
		//вносим изменение в корзину - добавляем доставку
		let deliveryCastom = {
			name: `Доставка (расстояние: ${route} * ${getKG()} руб/км)`,
			// price: (route * 35.54).toFixed(2),
			price: (route * getKG()),// для теста
			freedl: 0,//от какой суммы бесплатная доставка
			city: `${document.getElementById("adresend").value?document.getElementById("adresend").value: 'адрес не определен'}`,//выводим конечный адрес из поля ввода адреса корзины тильды
			street: "",//улица
			"service-id": "1234567890",
			hash: "a584a0785df829df61931bac09839711",
			postalcode: "123456",
			country: "ru",
			userinitials: ''//имя
		}
		tcart.delivery = deliveryCastom
		// сохраняем изменения и отображаем в корзине
		tcart__updateTotalProductsinCartObj()
		tcart__reDrawTotal()
		document.getElementById('cart-block').style.height = '580px'
		if (document.querySelector('#map').children.length>2) {
			console.log('добавлена новая карта')
			document.querySelector('#map').children[1].style.height = '0px'
			document.querySelector('#map').children[1].style.transition = 'all 0.8s ease-in-out'
			setTimeout(()=>{
				document.querySelector('#map').children[1].remove()
			},1e3)
		}
	}, 1e3)
	ymaps.ready(init);

})
//добавим обработчик запуска карты на кнопку корзины
document.querySelector('.t706__carticon-imgwrap').addEventListener('click', ()=>{
	ymaps.ready(init)
},1e3);







//попробуем отследить мутацию
// Ставим прослушку*********************************************************************
var target = document.querySelector('.t706__cartwin-products')//описание продукта
// Конфигурация observer (за какими изменениями наблюдать)
const config = {
    attributes: true,
    childList: true,
    subtree: true,
	attributeFilter: ['class'],//прослушиваем изменение в классе
};

// Колбэк-функция при срабатывании мутации
const callback = function(mutationsList, observer) {


// 	getArtikul();
	setTimeout(() => {
		// document.getElementById('map').style.height = '600px'
		// document.getElementById("results").textContent =
		// 	`Расстояние ${put} Стоимость доставки ${(route * 35.54).toFixed(2)} руб`

		//вносим изменение в корзину - добавляем доставку
		let deliveryCastom = {
			name: `Доставка (расстояние: ${route} * ${getKG()} руб/км)`,
			// price: (route * 35.54).toFixed(2),
			price: (route * getKG()),// для теста
			freedl: 0,//от какой суммы бесплатная доставка
			city: `${document.getElementById("adresend").value?document.getElementById("adresend").value: 'адрес не определен'}`,//выводим конечный адрес из поля ввода адреса корзины тильды
			street: "",//улица
			"service-id": "1234567890",
			hash: "a584a0785df829df61931bac09839711",
			postalcode: "123456",
			country: "ru",
			userinitials: '' //имя
		}
		tcart.delivery = deliveryCastom
		// сохраняем изменения и отображаем в корзине
		tcart__updateTotalProductsinCartObj()
		tcart__reDrawTotal()
		document.getElementById('cart-block').style.height = '580px'
		if (document.querySelector('#map').children.length>2) {
			console.log('добавлена новая карта')
			document.querySelector('#map').children[1].style.height = '0px'
			document.querySelector('#map').children[1].style.transition = 'all 0.8s ease-in-out'
			setTimeout(()=>{
				document.querySelector('#map').children[1].remove()
			},500)

		}


	}, 1e3)

	console.log('ПРОСЛУШКА ПРОШЛА')
};

// Создаём экземпляр наблюдателя с указанной функцией колбэка
const observer = new MutationObserver(callback);

// Начинаем наблюдение за настроенными изменениями целевого элемента
observer.observe(target, config);
//*******************************************************************************************






