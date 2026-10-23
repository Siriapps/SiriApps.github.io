import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A ShaderGradient-style surface built directly on react-three-fiber: a dense plane displaced
// by classic 3D Perlin noise in the vertex shader, three colors mixed across x and by height,
// a fourth warm tint on the crests. Time is the only animated input, so it is reduced-motion safe.
const NOISE = /* glsl */`
vec3 m289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;} vec4 m289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 perm(vec4 x){return m289(((x*34.0)+1.0)*x);} vec4 tis(vec4 r){return 1.79284291400159-0.85373472095314*r;}
vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.0);Pi0=m289(Pi0);Pi1=m289(Pi1);vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.0);
vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;
vec4 ixy=perm(perm(ix)+iy);vec4 ixy0=perm(ixy+iz0);vec4 ixy1=perm(ixy+iz1);
vec4 gx0=ixy0*(1.0/7.0);vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);
vec4 gx1=ixy1*(1.0/7.0);vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);
vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);
vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);
vec4 n0=tis(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=n0.x;g010*=n0.y;g100*=n0.z;g110*=n0.w;
vec4 n1=tis(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=n1.x;g011*=n1.y;g101*=n1.z;g111*=n1.w;
float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);
vec3 f=fade(Pf0);vec4 nz=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),f.z);vec2 ny=mix(nz.xy,nz.zw,f.y);return 2.2*mix(ny.x,ny.y,f.x);}
`

const VERT = /* glsl */`
uniform float uTime, uSpeed, uDensity, uStrength;
varying float vD; varying float vX;
${NOISE}
void main(){
  float t = uTime * uSpeed;
  float d = 0.75 * cnoise(0.43 * position * uDensity + vec3(t, t * 0.6, t * 0.3));
  vec3 pos = position + normal * d * uStrength;
  vD = d; vX = position.x;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`

const FRAG = /* glsl */`
uniform vec3 c1, c2, c3; uniform float uLight;
varying float vD; varying float vX;
void main(){
  vec3 col = mix(mix(c1, c2, smoothstep(-5.0, 5.0, vX)), c3, clamp(0.5 + vD * 1.1, 0.0, 1.0));
  col = mix(col, vec3(1.0, 0.82, 0.4), smoothstep(0.35, 0.9, vD));
  col *= uLight * (0.86 + 0.3 * clamp(vD, -0.5, 0.5));
  gl_FragColor = vec4(col, 1.0);
}`

type Props = { colors?: [string, string, string]; speed?: number; strength?: number; density?: number; light?: number; className?: string }

function Surface({ colors, speed, strength, density, light }: Required<Omit<Props, 'className'>>) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const reduce = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uSpeed: { value: speed }, uDensity: { value: density }, uStrength: { value: strength }, uLight: { value: light },
    c1: { value: new THREE.Color(colors[0]) }, c2: { value: new THREE.Color(colors[1]) }, c3: { value: new THREE.Color(colors[2]) },
  }), [colors, speed, density, strength, light])
  useFrame(({ clock }) => { if (mat.current && !reduce) mat.current.uniforms.uTime.value = clock.getElapsedTime() })
  return (
    <mesh rotation={[-0.55, 0, 0.35]} position={[0.4, -0.4, 0]}>
      <planeGeometry args={[18, 12, 160, 110]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={VERT} fragmentShader={FRAG} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function Gradient({ colors = ['#ff8a3d', '#f06ab0', '#3b2bb3'], speed = 0.35, strength = 1.6, density = 1.3, light = 1, className }: Props) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'low-power' }} camera={{ position: [0, 0, 6.5], fov: 45 }} frameloop="always">
        <Surface colors={colors} speed={speed} strength={strength} density={density} light={light} />
      </Canvas>
    </div>
  )
}
