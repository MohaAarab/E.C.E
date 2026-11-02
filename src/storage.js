// Reads and writes in LocalStorage.


export function readFromStorage(key, fallback = []) {
    const data = localStorage.getItem(key);
    if(data === null){
        return []
    }
    return JSON.parse(data)
}


export function writeToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

