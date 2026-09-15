import Image from "next/image";

export function HomeContent() {
  return (
    <div id="m1000-root" style={{ position: "relative", background: "#0D0E0E" }}><section id="hero" data-screen-label="Hero" style={{ position: "relative", height: "100svh", minHeight: 600, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div id="m1000-heroimg" style={{ position: "absolute", inset: "-22% 0", transform: "scale(1.06)", willChange: "transform" }}>
        <Image fill src="/images/image00009.jpeg" alt="Photo int\xE9rieure \u2014 bar central, bois et lumi\xE8re chaude (paysage, 2400px)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,14,14,.86) 0%,rgba(13,14,14,.32) 34%,rgba(13,14,14,.72) 72%,#0D0E0E 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "0", background: "radial-gradient(120% 80% at 50% 40%,rgba(173,111,35,.14) 0%,rgba(13,14,14,0) 60%)", pointerEvents: "none" }} />

      <div id="m1000-herotext" style={{ position: "relative", zIndex: "3", width: "100%", padding: "0 clamp(20px,5vw,80px) clamp(28px,6vh,80px)", willChange: "transform" }}>
        <div style={{ maxWidth: 940, display: "flex", flexDirection: "column", gap: "clamp(18px,2.4vw,30px)" }}>
          <h1 data-reveal="up" data-delay="120" style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "700", fontSize: "clamp(52px,7vw,112px)", lineHeight: ".94", letterSpacing: "-.005em", textTransform: "uppercase", color: "#FFFFFF" }}>
            Entrez dans<br />l&rsquo;univers <span style={{ background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 20%,#FBE275 48%,#ECD067 72%,#AB6D23 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>du 1000</span>
          </h1>
          <p data-reveal="up" data-delay="240" style={{ maxWidth: 560, fontSize: "clamp(17px,1.5vw,22px)", lineHeight: "1.7", fontWeight: "400", color: "#EFE9DC", textShadow: "0 1px 18px rgba(13,14,14,.85)" }}>Une adresse chaleureuse o&ugrave; cuisine, cocktails et moments partag&eacute;s se rencontrent.</p>
          <div data-reveal="up" data-delay="340" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(14px,1.6vw,26px)", marginTop: 10 }}>
            <a href="/menu" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 34px", borderRadius: 2, background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 22%,#FBE275 52%,#ECD067 74%,#AB6D23 100%)", color: "#160F04", fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "600", transition: "transform .5s cubic-bezier(.16,.84,.24,1),box-shadow .5s ease" }}>D&eacute;couvrir le menu</a>
            <a href="https://mylightspeed.app/IETTYUUN/C-ordering/menu" target="_blank" rel="noopener noreferrer" data-arrow="1" style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "17px 4px", fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#F2EFE8", borderBottom: "1px solid rgba(242,239,232,.24)" }}>Commande en ligne
              <span data-arrow-glyph="1" style={{ display: "inline-block", fontFamily: "Montserrat,sans-serif", color: "#FBE275", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <div id="m1000-scrollcue" style={{ position: "relative", zIndex: "3", flex: "none", alignSelf: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 30, transition: "opacity .6s ease" }}>
        <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 10, letterSpacing: ".36em", color: "rgba(242,239,232,.5)" }}>D&Eacute;FILER</span>
        <span style={{ position: "relative", display: "block", width: 1, height: 52, background: "rgba(242,239,232,.16)", overflow: "hidden" }}>
          <span style={{ position: "absolute", top: "0", left: "0", width: 1, height: 18, background: "#FBE275", animation: "m1kScroll 2.6s cubic-bezier(.5,0,.5,1) infinite" }} />
        </span>
      </div>
    </section>

      <section id="promo" data-screen-label="Promo quotidienne" style={{ position: "relative", padding: "clamp(70px,11vh,130px) clamp(20px,5vw,80px)", background: "#141210", overflow: "hidden", borderTop: "1px solid rgba(209,166,71,.22)", borderBottom: "1px solid rgba(209,166,71,.22)" }}>
        <span data-parallax="0.05" aria-hidden="true" style={{ position: "absolute", top: "-8%", left: "-3%", fontFamily: "Teko,Impact,sans-serif", fontWeight: "700", fontSize: "clamp(200px,30vw,520px)", lineHeight: ".8", color: "rgba(209,166,71,.05)", pointerEvents: "none", userSelect: "none" }}>PROMO</span>
        <div style={{ position: "relative", maxWidth: 1440, margin: "0 auto" }}>
          <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: "clamp(32px,5vh,54px)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".42em", color: "#D1A647" }}>
              <span aria-hidden="true" style={{ display: "block", width: "clamp(24px,4vw,54px)", height: 1, background: "linear-gradient(90deg,rgba(173,111,35,0),#D1A647)" }} />
              SEPT JOURS, SEPT RAISONS
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: "clamp(34px,4.8vw,72px)", lineHeight: "1", letterSpacing: ".04em", background: "linear-gradient(100deg,#FBE275,#D1A647 55%,#AD6F23)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>PROMO QUOTIDIENNE</h2>
          </div>

          <div id="m1000-promotop" style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: "clamp(20px,3vw,44px)", alignItems: "stretch", marginBottom: "clamp(28px,4vh,48px)" }}>
            <a href="/menu#mn-promo" data-reveal="up" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, padding: "clamp(26px,3.4vw,44px)", border: "1px solid rgba(209,166,71,.5)", borderRadius: 2, background: "linear-gradient(140deg,rgba(209,166,71,.22),rgba(20,18,16,.4) 70%)", transition: "border-color .5s ease,background .5s ease" }}>
              <span id="m1000-todaylabel" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".3em", color: "#FBE275" }}>AUJOURD&apos;HUI</span>
              <span id="m1000-todaytext" style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(30px,3.8vw,58px)", lineHeight: "1.02", textTransform: "uppercase", color: "#F2EFE8" }}>La promo du jour vous attend</span>
              <span aria-hidden="true" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".24em", color: "rgba(251,226,117,.85)" }}>VOIR TOUTE LA SEMAINE &rarr;</span>
            </a>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div data-reveal="up" data-delay="60" style={{ display: "flex", flexDirection: "column", gap: 5, padding: "16px 20px", border: "1px solid rgba(209,166,71,.28)", borderRadius: 2, background: "rgba(13,14,14,.5)" }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".24em", color: "#D1A647" }}>AVANT 16 H</span>
                <span style={{ fontSize: 15, fontWeight: "400", color: "rgba(242,239,232,.9)" }}>Nachos &agrave; 12 $</span>
              </div>
              <div data-reveal="up" data-delay="120" style={{ display: "flex", flexDirection: "column", gap: 5, padding: "16px 20px", border: "1px solid rgba(209,166,71,.28)", borderRadius: 2, background: "rgba(13,14,14,.5)" }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".24em", color: "#D1A647" }}>HAPPY HOUR &middot; 16 H &ndash; 19 H</span>
                <span style={{ fontSize: 15, fontWeight: "400", color: "rgba(242,239,232,.9)" }}>Bi&egrave;re 20 oz &agrave; 7 $ &middot; Martini &agrave; 10 $</span>
              </div>
              <div data-reveal="up" data-delay="180" style={{ display: "flex", flexDirection: "column", gap: 5, padding: "16px 20px", border: "1px solid rgba(209,166,71,.28)", borderRadius: 2, background: "rgba(13,14,14,.5)" }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".24em", color: "#D1A647" }}>BI&Egrave;RE LANDSHARK</span>
                <span style={{ fontSize: 15, fontWeight: "400", color: "rgba(242,239,232,.9)" }}>5 pour 35 $, en tout temps</span>
              </div>
            </div>
          </div>

          <div id="m1000-promodays" style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 10 }}>
            <div data-day="1" data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 16px", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.42)", transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "#D1A647" }}>LUNDI</span>
              <span style={{ fontSize: "13.5px", lineHeight: "1.6", fontWeight: "300", color: "rgba(242,239,232,.72)" }}>Tacos 4 $ &middot; vin &minus;50 %</span>
            </div>
            <div data-day="2" data-reveal="up" data-delay="50" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 16px", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.42)", transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "#D1A647" }}>MARDI</span>
              <span style={{ fontSize: "13.5px", lineHeight: "1.6", fontWeight: "300", color: "rgba(242,239,232,.72)" }}>Ailes de poulet &minus;50 %</span>
            </div>
            <div data-day="3" data-reveal="up" data-delay="100" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 16px", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.42)", transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "#D1A647" }}>MERCREDI</span>
              <span style={{ fontSize: "13.5px", lineHeight: "1.6", fontWeight: "300", color: "rgba(242,239,232,.72)" }}>Steak frites 30 $</span>
            </div>
            <div data-day="4" data-reveal="up" data-delay="150" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 16px", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.42)", transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "#D1A647" }}>JEUDI</span>
              <span style={{ fontSize: "13.5px", lineHeight: "1.6", fontWeight: "300", color: "rgba(242,239,232,.72)" }}>Burger jalape&ntilde;os 10 $</span>
            </div>
            <div data-day="5" data-reveal="up" data-delay="200" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 16px", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.42)", transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "#D1A647" }}>VENDREDI</span>
              <span style={{ fontSize: "13.5px", lineHeight: "1.6", fontWeight: "300", color: "rgba(242,239,232,.72)" }}>Double ton fort</span>
            </div>
            <div data-day="6" data-reveal="up" data-delay="250" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 16px", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.42)", transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "#D1A647" }}>SAMEDI</span>
              <span style={{ fontSize: "13.5px", lineHeight: "1.6", fontWeight: "300", color: "rgba(242,239,232,.72)" }}>Bouteille 26 oz 75 $</span>
            </div>
            <div data-day="0" data-reveal="up" data-delay="300" style={{ display: "flex", flexDirection: "column", gap: 8, padding: "18px 16px", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.42)", transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".16em", color: "#D1A647" }}>DIMANCHE</span>
              <span style={{ fontSize: "13.5px", lineHeight: "1.6", fontWeight: "300", color: "rgba(242,239,232,.72)" }}>Steak frites 30 $</span>
            </div>
          </div>
        </div>
      </section>

      <section id="intro" data-screen-label="Introduction" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#0D0E0E", overflow: "hidden" }}>
        <span data-parallax="0.06" aria-hidden="true" style={{ position: "absolute", top: "6%", right: "-2%", fontFamily: "Teko,Impact,sans-serif", fontWeight: "700", fontSize: "clamp(220px,34vw,560px)", lineHeight: ".8", color: "rgba(242,239,232,.028)", pointerEvents: "none", userSelect: "none" }}>1000</span>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "clamp(24px,3vw,48px)", maxWidth: 1440, margin: "0 auto" }}>
          <div id="m1000-intro-text" style={{ gridColumn: "1 / span 5", display: "flex", flexDirection: "column", gap: "clamp(18px,2vw,28px)", alignSelf: "center" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>BIENVENUE AU 1000</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(46px,6.4vw,104px)", lineHeight: ".94", textTransform: "uppercase", color: "#FFFFFF" }}>Bien plus<br />qu&rsquo;un resto bar</h2>
            <div data-reveal="up" data-delay="160" style={{ width: 74, height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,0))" }} />
            <p data-reveal="up" data-delay="220" style={{ maxWidth: 440, fontSize: "clamp(15px,1.15vw,17px)", lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.72)" }}>Le 1000 est une adresse pens&eacute;e pour se retrouver, savourer et profiter du moment dans une atmosph&egrave;re contemporaine, chaleureuse et conviviale.</p>
            <a href="/a-propos" data-arrow="1" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 8, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#FBE275" }}>D&eacute;couvrir Le 1000
              <span data-arrow-glyph="1" style={{ display: "inline-block", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
            </a>
          </div>
          <div id="m1000-intro-media" style={{ gridColumn: "7 / span 6", position: "relative" }}>
            <div data-reveal="mask" style={{ position: "relative", width: "100%", aspectRatio: "4 / 5", overflow: "hidden" }}>
              <Image fill src="/images/image00010.jpeg" alt="Vue d\u2019ensemble de la salle (portrait 4:5)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div data-reveal="mask" data-delay="220" data-parallax="-0.05" id="m1000-intro-detail" style={{ position: "absolute", left: "-14%", bottom: "-9%", width: "46%", aspectRatio: "1 / 1", overflow: "hidden", border: "1px solid rgba(242,239,232,.07)", boxShadow: "0 30px 80px rgba(0,0,0,.55)" }}>
              <Image fill src="/images/image00015.jpeg" alt="D\xE9tail \u2014 bois, verres ou plante suspendue (carr\xE9)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section id="experience" data-screen-label="Exp\xE9rience" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", overflow: "hidden", background: "#0D0E0E" }}>
        <div id="m1000-expimg" style={{ position: "absolute", inset: "-24% 0", willChange: "transform" }}>
          <Image fill src="/images/image00011.jpeg" alt="Grande photo du bar central en soir\xE9e (paysage, 2400px)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg,rgba(13,14,14,.92) 0%,rgba(13,14,14,.66) 45%,rgba(13,14,14,.34) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,#0D0E0E 0%,rgba(13,14,14,0) 18%,rgba(13,14,14,0) 82%,#0D0E0E 100%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: "3", width: "100%", maxWidth: 1440, margin: "0 auto", padding: "clamp(90px,12vh,150px) clamp(20px,5vw,80px)" }}>
          <div style={{ maxWidth: 620, display: "flex", flexDirection: "column", gap: "clamp(18px,2vw,28px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>L&rsquo;EXP&Eacute;RIENCE</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(46px,7vw,116px)", lineHeight: ".94", textTransform: "uppercase", color: "#FFFFFF" }}>Une ambiance<br />qui se vit</h2>
            <p data-reveal="up" data-delay="200" style={{ maxWidth: 470, fontSize: "clamp(15px,1.15vw,17px)", lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.76)" }}>Du premier verre aux derniers instants de la soir&eacute;e, chaque d&eacute;tail participe &agrave; l&rsquo;atmosph&egrave;re du 1000.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(20px,4vw,56px)", marginTop: "clamp(46px,7vh,86px)" }}>
            <span data-reveal="up" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(28px,3.4vw,54px)", lineHeight: "1", textTransform: "uppercase", color: "#F2EFE8" }}>Savourer</span>
            <span aria-hidden="true" style={{ width: "clamp(24px,4vw,70px)", height: 1, background: "rgba(209,166,71,.5)" }} />
            <span data-reveal="up" data-delay="200" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(28px,3.4vw,54px)", lineHeight: "1", textTransform: "uppercase", color: "#F2EFE8" }}>Partager</span>
            <span aria-hidden="true" style={{ width: "clamp(24px,4vw,70px)", height: 1, background: "rgba(209,166,71,.5)" }} />
            <span data-reveal="up" data-delay="400" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(28px,3.4vw,54px)", lineHeight: "1", textTransform: "uppercase", background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 20%,#FBE275 48%,#ECD067 72%,#AB6D23 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Vibrer</span>
          </div>
        </div>
      </section>

      <section id="menu" data-screen-label="Aper\xE7u du menu" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#1A1A1A" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28, marginBottom: "clamp(44px,6vh,78px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>LE MENU</span>
              <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(42px,5.6vw,92px)", lineHeight: ".94", textTransform: "uppercase", color: "#FFFFFF" }}>Trois univers<br />&agrave; d&eacute;couvrir</h2>
            </div>
            <p data-reveal="up" data-delay="180" style={{ maxWidth: 340, fontSize: 14, lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.62)" }}>Une cuisine g&eacute;n&eacute;reuse, des cocktails travaill&eacute;s et des assiettes faites pour le partage.</p>
          </div>

          <div id="m1000-menugrid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "clamp(14px,1.6vw,26px)" }}>
            <a href="/menu" data-card="1" data-reveal="up" style={{ position: "relative", display: "block", aspectRatio: "3 / 4", overflow: "hidden", background: "#0D0E0E" }}>
              <div data-zoom="1" style={{ position: "absolute", inset: "0", transition: "transform 1.2s cubic-bezier(.16,.84,.24,1)" }}>
                <Image fill src="/images/image00004.jpeg" alt="Plat de cuisine (portrait 3:4)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,14,14,.1) 30%,rgba(13,14,14,.88) 100%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: "auto 0 0 0", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, padding: "clamp(20px,2vw,32px)", pointerEvents: "none" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <h3 style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(28px,2.6vw,44px)", lineHeight: "1", textTransform: "uppercase", color: "#FFFFFF" }}>Cuisine</h3>
                  <p style={{ maxWidth: 230, fontSize: 13, lineHeight: "1.7", fontWeight: "300", color: "rgba(242,239,232,.7)" }}>Des assiettes franches et g&eacute;n&eacute;reuses, pr&eacute;par&eacute;es chaque jour.</p>
                </div>
                <span data-arrow-glyph="1" style={{ flex: "none", fontSize: 20, color: "#FBE275", transition: "transform .6s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
              </div>
            </a>
            <a href="/menu" data-card="1" data-reveal="up" data-delay="140" style={{ position: "relative", display: "block", aspectRatio: "3 / 4", overflow: "hidden", background: "#0D0E0E" }}>
              <div data-zoom="1" style={{ position: "absolute", inset: "0", transition: "transform 1.2s cubic-bezier(.16,.84,.24,1)" }}>
                <Image fill src="/images/image00019.jpeg" alt="Cocktails au bar (portrait 3:4)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,14,14,.1) 30%,rgba(13,14,14,.88) 100%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: "auto 0 0 0", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, padding: "clamp(20px,2vw,32px)", pointerEvents: "none" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <h3 style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(28px,2.6vw,44px)", lineHeight: "1", textTransform: "uppercase", color: "#FFFFFF" }}>Cocktails &amp; boissons</h3>
                  <p style={{ maxWidth: 230, fontSize: 13, lineHeight: "1.7", fontWeight: "300", color: "rgba(242,239,232,.7)" }}>Classiques revisit&eacute;s, bi&egrave;res locales et s&eacute;lection du bar.</p>
                </div>
                <span data-arrow-glyph="1" style={{ flex: "none", fontSize: 20, color: "#FBE275", transition: "transform .6s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
              </div>
            </a>

          </div>

          <div data-reveal="up" style={{ display: "flex", justifyContent: "center", marginTop: "clamp(40px,6vh,72px)" }}>
            <a href="/menu" style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "18px 40px", border: "1px solid rgba(209,166,71,.6)", borderRadius: 2, fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", fontWeight: "600", color: "#FBE275", transition: "background .55s ease,border-color .55s ease" }}>Voir tout le menu</a>
          </div>
        </div>
      </section>

      <section id="signature" data-screen-label="Signature" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#0D0E0E", overflow: "hidden" }}>
        <div id="m1000-siggrid" style={{ position: "relative", display: "grid", gridTemplateColumns: "7fr 5fr", gap: "clamp(28px,4vw,72px)", alignItems: "center", maxWidth: 1440, margin: "0 auto" }}>
          <div data-reveal="mask" style={{ position: "relative", aspectRatio: "5 / 4", overflow: "hidden" }}>
            <div data-parallax="-0.04" style={{ position: "absolute", inset: "-8%" }}>
              <Image fill src="/images/image00003.jpeg" alt="Gros plan du plat ou cocktail signature (paysage)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,1.8vw,26px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>SIGNATURE DU 1000</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(40px,5vw,84px)", lineHeight: ".96", textTransform: "uppercase", color: "#FFFFFF" }}>Les saveurs<br />du 1000</h2>
            <div data-reveal="up" data-delay="150" style={{ width: "100%", height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,0))" }} />
            <p data-reveal="up" data-delay="200" style={{ maxWidth: 420, fontSize: "clamp(15px,1.1vw,17px)", lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.74)" }}>Une cuisine g&eacute;n&eacute;reuse et r&eacute;confortante, pens&eacute;e pour accompagner les retrouvailles, les apr&egrave;s-golf et les haltes en motoneige.</p>
            <div data-reveal="up" data-delay="260" style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 6, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(242,239,232,.5)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 18, height: 1, background: "#AD6F23" }} />Des assiettes &agrave; savourer</span>
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 18, height: 1, background: "#AD6F23" }} />Des moments &agrave; partager</span>
            </div>
            <a href="https://mylightspeed.app/IETTYUUN/C-ordering/menu" target="_blank" rel="noopener noreferrer" data-arrow="1" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 14, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#FBE275" }}>Commande en ligne
              <span data-arrow-glyph="1" style={{ display: "inline-block", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section id="galerie" data-screen-label="Galerie" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#1A1A1A", overflow: "hidden" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: "clamp(40px,6vh,72px)" }}>
            <h2 data-reveal="up" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(42px,5.6vw,92px)", lineHeight: ".94", textTransform: "uppercase", color: "#FFFFFF" }}>L&rsquo;atmosph&egrave;re<br />du 1000</h2>
            <a href="https://www.instagram.com/le1000restobarrelais?stkn=dTk1bjJ1Y2lxenR0&utm_source=qr&fbclid=IwY2xjawUQrxhwZG9mBWV4dG4DYWVtAjEwAGJyaWQRMXIxZ2NNbzU1U2ZKMkFDTGpzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe7D1YthexY4KSnjjkZbVVYFaIO2Mm8JRf923zjcaNJuAD8dTzUW9b7iw4r9o_aem_i5LsLEMRZEdBennxPAlHyw" target="_blank" rel="noopener noreferrer" data-arrow="1" data-reveal="up" data-delay="140" style={{ display: "inline-flex", alignItems: "center", gap: 12, paddingBottom: 8, borderBottom: "1px solid rgba(209,166,71,.4)", fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#FBE275" }}>Suivre Le 1000 sur Instagram
              <span data-arrow-glyph="1" style={{ display: "inline-block", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
            </a>
          </div>

          <div id="m1000-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "clamp(12px,1.4vw,22px)" }}>
            <div data-card="1" data-reveal="mask" data-parallax="-0.03" style={{ gridColumn: "1 / span 5", aspectRatio: "4 / 5", overflow: "hidden", background: "#0D0E0E" }}>
              <div data-zoom="1" style={{ position: "relative", height: "100%", transition: "transform 1.4s cubic-bezier(.16,.84,.24,1)" }}><Image fill src="/images/image00021.jpeg" alt="Le bar central (portrait)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
            <div data-card="1" data-reveal="mask" data-delay="120" data-parallax="0.05" style={{ gridColumn: "6 / span 7", aspectRatio: "16 / 10", overflow: "hidden", background: "#0D0E0E", alignSelf: "end" }}>
              <div data-zoom="1" style={{ position: "relative", height: "100%", transition: "transform 1.4s cubic-bezier(.16,.84,.24,1)" }}><Image fill src="/images/image00012.jpeg" alt="Salle en soir\xE9e (paysage)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
            <div data-card="1" data-reveal="mask" data-delay="80" data-parallax="0.04" style={{ gridColumn: "2 / span 4", aspectRatio: "1 / 1", overflow: "hidden", background: "#0D0E0E", marginTop: "clamp(-40px,-4vw,0px)" }}>
              <div data-zoom="1" style={{ position: "relative", height: "100%", transition: "transform 1.4s cubic-bezier(.16,.84,.24,1)" }}><Image fill src="/images/image00168.jpeg" alt="D\xE9tail du d\xE9cor \u2014 plante ou luminaire (carr\xE9)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
            <div data-card="1" data-reveal="mask" data-delay="200" data-parallax="-0.04" style={{ gridColumn: "6 / span 3", aspectRatio: "3 / 4", overflow: "hidden", background: "#0D0E0E" }}>
              <div data-zoom="1" style={{ position: "relative", height: "100%", transition: "transform 1.4s cubic-bezier(.16,.84,.24,1)" }}><Image fill src="/images/image00007.jpeg" alt="Cocktail (portrait)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
            <div data-card="1" data-reveal="mask" data-delay="280" data-parallax="0.03" style={{ gridColumn: "9 / span 4", aspectRatio: "4 / 3", overflow: "hidden", background: "#0D0E0E", alignSelf: "center" }}>
              <div data-zoom="1" style={{ position: "relative", height: "100%", transition: "transform 1.4s cubic-bezier(.16,.84,.24,1)" }}><Image fill src="/images/image00175.jpeg" alt="Moment de convivialit\xE9 (paysage)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
          </div>
        </div>
      </section>

      <section id="histoire" data-screen-label="Notre histoire" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#0D0E0E" }}>
        <div id="m1000-histgrid" style={{ display: "grid", gridTemplateColumns: "5fr 6fr", gap: "clamp(28px,5vw,90px)", alignItems: "center", maxWidth: 1320, margin: "0 auto" }}>
          <div data-reveal="mask" style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
            <Image fill src="/images/image00014.jpeg" alt="Photo humaine \u2014 service ou \xE9quipe derri\xE8re le bar (carr\xE9)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,1.8vw,26px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>NOTRE HISTOIRE</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(40px,5.2vw,88px)", lineHeight: ".96", textTransform: "uppercase", color: "#FFFFFF" }}>Une adresse faite<br />pour se retrouver</h2>
            <p data-reveal="up" data-delay="180" style={{ maxWidth: 480, fontSize: "clamp(15px,1.1vw,17px)", lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.74)" }}>Install&eacute; sur le site du Golf Marthelinois, Le 1000 est un v&eacute;ritable point de rencontre. &Eacute;t&eacute; comme hiver, on y vient apr&egrave;s une partie de golf, une randonn&eacute;e en motoneige ou simplement pour profiter d&rsquo;une ambiance chaleureuse et festive.</p>
            <a href="/a-propos" data-arrow="1" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 8, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#FBE275" }}>D&eacute;couvrir Le 1000
              <span data-arrow-glyph="1" style={{ display: "inline-block", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section id="infos" data-screen-label="Informations pratiques" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#25292D" }}>
        <div id="m1000-infogrid" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "clamp(30px,4vw,70px)", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px,2.4vw,34px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>NOUS TROUVER</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(40px,5vw,80px)", lineHeight: ".96", textTransform: "uppercase", color: "#FFFFFF" }}>Passez<br />nous voir</h2>
            <div data-reveal="up" data-delay="160" style={{ display: "flex", flexDirection: "column", gap: 26, paddingTop: 8 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".34em", color: "rgba(242,239,232,.45)" }}>ADRESSE</span>
                <span style={{ fontSize: 15, lineHeight: "1.7", fontWeight: "300", color: "#F2EFE8" }}>1000 Mnt Sainte-Marthe<br />Trois-Rivi&egrave;res, QC G8V 2P7</span>
              </div>
              <div style={{ height: 1, background: "rgba(242,239,232,.09)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".34em", color: "rgba(242,239,232,.45)" }}>T&Eacute;L&Eacute;PHONE</span>
                <a href="tel:+18196971214" style={{ fontSize: 15, fontWeight: "400", color: "#FBE275" }}>819-697-1214</a>
              </div>
              <div style={{ height: 1, background: "rgba(242,239,232,.09)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".34em", color: "rgba(242,239,232,.45)" }}>COURRIEL</span>
                <a href="mailto:info@le1000resto.com" style={{ fontSize: 15, fontWeight: "400", color: "#FBE275" }}>info@le1000resto.com</a>
              </div>
              <div style={{ height: 1, background: "rgba(242,239,232,.09)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".34em", color: "rgba(242,239,232,.45)" }}>HORAIRES</span>
                <p style={{ maxWidth: 300, fontSize: 14, lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.78)" }}>Nos heures peuvent varier selon la saison. Appelez-nous avant de vous d&eacute;placer.</p>
              </div>
              <div style={{ height: 1, background: "rgba(242,239,232,.09)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".34em", color: "rgba(242,239,232,.45)" }}>R&Eacute;SEAUX SOCIAUX</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>
                  <a href="https://www.instagram.com/le1000restobarrelais?stkn=dTk1bjJ1Y2lxenR0&utm_source=qr&fbclid=IwY2xjawUQrxhwZG9mBWV4dG4DYWVtAjEwAGJyaWQRMXIxZ2NNbzU1U2ZKMkFDTGpzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe7D1YthexY4KSnjjkZbVVYFaIO2Mm8JRf923zjcaNJuAD8dTzUW9b7iw4r9o_aem_i5LsLEMRZEdBennxPAlHyw" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="https://www.facebook.com/profile.php?id=61576957533585&locale=fr_FR" target="_blank" rel="noopener noreferrer">Facebook</a>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 6 }}>
              <a href="https://www.google.com/maps/search/?api=1&query=1000%20Mont%C3%A9e%20Sainte-Marthe%2C%20Trois-Rivi%C3%A8res%2C%20QC%20G8V%202P7" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 30px", borderRadius: 2, background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 22%,#FBE275 52%,#ECD067 74%,#AB6D23 100%)", color: "#160F04", fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "600", transition: "transform .5s cubic-bezier(.16,.84,.24,1)" }}>Obtenir l&rsquo;itin&eacute;raire</a>
              <a href="tel:+18196971214" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 30px", border: "1px solid rgba(242,239,232,.24)", borderRadius: 2, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#F2EFE8", transition: "border-color .5s ease,color .5s ease" }}>Appeler Le 1000</a>
            </div>
          </div>

          <div data-reveal="mask" style={{ position: "relative", minHeight: "clamp(340px,52vh,620px)", border: "1px solid rgba(242,239,232,.08)", background: "#15191C", overflow: "hidden" }}>
            <iframe title="Carte Google Maps du 1000 Resto Bar Relais" src="https://www.google.com/maps?q=1000%20Mnt%20Sainte-Marthe%2C%20Trois-Rivi%C3%A8res%2C%20QC%20G8V%202P7&output=embed" width="100%" height="100%" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", border: "0", filter: "grayscale(.2) contrast(1.05) saturate(.8)" }} />
          </div>
        </div>
      </section>

    </div>
  );
}
