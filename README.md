# User Spreadsheet Application

## Как пользоваться данным приложением

  1. Создайте сервисный профиль в **Google Cloud Console**
  2. Скачайте **JSON-файл** с вашими данными от **сервисного профиля**
  3. Добавьте их в папку проекта *credentials/your_json_file.js*
  4. Запустите проект в консоли: **npm start**

Создание **Google-таблицы** осуществляется **GET-запросом** на **https://localhost:3000/clients?username=your_username_without_token**
