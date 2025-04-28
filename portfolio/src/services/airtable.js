const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

function getTableUrl(tableName) {
  return `https://api.airtable.com/v0/${BASE_ID}/${tableName}`;
}

// export async function fetchVisibleProjects() {
//   const url = getTableUrl("projects");

//   try {
//     const response = await fetch(`${url}?view=Grid%20view`, {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     });

//     if (!response.ok) {
//       console.error("Erreur API Airtable :", response.statusText);
//       return [];
//     }

//     const data = await response.json();

//     return data.records.map((record) => ({
//       airtableId: record.id,
//       ...record.fields,
//     }));
//   } catch (error) {
//     console.error("Erreur fetchVisibleProjects :", error);
//     return [];
//   }
// }

export async function fetchVisibleProjects() {
  const url = getTableUrl("projects");

  try {
    const response = await fetch(`${url}?view=Grid%20view`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Erreur API Airtable :", response.statusText);
      return [];
    }

    const data = await response.json();

    return data.records
      .filter((record) => record.fields.visible === true) // << FILTRE ICI
      .map((record) => ({
        airtableId: record.id,
        ...record.fields,
      }));
  } catch (error) {
    console.error("Erreur fetchVisibleProjects :", error);
    return [];
  }
}

export async function fetchStudents() {
  const url = getTableUrl("students");

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Erreur API Airtable (students) :", response.statusText);
      return [];
    }

    const data = await response.json();

    return data.records.map((record) => ({
      airtableId: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Erreur fetchStudents :", error);
    return [];
  }
}

export async function updateProjectLikes(airtableId, newLikesCount) {
  const url = getTableUrl("projects");

  try {
    const response = await fetch(`${url}/${airtableId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          likes: newLikesCount,
        },
      }),
    });

    if (!response.ok) {
      console.error("Erreur mise à jour Likes Airtable :", response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur updateProjectLikes :", error);
  }
}
