import axios from "axios";

const GetRoute = async (Startpoint, Endpoint) => {
    if (Startpoint.length > 0 && Endpoint.length > 0) {
        const originLat = Startpoint[0].geometry.location.lat;
        const originLng = Startpoint[0].geometry.location.lng;
        const destinationLat = Endpoint[0].geometry.location.lat;
        const destinationLng = Endpoint[0].geometry.location.lng;

        try {
            const response = await axios.post(
                `https://api.olamaps.io/routing/v1/directions?origin=${encodeURIComponent(`${originLat},${originLng}`)}&destination=${encodeURIComponent(`${destinationLat},${destinationLng}`)}&alternatives=false&steps=true&overview=full&language=en&traffic_metadata=false&api_key=${process.env.REACT_APP_OLA_API_KEY}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching route data:", error);
            throw error; // Re-throw error for further handling if needed
        }
    }
    return null;
};

export default GetRoute;
