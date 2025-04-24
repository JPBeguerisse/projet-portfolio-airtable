import { airtable } from "./projects.service";

export const fetchAllStudents = async () => {
  const res = await airtable.get("/students");
  return res.data.records.map((record) => ({
    airtableId: record.id,
    ...record.fields,
  }));
};

export const fetchStudentById = async (id) => {
  const res = await airtable.get(`/students/${id}`);
  return {
    airtable: res.data.id,
    ...res.data.fields,
  };
};

export const createStudent = async (fields) => {
  const res = await airtable.post(`/students`, {
    fields,
  });
  return {
    id: res.data.id,
    ...res.data.fields,
  };
};

export const updateStudent = async (id, fields) => {
  const res = await airtable.patch(`/students/${id}`, {
    fields,
  });
  return {
    id: res.data.id,
    ...res.data.fields,
  };
};

// export const deleteStudent = async (id) => {
//   const res = await airtable.delete(`/students/${id}`);
//   return {
//     id: res.data.id,
//     ...res.data.fields,
//   };
// };

export const deleteStudent = async (id) => {
  const res = await airtable.delete(`/students/${id}`);
  return res.status === 200;
};
