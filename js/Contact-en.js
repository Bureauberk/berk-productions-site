import{a as i,b as c,c as u,d as f}from"./chunk-O3OTVWYO.js";var o=f.bind(i),r=class extends c{render(){return m(this.renderVals()||{})}},p=class extends r{navInit(){this._ddClose||(this._ddClose=a=>{document.querySelectorAll("details.lang-dd[open]").forEach(l=>{l.contains(a.target)||l.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let e=()=>{let l=(window.scrollY||document.documentElement.scrollTop||0)>30;l!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:l})};this._navScroll=e,document.addEventListener("scroll",e,{capture:!0,passive:!0}),e()}navVals(){let e=this.state||{},a=!!e.menuOpen;return{hdrCls:e.scrolled||a?"hdr scrolled":"hdr",menuCls:a?"menu open":"menu",menuExpanded:a?"true":"false",menuHidden:a?"false":"true",menuLabel:a?"Close menu":"Open menu",toggleMenu:()=>this.setState({menuOpen:!a}),closeMenu:()=>this.setState({menuOpen:!1})}}constructor(e){super(e),this.state={type:"Livestream",sent:!1}}componentDidMount(){this.navInit()}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0})}async sendForm(){let e=document.querySelector(".site form");if(!e||e.reportValidity&&!e.reportValidity())return;let a={_subject:"Nieuwe aanvraag via berk.productions",_template:"table",_captcha:"false",Soort:this.state.type||"",Pagina:window.location.href};e.querySelectorAll("label").forEach(l=>{let s=l.querySelector("input, textarea, select");if(!s)return;let n=(l.childNodes[0]&&l.childNodes[0].textContent||s.name||"Veld").trim();a[n]=s.value;let d=s.type==="email"?s.value:"";d&&(a._replyto=d)}),this.setState({sending:!0,sendError:""});try{let l=await fetch("https://formsubmit.co/ajax/wouter@berk.productions",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});if(!l.ok)throw new Error("status "+l.status);this.setState({sent:!0,sending:!1})}catch{this.setState({sending:!1,sendError:"x"}),window.location.href="mailto:wouter@berk.productions"}}renderVals(){let e=this.state,a=["Livestream","Podcast","Large production"],l="background: #161616; color: #FFFFFF",s="background: #FFFFFF; color: #161616";return{...this.navVals(),sent:e.sent,notSent:!e.sent,types:a.map(n=>({label:n,pressed:n===e.type?"true":"false",style:n===e.type?l:s,pick:()=>this.setState({type:n})})),send:()=>this.sendForm(),reset:()=>this.setState({sent:!1})}}};function m(t){return o`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${t.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/en" aria-label="BERK, go to the homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Choose language: English">EN <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Language"><a href="/contact" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en/contact" hreflang="en" lang="en" aria-current="true">English<small>EN</small></a><a href="/de/kontakt" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/en/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Book a call</a>
<button class="burger" type="button" onClick=${t.toggleMenu} aria-expanded=${t.menuExpanded} aria-controls="menu" aria-label=${t.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${t.menuCls} aria-hidden=${t.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Main menu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/en" onClick=${t.closeMenu}><small>01</small>Home</a></li><li><a href="/en/services" onClick=${t.closeMenu}><small>02</small>Services</a></li><li><a href="/en/why-live" onClick=${t.closeMenu}><small>03</small>Why live</a></li><li><a href="/en/work" onClick=${t.closeMenu}><small>04</small>Work</a></li><li><a href="/en/about" onClick=${t.closeMenu}><small>05</small>About</a></li><li><a href="/en/contact" aria-current="page" onClick=${t.closeMenu}><small>06</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Language"><a href="/contact" hreflang="nl" lang="nl">NL</a><a href="/en/contact" hreflang="en" lang="en" aria-current="true">EN</a><a href="/de/kontakt" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(40px, 5vw, 80px)">

<div style="flex: 2 1 340px; display: flex; flex-direction: column; gap: 28px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>Contact</span>
<h1 class="h-black" style="font-size: clamp(48px, 6.4vw, 96px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">Tell us what you want to <span style="color: #FF5F57">shoot</span></h1>
<p style="margin: 0; max-width: 460px; font-size: 19px; line-height: 1.6; color: #CFCFCF">Within two working days you’ll have a custom quote, free of obligation. Rather call first? That’s fine too.</p>
<dl style="margin: 8px 0 0; display: flex; flex-direction: column; gap: 20px; border-top: 1px solid #333333; padding-top: 24px">
<div><dt class="eyebrow" style="color: #A8A8A8">Email</dt><dd style="margin: 6px 0 0; font-size: 20px"><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a></dd></div>
<div><dt class="eyebrow" style="color: #A8A8A8">Phone</dt><dd style="margin: 6px 0 0; font-size: 20px"><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a></dd></div>
<div><dt class="eyebrow" style="color: #A8A8A8">Base</dt><dd style="margin: 6px 0 0; font-size: 20px; color: #FFFFFF">Apeldoorn · we travel across the Netherlands and Belgium</dd></div>
</dl>
<p style="margin: 8px 0 0; font-size: 16px; line-height: 1.55; color: #A8A8A8; border-left: 4px solid #FF5F57; padding-left: 14px">Not sure if a stream is worth it for your sport? <a href="/en/why-live" style="color: #FFFFFF; font-weight: 600">See what the European Championships delivered →</a></p>
</div>

<div style="flex: 3 1 560px; background: #EFEFEF; color: #161616; border: 2px solid #000000; box-shadow: 12px 12px 0 #FF5F57; padding: clamp(24px, 3vw, 48px); box-sizing: border-box">
${t.sent?o`
<div style="display: flex; flex-direction: column; gap: 20px; min-height: 420px; justify-content: center">
<span class="eyebrow" style="color: #555555"><span class="dot"></span>Sent</span>
<h2 class="h-black" style="font-size: 48px; line-height: 0.95">Thanks. We’ll get back to you.</h2>
<p style="margin: 0; font-size: 18px; line-height: 1.6; color: #3C3C3C">Within two working days you’ll have a no-obligation quote in your inbox.</p>
<button class="btn" type="button" onClick=${t.reset} style="align-self: flex-start; background: #FFFFFF">Another request</button>
</div>
`:null}
${t.notSent?o`
<form style="display: flex; flex-direction: column; gap: 22px">
<fieldset style="border: 0; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px">
<legend class="lbl" style="margin-bottom: 10px">What’s it about?</legend>
<div style="display: flex; flex-wrap: wrap; gap: 10px">
${(t.types||[]).map(e=>o`<button class="seg" type="button" onClick=${e.pick} aria-pressed=${e.pressed} style=${e.style}>${e.label}</button>`)}
</div>
</fieldset>
<div style="display: flex; flex-wrap: wrap; gap: 18px">
<label class="lbl" style="flex: 1 1 220px">Name<input class="field" type="text" autocomplete="name" required /></label>
<label class="lbl" style="flex: 1 1 220px">Organisation or brand<input class="field" type="text" autocomplete="organization" /></label>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 18px">
<label class="lbl" style="flex: 1 1 220px">Email<input class="field" type="email" autocomplete="email" required /></label>
<label class="lbl" style="flex: 1 1 220px">Date or period<input class="field" type="text" placeholder="e.g. 12–14 June 2027" /></label>
</div>
<label class="lbl">Tell us briefly about your event or brand<textarea class="field" rows="5" style="resize: vertical"></textarea></label>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px">
<span style="font-size: 15px; color: #555555">We only use your details for this quote.</span>
<button class="btn" type="button" onClick=${t.send}>Request a quote <span aria-hidden="true">→</span></button>
</div>
</form>
`:null}
</div>

</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, part of <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Chamber of Commerce no. [NUMBER]</span></div>
</div>
</footer>

</div>`}var h=document.getElementById("app");h.textContent="";u(i(p,{}),h);
