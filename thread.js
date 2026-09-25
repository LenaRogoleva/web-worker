const slowFunction = (timeout = 3000) => {
    let start = performance.now();
    let x = 0;
    let i = 0;
    do {
        i += 1;
        x += (Math.random() - 0.5) * i;
    } while (performance.now() - start < timeout);
    return i;
}

onmessage = (message) => {
    const { type, stopMode } = message.data;
    if (type !== 'start') {
        return;
    }

    try {
        const result = slowFunction();
        self.postMessage({ type: 'result', data: result });
    } catch (error) {
        self.postMessage({ type: 'error', message: error.message });
    } finally {
        if (stopMode === 'close') {
            self.close(); // воркер завершает сам себя
        }
    }
}
