import Image from "next/image";

export function ContactContent() {
  return (
    <div id="ct-root" style={{ position: "relative", background: "#0D0E0E" }}><section id="ct-hero" data-screen-label="Hero Contact" style={{ position: "relative", minHeight: "clamp(460px,62svh,680px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
      <div id="ct-heroimg" style={{ position: "absolute", inset: "-20% 0", transform: "scale(1.05)", willChange: "transform" }}>
        <Image fill src="/images/image00007.jpeg" alt="Fa\xE7ade ou entr\xE9e du 1000 (paysage, 2400px)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: "0", background: "linear-gradient(180deg,rgba(13,14,14,.9) 0%,rgba(13,14,14,.5) 40%,rgba(13,14,14,.84) 78%,#0D0E0E 100%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: "3", width: "100%", maxWidth: 1440, margin: "0 auto", padding: "clamp(120px,18vh,190px) clamp(20px,5vw,80px) clamp(36px,6vh,72px)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2vw,26px)", maxWidth: 820 }}>
          <span data-reveal="up" style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".42em", color: "#D1A647" }}>
            <span aria-hidden="true" style={{ display: "block", width: "clamp(24px,4vw,54px)", height: 1, background: "linear-gradient(90deg,rgba(173,111,35,0),#D1A647)" }} />
            CONTACT
          </span>
          <h1 data-reveal="up" data-delay="120" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(48px,7vw,112px)", lineHeight: ".93", textTransform: "uppercase", color: "#FFFFFF" }}>&Eacute;crivez-nous,<br />on <span style={{ background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 20%,#FBE275 48%,#ECD067 72%,#AB6D23 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>r&eacute;pond</span></h1>
          <p data-reveal="up" data-delay="220" style={{ maxWidth: 520, fontSize: "clamp(16px,1.3vw,19px)", lineHeight: "1.78", fontWeight: "300", color: "#EFE9DC" }}>Une table pour ce soir, un party de bureau, une question sur le menu : le plus rapide reste le t&eacute;l&eacute;phone.</p>
        </div>
      </div>
    </section>

      <section id="ct-raisons" data-screen-label="Trois fa\xE7ons de nous joindre" style={{ position: "relative", padding: "clamp(52px,8vh,92px) clamp(20px,5vw,80px)", background: "#141210", borderBottom: "1px solid rgba(209,166,71,.2)" }}>
        <div id="ct-reasons" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(14px,1.6vw,26px)", maxWidth: 1400, margin: "0 auto" }}>
          <a href="tel:+18196971214" data-reveal="up" data-arrow="1" style={{ display: "flex", flexDirection: "column", gap: 10, padding: "clamp(22px,2.4vw,34px)", border: "1px solid rgba(209,166,71,.45)", borderRadius: 2, background: "linear-gradient(140deg,rgba(209,166,71,.16),rgba(20,18,16,.4) 70%)", transition: "border-color .5s ease,background .5s ease" }}>
            <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".3em", color: "#D1A647" }}>R&Eacute;SERVER PAR T&Eacute;L&Eacute;PHONE</span>
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(26px,2.6vw,40px)", lineHeight: "1.05", textTransform: "uppercase", color: "#F2EFE8" }}>819-697-1214</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(251,226,117,.9)" }}>Appeler maintenant <span data-arrow-glyph="1" style={{ display: "inline-block", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span></span>
          </a>
          <a href="mailto:info@le1000resto.com" data-reveal="up" data-delay="120" data-arrow="1" style={{ display: "flex", flexDirection: "column", gap: 10, padding: "clamp(22px,2.4vw,34px)", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.5)", transition: "border-color .5s ease,background .5s ease" }}>
            <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".3em", color: "#D1A647" }}>PAR COURRIEL</span>
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(26px,2.6vw,40px)", lineHeight: "1.05", textTransform: "uppercase", color: "#F2EFE8" }}>info@le1000resto.com</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(251,226,117,.9)" }}>&Eacute;crire <span data-arrow-glyph="1" style={{ display: "inline-block", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span></span>
          </a>
          <a href="#ct-map" data-reveal="up" data-delay="240" data-arrow="1" style={{ display: "flex", flexDirection: "column", gap: 10, padding: "clamp(22px,2.4vw,34px)", border: "1px solid rgba(242,239,232,.1)", borderRadius: 2, background: "rgba(13,14,14,.5)", transition: "border-color .5s ease,background .5s ease" }}>
            <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".3em", color: "#D1A647" }}>SUR PLACE</span>
            <span style={{ fontFamily: "Teko,Impact,sans-serif", fontWeight: "600", fontSize: "clamp(26px,2.6vw,40px)", lineHeight: "1.05", textTransform: "uppercase", color: "#F2EFE8" }}>1000 Mnt Sainte-Marthe<br />Trois-Rivi&egrave;res, QC G8V 2P7</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(251,226,117,.9)" }}>Voir la carte <span data-arrow-glyph="1" style={{ display: "inline-block", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span></span>
          </a>
        </div>
      </section>

      <section id="ct-form" data-screen-label="Formulaire" style={{ position: "relative", padding: "clamp(80px,12vh,160px) clamp(20px,5vw,80px)", background: "#0D0E0E", overflow: "hidden" }}>
        <span data-parallax="0.06" aria-hidden="true" style={{ position: "absolute", top: "2%", right: "-3%", fontFamily: "Teko,Impact,sans-serif", fontWeight: "700", fontSize: "clamp(200px,32vw,540px)", lineHeight: ".8", color: "rgba(242,239,232,.028)", pointerEvents: "none", userSelect: "none" }}>1000</span>
        <div id="ct-maingrid" style={{ position: "relative", display: "grid", gridTemplateColumns: "6fr 5fr", gap: "clamp(34px,5vw,86px)", maxWidth: 1400, margin: "0 auto" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,2vw,28px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>UN MESSAGE</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(40px,5.2vw,84px)", lineHeight: ".95", textTransform: "uppercase", color: "#FFFFFF" }}>Dites-nous<br />tout</h2>
            <p data-reveal="up" data-delay="160" style={{ maxWidth: 460, fontSize: 15, lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.66)" }}>On r&eacute;pond en g&eacute;n&eacute;ral sous 24 h. Pour une r&eacute;servation le jour m&ecirc;me, appelez-nous plut&ocirc;t.</p>

            <form id="ct-contact-form" data-reveal="up" data-delay="220" style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 14, maxWidth: 640 }}>
              <div id="ct-formrow" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".3em", color: "rgba(242,239,232,.5)" }}>NOM</span>
                  <input type="text" name="nom" required placeholder="Votre nom" style={{ padding: "15px 16px", background: "rgba(13,14,14,.5)", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, color: "#F2EFE8", fontSize: "14.5px", fontWeight: "300", transition: "border-color .4s ease,background .4s ease" }} />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".3em", color: "rgba(242,239,232,.5)" }}>COURRIEL</span>
                  <input type="email" name="courriel" required placeholder="vous@exemple.com" style={{ padding: "15px 16px", background: "rgba(13,14,14,.5)", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, color: "#F2EFE8", fontSize: "14.5px", fontWeight: "300", transition: "border-color .4s ease,background .4s ease" }} />
                </label>
              </div>
              <label style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".3em", color: "rgba(242,239,232,.5)" }}>SUJET</span>
                <select name="sujet" style={{ padding: "15px 16px", background: "rgba(13,14,14,.5)", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, color: "#F2EFE8", fontSize: "14.5px", fontWeight: "300", transition: "border-color .4s ease,background .4s ease" }}>
                  <option>R&eacute;servation</option>
                  <option>Groupe ou &eacute;v&eacute;nement priv&eacute;</option>
                  <option>Question sur le menu</option>
                  <option>Emploi</option>
                  <option>Autre</option>
                </select>
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".3em", color: "rgba(242,239,232,.5)" }}>MESSAGE</span>
                <textarea name="message" rows={5} required placeholder="Date, nombre de personnes, ce dont vous avez besoin\u2026" style={{ padding: "15px 16px", background: "rgba(13,14,14,.5)", border: "1px solid rgba(242,239,232,.14)", borderRadius: 2, color: "#F2EFE8", fontSize: "14.5px", fontWeight: "300", lineHeight: "1.7", resize: "vertical", transition: "border-color .4s ease,background .4s ease" }} />
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, marginTop: 6 }}>
                <button type="submit" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 34px", border: "none", borderRadius: 2, background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 22%,#FBE275 52%,#ECD067 74%,#AB6D23 100%)", color: "#160F04", fontSize: "11.5px", letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "600", cursor: "pointer", transition: "transform .5s cubic-bezier(.16,.84,.24,1),box-shadow .5s ease" }}>Envoyer le message</button>
                <span id="ct-status" role="status" aria-live="polite" style={{ fontSize: 13, fontWeight: "300", color: "rgba(251,226,117,.9)", transition: "opacity .5s ease", opacity: "0" }} />
              </div>
              <p style={{ fontSize: "11.5px", lineHeight: "1.7", color: "rgba(242,239,232,.35)" }}>Pour une r&eacute;servation le jour m&ecirc;me, privil&eacute;giez un appel au 819-697-1214.</p>
            </form>
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "clamp(22px,2.6vw,34px)" }}>
            <div data-reveal="up" data-delay="120" style={{ display: "flex", flexDirection: "column", gap: 24, padding: "clamp(26px,2.8vw,40px)", background: "#25292D", border: "1px solid rgba(242,239,232,.08)", borderRadius: 2 }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".36em", color: "#D1A647" }}>COORDONN&Eacute;ES</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".32em", color: "rgba(242,239,232,.45)" }}>ADRESSE</span>
                <span style={{ fontSize: 15, lineHeight: "1.75", fontWeight: "300", color: "#F2EFE8" }}>1000 Mnt Sainte-Marthe<br />Trois-Rivi&egrave;res, QC G8V 2P7</span>
              </div>
              <div style={{ height: 1, background: "rgba(242,239,232,.09)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".32em", color: "rgba(242,239,232,.45)" }}>T&Eacute;L&Eacute;PHONE</span>
                <a href="tel:+18196971214" style={{ fontSize: 15, fontWeight: "400", color: "#FBE275" }}>819-697-1214</a>
              </div>
              <div style={{ height: 1, background: "rgba(242,239,232,.09)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".32em", color: "rgba(242,239,232,.45)" }}>COURRIEL</span>
                <a href="mailto:info@le1000resto.com" style={{ fontSize: 15, fontWeight: "400", color: "#FBE275" }}>info@le1000resto.com</a>
              </div>
              <div style={{ height: 1, background: "rgba(242,239,232,.09)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 11, letterSpacing: ".32em", color: "rgba(242,239,232,.45)" }}>R&Eacute;SEAUX SOCIAUX</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 22, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>
                  <a href="https://www.instagram.com/le1000restobarrelais?stkn=dTk1bjJ1Y2lxenR0&utm_source=qr&fbclid=IwY2xjawUQrxhwZG9mBWV4dG4DYWVtAjEwAGJyaWQRMXIxZ2NNbzU1U2ZKMkFDTGpzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe7D1YthexY4KSnjjkZbVVYFaIO2Mm8JRf923zjcaNJuAD8dTzUW9b7iw4r9o_aem_i5LsLEMRZEdBennxPAlHyw" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="https://www.facebook.com/profile.php?id=61576957533585&locale=fr_FR" target="_blank" rel="noopener noreferrer">Facebook</a>
                </div>
              </div>
            </div>

            <div data-reveal="up" data-delay="200" style={{ display: "flex", flexDirection: "column", gap: 16, padding: "clamp(26px,2.8vw,40px)", border: "1px solid rgba(209,166,71,.3)", borderRadius: 2, background: "#141210" }}>
              <span style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 12, letterSpacing: ".36em", color: "#D1A647" }}>HORAIRES</span>
              <p style={{ fontSize: "14.5px", lineHeight: "1.75", fontWeight: "300", color: "rgba(242,239,232,.8)" }}>Nos heures peuvent varier selon la saison. Appelez-nous avant de vous d&eacute;placer.</p>
              <div style={{ height: 1, background: "rgba(242,239,232,.09)" }} />
              <a href="tel:+18196971214" id="ct-open" style={{ fontSize: 13, fontWeight: "400", color: "#FBE275" }}>Confirmer les heures d&rsquo;ouverture</a>
            </div>
          </aside>
        </div>
      </section>

      <section id="ct-map" data-screen-label="Nous trouver" style={{ position: "relative", padding: "clamp(80px,12vh,160px) clamp(20px,5vw,80px)", background: "#1A1A1A" }}>
        <div id="ct-mapgrid" style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "clamp(28px,4vw,64px)", alignItems: "center", maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,1.8vw,24px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>NOUS TROUVER</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(38px,4.6vw,76px)", lineHeight: ".96", textTransform: "uppercase", color: "#FFFFFF" }}>&Agrave; deux pas<br />de chez vous</h2>
            <p data-reveal="up" data-delay="170" style={{ maxWidth: 400, fontSize: 15, lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.7)" }}>Retrouvez-nous sur le site du Golf Marthelinois. &Eacute;t&eacute; comme hiver, Le 1000 est facile &agrave; trouver et toujours heureux de vous accueillir.</p>
            <div data-reveal="up" data-delay="230" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 8 }}>
              <a href="https://www.google.com/maps/dir/?api=1&destination=1000%20Mnt%20Sainte-Marthe%2C%20Trois-Rivi%C3%A8res%2C%20QC%20G8V%202P7" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 30px", borderRadius: 2, background: "linear-gradient(180deg,#AD6F23 0%,#D1A647 22%,#FBE275 52%,#ECD067 74%,#AB6D23 100%)", color: "#160F04", fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "600", transition: "transform .5s cubic-bezier(.16,.84,.24,1)" }}>Obtenir l&apos;itin&eacute;raire</a>
              <a href="tel:+18196971214" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "17px 30px", border: "1px solid rgba(242,239,232,.24)", borderRadius: 2, fontSize: 11, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#F2EFE8", transition: "border-color .5s ease,color .5s ease" }}>Appeler Le 1000</a>
            </div>
          </div>
          <div data-reveal="mask" style={{ position: "relative", minHeight: "clamp(320px,52vh,560px)", border: "1px solid rgba(242,239,232,.08)", background: "#15191C", overflow: "hidden" }}>
            <iframe title="Carte Google Maps du 1000 Resto Bar Relais" src="https://www.google.com/maps?q=1000%20Mnt%20Sainte-Marthe%2C%20Trois-Rivi%C3%A8res%2C%20QC%20G8V%202P7&output=embed" width="100%" height="100%" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", border: "0", filter: "grayscale(.2) contrast(1.05) saturate(.8)" }} />
          </div>
        </div>
      </section>

      <section id="ct-event" data-screen-label="Groupes et \xE9v\xE9nements" style={{ position: "relative", padding: "clamp(80px,12vh,160px) clamp(20px,5vw,80px)", background: "#0D0E0E", overflow: "hidden" }}>
        <div id="ct-eventgrid" style={{ display: "grid", gridTemplateColumns: "6fr 5fr", gap: "clamp(28px,4vw,72px)", alignItems: "center", maxWidth: 1360, margin: "0 auto" }}>
          <div data-reveal="mask" style={{ position: "relative", aspectRatio: "16 / 11", overflow: "hidden" }}>
            <div data-parallax="-0.04" style={{ position: "absolute", inset: "-7%" }}>
              <Image fill src="/images/image00021.jpeg" alt="Grande table ou groupe en soir\xE9e (paysage)" loading="lazy" decoding="async" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,1.8vw,24px)" }}>
            <span data-reveal="up" style={{ fontFamily: "'Bebas Neue',Impact,sans-serif", fontSize: 13, letterSpacing: ".42em", color: "#D1A647" }}>GROUPES &amp; &Eacute;V&Eacute;NEMENTS</span>
            <h2 data-reveal="up" data-delay="100" style={{ fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(38px,4.8vw,78px)", lineHeight: ".96", textTransform: "uppercase", color: "#FFFFFF" }}>Votre party,<br />notre salle</h2>
            <p data-reveal="up" data-delay="170" style={{ maxWidth: 440, fontSize: 15, lineHeight: "1.85", fontWeight: "300", color: "rgba(242,239,232,.74)" }}>Anniversaires, 5 &agrave; 7 de bureau, soir&eacute;es de hockey : on organise le service, les bouch&eacute;es et les pichets. Dites-nous la date et le nombre.</p>
            <div data-reveal="up" data-delay="230" style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 6, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(242,239,232,.55)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 18, height: 1, background: "#AD6F23" }} />Petits et grands groupes bienvenus</span>
              <span style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ width: 18, height: 1, background: "#AD6F23" }} />Menus de groupe sur demande</span>
            </div>
            <a href="#ct-form" data-arrow="1" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 14, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase", fontWeight: "500", color: "#FBE275" }}>Faire une demande
              <span data-arrow-glyph="1" style={{ display: "inline-block", transition: "transform .55s cubic-bezier(.16,.84,.24,1)" }}>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <div id="ct-success-modal" role="dialog" aria-modal="true" aria-labelledby="ct-success-title" aria-describedby="ct-success-description" aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(13,14,14,.72)", backdropFilter: "blur(8px)", opacity: 0, pointerEvents: "none", transition: "opacity .3s ease" }}>
        <div style={{ position: "relative", width: "min(100%,430px)", padding: "clamp(30px,5vw,46px)", border: "1px solid rgba(209,166,71,.5)", borderRadius: 3, background: "linear-gradient(145deg,#25292D,#141210)", boxShadow: "0 24px 80px rgba(0,0,0,.55)", textAlign: "center", transform: "translateY(14px) scale(.98)", transition: "transform .3s ease" }}>
          <button id="ct-success-close" type="button" aria-label="Fermer la confirmation" style={{ position: "absolute", top: 12, right: 14, width: 34, height: 34, border: 0, background: "transparent", color: "rgba(242,239,232,.7)", fontSize: 25, lineHeight: "1", cursor: "pointer" }}>&times;</button>
          <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 54, height: 54, marginBottom: 20, border: "1px solid rgba(209,166,71,.65)", borderRadius: "50%", color: "#FBE275", fontSize: 25 }}>&#10003;</span>
          <h2 id="ct-success-title" style={{ margin: 0, fontFamily: "Teko,Impact,sans-serif", fontSize: "clamp(34px,6vw,48px)", lineHeight: 1, textTransform: "uppercase", color: "#FFFFFF" }}>Message envoy&eacute;</h2>
          <p id="ct-success-description" style={{ margin: "14px 0 24px", fontSize: 14, lineHeight: 1.7, fontWeight: "300", color: "rgba(242,239,232,.7)" }}>Merci de nous avoir &eacute;crit. Nous vous r&eacute;pondrons dans les plus brefs d&eacute;lais.</p>
          <button id="ct-success-confirm" type="button" style={{ padding: "14px 28px", border: 0, borderRadius: 2, background: "linear-gradient(180deg,#AD6F23,#FBE275 52%,#AB6D23)", color: "#160F04", fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", fontWeight: "700", cursor: "pointer" }}>Fermer</button>
        </div>
      </div>

    </div>
  );
}
