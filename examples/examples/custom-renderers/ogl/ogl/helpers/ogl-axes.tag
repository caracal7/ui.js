<!renderer ogl-renderer>

<!tag @box ../objects/ogl-box>

<@box
    x = (state.x + state.size/2)
    y = state.y
    z = state.z
    sx = state.size
    sy = state.thickness
    sz = state.thickness
    color='green'/>
<@box
    x = state.x
    y = (state.y + state.size/2)
    z = state.z
    sx = state.thickness
    sy = state.size
    sz = state.thickness
    color = 'blue'/>
<@box
    x = state.x
    y = state.y
    z = (state.z + state.size/2)
    sx = state.thickness
    sy = state.thickness
    sz = state.size
    color = 'red'/>


<!state>
    x: 0,
    y: 0,
    z: 0,
    size: 10,
    thickness: 0.2,
