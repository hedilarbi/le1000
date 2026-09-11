import Image from "next/image";

const ORDERING_URL = "https://mylightspeed.app/IETTYUUN/C-ordering/menu";

export function MenuContent() {
  return (
<div id="mn-root" style={{ position: "relative", background: "#0D0E0E" }}><section id="mn-top" data-screen-label="Menu \u2014 Hero" style={{ position: "relative", minHeight: "clamp(420px,64vh,600px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
    <div id="mn-heroimg" style={{ position: "absolute", inset: "-20% 0", willChange: "transform" }}>
      <Image fill src="/images/image00008.jpeg" alt="La salle et le bar du 1000" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 42%", display: "block", filter: "saturate(.82) contrast(1.04)" }} />
    </div>
    <div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,14,14,.82) 0%,rgba(13,14,14,.5) 42%,rgba(13,14,14,.96) 100%)" }} />
    <div id="mn-herotext" style={{ position: "relative", zIndex: "3", width: "100%", padding: "0 clamp(20px,5vw,80px) clamp(38px,7vh,74px)", willChange: "transform" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1440, margin: "0 auto" }}>
        <span data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(11px,1vw,14px)", letterSpacing: ".44em", color: "#D1A647" }}>
          <span aria-hidden="true" style={{ display: "block", width: "clamp(28px,5vw,64px)", height: 1, background: "linear-gradient(90deg,rgba(173,111,35,0),#D1A647)" }} />
          CARTE COMPL&Egrave;TE
        </span>
        <h1 data-reveal="up" data-delay="90" style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "700", fontSize: "clamp(56px,8vw,124px)", lineHeight: ".94", letterSpacing: ".005em", textTransform: "uppercase" }}>Le menu</h1>
        <p data-reveal="up" data-delay="200" style={{ maxWidth: 560, fontSize: "clamp(15px,1.3vw,19px)", lineHeight: "1.7", fontWeight: "400", color: "#EFE9DC", textShadow: "0 1px 18px rgba(13,14,14,.85)" }}>Cuisine de bistro g&eacute;n&eacute;reuse, grillades, pizzas artisanales et poutines gourmandes &mdash; arros&eacute;es d&apos;une promo diff&eacute;rente chaque jour de la semaine.</p>
        <a href="#mn-promo" data-reveal="up" data-delay="300" style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 18px", maxWidth: 640, marginTop: 8, padding: "18px 22px", border: "1px solid rgba(209,166,71,.55)", borderRadius: 2, background: "linear-gradient(140deg,rgba(209,166,71,.2),rgba(13,14,14,.62))", backdropFilter: "blur(6px)", transition: "border-color .5s ease,background .5s ease" }}>
          <span id="mn-todaylabel" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".28em", color: "#FBE275" }}>PROMO DU JOUR</span>
          <span id="mn-todaytext" style={{ flex: "1", minWidth: 200, fontSize: "clamp(15px,1.4vw,19px)", lineHeight: "1.5", fontWeight: "500", color: "#F2EFE8" }}>Voir les promotions de la semaine</span>
          <span aria-hidden="true" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".22em", color: "rgba(251,226,117,.8)" }}>VOIR TOUT &darr;</span>
        </a>
      </div>
    </div>
  </section>

  <section id="mn-promo" data-promo="1" data-screen-label="Promo quotidienne" style={{ position: "relative", padding: "clamp(64px,10vh,120px) clamp(20px,5vw,80px)", overflow: "hidden", scrollMarginTop: 120, borderTop: "1px solid rgba(209,166,71,.18)" }}>
    <div id="mn-promoimg" aria-hidden="true" style={{ position: "absolute", inset: "-18% 0", willChange: "transform" }}>
      <Image fill src="/images/image00020.jpeg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%", display: "block", filter: "saturate(.5) brightness(.42)" }} />
    </div>
    <div aria-hidden="true" style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,14,14,.92),rgba(13,14,14,.8) 50%,rgba(13,14,14,.95))" }} />
    <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto" }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: "clamp(34px,5vh,56px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#FBE275,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(32px,4.4vw,64px)", lineHeight: "1", letterSpacing: ".05em", background: "linear-gradient(100deg,#FBE275,#D1A647 55%,#AD6F23)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>PROMO QUOTIDIENNE</h2>
        <p style={{ maxWidth: 620, fontSize: "14.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.62)" }}>Une raison de passer chaque jour de la semaine.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginBottom: "clamp(30px,4vh,46px)" }}>
        <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "22px 24px", border: "1px solid rgba(209,166,71,.4)", borderRadius: 2, background: "rgba(13,14,14,.55)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 14, letterSpacing: ".22em", color: "#FBE275" }}>AVANT 16 H</span>
          <span style={{ fontSize: 16, fontWeight: "400", color: "#F2EFE8" }}>Nachos &agrave; <strong style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 26, fontWeight: "600" }}>12&nbsp;$</strong></span>
        </div>
        <div data-reveal="up" data-delay="80" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "22px 24px", border: "1px solid rgba(209,166,71,.4)", borderRadius: 2, background: "linear-gradient(140deg,rgba(209,166,71,.18),rgba(13,14,14,.55))" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 14, letterSpacing: ".22em", color: "#FBE275" }}>HAPPY HOUR &middot; 16 H &ndash; 19 H</span>
          <span style={{ fontSize: 16, fontWeight: "400", color: "#F2EFE8" }}>Bi&egrave;re 20 oz &agrave; <strong style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 26, fontWeight: "600" }}>7&nbsp;$</strong> &middot; Martini &agrave; <strong style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 26, fontWeight: "600" }}>10&nbsp;$</strong></span>
        </div>
        <div data-reveal="up" data-delay="160" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "22px 24px", border: "1px solid rgba(209,166,71,.4)", borderRadius: 2, background: "rgba(13,14,14,.55)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 14, letterSpacing: ".22em", color: "#FBE275" }}>BI&Egrave;RE LANDSHARK</span>
          <span style={{ fontSize: 16, fontWeight: "400", color: "#F2EFE8" }}><strong style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 26, fontWeight: "600" }}>5 pour 35&nbsp;$</strong> &middot; en tout temps</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div data-reveal="up" className="mn-promorow" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid rgba(209,166,71,.16)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(20px,2.2vw,28px)", letterSpacing: ".1em", color: "#FBE275" }}>LUNDI</span>
          <span style={{ fontSize: "15.5px", lineHeight: "1.7", color: "rgba(242,239,232,.86)" }}><strong style={{ fontWeight: "600" }}>Tacos et vins</strong> &mdash; Tacos 4 $ l&apos;unit&eacute; &middot; Bouteilles de vin &agrave; 50 % de rabais</span>
        </div>
        <div data-reveal="up" className="mn-promorow" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid rgba(209,166,71,.16)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(20px,2.2vw,28px)", letterSpacing: ".1em", color: "#FBE275" }}>MARDI</span>
          <span style={{ fontSize: "15.5px", lineHeight: "1.7", color: "rgba(242,239,232,.86)" }}><strong style={{ fontWeight: "600" }}>Ailes</strong> &mdash; Ailes de poulet &agrave; 50 % de rabais</span>
        </div>
        <div data-reveal="up" className="mn-promorow" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid rgba(209,166,71,.16)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(20px,2.2vw,28px)", letterSpacing: ".1em", color: "#FBE275" }}>MERCREDI</span>
          <span style={{ fontSize: "15.5px", lineHeight: "1.7", color: "rgba(242,239,232,.86)" }}><strong style={{ fontWeight: "600" }}>Steak frites</strong> &mdash; Steak frites &agrave; 30 $</span>
        </div>
        <div data-reveal="up" className="mn-promorow" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid rgba(209,166,71,.16)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(20px,2.2vw,28px)", letterSpacing: ".1em", color: "#FBE275" }}>JEUDI</span>
          <span style={{ fontSize: "15.5px", lineHeight: "1.7", color: "rgba(242,239,232,.86)" }}><strong style={{ fontWeight: "600" }}>Burger</strong> &mdash; Burger jalape&ntilde;os cheddar &agrave; 10 $</span>
        </div>
        <div data-reveal="up" className="mn-promorow" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid rgba(209,166,71,.16)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(20px,2.2vw,28px)", letterSpacing: ".1em", color: "#FBE275" }}>VENDREDI</span>
          <span style={{ fontSize: "15.5px", lineHeight: "1.7", color: "rgba(242,239,232,.86)" }}><strong style={{ fontWeight: "600" }}>Double ton fort</strong> &mdash; Boisson forte doubl&eacute;e</span>
        </div>
        <div data-reveal="up" className="mn-promorow" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid rgba(209,166,71,.16)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(20px,2.2vw,28px)", letterSpacing: ".1em", color: "#FBE275" }}>SAMEDI</span>
          <span style={{ fontSize: "15.5px", lineHeight: "1.7", color: "rgba(242,239,232,.86)" }}><strong style={{ fontWeight: "600" }}>Bouteille</strong> &mdash; Bouteille 26 oz (vodka, rhum, gin) &agrave; 75 $</span>
        </div>
        <div data-reveal="up" className="mn-promorow" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "baseline", padding: "18px 0", borderTop: "1px solid rgba(209,166,71,.16)", borderBottom: "1px solid rgba(209,166,71,.16)" }}>
          <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(20px,2.2vw,28px)", letterSpacing: ".1em", color: "#FBE275" }}>DIMANCHE</span>
          <span style={{ fontSize: "15.5px", lineHeight: "1.7", color: "rgba(242,239,232,.86)" }}><strong style={{ fontWeight: "600" }}>Steak frites</strong> &mdash; Steak frites &agrave; 30 $</span>
        </div>
      </div>

      <p style={{ marginTop: 26, fontSize: "12.5px", lineHeight: "1.7", fontWeight: "300", color: "rgba(242,239,232,.42)" }}>Les prix et les promotions peuvent changer sans pr&eacute;avis. Taxes et service non inclus.</p>
    </div>
  </section>

  <nav id="mn-catnav" aria-label="Cat\xE9gories du menu" style={{ position: "sticky", top: 92, zIndex: "60", display: "flex", gap: 8, overflowX: "auto", padding: "14px clamp(20px,5vw,80px)", background: "rgba(13,14,14,.92)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(209,166,71,.14)" }}>
    <a href="#cat-entrees" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>ENTR&Eacute;ES</a>
    <a href="#cat-partager" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>&Agrave; PARTAGER</a>
    <a href="#cat-salades" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>SALADES</a>
    <a href="#cat-burgers" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>BURGERS &amp; SANDWICHS</a>
    <a href="#cat-pizzas" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>PIZZAS &amp; P&Acirc;TES</a>
    <a href="#cat-tacos" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>TACOS</a>
    <a href="#cat-grillades" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>GRILLADES</a>
    <a href="#cat-poke" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>POK&Eacute; BOWL</a>
    <a href="#cat-poutines" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>POUTINES</a>
    <a href="#cat-desserts" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>DESSERTS</a>
    <a href="#cat-enfant" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "rgba(242,239,232,.8)", whiteSpace: "nowrap", transition: "border-color .4s ease,color .4s ease,background .4s ease" }}>MENU ENFANT</a>
    <a href="#mn-promo" style={{ flex: "0 0 auto", padding: "9px 16px", border: "1px solid rgba(209,166,71,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "#FBE275", whiteSpace: "nowrap", background: "rgba(209,166,71,.1)", transition: "background .4s ease" }}>PROMO QUOTIDIENNE</a>
  </nav>

  <div style={{ maxWidth: 1440, margin: "0 auto", padding: "clamp(56px,9vh,110px) clamp(20px,5vw,80px) 0" }}>

    <section id="cat-entrees" data-screen-label="Entr\xE9es" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>ENTR&Eacute;ES</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Des mises en bouche savoureuses pour ouvrir l&apos;app&eacute;tit.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Soupe du jour</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>6&nbsp;$</span>
          </div>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Assiette de crudit&eacute;s <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>8&nbsp;$</span>
          </div>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Rondelles d&apos;oignon <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>9&nbsp;$</span>
          </div>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Chips chaudes <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>9&nbsp;$</span>
          </div>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Frites de patates douces gaufr&eacute;es <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>9&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Frites croustillantes, mayo chipotle maison</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Cornichons frits <span style={{ fontWeight: "400", color: "rgba(242,239,232,.6)" }}>(5)</span> <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>9&nbsp;$</span>
          </div>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>B&acirc;tonnets de fromage <span style={{ fontWeight: "400", color: "rgba(242,239,232,.6)" }}>(5)</span> <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>9&nbsp;$</span>
          </div>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Bruschetta rustique <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>10&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Pain grill&eacute;, tomates fra&icirc;ches, basilic, ail r&ocirc;ti, filet de balsamique vieilli</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Fondue 5 fromages <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>14&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>M&eacute;lange riche et onctueux de cheddar vieilli, suisse, mozzarella et parmesan. Un incontournable savoureux !</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Meatballs du 1000</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>15&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Deux grosses boulettes rehauss&eacute;es de parmesan, napp&eacute;es d&apos;une sauce tomate aux herbes et gratin&eacute;es au four. Servies avec un pain &agrave; l&apos;ancienne. Une entr&eacute;e gourmande et r&eacute;confortante.</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Crevettes &agrave; l&apos;ail</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>15&nbsp;$</span>
          </div>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Calamars croustillants</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>18&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Calamars tendres, l&eacute;g&egrave;rement pan&eacute;s, mayo citronn&eacute;e maison</p>
        </a>
      </div>
    </section>

    <section id="cat-partager" data-screen-label="Entr\xE9es \xE0 partager" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>ENTR&Eacute;ES &Agrave; PARTAGER</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Parfaites pour un moment convivial autour de la table.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Brie fondant <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>14&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Brie fondant, croustade de pommes et noix croustillantes &agrave; l&apos;&eacute;rable</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Nachos le 1000 <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>16&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Tortillas croustillantes, fromage fondant, salsa fra&icirc;che, jalape&ntilde;os, cr&egrave;me s&ucirc;re</p>
          <p style={{ fontSize: 13, lineHeight: "1.7", fontStyle: "italic", color: "rgba(209,166,71,.9)" }}>Ajoutez : porc effiloch&eacute;, boeuf hach&eacute; ou poulet croustillant &mdash; 5 $</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 9, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Ailes de poulet</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px" }}>
            <span style={{ display: "flex", alignItems: "baseline", gap: 7 }}><span style={{ fontSize: 13, fontWeight: "300", color: "rgba(242,239,232,.6)" }}>8 mcx</span><span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 23, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>12&nbsp;$</span></span>
            <span style={{ display: "flex", alignItems: "baseline", gap: 7 }}><span style={{ fontSize: 13, fontWeight: "300", color: "rgba(242,239,232,.6)" }}>16 mcx</span><span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 23, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>23&nbsp;$</span></span>
            <span style={{ display: "flex", alignItems: "baseline", gap: 7 }}><span style={{ fontSize: 13, fontWeight: "300", color: "rgba(242,239,232,.6)" }}>24 mcx</span><span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 23, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>33&nbsp;$</span></span>
          </div>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Plateau de charcuteries</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>23&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Fruits frais du moment, fromages fins, croutons</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Mix d&apos;entr&eacute;es gourmand</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>26&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>B&acirc;tonnets de fromage, cornichons frits, saucisses en p&acirc;te, rondelles d&apos;oignons panko, doigts de poulet pan&eacute;s, patates douces gaufr&eacute;es</p>
        </a>
      </div>
    </section>

    <section id="cat-salades" data-screen-label="Salades" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>SALADES</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Fra&icirc;ches, croquantes et pleines de saveurs.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Salade C&eacute;sar</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>13&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Laitue romaine croquante, parmesan affin&eacute;, bacon croustillant, cro&ucirc;tons dor&eacute;s, vinaigrette C&eacute;sar maison</p>
          <p style={{ fontSize: 13, lineHeight: "1.7", fontStyle: "italic", color: "rgba(209,166,71,.9)" }}>Format repas (avec poulet) &mdash; 19 $</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Salade Tha&iuml;</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>17&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>L&eacute;gumes croquants, coriandre, arachides, poulet, vinaigrette s&eacute;same-lime</p>
        </a>
      </div>
    </section>

    <section id="cat-burgers" data-screen-label="Burgers et sandwichs" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>BURGERS &amp; SANDWICHS</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Servis avec frites maison ou salade.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Wrap poulet C&eacute;sar</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>15&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Poulet grill&eacute;, laitue romaine, bacon, parmesan, tortilla moelleuse</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Burger jalape&ntilde;os cheddar</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>16&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Galette de porc au cheddar et jalape&ntilde;os, fromage cheddar, mayo &eacute;pic&eacute;e, salade, tomates, oignons croustillants, pain burger s&eacute;same</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Sandwich au porc effiloch&eacute;</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>19&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Porc mijot&eacute;, sauce BBQ fum&eacute;e, provolone fondant, pain ciabatta</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Club sandwich classique</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>19&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Poulet grill&eacute;, bacon, tomate, laitue, mayo, pain &agrave; l&apos;ancienne</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Sandwich steak philly</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>21&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Boeuf &eacute;minc&eacute; style steak philly, oignons rouges, poivrons grill&eacute;s, provolone fondant, pain ciabatta</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Burger au poulet parisien</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>21&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Poitrine de poulet grill&eacute;e, champignons saut&eacute;s, fromage suisse, oignons caram&eacute;lis&eacute;s, sauce cr&eacute;meuse, pain brioch&eacute;</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(209,166,71,.28)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3", color: "#FBE275" }}>Burger le 1000</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#FBE275" }}>23&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.62)" }}>Boeuf hach&eacute;, halloumi grill&eacute;, confit d&apos;oignons, bacon fum&eacute;, pain brioch&eacute;</p>
        </a>
      </div>
    </section>

    <section id="cat-pizzas" data-screen-label="Pizzas et p\xE2tes" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>PIZZAS &amp; P&Acirc;TES</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Des classiques r&eacute;invent&eacute;s avec des ingr&eacute;dients frais.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Spaghetti bolognaise</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>16&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Servi avec une sauce bolognaise maison, mijot&eacute;e lentement avec du boeuf hach&eacute;, des tomates et des herbes aromatiques</p>
          <p style={{ fontSize: 13, lineHeight: "1.7", fontStyle: "italic", color: "rgba(209,166,71,.9)" }}>P&acirc;tes gratin&eacute;es + 3 $ &middot; Ajout de meatballs + 5 $</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Tagliatelle &agrave; la carbonara</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>19&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>P&acirc;tes enrob&eacute;es d&apos;une sauce cr&eacute;meuse au parmesan et pancetta, relev&eacute;e de poivre noir concass&eacute; et garnies de persil frais</p>
          <p style={{ fontSize: 13, lineHeight: "1.7", fontStyle: "italic", color: "rgba(209,166,71,.9)" }}>P&acirc;tes gratin&eacute;es + 3 $</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Pizza Marguarita <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>19&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Sauce tomate maison, mozzarella fondante et feuilles de basilic frais. Le tout sur une p&acirc;te artisanale croustillante, cuite &agrave; la perfection. Simple, savoureuse et ind&eacute;modable</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Pizza Pepperoni</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>22&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Sauce tomate, pepperoni et mozzarella fondante</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Pizza Prosciutto</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>23&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Mozzarella fondante et fines tranches de prosciutto italien, rehauss&eacute;es de roquette fra&icirc;che et d&apos;un filet d&apos;huile d&apos;olive</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(209,166,71,.28)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3", color: "#FBE275" }}>Pizza au Canard Confit</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#FBE275" }}>25&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.62)" }}>Canard confit, mozzarella, bacon fum&eacute;, oignons rouges r&ocirc;tis et coulis l&eacute;g&egrave;rement &eacute;pic&eacute;-sucr&eacute;</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Pizza Sp&eacute;cial Golf</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>25&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Sauce tomate, pepperoni, l&eacute;gumes grill&eacute;s, champignons, olives, mozzarella fondante</p>
        </a>
      </div>
    </section>

    <section id="cat-tacos" data-screen-label="Tacos" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>TACOS</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Tacos souples <span style={{ fontWeight: "400", color: "rgba(242,239,232,.6)" }}>(3)</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>16&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Choix de garniture : poulet grill&eacute;, porc effiloch&eacute; &agrave; la bi&egrave;re noire, poisson croustillant ou boeuf</p>
        </a>
      </div>
    </section>

    <section id="cat-grillades" data-screen-label="Grillades" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>GRILLADES &amp; PLATS CHAUDS</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Des plats r&eacute;confortants cuits &agrave; la perfection.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Fish and Chips</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>24&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Morue pan&eacute;e &agrave; la bi&egrave;re, frites maison, salade de chou, tartare maison</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Brochettes de poulet grill&eacute; <span style={{ fontWeight: "400", color: "rgba(242,239,232,.6)" }}>(2)</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>24&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Poulet marin&eacute; aux herbes, riz basmati, l&eacute;gumes croquants, sauce fines herbes</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Brochettes de crevettes chimichurri <span style={{ fontWeight: "400", color: "rgba(242,239,232,.6)" }}>(2)</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>29&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Crevettes grill&eacute;es, riz parfum&eacute;, l&eacute;gumes, sauce chimichurri</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Pav&eacute; de saumon</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>29&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Pav&eacute; de saumon grill&eacute; &agrave; l&apos;aneth et au citron, l&eacute;gumes grill&eacute;s et riz</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(209,166,71,.28)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3", color: "#FBE275" }}>C&ocirc;tes lev&eacute;es BBQ</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#FBE275" }}>29&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.62)" }}>C&ocirc;tes tendres, sauce BBQ maison, frites, l&eacute;gumes du moment</p>
          <p style={{ fontSize: 13, lineHeight: "1.7", fontStyle: "italic", color: "rgba(209,166,71,.9)" }}>Demi-c&ocirc;tes lev&eacute;es BBQ &mdash; 24 $</p>
        </a>
      </div>
    </section>

    <section id="cat-poke" data-screen-label="Pok\xE9 bowl" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>POK&Eacute; BOWL</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Frais, color&eacute; et personnalisable.</p>
      </div>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 760, padding: "clamp(24px,3vw,38px)", border: "1px solid rgba(209,166,71,.22)", borderRadius: 2, background: "linear-gradient(160deg,rgba(209,166,71,.07),rgba(209,166,71,0) 60%)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <h3 style={{ fontSize: 20, fontWeight: "600", lineHeight: "1.3" }}>Pok&eacute; Bowl du 1000</h3>
          <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
          <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 30, fontWeight: "600", lineHeight: "1", color: "#FBE275" }}>22&nbsp;$</span>
        </div>
        <p data-desc="1" style={{ fontSize: 14, lineHeight: "1.8", fontWeight: "300", color: "rgba(242,239,232,.66)" }}>Bol de riz Calrose garni de laitue printani&egrave;re, de l&eacute;gumes croquants, de morceaux d&apos;ananas, de nouilles asiatiques croustillantes et de graines de s&eacute;same. Le tout servi avec une sauce arachide onctueuse et une mayo &eacute;pic&eacute;e maison, pour un mariage parfait de fra&icirc;cheur, de textures et de saveurs.</p>
        <p style={{ fontSize: "13.5px", lineHeight: "1.7", fontStyle: "italic", color: "rgba(209,166,71,.95)" }}>Choix de prot&eacute;ine : poulet, crevettes, tofu ou saumon (+ 3 $)</p>
      </div>
    </section>

    <section id="cat-poutines" data-screen-label="Poutines" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>POUTINES GOURMANDES</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Un classique qu&eacute;b&eacute;cois revisit&eacute;.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Poutine classique <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>18&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Frites croustillantes, fromage en grains, sauce maison</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Poutine au porc effiloch&eacute;</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>21&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Frites, fromage en grain frais, sauce et porc effiloch&eacute;</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Poutine au poulet popcorn</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>21&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Frites, fromage en grain frais, sauce et poulet popcorn</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(209,166,71,.28)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3", color: "#FBE275" }}>Poutine signature au canard</h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#FBE275" }}>22&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.62)" }}>Frites croustillantes, fromage en grains, sauce riche au jus de canard, canard confit effiloch&eacute;, oignons caram&eacute;lis&eacute;s</p>
        </a>
      </div>
    </section>

    <section id="cat-desserts" data-screen-label="Desserts" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>DESSERTS</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Une touche sucr&eacute;e pour terminer en beaut&eacute;.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "clamp(20px,3vw,54px) clamp(34px,5vw,80px)" }}>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Dessert du moment <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>7&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Selon l&apos;inspiration du chef et les produits de saison</p>
        </a>
        <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 7, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: "600", lineHeight: "1.3" }}>Brownie <span data-diet="1" style={{ display: "inline-block", marginLeft: 4, padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#8FCB78", verticalAlign: "middle" }}>V&Eacute;G</span></h3>
            <span aria-hidden="true" style={{ flex: "1", minWidth: 18, height: 1, background: "repeating-linear-gradient(90deg,rgba(209,166,71,.34) 0 2px,rgba(209,166,71,0) 2px 6px)" }} />
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 25, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>9&nbsp;$</span>
          </div>
          <p data-desc="1" style={{ fontSize: "13.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.58)" }}>Brownie fondant au chocolat, accompagn&eacute; d&apos;une boule de cr&egrave;me glac&eacute;e onctueuse, pour une touche de fra&icirc;cheur et de gourmandise.</p>
        </a>
      </div>
    </section>

    <section id="cat-enfant" data-screen-label="Menu enfant" style={{ marginBottom: "clamp(60px,9vh,104px)", scrollMarginTop: 150 }}>
      <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "clamp(30px,4vh,44px)" }}>
        <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,.06))" }} />
        <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(30px,3.6vw,50px)", lineHeight: "1", letterSpacing: ".05em" }}>MENU ENFANT</h2>
        <p style={{ fontSize: 14, lineHeight: "1.7", fontStyle: "italic", fontWeight: "300", color: "rgba(242,239,232,.55)" }}>Chaque item inclut un jus.</p>
      </div>
      <a href={ORDERING_URL} target="_blank" rel="noopener noreferrer" data-menu-item="1" data-reveal="up" style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 16, maxWidth: 760, paddingBottom: 20, borderBottom: "1px solid rgba(242,239,232,.07)" }}>
        <p style={{ flex: "1", minWidth: 260, fontSize: 16, lineHeight: "1.7", fontWeight: "400" }}>Croquettes de poulet, spaghetti bolognaise, burger, poutine ou pogo et frites</p>
        <span style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: 28, fontWeight: "600", lineHeight: "1", color: "#D1A647" }}>7&nbsp;$</span>
      </a>
    </section>

    <div data-reveal="up" data-diet="1" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 28px", marginBottom: "clamp(60px,9vh,104px)", padding: "20px clamp(20px,3vw,32px)", border: "1px solid rgba(209,166,71,.32)", borderRadius: 2 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".18em", color: "rgba(242,239,232,.85)" }}><span style={{ padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontSize: 10, letterSpacing: ".12em", color: "#8FCB78" }}>V&Eacute;G</span> V&Eacute;G&Eacute;TARIEN</span>
      <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".18em", color: "rgba(242,239,232,.85)" }}><span style={{ padding: "2px 6px", border: "1px solid rgba(127,191,106,.5)", borderRadius: 2, fontSize: 10, letterSpacing: ".12em", color: "#8FCB78" }}>VG</span> V&Eacute;GAN</span>
      <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".18em", color: "rgba(242,239,232,.85)" }}><span style={{ padding: "2px 6px", border: "1px solid rgba(209,166,71,.5)", borderRadius: 2, fontSize: 10, letterSpacing: ".12em", color: "#D1A647" }}>SG</span> SANS GLUTEN</span>
      <span style={{ fontSize: "12.5px", lineHeight: "1.7", fontWeight: "300", color: "rgba(242,239,232,.45)" }}>Options disponibles sur demande &mdash; parlez-en &agrave; votre serveur.</span>
    </div>
  </div>


  </div>
  );
}
