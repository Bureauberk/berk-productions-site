import{a as r,b as d,c as p,d as m}from"./chunk-O3OTVWYO.js";var i=m.bind(r),o=class extends d{render(){return b(this.renderVals()||{})}},c=class extends o{navInit(){this._ddClose||(this._ddClose=t=>{document.querySelectorAll("details.lang-dd[open]").forEach(s=>{s.contains(t.target)||s.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let e=()=>{let s=(window.scrollY||document.documentElement.scrollTop||0)>30;s!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:s})};this._navScroll=e,document.addEventListener("scroll",e,{capture:!0,passive:!0}),e()}navVals(){let e=this.state||{},t=!!e.menuOpen;return{hdrCls:e.scrolled||t?"hdr scrolled":"hdr",menuCls:t?"menu open":"menu",menuExpanded:t?"true":"false",menuHidden:t?"false":"true",menuLabel:t?"Menu sluiten":"Menu openen",toggleMenu:()=>this.setState({menuOpen:!t}),closeMenu:()=>this.setState({menuOpen:!1})}}constructor(e){super(e),this.state={filter:"Alles"}}componentDidMount(){this.navInit()}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0})}renderVals(){let e="/assets/",t=[{title:"EC Cablewakeboard 2026",client:"IWWF \xB7 Lakeside Paradise, Knokke-Heist",cat:"Livestream",year:"2026",img:"43961b6008b5434aee2fd74d9a674b26.webp",alt:"Cameraman aan de kabelbaan tijdens het EK",href:"/werk"},{title:"Commentaarstudio EK",client:"Lakeside Paradise",cat:"Livestream",year:"2026",img:"85192bee0221be346b4096db7639b7ef.webp",alt:"Commentatoren in de studio van het EK",href:"/werk"},{title:"Regie EK",client:"IWWF",cat:"Livestream",year:"2026",img:"8de8495379f82c55f0196e41bed0a4d1.webp",alt:"De regietafel tijdens de livestream",href:"/werk"},{title:"[Podcast]",client:"[Klant]",cat:"Podcast",year:"[JAAR]",img:"d95b8c445c8b98ed14255d1436504439.webp",alt:"Placeholder voor een podcastproject",href:"/werk"},{title:"Highlights en clips EK",client:"IWWF \xB7 aftercare per wedstrijddag",cat:"Aftercare",year:"2026",img:"de4ba877c3ada9391766ea4638d6bd3f.webp",alt:"Editors werken aan de highlights van de dag",href:"/werk"},{title:"[Congres]",client:"[Organisator]",cat:"Grote productie",year:"[JAAR]",img:"4b4ba22a10248f001ac397a1b0e7930d.webp",alt:"Cameraman achter een camera op statief",href:"/werk"}],s=["Alles","Livestream","Podcast","Grote productie","Aftercare"],n=this.state.filter,f="background: #EFEFEF; color: #161616",h="background: transparent; color: #EFEFEF",g=s.map(l=>({label:l,pressed:l===n?"true":"false",style:l===n?f:h,pick:()=>this.setState({filter:l})})),y=(n==="Alles"?t:t.filter(l=>l.cat===n)).map(l=>({...l,src:e+l.img}));return{...this.navVals(),filters:g,shown:y,count:t.length}}};function b(a){return i`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${a.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/" aria-label="BERK, naar de homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Kies taal: Nederlands">NL <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Taal"><a href="/werk" hreflang="nl" lang="nl" aria-current="true">Nederlands<small>NL</small></a><a href="/en/work" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/projekte" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Plan een gesprek</a>
<button class="burger" type="button" onClick=${a.toggleMenu} aria-expanded=${a.menuExpanded} aria-controls="menu" aria-label=${a.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${a.menuCls} aria-hidden=${a.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hoofdmenu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/" onClick=${a.closeMenu}><small>01</small>Home</a></li><li><a href="/diensten" onClick=${a.closeMenu}><small>02</small>Diensten</a></li><li><a href="/prijscalculator" onClick=${a.closeMenu}><small>03</small>Prijscalculator</a></li><li><a href="/waarom-live" onClick=${a.closeMenu}><small>04</small>Waarom live</a></li><li><a href="/werk" aria-current="page" onClick=${a.closeMenu}><small>05</small>Werk</a></li><li><a href="/over" onClick=${a.closeMenu}><small>06</small>Over</a></li><li><a href="/contact" onClick=${a.closeMenu}><small>07</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Taal"><a href="/werk" hreflang="nl" lang="nl" aria-current="true">NL</a><a href="/en/work" hreflang="en" lang="en">EN</a><a href="/de/projekte" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0 48px">
<div class="wrap" style="display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Werk · ${a.count} projecten</span>
<h1 class="h-black" style="font-size: clamp(52px, 8vw, 124px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Wat we <span style="color: #FF5F57">live</span> zetten en filmen</h1>
<p style="margin: 0; max-width: 680px; font-size: 18px; line-height: 1.6; color: #CFCFCF">Uitgelicht: het EK Cable Wakeboard 2026, met 5.300 uur kijktijd uit heel Europa. <a href="/waarom-live#bewijs" style="color: #FF5F57; font-weight: 600">Bekijk de cijfers →</a></p>
<div role="group" aria-label="Filter op dienst" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px">
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
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, onderdeel van <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · KvK [NUMMER]</span></div>
</div>
</footer>

</div>`}var u=document.getElementById("app");u.textContent="";p(r(c,{}),u);
