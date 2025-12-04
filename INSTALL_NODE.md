# Установка Node.js

Для запуска проекта необходимо установить Node.js версии 18 или выше.

## Вариант 1: Установка через официальный сайт (рекомендуется)

1. Перейдите на https://nodejs.org/
2. Скачайте LTS версию для macOS
3. Запустите установщик и следуйте инструкциям
4. После установки откройте новый терминал и проверьте:
   ```bash
   node --version
   npm --version
   ```

## Вариант 2: Установка через Homebrew

Если у вас установлен Homebrew:

```bash
brew install node
```

## Вариант 3: Установка через nvm (Node Version Manager)

```bash
# Установите nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Перезагрузите терминал или выполните:
source ~/.zshrc

# Установите Node.js
nvm install 18
nvm use 18
```

## После установки Node.js

Выполните в терминале:

```bash
cd "/Users/ahmeddevops/Desktop/mini app isa"
npm install
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

