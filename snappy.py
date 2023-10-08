#!/usr/bin/env python3

import subprocess
import sys

import frida


def on_message(message, data):
    print(f"msg: {message} data: {data}")


def main():
    compiler = frida.Compiler()
    subprocess.run(["npx", "tsc"], check=True)
    bundle = compiler.build("dist/snappy.js")
    print(f"bundle: {bundle}")
    self_dev = frida.get_device("local")
    apfsd_session = self_dev.attach("apfsd")

    bytecode = apfsd_session.compile_script(bundle)
    script = apfsd_session.create_script_from_bytes(name="snappy", data=bytecode)
    script.on("message", on_message)
    script.load()
    api = script.exports_sync
    libsnappy_bytes = b"hello_bytes"
    api.load()
    script.post({"type": "dylib"}, "hello_bytes")
    snapshots = api.snapshots()
    print(f"snapshots: {snapshots}")
    script.unload()
    apfsd_session.detach()
    return 0


if __name__ == "__main__":
    sys.exit(main())
