# שיפור טעינה — תמונות, גופנים ומטמון

- תמונת החזון: WebP ברוחב 1200 (356,134 בתים) וגרסת 700 (171,342), מול JPEG של 2,924,845 בתים. lazy + async; אינה נטענת מראש.
- תמונת החברות: WebP של 62,208 בתים מול JPEG של 390,144; נוספה גם גרסה קטנה.
- לוגו שנארה הלבן: 480px ו־9,718 בתים במקום PNG של 4500px ו־139,378 בתים. גם לוגואים וסמלים של Nirvana הומרו ל־WebP תוך שמירת השקיפות.
- תמונות Nirvana: מועמדים אמיתיים ל־srcset, כולל 1080px; הגדולות מוגבלות ל־1200px לרוחב. קבוצת 24 התמונות הגדולות קטנה מ־8,533,970 ל־5,445,800 בתים. זהו סכום קבצים, לא משקל טעינת עמוד — lazy, DPR וגודל המסך קובעים מה ייטען.
- Rubik מקומי: שני קובצי WOFF2 משתנים במשקלים 300–700, לעברית ולטינית, בסך 44,696 בתים; font-display: swap. שני הגופנים האחרים לא היו בשימוש בתצוגה והוסרו מהבקשה. הרישיון נשמר ב־public/fonts/OFL-Rubik.txt.
- description ו־OG של הבית כתובים במפורש בתוך head הראשוני; תמונות השיתוף הן כתובות HTTPS מלאות. בניית Netlify מתאימה את המקור ל־SITE_URL או ל־URL של הפריסה.
- public/_headers מכין מטמון של שנה לקוד ולגופנים, ו־30 יום לתמונות ב־Netlify (וגם באחסון שמכבד _headers). אין לשים HTML במטמון לשנה.
- scripts/version-assets.mjs מצמיד hash של התוכן לכתובות JS/CSS העצמאיים, ורץ לפני כל בנייה. שינוי קוד מוביל לכתובת חדשה, כדי שמטמון ארוך לא ישאיר קוד ישן. תמונות חדשות יש לשמור בשם חדש; בשינוי גופנים יש להעלות את סיומת הגרסה v1.
- דחיסת HTTP היא באחריות האחסון. אין לקבע Content-Encoding ידנית. באתר Sites נצפתה דחיסת gzip לפני השינוי; Brotli דורש בדיקה מול האחסון בפועל.

בדיקות קוד: ראש מסמך, טעינה עצלה, קיום קבצים, תגיות שיתוף וכתובות משאבים. נבדקו גם המידות בפועל מול כל תיאור רוחב ב־srcset. יש להריץ Lighthouse מחדש בתנאים זהים כדי להשוות LCP; המספר 13.6 שניות הוא מדידת המקור שסופקה, ואינו משמש כאן כמדידה חדשה.

## Mobile / search follow-up — 3 November 2026

- Home hero now has phone-only portrait sources at 540×900 (61,114 bytes) and 900×1500 (112,806 bytes), selected through `<picture>`/`sizes`. The original 326 KB wide photograph remains the desktop source. Originals are retained.
- Removed the entrance animation from `.heroContent`, so the logo and introductory text are not gated by a 1.4 s animated opacity reveal. This addresses the reported render-delay mechanism; it is not a new Lighthouse score or a verified 2.5 s LCP result. A fresh real-device/throttled Lighthouse run is still needed.
- Dedicated shared `mobile-layout.css` centers visual anchors, bounds forms/cards/photos and keeps longer RTL reading text aligned naturally. Geometry checks on the phone preview measured centered hero logo/content, manifesto, world photo, album launcher and cards; responsive samples are checked at 320, 390 and 768 px.
- The Nirvana lightbox now creates its image only when an actual photo is opened, avoiding an initial image node with an empty source.
- `app/content/site-metadata.json` and `scripts/generate-site-metadata.mjs` maintain public canonical URLs, WebSite/Organization/WebPage JSON-LD, robots.txt and sitemap.xml. The shared asset versioning script invokes metadata generation before building.
- A production HTTP probe advertising `Accept-Encoding: br, gzip` still returned `Content-Encoding: gzip` from the managed Sites/Cloudflare edge. Compression is controlled by that hosting layer; no fake Brotli header was added. Netlify build/export is maintained separately and no Netlify deployment was performed.

Final sampled checks: no document horizontal overflow at phone (320/390), tablet (768) or desktop (1200) viewport settings; browser scrollbar may reduce the reported layout viewport. The home visual anchors measured at zero center offset on the 390 px sample. The mobile browser selected the 540 px portrait source. Axe 4.14.0 found no reported violations in the sampled home, Nirvana, plans and privacy states; background-image contrast checks remain manual/incomplete. The WhatsApp form was tested with local dummy data only, without opening the external link or sending a message.
