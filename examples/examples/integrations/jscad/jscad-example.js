export default (parameters) => {

    const logo = [
        colorize([1.0, 0.4, 1.0],
            subtract(
                cube({ size: 300 }),
                sphere({ radius: 200 })
            )
        ),
        colorize([1.0, 1.0, 0],
            intersect(
                sphere({ radius: 130 }),
                cube({ size: 210 })
            )
        )
    ];
    const transpCube = colorize([1, 0, 0, 0.75], cuboid({ size: [100 * parameters.scale, 100, 210 + (200 * parameters.scale)] }))
    const star2D = star({ vertices: 18, innerRadius: 350, outerRadius: 400 })
    const line2D = colorize([1.0, 0, 0], line([[260, 260], [-260, 260], [-260, -260], [260, -260], [260, 260]]))
    // some colors are intentionally without alpfa channel to test geom2ToGeometries will add alpha channel
    const colorChange = [
        [1, 0, 0, 1],
        [1, 0.5, 0],
        [1, 0, 1],
        [0, 1, 0],
        [0, 0, 0.7]
    ];
    star2D.sides.forEach((side, i) => {
        if (i >= 2) side.color = colorChange[i % colorChange.length];
    })

    return [transpCube, star2D, line2D, ...logo];

}
