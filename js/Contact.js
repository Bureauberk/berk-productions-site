import{a as r,b as c,c as u,d as f}from"./chunk-O3OTVWYO.js";var o=f.bind(r),i=class extends c{render(){return x(this.renderVals()||{})}},d=class extends i{navInit(){this._ddClose||(this._ddClose=a=>{document.querySelectorAll("details.lang-dd[open]").forEach(l=>{l.contains(a.target)||l.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let e=()=>{let l=(window.scrollY||document.documentElement.scrollTop||0)>30;l!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:l})};this._navScroll=e,document.addEventListener("scroll",e,{capture:!0,passive:!0}),e()}navVals(){let e=this.state||{},a=!!e.menuOpen;return{hdrCls:e.scrolled||a?"hdr scrolled":"hdr",menuCls:a?"menu open":"menu",menuExpanded:a?"true":"false",menuHidden:a?"false":"true",menuLabel:a?"Menu sluiten":"Menu openen",toggleMenu:()=>this.setState({menuOpen:!a}),closeMenu:()=>this.setState({menuOpen:!1})}}constructor(e){super(e),this.state={type:"Livestream",sent:!1}}componentDidMount(){this.navInit()}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0})}async sendForm(){let e=document.querySelector(".site form");if(!e||e.reportValidity&&!e.reportValidity())return;let a={_subject:"Nieuwe aanvraag via berk.productions",_template:"table",_captcha:"false",Soort:this.state.type||"",Pagina:window.location.href};e.querySelectorAll("label").forEach(l=>{let s=l.querySelector("input, textarea, select");if(!s)return;let n=(l.childNodes[0]&&l.childNodes[0].textContent||s.name||"Veld").trim();a[n]=s.value;let p=s.type==="email"?s.value:"";p&&(a._replyto=p)}),this.setState({sending:!0,sendError:""});try{let l=await fetch("https://formsubmit.co/ajax/wouter@berk.productions",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!l.ok)throw new Error("status "+l.status);this.setState({sent:!0,sending:!1})}catch{this.setState({sending:!1,sendError:"x"}),window.location.href="mailto:wouter@berk.productions"}}renderVals(){let e=this.state,a=["Livestream","Podcast","Grote productie"],l="background: #161616; color: #FFFFFF",s="background: #FFFFFF; color: #161616";return{...this.navVals(),sent:e.sent,notSent:!e.sent,types:a.map(n=>({label:n,pressed:n===e.type?"true":"false",style:n===e.type?l:s,pick:()=>this.setState({type:n})})),send:()=>this.sendForm(),reset:()=>this.setState({sent:!1})}}};function x(t){return o`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${t.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/" aria-label="BERK, naar de homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Kies taal: Nederlands">NL <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Taal"><a href="/contact" hreflang="nl" lang="nl" aria-current="true">Nederlands<small>NL</small></a><a href="/en/contact" hreflang="en" lang="en">English<small>EN</small></a><a href="/de/kontakt" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Plan een gesprek</a>
<button class="burger" type="button" onClick=${t.toggleMenu} aria-expanded=${t.menuExpanded} aria-controls="menu" aria-label=${t.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${t.menuCls} aria-hidden=${t.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Hoofdmenu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/" onClick=${t.closeMenu}><small>01</small>Home</a></li><li><a href="/partners" onClick=${t.closeMenu}><small>02</small>Voor merken</a></li><li><a href="/diensten" onClick=${t.closeMenu}><small>03</small>Voor organisatoren</a></li><li><a href="/live-verkopen" onClick=${t.closeMenu}><small>04</small>Live verkopen</a></li><li><a href="/podcasts" onClick=${t.closeMenu}><small>05</small>Podcasts</a></li><li><a href="/werk" onClick=${t.closeMenu}><small>06</small>Werk</a></li><li><a href="/over" onClick=${t.closeMenu}><small>07</small>Over</a></li><li><a href="/contact" aria-current="page" onClick=${t.closeMenu}><small>08</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Taal"><a href="/contact" hreflang="nl" lang="nl" aria-current="true">NL</a><a href="/en/contact" hreflang="en" lang="en">EN</a><a href="/de/kontakt" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(40px, 5vw, 80px)">

<div style="flex: 2 1 340px; display: flex; flex-direction: column; gap: 28px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Contact</span>
<h1 class="h-black" style="font-size: clamp(48px, 6.4vw, 96px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Vertel wat je wil <span style="color: #FF5F57">draaien</span></h1>
<p style="margin: 0; max-width: 460px; font-size: 19px; line-height: 1.6; color: #CFCFCF">Binnen twee werkdagen heb je een vrijblijvende offerte op maat. Liever eerst bellen? Ook goed.</p>
<dl style="margin: 8px 0 0; display: flex; flex-direction: column; gap: 20px; border-top: 1px solid #333333; padding-top: 24px">
<div><dt class="eyebrow" style="color: #A8A8A8">E-mail</dt><dd style="margin: 6px 0 0; font-size: 20px"><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a></dd></div>
<div><dt class="eyebrow" style="color: #A8A8A8">Telefoon</dt><dd style="margin: 6px 0 0; font-size: 20px"><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a></dd></div>
<div><dt class="eyebrow" style="color: #A8A8A8">Basis</dt><dd style="margin: 6px 0 0; font-size: 20px; color: #FFFFFF">Apeldoorn · we rijden door Nederland en België</dd></div>
</dl>
<p style="margin: 8px 0 0; font-size: 16px; line-height: 1.55; color: #A8A8A8; border-left: 4px solid #FF5F57; padding-left: 14px">Twijfel je of een stream de moeite waard is voor jouw sport? <a href="/waarom-live" style="color: #FFFFFF; font-weight: 600">Bekijk wat het EK opleverde →</a></p>
</div>

<div style="flex: 3 1 560px; background: #EFEFEF; color: #161616; border: 2px solid #000000; box-shadow: 12px 12px 0 #FF5F57; padding: clamp(24px, 3vw, 48px); box-sizing: border-box">
${t.sent?o`
<div style="display: flex; flex-direction: column; gap: 20px; min-height: 420px; justify-content: center">
<span class="eyebrow" style="color: #555555"><span class="dot"></span>Verstuurd</span>
<h2 class="h-black" style="font-size: 48px; line-height: 0.95">Dank. We komen erop terug.</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Binnen twee werkdagen heb je een vrijblijvende offerte in je inbox.</p>
<button class="btn" type="button" onClick=${t.reset} style="align-self: flex-start; background: #FFFFFF">Nog een aanvraag</button>
</div>
`:null}
${t.notSent?o`
<form style="display: flex; flex-direction: column; gap: 22px">
<fieldset style="border: 0; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px">
<legend class="lbl" style="margin-bottom: 10px">Waar gaat het om?</legend>
<div style="display: flex; flex-wrap: wrap; gap: 10px">
${(t.types||[]).map(e=>o`<button class="seg" type="button" onClick=${e.pick} aria-pressed=${e.pressed} style=${e.style}>${e.label}</button>`)}
</div>
</fieldset>
<div style="display: flex; flex-wrap: wrap; gap: 18px">
<label class="lbl" style="flex: 1 1 220px">Naam<input class="field" type="text" autocomplete="name" required /></label>
<label class="lbl" style="flex: 1 1 220px">Organisatie of merk<input class="field" type="text" autocomplete="organization" /></label>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 18px">
<label class="lbl" style="flex: 1 1 220px">E-mail<input class="field" type="email" autocomplete="email" required /></label>
<label class="lbl" style="flex: 1 1 220px">Datum of periode<input class="field" type="text" placeholder="bijv. 12–14 juni 2027" /></label>
</div>
<label class="lbl">Vertel kort over je event of merk<textarea class="field" rows="5" style="resize: vertical"></textarea></label>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px">
<span style="font-size: 15px; color: #555555">We gebruiken je gegevens alleen voor deze offerte.</span>
<button class="btn" type="button" onClick=${t.send}>Vraag een offerte aan <span aria-hidden="true">→</span></button>
</div>
</form>
`:null}
</div>

</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: clamp(64px, 7vw, 104px) 0 32px">
<div class="wrap" style="display: flex; flex-direction: column; gap: clamp(40px, 5vw, 64px)">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 40px"><div style="display: flex; flex-direction: column; gap: 20px; max-width: 540px"><img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 72px; width: auto; align-self: flex-start" /><p style="margin: 0; font-size: 18px; line-height: 1.6; color: #CFCFCF">Live uitzendingen en clips van sport en events, voor merken en organisatoren. Gespecialiseerd in niche- en actiesporten, vanuit Apeldoorn door Nederland, België en Duitsland.</p></div><div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start"><span class="eyebrow" style="color: #FF5F57">Iets live zetten?</span><a href="mailto:wouter@berk.productions" style="font-family: 'Archivo', sans-serif; font-weight: 700; font-size: clamp(20px, 2.4vw, 32px); line-height: 1.1; color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="font-size: 18px; color: #FFFFFF">+31 6 55 76 46 78</a><a class="btn" href="/contact" style="margin-top: 12px">Plan een gesprek <span aria-hidden="true">→</span></a></div></div>
<nav aria-label="Footer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr)); gap: 36px 32px; font-size: 16px; line-height: 1.45; border-top: 1px solid #2A2A2A; padding-top: clamp(40px, 5vw, 56px)"><div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 4px">Diensten</span><a href="/diensten">Livestreams</a><a href="/live-verkopen">Live verkopen</a><a href="/podcasts">Podcasts</a><a href="/diensten">Grote producties</a><a href="/diensten">Content na het event</a><a href="/livestream-watersport">Watersport-livestream</a></div><div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 4px">Kennisbank</span><a href="/kennisbank/wat-kost-een-livestream">Wat kost een livestream?</a><a href="/kennisbank/hoeveel-internet-voor-livestream">Hoeveel internet heb je nodig?</a><a href="/kennisbank/sportevent-livestreamen">Je sportevent livestreamen</a><a href="/kennisbank/case-ek-cable-wakeboard-2026">Case: EK Cable Wakeboard</a><a href="/kennisbank">Alle artikelen →</a></div><div style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 4px">BERK</span><a href="/partners">Voor merken</a><a href="/prijscalculator">Prijscalculator</a><a href="/waarom-live">Waarom live</a><a href="/kennisbank">Kennisbank</a><a href="/werk">Werk</a><a href="/over">Over</a><a href="/contact">Contact</a></div><div style="display: flex; flex-direction: column; gap: 10px"><span class="eyebrow" style="color: #FFFFFF; margin-bottom: 4px">Zo werken we</span><span style="display: flex; gap: 10px; align-items: baseline"><span aria-hidden="true" style="color: #FF5F57">✓</span>Offerte binnen twee werkdagen</span><span style="display: flex; gap: 10px; align-items: baseline"><span aria-hidden="true" style="color: #FF5F57">✓</span>Vaste prijs, testdag vooraf</span><span style="display: flex; gap: 10px; align-items: baseline"><span aria-hidden="true" style="color: #FF5F57">✓</span>Clips binnen 24 uur</span><span style="display: flex; gap: 10px; align-items: baseline"><span aria-hidden="true" style="color: #FF5F57">✓</span>De clips zijn van jullie</span><span style="display: flex; gap: 10px; align-items: baseline"><span aria-hidden="true" style="color: #FF5F57">✓</span>Geen jaarcontract</span></div></nav>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; border-top: 1px solid #2A2A2A; padding-top: 20px; font-size: 14px; color: #8C8C8C"><span>© 2026 BERK Productions, onderdeel van <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · KvK 95395792</span><span style="display: flex; flex-wrap: wrap; gap: 6px 18px"><a href="/privacy">Privacyverklaring</a><a href="#cookies" data-consent-open="">Cookie-instellingen</a><span>Apeldoorn · Nederland · België · Duitsland</span></span></div>
</div>
</footer>

</div>`}var m=document.getElementById("app");m.textContent="";u(r(d,{}),m);
