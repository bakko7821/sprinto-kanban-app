# commit 0.0.0 

Создан проект, все инициализированно.

# commit 1.0.0

### Серверная часть

- Инициализованна база данных
- создан **/config/db.ts**
- создан **/utils/types.ts**
- создан **/utils/types.ts**

# commit 1.1.0

- Создан и стилизован самый наипиздатейший Header
- Созданы компоненты **Header.tsx**, **SearchInput.tsx**
- Написанны стандартные стили для **index.scss**
- Написанны стили для **Header.scss**

# commit 1.2.0

- Создан кастомный хук **/hooks/useAuthGuard.ts**
- Созданы страницы в /pages: **/AuthPage.tsx**, **/HomePage.tsx**
- Созданы компоненты **Login.tsx**, **Register.tsx**, **Recovery.tsx**, **NotFound.tsx**

# commit 1.3.0

- Заполнены и стилизованны компоненты **Login.tsx**, **Register.tsx**, **Recovery.tsx**, **NotFound.tsx**
- Создана страница **NotFoundPage.tsx**

# commit 2.4.0

### Серверная часть

- Создан GET роут на получение пользователя по ID в **/routes/users.ts**
- Чуть изменен **authMiddleware.ts** и **/routes/auth.ts**

### Клиентская част

- Создан скелет для **DropDownMenuUser.tsx**

# commit 2.5.0

- Стилизованн компонент **DropDownMenuUser.tsx**
- Добавленна возможность выхода из аккаунта
- Созданы компоненты: **DropDownMenuNotification.tsx**, **DropDownMenuHelp.tsx**
- Создан кастомный контекст: **/hooks/LogoutContext.tsx**, который при выходе из аккаунта, добавляет анимацию к header

# commit 3.5.0

- Созданы модели: **Board.ts**, **Component.ts**, **Tag.ts**, **Task.ts**, **Notification.ts**
- Создан файл **/models/associations.ts**

# commit 3.6.0

- Созданы и стилизованны компоненты **DropDownCreateBoard.tsx**, **VisibilitySelect.tsx**

# commit 4.7.0

### Серверная чать

- Создан POST, GET роут в **boards.ts**

### Клиентская часть

- Создана и стилизована страница **BoardPage.tsx**

# commit 5.8.0

### Серверная часть

- Создан POST, GET роут в **columns.ts**
- Модель **Component.ts** изменена на **Column.ts**

### Клиенсткая часть

- Создан компонент **/components/BoardPage/ColumnComponent.tsx**
- Создан запрос на получение и создание колонки в **/pages/BoardPage.tsx**
- Закончена стилизация Header и Columns в **/pages/BoardPage.tsx**

# commit 6.9.0

### Серверная часть

- Создан POST, GET роут в **tasks.ts**
- Изменена модели **Task.ts** - добавлен параметр isDone(false)

### Клиенсткая часть

- Создан компонент **TaskComponents.tsx**
- Добавлена логика отрисовки задач в **ColumnComponents.tsx**

# commit 7.10.0

### Серверная часть

- Создан PUT роут для изменения задачи **/routes/tasks.ts**

### Клиентская часть

- Созданы компоненты **TagComponent.tsx** и **/components/BoardPage/DropDownMenus/EditTaskDropDownMenu.tsx**
- Стилизован **EditTaskDropDownMenu.tsx**

# commit 8.11.0

### Серверная часть

- Создан POST, GET роут для создания и получения тегов **/routes/tags.ts**

### Клиентская часть

- Созданы компоненты: **PickColor.tsx** и **/components/BoardPage/DropDownMenus/ChangeTagsDropDownMenu.tsx**
- Cтилизованы: **ChangeTagsDropDownMenu.tsx**, **PickColor.tsx**

# commit 8.12.0

- Реализованна логика изменения тегов задачи

# commit 9.13.0 

### Серверная часть

- Добавлен роут для удаления столбца

### Клиентская часть

- При нажатии на три точки открываеться ColumnDropDownMenu.tsx, в котором можно удалить столбец
- Установленна библиотека **@dnd-kit/core**

# commit 10.13.0 (NOT PROD)

### Серверная часть

- Добавлен роут на изменение положения задачи

### Клиентская часть

- Добавлена функция drag&drop, но реализованна не до конца
- Сейчас не работают кнопки изменения
- При переносе немного барахлят стили