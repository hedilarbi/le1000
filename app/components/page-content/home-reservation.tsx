import { MAX_ONLINE_PARTY_SIZE, RESTAURANT_PHONE_DISPLAY, RESTAURANT_PHONE_LINK } from "@/app/lib/reservations/config";

import { PartySizeDropdown } from "../reservation/party-size-dropdown";
import { rs } from "../reservation/styles";

// Section « Réserver » de l'accueil : un formulaire GET qui ouvre la page de
// réservation avec la date et le nombre de personnes déjà choisis.
export function HomeReservation() {
  return (
    <section
      id="reserver"
      data-screen-label="Réservation"
      className="relative overflow-hidden border-y border-gold/20 bg-ink-soft px-[clamp(20px,5vw,80px)] py-[clamp(80px,12vh,150px)]"
    >
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-[clamp(30px,5vw,80px)] lg:grid-cols-[5fr_6fr]">
        <div className="flex flex-col gap-[clamp(18px,2vw,28px)]">
          <span data-reveal="up" className={rs.eyebrow}>
            RÉSERVATION
          </span>
          <h2 data-reveal="up" data-delay="100" className="font-display text-[clamp(40px,5.2vw,84px)] uppercase leading-[.95] text-white">
            Réservez
            <br />
            <span className="text-gold-gradient">vos places</span>
          </h2>
          <p data-reveal="up" data-delay="160" className="max-w-[460px] text-[15px] font-light leading-[1.85] text-ivory/70">
            Bar, terrasse ou salle à manger : choisissez votre place en quelques clics, la confirmation arrive aussitôt par courriel.
            Pour {MAX_ONLINE_PARTY_SIZE + 1} personnes et plus, appelez-nous au{" "}
            <a href={RESTAURANT_PHONE_LINK} className="text-gold-bright">
              {RESTAURANT_PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>

        <form
          action="/reservation"
          method="get"
          data-reveal="up"
          data-delay="220"
          className="grid gap-5 rounded-[2px] border border-ivory/10 bg-ink/60 p-[clamp(22px,3vw,40px)] sm:grid-cols-2"
        >
          <label className={rs.label}>
            <span className={rs.labelText}>DATE</span>
            <input type="date" name="date" required className={rs.input} />
          </label>
          <div className={rs.label}>
            <span className={rs.labelText}>PERSONNES</span>
            <PartySizeDropdown />
          </div>
          <button type="submit" className={`${rs.gold} sm:col-span-2`}>
            Voir les disponibilités
          </button>
        </form>
      </div>
    </section>
  );
}
