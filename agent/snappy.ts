type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

const isArrayBuffer = (obj: object): boolean =>
    Object.getPrototypeOf(obj)?.constructor?.name === "ArrayBuffer";

function pretty(obj: object): string {
    console.log(`pretty obj: ${obj}`);
    console.log(`pretty obj?.__proto__: ${Object.getPrototypeOf(obj)}`);
    console.log(`pretty obj?.__proto__?.constructor: ${Object.getPrototypeOf(obj)?.constructor}`);
    console.log(
        `pretty obj?.__proto__?.constructor?.name: ${Object.getPrototypeOf(obj)?.constructor
            ?.name}`,
    );

    if (obj instanceof Object) {
        return JSON.stringify(obj, null, 2);
    } else if ({}.propertyIsEnumerable.call(obj, "buffer")) {
        console.log("got typed buffer");
        return JSON.stringify(new Uint8Array((obj as TypedArray).buffer), null, 2);
    } else if (isArrayBuffer(obj)) {
        console.log("got arraybuffer");
        const ab = new Uint8Array(obj);
        console.log(`ab: ${ab}`);
        // return JSON.stringify(ab, null, 2);
        return "arraybuffer...";
    } else {
        return JSON.stringify(obj, null, 2);
    }
}

rpc.exports = {
    load() {
        console.log("load rcp export called");
        recv("dylib", (message: object, data: ArrayBuffer | null): void => {
            console.log(`ugly msg: ${message} data: ${data}`);
            if (data == null) {
                console.log("data was null");
                return;
            }
            const u8a = new Uint8Array(data);
            console.log(`u8a: $${u8a}`);
            console.log(`pretty msg: ${pretty(message)}`);
            console.log(`msg: ${pretty(message)} data: ${pretty(data)}`);
        });
    },
    snapshots() {
        return ["a", "b", "c"];
    },
};
