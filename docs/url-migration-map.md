# Карта миграции URL (URL Migration Map)

Данный документ описывает правила перенаправления (Redirect 301) со старых адресов Drupal 8 на новые адреса Next.js приложения.

## Глобальные правила
`/node/*` -> `/news/*` или `/documents/*` (в зависимости от типа контента, потребуется скрипт для определения).
`/article/category/*` -> Новые страницы категорий или разделов.

## Основные разделы
| Старый URL | Новый URL | Тип Redirect |
| :--- | :--- | :--- |
| `/` | `/` | - |
| `/article/category/istoriya` | `/about/history` | 301 |
| `/article/category/nash-khram` | `/about/temple` | 301 |
| `/article/category/operativnyy-otdel` | `/alerts` | 301 |
| `/article/category/obyavleniya` | `/announcements` | 301 |
| `/article/category/pozdravleniya` | `/news?category=greetings` | 301 |
| `/article/category/primar` | `/city-hall/mayor` | 301 |
| `/article/category/apparat-prmerii` | `/city-hall/departments` | 301 |
| `/article/category/novosti` | `/news` | 301 |
| `/article/category/gorodskoy-sovet` | `/council` | 301 |
| `/article/category/resheniya` | `/documents?category=decisions` | 301 |
| `/article/category/zasedaniya-video` | `/council/meetings` | 301 |
| `/article/category/tarify` | `/services/tvardisan/tariffs` | 301 |
| `/article/category/grafik-vyvoza-musora`| `/services/tvardisan/schedule` | 301 |

## Устаревшие разделы (редирект на главную или архив)
| Старый URL | Новый URL |
| :--- | :--- |
| `/article/category/prezidentura-rmoldova` | `/` (или `/archive`) |
| `/article/category/novosti-gagauzii` | `/` |
| `/article/category/novosti-moldovy` | `/` |
| `/article/category/novosti-bolgarii` | `/` |
| `/article/category/novosti-ukrainy` | `/` |

## Структура новостей и статей
Старые адреса вида `/article/nazvanie-stati` будут перенаправляться на `/news/nazvanie-stati` или `/documents/nazvanie-stati` в зависимости от того, куда скрипт импорта поместит данную сущность. Поле `legacyUrl` в базе данных поможет настроить динамический fallback.
