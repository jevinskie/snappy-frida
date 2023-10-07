function pretty(obj: Object): string {
    return JSON.stringify(obj);
}

rpc.exports = {
    load() {
        console.log("load rcp export called");
        recv("dylib", (message, data) => {
            console.log(`msg: ${pretty(message)} data: ${pretty(data)}`);
        });
    },
    snapshots() {
        return [ "a", "b", "c" ];
    }
}