let thread2;

onmessage = (message) => {
    const { type, stopMode } = message.data;
    if (type !== 'start') {
        return;
    }

    if (!thread2) {
        thread2 = new Worker('./thread2.js');
    }

    thread2.onmessage = (evt) => {
        self.postMessage({ type: 'result', data: evt.data });
        finish(stopMode);
    };

    thread2.onerror = (evt) => {
        evt.preventDefault();
        self.postMessage({ type: 'error', message: evt.message || 'ошибка во вложенном воркере' });
        finish(stopMode);
    };

    thread2.postMessage('start2');
}

const finish = (stopMode) => {
    if (stopMode === 'close') {
        thread2.terminate();
        thread2 = null;
        self.close(); // воркер завершает сам себя
    }
}
