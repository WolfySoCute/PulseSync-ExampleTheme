// Получение настроек
async function getSettings() {
    try {
        const response = await fetch("http://localhost:2007/get_handle");
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
                        value: item.bool !== undefined ? item.bool : item.input,
                        default: item.defaultParameter
                    };
                }
            });
        });
    } finally {
        return result;
    }
}

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

// Обновляем настройки каждые 2 секунды
setInterval(async () => {
    const settings = await getSettings();
    if (!settings) return;

    applySettings(settings);
}, 2000);