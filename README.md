# Темы PulseSync 2.0
## Предисловие
В PulseSync 2.0 была реализована новая функциональность — возможность создания настроек для тем. Это позволяет пользователям настраивать внешний вид и поведение тем под свои предпочтения, делая их более гибкими и персонализированными. В данном руководстве мы шаг за шагом разберем, как создать простую тему с поддержкой настроек. Вы узнаете, как работать с конфигурационными файлами, добавлять параметры настройки и интегрировать их в тему. Даже если вы новичок, этот гайд поможет вам разобраться в основах и создать свою первую тему с настройками.

> ⚠️ **ВНИМАНИЕ!**
>
> Перед использованием не стоит брать эту тему за основу для редактирования. Она создана для того, чтобы помочь понять, как создавать темы и использовать `handleEvents.json`. Пожалуйста, используйте свои знания, а также документацию по **JavaScript** и **JSON** для работы с кодом темы.
>
> ⚠️ **Код может работать некорректно на новых версиях!** ⚠️

## Файловая структура проекта
    📂 ExampleTheme
    ├── banner.jpg
    ├── handleEvents.json
    ├── image.png
    ├── metadata.json
    ├── README.md
    ├── script.js
    └── style.css

---

### banner.jpg
Изображение для баннера темы. Поддерживаются форматы: `.GIF`, `.JPEG`, `.JPG`, `.PNG`.

---

### image.png
Иконка темы. Поддерживаются форматы: `.GIF`, `.JPEG`, `.JPG`, `.PNG`.

---

### handleEvents.json
Файл с настройками темы. Структурированный файл с секциями и настройками.

---

### metadata.json
Файл с метаданными темы. Включает название, описание, версию, автора и другую информацию.

---

### README.md
Файл с полным описанием темы. Содержит подробную информацию о настройках и использовании темы. Может содержать изображения и ссылки.

---

### script.js
Основной скрипт темы. Отвечает за логику и функциональность, включая обработку событий и взаимодействие с пользователем.

---

### style.css
Файл стилей темы. Определяет внешний вид: цвета, шрифты, отступы и другие визуальные элементы.

## Оформление темы
> Иконка, баннер и полное описание не являются обязательными, но рекомендуются для придания теме более опрятного и завершённого вида.

### Иконка
Для начала можно добавить иконку темы. В нашем случае это файл `image.png` с размерами **250x250**. Вы можете использовать другие размеры, но рекомендуется придерживаться квадратного формата для лучшего отображения. Обратите внимание, что в PulseSync иконка пока не применится автоматически — мы подключим её позже.

### Баннер
По аналогии с иконкой добавляем баннер. В нашем случае это файл `banner.jpg` с размерами **2150x550**. Баннер также не применится автоматически — это будет сделано на следующем этапе.

### Информация о теме
Теперь заполним информацию о теме и подключим добавленные изображения. Для этого создадим файл `metadata.json` со следующим содержимым:

```json
{
    "name": "ExampleTheme",
    "image": "image.png",
    "banner": "banner.jpg",
    "author": "WolfySoCute, PulseSync LLC",
    "description": "Ознакомительная тема",
    "version": "1.0.0",
    "css": "style.css",
    "type": "script", // script / theme
    "script": "script.js",
    "tags": [
      "learn file"
    ]
}
```
**Значение полей:**
- `name` - Название темы.
- `image` - Файл иконки.
- `banner` - Файл баннера.
- `author` - Автор темы.
- `description` - Краткое описание темы.
- `version` - Версия темы.
- `css` - Файл стилей (`style.css`).
- `type` - Тип дополнения. Может быть `script` или `theme`.
  - `script` - Используется для аддонов. Позволяет запускать сразу несколько аддонов.
  - `theme` - Используется для тем. Тема может быть выбрана только одна
- `script` - Файл скрипта (`script.js`).
- `tags` - Список тегов для удобной категоризации.

### Полное описание
Для добавления подробного и красивого описания темы создадим файл `README.md`. В этом файле можно разместить расширенную информацию о теме, инструкции по установке, настройке и использованию. Используя **Markdown-разметку**, вы можете оформить текст с заголовками, списками, таблицами и другими элементами для удобства восприятия.

## Написание темы

### CSS-стили
Если вам не требуются сложные настройки и динамические изменения, то для оформления темы достаточно использовать только **CSS-стили**. С их помощью можно переопределять существующие классы и редактировать их под свои нужды.

Например, чтобы отключить отображение "пульсации" на главном экране, добавим в файл `style.css` следующий код:

```css
/* Отключение пульсации */
div[data-test-id="VIBE_ANIMATION"] {
	display: none;
}
```

Эти стили будут постоянно применяться при активной теме.

---

### Добавляем настройки
CSS-стили — это удобно, но что если нужно дать пользователю возможность настраивать тему прямо в PulseSync? Для этого мы добавим настройки через файл `handleEvents.json`.

> Настройки можно добавлять и редактировать прямо в PulseSync, но в этом руководстве мы рассмотрим ручное редактирование файла. Это поможет лучше понять структуру `handleEvents.json`.

#### Структура файла
Рассмотрим простой пример структуры `handleEvents.json`:
```json
{
  "sections": [
    {
      "title": "Секция",
      "items": [
        {
          "id": "exampleButton",
          "name": "Кнопка",
          "description": "Пример кнопки",
          "type": "button",
          "bool": false,
          "defaultParameter": false
        },
      ]
    }
  ]
}
```

В этом примере создана одна секция с одной кнопкой.

**Значение полей:** 
- `sections` - Список секций с настройками.
  - `title` - Название секции.
  - `items` - Список настроек в секции.
    - `id` - Уникальный идентификатор настройки.
    - `name` - Отображаемое имя настройки.
    - `description` - Описание настройки.
    - `type` - Тип настройки. Возможные значения: `button`, `color`, `text`.
    - `bool` - Текущее состояние кнопки (`true` — активно, `false` — неактивно).
    - `defaultParameter` - Значение по умолчанию.

#### Типы настроек

Каждый тип настройки имеет свои уникальные поля:

1. **Кнопка**
- `id` - Уникальный идентификатор.
- `name` - Отображаемое имя.
- `description` - Описание.
- `type` - `button`.
- `bool` - Текущее состояние (`true`/`false`).
- `defaultParameter` - Значение по умолчанию.
```json
{
  "id": "exampleButton",
  "name": "Кнопка",
  "description": "Пример кнопки",
  "type": "button",
  "bool": false,
  "defaultParameter": false
}
```
---

2. **Выбор цвета**
- `id` — Уникальный идентификатор.
- `name` — Отображаемое имя.
- `description` — Описание.
- `type` — `color`.
- `input` — Текущее значение цвета в HEX-формате.
- `defaultParameter` — Значение по умолчанию.
```json
{
  "id": "exampleColor",
  "name": "Выбор цвета",
  "description": "Пример выбора цвета",
  "type": "color",
  "input": "#fff",
  "defaultParameter": "#fff"
}
```
---

3. **Текстовые поля**
- `id` - Уникальный идентификатор.
- `name` - Отображаемое имя.
- `description` - Описание.
- `type` - `text`.
- `buttons` - Список текстовых полей.
  - `id` - Уникальный идентификатор поля.
  - `name` - Название поля.
  - `text` - Текущее значение.
  - `defaultParameter` - Значение по умолчанию.

```json
{
  "id": "exampleText",
  "name": "Текстовые поля",
  "description": "Пример текстовых полей",
  "type": "text",
  "buttons": [
    {
      "id": "ExampleTextField",
      "name": "Пример текстового поля 1",
      "text": "Текстовое поле 1",
      "defaultParameter": "Текстовое поле 1"
    },
    {
      "id": "ExampleTextFieldTwo",
      "name": "Пример текстового поля 2",
      "text": "Текстовое поле 2",
      "defaultParameter": "Текстовое поле 2"
    }
  ]
}
```
---

4. **Слайдер**
- `id` - Уникальный идентификатор.
- `name` - Отображаемое имя.
- `description` - Описание.
- `type` - `slider`.
- `min` - Минимальное значение слайдера.
- `max` - Максимальное значение слайдера.
- `step` - Шаг слайдера.
- `value` - Текущее значение.
- `defaultParameter` - Значение по умолчанию.
```json
{
  "id": "ExampleSlider",
  "name": "Слайдер",
  "description": "Пример слайдера",
  "type": "slider",
  "min": 0,
  "max": 100,
  "step": 1,
  "value": 50,
  "defaultParameter": 50
}
```
---

5. **Выбор файла (путь)**
- `id` - Уникальный идентификатор.
- `name` - Отображаемое имя.
- `description` - Описание.
- `type` - `file`.
- `filePath` - Текущее значение.
- `defaultParameter` - Значение по умолчанию.
  - `filePath` - Путь по умолчанию.
- `fileName` - Название файла.
```json
{
  "id": "ExampleFile",
  "name": "Файл",
  "description": "Пример выбора файла",
  "type": "file",
  "filePath": "",
  "defaultParameter": {
    "filePath": ""
  },
  "fileName": ""
}
```

6. **Селектор**
- `id` - Уникальный идентификатор.
- `name` - Отображаемое имя.
- `description` - Описание.
- `type` - `selector`.
- `selected` - Текущее значение.
- `options` - Список элементов селектора.
  - `ID элемента`:
    - `event` - Ивент элемента.
    - `name` - Название элемента.
- `defaultParameter` - Значение по умолчанию.
```json
{
  "id": "ExampleSelector",
  "name": "Селектор",
  "description": "Пример селектора",
  "type": "selector",
  "selected": 1,
  "options": {
    "1": {
      "event": "ExampleOne",
      "name": "Элемент 1"
    },
    "2": {
      "event": "ExampleTwo",
      "name": "Элемент 2"
    },
    "3": {
      "event": "ExampleThree",
      "name": "Элемент 3"
    }
  },
  "defaultParameter": 1
}
```
---



#### Пример настроек

Добавим несколько примеров настроек, включая возможность включения/выключения прозрачности в полноэкранном плеере:

```json
{
  "sections": [
    {
      "title": "Секция",
      "items": [
        {
          "id": "exampleButton",
          "name": "Кнопка",
          "description": "Пример кнопки",
          "type": "button",
          "bool": false,
          "defaultParameter": false
        },
        {
          "id": "exampleColor",
          "name": "Выбор цвета",
          "description": "Пример выбора цвета",
          "type": "color",
          "input": "#fff",
          "defaultParameter": "#fff"
        },
        {
          "id": "exampleText",
          "name": "Текстовые поля",
          "description": "Пример текстовых полей",
          "type": "text",
          "buttons": [
            {
              "id": "ExampleTextField",
              "name": "Пример текстового поля 1",
              "text": "Текстовое поле 1",
              "defaultParameter": "Текстовое поле 1"
            },
            {
              "id": "ExampleTextFieldTwo",
              "name": "Пример текстового поля 2",
              "text": "Текстовое поле 2",
              "defaultParameter": "Текстовое поле 2"
            }
          ]
        }
      ]
    },
    {
      "title": "Пример",
      "items": [
        {
          "id": "opacity",
          "name": "Прозрачность",
          "description": "Красивая прозрачность полноэкранного плеера",
          "type": "button",
          "bool": true,
          "defaultParameter": false
        }
      ]
    }
  ]
}
```

После добавления этих настроек они появятся в интерфейсе PulseSync. Однако, чтобы они работали, их нужно обработать в коде.

---

### JavaScript код
Для динамических изменений в теме используется **JavaScript**. С его помощью мы будем получать настройки и применять их в зависимости от выбора пользователя.

#### 1. Получение настроек
Для получения настроек из PulseSync отправляем запрос по адресу `http://localhost:2007/get_handle?name=НазваниеТемы`. Название обязательно должно совпадать с тем, что указано в `metadata.json`.

В ответ получим JSON-объект с настройками. Пример ответа:

```json
{
  "ok": true,
  "data": {
    "sections": [
      {
        "title": "Секция",
        "items": [
          {
            "id": "exampleButton",
            "name": "Кнопка",
            "description": "Пример кнопки",
            "type": "button",
            "bool": false,
            "defaultParameter": false
          },
          {
            "id": "exampleColor",
            "name": "Выбор цвета",
            "description": "Пример выбора цвета",
            "type": "color",
            "input": "#fff",
            "defaultParameter": "#fff"
          },
          {
            "id": "exampleText",
            "name": "Текстовые поля",
            "description": "Пример текстовых полей",
            "type": "text",
            "buttons": [
              {
                "id": "ExampleTextField",
                "name": "Пример текстового поля 1",
                "text": "Текстовое поле 1",
                "defaultParameter": "Текстовое поле 1"
              },
              {
                "id": "ExampleTextFieldTwo",
                "name": "Пример текстового поля 2",
                "text": "Текстовое поле 2",
                "defaultParameter": "Текстовое поле 2"
              }
            ]
          }
        ]
      },
      {
        "title": "Пример",
        "items": [
          {
            "id": "opacity",
            "name": "Прозрачность",
            "description": "Красивая прозрачность полноэкранного плеера",
            "type": "button",
            "bool": true,
            "defaultParameter": false
          }
        ]
      }
    ]
  }
}
```

Для удобства работы с настройками создадим функции `getSettings` и `transformJSON` в файле `script.js`:

```js
// Получение настроек
async function getSettings(name) {
    try {
        const response = await fetch(`http://localhost:2007/get_handle?name=${name}`);
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
  
        const { data } = await response.json();
        if (!data?.sections) {
            console.warn("Структура данных не соответствует ожидаемой");
            return null;
        }

        return transformJSON(data);
    } catch (error) {
        console.error(error);
        return null;
    }
}

// "Трансформирование" полученных настроек для более удобного использования
function transformJSON(data) {
    const result = {};

    try {
        data.sections.forEach(section => {
            section.items.forEach(item => {
                if (item.type === "text" && item.buttons) {
                    result[item.id] = {};
                    item.buttons.forEach(button => {
                        result[item.id][button.id] = {
                            value: button.text,
                            default: button.defaultParameter
                        };
                    });
                } else {
                    result[item.id] = {
                        value: item.bool || item.input || item.selected || item.value || item.filePath,
                        default: item.defaultParameter
                    };
                }
            });
        });
    } finally {
        return result;
    }
}
```

Функция `getSettings` получает наши настройки, а функция `transformJSON` преобразует их в удобный для работы формат:

```json
{
  "exampleButton": {                  // Уникальный идентификатор
    "value": false,                   // Текущее значение
    "default": false                  // Стандартное значение
  },
  "exampleColor": {
    "value": "#fff",
    "default": "#fff"
  },
  "exampleText": {                    // Уникальный идентификатор контейнера полей
    "exampleTextField": {             // Уникальный идентификатор поля
      "value": "Текстовое поле 1",    // Текущее значение поля
      "default": "Текстовое поле 1"   // Стандартное значение поля
    },
    "exampleTextFieldTwo": {
      "value": "Текстовое поле 2",
      "default": "Текстовое поле 2"
    }
  },
  "opacity": {
    "value": true,
    "default": false
  }
}
```

#### 2. Применение настроек
Теперь создадим функцию `applySettings`, которая будет применять настройки. Например, добавим возможность включения прозрачности в полноэкранном плеере:

```js
// Применение настроек
function applySettings(settings) {
    
    // Создание "контейнера" для нашего CSS кода
    let exampleStyleElement = document.getElementById('example-style');
    if (!exampleStyleElement) {
        exampleStyleElement = document.createElement('style');
        exampleStyleElement.id = 'example-style';
        document.head.appendChild(exampleStyleElement);
    }

    // Очищаем его для перезаписи в зависимости от настроек
    exampleStyleElement.textContent = '';

    // Применяем настройку, если она включена
    if (settings.opacity.value === true) {
        exampleStyleElement.textContent += `
            div[data-test-id="FULLSCREEN_PLAYER_MODAL"] {
                backdrop-filter: blur(10px) !important;
                background-color: hsla(from var(--player-average-color-background) h s l / 85%) !important;
            }
        `;
    }
}
```

#### 3. Запуск
Чтобы настройки применялись автоматически, добавим интервал для обновления и применения настроек каждые 2 секунды:

```js
// Обновляем настройки каждые 2 секунды
setInterval(async () => {
    const settings = await getSettings("ExampleTheme"); // В скобках название темы из metadata.json
    if (!settings) return;

    applySettings(settings);
}, 2000);
```

Теперь тема работает с настройками, и пользователь может управлять её внешним видом прямо из PulseSync!

## Послесловие
Не бойтесь изучать внутреннюю структуру чужих тем — это отличный способ понять, как всё устроено, и вдохновиться новыми идеями. Экспериментируйте, создавайте свои темы, и со временем вы обязательно набьёте руку. Помните, что практика — это ключ к мастерству. Удачи в вашем творчестве!

## Исходники темы
Все исходники темы доступны в репозитории на GitHub. Вы можете изучить код и скачать его. Репозиторий содержит все файлы темы, включая метаданные, стили, скрипты и настройки.

Репозиторий с исходниками:
https://github.com/WolfySoCute/PulseSync-ExampleTheme

Для загрузки последнего доступного релиза перейдите по ссылке:
https://github.com/WolfySoCute/PulseSync-ExampleTheme/releases/latest

Используйте эти исходники как отправную точку для создания своих уникальных тем. Не забывайте экспериментировать и делиться своими работами с сообществом!

<!-- ## Благодарности
- **Автор темы:** [WolfySoCute](https://github.com/WolfySoCute)
- **Автор руководства:** [WolfySoCute](https://github.com/WolfySoCute), [PulseSync LLC](https://github.com/PulseSync-LLC) -->