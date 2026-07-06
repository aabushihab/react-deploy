// src/utils/api.js
// const BASE_URL = 'http://localhost:8082'; // replace with your backend URL
//
const BASE_URL = 'https://web-production-2a6f8.up.railway.app'; 

export const fetchClinicInfo = async () => {
  const response = await fetch(`${BASE_URL}/api/clinic/1/info`);
  if (response.ok) {
    return response.json();
  }
  return null;
};
// 👇 Add this export
export { BASE_URL };
