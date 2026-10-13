This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Système de réservation

- Site public : section « Réserver » sur l'accueil, page `/reservation`, lien client `/r/<jeton>` (voir, confirmer sa présence, modifier, annuler).
- Admin : `/admin` (connexion par mot de passe, tableau de bord par date, recherche, configuration des lieux et des horaires).
- Règle de calcul : une réservation bloque ses places pendant la durée d'occupation + la marge (2 h 30 + 30 min par défaut, modifiables dans l'admin). Chaque date a son propre compteur.
- Code : `app/lib/reservations/` (règles pures, testées) et `app/lib/server/` (MongoDB, sessions, courriels SES, SMS Twilio).

### Mise en production (EC2 Ubuntu)

1. **Variables** : copier `.env.example` en `.env` et remplir les valeurs (MongoDB, SES, Twilio). Générer chaque secret avec `openssl rand -base64 32`.
2. **Compte admin** : `npm run admin:create -- reservation@le1000resto.com`. Le mot de passe est demandé de façon masquée, et un changement est exigé à la première connexion.
3. **Build et démarrage** : `npm ci && npm run build && npm start` (sous pm2 ou systemd).
4. **nginx (HTTPS obligatoire)** : transmettre l'hôte et l'IP réelle, sinon les Server Actions et la limitation des tentatives ne fonctionnent pas.
   ```nginx
   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
   ```
5. **Rappels** : rien à installer. Une tâche planifiée intégrée au serveur (`instrumentation.ts`) vérifie chaque minute les suivis : demande de confirmation le jour J à 10 h (courriel + SMS), dernier rappel 4 h avant, annulation automatique 3 h avant sans confirmation (avant 14 h : annulation à midi). Les réservations du jour même sont confirmées d'office. Elle anonymise aussi les réservations de plus de 12 mois. Pour déclencher un passage à la main : `curl -X POST -H "Authorization: Bearer <CRON_SECRET>" http://127.0.0.1:3000/api/cron/reminders`.
6. **AWS SES** : vérifier le domaine `le1000resto.com` (DKIM), demander la sortie du sandbox, puis créer des identifiants SMTP (`SES_SMTP_*` dans `.env`). Les courriels partent de `reservation@le1000resto.com`, modifiable avec `SES_FROM_EMAIL`.
7. **Twilio** : numéro canadien ; dans la configuration du numéro, « A message comes in » → `https://le1000resto.com/api/twilio/inbound` (POST). Le suivi de livraison (`/api/twilio/status`) est configuré automatiquement à chaque envoi.
8. **MongoDB Atlas** : autoriser uniquement l'IP de l'EC2, avec un utilisateur limité à la base `le1000`.

Tests : `npm test` (règles de calcul, dates et fuseau horaire, gabarits SMS et courriels).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
