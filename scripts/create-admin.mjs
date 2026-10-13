// Crée le compte admin ou réinitialise son mot de passe.
//
//   npm run admin:create -- reservation@le1000resto.com
//
// Le mot de passe est demandé de façon masquée. Il n'est jamais écrit dans un
// fichier : seule son empreinte argon2id est enregistrée en base. Le changement
// de mot de passe est exigé à la première connexion, et les sessions ouvertes
// de ce compte sont fermées.

import readline from "node:readline";

import { hash } from "@node-rs/argon2";
import { MongoClient } from "mongodb";

const MIN_PASSWORD_LENGTH = 12;

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (text) => {
      if (text.includes(question)) process.stdout.write(text);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

process.loadEnvFile(".env");

const email = (process.argv[2] ?? "").trim().toLowerCase();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("Usage : npm run admin:create -- courriel@exemple.com");
  process.exit(1);
}

const password = process.env.ADMIN_PASSWORD ?? (await promptHidden("Mot de passe : "));
if (password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`);
  process.exit(1);
}

const client = new MongoClient(process.env.MONGO_URI);
try {
  await client.connect();
  const db = client.db();
  const admins = db.collection("admins");
  await admins.createIndex({ email: 1 }, { unique: true });

  const now = new Date();
  const result = await admins.findOneAndUpdate(
    { email },
    {
      $set: { passwordHash: await hash(password), mustChangePassword: true, passwordChangedAt: now },
      $setOnInsert: { email, createdAt: now },
    },
    { upsert: true, returnDocument: "after" },
  );
  await db.collection("sessions").deleteMany({ adminId: result._id });

  console.log(`Compte admin prêt : ${email} (changement de mot de passe exigé à la première connexion).`);
} finally {
  await client.close();
}
