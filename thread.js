const bc = new BroadcastChannel('test_channel');

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
    if (message.data === 'start') {
        const result = slowFunction();
        bc.postMessage(result);
    }
}
