//TODO: переписать на класс

export const getLikeFromLocalStorage = (): string[] => {
    const likes = localStorage.getItem('likes');
    return likes ? JSON.parse(likes) : [];
};

const setToLocalStorageErrorHandler = (e: unknown) => {
    // Если возникло исключение, проверить, является ли оно ошибкой QuotaExceededError
    if (
        e instanceof DOMException &&
        // все браузеры, кроме Firefox
        (e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // все браузеры, кроме Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    ) {
        throw new Error('Размер localStorage превышен');
    }
};

export const setLikeToLocalStorage = (like: string) => {
    try {
        let likes = getLikeFromLocalStorage();
        if (likes.includes(like)) {
            likes = likes.filter(id => id !== like);
            localStorage.setItem('likes', JSON.stringify(likes));
            return;
        }
        likes.push(like);
        localStorage.setItem('likes', JSON.stringify(likes));
    } catch (e) {
        setToLocalStorageErrorHandler(e);
    }
};
