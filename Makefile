.PHONY: clean, all, ios, android
clean:
	rm -f android/app/libs/mazesolver.aar android/app/libs/mazesolver-sources.jar

android:
	cd backend
	go get -d golang.org/x/mobile/cmd/gomobile
	gomobile bind -o ../android/app/libs/mazesolver.aar -target=android github.com/hashimthearab/mazesolver

all:
	make android
	# TODO: ios