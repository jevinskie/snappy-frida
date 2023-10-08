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

function isArrayBuffer(obj: object): boolean {
    return obj instanceof ArrayBuffer && !ArrayBuffer.isView(obj);
}

function getArrayBuffer(obj: object): ArrayBuffer {
    return obj as ArrayBuffer;
}

function isTypedArray(obj: object): boolean {
    const TypedArrayProto = Object.getPrototypeOf(Uint8Array);
    return obj instanceof TypedArrayProto;
}

function getTypedArray(obj: object): TypedArray {
    return obj as TypedArray;
}

function getTypeName(obj: object): string {
    return Object.getPrototypeOf(obj)?.constructor?.name;
}

function getTypedArrayValuesAsString(
    ta: TypedArray,
    hex: boolean = false,
    list: boolean = true,
): string {
    if (!isTypedArray(ta)) {
        throw new Error("Must pass a TypedArray");
    }
    const ta_elem_sz = ta.BYTES_PER_ELEMENT;
    let vals_str: string;
    if (list) {
        if (hex) {
            const zeros = "00".repeat(ta_elem_sz);
            vals_str = Array.prototype.map
                .call(ta, (num: number | bigint): string => {
                    return "0x" + (zeros + num.toString(16)).slice(-2 * ta_elem_sz);
                })
                .join(", ");
        } else {
            vals_str = ta.join(", ");
        }
    } else {
        if (!hex) {
            throw new Error("must use hex when not displaying a list");
        }
        const zeros = "00".repeat(ta_elem_sz);
        vals_str = Array.prototype.map
            .call(ta, (num: number | bigint): string => {
                return (zeros + num.toString(16)).slice(-2 * ta_elem_sz);
            })
            .join("");
    }
    return vals_str;
}

function pretty(obj: object, hex: boolean = false, list: boolean = true): string {
    if (isTypedArray(obj)) {
        const ta = getTypedArray(obj);
        const ta_type_name = getTypeName(ta);
        const ta_num_elem = ta.length;
        const ta_num_bytes = ta_num_elem * ta.BYTES_PER_ELEMENT;
        return `${ta_type_name}(${ta_num_elem}){${ta_num_bytes}} [ ${getTypedArrayValuesAsString(
            ta,
            hex,
            list,
        )} ]`;
    } else if (isArrayBuffer(obj)) {
        const ab = getArrayBuffer(obj);
        const ab8 = new Uint8Array(ab);
        return `ArrayBuffer(${ab8.length}) [ ${getTypedArrayValuesAsString(ab8, hex, list)} ]`;
    } else if (obj instanceof Object) {
        return JSON.stringify(obj, null, 2);
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
            console.log(`data: ${data}`);
            console.log(`pretty data: ${pretty(data)}`);
            console.log(`pretty data hex: ${pretty(data, true, true)}`);
            console.log(`pretty data hex no list: ${pretty(data, true, false)}`);
            const u8a = new Uint8Array(data);
            console.log(`u8a: ${u8a}`);
            console.log(`pretty u8a: ${pretty(u8a)}`);
            console.log(`pretty u8a hex: ${pretty(u8a, true, true)}`);
            console.log(`pretty u8a hex no list: ${pretty(u8a, true, false)}`);
            const u16a = new Uint16Array([2, 4, 3]);
            console.log(`pretty u16a: ${pretty(u16a)}`);
            console.log(`pretty u16a hex: ${pretty(u16a, true, true)}`);
            console.log(`pretty u16a hex no list: ${pretty(u16a, true, false)}`);
            const u64a = new BigUint64Array([123n, 456n, 789n, 1337n]);
            console.log(`pretty u64a: ${pretty(u64a)}`);
            console.log(`pretty u64a hex: ${pretty(u64a, true, true)}`);
            console.log(`pretty u64a hex no list: ${pretty(u64a, true, false)}`);
            console.log(`pretty msg: ${pretty(message)}`);
            console.log(`msg: ${pretty(message)} data: ${pretty(data)}`);
        });
    },
    snapshots() {
        return ["a", "b", "c"];
    },
};
