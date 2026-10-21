import{a,b as p,c as d,d as c}from"./chunk-O3OTVWYO.js";var x=c.bind(a),t=class extends p{render(){return g(this.renderVals()||{})}},r=class extends t{navInit(){this._ddClose||(this._ddClose=e=>{document.querySelectorAll("details.lang-dd[open]").forEach(i=>{i.contains(e.target)||i.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let n=()=>{let i=(window.scrollY||document.documentElement.scrollTop||0)>30;i!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:i})};this._navScroll=n,document.addEventListener("scroll",n,{capture:!0,passive:!0}),n()}navVals(){let n=this.state||{},e=!!n.menuOpen;return{hdrCls:n.scrolled||e?"hdr scrolled":"hdr",menuCls:e?"menu open":"menu",menuExpanded:e?"true":"false",menuHidden:e?"false":"true",menuLabel:e?"Men\xFC schlie\xDFen":"Men\xFC \xF6ffnen",toggleMenu:()=>this.setState({menuOpen:!e}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let n=document.querySelector(".site");n&&(this._ro=new IntersectionObserver(e=>{let i=0;e.forEach(o=>{if(!o.isIntersecting)return;let l=o.target;this._ro.unobserve(l),l.style.transitionDelay=i++*80+"ms",l.classList.add("rv-go"),requestAnimationFrame(()=>l.classList.remove("rv-wait")),setTimeout(()=>{l.classList.remove("rv-go"),l.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),n.querySelectorAll(".rv").forEach(e=>{e.getBoundingClientRect().top<window.innerHeight*.92||(e.classList.add("rv-wait"),this._ro.observe(e))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function g(s){return x`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${s.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/de" aria-label="BERK, zur Startseite"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Sprache wählen: Deutsch">DE <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Sprache"><a href="/waarom-live" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en/why-live" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/warum-live" hreflang="de" lang="de" aria-current="true">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/de/kontakt" style="min-height: 46px; padding: 0 20px; font-size: 13px">Gespräch vereinbaren</a>
<button class="burger" type="button" onClick=${s.toggleMenu} aria-expanded=${s.menuExpanded} aria-controls="menu" aria-label=${s.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${s.menuCls} aria-hidden=${s.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hauptmenü"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/de" onClick=${s.closeMenu}><small>01</small>Start</a></li><li><a href="/de/leistungen" onClick=${s.closeMenu}><small>02</small>Leistungen</a></li><li><a href="/de/warum-live" aria-current="page" onClick=${s.closeMenu}><small>03</small>Warum live</a></li><li><a href="/de/projekte" onClick=${s.closeMenu}><small>04</small>Projekte</a></li><li><a href="/de/ueber-uns" onClick=${s.closeMenu}><small>05</small>Über uns</a></li><li><a href="/de/kontakt" onClick=${s.closeMenu}><small>06</small>Kontakt</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Sprache"><a href="/waarom-live" hreflang="nl" lang="nl">NL</a><a href="/en/why-live" hreflang="en" lang="en">EN</a><a href="/de/warum-live" hreflang="de" lang="de" aria-current="true">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Kontakt</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Warum live</span>
<h1 class="h-black" style="font-size: clamp(44px, 6.4vw, 100px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; max-width: 1300px">Ihr Event verdient mehr Publikum als das am <span style="color: #FF5F57">Rand</span></h1>
<p style="margin: 0; max-width: 680px; font-size: 20px; line-height: 1.6; color: #CFCFCF">Warum sich ein Livestream gerade für kleinere Sportarten lohnt. Erst, was Studien zeigen, dann, was wir selbst bei der EM Cable Wakeboard gesehen haben.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 8px"><a class="btn" href="#bewijs">Unsere eigenen Zahlen ansehen <span aria-hidden="true">↓</span></a></div>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Das Problem</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; max-width: 1100px">Ein Wochenende Arbeit. Ein Publikum so groß wie die Tribüne.</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 32px">
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">Fans sitzen zu Hause</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Familie, Vereinskollegen und Follower außerhalb der Region sehen nichts vom Geschehen.</p></div>
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">Sponsoren sehen wenig Gegenwert</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Ein Banner an der Strecke erreicht nur, wer an dem Tag dort steht.</p></div>
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">Sonntag ist alles vorbei</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Keine Bilder, kein Nachschauen, nichts, womit sich die nächste Ausgabe verkaufen lässt.</p></div>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #A8A8A8">Was Studien zeigen</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 1100px">Live wirkt, auch für kleinere Sportarten</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 32px">
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">Reichweite</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">Kabaddi und Gaelic Games wuchsen über Streams zu Fans weltweit und gewannen so neue Aktive.</p><span style="font-size: 14px; color: #8C8C8C">The Broadcast Bridge, Sept. 2026</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">89%</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">der 18- bis 24-Jährigen weltweit schauen mindestens monatlich YouTube.</p><span style="font-size: 14px; color: #8C8C8C">Ampere Analysis, via Streaming Media, März 2025</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">67%</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">der Wiedergabezeit von Live-Video fällt nach der Übertragung an. Eine ältere Zahl, aber die Richtung ist klar.</p><span style="font-size: 14px; color: #8C8C8C">TwentyThree, State of Online Video 2017</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">Gratis</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">Bei kleineren Sportarten funktioniert freier Zugang besser als eine Bezahlschranke. Das Geld kommt aus dem Sponsoring.</p><span style="font-size: 14px; color: #8C8C8C">The Broadcast Bridge, Sept. 2026</span></div>
</div>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(40px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 460px"><img src="/assets/85192bee0221be346b4096db7639b7ef.webp" alt="Kommentatoren live im Bild vor den Sponsorenwänden" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; border: 2px solid #161616; box-shadow: 12px 12px 0 #161616" /></div>
<div class="rv" style="flex: 1 1 460px; display: flex; flex-direction: column; gap: 22px">
<span class="eyebrow" style="color: #555555">Sponsoren</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 68px); line-height: 0.95">Sponsoren wollen sehen, was sie bekommen</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Sponsoring-Entscheider nannten unklare Streamingzahlen Ende 2024 eine ihrer größten Sorgen. Ein eigener Stream löst das. <span style="color: #555555">(The Sponsor, Juli 2025)</span></p>
<div style="display: flex; flex-direction: column; gap: 14px">
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">Logo im Bild</b> bei jedem Run, Heat oder Wettkampf, im Overlay</p>
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">Harte Zahlen</b> zu Zuschauern, Wiedergabezeit und Region</p>
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">Ein Bericht im Anschluss</b>, mit dem Sie das Sponsoring im nächsten Jahr erneut verkaufen</p>
</div>
</div>
</div>
</section>

<section id="bewijs" style="background: #000000; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #FF5F57"><span class="dot"></span>Unsere eigenen Zahlen · EM Cable Wakeboard 2026</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 1200px">Ein Nischensport, ein internationales Publikum</h2><p style="margin: 0; max-width: 720px; font-size: 18px; line-height: 1.6; color: #CFCFCF">IWWF Europe & Africa Open Cable Wake Championships, Lakeside Paradise, Knokke-Heist, 1.–3. Oktober 2026. Drei Tage live auf YouTube.</p></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">30.000+</span><span style="font-size: 17px; color: #BDBDBD">Aufrufe</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">5.300</span><span style="font-size: 17px; color: #BDBDBD">Stunden Wiedergabezeit</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">395</span><span style="font-size: 17px; color: #BDBDBD">Zuschauer gleichzeitig in der Spitze</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">22</span><span style="font-size: 17px; color: #BDBDBD">Stunden Liveübertragung</span></div>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">65%</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">Vor allem neue Zuschauer</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">An Tag 1 waren 65% der Zuschauer neu. Gut 83% der Wiedergabezeit kam von Menschen ohne Abo.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">44–51%</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">YouTube machte die Arbeit</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">der Aufrufe kamen über Empfehlungen. Dazu über Instagram, die Scoring-Plattform, WhatsApp und sporza.be.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">1/3</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">Auf dem großen Bildschirm</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">29 bis 35% der Wiedergabezeit lief über den Fernseher. Der Rest etwa zu gleichen Teilen über Smartphone und Computer.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">EU</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">Aus ganz Europa</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">Top 5: Belgien, Italien, Deutschland, Frankreich und die Niederlande. An Tag 3 war auch Polen dabei.</p></div>
</div>
<div class="rv" style="display: flex; flex-wrap: wrap; gap: 12px 40px; font-size: 17px; line-height: 1.6; color: #CFCFCF; border-top: 1px solid #333333; padding-top: 22px">
<span>Im Schnitt 12 bis 17 Minuten Wiedergabedauer</span><span>534 Chatnachrichten während der Übertragungen</span><span>28.500 zusätzliche Aufrufe auf dem Kanal in 28 Tagen (<a href="#na-afloop" style="color: #FF5F57">siehe unten</a>)</span><span><b style="color: #FFFFFF">Für Sponsoren:</b> 58 bis 68% der Zuschauer waren 25 bis 44 Jahre alt</span>
</div>
<span style="font-size: 14px; color: #8C8C8C">Quelle: YouTube Analytics. Aufrufe: Stand 21. Oktober 2026, Tendenz steigend. Übrige Zahlen bis einschließlich 14. Oktober 2026.</span>
</div>
</section>

<section id="na-afloop" style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 56px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Danach</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; max-width: 1100px">Nach dem letzten Heat beginnt das <span style="color: #D93A33">zweite Leben</span></h2><p style="margin: 0; max-width: 720px; font-size: 18px; line-height: 1.6; color: #3C3C3C">Der Stream endet, der Content nicht. Aus denselben Aufnahmen machen wir neue Beiträge, die noch wochenlang Reichweite bringen, für das Event und für die Sponsoren.</p></div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 0; border-top: 2px solid #161616">
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px 24px 24px 0; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">Während</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Live</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Fans schauen auf YouTube, Ihrer Website oder im Fernsehen zu. Sponsoren stehen im Overlay.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">Am selben Abend</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Highlights pro Tag</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Eine kurze Zusammenfassung des Tages, fertig für YouTube und Ihre Website.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">Die Tage danach</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Clips und Social</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Jeder Rider bekommt seinen eigenen Run zum Teilen. Vertikal für Instagram und TikTok, mit den Sponsoren im Bild.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px 0 24px 24px"><span class="eyebrow" style="color: #D93A33">Wochen später</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Nachschauen</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Die komplette Übertragung bleibt online. YouTube empfiehlt sie weiter neuen Zuschauern.</p></div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: clamp(40px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 18px">
<span class="eyebrow" style="color: #555555">EM Cable Wakeboard 2026</span>
<h3 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 0.95">Nach dem Event kamen mehr Aufrufe hinzu als die Streams selbst hatten</h3>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Die drei Streams kamen zusammen auf 27.508 Aufrufe. In den 28 Tagen danach kamen auf dem Kanal noch 28.500 Aufrufe hinzu. Inzwischen steht der Zähler bei über 30.000 Aufrufen. Studien zeigen in dieselbe Richtung: Der größte Teil der Wiedergabezeit von Live-Video fällt nach der Übertragung an.</p>
<span style="font-size: 14px; color: #555555">Quellen: YouTube Analytics, Zahlen bis einschließlich 14. Oktober 2026 · TwentyThree, State of Online Video 2017</span>
</div>
<div class="rv" style="flex: 1 1 460px; display: flex; flex-direction: column; gap: 22px; background: #FFFFFF; border: 2px solid #161616; box-shadow: 12px 12px 0 #161616; padding: clamp(24px, 3vw, 40px)">
<div style="display: flex; flex-direction: column; gap: 8px"><div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px"><span style="font-size: 16px; font-weight: 600">Während der Livestreams</span><span class="h-black" style="font-size: 28px">27.508</span></div><div style="height: 28px; background: #E2E2E2; border: 2px solid #161616"><div style="height: 100%; width: 49%; background: #161616"></div></div></div>
<div style="display: flex; flex-direction: column; gap: 8px"><div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px"><span style="font-size: 16px; font-weight: 600">Dazu in 28 Tagen danach</span><span class="h-black" style="font-size: 28px; color: #D93A33">+28.500</span></div><div style="height: 28px; background: #E2E2E2; border: 2px solid #161616"><div style="height: 100%; width: 51%; background: #FF5F57"></div></div></div>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C; border-top: 2px solid #161616; padding-top: 16px"><b class="h-black" style="font-size: 22px">±51%</b> aller Aufrufe kamen nach dem Event.</p>
</div>
</div>
</div>
</section>

<section style="background: #FF5F57; color: #161616; padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 32px">
<h2 class="h-black" style="font-size: clamp(44px, 6vw, 96px); line-height: 0.92; max-width: 1000px">Ihr nächstes Event live</h2>
<div style="display: flex; flex-wrap: wrap; gap: 16px"><a class="btn" href="/de/kontakt" style="background: #161616; color: #FFFFFF">Möglichkeiten entdecken <span aria-hidden="true">→</span></a><a class="btn" href="/de/leistungen" style="background: #FFFFFF">Leistungen ansehen</a></div>
</div>
</section>

<section style="background: #161616; padding: 48px 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 12px; font-size: 15px; line-height: 1.6; color: #A8A8A8">
<span class="eyebrow" style="color: #FFFFFF">Quellen</span>
<span>The Broadcast Bridge, September 2026 · Ampere Analysis via Streaming Media, März 2025 · TwentyThree, State of Online Video 2017 · The Sponsor, „Will the sports streaming shift hurt sponsorship value and visibility?“, Juli 2025 · Eigene Zahlen: YouTube Analytics, EM Cable Wakeboard 2026.</span>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, ein Teil von <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Handelsregister-Nr. [NUMMER]</span></div>
</div>
</footer>

</div>`}var h=document.getElementById("app");h.textContent="";d(a(r,{}),h);
