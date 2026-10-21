import{a as n,b as r,c as d,d as c}from"./chunk-O3OTVWYO.js";var g=c.bind(n),t=class extends r{render(){return h(this.renderVals()||{})}},o=class extends t{navInit(){this._ddClose||(this._ddClose=a=>{document.querySelectorAll("details.lang-dd[open]").forEach(s=>{s.contains(a.target)||s.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let l=()=>{let s=(window.scrollY||document.documentElement.scrollTop||0)>30;s!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:s})};this._navScroll=l,document.addEventListener("scroll",l,{capture:!0,passive:!0}),l()}navVals(){let l=this.state||{},a=!!l.menuOpen;return{hdrCls:l.scrolled||a?"hdr scrolled":"hdr",menuCls:a?"menu open":"menu",menuExpanded:a?"true":"false",menuHidden:a?"false":"true",menuLabel:a?"Menu sluiten":"Menu openen",toggleMenu:()=>this.setState({menuOpen:!a}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let l=document.querySelector(".site");l&&(this._ro=new IntersectionObserver(a=>{let s=0;a.forEach(p=>{if(!p.isIntersecting)return;let i=p.target;this._ro.unobserve(i),i.style.transitionDelay=s++*80+"ms",i.classList.add("rv-go"),requestAnimationFrame(()=>i.classList.remove("rv-wait")),setTimeout(()=>{i.classList.remove("rv-go"),i.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),l.querySelectorAll(".rv").forEach(a=>{a.getBoundingClientRect().top<window.innerHeight*.92||(a.classList.add("rv-wait"),this._ro.observe(a))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function h(e){return g`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${e.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/" aria-label="BERK, naar de homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Kies taal: Nederlands">NL <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Taal"><a href="/waarom-live" hreflang="nl" lang="nl" aria-current="true">Nederlands<small>NL</small></a><a href="/en/why-live" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/warum-live" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Plan een gesprek</a>
<button class="burger" type="button" onClick=${e.toggleMenu} aria-expanded=${e.menuExpanded} aria-controls="menu" aria-label=${e.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${e.menuCls} aria-hidden=${e.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hoofdmenu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/" onClick=${e.closeMenu}><small>01</small>Home</a></li><li><a href="/diensten" onClick=${e.closeMenu}><small>02</small>Diensten</a></li><li><a href="/prijscalculator" onClick=${e.closeMenu}><small>03</small>Prijscalculator</a></li><li><a href="/waarom-live" aria-current="page" onClick=${e.closeMenu}><small>04</small>Waarom live</a></li><li><a href="/werk" onClick=${e.closeMenu}><small>05</small>Werk</a></li><li><a href="/over" onClick=${e.closeMenu}><small>06</small>Over</a></li><li><a href="/contact" onClick=${e.closeMenu}><small>07</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Taal"><a href="/waarom-live" hreflang="nl" lang="nl" aria-current="true">NL</a><a href="/en/why-live" hreflang="en" lang="en">EN</a><a href="/de/warum-live" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Waarom live</span>
<h1 class="h-black" style="font-size: clamp(44px, 6.4vw, 100px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; max-width: 1300px">Je event verdient meer publiek dan er langs de <span style="color: #FF5F57">kant</span> staat</h1>
<p style="margin: 0; max-width: 680px; font-size: 20px; line-height: 1.6; color: #CFCFCF">Waarom een livestream juist voor kleinere sporten zin heeft. Eerst wat onderzoek laat zien, daarna wat we zelf zagen op het EK Cable Wakeboard.</p>
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 8px"><a class="btn" href="#bewijs">Bekijk onze eigen cijfers <span aria-hidden="true">↓</span></a></div>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Het probleem</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; max-width: 1100px">Een weekend werk. Een publiek zo groot als de tribune.</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 32px">
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">Fans zitten thuis</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Familie, clubgenoten en volgers buiten de regio zien niets van wat er gebeurt.</p></div>
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">Sponsors zien weinig terug</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Een spandoek langs de baan bereikt alleen wie er die dag staat.</p></div>
<div class="promise rv"><h3 class="h-black" style="font-size: 26px; line-height: 1">Zondag is het voorbij</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Geen beeld, geen terugkijken, niets om de volgende editie mee te verkopen.</p></div>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #A8A8A8">Wat onderzoek laat zien</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 1100px">Live werkt, ook voor kleinere sporten</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 32px">
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">Bereik</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">Kabaddi en Gaelic games groeiden via streams naar fans wereldwijd en trokken zo nieuwe deelnemers.</p><span style="font-size: 14px; color: #8C8C8C">The Broadcast Bridge, sept. 2026</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">89%</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">van de 18- tot 24-jarigen wereldwijd kijkt minstens maandelijks YouTube.</p><span style="font-size: 14px; color: #8C8C8C">Ampere Analysis, via Streaming Media, mrt. 2025</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">67%</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">van de kijktijd van live video valt ná de uitzending. Een ouder cijfer, maar de richting is duidelijk.</p><span style="font-size: 14px; color: #8C8C8C">TwentyThree, State of Online Video 2017</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px; border-top: 3px solid #FF5F57; padding-top: 20px"><span class="h-black" style="font-size: clamp(48px, 5vw, 76px); line-height: 1; color: #FFFFFF">Gratis</span><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #CFCFCF">Bij kleinere sporten werkt vrije toegang beter dan een betaalmuur. Het geld komt uit sponsoring.</p><span style="font-size: 14px; color: #8C8C8C">The Broadcast Bridge, sept. 2026</span></div>
</div>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(40px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 460px"><img src="/assets/85192bee0221be346b4096db7639b7ef.webp" alt="Commentatoren live in beeld voor de sponsorwanden" style="width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; border: 2px solid #161616; box-shadow: 12px 12px 0 #161616" /></div>
<div class="rv" style="flex: 1 1 460px; display: flex; flex-direction: column; gap: 22px">
<span class="eyebrow" style="color: #555555">Sponsors</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 68px); line-height: 0.95">Sponsors willen zien wat ze krijgen</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Sponsorbeslissers noemden onduidelijke streamingcijfers eind 2024 een van hun grootste zorgen. Een eigen stream lost dat op. <span style="color: #555555">(The Sponsor, juli 2025)</span></p>
<div style="display: flex; flex-direction: column; gap: 14px">
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">Logo in beeld</b> bij elke run, heat of wedstrijd, in de overlay</p>
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">Harde cijfers</b> over kijkers, kijktijd en regio</p>
<p style="margin: 0; font-size: 18px; line-height: 1.5; border-top: 2px solid #161616; padding-top: 14px"><b style="font-family: 'Archivo', sans-serif">Een rapport na afloop</b> dat je volgend jaar opnieuw verkoopt</p>
</div>
</div>
</div>
</section>

<section id="bewijs" style="background: #000000; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #FF5F57"><span class="dot"></span>Onze eigen cijfers · EK Cable Wakeboard 2026</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; color: #FFFFFF; max-width: 1200px">Een nichesport, een internationaal publiek</h2><p style="margin: 0; max-width: 720px; font-size: 18px; line-height: 1.6; color: #CFCFCF">IWWF Europe & Africa Open Cable Wake Championships, Lakeside Paradise, Knokke-Heist, 1–3 oktober 2026. Drie dagen live op YouTube.</p></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">30.000+</span><span style="font-size: 17px; color: #BDBDBD">weergaven</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">5.300</span><span style="font-size: 17px; color: #BDBDBD">uur kijktijd</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">395</span><span style="font-size: 17px; color: #BDBDBD">kijkers tegelijk op het hoogtepunt</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 8px; border-top: 2px solid #333333; padding-top: 18px"><span class="h-black" style="font-size: clamp(52px, 5.4vw, 88px); line-height: 1; color: #FFFFFF">22</span><span style="font-size: 17px; color: #BDBDBD">uur live-uitzending</span></div>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 28px">
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">65%</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">Vooral nieuwe kijkers</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">Op dag 1 was 65% van de kijkers nieuw. Ruim 83% van de kijktijd kwam van mensen die niet geabonneerd waren.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">44–51%</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">YouTube deed het werk</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">van de weergaven kwam via aanbevelingen. Daarnaast via Instagram, het scoreplatform, WhatsApp en sporza.be.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">1/3</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">Op het grote scherm</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">29 tot 35% van de kijktijd ging via de tv. De rest ongeveer gelijk via mobiel en computer.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; background: #161616; border: 2px solid #333333; padding: 28px"><span class="h-black" style="font-size: 40px; color: #FF5F57">EU</span><h3 class="h-black" style="font-size: 20px; color: #FFFFFF">Uit heel Europa</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #CFCFCF">Top 5: België, Italië, Duitsland, Frankrijk en Nederland. Op dag 3 stond ook Polen erin.</p></div>
</div>
<div class="rv" style="display: flex; flex-wrap: wrap; gap: 12px 40px; font-size: 17px; line-height: 1.6; color: #CFCFCF; border-top: 1px solid #333333; padding-top: 22px">
<span>Gemiddeld 12 tot 17 minuten kijkduur</span><span>534 chatberichten tijdens de uitzendingen</span><span>28.500 extra weergaven op het kanaal in 28 dagen (<a href="#na-afloop" style="color: #FF5F57">zie na afloop</a>)</span><span><b style="color: #FFFFFF">Voor sponsors:</b> 58 tot 68% van de kijkers was 25 tot 44 jaar</span>
</div>
<span style="font-size: 14px; color: #8C8C8C">Bron: YouTube Analytics. Weergaven: stand 21 oktober 2026, en de teller loopt nog. Overige cijfers tot en met 14 oktober 2026.</span>
</div>
</section>

<section id="na-afloop" style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 56px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Na afloop</span><h2 class="h-black" style="font-size: clamp(40px, 5.2vw, 80px); line-height: 0.95; max-width: 1100px">Na de laatste heat begint het <span style="color: #D93A33">tweede leven</span></h2><p style="margin: 0; max-width: 720px; font-size: 18px; line-height: 1.6; color: #3C3C3C">De stream stopt, de content niet. Uit dezelfde opnames maken we nieuwe stukken die nog weken bereik opleveren, voor het event en voor de sponsors.</p></div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 0; border-top: 2px solid #161616">
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px 24px 24px 0; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">Tijdens</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Live</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Fans kijken mee op YouTube, je site of de tv. Sponsors staan in de overlay.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">Dezelfde avond</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Highlights per dag</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Een korte samenvatting van de dag, klaar voor YouTube en je website.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px; border-right: 1px solid #C8C8C8"><span class="eyebrow" style="color: #D93A33">De dagen erna</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Clips en social</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">Elke rider zijn eigen run om te delen. Verticaal voor Instagram en TikTok, met de sponsors in beeld.</p></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 10px; padding: 24px 0 24px 24px"><span class="eyebrow" style="color: #D93A33">Weken later</span><h3 class="h-black" style="font-size: 24px; line-height: 1">Terugkijken</h3><p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C">De volledige uitzending blijft online staan. YouTube blijft hem aanbevelen aan nieuwe kijkers.</p></div>
</div>

<div style="display: flex; flex-wrap: wrap; gap: clamp(40px, 5vw, 80px); align-items: center">
<div class="rv" style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 18px">
<span class="eyebrow" style="color: #555555">EK Cable Wakeboard 2026</span>
<h3 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 0.95">Na het event kwamen er meer weergaven bij dan de streams zelf haalden</h3>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">De drie streams haalden samen 27.508 weergaven. In de 28 dagen daarna kwamen er op het kanaal nog 28.500 weergaven bij. Inmiddels staat de teller op ruim 30.000 weergaven. Onderzoek wijst dezelfde kant op: het grootste deel van de kijktijd van live video valt ná de uitzending.</p>
<span style="font-size: 14px; color: #555555">Bronnen: YouTube Analytics, cijfers tot en met 14 oktober 2026 · TwentyThree, State of Online Video 2017</span>
</div>
<div class="rv" style="flex: 1 1 460px; display: flex; flex-direction: column; gap: 22px; background: #FFFFFF; border: 2px solid #161616; box-shadow: 12px 12px 0 #161616; padding: clamp(24px, 3vw, 40px)">
<div style="display: flex; flex-direction: column; gap: 8px"><div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px"><span style="font-size: 16px; font-weight: 600">Tijdens de livestreams</span><span class="h-black" style="font-size: 28px">27.508</span></div><div style="height: 28px; background: #E2E2E2; border: 2px solid #161616"><div style="height: 100%; width: 49%; background: #161616"></div></div></div>
<div style="display: flex; flex-direction: column; gap: 8px"><div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px"><span style="font-size: 16px; font-weight: 600">Erbij in 28 dagen na afloop</span><span class="h-black" style="font-size: 28px; color: #D93A33">+28.500</span></div><div style="height: 28px; background: #E2E2E2; border: 2px solid #161616"><div style="height: 100%; width: 51%; background: #FF5F57"></div></div></div>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C; border-top: 2px solid #161616; padding-top: 16px"><b class="h-black" style="font-size: 22px">±51%</b> van alle weergaven kwam na het event.</p>
</div>
</div>
</div>
</section>

<section style="background: #FF5F57; color: #161616; padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 32px">
<h2 class="h-black" style="font-size: clamp(44px, 6vw, 96px); line-height: 0.92; max-width: 1000px">Zet je volgende event live</h2>
<div style="display: flex; flex-wrap: wrap; gap: 16px"><a class="btn" href="/contact" style="background: #161616; color: #FFFFFF">Ontdek de mogelijkheden <span aria-hidden="true">→</span></a><a class="btn" href="/diensten" style="background: #FFFFFF">Bekijk de diensten</a></div>
</div>
</section>

<section style="background: #161616; padding: 48px 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 12px; font-size: 15px; line-height: 1.6; color: #A8A8A8">
<span class="eyebrow" style="color: #FFFFFF">Bronnen</span>
<span>The Broadcast Bridge, september 2026 · Ampere Analysis via Streaming Media, maart 2025 · TwentyThree, State of Online Video 2017 · The Sponsor, „Will the sports streaming shift hurt sponsorship value and visibility?”, juli 2025 · Eigen cijfers: YouTube Analytics, EK Cable Wakeboard 2026.</span>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, onderdeel van <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · KvK [NUMMER]</span></div>
</div>
</footer>

</div>`}var x=document.getElementById("app");x.textContent="";d(n(o,{}),x);
