import { siteLinks } from "../../content/shanara";
export default function Footer() { return (<footer>
        <img src="/shanara-logo-white.webp" alt="SHANARA Legacy" width={480} height={252} />
        <p>אור · מוזיקה · טבע · חופש · מהות</p>
        <div className="footerLinks"><a href="/nirvana">NIRVANA</a><a href={siteLinks.directory} target="_blank" rel="noreferrer">עמוד ההפקה</a></div>
      </footer>); }
