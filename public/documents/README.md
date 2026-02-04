# Документы конференции / Conference Documents

Актуальная структура для сайта — в **client/public/documents/** (см. тот же README там).

## Структура папок / Folder Structure

```
documents/
├── kz/
│   └── info_letter_kz.docx       # Информационное письмо (DOCX)
├── ru/
│   └── info_letter_ru.docx
├── en/
│   └── info_letter_en.docx
└── templates/
    ├── latex_kz.tex              # LaTeX на трёх языках
    ├── latex_ru.tex
    └── latex_en.tex
```

Положите файлы в **client/public/documents/** — при сборке они попадут в `dist/documents/`.
