

# AJS. Тестирование и сборка

---

## План занятия

1. [unit-тестирование][unitest]
1. [Jest][jes]
1. [Покрытие кода][coverage]
1. [Mock'и][mock]
1. [Webpack][webp]

---

## [unit-тестирование][][unitest]

---

### Зачем нужны авто-тесты?

> Зачем нужны авто-тесты, мне проще проверить руками

> Зачем нужны авто-тесты, у меня итак всё работает

---

### Действительно, зачем?

Авто-тесты - это возможность обезопасить себя от потенциальных ошибок (при создании нового кода или модификации существующего).

Это некая гарантия того, что то, что работало до этого - не сломалось, и то, что мы пишем сейчас - работает так, как мы задумываем.

---

### Best Practices

В современном мире разработки написание авто-тестов считается одной из лучших практик создания поддерживаемого и качественного кода.

---

### Как и что тестировать?

Тестирование - отдельная большая область знаний, со своими методами, подходами и теорией.

На самом базовом уровне: запускаем программу или отдельный её кусочек (например, функцию) и сравниваем полученный результат с тем, что должен был получиться.

Результат совпадает - всё ок, нет - ошибка.

Если начнёте с этого - будет уже большой шаг вперёд, после чего нужно ознакомиться с тест-анализом, тест-дизайном и комбинаторикой.

---

## [Jest] [jes]

---

### Фреймворк тестирования

Чтобы нам не делать этого каждый раз вручную, нам нужен инструмент, который будет запускать наши функции, сравнивать результат и собирать статистику.

Инструментов достаточно много, мы с вами будем рассматривать [Jest](https://jestjs.io/en/).

---

### Установка

Для установки Jest выполним следующую команду:
```shell
$ npm install --save-dev jest babel-jest babel-core@^7.0.0-bridge.0
```

Пропишем скрипт `test`:
```json
  "scripts": {
    "start": "live-server dist",
    "test": "jest",
    "lint": "eslint .",
    "build": "babel src -d dist"
  },
```

---

### Общий вид теста

```javascript
test('<описание того, что проверяем>', () => {
  // Функция проверки
  
  // 1. Выполняем нужные нам действия
  TODO:
  
  // 2. Проверяем результат с помощью:
  expect(<что получили>).toBe(<что должно быть>);
})
```

---

### Примитивный тест

```javascript
test('should add two numbers', () => {
  const received = 1 + 1;
  const expected = 2;

  expect(received).toBe(expected);
})
```

---

### ESlint & Jest

Чтобы ESLint не ругался на Jest, мы можем либо добавить каталог с тестами в `.eslintignore` (плохая идея), либо прописать Jest в секцию `env` файла ``.eslintrc.json`:

```json
    "env": {
        ...
        "jest": true
    }
```

---

### Запуск авто-тестов

```shell
$ npm test
```

![](https://i.imgur.com/A96p1hq.png)

---

### Fail

В случае, если тесты завершатся с ошибкой, мы увидим:

![](https://i.imgur.com/CbpIynP.png)

---

### Задача

Перед нами стоит следующая задача: написать функцию, которая рассчитывает сумму покупок в магазине. 

Покупки приходят в следующем виде:
```javascript
[
  {id: 1, name: '...', price: 100, count: 3},
  {id: 2, name: '...', price: 55, count: 2},
]
```

Давайте попробуем написать эту функцию и авто-тесты для неё.

---

### Функция

Начнём с самой простой реализации (файл `script.js`):
```javascript
function calculateTotal(purchases) {
  let result = 0;
  for (const purchase of purchases) {
    result += purchase.price * purchase.count;
  }
  
  return result;
}
```

---

### Тест

Подумаем, как должен выглядеть тест для этой функции:

```javascript
test('should calculate total for purchases', () => {
  const input = [
    {
      id: 1, name: '...', price: 33, count: 3,
    },
    {
      id: 2, name: '...', price: 55, count: 2,
    },
  ];
  const expected = 1099;
  
  const received = calculateTotal(input);
  
  expect(received).toBe(expected);
});
```

---

### Системы модулей

Раньше в JS не было такого понятия, как модуль и браузер фактически "объединял" все подключаемые скрипты.

Это очень неудобно при разработке больших приложений, поэтому были разработаны системы, обеспечивающие модульность.

---

### Системы модулей

На текущий момен наиболее распространёнными являются следующие системы модулей:
- **CommonJS** – система модулей, нативно поддерживается на платформе Node.js
- **ES Modules** - система модулей, нативно поддерживаются в браузерах (текущий статус поддержки)

Под модулем мы будем понимать js-файл (достаточно упрощённое представление, но достаточное для нас на данном этапе).

Более подробно про модули мы поговорим на лекции, посвящённой модулям, сейчас же нам нужно понять ключевые моменты.

---

### Зачем нам две?

Большинство инструментов для JS написаны с использованием платформы Node.js, поэтому для них придётся использовать либо CommonJS, либо Babel (который обеспечит поддержку импорта в стиле ES Modules).

Поэтому придётся научиться использовать оба.

---

### Export / module.exports

Если мы хотим сделать имя (функцию, переменную либо объект) доступным из нашего модуля, то в ES Modules:
```javascript
export <some_name>;
export function <some_function>() { ... };
```

В CommonJS:
```javascript
module.exports = {
  <some_name>: <some_object>,
  <some_function>: function() { ... }
};
```

---

## Import / require

Если мы хотим использовать имя, экспортированное из другого модуля, в своём модуле, то в ES Modules:
```javascript
import { <name> } from '<path_to_module>';
```

В CommonJS:
```javascript
const <name> = require('<path_to_module>').<name>;
```

---

### Default export

Если вы экспортируете из модуля всего одно имя, то лучше использовать `default export`:
```javascript
export default function <some_function>() { ... }
```

```javascript
import <some_function> from '<path_to_modue>';
```

---
### Jest import/export

Jest в связке с Babel у нас настроен таким образом, что поддерживает `import`/`export`, но для этого нужно экспортировать нашу функцию:

```javascript
export default function calculateTotal(purchases) {
  let result = 0;
  for (const purchase of purchases) {
    result += purchase.price * purchase.count;
  }
  
  return result;
}
```

---

### Тест

```javascript
import puchasesTotal from '../src/js/script';

test('should calculate total for purchases', () => {
  const input = [
    {
      id: 1, name: '...', price: 33, count: 3,
    },
    {
      id: 2, name: '...', price: 55, count: 2,
    },
  ];
  const expected = 209;
  
  const received = calculateTotal(input);
  
  expect(received).toBe(expected);
});
```

---

### Tests & Git

Авто-тесты должны храниться вместе с нашим приложением, как и другие исходники. Таким образом, любой участник нашей команды, меняя что-то в нашем приложении сможет удостовериться, что ничего не сломал.

---

### Используем reduce

Попробуем воспользоваться методом массива `reduce` вместо цикла `for..of`:
```javascript
  return purchases.reduce(
    (acc, curr) => acc + curr.price * curr.count,
    0,
  );
```

У нас есть авто-тесты, мы можем их запустить, чтобы усдостовериться, что всё работает.

---

### Важно

Важно понимать, что польза от авто-тестов появляется только тогда, когда вы их регулярно пишите и используете.

А кроме того, постоянно совершенствуетесь в навыке написания тестов.

---

## [Покрытие кода] [coverage]

---

### Code coverage

Code Coverage - метрика, показывающая, насколько наш код покрыт авто-тестами.
```
$ npm test -- --coverage
```

![](https://i.imgur.com/z2v2eFR.png)

---

### Добавим логику

Пришло время модифицировать нашу функцию: в зависимости от переданного флага к итоговой сумме покупок должна применяться скидка 6.1%:
```javascript
export default function calculateTotal(purchases, applyDiscount = false) {
  ...
  
  if (applyDiscount) {
     return result * 0.939; // bad practice
  }
}
```

---

### Посмотрим на покрытие

![](https://i.imgur.com/jE8HsNN.png)

В каталоге `coverage/lcov-report` расположен отчёт о покрытии:

![](https://i.imgur.com/Kq8wrjD.png)

---

### Напишем тест

```javascript
test('should calculate total for purchases with discount', () => {
  ...
  const expected = 196.25;

  const received = purchasesTotal(input, true);

  expect(received).toBe(expected);
});
```

Тест упал: 

![](https://i.imgur.com/59NWYTx.png)

---

### Matchers

Jest нам предлагает различные виды проверок (не только на точное соответствие). Полный перечень Matcher'ов можно найти на странице: https://jestjs.io/docs/en/expect

В частности, в нашем случае хорошо бы подошёл `toBeCloseTo`.

---

### Как понять, что тестов достаточно?

Тесты должны помогать в разработке а не мешать. Именно они должны показывать, какие условия не протестированы, какие участки кода никогда не используются.

Значит:
1. Либо избыточны
1. Либо мы не можем сказать, что они работают корректно

Используйте подход TDD, который позволит уменьшить и количество разрабатываемого кода и количество разрабатываемых тестов.

---

## [Mock'и][mock]

---

### Mocks

Как протестировать функцию, которая взаимодействует с внешним миром (HTTP, файловая система и т.д.)? Неужели на каждый тест будет выполняться отдельный HTTP-запрос на сервер?

Конечно же, нет. Для этого существуют Mock'и.

---

### Mocks

```javascript
import { httpGet } from './http';

export default function loadUser(id) {
  const data = httpGet(`http://server:8080/users/${id}`); // bad practice
  return JSON.parse(data);
}
```

---

### Mocks

```javascript
import loadUser from '../src/js/user';
import { httpGet } from '../src/js/http';

jest.mock('../src/js/http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call loadUser once', () => {
  httpGet.mockReturnValue(JSON.stringify({}));

  loadUser(1);
  expect(httpGet).toBeCalledWith('http://server:8080/users/1');
});
```

---

### Setup & TearDown

* beforeEach
* afterEach
* beforeAll
* afterAll

https://jestjs.io/docs/en/setup-teardown

---

### Mocks

Использование mock'ов - не всегда хорошая идея, т.к. влечёт к избыточному усложнению тестового кода.

---

### Jest Extension

Для VSCode предоставляется плагин Jest за авторством Orta, который в автоматическом режиме перезапускает ваши тесты и отображает статус:

![](https://i.imgur.com/PopM8PT.png)

А также позволяет отлаживать их:

![](https://i.imgur.com/ngVYyRi.png)

---

## [Webpack][webp]

---

### Webpack

![](https://i.imgur.com/7NitRkV.png)

---

### Webpack

[Webpack](https://webpack.js.org) - Module Bundler для JS-приложений. Позволяет объединять все ресурсы нашего приложения в Bundle (преобразованные, минимизированные, оптимизированные) и готовые для использования в продакшн-среде.

---

### Webpack

На сегодняшний день - самый популярный инструмент сборки в мире JS. Содержит интеграции с большинством ругих популярных инструментов.

---

### Webpack

Для установки Webpack и поддержки Babel выполним следующую команду:
```shell
$ npm install --save-dev webpack webpack-cli babel-loader
```

В скриптах заменим `build`:
```json
"scripts": {
    ...
    "build": "webpack --mode production"
},
```

---

### Сборка

Выполним сборку:
```shell
$ npm run build
```

Удостоверимся, что появился каталог `dist`, в котором находится минимизированный файл `main.js`.

---

### Сборка HTML

Для сборки HTML-файлов нужен отдельный плагин: HTML Plugin

---

### HTML Plugin

Для установки выполним следующую команду:
```shell
$ npm install --save-dev html-webpack-plugin html-loader
```

## HTML Plugin

```javascript
module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
```

---

### CSS Plugin

Для поддержки CSS нам нужен отдельный плагин: Mini CSS Extract Plugin:

```shell
$ npm  install --save-dev mini-css-extract-plugin css-loader
```

---

### Mini CSS Extract Plugin

```javascript
module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
```

---

### Подключение CSS

Webpack требует использовать спец.синтаксис для построение графа зависимостей (чтобы подключить css):
```javascript
import '../css/styles.css';
```

---

## Live Server

После всех проделанных манипуляций, Live Server нам уже не поможет в разработке, т.к. мы достаточно глубоко интегрировали в свой проект Webpack.

Но решение есть - [Webpack Dev Server](https://github.com/webpack/webpack-dev-server).

## Webpack Dev Server

Для установки выполним следующую команду:
```shell
$ npm install --save-dev webpack-dev-server
```

И в скриптах заменим `start`:
```json
"scripts": {
    "start": "webpack-dev-server --mode development",
    "test": "jest",
    "lint": "eslint .",
    "build": "webpack --mode production"
},
```

---

### Webpack Dev Server

Запустим Dev Server и удостоверимся, что Live Reload работает при изменении файлов:

```shell
$ npm start
```

![](https://i.imgur.com/5dp8UIc.png)

Итоговый настроенный проект вы сможете найти в материалах к этой лекции.

---

## Итоги

---

### Итоги

Сегодня мы с вами рассмотрели достаточно много важных вещей, а именно:
1. Jest - позволяет создавать авто-тесты
1. Webpack - позволяет организовать сборку приложения и настроить dev server

В следующих лекциях мы будем продолжать использовать эти инструменты

---

### Важно

Начиная с сегодняшнего дня во всех домашних заданиях мы будем требовать от вас:
1. Наличия авто-тестов на разрабатываемые функции
1. 100% покрытия тестируемых функций по строкам
1. Использования Webpack для сборки ваших проектов

---

### Полезные ссылки

* [Документация Jest](https://jestjs.io/docs/en/getting-started)
* [Документация Webpack](https://webpack.js.org/concepts/)
* [Документация Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)
