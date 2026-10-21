import{a as n,b as c,c as p,d}from"./chunk-O3OTVWYO.js";var u=d.bind(n),i=class extends c{render(){return h(this.renderVals()||{})}},r=class extends i{navInit(){this._ddClose||(this._ddClose=a=>{document.querySelectorAll("details.lang-dd[open]").forEach(l=>{l.contains(a.target)||l.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let s=()=>{let l=(window.scrollY||document.documentElement.scrollTop||0)>30;l!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:l})};this._navScroll=s,document.addEventListener("scroll",s,{capture:!0,passive:!0}),s()}navVals(){let s=this.state||{},a=!!s.menuOpen;return{hdrCls:s.scrolled||a?"hdr scrolled":"hdr",menuCls:a?"menu open":"menu",menuExpanded:a?"true":"false",menuHidden:a?"false":"true",menuLabel:a?"Menu sluiten":"Menu openen",toggleMenu:()=>this.setState({menuOpen:!a}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let s=document.querySelector(".site");s&&(this._ro=new IntersectionObserver(a=>{let l=0;a.forEach(o=>{if(!o.isIntersecting)return;let t=o.target;this._ro.unobserve(t),t.style.transitionDelay=l++*80+"ms",t.classList.add("rv-go"),requestAnimationFrame(()=>t.classList.remove("rv-wait")),setTimeout(()=>{t.classList.remove("rv-go"),t.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),s.querySelectorAll(".rv").forEach(a=>{a.getBoundingClientRect().top<window.innerHeight*.92||(a.classList.add("rv-wait"),this._ro.observe(a))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function h(e){return u`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${e.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/" aria-label="BERK, naar de homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Kies taal: Nederlands">NL <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Taal"><a href="/over" hreflang="nl" lang="nl" aria-current="true">Nederlands<small>NL</small></a><a href="/en/about" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/ueber-uns" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Plan een gesprek</a>
<button class="burger" type="button" onClick=${e.toggleMenu} aria-expanded=${e.menuExpanded} aria-controls="menu" aria-label=${e.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${e.menuCls} aria-hidden=${e.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hoofdmenu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/" onClick=${e.closeMenu}><small>01</small>Home</a></li><li><a href="/diensten" onClick=${e.closeMenu}><small>02</small>Diensten</a></li><li><a href="/prijscalculator" onClick=${e.closeMenu}><small>03</small>Prijscalculator</a></li><li><a href="/waarom-live" onClick=${e.closeMenu}><small>04</small>Waarom live</a></li><li><a href="/werk" onClick=${e.closeMenu}><small>05</small>Werk</a></li><li><a href="/over" aria-current="page" onClick=${e.closeMenu}><small>06</small>Over</a></li><li><a href="/contact" onClick=${e.closeMenu}><small>07</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Taal"><a href="/over" hreflang="nl" lang="nl" aria-current="true">NL</a><a href="/en/about" hreflang="en" lang="en">EN</a><a href="/de/ueber-uns" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(40px, 6vw, 96px); align-items: center">
<div style="flex: 3 1 560px; display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Over BERK</span>
<h1 class="h-black" style="font-size: clamp(52px, 7.6vw, 116px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Wij staan zelf ook op het <span style="color: #FF5F57">water</span></h1>
<p style="margin: 0; max-width: 620px; font-size: 20px; line-height: 1.6; color: #CFCFCF">BERK is een productiebureau uit Apeldoorn, opgezet door Wouter. Hij wakeboardt zelf en weet hoe een trick er in beeld uit moet zien. Per productie werken we met een vaste crew van [AANTAL] operators en editors.</p>
</div>
<div style="flex: 2 1 320px; display: flex; justify-content: center">
<img src="/assets/eae890c425e9b3d2d96138dda45ade9d.svg" alt="" aria-hidden="true" style="width: min(100%, 340px); height: auto; filter: drop-shadow(14px 14px 0 #FF5F57)" />
</div>
</div>
</section>

<section style="background: #000000">
<img class="rv" src="/assets/4df518f60dbdd9dabeae08db7e609ac6.webp" alt="Het team van BERK op de steiger bij Lakeside Paradise in Knokke-Heist" style="width: 100%; max-height: 720px; object-fit: cover; display: block" />
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Drie beloftes</span><h2 class="h-black" style="font-size: clamp(44px, 5.6vw, 84px); line-height: 0.95">Zo werken we samen</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 32px">
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">01</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Eerlijk vooraf</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Een prijs op maat en een vaste scope, in een vrijblijvende offerte. Wat er niet in zit, zeggen we ook.</p></div>
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">02</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Transparant tijdens</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Je ziet de planning, de setup en de testdag. Geen black box.</p></div>
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">03</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Vrij om te gaan</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">De beelden en bestanden zijn van jou. Geen jaarcontract.</p></div>
</div>
</div>
</section>

<section style="background: #FF5F57; color: #161616; padding: clamp(56px, 6vw, 88px) 0">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 28px">
<p class="h-black" style="margin: 0; font-size: clamp(28px, 3.4vw, 48px); line-height: 1; max-width: 900px">Kleine sporten verdienen een groot publiek. Daarom doen we dit.</p>
<a class="btn" href="/waarom-live" style="background: #161616; color: #FFFFFF">Waarom live <span aria-hidden="true">→</span></a>
</div>
</section>

<section style="padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 40px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #A8A8A8">Crew</span><h2 class="h-black" style="font-size: clamp(40px, 5vw, 72px); line-height: 0.95; color: #FFFFFF">De mensen achter de camera</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 32px">
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Portret · Wouter</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">Wouter</span><span style="font-size: 16px; color: #A8A8A8">Oprichter, regie</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Portret</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Naam]</span><span style="font-size: 16px; color: #A8A8A8">[Rol]</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Portret</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Naam]</span><span style="font-size: 16px; color: #A8A8A8">[Rol]</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Portret</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Naam]</span><span style="font-size: 16px; color: #A8A8A8">[Rol]</span></div>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, onderdeel van <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · KvK [NUMMER]</span></div>
</div>
</footer>

</div>`}var m=document.getElementById("app");m.textContent="";p(n(r,{}),m);
