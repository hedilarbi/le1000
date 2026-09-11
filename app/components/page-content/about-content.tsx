import Image from "next/image";

export function AboutContent() {
  return (
    <div id="ap-root" style={{ position: "relative", background: "#0D0E0E" }}><section id="ap-hero" data-screen-label="Hero \xC0 propos" style={{ position: "relative", minHeight: "clamp(560px,86svh,900px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <div id="ap-heroimg" style={{ position: "absolute", inset: "-20% 0", transform: "scale(1.05)", willChange: "transform" }}>
        <Image fill src="/images/image00001.jpeg" alt="Photo d'ambiance \u2014 salle vide en fin de journ\xE9e, lumi\xE8re chaude (paysage, 2400px)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,14,14,.88) 0%,rgba(13,14,14,.42) 38%,rgba(13,14,14,.8) 76%,#0D0E0E 100%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: "3", width: "100%", maxWidth: 1440, margin: "0 auto", padding: "clamp(120px,18vh,200px) clamp(20px,5vw,80px) clamp(40px,7vh,90px)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,2.4vw,30px)", maxWidth: 900 }}>
          <span data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".42em", color: "#D1A647" }}>
            <span aria-hidden="true" style={{ display: "block", width: "clamp(24px,4vw,54px)", height: 1, background: "linear-gradient(90deg,rgba(173,111,35,0),#D1A647)" }} />
            &Agrave; PROPOS
          </span>
          <h1 data-reveal="up" data-delay="120" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(50px,7.4vw,120px)", lineHeight: ".93", textTransform: "uppercase", color: "#FFFFFF" }}>Le relais de<br />ceux qui <span style={{ background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 20%,#FBE275 48%,#ECD067 72%,#AB6D23 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>s&apos;arr&ecirc;tent</span></h1>
          <p data-reveal="up" data-delay="240" style={{ maxWidth: 580, fontSize: "clamp(16px,1.4vw,20px)", lineHeight: "1.78", fontWeight: "300", color: "#EFE9DC" }}>Un resto bar, un point de rencontre, un endroit o&ugrave; l&apos;on entre pour un verre et o&ugrave; l&apos;on reste pour la soir&eacute;e.</p>
        </div>
      </div>
    </section>

      <section id="ap-histoire" data-screen-label="Notre histoire" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#0D0E0E", overflow: "hidden" }}>
        <span data-parallax="0.06" aria-hidden="true" style={{ position: "absolute", top: "4%", left: "-3%", fontFamily: "Teko,Impact,sans-serif", fontWeight: "700", fontSize: "clamp(200px,32vw,540px)", lineHeight: ".8", color: "rgba(242,239,232,.028)", pointerEvents: "none", userSelect: "none" }}>1000</span>
        <div id="ap-histgrid" style={{ position: "relative", display: "grid", gridTemplateColumns: "6fr 5fr", gap: "clamp(30px,5vw,90px)", alignItems: "center", maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,1.8vw,26px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>NOTRE HISTOIRE</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(42px,5.6vw,96px)", lineHeight: ".95", textTransform: "uppercase", color: "#FFFFFF" }}>N&eacute;e d&apos;une envie<br />simple</h2>
            <div data-reveal="up" data-delay="150" style={{ width: 74, height: 1, background: "linear-gradient(90deg,#D1A647,rgba(209,166,71,0))" }} />
            <p data-reveal="up" data-delay="200" style={{ maxWidth: 520, fontSize: "clamp(15px,1.15vw,17.5px)", lineHeight: "1.9", fontWeight: "300", color: "rgba(242,239,232,.78)" }}>Sur le site du Golf Marthelinois, Le 1000 est n&eacute; d&rsquo;une envie simple : cr&eacute;er un lieu accueillant o&ugrave; l&rsquo;on prend plaisir &agrave; se retrouver autour d&rsquo;un bon repas ou d&rsquo;un verre.</p>
            <p data-reveal="up" data-delay="260" style={{ maxWidth: 520, fontSize: "clamp(15px,1.15vw,17.5px)", lineHeight: "1.9", fontWeight: "300", color: "rgba(242,239,232,.62)" }}>La saison change, mais l&rsquo;esprit reste le m&ecirc;me. Apr&egrave;s une partie de golf en &eacute;t&eacute; ou une randonn&eacute;e en motoneige en hiver, notre &eacute;quipe vous re&ccedil;oit dans une ambiance chaleureuse et festive.</p>
            <div data-reveal="up" data-delay="320" style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 14 }}>
              <span aria-hidden="true" style={{ width: 40, height: 1, background: "rgba(209,166,71,.55)" }} />
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".3em", color: "rgba(242,239,232,.55)" }}>L&rsquo;&Eacute;QUIPE DU 1000</span>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div data-reveal="mask" style={{ position: "relative", width: "100%", aspectRatio: "4 / 5", overflow: "hidden" }}>
              <div data-parallax="-0.03" style={{ position: "absolute", inset: "-6%" }}>
                <Image fill src="/images/image00016.jpeg" alt="Photo humaine \u2014 propri\xE9taire ou \xE9quipe au bar (portrait 4:5)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <div id="ap-hist-detail" data-reveal="up" data-delay="220" style={{ position: "absolute", left: "-12%", bottom: "-8%", width: "62%", display: "flex", flexDirection: "column", gap: 8, padding: "22px 24px", background: "#141210", border: "1px solid rgba(209,166,71,.35)", borderRadius: 2, boxShadow: "0 30px 80px rgba(0,0,0,.55)" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".32em", color: "#D1A647" }}>OUVERT</span>
              <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(34px,3.6vw,52px)", lineHeight: "1", color: "#F2EFE8" }}>&Eacute;T&Eacute; COMME HIVER</span>
            </div>
          </div>
        </div>
      </section>

      <section id="ap-valeurs" data-screen-label="Philosophie" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#1A1A1A" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 28, marginBottom: "clamp(44px,6vh,80px)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>CE QUI NOUS GUIDE</span>
              <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(42px,5.6vw,92px)", lineHeight: ".94", textTransform: "uppercase", color: "#FFFFFF" }}>Trois r&egrave;gles<br />de la maison</h2>
            </div>
            <p data-reveal="up" data-delay="180" style={{ maxWidth: 330, fontSize: 14, lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.6)" }}>Rien de compliqu&eacute;. On sert ce qu&apos;on aime manger, on le sert bien, et on prend le temps.</p>
          </div>
          <div id="ap-values" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(14px,1.6vw,26px)" }}>
            <div data-reveal="up" style={{ display: "flex", flexDirection: "column", gap: 14, padding: "clamp(26px,2.6vw,40px)", background: "rgba(13,14,14,.5)", border: "1px solid rgba(242,239,232,.08)", borderRadius: 2, transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".3em", color: "rgba(209,166,71,.75)" }}>01</span>
              <h3 style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(28px,2.8vw,44px)", lineHeight: "1", textTransform: "uppercase", color: "#FFFFFF" }}>G&eacute;n&eacute;reux<br />d&apos;abord</h3>
              <p style={{ fontSize: 14, lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.68)" }}>Des assiettes franches, des portions qui rassasient, des prix qui restent honn&ecirc;tes.</p>
            </div>
            <div data-reveal="up" data-delay="140" style={{ display: "flex", flexDirection: "column", gap: 14, padding: "clamp(26px,2.6vw,40px)", background: "rgba(13,14,14,.5)", border: "1px solid rgba(242,239,232,.08)", borderRadius: 2, transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".3em", color: "rgba(209,166,71,.75)" }}>02</span>
              <h3 style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(28px,2.8vw,44px)", lineHeight: "1", textTransform: "uppercase", color: "#FFFFFF" }}>Le service<br />avant tout</h3>
              <p style={{ fontSize: 14, lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.68)" }}>On conna&icirc;t nos habitu&eacute;s par leur nom et on accueille les nouveaux comme tels.</p>
            </div>
            <div data-reveal="up" data-delay="280" style={{ display: "flex", flexDirection: "column", gap: 14, padding: "clamp(26px,2.6vw,40px)", background: "rgba(13,14,14,.5)", border: "1px solid rgba(242,239,232,.08)", borderRadius: 2, transition: "border-color .5s ease,background .5s ease" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".3em", color: "rgba(209,166,71,.75)" }}>03</span>
              <h3 style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(28px,2.8vw,44px)", lineHeight: "1", textTransform: "uppercase", color: "#FFFFFF" }}>Une raison<br />chaque jour</h3>
              <p style={{ fontSize: 14, lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.68)" }}>Sept promos, sept jours : il y a toujours un pr&eacute;texte pour passer au 1000.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="ap-lieu" data-screen-label="Le lieu" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", overflow: "hidden", background: "#0D0E0E" }}>
        <div id="ap-lieuimg" style={{ position: "absolute", inset: "-24% 0", willChange: "transform" }}>
          <Image fill src="/images/image00003.jpeg" alt="Grande photo du lieu \u2014 bar central en soir\xE9e (paysage, 2400px)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: "0", background: "linear-gradient(90deg,rgba(13,14,14,.93) 0%,rgba(13,14,14,.64) 48%,rgba(13,14,14,.3) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,#0D0E0E 0%,rgba(13,14,14,0) 18%,rgba(13,14,14,0) 82%,#0D0E0E 100%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: "3", width: "100%", maxWidth: 1440, margin: "0 auto", padding: "clamp(90px,12vh,150px) clamp(20px,5vw,80px)" }}>
          <div style={{ maxWidth: 620, display: "flex", flexDirection: "column", gap: "clamp(18px,2vw,28px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>LE LIEU</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(44px,6.6vw,110px)", lineHeight: ".94", textTransform: "uppercase", color: "#FFFFFF" }}>Bois, laiton<br />et lumi&egrave;re basse</h2>
            <p data-reveal="up" data-delay="200" style={{ maxWidth: 480, fontSize: "clamp(15px,1.15vw,17px)", lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.78)" }}>Un bar central en bois massif, des banquettes profondes et un &eacute;clairage pens&eacute; pour la fin de soir&eacute;e. Assez grand pour un party, assez intime pour un souper &agrave; deux.</p>
          </div>
          <div id="ap-stats" data-reveal="up" data-delay="280" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(18px,2.4vw,40px)", marginTop: "clamp(46px,7vh,86px)", maxWidth: 900 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(34px,3.6vw,56px)", lineHeight: "1", color: "#FBE275" }}>4</span>
              <span style={{ fontSize: "11.5px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(242,239,232,.55)" }}>Saisons pour en profiter</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(34px,3.6vw,56px)", lineHeight: "1", color: "#FBE275" }}>2</span>
              <span style={{ fontSize: "11.5px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(242,239,232,.55)" }}>Passions : golf et motoneige</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(34px,3.6vw,56px)", lineHeight: "1", color: "#FBE275" }}>7</span>
              <span style={{ fontSize: "11.5px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(242,239,232,.55)" }}>Promos par semaine</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(34px,3.6vw,56px)", lineHeight: "1", color: "#FBE275" }}>1000</span>
              <span style={{ fontSize: "11.5px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(242,239,232,.55)" }}>Bonnes raisons de revenir</span>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <section id="ap-equipe" data-screen-label="L'\xE9quipe" style={{ position: "relative", padding: "clamp(90px,14vh,180px) clamp(20px,5vw,80px)", background: "#25292D", overflow: "hidden" }}>
        <div id="ap-teamgrid" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "clamp(30px,4vw,80px)", alignItems: "center", maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,1.8vw,26px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>L&apos;&Eacute;QUIPE</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(40px,5.2vw,88px)", lineHeight: ".96", textTransform: "uppercase", color: "#FFFFFF" }}>Derri&egrave;re<br />le bar</h2>
            <p data-reveal="up" data-delay="180" style={{ maxWidth: 430, fontSize: "clamp(15px,1.1vw,17px)", lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.76)" }}>En cuisine, derri&egrave;re le bar et en salle, toute notre &eacute;quipe partage le m&ecirc;me plaisir : vous servir avec attention et vous faire sentir ici comme chez vous.</p>
            <div data-reveal="up" data-delay="240" style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingBottom: 16, borderBottom: "1px solid rgba(242,239,232,.1)" }}>
                <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(22px,2vw,30px)", lineHeight: "1.1", textTransform: "uppercase", color: "#F2EFE8" }}>Notre brigade</span>
                <span style={{ fontSize: "11.5px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(209,166,71,.85)" }}>Cuisine</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingBottom: 16, borderBottom: "1px solid rgba(242,239,232,.1)" }}>
                <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(22px,2vw,30px)", lineHeight: "1.1", textTransform: "uppercase", color: "#F2EFE8" }}>Notre &eacute;quipe du bar</span>
                <span style={{ fontSize: "11.5px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(209,166,71,.85)" }}>Bar &amp; cocktails</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(22px,2vw,30px)", lineHeight: "1.1", textTransform: "uppercase", color: "#F2EFE8" }}>Notre &eacute;quipe en salle</span>
                <span style={{ fontSize: "11.5px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(209,166,71,.85)" }}>Salle &amp; accueil</span>
              </div>
            </div>
          </div>
          <div id="ap-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "clamp(12px,1.4vw,20px)" }}>
            <div data-card="1" data-reveal="mask" data-parallax="-0.03" style={{ gridColumn: "1 / span 7", aspectRatio: "4 / 3", overflow: "hidden", background: "#0D0E0E" }}>
              <div data-zoom="1" style={{ position: "relative", height: "100%", transition: "transform 1.4s cubic-bezier(.16,.84,.24,1)" }}><Image fill src="/images/image00004.jpeg" alt="Barman au travail (paysage)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
            <div data-card="1" data-reveal="mask" data-delay="120" data-parallax="0.05" style={{ gridColumn: "8 / span 5", aspectRatio: "3 / 4", overflow: "hidden", background: "#0D0E0E", alignSelf: "end" }}>
              <div data-zoom="1" style={{ position: "relative", height: "100%", transition: "transform 1.4s cubic-bezier(.16,.84,.24,1)" }}><Image fill src="/images/image00005.jpeg" alt="Service en salle (portrait)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
            <div data-card="1" data-reveal="mask" data-delay="200" data-parallax="0.04" style={{ gridColumn: "2 / span 5", aspectRatio: "1 / 1", overflow: "hidden", background: "#0D0E0E", marginTop: "clamp(-32px,-3vw,0px)" }}>
              <div data-zoom="1" style={{ position: "relative", height: "100%", transition: "transform 1.4s cubic-bezier(.16,.84,.24,1)" }}><Image fill src="/images/image00006.jpeg" alt="D\xE9tail du d\xE9cor (carr\xE9)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} /></div>
            </div>
          </div>
        </div>
      </section> */}

      <section id="ap-cta-sec" data-screen-label="Invitation" style={{ position: "relative", padding: "clamp(90px,14vh,170px) clamp(20px,5vw,80px)", background: "#141210", borderTop: "1px solid rgba(209,166,71,.22)", overflow: "hidden" }}>
        <span data-parallax="0.05" aria-hidden="true" style={{ position: "absolute", bottom: "-16%", right: "-4%", fontFamily: "Teko,Impact,sans-serif", fontWeight: "700", fontSize: "clamp(190px,28vw,480px)", lineHeight: ".8", color: "rgba(209,166,71,.05)", pointerEvents: "none", userSelect: "none" }}>1000</span>
        <div id="ap-ctagrid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "clamp(28px,4vw,70px)", alignItems: "center", maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,1.8vw,26px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>ON VOUS ATTEND</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(42px,5.6vw,94px)", lineHeight: ".94", textTransform: "uppercase", color: "#FFFFFF" }}>La prochaine<br />tourn&eacute;e est<br />pour vous</h2>
          </div>
          <div data-reveal="up" data-delay="200" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <p style={{ fontSize: "clamp(15px,1.1vw,17px)", lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.74)" }}>Jetez un &oelig;il au menu, rep&eacute;rez la promo du jour, puis venez nous voir.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href="/menu" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 32px", borderRadius: 2, background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 22%,#FBE275 52%,#ECD067 74%,#AB6D23 100%)", color: "#160F04", fontSize: "11.5px", letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "600", transition: "transform .5s cubic-bezier(.16,.84,.24,1),box-shadow .5s ease" }}>Voir le menu</a>
              <a href="/contact" data-arrow="1" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 4px", fontSize: "11.5px", letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#F2EFE8", borderBottom: "1px solid rgba(242,239,232,.24)" }}>Nous trouver
                <span data-arrow-glyph="1" style={{ display: "inline-block", color: "#FBE275", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
