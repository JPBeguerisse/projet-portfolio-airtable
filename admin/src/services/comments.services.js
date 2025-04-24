import { airtable } from "../services/projects.service";

export const fetchCommentsByProject = async (projectId) => {
  const filter = `Projet="${projectId}"`;
  const res = await airtable.get("/comments", {
    params: {
      filterByFormula: filter,
    },
  });

  return res.data.records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
};
