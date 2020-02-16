class StorageManager {
    static remove(key) {
        localStorage.removeItem(`${key}`);
    }

    static get(key) {
        if (localStorage && localStorage.getItem(`${key}`)) {
            const item = localStorage.getItem(`${key}`);
            let result;
            try {
                result = JSON.parse(item);
            } catch {
                result = item;
            }
            return result;
        }
        return '';
    }

    static set(key, data) {
        localStorage.setItem(`${key}`, JSON.stringify(data));
    }
}

export default StorageManager;