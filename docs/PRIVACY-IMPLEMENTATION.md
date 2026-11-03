# Privacy implementation — 3 November 2026

Owner decisions in this task:
- שון בורנס הפקות was supplied by the owner as the business managing Nirvana activity and inquiries.
- Keep WhatsApp-only inquiries for now. Do not create a lead database/CRM.
- Defer traffic analytics; there is no GA4 account/measurement ID to connect.

The public policy describes this actual operation. The form prepares a WhatsApp URL in the visitor's browser, does not submit to an application endpoint, and does not store personal details in Local Storage or a database. The company field is optional; name and phone are required to prepare a message. A visible notice and privacy link appear before the fields. A progressively enabled `inert` form prevents a JS-disabled form from accidentally submitting personal information as a GET query; a noscript direct-contact alternative remains available. The optional WhatsApp step does disclose the prepared URL/text to WhatsApp when followed, and the visitor must send the message there.

Local accessibility preferences use only `shanara-accessibility-v1`. A production probe observed Cloudflare's `__cf_bm` security cookie, so the policy explicitly describes infrastructure cookies instead of claiming that the site is cookie-free. No new analytics, advertising pixels, database or mail automation is added.

The owner supplied שון בורנס הפקות as the business name managing Nirvana inquiries. No dedicated privacy email was supplied; the existing Nirvana public telephone/WhatsApp remains the contact channel. No company number or corporate form was invented. The policy does not invent a company registration, a data-protection officer, a fixed deletion deadline, international-transfer assurances or immunity from claims. A final legal review should validate the identity, real WhatsApp retention/access practices, photos/event practices and any legal retention obligations before treating this as a complete compliance opinion.

Future CRM/analytics: define the controller, processors, hosting/transfer locations, access roles, retention/deletion process and visitor notices first. Marketing consent must be separate from a service inquiry. Do not activate a tracking SDK just because its script can be added. Do not put form fields, WhatsApp text, email, phone or URL query strings into analytics events. Update the policy and consent mechanism to match the chosen service and purpose.

Sources reviewed: Israeli Privacy Protection Authority consent guidance (2026), including section 11 notice requirements, [official consent guidance](https://www.gov.il/BlobFolder/legalinfo/consent-2026/he/cpncent-2025.pdf); [Cloudflare cookie documentation](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/). This document records engineering choices and remaining review; it is not a legal certification.
