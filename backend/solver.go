package mazesolver

import (
	"fmt"
	"image"
	"image/color"
	_ "image/jpeg"
	_ "image/png"
	"os"
)

// SolveMaze will solve the maze using the provided url.
func SolveMaze(uri string, render func(img image.Image)) ([]int, error) {
	img, err := readImage(uri)
	if err != nil {
		return nil, fmt.Errorf("failed to read the image: %w", err)
	}
	render(img)

	// Process the image, group similar colors.
	bounds := img.Bounds()
	canvas := image.NewRGBA(bounds)
	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			originalColor := img.At(x, y)
			r, g, b, a := originalColor.RGBA()
			canvas.Set(x, y, color.RGBA{R: uint8(r >> 8), G: uint8(g >> 8), B: uint8(b >> 8), A: uint8(a >> 8)})
		}
	}
	render(canvas)

	pathColor, wallColor := findMazeColors(canvas)
	fmt.Println(pathColor, wallColor)

	entrances, err := findMazeEntrances(wallColor, canvas)
	if err != nil {
		return nil, fmt.Errorf("failed to find the maze entrances: %w", err)
	}
	for _, point := range entrances {
		canvas.Set(point.X, point.Y, color.RGBA{R: 255, A: 255})
	}
	render(canvas)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			currentColor := img.At(x, y)
			if colorEquals(currentColor, pathColor) {
				canvas.Set(x, y, color.RGBA{R: 255, A: 200})
			}
			if x%30 == 0 && y%30 == 0 {
				render(canvas)
			}
		}
	}

	return nil, nil
}

func findMazeEntrances(wallColor color.Color, img image.Image) ([]image.Point, error) {
	bounds := img.Bounds()
	var entrances []image.Point

	// Detecting the actual maze borders (assuming the maze is surrounded by black border)
	var top, bottom, left, right int
	found := false
	for y := bounds.Min.Y; y < bounds.Max.Y && !found; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			if img.At(x, y) == wallColor {
				top = y
				found = true
				break
			}
		}
	}

	found = false
	for y := bounds.Max.Y - 1; y >= top && !found; y-- {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			if img.At(x, y) == wallColor {
				bottom = y
				found = true
				break
			}
		}
	}

	found = false
	for x := bounds.Min.X; x < bounds.Max.X && !found; x++ {
		for y := top; y <= bottom; y++ {
			if img.At(x, y) == wallColor {
				left = x
				found = true
				break
			}
		}
	}

	found = false
	for x := bounds.Max.X - 1; x >= left && !found; x-- {
		for y := top; y <= bottom; y++ {
			if img.At(x, y) == wallColor {
				right = x
				found = true
				break
			}
		}
	}

	// Scan the detected borders for entrances
	for x := left; x <= right; x++ {
		if img.At(x, top) != wallColor {
			entrances = append(entrances, image.Point{x, top})
		}
		if img.At(x, bottom) != wallColor {
			entrances = append(entrances, image.Point{x, bottom})
		}
	}
	for y := top; y <= bottom; y++ {
		if img.At(left, y) != wallColor {
			entrances = append(entrances, image.Point{left, y})
		}
		if img.At(right, y) != wallColor {
			entrances = append(entrances, image.Point{right, y})
		}
	}

	if len(entrances) < 2 {
		return entrances, fmt.Errorf("could not find more than 1 entrance")
	}

	return entrances, nil
}

// findMazeColors will find the 2 most common colors in the image, which should consist of the available path, and the walls.
func findMazeColors(img image.Image) (pathColor, wallColor color.Color) {
	colorCount := make(map[color.Color]int)
	bounds := img.Bounds()

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			currentColor := img.At(x, y)
			r, g, b, a := currentColor.RGBA()
			simplifiedColor := color.RGBA{R: uint8(r >> 8), G: uint8(g >> 8), B: uint8(b >> 8), A: uint8(a >> 8)}
			colorCount[simplifiedColor]++
		}
	}

	var dominantCount, wallCount int
	for c, count := range colorCount {
		if count > dominantCount {
			pathColor, dominantCount = c, count
		} else if count > wallCount {
			wallColor, wallCount = c, count
		}
	}
	return
}

// readImage will load the image from a path on the disk.
func readImage(uri string) (image.Image, error) {
	file, err := os.Open(uri)
	if err != nil {
		return nil, fmt.Errorf("failed to open the file: %w", err)
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	if err != nil {
		return nil, fmt.Errorf("failed to decode the image: %w", err)
	}

	return img, nil
}

// colorEquals checks the individual RGB values of each color, because you can't simply compare the interfaces.
func colorEquals(c1, c2 color.Color) bool {
	r1, g1, b1, a1 := c1.RGBA()
	r2, g2, b2, a2 := c2.RGBA()
	return r1 == r2 && g1 == g2 && b1 == b2 && a1 == a2
}
