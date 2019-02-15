---
title: Контейнеры
slideOptions:
  transition: slide
---

# AJS. Контейнеры

###### tags: `netology` `advanced js`

---

## План занятия
1. Set
1. Map
1. WeakSet, WeakMap

---

## Контейнеры

Обновление ES6 предоставило возможность использовать несколько новых для языка структур данных, о которых мы сегодня и поговорим.

---

## Контейнер Set

---

## Пример

Предположим мы делаем интренет-магазин, и нам нужно реализовать фильтр по размерам, для этого нужно определить все существующие значения поля `size` из массива объектов `products`.

```javascript=
const products = [
  {
     name: 'balenciaga triple s',
     sizes: [39, 42, 45],
  }, 
  ... 
];
```

---

## Быстрое решение 

Первая мысль положить все размеры в один массив.

```javascript=
const sizes = products.reduce((result, product) => {
  result.push(...product.sizes);
    
  return result;
}, []);

```

---

## Анализ решения

Не совсем корректно работает так как в итоговом массиве будут дубли.

```javascript
console.log(sizes); // [39, 42, 45, 39, 42, 43]
```

Для устранения дублей еще раз пробежимся по массиву `sizes`.

--- 

## Убираем дубли 

Воспользуемся свойством объекта - уникальности ключей.

```javascript=
const uniqueSizes = sizes.reduce((result, size) => {
  result[size] = true;
    
  return result;    
}, {});

console.log(Object.keys(uniqueSizes)); // ['39', '42', '43', '45'] уже строки!
```

---

## Итоговое решение

```javascript=
const sizes = products.reduce((result, product) => {
  result.push(...product.sizes);
    
  return result;
}, []);

const uniqueSizes = sizes.reduce((result, size) => {
  result[size] = true;
    
  return result;    
}, {});

console.log(Object.keys(uniqueSizes)); // ['39', '42', '43', '45'] уже строки!
```

---

## Анализ решения

Недостатоки получившегося решения:
- сложный для понимания алгоритм;
- поменялся тип значения размера (стал строкой)

Решение: использовать нативный класс `Set`.

---

## Упростим существующий код

Упростим существующий код, применив `Set`.

```javascript=
const sizes = products.reduce((result, product) => {
    product.sizes.forEach(size => result.add(size));
    
    return result;
}, new Set());

console.log([...sizes]); // // [39, 42, 43, 45] числа!
```

Размеры не поменяли тип (остались числами)!

---

## Что за новый тип коллекций Set?

Класс позволяющий хранить только уникальные значения какого-либо типа.

```javascript=
const set = new Set([1, 2, 2]);

console.log(set); // Set(2) {1, 2}
```
но
```javascript
const set = new Set([1, 2, '2']);

console.log(set); // Set(2) {1, 2, '2'}
```

Важно, что значения одного типа.

---

## Нюанс работы объектами 

```javascript=
const set = new Set([{foo: 'bar'}, {foo: 'bar'}]);

console.log(set.size); // 2
```

Потому что объекты в JS сравниваются по ссылкам!

```javascript
{} === {} // false
{} == {} // false
```

---

## Алгоритм сравнения

Элементы сравниваются подобно оператору `===`, но есть исключение на `NaN`.

```javascript=
NaN === NaN // false

const set = new Set([NaN]);

set.size // 1
set.has(NaN) // true
```

---

## Интерфейс класса Set

```javascript=
const set = new Set();
set.add('foo')
set.has('foo') // true
set.size // 1

set.delete('foo') // true, вернется false если изначально не было поля 'foo'
set.has('foo') // false

set.clear();
set.size // 0
```

---

## Итерация по массиву

```javascript=
const set = new Set([39, 42, 41]);

// 1 способ - как итератор
for (const size of set) {
  console.log(size); 
}

// 2 способ - через метод forEach 
set.forEach(size => console.log(size))
```

---

## Выводы

Зачем нужен контейнер Set, если у нас уже есть массивы?

> Если необходимо выделить только уникальные значения.

---

## Контейнер Map

---

## Пример

Предположим мы делаем интернет-магазин, и нам нужно сохранять, дополнительную информацию о пользователе.

```javascript=
const privateData = {};

const Client {
  constructor(name, phone, address) {
    this.name = name;
    this.phone = phone;
        
    privateData.push({
      name,
      phone,
      address,
    });
  }

  getAddress() {
    // ...
  }
}
```

---

## Реализация getAddress

```javascript=
getAddress() {
  const isSuitable = data => (
    data.phone === this.phone &&
    data.name === this.name
  );
    
  const suspected = privateData.filter(isSuitable);
    
  return suspected[suspected.length - 1].address;
}
```

--- 

## Анализ решения

Недостатоки получившегося решения:
- сложный для понимания алгоритм;
- завязка на необходимое число полей (phone, name) для индификации, при расширении кода можно потерять.

Решение: использовать нативный класс Map.

---

## Упростим существующий код

```javascript=
const privateData = new Map();

class Client {
  constructor(name, phone, address) {
    this.name = name;
    this.phone = phone;
     
    privateData.set(this, { name, phone, address });
  }
      
  getAddress() {
    return privateData.get(this).address;
  }
}
```

---

## Что за новый тип коллекций Map?

Класс позволяющий хранить пары ключ - значение, особенности:
- любое значение может быть ключем (даже объект);
- сохраняет порядок вставки.

```javascript=
const map = new Map([['foo', 1], ['bar', 2]]);

console.log(map); // Map(2) {"foo" => 1, "bar" => 2}
```

---

## Объект как ключ

```javascript=
const map = new Map();
const buyerContacts = {
  phone: 123456789, 
  email: 'test@test.ru',
};
map.set(buyerContacts, 'Ivan');

map.get(buyerContacts); // Ivan
```

---

## Нюанс при работе с объектами в качестве ключей

```javascript=
const map = new Map([
  [{ foo: 1 }, 'bar'], 
  [{ foo: 1 }, 'bar'],
]);

console.log(map.size); // 2
```

Потому что объекты в JS сравниваются по ссылкам!

```javascript
{} === {} // false
{} == {} // false
```

---

## Алгоритм сравнения 

Элементы сравнивается при поиске подобно оператору ===, но есть исключение на NaN.


```javascript=
NaN === NaN; // false

const map = new Map([NaN, 'test']);

map.size; // 1
map.get(NaN); // test
```

---

## Сохранение порядка вставки

Итерируется в том же порядке что и добавлялись ключи

```javascript
const map = new Map();
map.set('foo', 1);
map.set('bar', 2);

map.forEach((item) => {
  console.log(item);
});
// 1
// 2
```

---

## Интерфейс класса Map

```javascript=
const map = new Map();
map.set('foo', 1);
map.set('bar', 2);
map.has('foo'); // true
map.size; // 2

[...map.keys()]; // ['foo', 'bar']

map.delete('foo'); // true
// вернется false если изначально не было поля 'foo'

map.has('foo'); // false

map.clear();
map.size; // 0
```

---

## Выводы

Зачем нужен контейнер Map, если у нас уже есть объекты?

> Если не хватает строковых ключей и необходимо знать порядок вставки ключей.

---

## Weak-контейнеры

---

## Пример

Возвращаясь к предыдущему примеру со скрытой информацией пользователя

```javascript
const privateData = new Map();

class Client {
  constructor(name, phone, address) {
    this.name = name;
    this.phone = phone;
        
    privateData.set(this, { name, phone, address });
  }
      
  getAddress() {
    return privateData.get(this).address;
  }
}
```
можем заметить, что если instance Client будет удален, то информация по нему в privateData останется в памяти, так как есть ссылка из privateData.

Решение: использовать WeakMap

---

## WeakMap-контейнер

Тот же Map-контейнер, содержащий пары ключ - значение, с особенностями
- ключом могут быть только объекты;
- не припятствует сборщику мусора.

---

## Взаимодействие сборщика мусора и WeakMap - контейнера

Из примера выше

```javascript
const privateData = new WeakMap();

class Client {
  constructor(name, phone, address) {
    this.name = name;
    this.phone = phone;
       
    privateData.set(this, { name, phone, address });
  }
      
  getAddress() {
    return privateData.get(this).address;
  }
}
```

получаем, что при удалении экземпляра Client, удалиться информация из privateData.

---

## Особенность ключей в WeakMap

Ключи WeakMap не перечисляемы, в силу отстутствия борьбы со сборщиком мусора (ссылки являются "слабыми").

Если нужен список ключей, придется реализовывать отдельно.

---

## Кратко о WeakSet

Тот же Set-контейнер, содержащий уникальные значения, с особенностями
- в качестве значений могут быть только объекты;
- не припятствует сборщику мусора.

Вообщем так, же как и WeakMap.

---

## Выводы

Зачем нужны Weak-контейнеры?

> По сравнению с другими контейнерами (Set и Map), реализуют "слабые" связи, и не препятствуя сборщику мусора экономят память и при этом еще и упрощая код.

---

## Итоги

Сегодня мы с вами рассмотрели достаточно много важных вещей:
1. Set
1. Map
1. WeakSet, WeakMap

---

## Спасибо за внимание :)

---
