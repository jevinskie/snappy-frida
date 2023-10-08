// type TypedArray =|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|
//     Uint32Array|Float32Array|Float64Array;

const isArrayBuffer = (obj: any): boolean => obj?.__proto__?.constructor?.name === "ArrayBuffer";

function pretty(obj: any): string {
    console.log(`pretty obj: ${obj}`);
    console.log(`pretty obj?.__proto__: ${obj?.__proto__}`);
    console.log(`pretty obj?.__proto__?.constructor: ${obj?.__proto__?.constructor}`);
    console.log(`pretty obj?.__proto__?.constructor?.name: ${obj?.__proto__?.constructor?.name}`);

    if (obj instanceof Object) {
        return JSON.stringify(obj, null, 2);
    } else if ("buffer" in obj) {
        console.log("got typed buffer");
        return JSON.stringify(new Uint8Array(obj.buffer), null, 2);
    } else if (isArrayBuffer(obj)) {
        console.log("got arraybuffer");
        // let ab = new Uint8Array(obj);
        // console.log(`ab: ${ab}`);
        // return JSON.stringify(ab, null, 2);
        return "arraybuffer...";
    } else {
        return JSON.stringify(obj, null, 2);
    }
}

rpc.exports = {
    load() {
        console.log("load rcp export called");
        recv("dylib", (message: any, data: ArrayBuffer | null): void => {
            console.log(`ugly msg: ${message} data: ${data}`);
            if (data == null) {
                console.log("data was null");
                return;
            }
            let u8a = new Uint8Array(data);
            // console.log(`msg: ${pretty(message)} data: ${pretty(data)}`);
        });
    },
    snapshots() {
        return ["a", "b", "c"];
    },
};
