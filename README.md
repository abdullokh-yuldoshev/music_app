# Telegram Mini App - Music Player

Музыкальный плеер в стиле Spotify/Яндекс Музыки с интеграцией Jamendo API.

## Структура проекта

```
Music_App/
├── index.html  # Основной HTML файл с интеграцией Telegram Web App
├── style.css   # Стили (mobile-first, Spotify-дизайн)
├── app.js      # Логика плеера и API интеграция
└── README.md   # Этот файл
```

## Как запустить локально

### Способ 1: Python (рекомендуется)

1. Установите Python (если еще не установлен)
2. Откройте терминал и перейдите в папку проекта:
   ```bash
   cd "/Users/abdullokhyuldoshev/Yandex.Disk.localized/Projects/AI_Codes/Music_App"
   ```
3. Запустите локальный сервер:
   ```bash
   python3 -m http.server 8000
   ```
4. Откройте браузер и перейдите по адресу:
   ```
   http://localhost:8000
   ```

### Способ 2: Node.js

1. Установите Node.js (если еще не установлен)
2. Установите http-server глобально:
   ```bash
   npm install -g http-server
   ```
3. Перейдите в папку проекта:
   ```bash
   cd "/Users/abdullokhyuldoshev/Yandex.Disk.localized/Projects/AI_Codes/Music_App"
   ```
4. Запустите сервер:
   ```bash
   http-server -p 8000
   ```
5. Откройте браузер и перейдите по адресу:
   ```
   http://localhost:8000
   ```

### Способ 3: VS Code Live Server

1. Откройте папку проекта в VS Code
2. Установите расширение "Live Server"
3. Нажмите правой кнопкой на index.html → "Open with Live Server"

## Функционал

- **Загрузка топ-20 треков** из Jamendo при старте
- **Поиск** по названию треков
- **Воспроизведение** через HTML5 Audio
- **Управление**: Play/Pause, Next, Previous
- **Прогресс-бар** с перемоткой
- **Адаптация под тему Telegram** (цвета, фон)
- **Mobile-first дизайн** для удобного использования на телефоне

## Настройка API ключа

Если бесплатный ключ перестанет работать, замените его в файле `app.js`:

```javascript
const JAMENDO_CLIENT_ID = '56d30c55'; // Замените на свой ключ
```

Получить свой ключ можно на https://developer.jamendo.com/

## Интеграция с Telegram

Для публикации как Telegram Mini App:

1. Загрузите файлы на хостинг с HTTPS (например, GitHub Pages, Vercel, Netlify)
2. Создайте бота через @BotFather
3. Настройте Web App через /newapp
4. Укажите URL вашего приложения
