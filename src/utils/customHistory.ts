class CustomHistory {
    listeners = new Set<any>();

    pushState(url: string) {
        history.pushState(null, '', url);
        this.listeners.forEach(listener => listener(url));
    }

    listen(listener: any) {
        this.listeners.add(listener);

        return () => this.listeners.delete(listener);
    }
}

export const customHistory = new CustomHistory();
