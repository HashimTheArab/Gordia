package main

import (
	"fmt"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/canvas"
	"github.com/hashimthearab/mazesolver"
	"image"
)

func main() {
	a := app.New()
	w := a.NewWindow("Maze Solver")
	go func() {
		e, err := mazesolver.SolveMaze("maze.png", func(img image.Image) {
			image := canvas.NewImageFromImage(img)
			image.FillMode = canvas.ImageFillOriginal
			w.SetContent(image)
		})
		if err != nil {
			panic(err)
		}
		fmt.Println(e)
	}()
	w.ShowAndRun()
}
