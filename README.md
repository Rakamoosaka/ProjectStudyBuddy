# Study Buddy

## Описание проекта
<<<<<<< HEAD

**Study Buddy** – это веб-приложение, которое помогает студентам находить других студентов для совместного изучения или обмена знаниями по определённым дисциплинам.

### Основной функционал

=======
**Study Buddy** – это веб-приложение, которое помогает студентам находить других студентов для совместного изучения или обмена знаниями по определённым дисциплинам.

### Основной функционал
>>>>>>> 0ce98a2b24b7bab91f7286f901c82e9172a378d0
- **Регистрация и авторизация.**
- **Фильтрация пользователей по предметам и навыкам.**
- **Просмотр профиля других пользователей.**

### Скриншоты
<<<<<<< HEAD

=======
>>>>>>> 0ce98a2b24b7bab91f7286f901c82e9172a378d0
- Главная страница:
  ![Главная страница](https://github.com/sup1p/studybuddy/blob/main/%7B2FEFEDF1-80D2-4FAC-A607-1E0D431FC6AA%7D.png)

### Ссылки
<<<<<<< HEAD

=======
>>>>>>> 0ce98a2b24b7bab91f7286f901c82e9172a378d0
- [Frontend приложение](https://github.com/Rakamoosaka/ProjectStudyBuddy)
- [Backend API документация](https://github.com/sup1p/studybuddy/blob/main/API)
- [Deployed website](https://project-studybuddy.vercel.app)

---

## Руководство для разработчиков

### Как запустить проект

#### Требования:
<<<<<<< HEAD

=======
>>>>>>> 0ce98a2b24b7bab91f7286f901c82e9172a378d0
- **Java**: 17+
- **Maven**: 3.8+
- **PostgreSQL**: 15+
- **Node.js**: 16+ (если используется фронтенд)
- **Nginx** (для production)

#### Шаги для запуска backend:
<<<<<<< HEAD

=======
>>>>>>> 0ce98a2b24b7bab91f7286f901c82e9172a378d0
1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш-репозиторий.git
   cd ваш-репозиторий
<<<<<<< HEAD
   ```
=======
>>>>>>> 0ce98a2b24b7bab91f7286f901c82e9172a378d0
2. Настройте файл application.properties или используйте переменные окружения:
   spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
   spring.datasource.username=your_username
   spring.datasource.password=your_password
3. Соберите проект:
   mvn clean package
4. Запустите Spring Boot:
   java -jar target/your_project-0.0.1-SNAPSHOT.jar
<<<<<<< HEAD

#### Шаги для запуска frontend:

1. Перейдите в директорию фронтенда:
   cd path/to/frontend
   Либо клонируйте репозиторий фронтенда:
   git clone https://github.com/Rakamoosaka/ProjectStudyBuddy.git
   cd ProjectStudyBuddy
2. Установите зависимости:
   npm install
3. Запустите приложение:
   npm run dev
4. Откройте приложение локально:
   Vite выдаст URL для разработки, например http://localhost:5173.

#### Технологии фронтенда

=======
#### Шаги для запуска frontend:
1. Перейдите в директорию фронтенда:
    cd path/to/frontend
   Либо клонируйте репозиторий фронтенда:
    git clone https://github.com/Rakamoosaka/ProjectStudyBuddy.git
    cd ProjectStudyBuddy
2. Установите зависимости:
    npm install
3. Запустите приложение:
    npm run dev
4. Откройте приложение локально:
    Vite выдаст URL для разработки, например http://localhost:5173.

#### Технологии фронтенда
>>>>>>> 0ce98a2b24b7bab91f7286f901c82e9172a378d0
Фронтенд построен с использованием следующих технологий:

React.js: Библиотека для создания пользовательских интерфейсов.
Vite: Быстрый инструмент сборки и сервер разработки.
Tailwind CSS: CSS-фреймворк с утилитарным подходом к стилям.
Axios: HTTP-клиент для взаимодействия с API.

### Траблшутинг
<<<<<<< HEAD

# Ошибка подключения к базе данных:

Проверьте доступность PostgreSQL-сервера.
Убедитесь, что данные для подключения в application.properties корректны.

# Ошибка при сборке проекта:

Проверьте наличие всех зависимостей в pom.xml:
mvn dependency:resolve
Убедитесь, что Java и Maven установлены корректно.
=======
# Ошибка подключения к базе данных:

   Проверьте доступность PostgreSQL-сервера.
   Убедитесь, что данные для подключения в application.properties корректны.
# Ошибка при сборке проекта:

   Проверьте наличие всех зависимостей в pom.xml:
   mvn dependency:resolve
   Убедитесь, что Java и Maven установлены корректно.
>>>>>>> 0ce98a2b24b7bab91f7286f901c82e9172a378d0
