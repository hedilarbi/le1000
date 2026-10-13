"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { cancelByClientAction, changeByClientAction, confirmAttendanceAction, type ManageState } from "@/app/(site)/r/[token]/actions";
import { MAX_ONLINE_PARTY_SIZE } from "@/app/lib/reservations/config";

import { LargeGroupNotice } from "./booking-form";
import { Dropdown } from "../ui/dropdown";
import { AreaTimeFields, type Slot } from "./area-time-fields";
import { rs } from "./styles";

function Submit({
  children,
  pendingLabel,
  className,
  confirmMessage,
  disabled,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  className: string;
  confirmMessage?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={className}
      onClick={(event) => {
        if (confirmMessage && !window.confirm(confirmMessage)) event.preventDefault();
      }}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

function Feedback({ state }: { state: ManageState }) {
  if (state.error) return <p role="alert" className={rs.error}>{state.error}</p>;
  if (state.message) return <p role="status" className={rs.notice}>{state.message}</p>;
  return null;
}

export function ManageReservation({
  token,
  date,
  partySize,
  canConfirm,
  canChange,
  canCancel,
  minDate,
  maxDate,
}: {
  token: string;
  date: string;
  partySize: number;
  canConfirm: boolean;
  canChange: boolean;
  canCancel: boolean;
  minDate: string;
  maxDate: string;
}) {
  const [confirmState, confirmAction] = useActionState<ManageState, FormData>(confirmAttendanceAction, {});
  const [cancelState, cancelAction] = useActionState<ManageState, FormData>(cancelByClientAction, {});
  const [changeState, changeAction] = useActionState<ManageState, FormData>(changeByClientAction, {});
  const [editing, setEditing] = useState(false);
  const [newDate, setNewDate] = useState(date);
  const [newPartySize, setNewPartySize] = useState(Math.min(partySize, MAX_ONLINE_PARTY_SIZE));
  const [slot, setSlot] = useState<Slot | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <Feedback state={confirmState} />
      <Feedback state={changeState} />
      <Feedback state={cancelState} />

      {canConfirm && (
        <form action={confirmAction}>
          <input type="hidden" name="token" value={token} />
          <Submit className={`${rs.gold} w-full sm:w-auto`} pendingLabel="Confirmation…">
            Je confirme ma présence
          </Submit>
        </form>
      )}

      {(canChange || canCancel) && (
        <div className="flex flex-wrap gap-3">
          {canChange && !editing && (
            <button type="button" className={rs.ghost} onClick={() => setEditing(true)}>
              Modifier ma réservation
            </button>
          )}
          {canCancel && (
            <form action={cancelAction}>
              <input type="hidden" name="token" value={token} />
              <Submit
                className={`${rs.ghost} border-red-400/40 text-red-200 hover:border-red-400 hover:text-red-100`}
                pendingLabel="Annulation…"
                confirmMessage="Voulez-vous vraiment annuler votre réservation ?"
              >
                Annuler ma réservation
              </Submit>
            </form>
          )}
        </div>
      )}

      {canChange && editing && (
        <form action={changeAction} className={`${rs.card} flex flex-col gap-6`}>
          <input type="hidden" name="token" value={token} />
          <span className={rs.eyebrow}>NOUVEAUX DÉTAILS</span>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={rs.label}>
              <span className={rs.labelText}>DATE</span>
              <input
                type="date"
                name="date"
                required
                min={minDate}
                max={maxDate}
                value={newDate}
                onChange={(event) => {
                  setNewDate(event.target.value);
                  setSlot(null);
                }}
                className={rs.input}
              />
            </label>
            <div className={rs.label}>
              <span className={rs.labelText}>PERSONNES</span>
              <Dropdown
                label="Nombre de personnes"
                placeholder="Choisir"
                name="partySize"
                value={String(newPartySize)}
                onChange={(value) => {
                  setNewPartySize(Number(value));
                  setSlot(null);
                }}
                options={Array.from({ length: MAX_ONLINE_PARTY_SIZE + 1 }, (_, index) => index + 1).map((size) => ({
                  value: String(size),
                  label: size > MAX_ONLINE_PARTY_SIZE ? `${size} personnes et plus` : `${size} personne${size > 1 ? "s" : ""}`,
                }))}
              />
            </div>
          </div>
          {newPartySize > MAX_ONLINE_PARTY_SIZE ? (
            <LargeGroupNotice />
          ) : (
            newDate && <AreaTimeFields key={`${newDate}|${newPartySize}`} date={newDate} partySize={newPartySize} onChange={setSlot} />
          )}
          {slot && (
            <>
              <input type="hidden" name="areaId" value={slot.areaId} />
              <input type="hidden" name="time" value={slot.time} />
            </>
          )}
          <div className="flex flex-wrap gap-3">
            <Submit className={rs.gold} pendingLabel="Enregistrement…" disabled={!slot}>
              {slot ? "Enregistrer la modification" : "Choisissez le lieu et l'heure"}
            </Submit>
            <button type="button" className={rs.ghost} onClick={() => setEditing(false)}>
              Retour
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
