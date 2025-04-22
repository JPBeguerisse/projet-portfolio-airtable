const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;

function getTableUrl(tableName) {
  return `https://api.airtable.com/v0/${BASE_ID}/${tableName}`;
}

export async function fetchVisibleProjects() {
  const url = getTableUrl("projects");

  try {
    // const response = await fetch(`${url}?filterByFormula={visible}=1`, {
    //   headers: {
    //     Authorization: `Bearer ${API_KEY}`,
    //   },
    // });

    const response = await fetch(
      `${url}
        `,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erreur API Airtable :", response.statusText);
      return [];
    }

    const data = await response.json();
    return data.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("Erreur fetchVisibleProjects :", error);
    return [];
  }
}
