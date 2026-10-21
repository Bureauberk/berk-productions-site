import{a as n,b as c,c as p,d}from"./chunk-O3OTVWYO.js";var u=d.bind(n),i=class extends c{render(){return m(this.renderVals()||{})}},o=class extends i{navInit(){this._ddClose||(this._ddClose=e=>{document.querySelectorAll("details.lang-dd[open]").forEach(l=>{l.contains(e.target)||l.removeAttribute("open")})},document.addEventListener("click",this._ddClose));let s=()=>{let l=(window.scrollY||document.documentElement.scrollTop||0)>30;l!==!!(this.state&&this.state.scrolled)&&this.setState({scrolled:l})};this._navScroll=s,document.addEventListener("scroll",s,{capture:!0,passive:!0}),s()}navVals(){let s=this.state||{},e=!!s.menuOpen;return{hdrCls:s.scrolled||e?"hdr scrolled":"hdr",menuCls:e?"menu open":"menu",menuExpanded:e?"true":"false",menuHidden:e?"false":"true",menuLabel:e?"Close menu":"Open menu",toggleMenu:()=>this.setState({menuOpen:!e}),closeMenu:()=>this.setState({menuOpen:!1})}}componentDidMount(){if(this.navInit(),typeof window>"u"||!window.IntersectionObserver||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;let s=document.querySelector(".site");s&&(this._ro=new IntersectionObserver(e=>{let l=0;e.forEach(r=>{if(!r.isIntersecting)return;let t=r.target;this._ro.unobserve(t),t.style.transitionDelay=l++*80+"ms",t.classList.add("rv-go"),requestAnimationFrame(()=>t.classList.remove("rv-wait")),setTimeout(()=>{t.classList.remove("rv-go"),t.style.transitionDelay=""},1400)})},{rootMargin:"0px 0px -8% 0px",threshold:.12}),s.querySelectorAll(".rv").forEach(e=>{e.getBoundingClientRect().top<window.innerHeight*.92||(e.classList.add("rv-wait"),this._ro.observe(e))}))}componentWillUnmount(){document.removeEventListener("scroll",this._navScroll,{capture:!0}),this._ro&&this._ro.disconnect()}renderVals(){return{...this.navVals()}}};function m(a){return u`<div class="site" style="font-family: 'Hind', sans-serif; color: #EFEFEF; background: #161616; min-height: 100vh">

<header class=${a.hdrCls}>
<div class="wrap" style="height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px">
<a class="logo-link" href="/en" aria-label="BERK, go to the homepage"><img class="logo" src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" /></a>
<div style="display: flex; align-items: center; gap: 20px; padding: 0 6px">
<details class="lang-dd"><summary aria-label="Choose language: English">EN <span class="chev" aria-hidden="true">▾</span></summary><nav class="lang-list" aria-label="Language"><a href="/over" hreflang="nl" lang="nl">Nederlands<small>NL</small></a><a href="/en/about" hreflang="en" lang="en" aria-current="true">English<small>EN</small></a><a href="/de/ueber-uns" hreflang="de" lang="de">Deutsch<small>DE</small></a></nav></details>
<a class="btn cta" href="/en/contact" style="min-height: 46px; padding: 0 20px; font-size: 13px">Book a call</a>
<button class="burger" type="button" onClick=${a.toggleMenu} aria-expanded=${a.menuExpanded} aria-controls="menu" aria-label=${a.menuLabel}><span></span><span></span><span></span></button>
</div>
</div>
</header>
<div id="menu" class=${a.menuCls} aria-hidden=${a.menuHidden}>
<div class="wrap menu-in" style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 48px">
<nav aria-label="Main menu"><ul class="menu-links" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px"><li><a href="/en" onClick=${a.closeMenu}><small>01</small>Home</a></li><li><a href="/en/services" onClick=${a.closeMenu}><small>02</small>Services</a></li><li><a href="/en/why-live" onClick=${a.closeMenu}><small>03</small>Why live</a></li><li><a href="/en/work" onClick=${a.closeMenu}><small>04</small>Work</a></li><li><a href="/en/about" aria-current="page" onClick=${a.closeMenu}><small>05</small>About</a></li><li><a href="/en/contact" onClick=${a.closeMenu}><small>06</small>Contact</a></li></ul></nav>
<div class="menu-contact" style="display: flex; flex-direction: column; gap: 10px; align-self: flex-end; font-size: 18px; color: #BDBDBD"><nav class="lang" aria-label="Language"><a href="/over" hreflang="nl" lang="nl">NL</a><a href="/en/about" hreflang="en" lang="en" aria-current="true">EN</a><a href="/de/ueber-uns" hreflang="de" lang="de">DE</a></nav><span class="eyebrow" style="color: #FF5F57">Contact</span><a href="mailto:wouter@berk.productions" style="color: #FFFFFF">wouter@berk.productions</a><a href="tel:+31655764678" style="color: #FFFFFF">+31 6 55 76 46 78</a><span>Apeldoorn</span></div>
</div>
</div>

<section style="padding: clamp(72px, 8vw, 120px) 0">
<div class="wrap" style="display: flex; flex-wrap: wrap; gap: clamp(40px, 6vw, 96px); align-items: center">
<div style="flex: 3 1 560px; display: flex; flex-direction: column; gap: 24px">
<span class="eyebrow" style="color: #A8A8A8"><span class="dot"></span>About BERK</span>
<h1 class="h-black" style="font-size: clamp(52px, 7.6vw, 116px); line-height: 0.92; color: #FFFFFF; text-shadow: 6px 6px 0 #000000">We ride the <span style="color: #FF5F57">water</span> too</h1>
<p style="margin: 0; max-width: 620px; font-size: 20px; line-height: 1.6; color: #CFCFCF">BERK is a production company from Apeldoorn, set up by Wouter. He wakeboards himself and knows how a trick should look on camera. For each production we work with a regular crew of [NUMBER] operators and editors.</p>
</div>
<div style="flex: 2 1 320px; display: flex; justify-content: center">
<img src="/assets/eae890c425e9b3d2d96138dda45ade9d.svg" alt="" aria-hidden="true" style="width: min(100%, 340px); height: auto; filter: drop-shadow(14px 14px 0 #FF5F57)" />
</div>
</div>
</section>

<section style="background: #000000">
<img class="rv" src="/assets/4df518f60dbdd9dabeae08db7e609ac6.webp" alt="The BERK team on the jetty at Lakeside Paradise in Knokke-Heist" style="width: 100%; max-height: 720px; object-fit: cover; display: block" />
</section>

<section style="background: #EFEFEF; color: #161616; padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 48px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #555555">Three promises</span><h2 class="h-black" style="font-size: clamp(44px, 5.6vw, 84px); line-height: 0.95">How we work together</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 32px">
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">01</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Honest up front</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">A custom price and a fixed scope, in a no-obligation quote. We also tell you what’s not included.</p></div>
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">02</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Transparent during</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">You see the schedule, the setup and the test day. No black box.</p></div>
<div class="promise rv"><span class="h-black" style="font-size: 18px; color: #D93A33">03</span><h3 class="h-black" style="font-size: 30px; line-height: 1">Free to leave</h3><p style="margin: 0; font-size: 17px; line-height: 1.55; color: #3C3C3C">The footage and files are yours. No annual contract.</p></div>
</div>
</div>
</section>

<section style="background: #FF5F57; color: #161616; padding: clamp(56px, 6vw, 88px) 0">
<div class="wrap rv" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 28px">
<p class="h-black" style="margin: 0; font-size: clamp(28px, 3.4vw, 48px); line-height: 1; max-width: 900px">Small sports deserve a big audience. That’s why we do this.</p>
<a class="btn" href="/en/why-live" style="background: #161616; color: #FFFFFF">Why live <span aria-hidden="true">→</span></a>
</div>
</section>

<section style="padding: clamp(80px, 9vw, 140px) 0">
<div class="wrap" style="display: flex; flex-direction: column; gap: 40px">
<div class="rv" style="display: flex; flex-direction: column; gap: 16px"><span class="eyebrow" style="color: #A8A8A8">Crew</span><h2 class="h-black" style="font-size: clamp(40px, 5vw, 72px); line-height: 0.95; color: #FFFFFF">The people behind the camera</h2></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 32px">
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Portrait · Wouter</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">Wouter</span><span style="font-size: 16px; color: #A8A8A8">Founder, director</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Portrait</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Name]</span><span style="font-size: 16px; color: #A8A8A8">[Role]</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Portrait</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Name]</span><span style="font-size: 16px; color: #A8A8A8">[Role]</span></div>
<div class="rv" style="display: flex; flex-direction: column; gap: 12px"><div class="crew">Portrait</div><span class="h-black" style="font-size: 22px; color: #FFFFFF">[Name]</span><span style="font-size: 16px; color: #A8A8A8">[Role]</span></div>
</div>
</div>
</section>

<footer class="foot" style="background: #000000; color: #BDBDBD; padding: 48px 0 32px">
<div class="wrap" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px; font-size: 15px">
<img src="/assets/73856d47736b3086e6728a2971a015f5.svg" alt="BERK" style="height: 48px; width: auto" />
<div style="display: flex; flex-wrap: wrap; gap: 24px"><a href="mailto:wouter@berk.productions">wouter@berk.productions</a><a href="tel:+31655764678">+31 6 55 76 46 78</a><span>© 2026 BERK Productions, part of <a href="https://bureauberk.com" style="text-decoration: underline">Bureau BERK</a> · Chamber of Commerce no. [NUMBER]</span></div>
</div>
</footer>

</div>`}var h=document.getElementById("app");h.textContent="";p(n(o,{}),h);
