import { FarmRecord } from "../types/farm";

export const registerFarm = async (data: FarmRecord) => {
  const response = await fetch("http://localhost:8000/api/v1/farms/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to register farm!");
  }

  return response.json();
};
