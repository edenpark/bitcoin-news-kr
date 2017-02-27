const storage = {};

storage.set = (key, object) => {
    localStorage[key] = JSON.stringify(object);
}

storage.get = (key) => {
    /*
       typeof localStorage === "undefined"

       is for server side to pass an error of 'localStorage is undefined'
    */
    if(typeof localStorage === "undefined" || !localStorage[key]) {
        return undefined;
    }
    return JSON.parse(localStorage[key]);
}

storage.remove = (key) => {
    if(localStorage[key]) {
        localStorage.removeItem(key);
    }
}

export default storage;
