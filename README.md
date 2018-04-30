# qr-extension

A browser extension to generate a QR-code from the page address

## Features:

~~1. Перевод текста в код~~
~~2. Вставка картинки с кодом на страницу~~
   ~~1. Создание HTML элементов на JavaScript~~
   2. Вставка HTML элементов в документ
   3. Удаление HTML элементов из документа
	4. Вставка стилей на JavaScript
3. Упаковать приложение в расширение
4. Добавление иконки расширения в адресную строку
5. Добавление в контекстное меню браузера
6. Иконки расширения

// 1. Слушать событие клика на иконке
// 2. Преобразовывать текущий адрес в QR code
// 3. Показать QR код поверх страницы только на текущей вкладке
var display = require('../serices/display')

messageChannel.onMessage('show-qr', function(){
    var url = ''
    display.showImage('')
})

setTimeout(function(){
    messageChannel.send('show-qr')
}, 2000)