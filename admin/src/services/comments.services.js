import { airtable } from "../services/projects.service";

export const fetchCommentsByProject = async (projectId) => {
  const filter = `Projet="${projectId}"`;
  const res = await airtable.get("/comments", {
    params: {
      filterByFormula: filter,
    },
  });

  return res.data.records.map((record) => ({
    airtableId: record.id,
    ...record.fields,
  }));
};

export const createComment = async ({ content, projectId, user }) => {
  const res = await airtable.post("/comments", {
    fields: {
      content,
      Projet: [projectId],
      user,
    },
  });

  return res.data;
};

export const deleteComment = async (id) => {
  const res = await airtable.delete(`/comments/${id}`);
  return res.status === 200;
};
