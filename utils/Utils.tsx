export const getCurrentLocation = (
    handleSuccess: (data: GeolocationPosition) => void,
    handleError: (data: GeolocationPositionError) => void
) => {
    if ("geolocation" in navigator) {
        return navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
        throw new Error();
    }
}
