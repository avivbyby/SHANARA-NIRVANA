# SHANARA NIRVANA sites by ABY

קוד המקור של אתר SHANARA Legacy ושל Nirvana. כולל התמונות, האנימציות, האלבומים וההתאמות למובייל בגרסה האחרונה.

- האתר הפעיל: https://shanara-legacy.avivbaryaron1.chatgpt.site/
- נירוונה: `/nirvana`
- מסלולים לחברות ולהפקות: `/nirvana/plans`
- [מפת עריכה וקישורים](docs/EDITING.md)
- [תיעוד שיפור ביצועים ומשקלי קבצים](docs/PERFORMANCE.md)
- [בנייה והעלאה עתידית ל־Netlify](docs/NETLIFY.md)

## גרסאות

הגיבוי הנוכחי תואם לגרסה 29 שפורסמה ב־Sites. ההיסטוריה המקורית של מאגר GitHub נשמרת, ועדכונים נוספים נשמרים ב־commits חדשים. ארכיון היסטוריית העבודה המלאה מצורף לקובץ ה־ZIP שנמסר, כ־Git bundle. הקוד של Netlify משתמש באותם רכיבים ותכנים, ללא שכפול של עמוד שנארה.

## הרצה ובנייה

נדרש Node.js 22.13 ומעלה ו־pnpm.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm run dev
```

הפקת אתר סטטי ל־Netlify:

```sh
pnpm run build:netlify
node --test tests/netlify-static.test.mjs
```

התוצאה בתיקיית `dist-netlify/`. אפשר להעלות אותה ידנית, או לחבר את המאגר ל־Netlify; `netlify.toml` כולל את פקודת הבנייה ותיקיית הפרסום.

הבנייה המקורית ל־Sites/Cloudflare נשמרת באמצעות `pnpm run build`. האחסון ב־Netlify טרם הופעל.
