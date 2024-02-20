.PHONY = all include css clean

all: clean include css

include:
	mkdir build
	cp -R src/* build
	python3 utils/include.py

css: $(wildcard build/css/*.scss)
	for file in $^; do \
		sassc --style expanded "$$file" "$${file%.scss}".css; \
	done

clean:
	rm -rf build
