export const getWeatherByCity = async city => {
    const response = await fetch(`/weather?address=${encodeURIComponent(city)}`);
    return await response.json();
};