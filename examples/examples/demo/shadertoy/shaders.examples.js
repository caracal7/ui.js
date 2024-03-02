export default {

'Truchet Tentacles': `

//https://www.shadertoy.com/view/ldfGWn

float rand(vec3 r) { return fract(sin(dot(r.xy,vec2(1.38984*sin(r.z),1.13233*cos(r.z))))*653758.5453); }

#define Iterations 64
#define Thickness 0.1
#define SuperQuadPower 8.0
#define Fisheye 0.5

float truchetarc(vec3 pos)
{
	float r=length(pos.xy);
//	return max(abs(r-0.5),abs(pos.z-0.5))-Thickness;
//	return length(vec2(r-0.5,pos.z-0.5))-Thickness;
	return pow(pow(abs(r-0.5),SuperQuadPower)+pow(abs(pos.z-0.5),SuperQuadPower),1.0/SuperQuadPower)-Thickness;
}

float truchetcell(vec3 pos)
{
	return min(min(
	truchetarc(pos),
	truchetarc(vec3(pos.z,1.0-pos.x,pos.y))),
	truchetarc(vec3(1.0-pos.y,1.0-pos.z,pos.x)));
}

float distfunc(vec3 pos)
{
	vec3 cellpos=fract(pos);
	vec3 gridpos=floor(pos);

	float rnd=rand(gridpos);

	if(rnd<1.0/8.0) return truchetcell(vec3(cellpos.x,cellpos.y,cellpos.z));
	else if(rnd<2.0/8.0) return truchetcell(vec3(cellpos.x,1.0-cellpos.y,cellpos.z));
	else if(rnd<3.0/8.0) return truchetcell(vec3(1.0-cellpos.x,cellpos.y,cellpos.z));
	else if(rnd<4.0/8.0) return truchetcell(vec3(1.0-cellpos.x,1.0-cellpos.y,cellpos.z));
	else if(rnd<5.0/8.0) return truchetcell(vec3(cellpos.y,cellpos.x,1.0-cellpos.z));
	else if(rnd<6.0/8.0) return truchetcell(vec3(cellpos.y,1.0-cellpos.x,1.0-cellpos.z));
	else if(rnd<7.0/8.0) return truchetcell(vec3(1.0-cellpos.y,cellpos.x,1.0-cellpos.z));
	else  return truchetcell(vec3(1.0-cellpos.y,1.0-cellpos.x,1.0-cellpos.z));
}

vec3 gradient(vec3 pos)
{
	const float eps=0.0001;
	float mid=distfunc(pos);
	return vec3(
	distfunc(pos+vec3(eps,0.0,0.0))-mid,
	distfunc(pos+vec3(0.0,eps,0.0))-mid,
	distfunc(pos+vec3(0.0,0.0,eps))-mid);
}

void mainVR( out vec4 fragColor, in vec2 fragCoord, in vec3 fragRayOri, in vec3 fragRayDir )
{
    vec3 ray_dir=fragRayDir;
	vec3 ray_pos=fragRayOri;

	float i=float(Iterations);
	for(int j=0;j<Iterations;j++)
	{
		float dist=distfunc(ray_pos);
		ray_pos+=dist*ray_dir;

		if(abs(dist)<0.001) { i=float(j); break; }
	}

	vec3 normal=normalize(gradient(ray_pos));

	float ao=1.0-i/float(Iterations);
	float what=pow(max(0.0,dot(normal,-ray_dir)),2.0);
	float light=ao*what*1.4;

	float z=ray_pos.z/2.0;
//	vec3 col=(sin(vec3(z,z+pi/3.0,z+pi*2.0/3.0))+2.0)/3.0;
	vec3 col=(cos(ray_pos/2.0)+2.0)/3.0;

	vec3 reflected=reflect(ray_dir,normal);

	fragColor=vec4(col*light+0.1,1.0);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	const float pi=3.141592;

	vec2 coords=(2.0*fragCoord.xy-iResolution.xy)/length(iResolution.xy);

	float a=iTime/3.0;
	mat3 m=mat3(
	0.0,1.0,0.0,
	-sin(a),0.0,cos(a),
	cos(a),0.0,sin(a));
	m*=m;
	m*=m;

	vec3 ray_dir=m*normalize(vec3(1.4*coords,-1.0+Fisheye*(coords.x*coords.x+coords.y*coords.y)));
//	vec3 ray_dir=m*normalize(vec3(2.0*coords,-1.0+dot(coords,coords)));


	float t=iTime/3.0;
	vec3 ray_pos=vec3(
    2.0*(sin(t+sin(2.0*t)/2.0)/2.0+0.5),
    2.0*(sin(t-sin(2.0*t)/2.0-pi/2.0)/2.0+0.5),
    2.0*((-2.0*(t-sin(4.0*t)/4.0)/pi)+0.5+0.5));

    mainVR(fragColor,fragCoord,ray_pos,ray_dir);

   	float vignette=pow(1.0-length(coords),0.3);
	fragColor.xyz*=vec3(vignette);
}
`,

Simple: `void mainImage( out vec4 O,  vec2 U ){
    U = 2.* sin (25.*U/iResolution.x);
    O = .5 + .5* sin( U.x+U.y + vec4(0,2.4,-2.4,0) +iTime);
}`,

SnakeWave: `void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.y;
    float dt = sin(uv.x *20. + iTime);
    float circle = (cos(mod(uv.x * 32.0, 3.14) - 1.58) *0.5) *(sin(mod(uv.y * 32.0, 3.14)) *0.5) * (1.-dt);
    fragColor = vec4(12.0,4.0,2.0,1.0) * circle;
}`,

Rosace3: `

// https://www.shadertoy.com/view/ls3XWM
/**/ // 215 chars   - with tomkh's help

#define d  O += .1*(1.+cos(A= 2.33*a + iTime)) / length(vec2( fract(a*8.)-.5, 16.*length(U)-3.2*sin(A)-8.)); a += 6.3;


void mainImage( out vec4 O, vec2 U )
{

    U = (U+U-(O.xy=iResolution.xy)) / O.y;
    float a = atan(U.y,U.x), A;

	O -= O;
    d d d
}`,


SmoothVoronoiContours: `
/*

	Smooth Voronoi Contours
	-----------------------

	Using a numerical gradient to produce smooth "fract" contours on 2D Voronoi.

	Shadertoy user "drone1" was kind enough to help me problem shoot some AA code
	yesterday on an image similar to this one, but I wanted to produce it without
	AA for realtime usage. There might be better methods, but this is the one I
	chose. It's partly based off of IQ's "Ellipse - Distance Estimation" example.

	If you press pause, you should notice that the contour lines are smooth and
	precise, regardless of the shape of the curve.

	For anyone wondering, the weird abstract image is just an amalgamation of two
	layers of smooth 2D Voronoi and an old concentric circle trick. In pseudo code:

	float val = Vor(p*freq)*A1 + Vor(p*freq*3.)*A2;
	val = clamp(cos(val*freq2*PI)*contrast, 0., 1.);

    See IQ's distance estimation example for a good explanation regarding the
	gradient related contour snippet:

    Ellipse - Distance Estimation - https://www.shadertoy.com/view/MdfGWn
    There's an accompanying articles, which is really insightful here:
    http://www.iquilezles.org/www/articles/distance/distance.htm

	Another example using the technique.
	2D Noise Contours - Shane
	https://www.shadertoy.com/view/XdcGzB

*/

// Glossy version. It's there to show that the method works with raised surfaces too.
//#define GLOSSY

// Standard 2x2 hash algorithm.
vec2 hash22(vec2 p) {

    // Faster, but probaly doesn't disperse things as nicely as other methods.
    float n = sin(dot(p, vec2(41, 289)));
    p = fract(vec2(2097152, 262144)*n);
    return cos(p*6.283 + iTime)*.5;
    //return abs(fract(p+ iTime*.25)-.5)*2. - .5; // Snooker.
    //return abs(cos(p*6.283 + iTime))*.5; // Bounce.

}

// Smooth Voronoi. I'm not sure who came up with the original, but I think IQ
// was behind this particular algorithm. It's just like the regular Voronoi
// algorithm, but instead of determining the minimum distance, you accumulate
// values - analogous to adding metaball field values. The result is a nice
// smooth pattern. The "falloff" variable is a smoothing factor of sorts.
//
float smoothVoronoi(vec2 p, float falloff) {

    vec2 ip = floor(p); p -= ip;

	float d = 1., res = 0.0;

	for(int i = -1; i <= 2; i++) {
		for(int j = -1; j <= 2; j++) {

			vec2 b = vec2(i, j);

			vec2 v = b - p + hash22(ip + b);

			d = max(dot(v,v), 1e-4);

			res += 1.0/pow( d, falloff );
		}
	}

	return pow( 1./res, .5/falloff );
}

// 2D function we'll be producing the contours for.
float func2D(vec2 p){


    float d = smoothVoronoi(p*2., 4.)*.66 + smoothVoronoi(p*6., 4.)*.34;

    return sqrt(d);

}

// Smooth fract function. A bit hacky, but it works. Handy for all kinds of things.
// The final value controls the smoothing, so to speak. Common sense dictates that
// tighter curves, require more blur, and straighter curves require less. The way
// you do that is by passing in the function's curve-related value, which in this case
// will be the function value divided by the length of the function's gradient.
//
// IQ's distance estimation example will give you more details:
// Ellipse - Distance Estimation - https://www.shadertoy.com/view/MdfGWn
// There's an accompanying article, which is really insightful, here:
// http://www.iquilezles.org/www/articles/distance/distance.htm
float smoothFract(float x, float sf){

    x = fract(x); return min(x, x*(1.-x)*sf);

}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Screen coordinates.
	vec2 uv = (fragCoord.xy-iResolution.xy*.5) / iResolution.y;

    // Standard epsilon, used to determine the numerical gradient.
    vec2 e = vec2(0.001, 0);

    // The 2D function value. In this case, it's a couple of layers of 2D simplex-like noise.
    // In theory, any function should work.
    float f = func2D(uv); // Range [0, 1]

    // Length of the numerical gradient of the function above. Pretty standard. Requires two extra function
    // calls, which isn't too bad.
    float g = length( vec2(f - func2D(uv-e.xy), f - func2D(uv-e.yx)) )/(e.x);

    // Dividing a constant by the length of its gradient. Not quite the same, but related to IQ's
    // distance estimation example: Ellipse - Distance Estimation - https://www.shadertoy.com/view/MdfGWn
    g = 1./max(g, 0.001);

    // This is the crux of the shader. Taking a function value and producing some contours. In this case,
    // there are twelve. If you don't care about aliasing, it's as simple as: c = fract(f*12.);
    // If you do, and who wouldn't, you can use the following method. For a quick explanation, refer to the
    // "smoothFract" function or look up a concetric circle (bullseye) function.
    //
    // For a very good explanation, see IQ's distance estimation example:
    // Ellipse - Distance Estimation - https://www.shadertoy.com/view/MdfGWn
    //
    // There's an accompanying articles, which is really insightful, here:
	// http://www.iquilezles.org/www/articles/distance/distance.htm
    //
    float freq = 12.;
    // Smoothing factor. Hand picked. Ties in with the frequency above. Higher frequencies
    // require a lower value, and vice versa.
    float smoothFactor = iResolution.y*0.0125;

    #ifdef GLOSSY
    float c = smoothFract(f*freq, g*iResolution.y/16.); // Range [0, 1]
    //float c = fract(f*freq); // Aliased version, for comparison.
    #else
    float c = clamp(cos(f*freq*3.14159*2.)*g*smoothFactor, 0., 1.); // Range [0, 1]
    //float c = clamp(cos(f*freq*3.14159*2.)*2., 0., 1.); // Blurry contours, for comparison.
    #endif


    // Coloring.
    //
    // Convert "c" above to the greyscale and green colors.
    vec3 col = vec3(c);
    vec3 col2 = vec3(c*0.64, c, c*c*0.1);

    #ifdef GLOSSY
    col = mix(col, col2, -uv.y + clamp(fract(f*freq*0.5)*2.-1., 0., 1.0));
    #else
    col = mix(col, col2, -uv.y + clamp(cos(f*freq*3.14159)*2., 0., 1.0));
    #endif

    // Color in a couple of thecontours above. Not madatory, but it's pretty simple, and an interesting
    // way to pretty up functions. I use it all the time.
    f = f*freq;

    #ifdef GLOSSY
    if(f>8. && f<9.) col *= vec3(1, 0, .1);
    #else
    if(f>8.5 && f<9.5) col *= vec3(1, 0, .1);
    #endif


	// Since we have the gradient related value, we may as well use it for something. In this case, we're
    // adding a bit of highlighting. It's calculated for the contourless noise, so doesn't match up perfectly,
    // but it's good enough. Comment it out to see the texture on its own.
    #ifdef GLOSSY
    col += g*g*g*vec3(.3, .5, 1)*.25*.25*.25*.1;
    #endif


    //col = c * vec3(g*.25); // Just the function and gradient. Has a plastic wrap feel.

    // Done.
	fragColor = vec4( sqrt(clamp(col, 0., 1.)), 1.0 );

}
`,


Covid19: `
float PI = 3.1415;
float PHI = 1.61803398874989;
const int steps = 16;

float smin( float a, float b, float k )
{
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}
// this function from https://www.shadertoy.com/view/wtSSWh
float n(vec2 u){
    vec4 d=vec4(.106,5.574,7.728,3.994),q=u.xyxy,p=floor(q);
    ++p.zw;
    q-=p;
    p=fract(p*d.xyxy);
    d=p+d.wzwz;
	d=p.xxzz*d.ywyw+p.ywyw*d.xxzz;
    p=fract((p.xxzz+d)*(p.ywyw+d));
    p=cos(p*=iTime+d)*q.xxzz+sin(p)*q.ywyw;
    q*=q*(3.-2.*q);
    p=mix(p,p.zwzw,q.x);
    return mix(p.x,p.y,q.y);
}

// these three functions are from http://mercury.sexy/

// The "Round" variant uses a quarter-circle to join the two objects smoothly:
float fOpUnionRound(float a, float b, float r) {
    vec2 u = max(vec2(r - a,r - b), vec2(0));
    return max(r, min (a, b)) - length(u);
}

float fOpIntersectionRound(float a, float b, float r) {
    vec2 u = max(vec2(r + a,r + b), vec2(0));
    return min(-r, max (a, b)) + length(u);
}

float fOpDifferenceRound (float a, float b, float r) {
    return fOpIntersectionRound(a, -b, r);
}


float virusHead (float p){

    return cos(p);//+ noise(abs(p));
}

float modBlob(inout vec3  p){
        float sz = 0.;
    if (p.x < max(p.y, p.z)){
        p = p.yzx;
        //sz+=.007;
    }
    if (p.x < max(p.y, p.z)){
       // sz-=0.05;
        p = p.yzx;}

    return sz;

}

float bFunct(vec3 p, vec3 savedP){ // this function places nubs around sphere
   return  max(max(max(
        dot(p, normalize(vec3(1., 1, 1))),
        dot(p.xz, normalize(vec2(PHI+1., 1.)))),
        dot(p.yx, normalize(vec2(1., PHI )))),
        dot(p.xz, normalize(vec2(1., PHI ))));

}

float bloby(vec3 p) {
    p = abs(p);
    vec3 savedP = p;
    float sz = 1.3;
    sz += modBlob(p);
    float b = bFunct(p,savedP);
    float l = length(p);

    float nub =(1.01 - b / l)*(PI / .04) - n(savedP.xy*20.);

    float sploops = l - sz - 0.09 * cos(min(nub, (PI)));

    return fOpDifferenceRound (sploops,l-1.38, 0.15); // just ge tthe nubs
}


float virus(vec3 p) {
    vec3 savedP = p;
    p = abs(p);
float sz = 1.2;
 sz += modBlob(p);
    float b = bFunct(p,savedP);

    float l = length(p);
    return l - sz - 0.3 * (3. / 2.)* cos(min(sqrt(1.01 - b / l)*(PI / 0.15), PI )) +( n(savedP.xy*20.) *0.01)+  n(savedP.zy*17.) *0.03;
}
//from http://mercury.sexy/
void pR(inout vec2 p, float a) {
    p = cos(a)*p + sin(a)*vec2(p.y, -p.x);
}

vec2 scene(vec3 ray ){
    float time = iTime;
    float floor = (ray.y + 1.2) -
        cos(ray.x * 10.)* 0.2 - sin(ray.y* 10.);
    float radius = 0.5;


   // ray = mod(ray, modSpace) - 0.5*modSpace;

    ray = ray - vec3(0.,0.,2.0);
    vec3 ray2 = ray;
    vec3 ray3 = ray;

    pR(ray2.yz,time/3. + n((vec2(time/3. ) / 2.)) * 0.2);
    pR(ray3.yz,time/3.);

    vec3 ray4 = mix(ray2,ray3,(sin(time)/5.) + 1.);

    pR(ray4.xz, n(vec2(time/4.) ) );

    pR(ray4.xy, 0.2*n(vec2(time) ) );
    float blob = bloby(ray4);
    float virus = virus(ray4);

    float ret = smin(blob,virus,.8  + (0.08* sin(time))) ;

    return vec2( ret,length(ray4)-0.5) ;//smin(smin(blob, sphere,0.6), sphere2,0.6) ;
}


vec3 estimateNormal(vec3 p) {
    float smallNumber = 0.002;
    vec3 n = vec3(
    scene(vec3(p.x + smallNumber, p.yz)).x -
    scene(vec3(p.x - smallNumber, p.yz)).x,
    scene(vec3(p.x, p.y + smallNumber, p.z)).x -
    scene(vec3(p.x, p.y - smallNumber, p.z)).x,
    scene(vec3(p.xy, p.z + smallNumber)).x -
    scene(vec3(p.xy, p.z - smallNumber)).x );

	return normalize(n);
}

float lighting(vec3 origin, vec3 dir, vec3 normal) {
    vec3 lightPos = vec3(12,12,1);//vec3(cos(time) +12., sin(time), 12.);
    vec3 light = normalize(lightPos - origin);

    float diffuse = max(0., dot(light, normal));
    vec3 reflectedRay = 1.0 * dot(light, normal) * normal - light;

    float specular = max(0., (pow(dot(reflectedRay, light),5.))) * sin(iTime* 3.)* 0.3;

    float ambient = 0.03;

    return ambient + diffuse + specular;

}


vec4 trace(vec3 rayOrigin, vec3 dir){
    vec3 ray = rayOrigin;
    float dist = 0.;

    float totalDist = 0.;
    float maxDist = 3.;
    vec2 holder;
    float redCol;

    for (int i = 0; i < steps ; i++){
        holder = scene(ray);
        dist = holder.x;
        redCol = holder.y;

        if(dist < 00.04){
            vec4 distCol = vec4(1. - vec4(totalDist/maxDist));
            vec4 lightingCol = vec4(lighting(rayOrigin,dir,estimateNormal(ray)));
            vec4 col = lightingCol + vec4(pow(redCol,4.),0,0,0);//+ vec4(length(vec3(pow(length(ray),1.)))*0.3,0,0,0);//mix(lightingCol , vec4(distCol),distCol.x);

            return col;
        }
        totalDist += dist;
        ray += dist * dir;
        if (totalDist > maxDist){
            break;

        }
    }


    return vec4(n(rayOrigin.xy*2.0) * (1.6-length(rayOrigin.xy)));
}
vec3 lookAt(vec2 uv, vec3 camOrigin, vec3 camTarget){
	vec3 zAxis = normalize(camTarget - camOrigin);
	vec3 up = vec3(0,1,0);
	vec3 xAxis = normalize(cross(up, zAxis));
	vec3 yAxis = normalize(cross(zAxis, xAxis));

	float fov = 2.;

	vec3 dir = (normalize(uv.x * xAxis + uv.y * yAxis + zAxis * fov));

	return dir;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float time = iTime;
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
	uv = (uv *2.)-1.;

    uv.x *= iResolution.x/iResolution.y;
    vec3 rayOrigin = vec3(uv.x + n(vec2(time))*0.05,uv.y + n(vec2(time/3.))*0.03, 0.); // TODO make it so that the bg moves more than the foreground so it looks like the fbm is far away
    vec3 camOrigin = vec3(0, 0., -1.);

    vec3 camTarget = camOrigin+ vec3(sin(time/10.),cos(time/10.), 2);

    vec3 direction = lookAt(uv, camOrigin, camTarget);


    fragColor = (trace(rayOrigin, direction));
}`,

MetricGrid: `void mainImage( out vec4 fragColor, in vec2 fragCoord )
{

    float cx = ceil(iResolution.x / 2.0);
    float cy = ceil(iResolution.y / 2.0);

    float x = fragCoord.x - cx;
    float y = fragCoord.y - cy;

    vec4 background = vec4(vec3(0.129, 0.168, 0.2), 1.0);

    // ======= Lines + Bold lines
    background.xyz += step(1.0 - 1.0 / 100.0, fract(x / 10.0)) * 0.1;
    background.xyz += step(1.0 - 1.0 / 500.0, fract(x / 50.0)) * 0.2;

    background.xyz += step(1.0 - 1.0 / 100.0, fract(y / 10.0)) * 0.1;
    background.xyz += step(1.0 - 1.0 / 500.0, fract(y / 50.0)) * 0.2;

    // ======= AXES
    float xb = step(abs(x) - 0.5, 0.0);
    float yb = step(abs(y) - 0.5, 0.0);
    background.rgb = mix(background.rgb, vec3(0.964, 0.447, 0.443), (xb));
    background.rgb = mix(background.rgb, vec3(0.341, 0.8, 0.560), (yb));

    // ======= CENTER
    float cb = (1.0 - step(0.0, abs(x) - 2.5)) * (1.0 - step(0.0, abs(y) - 2.5));
    background.rgb = mix(background.rgb, vec3(1.0, 1.0, 1.0), cb);

    fragColor = background;
}`,

PrettyGrid: `////////////////////////////////
//
// Pretty Grid by Timo Kinnunen 2017
//
// Drag up/down to zoom.
//
// Based loosely on distance meter by cupe
// @ https://www.shadertoy.com/view/ldK3zD
//
// This shader is licensed under
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// [ http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US ].
//

//#define MINUS

const float TAU = 2.* 3.1415926535897932384626433832795;
const float grid4 = 2097152.0,grid3 = 131072.0,grid2 = 1024.0,grid1 = 64.0;

vec4 grid(vec2 f, vec3 pos, float rdy, float t) {
    float ff = min(iResolution.x,iResolution.y)/1024.0;
	vec4 distances = (abs(pos.xz)* TAU).xxyy;
	float referenceBase = log(20.*ff/ (t* pow(abs(rdy),.8)))/ log(10.);
	float nearestBase = floor(referenceBase);
	float partialBase = fract(referenceBase);
	const vec4 gain = vec4(grid4- grid3,grid1,grid3- grid2,grid2- grid1);
	const vec4 off = vec4(grid3,0,grid2,grid1);
	vec4 exponentialBase = partialBase* partialBase* gain+ off;
	vec4 bases = pow(vec4(10),nearestBase+ vec4(-2,1,-1,0));
	vec4 lx = pow(.5+ .5* cos(distances* bases.xyxy),exponentialBase.xyxy);
	vec4 ly = pow(.5+ .5* cos(distances* bases.zwzw),exponentialBase.zwzw);
	vec4 l4 = (1.- lx* vec4(1.- partialBase,partialBase,1.- partialBase,partialBase))* (1.- ly);
	vec2 l2 = l4.xy* l4.zw;
	float l1 = .30078125* (1.- l2.x* l2.y);
#ifdef MINUS
    l1 = -l1;
#endif
	return vec4(vec3(f.x/ iResolution.x,.5,f.y/ iResolution.y)+ l1,1);
}
vec4 mainImageGrid(vec2 f) {
	float rcpResY = 1./ iResolution.y;
	vec2 uv = 2.0* rcpResY* f- vec2(iResolution.x* rcpResY,1);
	vec3 ro = vec3(0,exp2(128.* (sin(iTime* .002)+ step(10.,iMouse.x)*(2.* rcpResY* iMouse.y- 1.))),0);
	vec3 rd = normalize(vec3(uv.x,-1,uv.y));
	float t = ro.y/ -rd.y;
	vec3 pos = ro+ t* rd;
	return grid(f,pos,rd.y,t);
}
void mainImage(out vec4 fragColor, vec2 fragCoord) {
	fragColor = mainImageGrid(fragCoord);
}`,


HexagonalInterlacing : `/*

	Hexagonal Interlacing
	---------------------

    If you're interested in graphics, then I'll assume you've seen the countless faux
	3D interlaced-looking patterns on the internet. Recently, BigWings released a really
	cool hexagonal weave pattern, which was pieced together with a bunch of repeat
	hexagonal Truchet tiles constructed with combinations of overlapping arcs and
	lines -- I've provided a link below, for anyone who's interested.

	Anyway, this is a very basic interlaced hexagonal pattern, and is representative of
	many other variations you come across on the net. I threw it together on the fly,
    and without a great deal of forethought, so I wouldn't take the code too seriously.
	It works fine and runs fine, but there'd be better ways to go about it.

	To produce the pattern, set up a hexagonal grid, render a three pronged shape over
	another three pronged shape rotated at 60 degrees, then randomly flip tiles. If you
	know how to render a thick line over another, then it should be pretty simple.

	The pattern has been rendered in an oldschool Photoshop vector-graphics style --
	Overlays with contour lines, drop shadows, beveling, etc, and faux lighting. In case
	it isn't obvious, the lighting is completely fake. There's no physical lighting setup
	whatever, which means no diffuse calculations, attenuation, bumpmapping, etc.

	That's three hexagon examples in row, so I'm a bit hexagoned out, but I'll put up a
	proper 3D example later. By the way, it'd be great to see other repeat patterns --
	interlaced or otherwise -- produced on Shadertoy.


	Other interlaced pattern examples:

	Hexagonal Truchet Weaving - BigWIngs
	https://www.shadertoy.com/view/llByzz

	// Fabrice has a heap of overlapping tile examples that are fun to watch. This is
	// one of them.
	canvas2 - FabriceNeyret2
	https://www.shadertoy.com/view/4dSXWR

	Starter references:

	// You can't do a hexagonal grid example without referencing this. :) Very stylish.
	Hexagons - distance - iq
	https://www.shadertoy.com/view/Xd2GR3


	// Simpler hexagonal grid example that attempts to explain the grid setup used to produce
	// the pattern here.
	//
	Minimal Hexagonal Grid - Shane
	https://www.shadertoy.com/view/Xljczw

*/




// Standard 2D rotation formula.
mat2 r2(in float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// Standard vec2 to float hash - Based on IQ's original.
float hash21(vec2 p){ return fract(sin(dot(p, vec2(141.213, 289.847)))*43758.5453); }


// Helper vector. If you're doing anything that involves regular triangles or hexagons, the
// 30-60-90 triangle will be involved in some way, which has sides of 1, sqrt(3) and 2.
const vec2 s = vec2(3, 1.7320508);


// The 2D hexagonal isosuface function: If you were to render a horizontal line and one that
// slopes at 60 degrees, then combine them, you'd arrive at the following.
float hex(in vec2 p){

    p = abs(p);

    // Below is equivalent to:
    //return max(p.y*.5 + p.x*.866025, p.y);

    return max(dot(p, s*.5), p.y); // Hexagon.

}

// This function returns the hexagonal grid coordinate for the grid cell, and the corresponding
// hexagon cell ID - in the form of the central hexagonal point. That's basically all you need to
// produce a hexagonal grid.
//
// When working with 2D, I guess it's not that important to streamline this particular function.
// However, if you need to raymarch a hexagonal grid, the number of operations tend to matter.
// This one has minimal setup, one "floor" call, a couple of "dot" calls, a ternary operator, etc.
// To use it to raymarch, you'd have to double up on everything - in order to deal with
// overlapping fields from neighboring cells, so the fewer operations the better.
vec4 getHex(vec2 p){

    // The hexagon centers: Two sets of repeat hexagons are required to fill in the space, and
    // the two sets are stored in a "vec4" in order to group some calculations together. The hexagon
    // center we'll eventually use will depend upon which is closest to the current point. Since
    // the central hexagon point is unique, it doubles as the unique hexagon ID.
    vec4 hC = floor(vec4(p, p - vec2(1.7320508, .866025))/s.xyxy) + .5;

    // Centering the coordinates with the hexagon centers above.
    vec4 h = vec4(p - hC.xy*s, p - (hC.zw + .5)*s);

    // Nearest hexagon center (with respect to p) to the current point. In other words, when
    // "h.xy" is zero, we're at the center. We're also returning the corresponding hexagon ID -
    // in the form of the hexagonal central point. Note that a random constant has been added to
    // "hC.zw" to further distinguish it from "hC.xy."
    //
    // On a side note, I sometimes compare hex distances, but I noticed that Iomateron compared
    // the Euclidian version, which seems neater, so I've adopted that.
    return dot(h.xy, h.xy)<dot(h.zw, h.zw) ? vec4(h.xy, hC.xy) : vec4(h.zw, hC.zw + vec2(1.7320508, .866025));

    //hp = h.xy;

    //return vec4(h.zw, hex(h.xy), length(h.xy));


}


// The distance function. The simple things are oftne the best, so I'm using circles, but there
// are countless variations to try, so I've left the rough working below, for anyone interested
// in experimenting.
float dist(vec2 p, float r){


    return length(p) - r;

    //float c = length(p);
    //return max(c, -c + 1.) - r;

    //p = r2(3.14159/4.)*p;
    //float c = pow(dot(pow(abs(p), vec2(3)), vec2(1)), 1./3.);
    //return c - r*.9;

    //p = r2(3.14159/4.)*p;
    //float c = pow(dot(pow(abs(p), vec2(3)), vec2(1)), 1./3.);//length(p);
    //return max(c, -c + .97) - r;


    //float c = length(p);
    //p = abs(p);
    //return mix(c, max(p.x*.866025 + p.y*.5, p.y), .35) - r*.95;
    //return min(c, max(p.x, p.y) + .125) - r;
    //p = r2(3.14159/24.)*p;
    //return min(c, max(p.x, p.y) + .16) - r;

    //return max(c, -c + 1.) - r;
    //p = r2(3.14159/6.)*p;
    //return max(c, max(abs(p.x)*.866 - p.y*.5, p.y) + .25) - r;


    //p = abs(p);
    //return max(p.x*.866025 + p.y*.5, p.y) - r*.9;
    //p = r2(3.14159/6.)*p;
    //return max(max(p.x, p.y), (p.x + p.y)*.75) - r;
    //return min(max(p.x, p.y), (p.x + p.y)*.7) - r*.7;

}

///
// vec2 to vec2 hash.
vec2 hash22(vec2 p) {

    // Faster, but doesn't disperse things quite as nicely. However, when framerate
    // is an issue, and it often is, this is a good one to use. Basically, it's a tweaked
    // amalgamation I put together, based on a couple of other random algorithms I've
    // seen around... so use it with caution, because I make a tonne of mistakes. :)
    float n = sin(dot(p, vec2(41, 289)));
    //return fract(vec2(262144, 32768)*n);

    // Animated.
    p = fract(vec2(262144, 32768)*n);
    // Note the ".333," insted of ".5" that you'd expect to see. When edging, it can open
    // up the cells ever so slightly for a more even spread. In fact, lower numbers work
    // even better, but then the random movement would become too restricted. Zero would
    // give you square cells.
    return sin( p*6.2831853 + iTime)*.333 + .333;
    //return sin( p*6.2831853 + iTime*2.)*(cos( p*6.2831853 + iTime*.5)*.3 + .5)*.45 + .5;

}

// IQ's smooth minimum function.
float smin(float a, float b, float k){

    float h = clamp(.5 + .5*(b - a)/k, 0., 1.);
    return mix(b, a, h) - k*h*(1. - h);
}

// IQ's exponential-based smooth minimum function. Unlike the polynomial-based
// smooth minimum, this one is commutative.
float sminExp(float a, float b, float k)
{
    float res = exp(-k*a) + exp(-k*b);
    return -log(res)/k;
}


// 2D 2nd-order Voronoi: Obviously, this is just a rehash of IQ's original. I've tidied
// up those if-statements. Since there's less writing, it should go faster. That's how
// it works, right? :)
//
// This is exactly like a regular Voronoi function, with the exception of the smooth
// distance metrics.
float Voronoi(in vec2 p){

    // Partitioning the grid into unit squares and determining the fractional position.
	vec2 g = floor(p), o; p -= g;

    // "d.x" and "d.y" represent the closest and second closest distances
    // respectively, and "d.z" holds the distance comparison value.
	vec3 d = vec3(2); // 8., 2, 1.4, etc.

    // A 4x4 grid sample is required for the smooth minimum version.
	for(int j = -1; j <= 2; j++){
		for(int i = -1; i <= 2; i++){

			o = vec2(i, j); // Grid reference.
             // Note the offset distance restriction in the hash function.
            o += hash22(g + o) - p; // Current position to offset point vector.

            // Distance metric. Unfortunately, the Euclidean distance needs
            // to be used for clean equidistant-looking cell border lines.
            // Having said that, there might be a way around it, but this isn't
            // a GPU intensive example, so I'm sure it'll be fine.
			d.z = length(o);

            // Up until this point, it's been a regular Voronoi example. The only
            // difference here is the the mild smooth minimum's to round things
            // off a bit. Replace with regular mimimum functions and it goes back
            // to a regular second order Voronoi example.
            d.y = max(d.x, smin(d.y, d.z, .4)); // Second closest point with smoothing factor.
            d.x = smin(d.x, d.z, .2); // Closest point with smoothing factor.

            // Based on IQ's suggestion - A commutative exponential-based smooth minimum.
            // This algorithm is just an approximation, so it doesn't make much of a difference,
            // but it's here anyway.
            //d.y = max(d.x, sminExp(d.y, d.z, 10.)); // Second closest point with smoothing factor.
            //d.x = sminExp(d.x, d.z, 20.); // Closest point with smoothing factor.


		}
	}

    // Return the regular second closest minus closest (F2 - F1) distance.
    return d.y - d.x;

}

////

// Cheap and nasty 2D smooth noise function with inbuilt hash function - based on IQ's
// original. Very trimmed down. In fact, I probably went a little overboard. I think it
// might also degrade with large time values. I'll swap it for something more robust later.
float n2D(vec2 p) {

	vec2 i = floor(p); p -= i; p *= p*(3. - p*2.);

	return dot(mat2(fract(sin(vec4(0, 1, 113, 114) + dot(i, vec2(1, 113)))*43758.5453))*
                vec2(1. - p.y, p.y), vec2(1. - p.x, p.x) );

}

// Approximating - very roughly - the metallic Shadertoy texture. I handcoded this to
// keep algorithmic art purists - like Dr2 - happy. :)
vec3 tex(in vec2 p){

    float ns = n2D(p)*.57 + n2D(p*2.)*.28 + n2D(p*4.)*.15;

    // Some fBm noise based bluish red coloring.
    vec3 n = mix(vec3(.33, .11, .022), vec3(.385, .55, .715), ns);
    n *= mix(vec3(1, .9, .8), vec3(0, .1, .2), n2D(p*32.))*.6 + .4;

    //n =  n*.3 + min(n.zyx*vec3(1.3, .6, .2)*.75, 1.)*.7;

    return clamp(n, 0., 1.);

}


void mainImage( out vec4 fragColor, in vec2 fragCoord ){

    // Scaled, moving screen coordinates.
    float res = clamp(iResolution.y, 300., 750.);
	vec2 uv = (fragCoord - iResolution.xy*.5)/res*5.;

    // Movement.
    uv += vec2(1, .25)*iTime;

    // HEXAGONAL GRID CONVERSION.
    //
    // Obtain the hexagonal grid information.
    vec4 hp = getHex(uv);

    // Distance from the pixel to the hexagonal center.
    float cDist = length(hp.xy);

    // Random tile ID.
    float rnd = fract(sin(dot(hp.zw, vec2(41.13, 289.97)))*43758.5453);
    //rnd = mod(floor(hp.x + hp.y), 2.);


    // Comment this out and you'll see two nontangled hexagonal grids.
    if(rnd>.5) hp.x = -hp.x; // Has the same effect as rotating by 60 degrees.

    // Saving the grid coordinates in "p" to save some writing.
    vec2 p = hp.xy;

    // TILE CONSTRUCTION.
    //
    // Creating the hexagonal tile. Partition the hexagon into three sections,
    // then subtract circles from the edges. That will creat one three pronged
    // fan looking object. Create another one rotated at 60 degrees to the
    // other, then render one over the other. The weaving illusion is created
    // when you randomly flip tiles.
    //
    //
    // Three pronged object one.
    float rad1 = 1.;
    float rad2 = .66; // Hole radius.
    //float rad2 = .525*(sin(iTime/2.)*.25 + 1.2); // Animated. Shows Truchet relationship.

    // Contruct three circular holes - equispaced around the hexagonal boundary.
    const float aNum = 3.;
    float ia = floor(atan(p.y, p.x)/6.283*aNum) + .5;

    p = r2(ia*6.283/aNum)*p; // Converting to polar coordinates: p.x = radius, p.y = angle.
    p.x -= rad1; // Moving the radial coordinate out to the radius of the arc.

    // Mask and distance field.
    float mask = dist(p, rad2);
    float d = max(-mask, mask - .05);


    // Three pronged object two.
    p = hp.xy;
    p = r2(-3.14159/3.)*p; // Rotate by 60 degrees.

    ia = floor(atan(p.y, p.x)/6.283*aNum) + .5;

    p = r2(ia*6.283/aNum)*p; // Converting to polar coordinates: p.x = radius, p.y = angle.
    p.x -= rad1; // Moving the radial coordinate out to the radius of the arc.

    // Mask and distance field for the second object. Note the extra mask step.
    float mask2 = dist(p, rad2);
    float d2 = max(-mask2, mask2 - .05);
    d2 = max(d2, mask - .05);

    // Overlapped shadow object. There'd be a few ways to go about it, but this'll do.
    float sh  = cDist - .4;
    sh = max(sh, smoothstep(0., .01, mask)); // Taking the top layer from the mask;
    sh = max(sh, -mask);


    // Combine the three pronged objects to for the  lattice.
    d = min(d, d2);

    // The lattice mask. Constructed with the over and under lattices.
    mask = max(mask, mask2);


    // RENDERING.
    //
    // A concentric geometric pattern. Part science, part trial and error.
    vec3 pat = mix(vec3(1), vec3(0), (1. - clamp(sin(cDist*3.14159*12.)*4. + 3.95, 0., 1.))*.7);
    pat = min(pat, mix(vec3(1), vec3(0), (1. - clamp(sin(cDist*3.14159*12./3.)*4. + 3., 0., 1.))*.3));


    // The background. Starting with the pattern above, then adding color and shadows.
    vec3 bg = mix(vec3(1), vec3(0), pat);
    vec3 red = mix(vec3(1, .1, .2), vec3(1, .2, .4), dot(sin(uv*3.14159 + cos(uv.yx*3.14159)*3.14159), vec2(.25)) + .5);
    float shMsk = max(mask,  -mask - .075);
    bg = mix(bg, vec3(0), (1. - smoothstep(0., .05, shMsk))*.75)*red*3.;

    bg += mix(vec3(1), red.yzx, .5)*bg*smoothstep(0., .3, Voronoi(uv*1.5 - vec2(1, .25)*iTime*.5) - .25)*3.;

    // Lamest lighting and environmental mapping ever. Applying a moving Voronoi pattern to the
    // background. I've added a little more to the interweaved lattice object (further down) too.
    // More light is being applied to the background to give the impression that it's somehow made
    // of shinier stuff... That was the idea anyway. :)
    float vor = Voronoi(uv*1.5 - vec2(1, .25)*iTime*.5);
    bg += mix(vec3(1), red.yzx, .5)*bg*smoothstep(0., .05, vor - .25)*.5;



    // Lattice color with patterned decoration.
    vec3 latCol = vec3(1)*pat;

    // A bit of whitish edging. I made a lot of this up as I went along.
    latCol = mix(latCol, vec3(1), smoothstep(0., .05, -(d - .09))*.9);

    // Applying the overlayed lattice to the background, then applying some texturing. By the way,
    // the texture is a very rough handcoded representation of the metallic texture on Shadertoy.
    // I kept the example "resource free" to keep the algorithmic art purists - like Dr2 - happy. :)
    vec3 tx = tex(uv*1.);
    tx = smoothstep(0.05, .5, tx);
    tx *= vec3(.8, 1, 1.2);

    vec3 col = mix(bg, latCol, smoothstep(0., .01, mask))*mix(tx, vec3(1.25), .5);


    // Haphazard sinusoidal overlay to give the impression that some extra lighting is happening.
    // No science - It's there to make the structure look more shiny. :)
    col *= mix(vec3(1.1), vec3(.7), dot(sin(uv*3.14159 - cos(uv.yx*3.14159)*3.14159), vec2(.25)) + .5);


    // More depth... thrown in as an afterthought.
    col = mix(col, vec3(0), (1. - smoothstep(0., .2, d))*.35);

    // Edge lines.
    col = mix(col, vec3(cDist/32.), (1. - smoothstep(0., .01, d - .03))); // Edge line depth.
    col = mix(col, vec3(.2), (1. - smoothstep(0., .01, d))*.9); // Edge lines.
    col = mix(col, vec3(0), (1. - smoothstep(0., .05, d))*.35); // Softer structure shadows.


 	// Using the distance field to add a bit of shine.
    float shine = smoothstep(0., .075, d - .15);
 	col += col*vec3(.5, .7, 1)*shine*.5;


    // Shadow for the overlapped sections to give a bit of fake depth.
    col = mix(col, vec3(0), (1. - smoothstep(0., .5, sh))*.9);



    // Lamest lighting and environmental mapping ever. :)
    col += mix(vec3(1), red.yzx, .5)*col*smoothstep(0., .35, vor - .25)*.5;




    // Subtle vignette.
    uv = fragCoord/iResolution.xy;
    col *= pow(16.*uv.x*uv.y*(1. - uv.x)*(1. - uv.y) , .125);
    // Colored variation.
    //col = mix(pow(min(vec3(1.5, 1, 1).zyx*col, 1.), vec3(1, 3, 16)), col,
             //pow(16.*uv.x*uv.y*(1. - uv.x)*(1. - uv.y) , .125));



    // Rough gamma correction.
    fragColor = vec4(sqrt(clamp(col, 0., 1.)), 1);
}`,

TriangleGridContouring: `/*


	Triangle Grid Contouring
	------------------------

	Using a 2D simplex grid to construct the isolines of a 2D field function, namely
    gradient noise. I'm not entirely sure what to call the process. Since it's the
	triangular version of the marching squares algorithm, you'd think it'd be called
	"marching triangles," but that term is used to describe grid point cloud related
    triangulation. Therefore, "triangle grid contouring" will do. :)

	I've been coding up some Wang tile related patterns on square grids lately, which got
	me thinking about attempting the same on a triangle grid. Whilst doing that, I got
	sidetracked and wondered what contour lines created with the triangular equivalent of
	a marching squares algorithm would look like, and here we are. :)

    I put this together for novelty purposes, but I'd imagine there'd be some practical
	aspects associated with it; Vector contour point lists would be an obvious one, and
	to a lesser extent, triangulated height maps. However, rendering smooth curves would
	be one of the main benefits. Only one unique linear interpolant is rendered through
	each triangle, which means that Bezier point information via neighboring triangles
	with shared edges would be easy to obtain.... I might demonstrate that at a later
	date, but for now, a novel proof of concept will do.


*/

// If you were rendering from a vertex shader, or just pushing out a triangle list
// general, then you'd need to triangulate the triangles that have been split into
// quads. The process is almost trivial with just one contour, and slightly more
// involved with two, but not too difficult. Anyway, here's a visual representation.
// Aesthetically, I kind of like it, but it's a little busy, so is off by default.
//#define TRIANGULATE_CONTOURS

// Filling the cells with a concentric triangle pattern. I couldn't decide whether
// to include it, or not, so it's here as an option.
#define TRIANGLE_PATTERN

// Render green grass on the terrain. Uncommented leaves dry terrain.
#define GRASS

// Standard 2D rotation formula.
mat2 rot2(in float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


// Standard vec2 to float hash - Based on IQ's original.
float hash21(vec2 p){ return fract(sin(dot(p, vec2(141.13, 289.97)))*43758.5453); }


// vec2 to vec2 hash.
vec2 hash22(vec2 p) {

    // Faster, but doesn't disperse things quite as nicely. However, when framerate
    // is an issue, and it often is, this is a good one to use. Basically, it's a tweaked
    // amalgamation I put together, based on a couple of other random algorithms I've
    // seen around... so use it with caution, because I make a tonne of mistakes. :)
    float n = sin(dot(p, vec2(41, 289)));
    //return fract(vec2(262144, 32768)*n)*2. - 1.;

    // Animated.
    p = fract(vec2(262144, 32768)*n);
    return sin(p*6.2831853 + iTime);

}


// Based on IQ's gradient noise formula.
float n2D3G( in vec2 p ){

    vec2 i = floor(p); p -= i;

    vec4 v;
    v.x = dot(hash22(i), p);
    v.y = dot(hash22(i + vec2(1, 0)), p - vec2(1, 0));
    v.z = dot(hash22(i + vec2(0, 1)), p - vec2(0, 1));
    v.w = dot(hash22(i + 1.), p - 1.);

#if 1
    // Quintic interpolation.
    p = p*p*p*(p*(p*6. - 15.) + 10.);
#else
    // Cubic interpolation.
    p = p*p*(3. - 2.*p);
#endif

    return mix(mix(v.x, v.y, p.x), mix(v.z, v.w, p.x), p.y);
    //return v.x + p.x*(v.y - v.x) + p.y*(v.z - v.x) + p.x*p.y*(v.x - v.y - v.z + v.w);
}


// The isofunction. Just a single noise function, but it can be more elaborate.
float isoFunction(in vec2 p){ return n2D3G(p/4. + .07); }


// Unsigned distance to the segment joining "a" and "b".
float distLine(vec2 a, vec2 b){


	b = a - b;
	float h = clamp(dot(a, b)/dot(b, b), 0., 1.);
    return length(a - b*h);
}


// Based on IQ's signed distance to the segment joining "a" and "b".
float distEdge(vec2 a, vec2 b){

    //if(abs(dot(a, a) - dot(b, b))>1e-5)



    return dot((a + b)*.5, normalize((b - a).yx*vec2(-1, 1)) );
    //else return 1e5;

}



// Interpolating along the edge connecting vertices v1 and v2 with respect to the isovalue.
vec2 inter(in vec2 p1, in vec2 p2, float v1, float v2, float isovalue){

    // The interpolated point will fall somewhere between the vertex points p1 and p2.
    // Obviously if the isovalue is closer to p1, then the interpolated point will be
    // closer to p1, and vice versa.
    //
    // If you're wondering about the weird numerical hacks on the end, it's a fudge keep the
    // lines away from the triangle edges. Because this is a per grid cell implementation,
    // there's neighboring cell overlap to deal with, which basically means rendering more
    // cells. Typically, that's not particularly difficult to deal with, but can be slower.
    // Either way, I wanted to keep things simple... and I'm lazy. Hence, the fugde. :)
    return mix(p1, p2, (isovalue - v1)/(v2 - v1)*.75 + .25/2.);

    // The mix bit -- without the numberical hacks -- is equivalent to:
    //return p1 + (isovalue - v1)/(v2 - v1)*(p2 - p1);

    // This is probably more correct, but we seem to be getting away with the line above.
    //float inter = v1 == v2 ? .5 : (isovalue - v1) /(v2 - v1);
    //return mix(p1, p2, inter);
}

// Isoline function.
int isoLine(vec3 n3, vec2 ip0, vec2 ip1, vec2 ip2, float isovalue, float i,
          inout vec2 p0, inout vec2 p1){


    // Points where the lines cut the edges.
    p0 = vec2(1e5), p1 = vec2(1e5);

    // Marching triangles.. Is that a thing? Either way, it's similar to marching
    // squares, but with triangles. In other words, obtain the underlying function
    // value at all three vertices of the triangle cell, compare them to the
    // isovalue (over or under), then render a line between the corresponding edges.
    //
    // The line cuts each edge in accordance with the isovalues at each edge, which
    // means interpolating between the two.

    // Bitwise accumulation to produce a unique index number upon which to make
    // decisions. It's a pretty standard technique.
    //
    // Minumum threshold value... It's an ID, of sorts.
    int iTh = 0;
    //
    // If the first vertex is over the isovalue threshold, add four, etc.
    if(n3.x>isovalue) iTh += 4;
    if(n3.y>isovalue) iTh += 2;
    if(n3.z>isovalue) iTh += 1;


    // A value of 1 or 6 means constructing a line between the
    // second and third edges, and so forth.
    if(iTh == 1 || iTh == 6){ // 12-20

        p0 = inter(ip1, ip2, n3.y, n3.z, isovalue); // Edge two.
        p1 = inter(ip2, ip0, n3.z, n3.x, isovalue); // Edge three.

    }
    else if(iTh == 2 || iTh == 5){ // 01-12

        p0 = inter(ip0, ip1, n3.x, n3.y, isovalue); // Edge one.
        p1 = inter(ip1, ip2, n3.y, n3.z, isovalue); // Edge two.

    }
    else if(iTh == 3 || iTh == 4){ // 01-20

        p0 = inter(ip0, ip1, n3.x, n3.y, isovalue); // Edge one.
        p1 = inter(ip2, ip0, n3.z, n3.x, isovalue); // Edge three.

    }


    // For the last three cases, we're after the other side of
    // the line, and this is a quick way to do that. Uncomment
    // to see why it's necessary.
    if(iTh>=4 && iTh<=6){ vec2 tmp = p0; p0 = p1; p1 = tmp; }

    // Just to make things more confusing, it's necessary to flip coordinates on
    // alternate triangles, due to the simplex grid triangle configuration. This
    // line basically represents an hour of my life that I won't get back. :D
    if(i == 0.){ vec2 tmp = p0; p0 = p1; p1 = tmp; }


    // Return the ID, which will be used for rendering purposes.
    return iTh;


}

/*
vec3 softLight(vec3 s, vec3 d){

    vec3 a = d - (1. - 2.*s)*d*(1. - d), b = d + (2.*s - 1.)*d*((16.*d - 12.)*d + 3.),
         c = d + (2.*s - 1.)*(sqrt(d) - d);

    return vec3(s.x<.5? a.x : d.x<.25? b.x : c.x, s.y<.5? a.y : d.y<.25? b.y : c.y,
    			s.z<.5? a.z : d.z<.25? b.z : c.z);

}
*/

vec3 simplexContour(vec2 p){



    // Scaling constant.
    const float gSc = 8.;
    p *= gSc;


    // Keeping a copy of the orginal position.
    vec2 oP = p;

    // Wobbling the coordinates, just a touch, in order to give a subtle hand drawn appearance.
    p += vec2(n2D3G(p*3.5), n2D3G(p*3.5 + 7.3))*.015;



    // SIMPLEX GRID SETUP

    vec2 s = floor(p + (p.x + p.y)*.36602540378); // Skew the current point.

    p -= s - (s.x + s.y)*.211324865; // Use it to attain the vector to the base vertex (from p).

    // Determine which triangle we're in. Much easier to visualize than the 3D version.
    float i = p.x < p.y? 1. : 0.; // Apparently, faster than: i = step(p.y, p.x);
    vec2 ioffs = vec2(1. - i, i);

    // Vectors to the other two triangle vertices.
    vec2 ip0 = vec2(0), ip1 = ioffs - .2113248654, ip2 = vec2(.577350269);


    // Centralize everything, so that vec2(0) is in the center of the triangle.
    vec2 ctr = (ip0 + ip1 + ip2)/3.; // Centroid.
    //
    ip0 -= ctr; ip1 -= ctr; ip2 -= ctr; p -= ctr;



    // Take a function value (noise, in this case) at each of the vertices of the
    // individual triangle cell. Each will be compared the isovalue.
    vec3 n3;
    n3.x = isoFunction(s);
    n3.y = isoFunction(s + ioffs);
    n3.z = isoFunction(s + 1.);


    // Various distance field values.
    float d = 1e5, d2 = 1e5, d3 = 1e5, d4 = 1e5, d5 = 1e5;


    // The first contour, which separates the terrain (grass or barren) from the beach.
    float isovalue = 0.;

    // The contour edge points that the line will run between. Each are passed into the
    // function below and calculated.
    vec2 p0, p1;

    // The isoline. The edge values (p0 and p1) are calculated, and the ID is returned.
    int iTh = isoLine(n3, ip0, ip1, ip2, isovalue, i, p0, p1);

    // The minimum distance from the pixel to the line running through the triangle edge
    // points.
    d = min(d, distEdge(p - p0, p - p1));



    //if(iTh == 0) d = 1e5;

    // Totally internal, which means a terrain (grass) hit.
    if(iTh == 7){ // 12-20

        // Triangle.
        //d = min(min(distEdge(p - ip0, p - ip1), distEdge(p - ip1, p - ip2)),
                  //distEdge(p - ip0, p - ip2));

        // Easier just to set the distance to a hit.
        d = 0.;
    }



    // Contour lines.
    d3 = min(d3, distLine((p - p0), (p - p1)));
    // Contour points.
    d4 = min(d4, min(length(p - p0), length(p - p1)));





    // Displaying the 2D simplex grid. Basically, we're rendering lines between
    // each of the three triangular cell vertices to show the outline of the
    // cell edges.
    float tri = min(min(distLine(p - ip0, p - ip1), distLine(p - ip1, p - ip2)),
                  distLine(p - ip2, p - ip0));

    // Adding the triangle grid to the d5 distance field value.
    d5 = min(d5, tri);


    // Dots in the centers of the triangles, for whatever reason. :) Take them out, if
    // you prefer a cleaner look.
    d5 = min(d5, length(p) - .02);

    ////////
    #ifdef TRIANGULATE_CONTOURS
    vec2 oldP0 = p0;
    vec2 oldP1 = p1;

    // Contour triangles: Flagging when the triangle cell contains a contour line, or not.
    float td = (iTh>0 && iTh<7)? 1. : 0.;

    // Subdivide quads on the first contour.
    if(iTh==3 || iTh==5 || iTh==6){

        // Grass (non-beach land) only quads.
        vec2 pt = p0;
        if(i==1.) pt = p1;
        d5 = min(d5, distLine((p - pt), (p - ip0)));
        d5 = min(d5, distLine((p - pt), (p - ip1)));
        d5 = min(d5, distLine((p - pt), (p - ip2)));
    }
    #endif
    ////////


    // The second contour: This one demarcates the beach from the sea.
    isovalue = -.15;

    // The isoline. The edge values (p0 and p1) are calculated, and the ID is returned.
    int iTh2 = isoLine(n3, ip0, ip1, ip2, isovalue, i, p0, p1);

    // The minimum distance from the pixel to the line running through the triangle edge
    // points.
    d2 = min(d2, distEdge(p - p0, p - p1));

    // Make a copy.
    float oldD2 = d2;

    if(iTh2 == 7) d2 = 0.;
    if(iTh == 7) d2 = 1e5;
    d2 = max(d2, -d);


    // Contour lines - 2nd (beach) contour.
    d3 = min(d3, distLine((p - p0), (p - p1)));
    // Contour points - 2nd (beach) contour.
    d4 = min(d4, min(length(p - p0), length(p - p1)));

    d4 -= .075;
    d3 -= .0125;

    ////////
    #ifdef TRIANGULATE_CONTOURS
    // Triangulating the contours.

    // This logic was put in at the last minute, and isn't my finest work. :)
    // It seems to work, but I'd like to tidy it up later.

    // Flagging when the triangle contains a second contour line, or not.
    float td2 = (iTh2>0 && iTh2<7)? 1. : 0.;


    if(td==1. && td2==1.){
        // Both contour lines run through a triangle, so you need to do a little more
        // subdividing.

        // The beach colored quad between the first contour and second contour.
        d5 = min(d5, distLine(p - p0, p - oldP0));
        d5 = min(d5, distLine(p - p0, p - oldP1));
        d5 = min(d5, distLine(p - p1, p - oldP1));

        // The quad between the water and the beach.
        if(oldD2>0.){
            vec2 pt = p0;
            if(i==1.) pt = p1;
            d5 = min(d5, distLine(p - pt, p - ip0));
            d5 = min(d5, distLine(p - pt, p - ip1));
            d5 = min(d5, distLine(p - pt, p - ip2));
        }
    }
    else if(td==1. && td2==0.){

        // One contour line through the triangle.

        // Beach and grass quads.
        vec2 pt = oldP0;
        if(i==1.) pt = oldP1;
        d5 = min(d5, distLine(p - pt, p - ip0));
        d5 = min(d5, distLine(p - pt, p - ip1));
        d5 = min(d5, distLine(p - pt, p - ip2));
    }
    else if(td==0. && td2==1.){

        // One contour line through the triangle.

        // Beach and water quads.
        vec2 pt = p0;
        if(i==1.) pt = p1;
        d5 = min(d5, distLine(p - pt, p - ip0));
        d5 = min(d5, distLine(p - pt, p - ip1));
        d5 = min(d5, distLine(p - pt, p - ip2));
    }

    #endif
    ////////


    // The screen coordinates have been scaled up, so the distance values need to be
    // scaled down.
    d /= gSc;
    d2 /= gSc;
    d3 /= gSc;
    d4 /= gSc;
    d5 /= gSc;



    // Rendering - Coloring.

    // Initial color.
    vec3 col = vec3(1, .85, .6);

    // Smoothing factor.
    float sf = .004;

    // Water.
    if(d>0. && d2>0.) col = vec3(1, 1.8, 3)*.45;
     // Water edging.
    if(d>0.) col = mix(col, vec3(1, 1.85, 3)*.3, (1. - smoothstep(0., sf, d2 - .012)));

    // Beach.
    col = mix(col, vec3(1.1, .85, .6),  (1. - smoothstep(0., sf, d2)));
    // Beach edging.
    col = mix(col, vec3(1.5, .9, .6)*.6, (1. - smoothstep(0., sf, d - .012)));

    #ifdef GRASS
    // Grassy terrain.
    col = mix(col, vec3(1, .8, .6)*vec3(.7, 1., .75)*.95, (1. - smoothstep(0., sf, d)));
    #else
    // Alternate barren terrain.
    col = mix(col, vec3(1, .82, .6)*.95, (1. - smoothstep(0., sf, d)));
    #endif




    // Abstract shading, based on the individual noise height values for each triangle.
    if(d2>0.) col *= (abs(dot(n3, vec3(1)))*1.25 + 1.25)/2.;
    else col *= max(2. - (dot(n3, vec3(1)) + 1.45)/1.25, 0.);

    // More abstract shading.
    //if(iTh!=0) col *= float(iTh)/7.*.5 + .6;
    //else col *= float(3.)/7.*.5 + .75;


    ////////
    #ifdef TRIANGULATE_CONTOURS
    //if(td==1. || td2==1.) col *= vec3(1, .4, .8);
    #endif
    ////////

    ////////
    #ifdef TRIANGLE_PATTERN
    // A concentric triangular pattern.
    float pat = abs(fract(tri*12.5 + .4) - .5)*2.;
    col *= pat*.425 + .75;
    #endif
    ////////




    // Triangle grid overlay.
    col = mix(col, vec3(0), (1. - smoothstep(0., sf, d5))*.95);



    // Lines.
    col = mix(col, vec3(0), (1. - smoothstep(0., sf, d3)));


    // Dots.
    col = mix(col, vec3(0), (1. - smoothstep(0., sf, d4)));
    col = mix(col, vec3(1), (1. - smoothstep(0., sf, d4 + .005)));



    // Rough pencil color overlay... The calculations are rough... Very rough, in fact,
    // since I'm only using a small overlayed portion of it. Flockaroo does a much, much
    // better pencil sketch algorithm here:
    //
    // When Voxels Wed Pixels - Flockaroo
    // https://www.shadertoy.com/view/MsKfRw
    //
    // Anyway, the idea is very simple: Render a layer of noise, stretched out along one
    // of the directions, then mix a similar, but rotated, layer on top. Whilst doing this,
    // compare each layer to it's underlying grey scale value, and take the difference...
    // I probably could have described it better, but hopefully, the code will make it
    // more clear. :)
    //
    // Tweaked to suit the brush stroke size.
    vec2 q = oP*1.5;
    // I always forget this bit. Without it, the grey scale value will be above one,
    // resulting in the extra bright spots not having any hatching over the top.
    col = min(col, 1.);
    // Underlying grey scale pixel value -- Tweaked for contrast and brightness.
    float gr = sqrt(dot(col, vec3(.299, .587, .114)))*1.25;
    // Stretched fBm noise layer.
    float ns = (n2D3G(q*4.*vec2(1./3., 3))*.64 + n2D3G(q*8.*vec2(1./3., 3))*.34)*.5 + .5;
    // Compare it to the underlying grey scale value.
    ns = gr - ns;
    //
    // Repeat the process with a rotated layer.
    q *= rot2(3.14159/3.);
    float ns2 = (n2D3G(q*4.*vec2(1./3., 3))*.64 + n2D3G(q*8.*vec2(1./3., 3))*.34)*.5 + .5;
    ns2 = gr - ns2;
    //
    // Mix the two layers in some way to suit your needs. Flockaroo applied common sense,
    // and used a smooth threshold, which works better than the dumb things I was trying. :)
    ns = smoothstep(0., 1., min(ns, ns2)); // Rough pencil sketch layer.
    //
    // Mix in a small portion of the pencil sketch layer with the clean colored one.
    col = mix(col, col*(ns + .35), .4);
    // Has more of a colored pencil feel.
    //col *= vec3(.8)*ns + .5;
    // Using Photoshop mixes, like screen, overlay, etc, gives more visual options. Here's
    // an example, but there's plenty more. Be sure to uncomment the "softLight" function.
    //col = softLight(col, vec3(ns)*.75);
    // Uncomment this to see the pencil sketch layer only.
    //col = vec3(ns);


    /*
    // Just some line overlays.
    vec2 pt = p;
    float offs = -.5;
    if(i<.5) offs += 2.;//pt.xy = -pt.xy;
    pt = rot2(6.2831/3.)*pt;
    float pat2 = clamp(cos(pt.x*6.2831*14. - offs)*2. + 1.5, 0., 1.);
    col *= pat2*.4 + .8;
    */


    // Cheap paper grain.
    //oP = floor(oP/gSc*1024.);
    //vec3 rn3 = vec3(hash21(oP), hash21(oP + 2.37), hash21(oP + 4.83));
    //col *= .9 + .1*rn3.xyz  + .1*rn3.xxx;


    // Return the simplex weave value.
    return col;


}



void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Screen coordinates. I've put a cap on the fullscreen resolution to stop
    // the pattern looking too blurred out.
	vec2 uv = (fragCoord - iResolution.xy*.5)/min(650., iResolution.y);

    // Position with some scrolling, and screen rotation to level the pattern.
    vec2 p = rot2(3.14159/12.)*uv + vec2(.8660254, .5)*iTime/16.;

    // The simplex grid contour map... or whatever you wish to call it. :)
    vec3 col = simplexContour(p);

    // Subtle vignette.
    uv = fragCoord/iResolution.xy;
    col *= pow(16.*uv.x*uv.y*(1. - uv.x)*(1. - uv.y) , .0625) + .1;
    // Colored variation.
    //col = mix(col.zyx/2., col, pow(16.*uv.x*uv.y*(1. - uv.x)*(1. - uv.y) , .125));


    // Rough gamma correction.
    fragColor = vec4(sqrt(max(col, 0.)), 1);


}`,




MetaExperiment7 : `// Created by Stephane Cuillerdier - Aiekick/2014
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

vec2 uv;
vec2 mo;
float ratio;

float metaline(vec2 p, vec2 o, float thick, vec2 l)
{
    vec2 po = 2.*p+o;
    return thick / dot(po,vec2(l.x,l.y));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float speed = 0.3;
    float t0 = iTime*speed;
    float t1 = sin(t0);
    float t2 = 0.5*t1+0.5;
    float zoom=25.;
    float ratio = iResolution.x/iResolution.y;
	vec2 uv = fragCoord.xy / iResolution.xy*2.-1.;uv.x*=ratio;uv*=zoom;
    //vec2 mo = iMouse.xy / iResolution.xy*2.-1.;mo.x*=ratio;mo*=zoom;

	// cadre
    float thick=0.5;
    float inv=1.;
	float bottom = metaline(uv,vec2(0.,2.)*zoom, thick, vec2(0.0,1.*inv));
	float top = metaline(uv,vec2(0.,-2.)*zoom, thick, vec2(0.0,-1.*inv));
	float left = metaline(uv,vec2(2.*ratio,0.)*zoom, 0.5, vec2(1.*inv,0.0));
	float right = metaline(uv,vec2(-2.*ratio,0.)*zoom, 0.5, vec2(-1.*inv,0.0));
	float rect=bottom+top+left+right;

    // uv / mo
    vec2 uvo = uv;//-mo;
    float phase=1.1;
    float tho = length(uvo)*phase+t1;
    float thop = t0*20.;

    // map spiral
   	uvo+=vec2(tho*cos(tho-1.25*thop),tho*sin(tho-1.15*thop));

    // metaball
    float mbr = 8.;
    float mb = mbr / dot(uvo,uvo);

	//display
    float d0 = mb+rect;

    float d = smoothstep(d0-2.,d0+1.2,1.);

	float r = mix(1./d, d, 1.);
    float g = mix(1./d, d, 3.);
    float b = mix(1./d, d, 5.);
    vec3 c = vec3(r,g,b);

    fragColor.rgb = c;
}`,


IceAndFire: `/* ice and fire, by mattz
   License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

   Demonstrate triangulation of jittered triangular lattice.

*/
const float s3 = 1.7320508075688772;
const float i3 = 0.5773502691896258;

const mat2 tri2cart = mat2(1.0, 0.0, -0.5, 0.5*s3);
const mat2 cart2tri = mat2(1.0, 0.0, i3, 2.0*i3);

//////////////////////////////////////////////////////////////////////
// cosine based palette
// adapted from https://www.shadertoy.com/view/ll2GD3

vec3 pal( in float t ) {

    const vec3 a = vec3(0.5);
    const vec3 b = vec3(0.5);
    const vec3 c = vec3(0.8, 0.8, 0.5);
    const vec3 d = vec3(0, 0.2, 0.5);

    return clamp(a + b*cos( 6.28318*(c*t+d) ), 0.0, 1.0);

}

//////////////////////////////////////////////////////////////////////
// from https://www.shadertoy.com/view/4djSRW

#define HASHSCALE1 .1031
#define HASHSCALE3 vec3(443.897, 441.423, 437.195)

float hash12(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}

vec2 hash23(vec3 p3) {
	p3 = fract(p3 * HASHSCALE3);
    p3 += dot(p3, p3.yzx+19.19);
    return fract((p3.xx+p3.yz)*p3.zy);
}

//////////////////////////////////////////////////////////////////////
// compute barycentric coordinates from point differences
// adapted from https://www.shadertoy.com/view/lslXDf

vec3 bary(vec2 v0, vec2 v1, vec2 v2) {
    float inv_denom = 1.0 / (v0.x * v1.y - v1.x * v0.y);
    float v = (v2.x * v1.y - v1.x * v2.y) * inv_denom;
    float w = (v0.x * v2.y - v2.x * v0.y) * inv_denom;
    float u = 1.0 - v - w;
    return vec3(u,v,w);
}

//////////////////////////////////////////////////////////////////////
// distance to line segment from point differences

float dseg(vec2 xa, vec2 ba) {
    return length(xa - ba*clamp(dot(xa, ba)/dot(ba, ba), 0.0, 1.0));
}

//////////////////////////////////////////////////////////////////////
// generate a random point on a circle from 3 integer coords (x, y, t)

vec2 randCircle(vec3 p) {

    vec2 rt = hash23(p);

    float r = sqrt(rt.x);
    float theta = 6.283185307179586 * rt.y;

    return r*vec2(cos(theta), sin(theta));

}

//////////////////////////////////////////////////////////////////////
// make a time-varying cubic spline at integer coords p that stays
// inside a unit circle

vec2 randCircleSpline(vec2 p, float t) {

    // standard catmull-rom spline implementation
    float t1 = floor(t);
    t -= t1;

    vec2 pa = randCircle(vec3(p, t1-1.0));
    vec2 p0 = randCircle(vec3(p, t1));
    vec2 p1 = randCircle(vec3(p, t1+1.0));
    vec2 pb = randCircle(vec3(p, t1+2.0));

    vec2 m0 = 0.5*(p1 - pa);
    vec2 m1 = 0.5*(pb - p0);

    vec2 c3 = 2.0*p0 - 2.0*p1 + m0 + m1;
    vec2 c2 = -3.0*p0 + 3.0*p1 - 2.0*m0 - m1;
    vec2 c1 = m0;
    vec2 c0 = p0;

    return (((c3*t + c2)*t + c1)*t + c0) * 0.8;

}

//////////////////////////////////////////////////////////////////////
// perturbed point from index

vec2 triPoint(vec2 p) {
    float t0 = hash12(p);
    return tri2cart*p + 0.45*randCircleSpline(p, 0.15*iTime + t0);
}

//////////////////////////////////////////////////////////////////////
// main shading function. inputs:
//
//   p - current pixel location in scene
//
//   tfloor - integer grid coordinates of bottom-left triangle vertex
//
//   t0, t1, t2 - displaced cartesian coordinates (xy) and integer
//                grid offsets (zw) of triangle vertices, relative
//                to tfloor
//
//   scl - pixel size in scene units
//
//   cw - pixel accumulator. xyz are rgb color pre-multiplied by
//        weights, and w is total weight.
//

void tri_color(in vec2 p,
               in vec4 t0, in vec4 t1, in vec4 t2,
               in float scl,
               inout vec4 cw) {

    // get differences relative to vertex 0
    vec2 p0 = p - t0.xy;
    vec2 p10 = t1.xy - t0.xy;
    vec2 p20 = t2.xy - t0.xy;

    // get barycentric coords
    vec3 b = bary(p10, p20, p0);

    // distances to line segments
    float d10 = dseg(p0, p10);
    float d20 = dseg(p0, p20);
    float d21 = dseg(p - t1.xy, t2.xy - t1.xy);

    // unsigned distance to triangle boundary
    float d = min(min(d10, d20), d21);

    // now signed distance (negative inside, positive outside)
    d *= -sign(min(b.x, min(b.y, b.z)));

    // only wory about coloring if close enough
    if (d < 0.5*scl) {

        //////////////////////////////////////////////////
        // generate per-vertex palette entries

        // sum of all integer grid indices
        vec2 tsum = t0.zw + t1.zw + t2.zw;

        // generate unique random number in [0, 1] for each vertex of
        // this triangle
        vec3 h_tri = vec3(hash12(tsum + t0.zw),
                          hash12(tsum + t1.zw),
                          hash12(tsum + t2.zw));

        //////////////////////////////////////////////////
        // now set up the "main" triangle color:

        // get the cartesian centroid of this triangle
        vec2 pctr = (t0.xy + t1.xy + t2.xy) / 3.0;

        // angle of scene-wide color gradient
        float theta = 1.0 + 0.01*iTime;
        vec2 dir = vec2(cos(theta), sin(theta));

        // how far are we along gradient?
        float grad_input = dot(pctr, dir) - sin(0.05*iTime);

        // h0 varies smoothly from 0 to 1
        float h0 = sin(0.7*grad_input)*0.5 + 0.5;

        // now the per-vertex random numbers are all biased towards h
        // (still in [0, 1] range tho)
        h_tri = mix(vec3(h0), h_tri, 0.4);

        //////////////////////////////////////////////////
        // final color accumulation

        // barycentric interpolation of per-vertex palette indices
        float h = dot(h_tri, b);

        // color lookup
        vec3 c = pal(h);

        // weight for anti-aliasing is 0.5 at border, 0 just outside,
        // 1 just inside
        float w = smoothstep(0.5*scl, -0.5*scl, d);

        // add to accumulator
        cw += vec4(w*c, w);

    }

}

//////////////////////////////////////////////////////////////////////

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

    float scl = 4.1 / iResolution.y;

    // get 2D scene coords
    vec2 p = (fragCoord - 0.5 - 0.5*iResolution.xy) * scl;

    // get triangular base coords
    vec2 tfloor = floor(cart2tri * p + 0.5);

    // precompute 9 neighboring points
    vec2 pts[9];

    for (int i=0; i<3; ++i) {
        for (int j=0; j<3; ++j) {
            pts[3*i+j] = triPoint(tfloor + vec2(i-1, j-1));
        }
    }

    // color accumulator
    vec4 cw = vec4(0);

    // for each of the 4 quads:
    for (int i=0; i<2; ++i) {
        for (int j=0; j<2; ++j) {

            // look at lower and upper triangle in this quad
            vec4 t00 = vec4(pts[3*i+j  ], tfloor + vec2(i-1, j-1));
            vec4 t10 = vec4(pts[3*i+j+3], tfloor + vec2(i,   j-1));
            vec4 t01 = vec4(pts[3*i+j+1], tfloor + vec2(i-1, j));
            vec4 t11 = vec4(pts[3*i+j+4], tfloor + vec2(i,   j));

            // lower
            tri_color(p, t00, t10, t11, scl, cw);

            // upper
            tri_color(p, t00, t11, t01, scl, cw);

        }
    }


    // final pixel color
    fragColor = cw / cw.w;

}


`,

WarpingProcedural4: `// Created by inigo quilez - iq/2014
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float hash( vec2 p )
{
	float h = dot(p,vec2(127.1,311.7));
    return -1.0 + 2.0*fract(sin(h)*43758.5453123);
}

float noise( in vec2 p )
{
    vec2 i = floor( p );
    vec2 f = fract( p );

	vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( hash( i + vec2(0.0,0.0) ),
                     hash( i + vec2(1.0,0.0) ), u.x),
                mix( hash( i + vec2(0.0,1.0) ),
                     hash( i + vec2(1.0,1.0) ), u.x), u.y);
}

float fbm( vec2 p )
{
    float f = 0.0;
    f += 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.03;
    f += 0.1250*noise( p ); p = m*p*2.01;
    f += 0.0625*noise( p );
    return f/0.9375;
}

vec2 fbm2( in vec2 p )
{
    return vec2( fbm(p.xy), fbm(p.yx) );
}

vec3 map( vec2 p )
{
    p *= 0.7;

    float f = dot( fbm2( 1.0*(0.05*iTime + p + fbm2(-0.05*iTime+2.0*(p + fbm2(4.0*p)))) ), vec2(1.0,-1.0) );

    float bl = smoothstep( -0.8, 0.8, f );

    float ti = smoothstep( -1.0, 1.0, fbm(p) );

    return mix( mix( vec3(0.50,0.00,0.00),
                     vec3(1.00,0.75,0.35), ti ),
                     vec3(0.00,0.00,0.02), bl );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = (-iResolution.xy+2.0*fragCoord.xy)/iResolution.y;


    float e = 0.0045;

    vec3 colc = map( p               ); float gc = dot(colc,vec3(0.333));
    vec3 cola = map( p + vec2(e,0.0) ); float ga = dot(cola,vec3(0.333));
    vec3 colb = map( p + vec2(0.0,e) ); float gb = dot(colb,vec3(0.333));

    vec3 nor = normalize( vec3(ga-gc, e, gb-gc ) );

    vec3 col = colc;
    col += vec3(1.0,0.7,0.6)*8.0*abs(2.0*gc-ga-gb);
    col *= 1.0+0.2*nor.y*nor.y;
    col += 0.05*nor.y*nor.y*nor.y;


    vec2 q = fragCoord.xy/iResolution.xy;
    col *= pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.1);

    fragColor = vec4( col, 1.0 );
}`,

WarpingProcedural2 : `// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// See here for a tutorial on how to make this:
//
// http://www.iquilezles.org/www/articles/warp/warp.htm

//====================================================================

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float noise( in vec2 p )
{
	return sin(p.x)*sin(p.y);
}

float fbm4( vec2 p )
{
    float f = 0.0;
    f += 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.03;
    f += 0.1250*noise( p ); p = m*p*2.01;
    f += 0.0625*noise( p );
    return f/0.9375;
}

float fbm6( vec2 p )
{
    float f = 0.0;
    f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
    f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
    f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
    f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
    f += 0.031250*(0.5+0.5*noise( p )); p = m*p*2.01;
    f += 0.015625*(0.5+0.5*noise( p ));
    return f/0.96875;
}

vec2 fbm4_2( vec2 p )
{
    return vec2(fbm4(p), fbm4(p+vec2(7.8)));
}

vec2 fbm6_2( vec2 p )
{
    return vec2(fbm6(p+vec2(16.8)), fbm6(p+vec2(11.5)));
}

//====================================================================

float func( vec2 q, out vec4 ron )
{
    q += 0.03*sin( vec2(0.27,0.23)*iTime + length(q)*vec2(4.1,4.3));

	vec2 o = fbm4_2( 0.9*q );

    o += 0.04*sin( vec2(0.12,0.14)*iTime + length(o));

    vec2 n = fbm6_2( 3.0*o );

	ron = vec4( o, n );

    float f = 0.5 + 0.5*fbm4( 1.8*q + 6.0*n );

    return mix( f, f*f*f*3.5, f*abs(n.x) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;
    float e = 2.0/iResolution.y;

    vec4 on = vec4(0.0);
    float f = func(p, on);

	vec3 col = vec3(0.0);
    col = mix( vec3(0.2,0.1,0.4), vec3(0.3,0.05,0.05), f );
    col = mix( col, vec3(0.9,0.9,0.9), dot(on.zw,on.zw) );
    col = mix( col, vec3(0.4,0.3,0.3), 0.2 + 0.5*on.y*on.y );
    col = mix( col, vec3(0.0,0.2,0.4), 0.5*smoothstep(1.2,1.3,abs(on.z)+abs(on.w)) );
    col = clamp( col*f*2.0, 0.0, 1.0 );

#if 0
    // gpu derivatives - bad quality, but fast
	vec3 nor = normalize( vec3( dFdx(f)*iResolution.x, 6.0, dFdy(f)*iResolution.y ) );
#else
    // manual derivatives - better quality, but slower
    vec4 kk;
 	vec3 nor = normalize( vec3( func(p+vec2(e,0.0),kk)-f,
                                2.0*e,
                                func(p+vec2(0.0,e),kk)-f ) );
#endif

    vec3 lig = normalize( vec3( 0.9, 0.2, -0.4 ) );
    float dif = clamp( 0.3+0.7*dot( nor, lig ), 0.0, 1.0 );
    vec3 lin = vec3(0.70,0.90,0.95)*(nor.y*0.5+0.5) + vec3(0.15,0.10,0.05)*dif;
    col *= 1.2*lin;
	col = 1.0 - col;
	col = 1.1*col*col;

    fragColor = vec4( col, 1.0 );
}

`,

MandelbrotDistance : `// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.


// This shader computes the distance to the Mandelbrot Set for everypixel, and colorizes
// it accoringly.
//
// Z -> Z²+c, Z0 = 0.
// therefore Z' -> 2·Z·Z' + 1
//
// The Hubbard-Douady potential G(c) is G(c) = log Z/2^n
// G'(c) = Z'/Z/2^n
//
// So the distance is |G(c)|/|G'(c)| = |Z|·log|Z|/|Z'|
//
// More info here: http://www.iquilezles.org/www/articles/distancefractals/distancefractals.htm


float distanceToMandelbrot( in vec2 c )
{
    #if 1
    {
        float c2 = dot(c, c);
        // skip computation inside M1 - http://iquilezles.org/www/articles/mset_1bulb/mset1bulb.htm
        if( 256.0*c2*c2 - 96.0*c2 + 32.0*c.x - 3.0 < 0.0 ) return 0.0;
        // skip computation inside M2 - http://iquilezles.org/www/articles/mset_2bulb/mset2bulb.htm
        if( 16.0*(c2+2.0*c.x+1.0) - 1.0 < 0.0 ) return 0.0;
    }
    #endif

    // iterate
    float di =  1.0;
    vec2 z  = vec2(0.0);
    float m2 = 0.0;
    vec2 dz = vec2(0.0);
    for( int i=0; i<300; i++ )
    {
        if( m2>1024.0 ) { di=0.0; break; }

		// Z' -> 2·Z·Z' + 1
        dz = 2.0*vec2(z.x*dz.x-z.y*dz.y, z.x*dz.y + z.y*dz.x) + vec2(1.0,0.0);

        // Z -> Z² + c
        z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;

        m2 = dot(z,z);
    }

    // distance
	// d(c) = |Z|·log|Z|/|Z'|
	float d = 0.5*sqrt(dot(z,z)/dot(dz,dz))*log(dot(z,z));
    if( di>0.5 ) d=0.0;

    return d;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;

    // animation
	float tz = 0.5 - 0.5*cos(0.225*iTime);
    float zoo = pow( 0.5, 13.0*tz );
	vec2 c = vec2(-0.05,.6805) + p*zoo;

    // distance to Mandelbrot
    float d = distanceToMandelbrot(c);

    // do some soft coloring based on distance
	d = clamp( pow(4.0*d/zoo,0.2), 0.0, 1.0 );

    vec3 col = vec3(d);

    fragColor = vec4( col, 1.0 );
}`,

PyroclasticFireball : `// port from http://glslsandbox.com/e#8625.0 by Duke
// Fireball
// Awd
// @AlexWDunn

#define saturate(oo) clamp(oo, 0.0, 1.0)

// Quality Settings
#define MarchSteps 8
// Scene Settings
#define ExpPosition vec3(0.0)
#define Radius 2.0
#define Background vec4(0.1, 0.0, 0.0, 1.0)
// Noise Settings
#define NoiseSteps 1
#define NoiseAmplitude 0.06
#define NoiseFrequency 4.0
#define Animation vec3(0.0, -3.0, 0.5)
// Colour Gradient
#define Color1 vec4(1.0, 1.0, 1.0, 1.0)
#define Color2 vec4(1.0, 0.8, 0.2, 1.0)
#define Color3 vec4(1.0, 0.03, 0.0, 1.0)
#define Color4 vec4(0.05, 0.02, 0.02, 1.0)

// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v)
{
	const vec2  C = vec2(1.0/6.0, 1.0/3.0);
	const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
	// First corner
	vec3 i  = floor(v + dot(v, C.yyy));
	vec3 x0 = v - i + dot(i, C.xxx);
	// Other corners
	vec3 g = step(x0.yzx, x0.xyz);
	vec3 l = 1.0 - g;
	vec3 i1 = min(g.xyz, l.zxy);
	vec3 i2 = max(g.xyz, l.zxy);
	vec3 x1 = x0 - i1 + C.xxx;
	vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
	vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
	// Permutations
	i = mod289(i);
	vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
	// Gradients: 7x7 points over a square, mapped onto an octahedron.
	// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
	float n_ = 0.142857142857; // 1.0/7.0
	vec3  ns = n_ * D.wyz - D.xzx;
	vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
	vec4 x_ = floor(j * ns.z);
	vec4 y_ = floor(j - 7.0 * x_);    // mod(j,N)
	vec4 x = x_ *ns.x + ns.yyyy;
	vec4 y = y_ *ns.x + ns.yyyy;
	vec4 h = 1.0 - abs(x) - abs(y);
	vec4 b0 = vec4(x.xy, y.xy);
	vec4 b1 = vec4(x.zw, y.zw);
	vec4 s0 = floor(b0) * 2.0 + 1.0;
	vec4 s1 = floor(b1) * 2.0 + 1.0;
	vec4 sh = -step(h, vec4(0.0));
	vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
	vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
	vec3 p0 = vec3(a0.xy, h.x);
	vec3 p1 = vec3(a0.zw, h.y);
	vec3 p2 = vec3(a1.xy, h.z);
	vec3 p3 = vec3(a1.zw, h.w);
	//Normalise gradients
	vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
	p0 *= norm.x;
	p1 *= norm.y;
	p2 *= norm.z;
	p3 *= norm.w;
	// Mix final noise value
	vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
	m = m * m;
	return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float Turbulence(vec3 position, float minFreq, float maxFreq, float qWidth)
{
	float value = 0.0;
	float cutoff = clamp(0.5/qWidth, 0.0, maxFreq);
	float fade;
	float fOut = minFreq;
	for(int i=NoiseSteps ; i>=0 ; i--)
	{
		if(fOut >= 0.5 * cutoff) break;
		fOut *= 2.0;
		value += abs(snoise(position * fOut))/fOut;
	}
	fade = clamp(2.0 * (cutoff-fOut)/cutoff, 0.0, 1.0);
	value += fade * abs(snoise(position * fOut))/fOut;
	return 1.0-value;
}

float SphereDist(vec3 position)
{
	return length(position - ExpPosition) - Radius;
}

vec4 Shade(float distance)
{
	float c1 = saturate(distance*5.0 + 0.5);
	float c2 = saturate(distance*5.0);
	float c3 = saturate(distance*3.4 - 0.5);
	vec4 a = mix(Color1,Color2, c1);
	vec4 b = mix(a,     Color3, c2);
	return 	 mix(b,     Color4, c3);
}

// Draws the scene
float RenderScene(vec3 position, out float distance)
{
	float noise = Turbulence(position * NoiseFrequency + Animation*iTime, 0.1, 1.5, 0.03) * NoiseAmplitude;
	noise = saturate(abs(noise));
	distance = SphereDist(position) - noise;
	return noise;
}

// Basic ray marching method.
vec4 March(vec3 rayOrigin, vec3 rayStep)
{
	vec3 position = rayOrigin;
	float distance;
	float displacement;
	for(int step = MarchSteps; step >=0  ; --step)
	{
		displacement = RenderScene(position, distance);
		if(distance < 0.05) break;
		position += rayStep * distance;
	}
	return mix(Shade(displacement), Background, float(distance >= 0.5));
}

bool IntersectSphere(vec3 ro, vec3 rd, vec3 pos, float radius, out vec3 intersectPoint)
{
	vec3 relDistance = (ro - pos);
	float b = dot(relDistance, rd);
	float c = dot(relDistance, relDistance) - radius*radius;
	float d = b*b - c;
	intersectPoint = ro + rd*(-b - sqrt(d));
	return d >= 0.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 p = (gl_FragCoord.xy / iResolution.xy) * 2.0 - 1.0;
	p.x *= iResolution.x/iResolution.y;
	float rotx = iMouse.y * 0.01;
	float roty = -iMouse.x * 0.01;
	float zoom = 5.0;
	// camera
	vec3 ro = zoom * normalize(vec3(cos(roty), cos(rotx), sin(roty)));
	vec3 ww = normalize(vec3(0.0, 0.0, 0.0) - ro);
	vec3 uu = normalize(cross( vec3(0.0, 1.0, 0.0), ww));
	vec3 vv = normalize(cross(ww, uu));
	vec3 rd = normalize(p.x*uu + p.y*vv + 1.5*ww);
	vec4 col = Background;
	vec3 origin;
	if(IntersectSphere(ro, rd, ExpPosition, Radius + NoiseAmplitude*6.0, origin))
	{
		col = March(origin, rd);
	}
	fragColor = col;
}

`,

RollingHills : `// Rolling hills. By David Hoskins, November 2013.
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// https://www.shadertoy.com/view/Xsf3zX

// v.2.00 Uses eiffie's 'Circle of Confusion' function
//		  for blurred ray marching into the grass.
// v.1.02 Camera aberrations.
// v.1.01 Added better grass, with wind movement.

// For red/cyan 3D...
//#define STEREO

#define MOD2 vec2(3.07965, 7.4235)
float PI  = 4.0*atan(1.0);
vec3 sunLight  = normalize( vec3(  0.35, 0.2,  0.3 ) );
vec3 cameraPos;
vec3 sunColour = vec3(1.0, .75, .6);
const mat2 rotate2D = mat2(1.932, 1.623, -1.623, 1.952);
float gTime = 0.0;

//--------------------------------------------------------------------------
// Noise functions...
float Hash( float p )
{
	vec2 p2 = fract(vec2(p) / MOD2);
    p2 += dot(p2.yx, p2.xy+19.19);
	return fract(p2.x * p2.y);
}

//--------------------------------------------------------------------------
float Hash(vec2 p)
{
	p  = fract(p / MOD2);
    p += dot(p.xy, p.yx+19.19);
    return fract(p.x * p.y);
}


//--------------------------------------------------------------------------
float Noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0;
    float res = mix(mix( Hash(n+  0.0), Hash(n+  1.0),f.x),
                    mix( Hash(n+ 57.0), Hash(n+ 58.0),f.x),f.y);
    return res;
}

vec2 Voronoi( in vec2 x )
{
	vec2 p = floor( x );
	vec2 f = fract( x );
	float res=100.0,id;
	for( int j=-1; j<=1; j++ )
	for( int i=-1; i<=1; i++ )
	{
		vec2 b = vec2( float(i), float(j) );
		vec2 r = vec2( b ) - f  + Hash( p + b );
		float d = dot(r,r);
		if( d < res )
		{
			res = d;
			id  = Hash(p+b);
		}
    }
	return vec2(max(.4-sqrt(res), 0.0),id);
}


//--------------------------------------------------------------------------
vec2 Terrain( in vec2 p)
{
	float type = 0.0;
	vec2 pos = p*0.003;
	float w = 50.0;
	float f = .0;
	for (int i = 0; i < 3; i++)
	{
		f += Noise(pos) * w;
		w = w * 0.62;
		pos *= 2.5;
	}

	return vec2(f, type);
}

//--------------------------------------------------------------------------
vec2 Map(in vec3 p)
{
	vec2 h = Terrain(p.xz);
    return vec2(p.y - h.x, h.y);
}

//--------------------------------------------------------------------------
float FractalNoise(in vec2 xy)
{
	float w = .7;
	float f = 0.0;

	for (int i = 0; i < 3; i++)
	{
		f += Noise(xy) * w;
		w = w*0.6;
		xy = 2.0 * xy;
	}
	return f;
}

//--------------------------------------------------------------------------
// Grab all sky information for a given ray from camera
vec3 GetSky(in vec3 rd)
{
	float sunAmount = max( dot( rd, sunLight), 0.0 );
	float v = pow(1.0-max(rd.y,0.0),6.);
	vec3  sky = mix(vec3(.1, .2, .3), vec3(.32, .32, .32), v);
	sky = sky + sunColour * sunAmount * sunAmount * .25;
	sky = sky + sunColour * min(pow(sunAmount, 800.0)*1.5, .3);
	return clamp(sky, 0.0, 1.0);
}

//--------------------------------------------------------------------------
// Merge grass into the sky background for correct fog colouring...
vec3 ApplyFog( in vec3  rgb, in float dis, in vec3 dir)
{
	float fogAmount = clamp(dis*dis* 0.0000012, 0.0, 1.0);
	return mix( rgb, GetSky(dir), fogAmount );
}

//--------------------------------------------------------------------------
vec3 DE(vec3 p)
{
	float base = Terrain(p.xz).x - 1.9;
	float height = Noise(p.xz*2.0)*.75 + Noise(p.xz)*.35 + Noise(p.xz*.5)*.2;
	//p.y += height;
	float y = p.y - base-height;
	y = y*y;
	vec2 ret = Voronoi((p.xz*2.5+sin(y*4.0+p.zx*12.3)*.12+vec2(sin(iTime*2.3+1.5*p.z),sin(iTime*3.6+1.5*p.x))*y*.5));
	float f = ret.x * .6 + y * .58;
	return vec3( y - f*1.4, clamp(f * 1.5, 0.0, 1.0), ret.y);
}

//--------------------------------------------------------------------------
// eiffie's code for calculating the aperture size for a given distance...
float CircleOfConfusion(float t)
{
	return max(t * .04, (2.0 / iResolution.y) * (1.0+t));
}

//--------------------------------------------------------------------------
float Linstep(float a, float b, float t)
{
	return clamp((t-a)/(b-a),0.,1.);
}

//--------------------------------------------------------------------------
vec3 GrassBlades(in vec3 rO, in vec3 rD, in vec3 mat, in float dist)
{
	float d = 0.0;
	// Only calculate cCoC once is enough here...
	float rCoC = CircleOfConfusion(dist*.3);
	float alpha = 0.0;

	vec4 col = vec4(mat*0.15, 0.0);

	for (int i = 0; i < 15; i++)
	{
		if (col.w > .99) break;
		vec3 p = rO + rD * d;

		vec3 ret = DE(p);
		ret.x += .5 * rCoC;

		if (ret.x < rCoC)
		{
			alpha = (1.0 - col.y) * Linstep(-rCoC, rCoC, -ret.x);//calculate the mix like cloud density
			// Mix material with white tips for grass...
			vec3 gra = mix(mat, vec3(.35, .35, min(pow(ret.z, 4.0)*35.0, .35)), pow(ret.y, 9.0)*.7) * ret.y;
			col += vec4(gra * alpha, alpha);
		}
		d += max(ret.x * .7, .1);
	}
	if(col.w < .2)
		col.xyz = vec3(0.1, .15, 0.05);
	return col.xyz;
}

//--------------------------------------------------------------------------
// Calculate sun light...
void DoLighting(inout vec3 mat, in vec3 pos, in vec3 normal, in vec3 eyeDir, in float dis)
{
	float h = dot(sunLight,normal);
	mat = mat * sunColour*(max(h, 0.0)+.2);
}

//--------------------------------------------------------------------------
vec3 TerrainColour(vec3 pos, vec3 dir,  vec3 normal, float dis, float type)
{
	vec3 mat;
	if (type == 0.0)
	{
		// Random colour...
		mat = mix(vec3(.0,.3,.0), vec3(.2,.3,.0), Noise(pos.xz*.025));
		// Random shadows...
		float t = FractalNoise(pos.xz * .1)+.5;
		// Do grass blade tracing...
		mat = GrassBlades(pos, dir, mat, dis) * t;
		DoLighting(mat, pos, normal,dir, dis);
	}
	mat = ApplyFog(mat, dis, dir);
	return mat;
}

//--------------------------------------------------------------------------
// Home in on the surface by dividing by two and split...
float BinarySubdivision(in vec3 rO, in vec3 rD, float t, float oldT)
{
	float halfwayT = 0.0;
	for (int n = 0; n < 5; n++)
	{
		halfwayT = (oldT + t ) * .5;
		if (Map(rO + halfwayT*rD).x < .05)
		{
			t = halfwayT;
		}else
		{
			oldT = halfwayT;
		}
	}
	return t;
}

//--------------------------------------------------------------------------
bool Scene(in vec3 rO, in vec3 rD, out float resT, out float type )
{
    float t = 5.;
	float oldT = 0.0;
	float delta = 0.;
	vec2 h = vec2(1.0, 1.0);
	bool hit = false;
	for( int j=0; j < 70; j++ )
	{
	    vec3 p = rO + t*rD;
		h = Map(p); // ...Get this position's height mapping.

		// Are we inside, and close enough to fudge a hit?...
		if( h.x < 0.05)
		{
			hit = true;
            break;
		}

		delta = h.x + (t*0.03);
		oldT = t;
		t += delta;
	}
    type = h.y;
    resT = BinarySubdivision(rO, rD, t, oldT);
	return hit;
}

//--------------------------------------------------------------------------
vec3 CameraPath( float t )
{
	//t = time + t;
    vec2 p = vec2(200.0 * sin(3.54*t), 200.0 * cos(2.0*t) );
	return vec3(p.x+55.0,  12.0+sin(t*.3)*6.5, -94.0+p.y);
}

//--------------------------------------------------------------------------
vec3 PostEffects(vec3 rgb, vec2 xy)
{
	// Gamma first...
	rgb = pow(rgb, vec3(0.45));

	// Then...
	#define CONTRAST 1.1
	#define SATURATION 1.3
	#define BRIGHTNESS 1.3
	rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb*BRIGHTNESS)), rgb*BRIGHTNESS, SATURATION), CONTRAST);
	// Vignette...
	rgb *= .4+0.5*pow(40.0*xy.x*xy.y*(1.0-xy.x)*(1.0-xy.y), 0.2 );
	return rgb;
}

//--------------------------------------------------------------------------
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float m = (iMouse.x/iResolution.x)*300.0;
	float gTime = (iTime*5.0+m+2352.0)*.006;
    vec2 xy = fragCoord.xy / iResolution.xy;
	vec2 uv = (-1.0 + 2.0 * xy) * vec2(iResolution.x/iResolution.y,1.0);
	vec3 camTar;

	if (xy.y < .13 || xy.y >= .87)
	{
		// Top and bottom cine-crop - what a waste! :)
		fragColor=vec4(vec4(0.0));
		return;
	}

	#ifdef STEREO
	float isCyan = mod(fragCoord.x + mod(fragCoord.y,2.0),2.0);
	#endif

	cameraPos = CameraPath(gTime + 0.0);
    cameraPos.x -= 3.0;
	camTar	 = CameraPath(gTime + .009);
	cameraPos.y += Terrain(CameraPath(gTime + .009).xz).x;
	camTar.y = cameraPos.y;

	float roll = .4*sin(gTime+.5);
	vec3 cw = normalize(camTar-cameraPos);
	vec3 cp = vec3(sin(roll), cos(roll),0.0);
	vec3 cu = cross(cw,cp);
	vec3 cv = cross(cu,cw);
	vec3 dir = normalize(uv.x*cu + uv.y*cv + 1.3*cw);
	mat3 camMat = mat3(cu, cv, cw);

	#ifdef STEREO
	cameraPos += .85*cu*isCyan; // move camera to the right - the rd vector is still good
	#endif

	vec3 col;
	float distance;
	float type;
	if( !Scene(cameraPos, dir, distance, type) )
	{
		// Missed scene, now just get the sky...
		col = GetSky(dir);
	}
	else
	{
		// Get world coordinate of landscape...
		vec3 pos = cameraPos + distance * dir;
		// Get normal from sampling the high definition height map
		// Use the distance to sample larger gaps to help stop aliasing...
		vec2 p = vec2(0.1, 0.0);
		vec3 nor  	= vec3(0.0,		Terrain(pos.xz).x, 0.0);
		vec3 v2		= nor-vec3(p.x,	Terrain(pos.xz+p).x, 0.0);
		vec3 v3		= nor-vec3(0.0,	Terrain(pos.xz-p.yx).x, -p.x);
		nor = cross(v2, v3);
		nor = normalize(nor);

		// Get the colour using all available data...
		col = TerrainColour(pos, dir, nor, distance, type);
	}

	// bri is the brightness of sun at the centre of the camera direction.
	// Yeah, the lens flares is not exactly subtle, but it was good fun making it.
	float bri = dot(cw, sunLight)*.75;
	if (bri > 0.0)
	{
		vec2 sunPos = vec2( dot( sunLight, cu ), dot( sunLight, cv ) );
		vec2 uvT = uv-sunPos;
		uvT = uvT*(length(uvT));
		bri = pow(bri, 6.0)*.8;

		// glare = the red shifted blob...
		float glare1 = max(dot(normalize(vec3(dir.x, dir.y+.3, dir.z)),sunLight),0.0)*1.4;
		// glare2 is the yellow ring...
		float glare2 = max(1.0-length(uvT+sunPos*.5)*4.0, 0.0);
		uvT = mix (uvT, uv, -2.3);
		// glare3 is a purple splodge...
		float glare3 = max(1.0-length(uvT+sunPos*5.0)*1.2, 0.0);

		col += bri * vec3(1.0, .0, .0)  * pow(glare1, 12.5)*.05;
		col += bri * vec3(1.0, 1.0, 0.2) * pow(glare2, 2.0)*2.5;
		col += bri * sunColour * pow(glare3, 2.0)*3.0;
	}
	col = PostEffects(col, xy);

	#ifdef STEREO
	col *= vec3( isCyan, 1.0-isCyan, 1.0-isCyan );
	#endif

	fragColor=vec4(col,1.0);
}

//--------------------------------------------------------------------------`,

TileableWaterCaustic: `// Found this on GLSL sandbox. I really liked it, changed a few things and made it tileable.
// :)
// by David Hoskins.


// Water turbulence effect by joltz0r 2013-07-04, improved 2013-07-07


// Redefine below to see the tiling...
//#define SHOW_TILING

#define TAU 6.28318530718
#define MAX_ITER 5

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float time = iTime * .5+23.0;
    // uv should be the 0-1 uv of texture...
	vec2 uv = fragCoord.xy / iResolution.xy;

#ifdef SHOW_TILING
	vec2 p = mod(uv*TAU*2.0, TAU)-250.0;
#else
    vec2 p = mod(uv*TAU, TAU)-250.0;
#endif
	vec2 i = vec2(p);
	float c = 1.0;
	float inten = .005;

	for (int n = 0; n < MAX_ITER; n++)
	{
		float t = time * (1.0 - (3.5 / float(n+1)));
		i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
		c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
	}
	c /= float(MAX_ITER);
	c = 1.17-pow(c, 1.4);
	vec3 colour = vec3(pow(abs(c), 8.0));
    colour = clamp(colour + vec3(0.0, 0.35, 0.5), 0.0, 1.0);


	#ifdef SHOW_TILING
	// Flash tile borders...
	vec2 pixel = 2.0 / iResolution.xy;
	uv *= 2.0;

	float f = floor(mod(iTime*.5, 2.0)); 	// Flash value.
	vec2 first = step(pixel, uv) * f;		   	// Rule out first screen pixels and flash.
	uv  = step(fract(uv), pixel);				// Add one line of pixels per tile.
	colour = mix(colour, vec3(1.0, 1.0, 0.0), (uv.x + uv.y) * first.x * first.y); // Yellow line

	#endif
	fragColor = vec4(colour, 1.0);
}`,


HexagonalTiling4 : `

void mainImage( out vec4 O, vec2 uv )
{
    vec2 R = iResolution.xy,
         U = uv = (uv-R/2.)/R.y;               // centered coords

    U *= mat2(1,-1./1.73, 0,2./1.73) *5.;      // conversion to
    vec3 g = vec3(U,1.-U.x-U.y), g2,           // hexagonal coordinates
        id = floor(g);                         // cell id

    g = fract(g);                              // diamond coords
    if (length(g)>1.) g = 1.-g;                // barycentric coords
    g2 = abs(2.*fract(g)-1.);                  // distance to borders
    // length(g2)     = distance to center
    // length(1.-g2) ~= distance to nodes

    // for screenspace distances (e.g. to nodes), see https://www.shadertoy.com/view/XdKXz3
    // for screenspace local coords (centered) ,  see  https://www.shadertoy.com/view/lsKSRt

    O = vec4( mix(g,g2,.5+uv.x), 1);
    O = mix(vec4(mod(id,2.),1.), O, abs(2.*uv.x) );
}`,

TriangularGrid : `/*
	Triangular Grid
	03/2016
	seb chevrel
*/

#define PI 3.1415926535897

// triangle rotation matrices
const vec2 v60 = vec2( cos(PI/3.0), sin(PI/3.0));
const vec2 vm60 = vec2(cos(-PI/3.0), sin(-PI/3.0));
const mat2 rot60 = mat2(v60.x,-v60.y,v60.y,v60.x);
const mat2 rotm60 = mat2(vm60.x,-vm60.y,vm60.y,vm60.x);

float triangleGrid(vec2 p, float stepSize,float vertexSize,float lineSize)
{
    // equilateral triangle grid
    vec2 fullStep= vec2( stepSize , stepSize*v60.y);
    vec2 halfStep=fullStep/2.0;
    vec2 grid = floor(p/fullStep);
    vec2 offset = vec2( (mod(grid.y,2.0)==1.0) ? halfStep.x : 0. , 0.);
   	// tiling
    vec2 uv = mod(p+offset,fullStep)-halfStep;
    float d2=dot(uv,uv);
    return vertexSize/d2 + // vertices
    	max( abs(lineSize/(uv*rotm60).y), // lines -60deg
        	 max ( abs(lineSize/(uv*rot60).y), // lines 60deg
        	  	   abs(lineSize/(uv.y)) )); // h lines
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float time = iTime*0.1;

    // screen space
	vec2 uv = fragCoord.xy / iResolution.xx -vec2(0.5,0.5*iResolution.y/iResolution.x);

    //uv=vec2(uv.y,-uv.x);
    vec2 uv2 = (uv+vec2(time,time*0.3));

    vec3 color = triangleGrid(uv2,0.1,0.00005,0.001)*vec3(0,1,0);

    // output
	fragColor = vec4(  color ,1.0);
}

`,


GearField: `// relying on hexagonal tiling tutos https://www.shadertoy.com/view/4dKXR3
//                               and https://www.shadertoy.com/view/XdKXz3

/**/ // 343 chars
void mainImage( out vec4 O, vec2 U )
{
    vec2 R = iResolution.xy;
         U = (U-R/2.)/R.y * 5.;                           // centered coords

    U *= mat2(1.73/2.,-.5, 0,1);                          // conversion to
    vec3 g = vec3(U, 1.-U.x-U.y),                         // hexagonal coordinates
        id = floor(g);                                    // cell id

    g = fract(g); g.z = 1.-g.x-g.y;                       // triangle coords
    U = (g.xy-ceil(1.-g.z)/3.) * mat2(1,.5, 0,1.73/2.);   // screenspace local coords (centered)
    float r = length(U)/(1.73/2.)*3., // discs r=1 in contact     // to polar coords
          a = atan(U.y,U.x) - iTime*sign(g.z);

        //anti-aliasing    // gears pattern      // color per cell-id
    O = smoothstep(.07,.0, r-.9 -.1*sin(15.*a) ) *(1.+mod(id,3.).xyzx)/4.;
}
/**/



/** // golfed version: 292 chars

void mainImage( out vec4 O, vec2 U )
{
    U = (U-(O.xy=iResolution.xy)/2.)/O.y * mat2(4.3,-2.5, 0,5);
    vec4 g = vec4(U, 1.-U.x-U.y, 0);
    O = 1. + mod(ceil(g),3.);

    g = fract(g);
    U = ( g.xy - ceil(g.z= g.x+g.y)/3. ) * mat2(1,.5, 0,.86);
    g.w = atan(U.y,U.x) - iTime*sign(1.-g.z);

    O *= min(1., 1.- length(U)*52. +13.5 +1.5*sin(15.*g.w)  ) / 4.;
}
/**/`,

HexagonalTiling7: `// relying on hexagonal tiling tutos            https://www.shadertoy.com/view/4dKXR3
//    https://www.shadertoy.com/view/XdKXz3 and https://www.shadertoy.com/view/lsKSRt

void mainImage( out vec4 O, vec2 uv )
{
    vec2 R = iResolution.xy,
         U = uv = (uv-R/2.)/R.y * 5. *  1.73/2.;          // centered coords

    U *= mat2(1,-1./1.73, 0,2./1.73);                     // conversion to
    vec3 g = vec3(U, 1.-U.x-U.y), g2,                     // hexagonal coordinates
         id = floor(g);                                   // cell id

    g = fract(g); g.z = 1.-g.x-g.y;                       // triangle coords
    g2 = abs(2.*g-1.);                                    // distance to borders

    U = id.xy * mat2(1,.5, 0,1.73/2.);
    float l00 = length(U-uv),                    // screenspace distance to nodes
          l10 = length(U+vec2(1,0)-uv),
          l01 = length(U+vec2(.5,1.73/2.)-uv),
          l11 = length(U+vec2(1.5,1.73/2.)-uv),
            l = min(min(l00, l10), min( l01, l11)); // closest node: l=dist, C=coord
    vec2 C = U+ ( l==l00 ? vec2(0) : l==l10 ? vec2(1,0) : l==l01 ? vec2(.5,1.73/2.) : vec2(1.5,1.73/2.) );
    U = uv-C;
    float  s = 2.*mod(ceil(C.x+C.y),2.)-1.,
           r = length(U)/(1.73/2.)*3.,
           a = atan(U.y,U.x) - 3.*iTime;
            //  spiral                   // fade with radius   // rainbow color scheme
    O = pow(.5+.5*s*sin(8.*log(r)+a),1.) * exp(-.3*r*r) * sin(r+vec4(1,2.1,-2.1,0));
    // variant:  .5*(    ...      s*a


/*
    U = (g.xy-ceil(1.-g.z)/3.) * mat2(1,.5, 0,1.73/2.);   // screenspace local coords (centered)
          r = length(U)/(1.73/2.)*3., // discs r=1 in contact     // to polar coords
          a = atan(U.y,U.x) - iTime*sign(g.z);

    O = pow(.5+.5*sign(g.z)*sin(4.*log(r)+a),10.) +O-O;
*/
}

`,


Matrix: `// the 2-tweets version of patriciogv's Matrix  https://www.shadertoy.com/view/MlfXzN

// 255   ( -21 with the slight look-changing suggestions in comments )



#define r(s) fract(43.*sin(s.x*13.+s.y*78.))

void mainImage(out vec4 o, vec2 i){
    vec2 j = fract(i*=50./iResolution.x),
         p = i-j+ vec2(2,floor(iTime*20.*fract(sin(i-j).x)));   // iDate.w: -4 chars
    i = abs(j-.5);
    o =  vec4(r(floor(p*23.+5.*j))>.5&&i.x<.3&&i.y<.45 ?   1. - r(p)*(2.-dot(i,i)*6.)  :  1.);
 // o +=  r(floor(p*23.+5.*j))>.5&&i.x<.3&&i.y<.45 ?   1. - r(p):  1.;  // -17 chars
}








/* // 258
#define r(s) fract(43.*sin(s.x*13.+s.y*78.))

void mainImage(inout vec4 o, vec2 i){
    vec2 p = floor(i*= 50./iResolution.x), j=i-p; i=abs(j-.5);
    p += vec2(2,floor(iTime*20.*fract(sin(p.x))));
    o +=  r(floor(p*23.+5.*j))>.5 && i.x<.3&&i.y<.45 ? 1. - r(p)*(2.-dot(i,i)*6.)  :  1.;
}
*/


/* // 270
#define r(s) fract(43.*sin(s.x*13.+s.y*78.))

void mainImage(inout vec4 o, vec2 i){
	i *= 50./iResolution.x;
    vec2 p = floor(i); i -= p;
    p += vec2(2,floor(iTime*20.*fract(sin(p.x))));
	o +=  r((p*23.+floor(5.*i)))>.5 ? r(p) : 0.;
    i=abs(i-.5);
    o = 1.- o *  (2.-dot(i,i)*6.) * (i.x<.3&&i.y<.45?1.:0.);
}
*/


/*  // 273
#define r(s) fract(43.*sin(s.x*13.+s.y*78.))

void mainImage(inout vec4 o, vec2 i){
	i *= 50./iResolution.x;
    vec2 p = floor(i); i -= p;
    p += vec2(2,floor(iTime*20.*fract(sin(p.x))));
	o +=  r(p) * step(.5,r((p*23.+floor(5.*i))));
    i=abs(i-.5);
    o = 1.- o *  (2.-dot(i,i)*6.) * (i.x<.3&&i.y<.45?1.:0.);
}
*/`,


BubbleDistPlasma : `#define NOISE 2 // Perlin, Worley1, Worley2

#define PI 3.14159

// --- noise functions from https://www.shadertoy.com/view/XslGRr
// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

const mat3 m = mat3( 0.00,  0.80,  0.60,
           		    -0.80,  0.36, -0.48,
             		-0.60, -0.48,  0.64 );

float hash( float n ) {
    return fract(sin(n)*43758.5453);
}

float noise( in vec3 x ) { // in [0,1]
    vec3 p = floor(x);
    vec3 f = fract(x);

    f = f*f*(3.-2.*f);

    float n = p.x + p.y*57. + 113.*p.z;

    float res = mix(mix(mix( hash(n+  0.), hash(n+  1.),f.x),
                        mix( hash(n+ 57.), hash(n+ 58.),f.x),f.y),
                    mix(mix( hash(n+113.), hash(n+114.),f.x),
                        mix( hash(n+170.), hash(n+171.),f.x),f.y),f.z);
    return res;
}

float fbm( vec3 p ) { // in [0,1]
    float f;
    f  = 0.5000*noise( p ); p = m*p*2.02;
    f += 0.2500*noise( p ); p = m*p*2.03;
    f += 0.1250*noise( p ); p = m*p*2.01;
    f += 0.0625*noise( p );
    return f;
}
// --- End of: Created by inigo quilez --------------------

// more 2D noise
vec2 hash12( float n ) {
    return fract(sin(n+vec2(1.,12.345))*43758.5453);
}
float hash21( vec2 n ) {
    return hash(n.x+10.*n.y);
}
vec2 hash22( vec2 n ) {
    return hash12(n.x+10.*n.y);
}
float cell;   // id of closest cell
vec2  center; // center of closest cell

vec3 worley( vec2 p ) {
    vec3 d = vec3(1e15);
    vec2 ip = floor(p);
    for (float i=-2.; i<3.; i++)
   	 	for (float j=-2.; j<3.; j++) {
                vec2 p0 = ip+vec2(i,j);
            	float a0 = hash21(p0), a=5.*a0*iTime+2.*PI*a0; vec2 dp=vec2(cos(a),sin(a));
                vec2  c = hash22(p0)*.5+.5*dp+p0-p;
                float d0 = dot(c,c);
                if      (d0<d.x) { d.yz=d.xy; d.x=d0; cell=hash21(p0); center=c;}
                else if (d0<d.y) { d.z =d.y ; d.y=d0; }
                else if (d0<d.z) {            d.z=d0; }
            }
    return sqrt(d);
}

// distance to Voronoi borders, as explained in https://www.shadertoy.com/view/ldl3W8
float worleyD( vec2 p) {
    float d = 1e15;
    vec2 ip = floor(p);
    for (float i=-2.; i<3.; i++)
   	 	for (float j=-2.; j<3.; j++) {
                vec2 p0 = ip+vec2(i,j);
            	float a0 = hash21(p0), a=5.*a0*iTime+2.*PI*a0; vec2 dp=vec2(cos(a),sin(a));
                vec2  c = hash22(p0)*.5+.5*dp+p0-p;
                float d0 = dot(c,c);
 	    float c0 = dot(center+c,normalize(c-center));
        d=min(d, c0);
    }

    return .5*d;
}


float grad, scale = 5.;

// my noise
float tweaknoise( vec2 p) {
    float d=0.;
    for (float i=0.; i<5.; i++) {
        float a0 = hash(i+5.6789), a=1.*a0*iTime+2.*PI*a0; vec2 dp=vec2(cos(a),sin(a));

        vec2 ip = hash12(i+5.6789)+dp;
        float di = smoothstep(grad/2.,-grad/2.,length(p-ip)-.5);
        d += (1.-d)*di;
    }
    //float d = smoothstep(grad/2.,-grad/2.,length(p)-.5);
#if NOISE==1 // 3D Perlin noise
    float v = fbm(vec3(scale*p,.5));
#elif NOISE==2 // Worley noise
    float v = 1. - scale*worley(scale*p).x;
#elif NOISE>=3 // trabeculum 2D
    if (d<0.5) return 0.;
    grad=.8, scale = 5.;
	vec3 w = scale*worley(scale*p);
    float v;
    if (false) // keyToggle(32))
        v =  2.*scale*worleyD(scale*p);
    else
 	v= w.y-w.x;	 //  v= 1.-1./(w.y-w.x);
#endif

    return v*d;
    //return smoothstep(thresh-grad/2.,thresh+grad/2.,v*d);
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    grad = 0.05+4.*(1.+cos(iTime))*.5;
    vec2 p = 2.*(fragCoord.xy / iResolution.y -vec2(.9,.5));

    float c0=tweaknoise(p), c=sin(c0*5.);

    vec3 col; // = vec3(c);
    col = .5+.5*cos(c0*5.+vec3(0.,2.*PI/3.,-2.*PI/3.));
    col *= vec3(sin(12.*c0));
    // col = mix(col,vec3(cos(12.*c0)),.5);
    col = mix(col,vec3(c),.5+.5*cos(.13*(iTime-6.)));

   fragColor = vec4(col,1.);
}`,


Rosace3c: `// inspired from Shane's ribbon variant of https://www.shadertoy.com/view/ls3XWM



void mainImage( out vec4 O, vec2 U )
{
    float h = iResolution.y;  U = 4.*(U+iMouse.xy)/h;                    // normalized coordinates
    vec2 K = ceil(U); U = 2.*fract(U)-1.;  // or K = 1.+2.*floor(U) to avoid non-fractionals
    float a = atan(U.y,U.x), r=length(U), v=0., A;                       // polar coordinates

    for(int i=0; i<7; i++)
        // if fractional, there is K.y turns to close the loop via K.x wings.
        v = max(v,   ( 1. + .8* cos(A= K.x/K.y*a + iTime) ) / 1.8  // 1+cos(A) = depth-shading
                   * smoothstep(1., 1.-120./h, 8.*abs(r-.2*sin(A)-.5))), // ribbon (antialiased)
        a += 6.28;                                                       // next turn


    O = v*vec4(.8,1,.3,1); O.g = sqrt(O.g);                              // greenify
  //O = v*(.5+.5*sin(K.x+17.*K.y+iDate.w+vec4(0,2.1,-2.1,0)));           // random colors
}













/**  // 318
#define d  O = max(O,O-O+(1.+.8*cos(A= K.x/K.y*a + iTime))/1.8 * smoothstep(1., 1.-120./R, 8.*abs(r-.2*sin(A)-.5))); a += 6.28;


void mainImage( out vec4 O, vec2 U )
{
    float R = iResolution.y;
    U = 4.*(U+iMouse.xy)/R;
    vec2 K = ceil(U); U = 2.*fract(U)-1.;  // or K = 1.+2.*floor(U) to avoid non-fractionals
    float a = atan(U.y,U.x), r=length(U), A;

	O -= O;
    d d d d d d d

    O *= vec4(.8,1,.3,1); O.g = sqrt(O.g);
}
/**/`,

PerlinFlow: `// see also https://www.shadertoy.com/view/ldtSzn

// --- Perlin noise by inigo quilez - iq/2013   https://www.shadertoy.com/view/XdXGW8
//     (extended to 3D)
vec3 hash( vec3 p )
{
	p *= mat3( 127.1,311.7,-53.7,
			   269.5,183.3, 77.1,
			  -301.7, 27.3,215.3 );

	return 2.*fract(sin(p)*43758.5453123) -1.;
}

float noise( vec3 p )
{
    vec3 i = floor( p ),
         f = fract( p ),
	     u = f*f*(3.-2.*f);

    return 2.*mix(
              mix( mix( dot( hash( i + vec3(0,0,0) ), f - vec3(0,0,0) ),
                        dot( hash( i + vec3(1,0,0) ), f - vec3(1,0,0) ), u.x),
                   mix( dot( hash( i + vec3(0,1,0) ), f - vec3(0,1,0) ),
                        dot( hash( i + vec3(1,1,0) ), f - vec3(1,1,0) ), u.x), u.y),
              mix( mix( dot( hash( i + vec3(0,0,1) ), f - vec3(0,0,1) ),
                        dot( hash( i + vec3(1,0,1) ), f - vec3(1,0,1) ), u.x),
                   mix( dot( hash( i + vec3(0,1,1) ), f - vec3(0,1,1) ),
                        dot( hash( i + vec3(1,1,1) ), f - vec3(1,1,1) ), u.x), u.y), u.z);
}

float Mnoise(vec3 U ) {
    return noise(U);                      // base turbulence
  //return -1. + 2.* (1.-abs(noise(U)));  // flame like
  //return -1. + 2.* (abs(noise(U)));     // cloud like
}

float turb( vec2 U, float t )
{ 	float f = 0., q=1., s=0.;

    float m = 2.;
 // mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );
    for (int i=0; i<2; i++) {
      U -= t*vec2(.6,.2);
      f += q*Mnoise( vec3(U,t) );
      s += q;
      q /= 2.; U *= m; t *= 1.71;  // because of diff, we may rather use q/=4.;
    }
    return f/s;
}
// -----------------------------------------------

#define L(a,b) O+= .3/R.y/length( clamp( dot(U-(a),v=b-(a))/dot(v,v), 0.,1.) *v - U+a )

void mainImage( out vec4 O, in vec2 U )
{
    vec2 R = iResolution.xy;
    U /= R.y;
	float S = 3.,                              // scaling of noise
        eps = 1e-3, t=.4*iTime;
    //U -= t*vec2(.3,.1);                      // translation (or do it per band)

    float n = turb(S*U,t);                     // pure noise = stream

                                               // flow = rot(stream)
	vec2  V = vec2( turb(S*U+vec2(0,-eps),t) - turb(S*U+vec2(0,eps),t),
                    turb(S*U+vec2(eps,0),t)  - turb(S*U+vec2(-eps,0),t) ) / eps;
    //V += vec2(3,0);                          // linearly combine other base flows
    V /= R.y;

	O = clamp(vec4(n,0,-n,0),0.,1.);           // draw stream value (note that curl = lapl(stream) so they are very similar)

    S = R.y/10.;
    vec2 p = floor(U*S+.5)/S, v;           // draw velocity vectors
    L ( p-V*2., p+V*2.);
}`,


ChainCloth2: `/**/  // 267 chars - gold version

//         // dist to ring                 // ring thickness            // pseudo-depth   // select the max
#define r l= abs(length(U-vec2(i,0))-.85); z= smoothstep(.06,.0, l-.08) *(.7+.4*(U.x-i++)); if (z>M) L=l, M=z;

void mainImage( out vec4 O,  vec2 U )
{
	U /= iResolution.y;
    float l,L, z,M=0., i=-1.;
    U = 2.*fract(U*5.) -1.;

    r r r     // offset i = -1, 0, 1    // even lines: tile = 1 circle + 2 half circles

    U.x = -U.x;                          // odd line: horizontal 1/2 offset + symmetry
    U.y -= sign(U.y);
    i=-1.;
    r r r    // offset i = -1, 0, 1

    O = (1.1-L/.1) * M * vec4(1,.8,0,1); // tore shading * pseudo-deph * gold

}
/**/


/**  // 248 chars -  B&W version
#define r(i)   smoothstep(.06,.0, abs(length(U-vec2(i,0))-.85) -.08) * (.6+.4*(U.x-i))

void mainImage( out vec4 O,  vec2 U )
{
	U /= iResolution.y;
    U = 2.*fract(U*5.) -1.;

    O +=  max ( r(0.), max( r(-1.) , r (1.))) -O;

    U.x = -U.x;
    U.y -= sign(U.y); // mod(U.y,2.)-1.;
    O =  max ( max(O, r(0.) ), max( r(-1.) , r (1.)));

}
/**/

`,

BlackwatchModernTartan : `
// https://www.shadertoy.com/view/4t3GWB

#define B(n) dot(.5+.5*sin( vec2(50,-50)*(R+R.yx) ), step(mod(U,3.), R/R) * step(.5, abs( 30.*abs( mod(U-.5,3.) -1.5)-n))) * vec4(

void mainImage( out vec4 O,  vec2 U )
{
    vec2 R = iResolution.xy;
    R = U = (U+U-R)/R.y * mat2(cos(iTime*.1 + 1.57*vec4(0,3,1,0)))/.4;

    O =    B(45.)  0,.5,0,  U+=1.5)        // green bands
         + B(42.)  0,0,1,   1);            // blue bands
}

`,



RotatingCrosses2: `//Fork of FabriceNeyret2's brilliant shader: https://www.shadertoy.com/view/wd33R7
//This version swaps between which crosses are rotating(black/white)
//Most of this code was written by FabriceNeyret (https://www.shadertoy.com/user/FabriceNeyret2)
//I have identified the lines of code that I added:
//I also have replaced trig estimations with high precision values

#define R     (iResolution.xy)
#define S(v)   smoothstep( 13./R.y , -13./R.y, v )
#define rot(a) mat2(cos( a + vec4(0,33,11,0) ))       //from https://www.shadertoy.com/view/XlsyWX
float t = acos(-1.)/4., s;

float draw(vec2 U, float r) {
    U = 3.*(fract(U)-.5) *s;
    vec2 A = abs( U * rot( iTime +atan(.5)*r ) );
    return S( max(A.x,A.y) - 1.5 ) * S( min(A.x,A.y) - .5 );
}

void mainImage( out vec4 O, vec2 U ) {
    float f=float(fract((iTime/acos(-1.))-.5*atan(.5))>.5);//Added by me
    O-=O;
    U = 2.7* (U+U-R)/R.y * rot(atan(.5));
    U /= s = 1.6* ( 1.+ max( abs(sin(t+=iTime)) ,abs(cos(t)) ) - .707 );
    U-=.25*f;//Added by me
    O += draw(U,-1.); U+=.5; O += draw(U,-1.);
    U.x = .5-U.x;
    O += draw(U, 1.); U+=.5; O += draw(U, 1.);
    O = abs(f-O);//Added by me
    O = sqrt(O);
}`,


RedSmoke: `//noise & fbm from : https://www.shadertoy.com/view/Xds3Rj

float hash(float x)
{
	return fract(21654.6512 * sin(385.51 * x));
}

float hash(vec2 p)
{
	return fract(21654.65155 * sin(35.51 * p.x + 45.51 * p.y));
}

float lhash(float x, float y)
{
	float h = 0.0;

	for(int i = 0;i < 5;i++)
	{
		h += (fract(21654.65155 * float(i) * sin(35.51 * x + 45.51 * float(i) * y * (5.0 / float(i))))* 2.0 - 1.0) / 10.0;
	}
	return h / 5.0 + 0.02;
	return (fract(21654.65155 * sin(35.51 * x + 45.51 * y))* 2.0 - 1.0) / 20.0;
}

float noise(vec2 p)
{
	vec2 fl = floor(p);
	vec2 fr = fract(p);

	fr.x = smoothstep(0.0,1.0,fr.x);
	fr.y = smoothstep(0.0,1.0,fr.y);

	float a = mix(hash(fl + vec2(0.0,0.0)), hash(fl + vec2(1.0,0.0)),fr.x);
	float b = mix(hash(fl + vec2(0.0,1.0)), hash(fl + vec2(1.0,1.0)),fr.x);

	return mix(a,b,fr.y);
}

//Fractal Brownian Motion
float fbm(vec2 p)
{
	float v = 0.0, f = 1.0, a = 0.5;
	for(int i = 0;i < 5; i++)
	{
		v += noise(p * f) * a;
		f *= 2.0;
		a *= 0.5;
	}
	return v;
}

//Fun start here
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    //change the animation speed
    float time = iTime*1.;
	vec2 uv = fragCoord.xy / iResolution.xy;
	uv = uv*2.0 -1.0;
	uv.x *= iResolution.x / iResolution.y;

    float p = fbm(vec2(noise(uv+time/2.5),noise(uv*2.+cos(time/2.)/2.)));
	//uncomment for more plasma/lighting/plastic effect..
    //p = (1. - abs(p * 2.0 - 1.0))*.8;

	vec3 col = pow(vec3(p),vec3(0.3))-0.4;
	col = mix( col, vec3(1.0), 1.0-smoothstep(0.0,0.2,pow(1.0 / 2.0,0.5) - uv.y/40.0) );
    float s = smoothstep(.35,.6,col.x);
    float s2 = smoothstep(.47,.6,col.x);
    float s3 = smoothstep(.51,.6,col.x);
    //multiply by the inverse to get the "smoky" effect, first attempt
    col*=vec3(1.3,.1,0.1)*s; //add red
    col+=vec3(0.3,0.4,.1)*s2; //add orange
    col+=vec3(1.,4.,.1)*s3; //add yellow
    //made it more bright
    col*=1.5;
    fragColor = vec4(col,col.r*.3);
    fragColor.rgb += 0.05;
}`,

PlasmaVolume: `//Ethan Alexander Shulman 2016


float len(vec3 p) {
    return max(abs(p.x)*0.5+abs(p.z)*0.5,max(abs(p.y)*0.5+abs(p.x)*0.5,abs(p.z)*0.5+abs(p.y)*0.5));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 R = iResolution.xy,
        uv = (fragCoord - .5*R) / iResolution.y;

    vec3 rp = vec3(0.,iMouse.y/50.,iTime+iMouse.x/50.);
    vec3 rd = normalize(vec3(uv,1.));

    vec3 c = vec3(0.);
    float s = 0.;

    float viewVary = cos(iTime*0.05)*.15;

    for (int i = 0; i < 74; i++) {
        vec3 hp = rp+rd*s;
        float d = len(cos(hp*.6+
                             cos(hp*.3+iTime*.5)))-.75;
        float cc = min(1.,pow(max(0., 1.-abs(d)*10.25),1.))/(float(i)*1.+10.);//clamp(1.-(d*.5+(d*5.)/s),-1.,1.);

        c += (cos(vec3(hp.xy,s))*.5+.5 + cos(vec3(s+iTime,hp.yx)*.1)*.5+.5 + 1.)/3.
              *cc;

        s += max(abs(d),0.35+viewVary);
        rd = normalize(rd+vec3(sin(s*0.5),cos(s*0.5),0.)*d*0.05*clamp(s-1.,0.,1.));
    }

    fragColor = vec4(pow(c,vec3(1.7)),1.);
}`,

TinyWings: `
float pi = 3.14159265358979;

// parameters
const float gradientAngle = 25.0; // degrees
const vec2 lumSatOffset = vec2(0.1,0.0); // range [-1..1]
const float lumSatAngle = 110.0; // degrees
const float lumSatFactor = 0.4;// range [0..1]
const float NoiseFactor = 0.20; // range [0..1]
const float SmoothStepBase = 0.22; // range[0..0.25]
const float TextureSliceFactor = 0.4; // range [0..1]
const float StrideFactor = -3.1; // range[-inf..+inf]
const float GroundSaturation = 2.0; // range [0..1]

vec3 hsv2rgb (in vec3 hsv)
{
    return hsv.z * (1.0 + 0.5 * hsv.y * (cos (6.2832 * (hsv.x + vec3 (0.0, 0.6667, 0.3333))) - 1.0));
}

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 baseColor(vec2 uv)
{
	vec3 col = vec3(max(uv.y,0.0)+max(uv.x,0.0),max(-uv.y,0.0)+max(uv.x,0.0),max(-uv.x,0.0));
    return col;
}


vec2 screenToWorld(vec2 screenPos)
{
    vec2 uv = screenPos.xy / iResolution.xy - vec2(0.5);
    uv *= vec2(iResolution.x/iResolution.y, 1.0);
    //uv += vec2(0.4, 0.0);
    return uv;
}


vec2 rotate(vec2 xy, float angle)
{
    float sn = sin(angle);
    float cs = cos(angle);
    return vec2(xy.x*cs-xy.y*sn, xy.y*cs + xy.x*sn);
}

float degToRad(float angle)
{
    return angle * pi * (1.0/180.0);
}

///////

vec2 hash22(vec2 p)
{
    p = vec2( dot(p,vec2(127.1,311.7)),
			  dot(p,vec2(269.5,183.3)));

    return -1.0 + 2.0 * fract(sin(p)*43758.5453123);
}


float hash21(vec2 p)
{
	float h = dot(p,vec2(127.1,311.7));

    return -1.0 + 2.0 * fract(sin(h)*43758.5453123);
}

float perlin_noise(vec2 p)
{
    vec2 pi = floor(p);
    vec2 pf = p - pi;

    vec2 w = pf * pf * (3.0 - 2.0 * pf);

    return mix(mix(dot(hash22(pi + vec2(0.0, 0.0)), pf - vec2(0.0, 0.0)),
                   dot(hash22(pi + vec2(1.0, 0.0)), pf - vec2(1.0, 0.0)), w.x),
               mix(dot(hash22(pi + vec2(0.0, 1.0)), pf - vec2(0.0, 1.0)),
                   dot(hash22(pi + vec2(1.0, 1.0)), pf - vec2(1.0, 1.0)), w.x),
               w.y);
}

float value_noise(vec2 p)
{
    vec2 pi = floor(p);
    vec2 pf = p - pi;

    vec2 w = pf * pf * (3.0 - 2.0 * pf);

    return mix(mix(hash21(pi + vec2(0.0, 0.0)), hash21(pi + vec2(1.0, 0.0)), w.x),
               mix(hash21(pi + vec2(0.0, 1.0)), hash21(pi + vec2(1.0, 1.0)), w.x),
               w.y);
}

float getTex(float u)
{
    u = mod(u,1.0);
    float v = u - mod(u, (TextureSliceFactor+abs(sin(u*6.15159))*0.01));
    return v-mod(v, 0.1);
}

float getTex2(float u)
{
    float res = 0.0;

    for (int t = 0;t<6;t++)
        res += getTex(u+float(t)*0.0011);
    return res/6.0;
}

float getGroundHeight(float x)
{
    return sin(x*3.0) * 0.2 + sin(x * 6.17+4740.14) * 0.1 + sin(x * 10.987+19.19) * 0.05 + 0.3;
}

vec3 getWorldColor(vec2 uv, vec2 hueSelection)
{
    float c = getTex2(uv.x*4.0 + uv.y*StrideFactor)+0.2;

    vec3 colPalette=vec3(0.0);

    float angles[4];
    angles[0] = 0.0;
	angles[1] = gradientAngle;
    angles[2] = 180.0;
    angles[3] = 180.0+gradientAngle;

    for (int i=0;i<4;i++)
    {
        vec2 dir = rotate(hueSelection, degToRad(angles[i]));
		float ifl = float(i);
        vec3 baseColorHSV = rgb2hsv(baseColor(dir));
        colPalette = mix(colPalette, hsv2rgb(vec3(baseColorHSV.r, 0.3,0.6)), smoothstep(SmoothStepBase*ifl, 0.25*ifl, c));
    }
    colPalette = mix(colPalette, vec3(dot(colPalette, vec3(0.299, 0.587, 0.114))), 1.0-GroundSaturation);
    uv.y = 1.0-uv.y;
    vec2 noisePos = uv;
    float noise = perlin_noise(noisePos*10.0) + perlin_noise(noisePos*20.0)*0.8 + perlin_noise(noisePos*40.0)*0.6 + perlin_noise(noisePos*80.0)*0.4;


    float intens = max(pow(0.5, (uv.y-0.10)*9.0), 0.20);
    float unoise = noise*NoiseFactor+(1.0-NoiseFactor);

    vec3 recompBase = colPalette*intens*unoise;
    vec3 recomp = mix(recompBase, vec3(1.0), max(intens*0.9-1.0, 0.0));
    return recomp;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;

	vec2 hueSelection = screenToWorld(iMouse.xy);
    hueSelection = normalize(hueSelection);

    vec3 colSkyHSV = rgb2hsv(baseColor(rotate(hueSelection, degToRad(-gradientAngle*1.5))));
    vec3 colSky = hsv2rgb(vec3(colSkyHSV.r, 0.2, 0.65));

    const float globalTimeFactor = 0.6;
    float iTime = iTime * globalTimeFactor;

    float pos1 = uv.x + iTime*0.3;
    float pos2 = uv.x + iTime*0.1;

    float camHeight = (getGroundHeight(iTime*0.3 + 0.5) + getGroundHeight(iTime*0.3 + 0.1) + getGroundHeight(iTime*0.3 + 0.9)) / 3.0;

    float height1 = uv.y + getGroundHeight(pos1) + 0.6 - camHeight;
    float height2 = uv.y + getGroundHeight(pos2) + 0.0 - camHeight*0.5;

    vec3 recomp1 = getWorldColor(vec2(pos1, height1), hueSelection);
    vec3 recomp2 = mix(colSky, getWorldColor(vec2(pos2, height2), hueSelection), 0.4);

    float pixelSize = 2.0/iResolution.y;


	vec3 layer1 = mix(colSky, mix(vec3(0.55), recomp2, smoothstep(0.0, pixelSize, 1.0-height2)), smoothstep(-pixelSize, 0.0, 1.0-height2));
	vec3 layer2 = mix(vec3(0.2), recomp1, smoothstep(0.0, pixelSize, 1.0-height1));
	fragColor = vec4(mix(layer1, layer2, smoothstep(-pixelSize, 0.0, 1.0-height1)), 1.0);
}`,


SH16B: `// [SH16B] Speed tracer. Created by Reinder Nijhoff 2016
// Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// @reindernijhoff
//
// https://www.shadertoy.com/view/Xlt3Dn
//
// This shader uses code of the Analytical Motionblur 3D shader by Inego and a grid to trace a lot of spheres.
//

#define RAYCASTSTEPS 30

#define GRIDSIZE 10.
#define GRIDSIZESMALL 7.
#define MAXHEIGHT 30.
#define SPEED 20.
#define FPS 30.
#define MAXDISTANCE 260.
#define MAXSHADOWDISTANCE 20.

#define time iTime

#define HASHSCALE1 .1031
#define HASHSCALE3 vec3(.1031, .1030, .0973)
#define HASHSCALE4 vec4(1031, .1030, .0973, .1099)

//----------------------------------------------------------------------------------------
//  1 out, 2 in...
float hash12(vec2 p)
{
	vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
    p3 += dot(p3, p3.yzx + 19.19);
    return fract((p3.x + p3.y) * p3.z);
}


//----------------------------------------------------------------------------------------
///  2 out, 2 in...
vec2 hash22(vec2 p)
{
	vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
    p3 += dot(p3, p3.yzx+19.19);
    return fract(vec2((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y));
}

//
// intersection functions
//

bool intersectPlane(const in vec3 ro, const in vec3 rd, const in float height, out float dist) {
	if (rd.y==0.0) {
		return false;
	}

	float d = -(ro.y - height)/rd.y;
	d = min(100000.0, d);
	if( d > 0. ) {
		dist = d;
		return true;
	}
	return false;
}

//
// intersect a MOVING sphere
//
// see: Analytical Motionblur 3D
//      https://www.shadertoy.com/view/MdB3Dw
//
// Created by inigo quilez - iq/2014
//
vec2 iSphere( const in vec3 ro, const in vec3 rd, const in vec4 sp, const in vec3 ve, out vec3 nor )
{
    float t = -1.0;
	float s = 0.0;
	nor = vec3(0.0);

	vec3  rc = ro - sp.xyz;
	float A = dot(rc,rd);
	float B = dot(rc,rc) - sp.w*sp.w;
	float C = dot(ve,ve);
	float D = dot(rc,ve);
	float E = dot(rd,ve);
	float aab = A*A - B;
	float eec = E*E - C;
	float aed = A*E - D;
	float k = aed*aed - eec*aab;

	if( k>0.0 )
	{
		k = sqrt(k);
		float hb = (aed - k)/eec;
		float ha = (aed + k)/eec;

		float ta = max( 0.0, ha );
		float tb = min( 1.0, hb );

		if( ta < tb )
		{
            ta = 0.5*(ta+tb);
            t = -(A-E*ta) - sqrt( (A-E*ta)*(A-E*ta) - (B+C*ta*ta-2.0*D*ta) );
            nor = normalize( (ro+rd*t) - (sp.xyz+ta*ve ) );
            s = 2.0*(tb - ta);
		}
	}

	return vec2(t,s);
}

//
// Shade
//

vec3  lig = normalize( vec3(-0.6, 0.7, -0.5) );

vec3 shade( const in float d, in vec3 col, const in float shadow, const in vec3 nor, const in vec3 ref, const in vec3 sky) {
    float amb = max(0., 0.5+0.5*nor.y);
    float dif = max(0., dot( normalize(nor), lig ) );
    float spe = pow(clamp( dot(normalize(ref), lig ), 0.0, 1.0 ),16.0);

    dif *= shadow;

    vec3 lin = 1.20*dif*vec3(1.00,0.85,0.55);
    lin += 0.50*amb*vec3(0.50,0.70,1.00);
    col = col*lin;
    col += spe*dif;

    // fog
    col = mix( col, sky, smoothstep( MAXDISTANCE * .8, MAXDISTANCE, d ) );

	return col;
}

//
// Scene
//

void getSphereOffset( const in vec2 grid, inout vec2 center ) {
	center = (hash22( grid ) - vec2(0.5) )*(GRIDSIZESMALL);
}

void getMovingSpherePosition( const in vec2 grid, const in vec2 sphereOffset, inout vec4 center, inout vec3 speed ) {
	// falling?
	float s = 0.1+hash12( grid );

	float t = fract(14.*s + time/s*.3);
	float y =  s * MAXHEIGHT * abs( 4.*t*(1.-t) );

    speed = vec3(0, s * MAXHEIGHT * ( 8.*t - 4. ), 0 ) * (1./FPS);

	vec2 offset = grid + sphereOffset;

	center = vec4(  offset.x + 0.5*GRIDSIZE, 1. + y, offset.y + 0.5*GRIDSIZE, 1. );
}

void getSpherePosition( const in vec2 grid, const in vec2 sphereOffset, inout vec4 center ) {
	vec2 offset = grid + sphereOffset;
	center = vec4( offset.x + 0.5*GRIDSIZE, 1., offset.y + 0.5*GRIDSIZE, 1. );
}

vec3 getSphereColor( vec2 grid ) {
	float m = hash12( grid.yx ) * 12.;
    return vec3(1.-m*0.08, m*0.03, m*0.06);
}

vec3 render(const in vec3 ro, const in vec3 rd, const in vec3 cameraSpeed, const in mat3 rot ) {
    vec3 nor, ref, speed;

	float dist = MAXDISTANCE;

	vec3 sky = clamp( vec3(1,1.5,2.5)*(1.0-0.8*rd.y), vec3(0.), vec3(1.));
	vec3 colBackground, sphereSpeed, col = vec3(0.);

    vec4 sphereCenter;
	vec3 pos = floor(ro/GRIDSIZE)*GRIDSIZE;
	vec2 offset;

	if( intersectPlane( ro,  rd, 0., dist) ) {
        vec3 interSectionPoint = ro + rd * dist;


        // HMMMMM this is totaly fake. Hopefully I have enough time to find the analytic
        // solution to get a motion blurred checkerboard
        speed = rot * (interSectionPoint.xyz - ro) + cameraSpeed;

        vec2 c1 = mod(interSectionPoint.xz * .25, vec2(2.));

        float w = (abs( fract(c1.x*abs(rd.x)) -.5 ) + abs( fract(c1.y*abs(rd.y)) -.5 ));

        colBackground = mix(
            mod(floor(c1.x) + floor(c1.y), 2.) < 1. ? vec3( 0.4 ) : vec3( .6 ),
            vec3(.5), clamp( (w + .8) * .007 * length(speed.xz) * FPS , 0., 1.));

        // calculate shadow
        float shadow = 0.;

        vec3 shadowStartPos = interSectionPoint - lig;
        vec2 shadowGridPos = floor((ro + rd * dist).xz/GRIDSIZE);

        for( float x=-1.; x<=1.; x++) {
            for( float y=-1.; y<=1.; y++) {
                vec2 gridpos = (shadowGridPos+vec2(x,y))*GRIDSIZE;
                getSphereOffset( gridpos, offset );

                getMovingSpherePosition( gridpos, -offset, sphereCenter, sphereSpeed );

                vec2 res = iSphere( shadowStartPos, lig, sphereCenter, sphereSpeed + cameraSpeed, nor );
                if( res.x>0.0 )
                {
                    shadow = clamp( shadow+mix(res.y,0., res.x/MAXSHADOWDISTANCE), 0., 1.);
                }

                getSpherePosition( gridpos, offset, sphereCenter );

                res = iSphere( shadowStartPos, lig, sphereCenter, cameraSpeed, nor );
                if( res.x>0.0 )
                {
                    shadow = clamp( shadow+mix(res.y,0., res.x/MAXSHADOWDISTANCE), 0., 1.);
                }
            }
        }

        ref = reflect( rd, vec3( 0., 1., 0. ) );
        colBackground = shade( dist, colBackground, 1.-shadow, vec3( 0., 1., 0. ), ref, sky );
	} else {
		colBackground = sky;
	}

	// trace grid
	vec3 ri = 1.0/rd;
	vec3 rs = sign(rd) * GRIDSIZE;
	vec3 dis = (pos-ro + 0.5  * GRIDSIZE + rs*0.5) * ri;
	vec3 mm = vec3(0.0);

    float alpha = 1.;

	for( int i=0; i<RAYCASTSTEPS; i++ )	{
        if( alpha < .01 ) break;

		getSphereOffset( pos.xz, offset );

		getMovingSpherePosition( pos.xz, -offset, sphereCenter, sphereSpeed );

        speed = rot * (sphereCenter.xyz - ro) + sphereSpeed + cameraSpeed;
        vec2 res = iSphere( ro, rd, sphereCenter, speed, nor );
        if( res.x>0.0 )
        {
       		ref = reflect( rd, nor );
            vec3  lcol = shade( res.x, getSphereColor(-offset), 1., nor, ref, sky);
            col += lcol * res.y * alpha;
            alpha *= (1.-res.y);
        }

		getSpherePosition( pos.xz, offset, sphereCenter );

        speed = rot * (sphereCenter.xyz - ro) + cameraSpeed;
		res = iSphere( ro, rd, sphereCenter, speed, nor );
        if( res.x>0.0 )
        {
       		ref = reflect( rd, nor );
            vec3  lcol = shade( res.x, getSphereColor(-offset), 1., nor, ref, sky);
            col += lcol * res.y * alpha;
            alpha *= (1.-res.y);
        }

		mm = step(dis.xyz, dis.zyx);
		dis += mm * rs * ri;
		pos += mm * rs;
	}

    col += colBackground * alpha;

	return col;
}

void path( in float time, out vec3 ro, out vec3 ta ) {
	ro = vec3( 16.0*cos(0.2+0.5*.4*time*1.5) * SPEED, 5.6+3.*sin(time), 16.0*sin(0.1+0.5*0.11*time*1.5) * SPEED);
    time += 1.6;
	ta = vec3( 16.0*cos(0.2+0.5*.4*time*1.5) * SPEED, -.1 + 2.*sin(time), 16.0*sin(0.1+0.5*0.11*time*1.5) * SPEED);
}

mat3 setCamera(in float time, out vec3 ro )
{
    vec3 ta;

    path(time, ro, ta);
	float roll = -0.15*sin(.732*time);

	vec3 cw = normalize(ta-ro);
	vec3 cp = vec3(sin(roll), cos(roll), 0.);
	vec3 cu = normalize( cross(cw,cp) );
	vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
	vec2 q = fragCoord.xy/iResolution.xy;
	vec2 p = -1.0+2.0*q;
	p.x *= iResolution.x/iResolution.y;

	// camera
	vec3 ro0, ro1, ta;

    mat3 ca0 = setCamera( time - 1./FPS, ro0 );
	vec3 rd0 = ca0 * normalize( vec3(p.xy,2.0) );

    mat3 ca1 = setCamera( time, ro1 );
	vec3 rd1 = ca1 * normalize( vec3(p.xy,2.0) );

    mat3 rot = ca1 * mat3( ca0[0].x, ca0[1].x, ca0[2].x,
                           ca0[0].y, ca0[1].y, ca0[2].y,
                           ca0[0].z, ca0[1].z, ca0[2].z);

    rot -= mat3( 1,0,0, 0,1,0, 0,0,1);

	// raytrace
	vec3 col = render(ro0, rd0, ro1-ro0, rot );

	col = pow( col, vec3(0.5) );

	fragColor = vec4( col,1.0);
}`,

Beautypi : `// Created by beautypi - beautypi/2012
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

float hash( float n )
{
    return fract(sin(n)*43758.5453);
}

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = p.x + p.y*57.0;

    return mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
               mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
}

float fbm( vec2 p )
{
    float f = 0.0;

    f += 0.50000*noise( p ); p = m*p*2.02;
    f += 0.25000*noise( p ); p = m*p*2.03;
    f += 0.12500*noise( p ); p = m*p*2.01;
    f += 0.06250*noise( p ); p = m*p*2.04;
    f += 0.03125*noise( p );

    return f/0.984375;
}

float length2( vec2 p )
{
    vec2 q = p*p*p*p;
    return pow( q.x + q.y, 1.0/4.0 );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 q = fragCoord/iResolution.xy;
    vec2 p = -1.0 + 2.0 * q;
    p.x *= iResolution.x/iResolution.y;

    float r = length( p );
    float a = atan( p.y, p.x );

    float dd = 0.2*sin(4.0*iTime);
    float ss = 1.0 + clamp(1.0-r,0.0,1.0)*dd;

    r *= ss;

    vec3 col = vec3( 0.0, 0.3, 0.4 );

    float f = fbm( 5.0*p );
    col = mix( col, vec3(0.2,0.5,0.4), f );

    col = mix( col, vec3(0.9,0.6,0.2), 1.0-smoothstep(0.2,0.6,r) );

    a += 0.05*fbm( 20.0*p );

    f = smoothstep( 0.3, 1.0, fbm( vec2(20.0*a,6.0*r) ) );
    col = mix( col, vec3(1.0,1.0,1.0), f );

    f = smoothstep( 0.4, 0.9, fbm( vec2(15.0*a,10.0*r) ) );
    col *= 1.0-0.5*f;

    col *= 1.0-0.25*smoothstep( 0.6,0.8,r );

    f = 1.0-smoothstep( 0.0, 0.6, length2( mat2(0.6,0.8,-0.8,0.6)*(p-vec2(0.3,0.5) )*vec2(1.0,2.0)) );

    col += vec3(1.0,0.9,0.9)*f*0.985;

    col *= vec3(0.8+0.2*cos(r*a));

    f = 1.0-smoothstep( 0.2, 0.25, r );
    col = mix( col, vec3(0.0), f );

    f = smoothstep( 0.79, 0.82, r );
    col = mix( col, vec3(1.0), f );

    col *= 0.5 + 0.5*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.1);

	fragColor = vec4( col, 1.0 );
}`,

JuliaDistance  : `// The MIT License
// Copyright © 2013 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// learn more here: // http://www.iquilezles.org/www/articles/distancefractals/distancefractals.htm


#define AA 2

float calc( vec2 p, float time )
{
    // non p dependent
	float ltime = 0.5-0.5*cos(time*0.06);
    float zoom = pow( 0.9, 50.0*ltime );
	vec2  cen = vec2( 0.2655,0.301 ) + zoom*0.8*cos(4.0+2.0*ltime);

	vec2 c = vec2( -0.745, 0.186 ) - 0.045*zoom*(1.0-ltime*0.5);

    //
    p = (2.0*p-iResolution.xy)/iResolution.y;
	vec2 z = cen + (p-cen)*zoom;

#if 0
    // full derivatives version
	vec2 dz = vec2( 1.0, 0.0 );
	for( int i=0; i<256; i++ )
	{
		dz = 2.0*vec2(z.x*dz.x-z.y*dz.y, z.x*dz.y + z.y*dz.x );
        z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;
		if( dot(z,z)>200.0 ) break;
	}
	float d = sqrt( dot(z,z)/dot(dz,dz) )*log(dot(z,z));

#else
    // only derivative length version
    float ld2 = 1.0;
    float lz2 = dot(z,z);
    for( int i=0; i<256; i++ )
	{
        z = vec2( z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;
        ld2 *= 4.0*lz2;
        lz2 = dot(z,z);
		if( lz2>200.0 ) break;
	}
    float d = sqrt(lz2/ld2)*log(lz2);

#endif

	return sqrt( clamp( (150.0/zoom)*d, 0.0, 1.0 ) );
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	#if 0
	float scol = calc( fragCoord, iTime );
    #else

    float scol = 0.0;
	for( int j=0; j<AA; j++ )
	for( int i=0; i<AA; i++ )
	{
		vec2 of = -0.5 + vec2( float(i), float(j) )/float(AA);
	    scol += calc( fragCoord+of, iTime );
	}
	scol /= float(AA*AA);

    #endif

	vec3 vcol = pow( vec3(scol), vec3(0.9,1.1,1.4) );

	vec2 uv = fragCoord/iResolution.xy;
	vcol *= 0.7 + 0.3*pow(16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y),0.25);


	fragColor = vec4( vcol, 1.0 );
}`,

PointLights  : `#define pixelWidth 1.0/iResolution.x
#define offset_a pixelWidth * 0.5
#define offset_b pixelWidth * 0.8
//
//
struct Light {
    vec3 color;
    vec2 pos;
    float min;
    float max;
    float brightness;
};

//Line is used to define lines and boxes
struct Line {
    vec2 start;
    vec2 end;
};

//Define box to obstruct light
Line box= Line(vec2(0.7, 0.5), vec2(0.8, 0.6));

//Two Lights, light0 is controlled by the mouse, light1 moves in a sine wave
//                   { Color },          {Position},    {Min},{Max},{Brightness}
Light light0 = Light(vec3(1.0, 1.0, 1.0), vec2(0.5, 0.7), 0.0, 1.5, 0.7);
Light light1 = Light(vec3(1.0, 1.0, 1.0), vec2(0.5, 0.5), 0.0, 2.5, 0.7);

/////////////////////////////////////////////////////////////

float hyperstep(float min, float max, float x) {

    if (x < min) {
        return 1.0;
    }
    else if (x > max) {
        return 0.0;
    }
    else {

        //linear interpolation of x between min and max
        float value= (x - min) / (max - min);

        //hyperbolic function: 100/99 * (9x + 1)^2 - 1/99
        return (100./99.) / ((9. * value + 1.) * (9. * value + 1.)) - (1./99.);
    }
}



vec2 intersectPoint(Line line_0, Line line_1) {

    float slope_0, slope_1, x, y;

    if (line_0.start.x == line_0.end.x) {

        //slope_0 is infinite
        slope_1= (line_1.start.y - line_1.end.y) / (line_1.start.x - line_1.end.x);

        x= line_0.start.x;
        y= slope_1 * x + line_1.start.y;

    }
    else if (line_1.start.x == line_1.end.x) {

        //slope_1 is infinite
        slope_0= (line_0.start.y - line_0.end.y) / (line_0.start.x - line_0.end.x);

        x= line_1.start.x;
        y= slope_0 * (x - line_0.start.x) + line_0.start.y;

    }
    else {

        slope_0= (line_0.start.y - line_0.end.y) / (line_0.start.x - line_0.end.x);
        slope_1= (line_1.start.y - line_1.end.y) / (line_1.start.x - line_1.end.x);

        if (slope_0 != slope_1) {

            //calculate y-intercept of line_1 based on line_0.start
            float b= slope_1 * (line_0.start.x - line_1.start.x) + line_1.start.y;

            x= (b - line_0.start.y) / (slope_0 - slope_1);
            y= slope_0 * x + line_0.start.y;
            x= x + line_0.start.x;


        }
        //lines are parallel
        else return vec2(-1.0);
    }


    return vec2(x, y);
}

bool inside(Line box, vec2 point) {

    if (point.x >= box.start.x && point.x <= box.end.x ||
        point.x <= box.start.x && point.x >= box.end.x) {

        if (point.y >= box.start.y && point.y <= box.end.y ||
            point.y <= box.start.y && point.y >= box.end.y) {

            return true;
        }
    }

    return false;

}

bool intersects(Line a, Line b) {

    vec2 point = intersectPoint(a, b);

    return inside(a, point) && inside(b, point);
}

vec3 calculateLighting(vec2 pixel, Light light) {

    Line LoS= Line(pixel, light.pos);

    if ( intersects(LoS, Line(box.start, vec2(box.end.x, box.start.y))) ||
         intersects(LoS, Line(box.start, vec2(box.start.x, box.end.y))) ||
         intersects(LoS, Line(box.end, vec2(box.start.x, box.end.y)))   ||
         intersects(LoS, Line(box.end, vec2(box.end.x, box.start.y))) ) {

        return vec3(0.0);
    }
    else {

        return hyperstep(light.min, light.max,  distance(pixel, light.pos)) * light.brightness * light.color;
    }
}

vec3 multisample(vec2 pixel) {

    vec2 points[4];

    points[0] = pixel + vec2(offset_a, offset_b);
    points[1] = pixel + vec2(-offset_a, -offset_b);
    points[2] = pixel + vec2(offset_b, -offset_a);
    points[3] = pixel + vec2(-offset_b, -offset_a);

    vec3 color = vec3(0.0);

    for (int i= 0; i < 4; i++) {
        color+= calculateLighting(points[i], light0);
        color+= calculateLighting(points[i], light1);
    }

    return color / 4.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{

    vec2 pixel= fragCoord / iResolution.y;

    light0.pos= iMouse.xy / iResolution.y;

    light1.pos.y= sin(iTime) / 4.0 + 0.5;

    //background color
    vec3 color= vec3(0.2, 0.1, 0.0);

    //anti-aliasing
    color+= multisample(pixel);

    //without anti-aliasing
    //color+= calculateLighting(pixel, light0);
    //color+= calculateLighting(pixel, light1);

    if (inside(box, pixel)) {

        //box color
        color = vec3(0.25, 0.4, 0.0);
    }

    fragColor= vec4(color, 1.0);
}`,

RoadCrossing : `// Based on https://www.shadertoy.com/view/XlcSz2
// Procedural texturing with analytical AA
// Uses basic box kernel with texture space axis aligned max screen space derivative kernel shape.


// The MIT License
// Copyright © 2019 Mykhailo Parfeniuk
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// The MIT License
// Copyright © 2017 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


float saturate(float x)
{
    return clamp(x, 0.0, 1.0);
}

// Sampled vector functions

float line(in float x)
{
    return ((x>0.0) && (x<1.0)) ? 1.0 : 0.0;
}

float dash(in float u, in float p)
{
    float frp_u = u - floor(u);
    return line(frp_u/p);
}

float crossing(in float u, in float v)
{
    float l_u = line(u);
    float l_v = line(v);
    return l_u+l_v-l_u*l_v;
}

float rect(in float u, in float v)
{
    float l_u = line(u);
    float l_v = line(v);
    return l_u*l_v;
}

// Analytical AA vector functions

float lineBox(in vec2 d_u)
{
    float u = d_u.x;
    float du = d_u.y;
    // analytical integral (box filter)
    return (saturate(u+0.5*du) - saturate(u-0.5*du))/du;
}

float dashBox( in vec2 d_u, in float p )
{
    float u = d_u.x;
    float du = d_u.y;
    float frac_u = u - floor(u);
    float p0 = frac_u-0.5*du;
    float p1 = frac_u+0.5*du;
    float flp1 = floor(p1);
    float flp0 = floor(p0);
    float frp1 = p1-floor(p1);
    float frp0 = p0-floor(p0);
    return p*((flp1-flp0) + (saturate(frp1/p)-saturate(frp0/p)))/du;
}

float crossingBox(in vec2 d_u, in vec2 d_v)
{
    float l_u = lineBox(d_u);
    float l_v = lineBox(d_v);
    return l_u+l_v-l_u*l_v;
}

float rectBox(in vec2 d_u, in vec2 d_v)
{
    float l_u = lineBox(d_u);
    float l_v = lineBox(d_v);
    return l_u*l_v;
}

// Helpers

vec2 tranScale(vec2 dual, float s, float t)
{
    return vec2((dual.x + t)*s, dual.y*s);
}

float tranScale(float v, float s, float t)
{
    return (v + t)*s;
}

vec3 bg = vec3(0.25, 1.0, 0.0);
vec3 grey = vec3(0.1);
vec3 white = vec3(1);

// --- AA Box filtered version ---

vec3 aaBoxFilteredTexture( in vec2 p, in vec2 ddx, in vec2 ddy )
{
    vec3 color;
    vec2 max_dd = max(ddx, ddy);
    vec2 dual_u = vec2(p.x, max_dd.x);
    vec2 dual_v = vec2(p.y, max_dd.y);
    float f, pattern;

    // background
    color = mix(bg, white, crossingBox(tranScale(dual_u, 0.5/6.75, 6.75), tranScale(dual_v, 0.5/6.75, 6.75)));
    color = mix(color, grey, crossingBox(tranScale(dual_u, 0.5/6.45, 6.45), tranScale(dual_v, 0.5/6.45, 6.45)));

    // centerlines, just add as patterns do not intersect due to filter
    f = 1.0-rectBox(tranScale(dual_u, 0.5/6.45, 6.45), tranScale(dual_v, 0.5/6.45, 6.45));
    pattern = f * (lineBox(tranScale(dual_u, 1.0/0.2, 0.3)) +
                   lineBox(tranScale(dual_v, 1.0/0.2, 0.3)) +
                   lineBox(tranScale(dual_u, 1.0/0.2, -0.1)) +
                   lineBox(tranScale(dual_v, 1.0/0.2, -0.1)) );
	// dashed, just add as patterns do not intersect due to filter
    f = 1.0-rectBox(tranScale(dual_u, 0.5/10.7, 10.7), tranScale(dual_v, 0.5/10.7, 10.7));
    pattern += f * (lineBox(tranScale(dual_u, 1.0/0.15, 3.45))*dashBox(tranScale(dual_v, 1.0/2.0, 1.0), 0.6) +
                    lineBox(tranScale(dual_v, 1.0/0.15, 3.45))*dashBox(tranScale(dual_u, 1.0/2.0, 1.0), 0.6) +
                    lineBox(tranScale(dual_u, 1.0/0.15, -3.3))*dashBox(tranScale(dual_v, 1.0/2.0, 1.0), 0.6) +
                    lineBox(tranScale(dual_v, 1.0/0.15, -3.3))*dashBox(tranScale(dual_u, 1.0/2.0, 1.0), 0.6));
    // stop lines, add again
    pattern += rectBox(tranScale(dual_u, 1.0/0.4, -9.55), tranScale(dual_v, 1.0/5.55, -0.6)) +
               rectBox(tranScale(dual_u, 1.0/0.4,  10.05), tranScale(dual_v, 1.0/5.55, -0.6)) +
               rectBox(tranScale(dual_u, 1.0/0.4, -9.55), tranScale(dual_v, 1.0/5.55, 6.15)) +
               rectBox(tranScale(dual_u, 1.0/0.4,  10.05), tranScale(dual_v, 1.0/5.55, 6.15)) +
               rectBox(tranScale(dual_v, 1.0/0.4, -9.55), tranScale(dual_u, 1.0/5.55, -0.6)) +
               rectBox(tranScale(dual_v, 1.0/0.4,  10.05), tranScale(dual_u, 1.0/5.55, -0.6)) +
               rectBox(tranScale(dual_v, 1.0/0.4, -9.55), tranScale(dual_u, 1.0/5.55, 6.15)) +
               rectBox(tranScale(dual_v, 1.0/0.4,  10.05), tranScale(dual_u, 1.0/5.55, 6.15));
    // pedestrian crossing, add again
    pattern += rectBox(tranScale(dual_v, 1.0/2.0,  9.05), tranScale(dual_u, 1.0/5.55, 6.15))*dashBox(tranScale(dual_u, 1.0/0.6, 5.925), 0.5) +
               rectBox(tranScale(dual_v, 1.0/2.0,  9.05), tranScale(dual_u, 1.0/5.55, -0.6))*dashBox(tranScale(dual_u, 1.0/0.6, -0.825), 0.5) +
               rectBox(tranScale(dual_v, 1.0/2.0,  -7.05), tranScale(dual_u, 1.0/5.55, 6.15))*dashBox(tranScale(dual_u, 1.0/0.6, 5.925), 0.5) +
               rectBox(tranScale(dual_v, 1.0/2.0,  -7.05), tranScale(dual_u, 1.0/5.55, -0.6))*dashBox(tranScale(dual_u, 1.0/0.6, -0.825), 0.5) +
               rectBox(tranScale(dual_u, 1.0/2.0,  9.05), tranScale(dual_v, 1.0/5.55, 6.15))*dashBox(tranScale(dual_v, 1.0/0.6, 5.925), 0.5) +
               rectBox(tranScale(dual_u, 1.0/2.0,  9.05), tranScale(dual_v, 1.0/5.55, -0.6))*dashBox(tranScale(dual_v, 1.0/0.6, -0.825), 0.5) +
               rectBox(tranScale(dual_u, 1.0/2.0,  -7.05), tranScale(dual_v, 1.0/5.55, 6.15))*dashBox(tranScale(dual_v, 1.0/0.6, 5.925), 0.5) +
               rectBox(tranScale(dual_u, 1.0/2.0,  -7.05), tranScale(dual_v, 1.0/5.55, -0.6))*dashBox(tranScale(dual_v, 1.0/0.6, -0.825), 0.5);
    color = mix(color, white, pattern);

    return color;
}

// --- sampled version ---

vec3 sampledTexture( in vec2 p )
{
    vec3 color;
    float u = p.x;
    float v = p.y;
    float f, pattern;

        // background
    color = mix(bg, white, crossing(tranScale(u, 0.5/6.75, 6.75), tranScale(v, 0.5/6.75, 6.75)));
    color = mix(color, grey, crossing(tranScale(u, 0.5/6.45, 6.45), tranScale(v, 0.5/6.45, 6.45)));

    // centerlines, just add as patterns do not intersect due to filter
    f = 1.0-rect(tranScale(u, 0.5/6.45, 6.45), tranScale(v, 0.5/6.45, 6.45));
    pattern = f * (line(tranScale(u, 1.0/0.2, 0.3)) +
                   line(tranScale(v, 1.0/0.2, 0.3)) +
                   line(tranScale(u, 1.0/0.2, -0.1)) +
                   line(tranScale(v, 1.0/0.2, -0.1)) );
	// dashed, just add as patterns do not intersect due to filter
    f = 1.0-rect(tranScale(u, 0.5/10.7, 10.7), tranScale(v, 0.5/10.7, 10.7));
    pattern += f * (line(tranScale(u, 1.0/0.15, 3.45))*dash(tranScale(v, 1.0/2.0, 1.0), 0.6) +
                    line(tranScale(v, 1.0/0.15, 3.45))*dash(tranScale(u, 1.0/2.0, 1.0), 0.6) +
                    line(tranScale(u, 1.0/0.15, -3.3))*dash(tranScale(v, 1.0/2.0, 1.0), 0.6) +
                    line(tranScale(v, 1.0/0.15, -3.3))*dash(tranScale(u, 1.0/2.0, 1.0), 0.6));
    // stop lines, add again
    pattern += rect(tranScale(u, 1.0/0.4, -9.55), tranScale(v, 1.0/5.55, -0.6)) +
               rect(tranScale(u, 1.0/0.4,  10.05), tranScale(v, 1.0/5.55, -0.6)) +
               rect(tranScale(u, 1.0/0.4, -9.55), tranScale(v, 1.0/5.55, 6.15)) +
               rect(tranScale(u, 1.0/0.4,  10.05), tranScale(v, 1.0/5.55, 6.15)) +
               rect(tranScale(v, 1.0/0.4, -9.55), tranScale(u, 1.0/5.55, -0.6)) +
               rect(tranScale(v, 1.0/0.4,  10.05), tranScale(u, 1.0/5.55, -0.6)) +
               rect(tranScale(v, 1.0/0.4, -9.55), tranScale(u, 1.0/5.55, 6.15)) +
               rect(tranScale(v, 1.0/0.4,  10.05), tranScale(u, 1.0/5.55, 6.15));
    // pedestrian crossing, add again
    pattern += rect(tranScale(v, 1.0/2.0,  9.05), tranScale(u, 1.0/5.55, 6.15))*dash(tranScale(u, 1.0/0.6, 5.925), 0.5) +
               rect(tranScale(v, 1.0/2.0,  9.05), tranScale(u, 1.0/5.55, -0.6))*dash(tranScale(u, 1.0/0.6, -0.825), 0.5) +
               rect(tranScale(v, 1.0/2.0,  -7.05), tranScale(u, 1.0/5.55, 6.15))*dash(tranScale(u, 1.0/0.6, 5.925), 0.5) +
               rect(tranScale(v, 1.0/2.0,  -7.05), tranScale(u, 1.0/5.55, -0.6))*dash(tranScale(u, 1.0/0.6, -0.825), 0.5) +
               rect(tranScale(u, 1.0/2.0,  9.05), tranScale(v, 1.0/5.55, 6.15))*dash(tranScale(v, 1.0/0.6, 5.925), 0.5) +
               rect(tranScale(u, 1.0/2.0,  9.05), tranScale(v, 1.0/5.55, -0.6))*dash(tranScale(v, 1.0/0.6, -0.825), 0.5) +
               rect(tranScale(u, 1.0/2.0,  -7.05), tranScale(v, 1.0/5.55, 6.15))*dash(tranScale(v, 1.0/0.6, 5.925), 0.5) +
               rect(tranScale(u, 1.0/2.0,  -7.05), tranScale(v, 1.0/5.55, -0.6))*dash(tranScale(v, 1.0/0.6, -0.825), 0.5);
    color = mix(color, white, pattern);

    return color;
}

// Helpers

vec2 toUV( in vec3 pos )
{
	return pos.xz;
}


void calcCamera( out vec3 ro, out vec3 ta )
{
	float an = 0.1*iTime;//0.1*sin(3.0*iTime);
	ro = vec3( 6.0*cos(an), 200.0*abs(0.5-0.5*sin(2.1005*an))+1.05, 6.0*sin(an) );
    ta = vec3( 0.0, 1.0, 0.0 );
}

void calcRayForPixel( in vec2 pix, out vec3 resRo, out vec3 resRd )
{
	vec2 p = (-iResolution.xy + 2.0*pix) / iResolution.y;

     // camera movement
	vec3 ro, ta;
	calcCamera( ro, ta );
    // camera matrix
    vec3 ww = normalize( ta - ro );
    vec3 uu = normalize( cross(ww,vec3(0.0,1.0,0.0) ) );
    vec3 vv = normalize( cross(uu,ww));
	// create view ray
	vec3 rd = normalize( p.x*uu + p.y*vv + 2.0*ww );

	resRo = ro;
	resRd = rd;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 p = (-iResolution.xy + 2.0*fragCoord) / iResolution.y;

	vec3 ro, rd, ddx_ro, ddx_rd, ddy_ro, ddy_rd;
	calcRayForPixel( fragCoord + vec2(0.0,0.0), ro, rd );
	calcRayForPixel( fragCoord + vec2(1.0,0.0), ddx_ro, ddx_rd );
	calcRayForPixel( fragCoord + vec2(0.0,1.0), ddy_ro, ddy_rd );


	vec3 col = vec3(0.9);

    // intersect plane
	float t = (0.01-ro.y)/rd.y;
	if( t>0.0 )
	{
		vec3 nor = vec3(0.0,1.0,0.0);
		vec3 pos = ro + t*rd;

#if 1
		// -----------------------------------------------------------------------
        // compute ray differentials by intersecting the tangent plane to the
        // surface.
		// -----------------------------------------------------------------------

		// computer ray differentials
		vec3 ddx_pos = ddx_ro - ddx_rd*dot(ddx_ro-pos,nor)/dot(ddx_rd,nor);
		vec3 ddy_pos = ddy_ro - ddy_rd*dot(ddy_ro-pos,nor)/dot(ddy_rd,nor);

		// calc texture sampling footprint
		vec2     uv = toUV(     pos );
		vec2 ddx_uv = toUV( ddx_pos ) - uv;
		vec2 ddy_uv = toUV( ddy_pos ) - uv;
#else
		// -----------------------------------------------------------------------
        // Because we are in the GPU, we do have access to differentials directly
        // This wouldn't be the case in a regular raytrace.
		// It wouldn't work as well in shaders doing interleaved calculations in
		// pixels (such as some of the 3D/stereo shaders here in Shadertoy)
		// -----------------------------------------------------------------------
		vec2 uvw = toUV( pos );

		// calc texture sampling footprint
		vec2 ddx_uvw = dFdx( uvw );
        vec2 ddy_uvw = dFdy( uvw );
#endif

        // Texture
        if( p.x<0.0 ) col = vec3(1.0)*sampledTexture( uv );
        else          col = vec3(1.0)*aaBoxFilteredTexture( uv, abs(ddx_uv), abs(ddy_uv) );
	}

	col *= smoothstep( 1.0, 2.0, abs(p.x)/(2.0/iResolution.y) );

    // "gamma correction"
	col = pow( col, vec3(0.4545) );
	fragColor = vec4( col, 1.0 );
}`,

FilteredGrid  : `// The MIT License
// Copyright © 2017 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


// Similar to https://www.shadertoy.com/view/XlcSz2, but for grid patterns. More info here:
//
// http://iquilezles.org/www/articles/filterableprocedurals/filterableprocedurals.htm
//
// checker, 2D, box filter: https://www.shadertoy.com/view/XlcSz2
// checker, 3D, box filter: https://www.shadertoy.com/view/XlXBWs
// checker, 3D, tri filter: https://www.shadertoy.com/view/llffWs
// grid,    2D, box filter: https://www.shadertoy.com/view/XtBfzz
// xor,     2D, box filter: https://www.shadertoy.com/view/tdBXRW


// --- analytically box-filtered grid ---

const float N = 10.0; // grid ratio
float gridTextureGradBox( in vec2 p, in vec2 ddx, in vec2 ddy )
{
	// filter kernel
    vec2 w = max(abs(ddx), abs(ddy)) + 0.01;

	// analytic (box) filtering
    vec2 a = p + 0.5*w;
    vec2 b = p - 0.5*w;
    vec2 i = (floor(a)+min(fract(a)*N,1.0)-
              floor(b)-min(fract(b)*N,1.0))/(N*w);
    //pattern
    return (1.0-i.x)*(1.0-i.y);
}

// --- unfiltered grid ---

float gridTexture( in vec2 p )
{
    // coordinates
    vec2 i = step( fract(p), vec2(1.0/N) );
    //pattern
    return (1.0-i.x)*(1.0-i.y);   // grid (N=10)

    // other possible patterns are these
    //return 1.0-i.x*i.y;           // squares (N=4)
    //return 1.0-i.x-i.y+2.0*i.x*i.y; // checker (N=2)
}


//===============================================================================================
//===============================================================================================
// sphere implementation
//===============================================================================================
//===============================================================================================

float softShadowSphere( in vec3 ro, in vec3 rd, in vec4 sph )
{
    vec3 oc = sph.xyz - ro;
    float b = dot( oc, rd );

    float res = 1.0;
    if( b>0.0 )
    {
        float h = dot(oc,oc) - b*b - sph.w*sph.w;
        res = smoothstep( 0.0, 1.0, 2.0*h/b );
    }
    return res;
}

float occSphere( in vec4 sph, in vec3 pos, in vec3 nor )
{
    vec3 di = sph.xyz - pos;
    float l = length(di);
    return 1.0 - dot(nor,di/l)*sph.w*sph.w/(l*l);
}

float iSphere( in vec3 ro, in vec3 rd, in vec4 sph )
{
    float t = -1.0;
	vec3  ce = ro - sph.xyz;
	float b = dot( rd, ce );
	float c = dot( ce, ce ) - sph.w*sph.w;
	float h = b*b - c;
	if( h>0.0 )
	{
		t = -b - sqrt(h);
	}

	return t;
}

//===============================================================================================
//===============================================================================================
// scene
//===============================================================================================
//===============================================================================================


// spheres
const vec4 sc0 = vec4(  3.0, 0.5, 0.0, 0.5 );
const vec4 sc1 = vec4( -4.0, 2.0,-5.0, 2.0 );
const vec4 sc2 = vec4( -4.0, 2.0, 5.0, 2.0 );
const vec4 sc3 = vec4(-30.0, 8.0, 0.0, 8.0 );

float intersect( vec3 ro, vec3 rd, out vec3 pos, out vec3 nor, out float occ, out int matid )
{
    // raytrace
	float tmin = 10000.0;
	nor = vec3(0.0);
	occ = 1.0;
	pos = vec3(0.0);
    matid = -1;

	// raytrace-plane
	float h = (0.01-ro.y)/rd.y;
	if( h>0.0 )
	{
		tmin = h;
		nor = vec3(0.0,1.0,0.0);
		pos = ro + h*rd;
		matid = 0;
		occ = occSphere( sc0, pos, nor ) *
			  occSphere( sc1, pos, nor ) *
			  occSphere( sc2, pos, nor ) *
			  occSphere( sc3, pos, nor );
	}


	// raytrace-sphere
	h = iSphere( ro, rd, sc0 );
	if( h>0.0 && h<tmin )
	{
		tmin = h;
        pos = ro + h*rd;
		nor = normalize(pos-sc0.xyz);
		matid = 1;
		occ = 0.5 + 0.5*nor.y;
	}

	h = iSphere( ro, rd, sc1 );
	if( h>0.0 && h<tmin )
	{
		tmin = h;
        pos = ro + tmin*rd;
		nor = normalize(pos-sc1.xyz);
		matid = 2;
		occ = 0.5 + 0.5*nor.y;
	}

	h = iSphere( ro, rd, sc2 );
	if( h>0.0 && h<tmin )
	{
		tmin = h;
        pos = ro + tmin*rd;
		nor = normalize(pos-sc2.xyz);
		matid = 3;
		occ = 0.5 + 0.5*nor.y;
	}

	h = iSphere( ro, rd, sc3 );
	if( h>0.0 && h<tmin )
	{
		tmin = h;
        pos = ro + tmin*rd;
		nor = normalize(pos-sc3.xyz);
		matid = 4;
		occ = 0.5 + 0.5*nor.y;
	}

	return tmin;
}

vec2 texCoords( in vec3 pos, int mid )
{
    vec2 matuv;

    if( mid==0 )
    {
        matuv = pos.xz;
    }
    else if( mid==1 )
    {
        vec3 q = normalize( pos - sc0.xyz );
        matuv = vec2( atan(q.x,q.z), acos(q.y ) )*sc0.w;
    }
    else if( mid==2 )
    {
        vec3 q = normalize( pos - sc1.xyz );
        matuv = vec2( atan(q.x,q.z), acos(q.y ) )*sc1.w;
    }
    else if( mid==3 )
    {
        vec3 q = normalize( pos - sc2.xyz );
        matuv = vec2( atan(q.x,q.z), acos(q.y ) )*sc2.w;
    }
    else if( mid==4 )
    {
        vec3 q = normalize( pos - sc3.xyz );
        matuv = vec2( atan(q.x,q.z), acos(q.y ) )*sc3.w;
    }

	return 8.0*matuv;
}


void calcCamera( out vec3 ro, out vec3 ta )
{
	float an = 0.1*sin(0.1*iTime);
	ro = vec3( 5.0*cos(an), 0.5, 5.0*sin(an) );
    ta = vec3( 0.0, 1.0, 0.0 );
}

vec3 doLighting( in vec3 pos, in vec3 nor, in float occ, in vec3 rd )
{
    float sh = min( min( min( softShadowSphere( pos, vec3(0.57703), sc0 ),
				              softShadowSphere( pos, vec3(0.57703), sc1 )),
				              softShadowSphere( pos, vec3(0.57703), sc2 )),
                              softShadowSphere( pos, vec3(0.57703), sc3 ));
	float dif = clamp(dot(nor,vec3(0.57703)),0.0,1.0);
	float bac = clamp(0.5+0.5*dot(nor,vec3(-0.707,0.0,-0.707)),0.0,1.0);
    vec3 lin  = dif*vec3(1.50,1.40,1.30)*sh;
	     lin += occ*vec3(0.15,0.20,0.30);
	     lin += bac*vec3(0.10,0.10,0.10)*(0.2+0.8*occ);

    return lin;
}
//===============================================================================================
//===============================================================================================
// render
//===============================================================================================
//===============================================================================================

void calcRayForPixel( in vec2 pix, out vec3 resRo, out vec3 resRd )
{
	vec2 p = (-iResolution.xy + 2.0*pix) / iResolution.y;

     // camera movement
	vec3 ro, ta;
	calcCamera( ro, ta );
    // camera matrix
    vec3 ww = normalize( ta - ro );
    vec3 uu = normalize( cross(ww,vec3(0.0,1.0,0.0) ) );
    vec3 vv = normalize( cross(uu,ww));
	// create view ray
	vec3 rd = normalize( p.x*uu + p.y*vv + 2.0*ww );

	resRo = ro;
	resRd = rd;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 p = (-iResolution.xy + 2.0*fragCoord) / iResolution.y;

	vec3 ro, rd, ddx_ro, ddx_rd, ddy_ro, ddy_rd;
	calcRayForPixel( fragCoord + vec2(0.0,0.0), ro, rd );
	calcRayForPixel( fragCoord + vec2(1.0,0.0), ddx_ro, ddx_rd );
	calcRayForPixel( fragCoord + vec2(0.0,1.0), ddy_ro, ddy_rd );

    // trace
	vec3 pos, nor;
	float occ;
    int mid;
    float t = intersect( ro, rd, pos, nor, occ, mid );

	vec3 col = vec3(0.9);
	if( mid!=-1 )
	{
#if 1
		// -----------------------------------------------------------------------
        // compute ray differentials by intersecting the tangent plane to the
        // surface.
		// -----------------------------------------------------------------------

		// computer ray differentials
		vec3 ddx_pos = ddx_ro - ddx_rd*dot(ddx_ro-pos,nor)/dot(ddx_rd,nor);
		vec3 ddy_pos = ddy_ro - ddy_rd*dot(ddy_ro-pos,nor)/dot(ddy_rd,nor);

		// calc texture sampling footprint
		vec2     uv = texCoords(     pos, mid );
		vec2 ddx_uv = texCoords( ddx_pos, mid ) - uv;
		vec2 ddy_uv = texCoords( ddy_pos, mid ) - uv;
#else
		// -----------------------------------------------------------------------
        // Because we are in the GPU, we do have access to differentials directly
        // This wouldn't be the case in a regular raytrace.
		// It wouldn't work as well in shaders doing interleaved calculations in
		// pixels (such as some of the 3D/stereo shaders here in Shadertoy)
		// -----------------------------------------------------------------------
		vec2 uvw = texCoords( pos, mid );

		// calc texture sampling footprint
		vec2 ddx_uvw = dFdx( uvw );
        vec2 ddy_uvw = dFdy( uvw );
#endif


		// shading
		vec3 mate = vec3(0.0);

        if( p.x<0.0 ) mate = vec3(1.0)*gridTexture( uv );
        else          mate = vec3(1.0)*gridTextureGradBox( uv, ddx_uv, ddy_uv );

        // lighting
		vec3 lin = doLighting( pos, nor, occ, rd );

        // combine lighting with material
		col = mate * lin;

        // fog
        col = mix( col, vec3(0.9), 1.0-exp( -0.00001*t*t ) );
	}

    // gamma correction
	col = pow( col, vec3(0.4545) );

	col *= smoothstep( 1.0, 2.0, abs(p.x)/(2.0/iResolution.y) );

	fragColor = vec4( col, 1.0 );
}`,

GilmoreLeaves  : `
//  https://www.shadertoy.com/view/MsdSWl
const float PI = 3.1415926535;
const float flipTime  = 2.;

vec2 tileDims = vec2(3.0,3.0); //number of rows ,columns

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float randomRange (in vec2 seed, in float min, in float max) {
		return min + random(seed) * (max - min);
}

vec2 rotate2D(vec2 position, float theta)
{
    mat2 m = mat2( cos(theta), -sin(theta), sin(theta), cos(theta) );
    return m * position;
}

vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

//returns 1 for inside circ, 0 for outside
float circle(in vec2 _st, in vec2 pos, in float _radius){

    float circEdge  =  20.0 / iResolution.x;

    vec2 dist = _st - pos;
	return 1. - smoothstep(_radius-(_radius*circEdge),
                         _radius+(_radius*circEdge),
                         dot(dist,dist)*4.0);
}

vec3 gilmoreCol(float x){
    //offset hue to put red in middle
    float hue = fract((1.0 - x) - 0.45);
    //saturation is higher for warmer colors
    float sat = 0.3 + sin(x*PI)*0.5;
    //brightness higher in middle
    float bri = (smoothstep(0.,0.6, x) - smoothstep(0.6,1.0,x))*.6 + 0.3;
    return vec3(hue, sat,bri);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{

     //0-1 on both axes
    vec2 uv = fragCoord.xy / iResolution.xy;

    //square aspect ratio, centered
    vec2 uvs = vec2( fragCoord.xy - 0.5*iResolution.xy ) / min(iResolution.x,iResolution.y);

    //switch tileDims every 2 seconds
    float rndTime = randomRange(vec2(floor(iTime/flipTime), 79834.345),3.,16.);
    //number of rows ,columns
    tileDims = vec2(floor(rndTime),floor(rndTime));

    //rotate
    uvs = rotate2D(uvs,cos(iTime/10.));

    //warp
    //uvs.x = uvs.x + sin(uvs.x*4.+iTime*6.)*0.005;

    //zoomer
    //uvs *= (cos(iTime/2.) *0.2 + 1.);

    //slide columns down separately
    //tile H coord
    float colId = floor(uvs.x * tileDims.x);
    //rand per column
    float rndColumn = random(vec2(colId, 687.890));
    uvs.y += iTime * (rndColumn ) /30.;

    //bounce
    //uvs.y += cos(iTime*PI * rndColumn)/10.;

	//rnd per tile
    float rnd = random(floor(uvs.xy * tileDims) +  floor(iTime/flipTime));

    //mostly green w/ some reds
    vec3 tileHSV;
    if(rnd < 0.9){
       tileHSV = gilmoreCol(rnd/2.6);
    }else{
        tileHSV = gilmoreCol(rnd - 0.4);
    }

    //get random int 0 - 3 per tile
    float tileRnd = random(floor(uvs.xy * tileDims ) * 88.89 );
    tileRnd = floor(tileRnd * 4.);

    //st is 0-1 coords within tile
    vec2 st = fract(uvs * tileDims);

    //flip tiles
    if (tileRnd == 1.) {
    	st.y = 1.0 - st.y;
    }else if (tileRnd == 2.) {
       st.x = 1.0 - st.x;
    } else if (tileRnd == 3.) {
        st.x = 1.0 - st.x;
        st.y = 1.0 - st.y;
    }

    //draw circles
    float circ = circle(st,vec2(0),4.);
	tileHSV.z *= circ;

    //column shadows
    float hShadow = smoothstep(0.4, 0., fract(-uvs.x*tileDims.x)) * 0.12;
   	tileHSV.z -= hShadow;

    //slight vertical hue shift
    float vShift = smoothstep(0.9, 0., st.y) * 0.03;
   	tileHSV.x -= vShift;

    //screen vertical brightness gradient
    tileHSV.z -= fract( 1.0 - uv.y  ) * 0.3;

    fragColor = vec4(hsv2rgb(tileHSV),1.0);

}`,

Sunflower : `#define N 20.
void mainImage( out vec4 o, vec2 u ) {
    u = (u+u-(o.xy=iResolution.xy))/o.y;
    //vec2 R=iResolution.xy;
    //u = (u+u -R)/R.y;
    float t = iTime,
          r = length(u), a = atan(u.y,u.x);
    // r *= 1.-.1*(.5+.5*cos(2.*r*t));
    float i = floor(r*N);
    a *= floor(pow(128.,i/N)); 	 a += 10.*t+123.34*i;
    r +=  (.5+.5*cos(a)) / N;    r = floor(N*r)/N;
	o = (1.-r)*vec4(3,2,1,1);
}`,

RandomDotMask  : `#define rand(p)  fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453)

float num = 50.;

void mainImage( out vec4 O, in vec2 t )
{
	t /= iResolution.x;
    t.y += iTime *0.05;
    t *= num;

    float r = rand(floor(t*num)/num);
    O = vec4( smoothstep(.5,.6, 1. -length(fract(t) - .5)) * rand(floor(t)/num) );
}`,


}
