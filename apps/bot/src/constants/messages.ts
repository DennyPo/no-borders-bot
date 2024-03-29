export const MESSAGES = {
  SOMETHING_WENT_WRONG:
    'Щось пішло не так 🤷‍\nМи вже робимо все можливе щоб це виправити!\nСпробуйте будь ласка пізніше',
  ERROR_MESSAGE_FOR_OWNER: 'Чувак, твій бот зламався! Швидше його відремонтуй!',
  MAIN_MENU: `*Привіт\\!* 👋

Я бот для обміну інформацією про доступне середовище в українських містах 🇺🇦\\.

Тут можна поділитися інформацією про те, де є якісь барʼєри, а де їх немає і спланувати маршрут за допомогою нашої мапи\\.

Вибери в меню те, що тебе цікавить 👇`,
  HOW_IT_WORKS: `*То як же це працює?*

1️⃣ Ти можеш додавати місця, де є якісь перешкоди для вільного пересування людей з особливими потребами, з колясками та інш\\.

2️⃣ Також ти можеш додати місця де навпаки є все необхідне \\(пандуси, ліфти, переходи і т\\.д\\.\\) для безперешкодного пересування людей з особливими потребами\\.

3️⃣ Ти можеш переглянути список місць, де є або немає перешкод які додали всі інші користувачі цього боту\\.

Щоб ознайомитися детальніше тисни "Інструкція" 👇`,
  REPORT_MENU: `Про що ти хочеш повідомити?

Перешкода чи зручне місце? 👇`,
  INSTRUCTION: `Для того щоб додати до мапи якусь перешкоду або зручність тобі потрібно:

1️⃣ Натиснути на кнопку "Додати місце" у головному меню

2️⃣ Обрати тип місця яке ти хочеш додати \\(*"Перешкода"* або *"Зручність"* \\)

3️⃣ Натиснути "скріпку"

4️⃣ Обрати у випавшому меню пункт "Розташування"

5️⃣ Поставити мітку на локацію на мапі

6️⃣ Натиснути "Відправити розташування"

7️⃣ Написати опис та додати фото \\(опціонально\\) і відправити

8️⃣ Натиснути *"Готово"*`,
  REPORT_RESTRICTION: 'Обери тип барʼєру який ти хочеш додати 👇',
  SEND_LOCATION: 'Надішліть розташування📍, якe б ви хотіли б додати на мапу',
  WAITING_FOR_LOCATION: `Очікуємо на розташування📍\\.

Спробуйте ще раз надіслати локацію`,
  SEND_DESCRIPTION: 'Надішліть опис місця\\.',
  WAITING_FOR_DESCRIPTION: `Очікуємо на опис місця\\

Будь ласка напишіть опис місця\\.`,
  SEND_PHOTO: `Якщо маєте фото, то надішліть його також\\.

Якщо немає, то натисніть кнопку "Завершити без фото" тим самим ви завершите додавання місця\\.`,
  WAITING_PHOTO: `*Тільки фото можуть бути завантажені\\!*

*Інші типи файлів не підтримуються\\.*

Якщо не маєте фото, то натисніть кнопку "Завершити без фото"\\.`,
  THANKS_FOR_REPORT: `*Дякуємо за допомогу\\!* 🙏

Ваше місце додано на мапу\\!`,
  TRY_EXISTING_COMMAND:
    'Нажаль я вас не розумію, я всього лише бот\\. Спробуйте вибрати потрібний пункт із *Головного меню* або натисніть *Почати* у випадаючому меню\\.',
  TRY_EXISTING_COMMAND_STICKER:
    'CAACAgIAAxkBAAIB1WQMd_2_c5_T9Y94NfjGkTmdzgnpAAIGAQAC9wLIDze9PVBIAAFjki8E',
} as const;

export const ATTACHMENTS = {
  INSTRUCTION: {
    PHOTO_1:
      'AgACAgIAAxkBAAIBQ2WUFT9p2S0RqYNQDGjucO1GaV8RAALh1zEbSh2hSIYk5ziz21MKAQADAgADeQADNAQ',
    PHOTO_2:
      'AgACAgIAAxkBAAIBWWWUGsGBrBJNYgABWubrLiqilVlY7gAC4tcxG0odoUiJFx94ntTlpAEAAwIAA3kAAzQE',
  },
} as const;
