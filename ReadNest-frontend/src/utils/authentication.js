export function getAuthToken() {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
    }, {});

    console.log("All cookies:", cookies);

    return cookies.Token || null;
}
