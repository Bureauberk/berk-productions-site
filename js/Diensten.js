import{a as i,b as p,c,d}from"./chunk-O3OTVWYO.js";var f=d.bind(i),t=class extends p{render(){return g(this.renderVals()||{})}},r=class extends t{navInit(){this._ddClose||(this._ddClose=a=>{document.querySelectorAll("details.lang-dd[open]").forEach(s=>{s.contains(a.target)||s.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let l=()=>{let s=(window.scrollY||document.documentElement.scrollTop||0)>30;s!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:s})};this._navScroll=l,document.addEventListener("scroll",l,{capture:!0,passive:!0}),l()}navVals(){let l=this.state||{},a=!!l.menuOpen;return{hdrCls:l.scrolled||a?"hdr scrolled":"hdr",menuCls:a?"menu open":"menu",menuExpanded:a?"true":"false",menuHidden:a?"false":"true",menuLabel:a?"Menu sluiten":"Menu openen",toggleMenu:()=>this.setState({menuOpen:!a}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let l=document.querySelector(".site");l&&(this._ro=new IntersectionObserver(a=>{let s=0;a.forEach(o=>{if(!o.isIntersecting)return;let n=o.target;this._ro.unobserve(n),n.style.transitionDelay=s++*80+"ms",n.classList.add("rv-go"),requestAnimationFrame(()=>n.classList.remove("rv-wait")),setTimeout(()=>{n.classList.remove("rv-go"),n.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),l.querySelectorAll(".rv").forEach(a=>{a.getBoundingClientRect().top<window.innerHeight*.92||(a.classList.add("rv-wait"),this._ro.observe(a))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function g(e){return f`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${e.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/" aria-label="BERK, naar de homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Kies taal: Nederlands">NL <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Taal"><a href="/diensten" hreflang="nl" lang="nl" aria-current="true">Nederlands<small>NL</small></a><a href="/en/services" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/leistungen" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Plan een gesprek</a>
<button class="burger" type="button" onClick=${e.toggleMenu} aria-expanded=${e.menuExpanded} aria-controls="menu" aria-label=${e.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${e.menuCls} aria-hidden=${e.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hoofdmenu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/" onClick=${e.closeMenu}><small>01</small>Home</a></li><li><a href="/diensten" aria-current="page" onClick=${e.closeMenu}><small>02</small>Diensten</a></li><li><a href="/prijscalculator" onClick=${e.closeMenu}><small>03</small>Prijscalculator</a></li><li><a href="/waarom-live" onClick=${e.closeMenu}><small>04</small>Waarom live</a></li><li><a href="/werk" onClick=${e.closeMenu}><small>05</small>Werk</a></li><li><a href="/over" onClick=${e.closeMenu}><small>06</small>Over</a></li><li><a href="/contact" onClick=${e.closeMenu}><small>07</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Taal"><a href="/diensten" hreflang="nl" lang="nl" aria-current="true">NL</a><a href="/en/services" hreflang="en" lang="en">EN</a><a href="/de/leistungen" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0 clamp(56px, 6vw, 88px)">
<div class="wrap" style="display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Diensten</span>
<h1 class="h-black" style="font-size: clamp(52px, 8vw, 124px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000; max-width: 1100px">Live, opgenomen en <span style="color: #FF5F57">na afloop</span> nog in beeld</h1>
<p style="margin: 0; max-width: 620px; font-size: 20px; line-height: 1.55; color: #CFCFCF">Vier diensten, één team. Alles met een prijs op maat en een vrijblijvende offerte vooraf.</p>
</div>
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: clamp(80px, 9vw, 140px)">

<article class="svc rv" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/8de8495379f82c55f0196e41bed0a4d1.webp" alt="De regie van BERK met het mengpaneel tijdens een livestream" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">01</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Livestreams</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Wij regelen camera’s, regie, replay, graphics en de stream. Jij regelt het event.</p>
<ul class="ticks"><li>Bemande en onbemande camera’s, live gemixt</li><li>Replay binnen seconden, eigen overlays en live scores</li><li>Stream naar YouTube, je eigen site of meerdere platforms</li><li>Testdag vooraf, en Starlink als er geen internet is</li><li>Drone-opnames als optie: €1.400 per dag</li></ul>
<p style="margin: 0; font-size: 16px; line-height: 1.55; color: #3C3C3C; border-left: 4px solid #FF5F57; padding-left: 14px">Het EK Cable Wakeboard staat inmiddels op ruim 30.000 weergaven, uit heel Europa. <a href="/waarom-live" style="color: #D93A33; font-weight: 600">Waarom live werkt →</a></p>
<span class="price">Basispakket vanaf €2.750 per dag · <a href="/prijscalculator" style="text-decoration: underline; text-underline-offset: 3px">reken het uit</a></span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap-reverse; flex-direction: row-reverse; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/85192bee0221be346b4096db7639b7ef.webp" alt="Commentaarstudio van BERK met twee presentatoren aan tafel" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">02</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Podcasts</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Een podcast die er ook op YouTube goed uitziet. In de studio of bij jou op locatie.</p>
<ul class="ticks"><li>Opname met meerdere camera’s en goede microfoons</li><li>Montage voor YouTube en Spotify</li><li>Korte clips voor social uit elke aflevering</li></ul>
<span class="price">Prijs: [PRIJS PER AFLEVERING]</span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/4b4ba22a10248f001ac397a1b0e7930d.webp" alt="Cameraman van BERK achter een camera op statief" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">03</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Grote producties</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Multicam voor congressen en grote events. Regie, opname en stream, met één aanspreekpunt.</p>
<ul class="ticks"><li>Meerdere zalen of podia tegelijk</li><li>Losse opnames van elke feed</li><li>Een productievoorstel met vaste afspraken</li></ul>
<span class="price">Prijs op maat</span>
</div>
</article>

<article class="svc rv" style="display: flex; flex-wrap: wrap-reverse; flex-direction: row-reverse; gap: clamp(32px, 5vw, 72px); align-items: center">
<div style="flex: 1 1 480px"><img class="shot" src="/assets/de4ba877c3ada9391766ea4638d6bd3f.webp" alt="Twee editors werken 's avonds aan een montage" /></div>
<div style="flex: 1 1 420px; display: flex; flex-direction: column; gap: 20px">
<span class="h-black" style="font-size: 18px; color: #D93A33">04</span>
<h2 class="h-black" style="font-size: clamp(40px, 4.6vw, 64px); line-height: 0.95">Aftercare</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Na elke wedstrijddag haalt onze AI de hoogtepunten uit de opnames. Wij kijken alles na voordat het online gaat.</p>
<ul class="ticks"><li>Highlights per dag</li><li>Clips per deelnemer, om te delen met sponsors</li><li>Verticaal voor Instagram en TikTok</li><li>Alles uit de opnames van de productie zelf</li></ul>
<span class="price">Op maat</span>
</div>
</article>

</div>
</section>

<section id="geen-aftermovies" style="background: #EFEFEF; color: #161616; padding: 0 0 clamp(80px, 9vw, 140px)">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; gap: clamp(28px, 4vw, 64px); align-items: flex-start; border-top: 2px solid #161616; padding-top: clamp(40px, 5vw, 72px)">
<div style="flex: 1 1 360px; display: flex; flex-direction: column; gap: 14px"><span class="eyebrow" style="color: #555555">Goed om te weten</span><h2 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 0.95">Waarom we geen aftermovies maken</h2></div>
<div style="flex: 2 1 520px; display: flex; flex-direction: column; gap: 16px; font-size: 18px; line-height: 1.6; color: #3C3C3C">
<p style="margin: 0">Een aftermovie vraagt een totaal andere manier van filmen. Daarvoor loopt een filmmaker de hele dag vrij rond met een eigen camera en een eigen plan: sfeer, details, publiek, de mensen achter de schermen. Die beelden ontstaan niet vanuit een regie.</p>
<p style="margin: 0">Wij richten al onze camera’s op de wedstrijd en de uitzending. Uit die opnames maken we highlights en clips per deelnemer: snel, eerlijk en direct bruikbaar voor je kanalen en je sponsors.</p>
<p style="margin: 0">Wil je er ook een aftermovie bij? Dan raden we je graag een filmmaker aan die daarin gespecialiseerd is, en stemmen we samen af op de dag zelf.</p>
</div>
</div>
</section>

<section style="background: #161616; padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap">
<div class="rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 32px; border: 2px solid #EFEFEF; box-shadow: 10px 10px 0 #FF5F57; padding: clamp(28px, 4vw, 56px); margin-right: 10px; box-sizing: border-box">
<div style="display: flex; flex-direction: column; gap: 14px; max-width: 760px">
<h2 class="h-black" style="font-size: clamp(32px, 3.6vw, 52px); line-height: 1; color: #FFFFFF">Prijs op maat, altijd vrijblijvend</h2>
<p style="margin: 0; font-size: 17px; line-height: 1.6; color: #CFCFCF">Genoemde bedragen zijn indicatieprijzen, exclusief btw. Reiskosten en, waar nodig, overnachting, eten en drinken rekenen we apart. Je krijgt altijd eerst een vrijblijvende offerte.</p>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 14px"><a class="btn" href="/prijscalculator">Bereken je prijs <span aria-hidden="true">→</span></a><a class="btn" href="/contact" style="background: #FFFFFF">Vraag een offerte aan</a></div>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, onderdeel van <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · KvK [NUMMER]</span></div>
</div>
</footer>

</div>`}var m=document.getElementById("app");m.textContent="";c(i(r,{}),m);
