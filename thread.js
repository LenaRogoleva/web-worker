let thread2;

onmessage = (message) => {
    if (message.data === 'start') {

        if (!thread2) {
           thread2 = new Worker('./thread2.js');
            thread2.addEventListener('message', evt => {
                const result = evt.data;
                self.postMessage(result);
            });
        }
        thread2.postMessage('start2');
    }
}
