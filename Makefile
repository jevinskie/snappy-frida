TARGETS: libsnappy.dylib

.PHONY: clean

CFLAGS = -Wall -Wextra -fobjc-arc -std=gnu11 -arch arm64e -Oz
LDFLAGS = -framework IOKit

all: $(TARGETS)

clean:
	rm -rf $(TARGETS) *.dSYM

libsnappy.dylib: libsnappy.c libsnappy.m
	$(CC) $(CFLAGS) $(LDFLAGS) -shared -o $@ $^

