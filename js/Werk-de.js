import{a as r,b as c,c as p,d as u}from"./chunk-O3OTVWYO.js";var i=u.bind(r),o=class extends c{render(){return y(this.renderVals()||{})}},d=class extends o{navInit(){this._ddClose||(this._ddClose=t=>{document.querySelectorAll("details.lang-dd[open]").forEach(s=>{s.contains(t.target)||s.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let e=()=>{let s=(window.scrollY||document.documentElement.scrollTop||0)>30;s!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:s})};this._navScroll=e,document.addEventListener("scroll",e,{capture:!0,passive:!0}),e()}navVals(){let e=this.state||{},t=!!e.menuOpen;return{hdrCls:e.scrolled||t?"hdr scrolled":"hdr",menuCls:t?"menu open":"menu",menuExpanded:t?"true":"false",menuHidden:t?"false":"true",menuLabel:t?"Men\xFC schlie\xDFen":"Men\xFC \xF6ffnen",toggleMenu:()=>this.setState({menuOpen:!t}),closeMenu:()=>this.setState({menuOpen:!1})}}constructor(e){super(e),this.state={filter:"Alle"}}componentDidMount(){this.navInit()}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0})}renderVals(){let e="/assets/",t=[{title:"EM Cable Wakeboard 2026",client:"IWWF \xB7 Lakeside Paradise, Knokke-Heist",cat:"Livestream",year:"2026",img:"43961b6008b5434aee2fd74d9a674b26.webp",alt:"Kameramann an der Wakeboardanlage w\xE4hrend der EM",href:"/de/projekte"},{title:"Kommentatorenstudio EM",client:"Lakeside Paradise",cat:"Livestream",year:"2026",img:"85192bee0221be346b4096db7639b7ef.webp",alt:"Kommentatoren im Studio der EM",href:"/de/projekte"},{title:"Regie EM",client:"IWWF",cat:"Livestream",year:"2026",img:"8de8495379f82c55f0196e41bed0a4d1.webp",alt:"Der Regietisch w\xE4hrend des Livestreams",href:"/de/projekte"},{title:"[Podcast]",client:"[Kunde]",cat:"Podcast",year:"[JAHR]",img:"d95b8c445c8b98ed14255d1436504439.webp",alt:"Platzhalter f\xFCr ein Podcast-Projekt",href:"/de/projekte"},{title:"Highlights und Clips EM",client:"IWWF \xB7 Aftercare pro Wettkampftag",cat:"Aftercare",year:"2026",img:"de4ba877c3ada9391766ea4638d6bd3f.webp",alt:"Editoren arbeiten an den Highlights des Tages",href:"/de/projekte"},{title:"[Kongress]",client:"[Veranstalter]",cat:"Gro\xDFproduktion",year:"[JAHR]",img:"4b4ba22a10248f001ac397a1b0e7930d.webp",alt:"Kameramann hinter einer Kamera auf Stativ",href:"/de/projekte"}],s=["Alle","Livestream","Podcast","Gro\xDFproduktion","Aftercare"],n=this.state.filter,f="background: #EFEFEF; color: #161616",h="background: transparent; color: #EFEFEF",g=s.map(l=>({label:l,pressed:l===n?"true":"false",style:l===n?f:h,pick:()=>this.setState({filter:l})})),b=(n==="Alle"?t:t.filter(l=>l.cat===n)).map(l=>({...l,src:e+l.img}));return{...this.navVals(),filters:g,shown:b,count:t.length}}};function y(a){return i`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${a.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/de" aria-label="BERK, zur Startseite"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Sprache wählen: Deutsch">DE <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Sprache"><a href="/werk" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en/work" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/projekte" hreflang="de" lang="de" aria-current="true">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/de/kontakt" style="min-height: 46px; padding: 0 20px; font-size: 13px">Gespräch vereinbaren</a>
<button class="burger" type="button" onClick=${a.toggleMenu} aria-expanded=${a.menuExpanded} aria-controls="menu" aria-label=${a.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${a.menuCls} aria-hidden=${a.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hauptmenü"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/de" onClick=${a.closeMenu}><small>01</small>Start</a></li><li><a href="/de/leistungen" onClick=${a.closeMenu}><small>02</small>Leistungen</a></li><li><a href="/de/warum-live" onClick=${a.closeMenu}><small>03</small>Warum live</a></li><li><a href="/de/projekte" aria-current="page" onClick=${a.closeMenu}><small>04</small>Projekte</a></li><li><a href="/de/ueber-uns" onClick=${a.closeMenu}><small>05</small>Über uns</a></li><li><a href="/de/kontakt" onClick=${a.closeMenu}><small>06</small>Kontakt</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Sprache"><a href="/werk" hreflang="nl" lang="nl">NL</a><a href="/en/work" hreflang="en" lang="en">EN</a><a href="/de/projekte" hreflang="de" lang="de" aria-current="true">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Kontakt</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0 48px">
<div class="wrap" style="display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Projekte · ${a.count} Produktionen</span>
<h1 class="h-black" style="font-size: clamp(52px, 8vw, 124px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Was wir <span style="color: #FF5F57">live</span> bringen und filmen</h1>
<p style="margin: 0; max-width: 680px; font-size: 18px; line-height: 1.6; color: #CFCFCF">Im Fokus: die EM Cable Wakeboard 2026, mit 5.300 Stunden Wiedergabezeit aus ganz Europa. <a href="/de/warum-live#bewijs" style="color: #FF5F57; font-weight: 600">Zahlen ansehen →</a></p>
<div role="group" aria-label="Nach Leistung filtern" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px">
${(a.filters||[]).map(e=>i`<button type="button" class="chip" onClick=${e.pick} aria-pressed=${e.pressed} style=${e.style}>${e.label}</button>`)}
</div>
</div>
</section>

<section style="padding: 0 0 clamp(96px, 10vw, 160px)">
<div class="wrap" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 520px), 1fr)); gap: 56px 40px">
${(a.shown||[]).map(e=>i`
<a class="tile" href=${e.href}>
<div class="frame"><img src=${e.src} alt=${e.alt} /><span class="tag">${e.cat}</span></div>
<div style="display: flex; justify-content: space-between; align-items: baseline; gap: 16px">
<div style="display: flex; flex-direction: column; gap: 4px"><span class="h-black" style="font-size: 26px; color: #FFFFFF">${e.title}</span><span style="font-size: 16px; color: #A8A8A8">${e.client}</span></div>
<span style="font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 14px; letter-spacing: 0.08em; color: #A8A8A8">${e.year}</span>
</div>
</a>
`)}
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, ein Teil von <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Handelsregister-Nr. [NUMMER]</span></div>
</div>
</footer>

</div>`}var m=document.getElementById("app");m.textContent="";p(r(d,{}),m);
