const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
import axios from "axios";

function getTableUrl(tableName) {
  return `https://api.airtable.com/v0/${BASE_ID}/${tableName}`;
}

// export async function fetchUsers() {
//   const response = await fetch(getTableUrl("users"), {
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   });

//   const data = await response.json();
//   return data.records.map((record) => ({
//     id: record.id,
//     ...record.fields,
//   }));
// }

export const airtable = axios.create({
  baseURL: `https://api.airtable.com/v0/${BASE_ID}`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

// Récupérer les utilisateurs
export const fetchUsers = async () => {
  const res = await airtable.get(getTableUrl("users"));
  return res.data.records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
};

// Récupérer tous les projets
// export const fetchAllProjects = async () => {
//   const res = await airtable.get(getTableUrl("projects"));
//   return res.data.records.map((record) => ({
//     id: record.id,
//     ...record.fields,
//   }));
// };

export const fetchAllProjects = async () => {
  const res = await airtable.get(getTableUrl("projects"));
  return res.data.records.map((record) => ({
    airtableId: record.id, // <-- ID pour les PATCH
    ...record.fields, // <-- champs de ta table
  }));
};

export const createProject = async (fields) => {
  const res = await airtable.post(`/projects`, {
    fields,
  });
  return {
    id: res.data.id,
    ...res.data.fields,
  };
};

export const fetchProjectById = async (id) => {
  const res = await airtable.get(`/projects/${id}`);
  return {
    airtable: res.data.id,
    ...res.data.fields,
  };
};

export const updateProject = async (id, fields) => {
  const res = await airtable.patch(`/projects/${id}`, {
    fields,
  });
  return {
    id: res.data.id,
    ...res.data.fields,
  };
};

export const updateProjectVisibility = async (id, visible) => {
  const res = await airtable.patch(`/projects/${id}`, {
    fields: { visible },
  });
  return {
    id: res.data.id,
    ...res.data.fields,
  };
};

export const deleteProject = async (id) => {
  const res = await airtable.delete(`/projects/${id}`);
  return res.status === 200;
};

export const TECHNO_OPTIONS = ["React", "Node.js", "Tailwind CSS", "MongoDB"];
export const CATEGORY_OPTIONS = [
  "Développement Web",
  "Design UX",
  "Marketing",
  "Data",
];
