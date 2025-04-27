import { airtable } from "../../../admin/src/services/projects.service";

const TABLE_NAME = "contacts";

export const createContact = async ({ name, email, message }) => {
    const res = await airtable.post(`/${TABLE_NAME}`, {
        fields: {
            name: name,
            email: email,
            message: message,
        },
    });
    return res.data;
};
