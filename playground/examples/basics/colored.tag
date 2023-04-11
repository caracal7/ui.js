<!tag @message msg.tag>

<@message
    msg='Color is '
    color=state.color
    enter(color: { to: state.color })
    update(color: { to: state.color })/>

<hr>

<@message
    msg='One more color is '
    color=state.color
    enter(color: { to: state.color })
    update(color: { to: state.color })/>
