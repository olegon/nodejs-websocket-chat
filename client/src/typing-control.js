const TYPING_TIMEOUT = 1500;

export function watcher () {
    let lastTimeout = null;
    let typing = false;

    const beginTypingListeners = [];
    const endTypingListeners = [];

    return {
        activeTyping: () => {
            clearTimeout(lastTimeout);

            if (typing == false) {
                for (let listener of beginTypingListeners) {
                    listener();
                }
            }

            typing = true;

            lastTimeout = setTimeout(() => {
                typing = false;

                for (let listener of endTypingListeners) {
                    listener();
                }

            }, TYPING_TIMEOUT);
        },
        addEventListener: (type, listener) => {
            switch (type) {
                case 'begin-typing':
                    beginTypingListeners.push(listener);
                    break;
                case 'end-typing':
                    endTypingListeners.push(listener);
                    break;
            }
        }
    }
}
