# Accessibility work — 3 November 2026

Scope: SHANARA home, Nirvana, Nirvana plans and the accessibility statement. This is an engineering audit, not a legal opinion, certification or complete conformance assessment.

## Implemented

- Shared visible focus and skip links; focusable main targets.
- Native image/content dialogs, keyboard controls, modal background isolation, focus return and menu focus management.
- Stable field labels, required markers, linked Hebrew error summaries, inline descriptions and invalid states; WhatsApp preparation stays reviewable and never sends automatically.
- Improved secondary-text contrast and heading hierarchy.
- Full readable text alternative to the manifesto image.
- OS reduced-motion support and per-page `?static=1` links.
- Public `/accessibility` page linked from all footers. WEBaby is identified as the website maintainer and accessibility inquiry contact, with the owner-supplied public telephone and WhatsApp number 050-975-1120. No accessibility officer or certification is invented.

## Verification

Local axe-core 4.14.0, WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA and best-practice tags. Static mode reveals animated content for scanning. Desktop 1200 px and mobile 320 px were sampled, including the home album menu, All Stars album list, navigation, Nirvana world dialog and gallery. Final sampled states had zero reported violations. Detailed JSON evidence is retained in the task outputs directory, not shipped as public application assets.

Manual keyboard checks: gallery Enter, Shift+Tab/Tab wrap, Escape and trigger focus return; world Enter/Escape; navigation Enter/Tab/Escape; home album selection and Escape back/close; empty form errors and valid dummy-data preparation without sending. Narrow Nirvana viewport did not overflow horizontally. Local builds and route/resource tests are run before release.

## Remaining review

- Automated tools leave image-background contrast and references to currently hidden controlled dialogs for manual review. Zero automated findings does not establish complete compliance.
- Complete real VoiceOver/Safari and NVDA/Windows testing, 200–400% zoom, user testing with assistive technologies and independent professional accessibility review remain outstanding.
- Owner should verify the legal operating entity, applicable obligations and any exemption with a qualified professional. The owner supplied WEBaby as the maintainer and public contact for website accessibility inquiries; this does not identify the event operator or appoint a legally required accessibility officer.
- Event-specific physical accessibility arrangements must be collected and published for each venue; no unverified physical-access claims were added.
- External albums, tickets, Instagram and WhatsApp require separate assessment or an alternative service when needed.
- New content must preserve meaningful image descriptions, heading order, visible names, contrast and keyboard operation.

References: [Government guidance on accessibility statements](https://www.gov.il/he/pages/declaration_website_accessibility), [W3C WCAG quick reference](https://www.w3.org/WAI/WCAG22/quickref/).

## Israeli standard follow-up — 3 November 2026

Reviewed the official publication of SI 5568 part 1 (2023), government guidance on website accessibility and declarations, and W3C WCAG 2.0. The Israeli part 1 adopts WCAG 2.0 with national changes, including section headings at AA, reclassified media requirements and exclusion of language-of-parts. WCAG 2.1/2.2 checks are useful additional checks; they are not described here as the Israeli legal baseline. Direct Gov PDF/page fetches returned 403; relevant official text was available through indexed search results. No exemption was assumed.

Implementation mapping:

| Area | Site implementation / review |
| --- | --- |
| 1.1 text alternatives; images of text | Descriptive photos, decorative images omitted from speech, full HTML manifesto transcript |
| 1.2 media | No embedded audio/video players in the current pages; recheck captions/transcripts when adding media |
| 1.3 structure; 2.4 headings/navigation | Semantic headings, labeled regions, skip target, native buttons/dialogs, tab and timeline associations |
| 1.4 contrast/resize | Prior contrast corrections retained; browser zoom unblocked; narrow viewport sampled. Full 200–400% zoom coverage remains outstanding |
| 2.1 keyboard; 2.4 focus | Modal trapping and return, visible focus; focused animated targets immediately revealed |
| 2.2 moving content | Immediately available shared pause control, OS preference respected; pauses CSS/JS drift and removes virtual scrolling while preserving native scroll |
| 2.3 flashing | No deliberate flashing content was found in the reviewed source |
| 3.2 predictable behavior | No automatic redirects/submissions; timeline no longer changes while keyboard focus is inside it |
| 3.3 forms | Stable labels, required fields, Hebrew error summary/inline errors, prepared WhatsApp link |
| 4.1 name/role/state | Shared labeled dialog and pressed states; inactive journey panels hidden from accessibility tree |
| Declaration/contact | Correct standard reference, scope, known limitations, public WEBaby phone and WhatsApp, venue information caveat |

A lightweight site-owned shared menu was added for convenience; it is not presented as a compliance certificate or replacement for accessible source. It stores only pause/link preferences locally, respects storage denial, has reset and OS reduced-motion handling, and loads no third-party overlay. Code is shared across all four routes and Netlify export. Maintainers can edit the shared `accessibility-tools.js` and `accessibility.css` resources and rerun the asset versioning/build scripts.

Outstanding professional screen-reader testing, legal entity/venue information verification, and external-service review remain as above. Owner confirmation of WEBaby as maintainer/contact does not establish the event operator's identity or appointment of an accessibility coordinator.

Official sources: [SI 5568-1 (2023)](https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-1-september-2023.pdf), [government website accessibility guidance](https://www.gov.il/he/pages/website_accessibility?chapterIndex=6), [service accessibility regulations](https://www.gov.il/BlobFolder/guide/accommodating_service_providing_rules/he/sitedocs_service_acessibility_regulations.pdf), [WCAG 2.0](https://www.w3.org/TR/WCAG20/).

Follow-up QA: axe-core 4.14.0 reported zero violations in the sampled home/static, Nirvana/mobile, plans/mobile, declaration/mobile, and tools-dialog desktop/mobile states (WCAG A/AA and best-practice tags). Manual tests confirmed Enter opening, Tab/Shift+Tab wrapping, Escape focus return, preference persistence across page navigation/reload, reset, immediate stopping/resumption, and native scroll with motion paused. A 320 px viewport sample had no horizontal document overflow. This is not a full-page-by-page screen-reader or zoom conformance audit. Temporary QA fixture/axe assets were removed before packaging.
