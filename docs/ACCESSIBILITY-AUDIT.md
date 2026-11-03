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
