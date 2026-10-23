/* The intro reel: every frame is window.seek(t), a pure function of time (closed-form springs, no timers).
   Ported verbatim from the AI1 page; mountReel wires it to a container and reports when it ends. */
/* eslint-disable */
// @ts-nocheck
export function mountReel(opts: { onEnd?: () => void; force?: boolean; scrubFrame?: HTMLElement | null; scrubTrack?: HTMLElement | null; scrubBar?: HTMLElement | null }) {
  var html = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = true;
  var renderMode = html.classList.contains('render');
  if (opts.force) { try { sessionStorage.removeItem('reel-seen'); } catch (e) {} }
  /* ---------- motion helpers: closed-form springs, so any frame can be painted without history ---------- */
  function clamp(x, a, b) { return Math.min(b == null ? 1 : b, Math.max(a == null ? 0 : a, x)); }
  function spring(t, k, d) {
    if (t <= 0) return 0; k = k || 170; d = d || 26;
    var w0 = Math.sqrt(k), z = d / (2 * w0);
    if (z < 1) { var wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  }
  function track(t, keys, k, d) { var v = keys[0][1]; for (var i = 1; i < keys.length; i++) v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], k, d); return v; }
  function ramp(t, a, b) { return clamp((t - a) / (b - a)); }
  function smooth(x) { return x * x * (3 - 2 * x); }

  /* ---------- WebGL helpers: every surface is a pure function of (t, size) ---------- */
  var NOISE = [
    'vec3 m289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;} vec4 m289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec4 perm(vec4 x){return m289(((x*34.0)+1.0)*x);} vec4 tis(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
    'vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}',
    'float cnoise(vec3 P){vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.0);Pi0=m289(Pi0);Pi1=m289(Pi1);vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.0);',
    'vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;',
    'vec4 ixy=perm(perm(ix)+iy);vec4 ixy0=perm(ixy+iz0);vec4 ixy1=perm(ixy+iz1);',
    'vec4 gx0=ixy0*(1.0/7.0);vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);',
    'vec4 gx1=ixy1*(1.0/7.0);vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);',
    'vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);',
    'vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);',
    'vec4 n0=tis(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=n0.x;g010*=n0.y;g100*=n0.z;g110*=n0.w;',
    'vec4 n1=tis(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=n1.x;g011*=n1.y;g101*=n1.z;g111*=n1.w;',
    'float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));',
    'float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);',
    'vec3 f=fade(Pf0);vec4 nz=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),f.z);vec2 ny=mix(nz.xy,nz.zw,f.y);return 2.2*mix(ny.x,ny.y,f.x);}'
  ].join('\n');
  /* shadergradient, reconstructed: a plane displaced by 0.75*cnoise(0.43*p*density + t*speed) * strength; colors mixed across x then by height; shaded by slope */
  var SG_FRAG = 'precision highp float;uniform vec2 r;uniform float t;uniform vec3 c1,c2,c3;' + NOISE +
    'float h(vec2 p,float tt){return 0.75*cnoise(vec3(0.43*p*1.3,0.0)+vec3(tt,tt*0.6,tt*0.3));}' +
    'void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=(uv-0.5)*vec2(r.x/r.y,1.0)*10.0;float tt=t*0.4;float d=h(p,tt);' +
    'float sx=h(p+vec2(0.12,0.0),tt)-d;float sy=h(p+vec2(0.0,0.12),tt)-d;float light=0.88+0.32*clamp(sx*4.0+sy*3.0,-0.6,0.6);' +
    'vec3 col=mix(mix(c1,c2,smoothstep(-3.0,3.0,p.x)),c3,clamp(0.5+d*1.1,0.0,1.0));col=mix(col,vec3(1.0,0.82,0.4),smoothstep(0.35,0.9,d))*light;gl_FragColor=vec4(col,1.0);}';
  /* liquid-logo, reconstructed: the plasma field inside the glyph mask, mapped onto the page palette */
  var LL_FRAG = 'precision highp float;uniform vec2 r;uniform float t;uniform sampler2D tex;' +
    'float th(float x){float e=exp(2.0*clamp(x,-8.0,8.0));return (e-1.0)/(e+1.0);}' +
    'void main(){vec2 uv=gl_FragCoord.xy/r;vec4 m=texture2D(tex,vec2(uv.x,1.0-uv.y));if(m.a<0.1)discard;' +
    'vec2 p=(gl_FragCoord.xy*2.0-r)/r.y;float time=t*0.34;float l=abs(0.66-dot(p,p))*0.36;vec2 v=p*(1.0-l)/3.11;vec4 o=vec4(0.0);' +
    'for(int i=1;i<=15;i++){float idx=float(i);vec2 off=cos(v.yx*idx+vec2(0.0,idx)+time)/idx+6.0;v+=off;o+=(sin(vec4(v.x,v.y,v.y,v.x))+1.0)*abs(v.x-v.y)*0.1;}' +
    'vec4 ratio=exp(p.y*vec4(0.2,0.0,-0.2,0.0))*exp(-1.8*l)/max(o,vec4(0.001));float k=clamp(th(ratio.x)*0.6+th(ratio.y)*0.4,0.0,1.0);' +
    'vec3 g=vec3(1.0,0.54,0.24),y=vec3(0.94,0.42,0.69),b=vec3(0.23,0.17,0.70);vec3 col=mix(mix(g,y,smoothstep(0.15,0.55,k)),b,smoothstep(0.6,0.95,k));' +
    'gl_FragColor=vec4(col,m.a);}';
  function glSurface(canvas, frag) {
    var gl = canvas.getContext('webgl', { preserveDrawingBuffer: true, antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) return null;
    function sh(type, src) { var o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) { return null; } return o; }
    var vs = sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}'), fs = sh(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return null;
    var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(pr); var a = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    var u = {}; function U(n) { return u[n] || (u[n] = gl.getUniformLocation(pr, n)); }
    return {
      gl: gl, program: pr, U: U,
      draw: function (set) { gl.viewport(0, 0, canvas.width, canvas.height); gl.useProgram(pr); gl.uniform2f(U('r'), canvas.width, canvas.height); set(gl, U); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
    };
  }
  function hex(h) { return [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255]; }
  var SG_COLORS = [hex('#ff8a3d'), hex('#f06ab0'), hex('#3b2bb3')];
  var SG_DARK = [hex('#7a2d1a'), hex('#5a1f55'), hex('#141a4a')];
  function drawSG(surf, t, cols) { cols = cols || SG_COLORS; surf.draw(function (gl, U) { gl.uniform1f(U('t'), t); gl.uniform3fv(U('c1'), cols[0]); gl.uniform3fv(U('c2'), cols[1]); gl.uniform3fv(U('c3'), cols[2]); }); }

  /* ---------- the reel ---------- */
  var REEL_T = 15;
  var reel = document.getElementById('reel');
  var reelPlaying = false;
  var reelReady = false;
  (function () {
    var force = /[?&]reel/.test(location.search);
    var seen = false;
    try { seen = sessionStorage.getItem('reel-seen') === '1'; } catch (err) {}
    var playIntro = renderMode || !(reduce || (seen && !force));
    if (playIntro) {
      reelPlaying = true;
      reel.hidden = false;
      document.body.classList.add('reel-on');
      try { if (!renderMode) sessionStorage.setItem('reel-seen', '1'); } catch (err) {}
    } else {
      html.classList.remove('reel-pending');
    }

    var stage = document.getElementById('stage');
    var shots = Array.prototype.slice.call(stage.querySelectorAll('.shot'));
    var reelFrame = document.getElementById('reelFrame');
    var scrubbing = false;
    var scrubFrame = opts.scrubFrame, scrubTrack = opts.scrubTrack, scrubBar = opts.scrubBar;
    function curScale() { return parseFloat(stage.style.getPropertyValue('--s')) || 1; }
    function fit() {
      var s, frame;
      if (renderMode) { s = 1; frame = reelFrame; }
      else if (scrubbing && scrubFrame) { frame = scrubFrame; var w = frame.parentNode.getBoundingClientRect().width || window.innerWidth; s = Math.min(w / 1920, (window.innerHeight - 170) / 1080); }
      else { frame = reelFrame; s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080); }
      stage.style.setProperty('--s', s);
      frame.style.width = (1920 * s) + 'px'; frame.style.height = (1080 * s) + 'px';
    }
    fit(); window.addEventListener('resize', fit);

    /* split the hook headline into masked words */
    var hook = document.getElementById('hookText');
    var hookWords = ['Built', 'at', 'one', 'desk.'];
    var hookSpans = hookWords.map(function (w, i) {
      var m = document.createElement('span'); m.className = 'wm';
      var s = document.createElement('span'); s.textContent = w; if (i === 3) s.className = 'em';
      m.appendChild(s); hook.appendChild(m); hook.appendChild(document.createTextNode(' '));
      return s;
    });
    var endName = document.getElementById('endName');
    var endSpans = ['Lakshmi', 'Siri', 'Appalaneni'].map(function (w) {
      var m = document.createElement('span'); m.className = 'wm';
      var s = document.createElement('span'); s.textContent = w; m.appendChild(s); endName.appendChild(m); endName.appendChild(document.createTextNode(' '));
      return s;
    });

    var pill = document.getElementById('pill');
    var words = Array.prototype.slice.call(pill.querySelectorAll('[data-w]'));
    var wordW = [];
    var WORD_T = [6.95, 7.45, 7.95, 8.45, 8.95];
    var pillKeys = null;
    function measure() {
      var s3 = stage.querySelector('.s3'); s3.classList.add('on');
      wordW = words.map(function (w) { return w.getBoundingClientRect().width / (parseFloat(stage.style.getPropertyValue('--s')) || 1) + 120; });
      pillKeys = [[0, 1920], [6.52, 1920], [6.56, 160]];
      WORD_T.forEach(function (tt, i) { pillKeys.push([tt - 0.12, wordW[i]]); });
      pillKeys.push([9.35, 220]);
      s3.classList.remove('on');
    }

    var el = function (id) { return document.getElementById(id); };
    var gridIc = el('gridIc'), hookSub = el('hookSub');
    var sgHook = glSurface(el('sgHook'), SG_FRAG);
    if (!sgHook) el('sgHook').style.display = 'none';
    /* the name as a glyph mask for the plasma: drawn once with the display font, after fonts are ready */
    var namebox = el('namebox'), liquid = null;
    function buildLiquid() {
      var c = el('liquidName'); var surf = glSurface(c, LL_FRAG); if (!surf) return;
      var m = document.createElement('canvas'); m.width = c.width; m.height = c.height; var x = m.getContext('2d');
      x.clearRect(0, 0, m.width, m.height); x.fillStyle = '#000'; x.font = '132px Gloock, Georgia, serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText('Lakshmi Siri Appalaneni', m.width / 2, m.height / 2 + 8);
      var gl = surf.gl, tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, m);
      liquid = { surf: surf, tex: tex };
      namebox.classList.add('gl');
    }
    var cityFull = el('cityFull'), corner1 = el('corner1'), wipeIn = el('wipeIn');
    var strips = [el('st0'), el('st1'), el('st2'), el('st3')];
    var pillNote = el('pillNote');
    var his = Array.prototype.slice.call(stage.querySelectorAll('[data-hi]')), hdot = el('hdot');
    var HI_T = [9.55, 10.4, 11.25];
    var endpool = el('endpool'), endTag = el('endTag'), endCta = el('endCta');
    var S1 = [0, 2.95], S2 = [2.55, 6.7], S3 = [6.3, 9.7], S4 = [9.35, 12.95], S5 = [12.6, 15.2];

    function seek(t) {
      t = Math.max(0, t);
      shots.forEach(function (s, i) {
        var r = [S1, S2, S3, S4, S5][i];
        s.classList.toggle('on', t >= r[0] && t < r[1]);
      });
      gridIc.style.transform = 'translate(' + (-60 * t) + 'px,' + (-34 * t + 30 * Math.sin(t * 0.9)) + 'px) rotate(-8deg)';

      /* shot 1: field drifts, grid glides, words rise one per beat, then the whole thing lifts away */
      if (t >= S1[0] && t < S1[1]) {
        if (sgHook) drawSG(sgHook, 2.0 + t, SG_DARK);
        hookSpans.forEach(function (s, i) {
          var p = spring(t - (0.25 + i * 0.28), 120, 20);
          var lift = spring(t - 2.45, 200, 24);
          s.style.transform = 'translateY(' + (112 - 112 * p - 130 * lift) + '%)';
        });
        hookSub.style.opacity = clamp(ramp(t, 1.5, 2.0) - ramp(t, 2.45, 2.7));
        hookSub.style.transform = 'translateY(' + (12 - 12 * smooth(ramp(t, 1.5, 2.0))) + 'px)';
      }
      /* shot 2: a wipe reveals Hyderabad; the frame splits into four strips that slide in, each with its own corner note; then the strips fold into one bar */
      if (t >= S2[0] && t < S2[1]) {
        var w = smooth(ramp(t, 2.55, 3.05));
        wipeIn.style.clipPath = 'inset(0 0 0 ' + (w * 100) + '%)';
        cityFull.style.transform = 'scale(' + (1.12 - 0.08 * ramp(t, 2.55, 4.4)) + ')';
        var c1 = spring(t - 3.0, 120, 20), c1o = spring(t - 3.75, 200, 24);
        corner1.style.opacity = clamp(c1 - c1o);
        corner1.style.transform = 'translateY(' + (30 - 30 * c1 - 24 * c1o) + 'px)';
        strips.forEach(function (s, i) {
          var p = spring(t - (3.8 + i * 0.14), 150, 22);
          var dir = i % 2 ? -1 : 1;
          s.style.transform = 'translateY(' + ((1 - p) * 100 * dir) + '%) scale(' + (1.06 - 0.06 * ramp(t, 3.8, 6.4)) + ')';
          s.style.opacity = p > 0.001 ? 1 : 0;
          var lab = s.querySelector('.clabel');
          var lp = spring(t - (4.1 + i * 0.14), 120, 20);
          lab.style.opacity = clamp(lp);
          lab.style.transform = 'translateY(' + (20 - 20 * lp) + 'px)';
        });
      }
      /* shot 3: one shape, never cuts: the bar becomes a pill, each word enters as the pill resizes to fit it, then it rounds into a lamp */
      if (t >= S3[0] && t < S3[1]) {
        if (!pillKeys) measure();
        var pw = track(t, pillKeys, 140, 22);
        var ph = track(t, [[0, 1080], [6.52, 1080], [6.56, 160], [6.93, 220], [9.35, 220]], 140, 22);
        var rounding = spring(t - 9.35, 120, 20);
        var cover = spring(t - 6.52, 140, 22);
        var rise = spring(t - 6.3, 150, 24);
        pill.style.width = pw + 'px';
        pill.style.height = ph + 'px';
        pill.style.borderRadius = (ph / 2 * cover) + 'px';
        pill.style.background = rounding > 0.5 ? '#f06ab0' : '#1c2a5e';
        var shrink = spring(t - 9.45, 160, 22);
        pill.style.transform = 'translate(-50%, calc(-50% + ' + ((1 - rise) * 1080).toFixed(1) + 'px)) scale(' + (1 - 0.3 * shrink) + ')';
        words.forEach(function (wd, i) {
          var tin = WORD_T[i], tout = (WORD_T[i + 1] || 9.35);
          var p = spring(t - tin, 170, 24), q = spring(t - tout, 220, 26);
          var vis = t >= tin - 0.05 && t < tout + 0.35;
          wd.style.opacity = vis ? clamp(p * 1.4 - q * 1.6) : 0;
          wd.style.transform = 'translateY(' + (90 - 90 * p - 90 * q) + 'px)';
          wd.style.filter = 'blur(' + ((1 - p) * 10 + q * 8).toFixed(2) + 'px)';
        });
        var noteP = spring(t - 7.1, 100, 18), noteQ = spring(t - 9.3, 200, 24);
        pillNote.style.opacity = clamp(noteP - noteQ);
        pillNote.style.transform = 'translateY(' + (10 - 10 * noteP) + 'px)';
      }
      /* shot 4: three highlights rise one per beat; a dot bounces from one to the next */
      if (t >= S4[0] && t < S4[1]) {
        var ys = [];
        his.forEach(function (h, i) {
          var p = spring(t - HI_T[i], 140, 20), q = spring(t - 12.55, 220, 26);
          h.style.opacity = clamp(p * 1.3 - q * 1.5);
          h.style.transform = 'translateY(' + (50 - 50 * p - 60 * q) + 'px)';
          h.style.filter = 'blur(' + ((1 - p) * 8 + q * 6).toFixed(2) + 'px)';
          ys.push(h.offsetTop + 44);
        });
        var keys = [[0, ys[0]]];
        HI_T.forEach(function (tt, i) { keys.push([tt + 0.05, ys[i]]); });
        var dy = track(t, keys, 110, 9);
        var arrive = Math.max.apply(null, HI_T.map(function (tt) { var a = t - tt; return a >= 0 && a < 0.5 ? 1 - a / 0.5 : 0; }));
        var squash = 1 + 0.35 * arrive * Math.sin((t * 14) % Math.PI);
        hdot.style.transform = 'translateY(' + (dy - 20) + 'px) scale(' + (1 / squash).toFixed(3) + ',' + squash.toFixed(3) + ')';
        hdot.style.opacity = clamp(spring(t - 9.5, 140, 20) - spring(t - 12.55, 220, 26));
      }
      /* shot 5: the lamp pool settles, the name rises, the pill lands as the real button */
      if (t >= S5[0] && t < S5[1]) {
        var ep = spring(t - 12.65, 60, 14);
        endpool.style.transform = 'scale(' + (0.4 + 0.7 * ep) + ')';
        endpool.style.opacity = clamp(ep);
        endSpans.forEach(function (s, i) { var p = spring(t - (12.85 + i * 0.16), 120, 20); s.style.transform = 'translateY(' + (112 - 112 * p) + '%)'; });
        if (liquid) {
          var np = spring(t - 12.9, 110, 18);
          namebox.style.opacity = clamp(np * 1.2); namebox.style.transform = 'translateY(' + (40 - 40 * np) + 'px)';
          var gl = liquid.surf.gl; gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, liquid.tex);
          liquid.surf.draw(function (g, U) { g.uniform1f(U('t'), t); g.uniform1i(U('tex'), 0); });
        }
        var tg = spring(t - 13.4, 120, 20); endTag.style.opacity = clamp(tg); endTag.style.transform = 'translateY(' + (16 - 16 * tg) + 'px)';
        var cp = spring(t - 13.7, 150, 20); endCta.style.opacity = clamp(cp); endCta.style.transform = 'scale(' + (0.9 + 0.1 * cp) + ')';
        reel.style.opacity = scrubbing ? '' : 1 - smooth(ramp(t, 14.65, 15.2));
      }
    }
    window.seek = seek;
    var finished = false;
    function endReel() {
      if (finished) return; finished = true;
      reelPlaying = false;
      reel.hidden = true; reel.style.opacity = '';
      document.body.classList.remove('reel-on');
      Array.prototype.forEach.call(document.querySelectorAll('#top [data-masked]'), function (h) { h.classList.add('is-visible'); });
      window.dispatchEvent(new Event('scroll'));
      startScrub();
      if (opts.onEnd) opts.onEnd();
    }
    /* the same stage, now driven by scroll: the pinned section's progress maps to 0..15 s */
    function startScrub() {
      if (!scrubFrame || !scrubTrack) return;
      scrubbing = true;
      scrubFrame.appendChild(stage);
      fit();
      var sraf = 0;
      function paint() {
        sraf = 0;
        var r = scrubTrack.getBoundingClientRect();
        var p = clamp(-r.top / (r.height - window.innerHeight));
        seek(p * REEL_T);
        if (scrubBar) scrubBar.style.transform = 'scaleX(' + p + ')';
      }
      function onS() { if (!sraf) sraf = requestAnimationFrame(paint); }
      window.addEventListener('scroll', onS, { passive: true });
      window.addEventListener('resize', onS);
      paint();
    }
    function ready() {
      html.classList.remove('reel-pending');
      try { buildLiquid(); } catch (err) { liquid = null; }
      measure();
      reelReady = true; window.reelReady = true;
      seek(0);
      if (renderMode) return;
      if (!playIntro) { finished = true; if (reduce) { if (scrubFrame) { scrubbing = true; scrubFrame.appendChild(stage); fit(); seek(5.6); } } else { startScrub(); } if (opts.onEnd) opts.onEnd(); return; }
      var start = performance.now();
      (function frame(now) {
        if (finished) return;
        var t = (now - start) / 1000;
        if (t >= REEL_T + 0.2) { endReel(); return; }
        seek(t);
        requestAnimationFrame(frame);
      })(start);
    }
    var skip = reel.querySelector('.reel-skip');
    skip.addEventListener('click', endReel);
    window.addEventListener('keydown', function (e) { if (reelPlaying && e.key === 'Escape') endReel(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready); else ready();
  })();

}
