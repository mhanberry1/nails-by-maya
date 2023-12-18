all: clean
	cp -R src/* build
	python3 utils/include.py

clean:
	rm -rf build/*
