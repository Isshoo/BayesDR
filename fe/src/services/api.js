import client from "@/libs/axios";

const api = {
  classifyImage: (data) =>
    client.post("/classify", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default api;
