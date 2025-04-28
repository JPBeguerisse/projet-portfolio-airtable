import { airtable } from "./projects.service";
import { sha256 } from "js-sha256";
import { nanoid } from "nanoid";

const USERS_TABLE = "users";

// Crée un nouvel utilisateur, génère token et expiry, confirmed=false
export const createUser = async ({ email, password }) => {
  const hash = sha256(password);
  const token = nanoid();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // +24h

  const res = await airtable.post(`/${USERS_TABLE}`, {
    fields: {
      email,
      password: hash,
      role: "user",
      confirmed: false,
      confirmToken: token,
      tokenExpires: expires,
    },
  });

  return { id: res.data.id, ...res.data.fields, confirmToken: token };
};

// Récupère un utilisateur par e-mail (email, password, role, confirmed)
export const fetchUserByEmail = async (email) => {
  const filter = `AND({email}='${email}', {role}='admin')`;
  const res = await airtable.get(`/${USERS_TABLE}`, {
    params: {
      filterByFormula: filter,
      fields: ["email", "password", "role", "confirmed"],
    },
  });
  const rec = res.data.records[0];
  if (!rec) return null;
  return { id: rec.id, ...rec.fields };
};

// Confirme un compte via le token (vérifie aussi expiry)
export const confirmUser = async (token) => {
  const filter = `AND({confirmToken}='${token}', IS_AFTER({tokenExpires}, NOW()))`;
  const res = await airtable.get(`/${USERS_TABLE}`, {
    params: { filterByFormula: filter },
  });
  const rec = res.data.records[0];
  if (!rec) return false;

  await airtable.patch(`/${USERS_TABLE}/${rec.id}`, {
    fields: {
      confirmed: true,
      confirmToken: "",
      tokenExpires: null,
    },
  });
  return true;
};

// Met à jour le rôle d’un user
export const updateUserRole = async (id, newRole) => {
    const res = await airtable.patch(`/${USERS_TABLE}/${id}`, {
      fields: { role: newRole },
    });
    return { id: res.data.id, ...res.data.fields };
};
  
// Récupère tous les users (pour l’admin)
export const fetchAllUsers = async () => {
    const res = await airtable.get(`/${USERS_TABLE}`, {
        params: { fields: ["email","role","confirmed"] },
    });
    return res.data.records.map(r => ({ id: r.id, ...r.fields }));
};

export const fetchUserById = async (id) => {
    const res = await airtable.get(`/users/${id}`);
    const rec = res.data;
    return {
      id: rec.id,
      email: rec.fields.email,
      role: rec.fields.role,
      confirmed: rec.fields.confirmed,
    };
};
  