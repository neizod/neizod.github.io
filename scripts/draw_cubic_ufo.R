#!/usr/bin/env Rscript

library(rgl)
library(sp)


calc_radian <- function(i, tick, uplim) {
    2 * pi * (i / tick) * (uplim / 360)
}


calc_degree <- function(i, tick, uplim) {
    uplim * (i / tick)
}


shadow <- function(obj, color='black', ax='Y') {
    obj$material$alpha <- 1
    obj$material$color <- color
    nudge <- -1.5
    if (color!='black') {
        nudge <- nudge - 0.001
    }
    if (ax=='Y') {
        obj$vb[2,] <- rep(nudge, 8)
    } else if (ax=='Z') {
        obj$vb[3,] <- rep(nudge-0.5, 8)
    }
    obj
}


calc_area <- function(cube) {
    points <- t(cube$vb[c(1,3),])
    corners <- points[c(chull(points), chull(points)[1]),]
    Polygon(corners, hole=FALSE)@area
}


base_plot <- function(cube, border) {
    plot3d(border, xlab='', ylab='', zlab='', box=FALSE, axes=FALSE)
    shade3d(cube)
    shade3d(shadow(cube))
}


spin_meta <- function(main_cube, border, tick, uplim, x, y, z, dirname, filename) {
    for (i in 1:tick) {
        r <- calc_radian(i, tick, uplim)
        d <- calc_degree(i, tick, uplim)
        cube <- rotate3d(main_cube, r, x, y, z)
        dir.create(dirname, showWarning=FALSE)
        base_plot(cube, border)
        area <- sprintf("A = %.5f", calc_area(cube))
        text3d(0.2, -1.3, 0.2, area, color='yellow', cex=1.5)
        snapshot3d(paste(dirname, '/', filename, d, '.png', sep=''))
    }

}


spin_x <- function(main_cube, border, tick=30, uplim=90) {
    spin_meta(main_cube, border, tick, uplim, T, F, F, 'pic1', 'x')
}


spin_y <- function(main_cube, border, tick=60, uplim=180) {
    spin_meta(main_cube, border, tick, uplim, F, T, F, 'pic2', 'x45-y')
}


spin_z <- function(main_cube, border, tick=60, uplim=180) {
    spin_meta(main_cube, border, tick, uplim, F, F, T, 'pic3', 'x45-z')
}


with_wall <- function(main_cube, border) {
    cube <- rotate3d(main_cube, -pi/2 + pi/8, F, F, T)
    base_plot(cube, border)
    shade3d(shadow(cube, ax='Z'))
    shade3d(shadow(border, color='gray'))
    shade3d(shadow(border, color='gray', ax='Z'))
    snapshot3d('pic4.png')
}


main <- function() {
    par3d('windowRect'=c(0, 0, 1000, 1000))
    rgl.viewpoint(theta=50, phi=20, zoom=1)
    border <- scale3d(cube3d(alpha=0), 1.0, 1.5, 1.0)

    main_cube <- scale3d(cube3d(color='blue', alpha=0.9), 0.5, 0.5, 0.5)
    spin_x(main_cube, border)

    main_cube <- rotate3d(main_cube, pi/4, T, F, F)
    spin_y(main_cube, border)
    spin_z(main_cube, border)

    border <- translate3d(scale3d(border, 1.0, 1.0, 1.5), 0, 0, -0.5)
    with_wall(main_cube, border)
}


if (!interactive()) {
    main()
}