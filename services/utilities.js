
export const getFirstCharacter = (string) => {
    return string.substring(1, 0);
}

export const capitalise = (string) => {
    return string.toUpperCase();
}

export const createGUID = () => {
    let d = Date.now();
    if (typeof performance !== "undefined" && typeof performance.now === "function") {
        d += performance.now(); // use high-precision timer if available
    }
    const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid;
}