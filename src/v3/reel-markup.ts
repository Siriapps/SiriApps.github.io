export const REEL_HTML = `<div class="reel" id="reel" role="region" aria-label="Opening reel" hidden>
  <div class="frame" id="reelFrame">
  <div class="stage" id="stage" aria-hidden="true">
    <!-- shot 1: hook -->
    <div class="shot s1">
      <canvas class="sg" id="sgHook" width="960" height="540"></canvas>
      <svg class="grid-ic" id="gridIc" viewBox="0 0 2800 2000" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
        <defs>
          <pattern id="ig" width="480" height="480" patternUnits="userSpaceOnUse">
            <g transform="translate(20 20)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><path d="M40 92 h40 M60 92 v-22 L84 40 M84 40 l-26 -8 l12 24"/></g>
            <g transform="translate(180 20)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><path d="M36 84 L80 40 l10 10 L46 94 Z M80 40 l10 10"/></g>
            <g transform="translate(340 20)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><circle cx="60" cy="60" r="8"/><ellipse cx="60" cy="60" rx="34" ry="14"/><ellipse cx="60" cy="60" rx="34" ry="14" transform="rotate(60 60 60)"/><ellipse cx="60" cy="60" rx="34" ry="14" transform="rotate(-60 60 60)"/></g>
            <g transform="translate(20 180)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><rect x="36" y="36" width="48" height="48" rx="6"/><path d="M48 36 v-10 M60 36 v-10 M72 36 v-10 M48 84 v10 M60 84 v10 M72 84 v10 M36 48 h-10 M36 60 h-10 M36 72 h-10 M84 48 h10 M84 60 h10 M84 72 h10"/></g>
            <g transform="translate(180 180)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><path d="M34 86 h52 M40 86 v-20 M54 86 v-34 M68 86 v-26 M82 86 v-42"/></g>
            <g transform="translate(340 180)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><rect x="30" y="34" width="60" height="52" rx="4"/><path d="M30 52 h60 M58 52 v34 M30 70 h28"/></g>
            <g transform="translate(20 340)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><rect x="42" y="28" width="36" height="64" rx="7"/><circle cx="60" cy="82" r="2.5"/></g>
            <g transform="translate(180 340)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><path d="M60 30 a22 22 0 0 1 12 40 v8 h-24 v-8 a22 22 0 0 1 12 -40 Z M50 88 h20"/></g>
            <g transform="translate(340 340)"><rect width="120" height="120" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)"/><path d="M30 44 h60 M30 44 v8 M45 44 v6 M60 44 v8 M75 44 v6 M90 44 v8 M36 70 h48 M36 78 h32"/></g>
          </pattern>
        </defs>
        <rect width="2800" height="2000" fill="url(#ig)"/>
      </svg>
      <div class="h1wrap"><div class="serif" id="hookText"></div></div>
      <div class="sub mono" id="hookSub">Lakshmi Siri Appalaneni, UT Dallas. linkedin.com/in/a-lakshmi-siri</div>
    </div>
    <!-- shot 2: cities -->
    <div class="shot s2">
      <div class="city" id="cityFull" style="background-image:url('/images/cities/hyderabad.jpg')"></div>
      <div class="corner glass" id="corner1"><div class="big">Hyderabad</div><div class="mono">Where I grew up</div></div>
      <div class="strip" id="st0" style="left:0;background-image:url('/images/cities/hyderabad.jpg')"><div class="clabel glass"><div class="name">Hyderabad</div><div class="note">Grew up here, 2010 to 2022</div></div></div>
      <div class="strip" id="st1" style="left:25%;background-image:url('/images/cities/toronto.jpg')"><div class="clabel glass"><div class="name">Toronto</div><div class="note">High school, R H King Academy, 2022 to 2023</div></div></div>
      <div class="strip" id="st2" style="left:50%;background-image:url('/images/cities/dallas.jpg')"><div class="clabel glass"><div class="name">Dallas</div><div class="note">Prosper High, then UT Dallas, 2023 onward</div></div></div>
      <div class="strip" id="st3" style="left:75%;background-image:url('/images/cities/sanfrancisco.jpg')"><div class="clabel glass"><div class="name">San Francisco</div><div class="note">YC AI Startup School, July 2026</div></div></div>
      <div class="wipe" id="wipeIn"></div>
    </div>
    <!-- shot 3: one shape -->
    <div class="shot s3">
      <div class="pill" id="pill">
        <div class="word" data-w>Founder.</div>
        <div class="word" data-w>President.</div>
        <div class="word" data-w>Researcher.</div>
        <div class="word" data-w>Quantum advocate.</div>
        <div class="word" data-w>Builder.</div>
      </div>
      <div class="pill-note mono" id="pillNote">Lakshmi Siri Appalaneni</div>
    </div>
    <!-- shot 4: highlights, a dot bounces from one to the next -->
    <div class="shot s4">
      <div class="hilist">
        <div class="dot" id="hdot"></div>
        <div class="hi" data-hi><span class="serif">YC AI Startup School</span><span class="mono">Selected, invite-only cohort, July 2026</span></div>
        <div class="hi" data-hi><span class="serif">Dean's List</span><span class="mono">UT Dallas, Spring 2026, AES Scholar</span></div>
        <div class="hi" data-hi><span class="serif">Founding President, Quantum Comet</span><span class="mono">UT Dallas's first quantum student org, October 2026</span></div>
      </div>
    </div>
    <!-- shot 5: close -->
    <div class="shot s5">
      <div class="endpool" id="endpool"></div>
      <div class="endwrap"><div>
        <div class="namebox" id="namebox"><div class="serif" id="endName"></div><canvas id="liquidName" width="1600" height="200"></canvas></div>
        <div class="tag" id="endTag">Technically rigorous. Actually meaningful.</div>
        <div class="cta" id="endCta">Connect on LinkedIn</div>
      </div></div>
    </div>
  </div>
  </div>
  <button class="reel-skip" type="button">Skip intro</button>
</div>`
