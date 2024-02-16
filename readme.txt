Команда для установки проекта (папка "node_modules" не копируется):
npm i

Команда для установки всех пакетов:
npm i gulp gulp-sass sass gulp-file-include gulp-clean gulp-server-livereload gulp-sourcemaps gulp-plumber gulp-notify gulp-group-css-media-queries --save-dev

Описание пакетов:
gulp - собственно Gulp
gulp-sass - Сборка SASS / SCSS
sass - Необходим для сборки SASS / SCSS
gulp-file-include - Подключение файлов друг в друга. HTML include
gulp-clean - Удаление файлов
gulp-server-livereload - Сервер с автообновлением страницы
gulp-sourcemaps - Исходные карты для CSS
gulp-plumber - Фикс ошибок при сборке
gulp-notify - Нотификации
gulp-group-css-media-queries - Группировка CSS медиа запросов

----------------------------------------------------------------------

Сборка скриптов. webpack, babel

Установка babel:
npm i gulp-babel @babel/core @babel/preset-env

- JS таск
- Настройки package-json

----------------------------------------------------------------------

Установка webpack:
npm i webpack-stream style-loader css-loader --save-dev

- JS таск
- webpack конфиг
- пример файлов с модулями

Пример с datepicker:
npm i air-datepicker -S


JS:
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

document.addEventListener('DOMContentLoaded', () => {
	new AirDatepicker('#my-element');
});

HTML:
<input type="text" id="my-element">

----------------------------------------------------------------------

Картинки:
npm i gulp-imagemin@7 --save-dev

.pipe(imagemin({ verbose: true }))


----------------------------------------------------------------------

Ускорение сборки

npm install --save-dev gulp-changed

- использование в картинках, HTML, JS, CSS


----------------------------------------------------------------------


web-p

npm i gulp-webp gulp-webp-html gulp-webp-css --save-dev

gulp-autoprefixer
gulp-webp
gulp-changed

в последних версиях используют ES-модульный синтаксис. 
Шпаргалка:
https://habr.com/ru/companies/ruvds/articles/556744/

gulp-webp-html
https://www.npmjs.com/package/gulp-webp-html

gulp-webp-css
https://www.npmjs.com/package/gulp-webp-css

Работа с npm

пример удаления пакета:
npm uninstall packname 

Пример вывода навигации через JSON:

<ul>
		<li><a href="@@pathIndex" class="active">Home</a></li>
		<li><a href="@@pathServices">Services</a></li>
		<li><a href="@@pathAbout">About</a></li>
		<li><a href="@@pathProjects">Projects</a></li>
		<li><a href="@@pathContact">Contact</a></li>
	</ul>

@@include('./blocks/nav.html', {
    "pathIndex":"index.html",
    "pathServices":"services.html",
    "pathAbout":"about.html",
    "pathProjects":"projects.html",
    "pathContact":"contact.html",
    })


