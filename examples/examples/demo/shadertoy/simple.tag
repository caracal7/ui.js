<!tag @shadertoy shadertoy>

<@shadertoy fragment=`
// https://www.shadertoy.com/view/Ms3SzB
void mainImage( out vec4 O, vec2 U )
{
    float h = iResolution.y;  U = 4.*(U+iMouse.xy)/h;
    vec2 K = ceil(U); U = 2.*fract(U)-1.;
    float a = atan(U.y,U.x), r=length(U), v=0., A;

    for(int i=0; i<7; i++)
        v = max(v, (1. + .8* cos(A= K.x/K.y*a + iTime) ) / 1.8 * smoothstep(1., 1.-120./h, 8.*abs(r-.2*sin(A)-.5))),
        a += 6.28;

    O = v*(.5+.5*sin(K.x+17.*K.y+vec4(0,2.1,-2.1,0)));
}`/>
