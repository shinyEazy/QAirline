import axios from "./axios-config";

// Fetch an advertisement by name
export async function getAdvert(advert_name: string) {
  try {
    const response = await axios.get(`/api/advert/${advert_name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching advert", error);
    throw error;
  }
}

// Create a new advertisement
interface AdvertData {
  fileUpload: File;
  advertName: string;
  text: string;
}

export async function createAdvert({ fileUpload, advertName, text }: AdvertData) {
  try {
    const formData = new FormData();
    console.log(fileUpload);
    formData.append("file_upload", fileUpload);
    formData.append("advert_name", advertName);
    formData.append("text", text);

    const response = await axios.post("/api/advert/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating advert", error);
    throw error;
  }
}

// Update an advertisement
export async function updateAdvert(advertName, advertData) {
  try {
    const response = await axios.put(`/api/advert/${advertName}`, advertData);
    return response.data;
  } catch (error) {
    console.error("Error updating advert", error);
    throw error;
  }
}

// Delete an advertisement
export async function deleteAdvert(advertName: string) {
  try {
    const response = await axios.delete(`/api/advert/${advertName}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting advert", error);
    throw error;
  }
}

export async function getAdverts() {
  try {
    const response = await axios.get("/api/advert");
    return response.data;
  } catch (error) {
    console.error("Error getting adverts", error);
    throw error;
  }
}
