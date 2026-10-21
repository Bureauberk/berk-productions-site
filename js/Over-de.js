import{a as t,b as c,c as d,d as p}from"./chunk-O3OTVWYO.js";var h=p.bind(t),i=class extends c{render(){return m(this.renderVals()||{})}},r=class extends i{navInit(){this._ddClose||(this._ddClose=e=>{document.querySelectorAll("details.lang-dd[open]").forEach(l=>{l.contains(e.target)||l.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let a=()=>{let l=(window.scrollY||document.documentElement.scrollTop||0)>30;l!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:l})};this._navScroll=a,document.addEventListener("scroll",a,{capture:!0,passive:!0}),a()}navVals(){let a=this.state||{},e=!!a.menuOpen;return{hdrCls:a.scrolled||e?"hdr scrolled":"hdr",menuCls:e?"menu open":"menu",menuExpanded:e?"true":"false",menuHidden:e?"false":"true",menuLabel:e?"Men\xFC schlie\xDFen":"Men\xFC \xF6ffnen",toggleMenu:()=>this.setState({menuOpen:!e}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let a=document.querySelector(".site");a&&(this._ro=new IntersectionObserver(e=>{let l=0;e.forEach(o=>{if(!o.isIntersecting)return;let n=o.target;this._ro.unobserve(n),n.style.transitionDelay=l++*80+"ms",n.classList.add("rv-go"),requestAnimationFrame(()=>n.classList.remove("rv-wait")),setTimeout(()=>{n.classList.remove("rv-go"),n.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),a.querySelectorAll(".rv").forEach(e=>{e.getBoundingClientRect().top<window.innerHeight*.92||(e.classList.add("rv-wait"),this._ro.observe(e))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function m(s){return h`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${s.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/de" aria-label="BERK, zur Startseite"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Sprache wählen: Deutsch">DE <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Sprache"><a href="/over" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en/about" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/ueber-uns" hreflang="de" lang="de" aria-current="true">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/de/kontakt" style="min-height: 46px; padding: 0 20px; font-size: 13px">Gespräch vereinbaren</a>
<button class="burger" type="button" onClick=${s.toggleMenu} aria-expanded=${s.menuExpanded} aria-controls="menu" aria-label=${s.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${s.menuCls} aria-hidden=${s.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hauptmenü"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/de" onClick=${s.closeMenu}><small>01</small>Start</a></li><li><a href="/de/leistungen" onClick=${s.closeMenu}><small>02</small>Leistungen</a></li><li><a href="/de/warum-live" onClick=${s.closeMenu}><small>03</small>Warum live</a></li><li><a href="/de/projekte" onClick=${s.closeMenu}><small>04</small>Projekte</a></li><li><a href="/de/ueber-uns" aria-current="page" onClick=${s.closeMenu}><small>05</small>Über uns</a></li><li><a href="/de/kontakt" onClick=${s.closeMenu}><small>06</small>Kontakt</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Sprache"><a href="/over" hreflang="nl" lang="nl">NL</a><a href="/en/about" hreflang="en" lang="en">EN</a><a href="/de/ueber-uns" hreflang="de" lang="de" aria-current="true">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Kontakt</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(40px, 6vw, 96px); align-items: center">
<div style="flex: 3 1 560px; display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Über BERK</span>
<h1 class="h-black" style="font-size: clamp(52px, 7.6vw, 116px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Wir stehen selbst auch auf dem <span style="color: #FF5F57">Wasser</span></h1>
<p style="margin: 0; max-width: 620px; font-size: 20px; line-height: 1.6; color: #CFCFCF">BERK ist eine Produktionsfirma aus Apeldoorn, gegründet von Wouter. Er fährt selbst Wakeboard und weiß, wie ein Trick im Bild aussehen muss. Pro Produktion arbeiten wir mit einer festen Crew von [ANZAHL] Kameraleuten und Editoren.</p>
</div>
<div style="flex: 2 1 320px; display: flex; justify-content: center">
<img src="/assets/eae890c425e9b3d2d96138dda45ade9d.svg" alt="" aria-hidden="true" style="width: min(100%, 340px); height: auto; filter: drop-shadow(14px 14px 0 #FF5F57)" />
</div>
</div>
</section>

<section style="background: #000000">
<img class="rv" src="/assets/4df518f60dbdd9dabeae08db7e609ac6.webp" alt="Das Team von BERK auf dem Steg bei Lakeside Paradise in Knokke-Heist" style="width: 100%; max-height: 720px; object-fit: cover; display: block" />
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Drei Versprechen</span><h2 class="h-black" style="font-size: clamp(44px, 5.6vw, 84px); line-height: 0.95">So arbeiten wir zusammen</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 32px">
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">01</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Ehrlich vorab</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Ein individueller Preis und ein fester Leistungsumfang, in einem unverbindlichen Angebot. Was nicht enthalten ist, sagen wir auch.</p></div>
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">02</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Transparent im Ablauf</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Sie sehen die Planung, das Setup und den Testtag. Keine Blackbox.</p></div>
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">03</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Frei zu gehen</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">Bilder und Dateien gehören Ihnen. Kein Jahresvertrag.</p></div>
</div>
</div>
</section>

<section style="background: #FF5F57; color: #161616; padding: clamp(56px, 6vw, 88px) 0">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 28px">
<p class="h-black" style="margin: 0; font-size: clamp(28px, 3.4vw, 48px); line-height: 1; max-width: 900px">Kleine Sportarten verdienen ein großes Publikum. Deshalb machen wir das.</p>
<a class="btn" href="/de/warum-live" style="background: #161616; color: #FFFFFF">Warum live <span aria-hidden="true">→</span></a>
</div>
</section>

<section style="padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 40px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #A8A8A8">Crew</span><h2 class="h-black" style="font-size: clamp(40px, 5vw, 72px); line-height: 0.95; color: #FFFFFF">Die Menschen hinter der Kamera</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 32px">
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Porträt · Wouter</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">Wouter</span><span style="font-size: 16px; color: #A8A8A8">Gründer, Regie</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Porträt</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Name]</span><span style="font-size: 16px; color: #A8A8A8">[Rolle]</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Porträt</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Name]</span><span style="font-size: 16px; color: #A8A8A8">[Rolle]</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Porträt</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Name]</span><span style="font-size: 16px; color: #A8A8A8">[Rolle]</span></div>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, ein Teil von <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Handelsregister-Nr. [NUMMER]</span></div>
</div>
</footer>

</div>`}var u=document.getElementById("app");u.textContent="";d(t(r,{}),u);
