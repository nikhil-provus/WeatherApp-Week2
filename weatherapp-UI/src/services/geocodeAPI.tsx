export const reverseGeocode = async (lat: number, lon: number): Promise<string | null> => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "weather-app" },
    });
    const data = await res.json();
    return data?.address?.neighbourhood || data?.address?.suburb || data?.address?.city || null;
  } catch (error) {
    console.log("Reverse Geocode Error:", error);
    return null;
  }
};


