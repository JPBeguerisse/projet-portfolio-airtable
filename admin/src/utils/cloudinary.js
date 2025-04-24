export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "portfolio-upload");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/djidfwdat/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  console.log("Cloudinary response:", data);
  return data.secure_url;
};
