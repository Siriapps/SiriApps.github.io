// Data shared by the v3 sections. Experience and projects are the same records the Observatory used.
export type Entry = {
  dates: string
  role: string
  company: string
  desc: string
  status: 'NOW' | 'UPCOMING' | 'COMPLETE'
}

export const recent: Entry[] = [
  {
    dates: '2026 - Present',
    role: 'Women Techmakers Ambassador',
    company: 'Google Women Techmakers',
    desc: "Ambassador in Google's global program for women in technology, bringing workshops, talks, and a welcoming room to UT Dallas builders.",
    status: 'NOW',
  },
  {
    dates: 'June 2026 - Present',
    role: 'Founder and Software Engineer',
    company: 'Vizent · Richardson, TX',
    desc: 'Building a real-time vision-language agent: point a camera or share a screen and it watches live, answers mid-task, and shows the fix on screen across 3 verticals with 0 task-specific fine-tuning. Sustains 12 fps at sub-100 ms latency, cut CPU load about 20x by moving inference in-browser, guarded by 95 automated tests.',
    status: 'NOW',
  },
  {
    dates: 'July 25 - 26, 2026',
    role: 'YC AI Startup School',
    company: 'Y Combinator · San Francisco',
    desc: 'Selected for the invite-only cohort at Chase Center alongside NeurIPS authors and Olympiad medalists. Two days with the people building the frontier, centered on the questions I care about most: how agents will reshape the web, how physics-informed models reach production, and where quantum computing fits next.',
    status: 'COMPLETE',
  },
  {
    dates: 'July 13 - 19, 2026',
    role: 'Qiskit Global Summer School 2026',
    company: 'IBM Quantum',
    desc: 'Returning to QGSS after earning the Quantum Excellence certificate in 2021 and the 2025 advanced badge. A week on error correction, transpilation, and utility-scale quantum workloads.',
    status: 'COMPLETE',
  },
  {
    dates: 'January 2026 - Present',
    role: 'Undergraduate AI Research Assistant',
    company: 'RIDE Program, UT Dallas · Dr. Yanwen Xu',
    desc: 'Selected for the Research Internships in Design Engineering program at the intersection of machine learning, physics-informed AI, and engineering design. Researching digital twins and surrogate modeling to cut simulation cost while staying faithful to physical constraints; Physics-Informed LSTMs reduce RMSE 20 to 40 percent across five Western U.S. watersheds. First-author IEEE paper accepted to the North American Power Symposium (NAPS 2026) with 93.8 to 94.6 percent empirical forecast coverage.',
    status: 'NOW',
  },
  {
    dates: 'June - August 2026',
    role: 'AI 301 · Open-Source Contributor',
    company: 'CodePath',
    desc: 'Advanced AI engineering course with an open-source track: contributing fixes to Lance and LanceDB, the multimodal retrieval stack, including a production index bug diagnosis in the Rust search index builder, landed upstream as PR #7330 with a regression test across 635 tests.',
    status: 'COMPLETE',
  },
  {
    dates: 'May 2026 - Present',
    role: 'Industry Director',
    company: 'Google Developers Group on Campus UTD',
    desc: 'Leads partner outreach, sponsorship negotiation, and event logistics for HackDSC 2026, securing $12K+ in sponsorships and scaling toward 350+ participants.',
    status: 'NOW',
  },
  {
    dates: '2026 Cohort',
    role: 'WISER Program',
    company: 'WISER Quantum',
    desc: 'Quantum computing research and mentorship program connecting quantum algorithms to real workloads.',
    status: 'NOW',
  },
  {
    dates: 'September 2025 - Present',
    role: 'Qiskit Advocate',
    company: 'IBM Quantum',
    desc: 'Recognized member of the global community supporting the Qiskit open-source ecosystem. Progressing through the tiered advocate structure with access to mentorship, exclusive training, and IBM Quantum hardware; contributes workshops, educational content, code, and mentoring for newer members.',
    status: 'NOW',
  },
  {
    dates: 'September 2025 - Present',
    role: 'Software Engineer',
    company: 'Nebula Labs, UTD',
    desc: 'Ships features for open-source student platforms (UTD Trendz, UTD Notebook) serving 10,000+ students. Node.js, MongoDB, and React in agile sprints with 30+ developers.',
    status: 'NOW',
  },
  {
    dates: 'January - May 2026',
    role: 'Back End Developer',
    company: 'ACM, Association for Computing Machinery',
    desc: 'Built SafeWay, a safety-first navigation app: two-stage CatBoost + XGBoost hurdle model reaching AUC 0.891 and R2 0.745 on 2.3M+ crash records, with SHAP explainability and nightly CI/CD retraining. FastAPI backend on Google Cloud Run with DuckDB over GCS Parquet scores routes across 29,500 Chicago intersections in real time.',
    status: 'COMPLETE',
  },
  {
    dates: 'January - April 2026',
    role: 'Machine Learning Engineer',
    company: 'GDG UTD Sprints',
    desc: 'Cut average interview prep time about 40 percent by engineering Remix, an AI assistant powered by a FAISS-based RAG pipeline with LangChain, Gemini APIs, and a relational SQL data layer.',
    status: 'COMPLETE',
  },
  {
    dates: '2025',
    role: 'Conference Attendee',
    company: 'IBM Quantum Developer Conference',
    desc: 'On the floor with IBM superconducting quantum systems and the engineers who build them, connecting Qiskit work to production-scale hardware.',
    status: 'COMPLETE',
  },
  {
    dates: 'August - November 2025',
    role: 'CS Researcher',
    company: 'ACM, Association for Computing Machinery',
    desc: 'Applied research on post-quantum cryptography: a custom Recurrent Graph Neural Network that decodes encrypted RLCE syndromes by learning parity relationships from the public key structure. 30x improvement in successful decoding over the benchmark; 1st Place at the Fall 2025 ACM Research Symposium.',
    status: 'COMPLETE',
  },
]

export const earlier: Entry[] = [
  {
    dates: 'June - August 2024',
    role: 'Research Lab Intern',
    company: 'UTD Quantum Lab · Dr. Basu, Dr. Koludrubetz',
    desc: 'Worked with Qiskit 1.x and pyZX, the ZX Calculus software: fixed critical circuit-verification bugs and added configurations for missing gates, contributed upstream.',
    status: 'COMPLETE',
  },
  {
    dates: 'June - August 2024',
    role: 'Independent Student Researcher',
    company: 'The Coding School · TRAIN AI',
    desc: '1 of 10 selected from 2,000+ U.S. high school students. Built StreamSign, translating video audio to Indian Sign Language animations using Flask, Google TTS, and a custom NLP preprocessing algorithm.',
    status: 'COMPLETE',
  },
  {
    dates: 'August 2023 - June 2024',
    role: 'Young Researcher',
    company: 'The New York Academy of Sciences',
    desc: 'Program with a 6 to 10 percent global acceptance rate. With an international team of six, built WasteWatch, an AI system for efficient waste sorting. Also part of the 1000 Girls, 1000 Futures mentoring program.',
    status: 'COMPLETE',
  },
  {
    dates: '2021 - May 2024',
    role: 'Qiskit Bronze Localization Contributor',
    company: 'IBM Quantum',
    desc: 'Translated Qiskit documentation as part of the Hindi and French localization communities.',
    status: 'COMPLETE',
  },
  {
    dates: 'June - August 2023',
    role: 'Student Researcher',
    company: 'Incognito Blueprints',
    desc: 'Safe-navigation research for women and students in new cities, with a team of five across India and Canada. A* based routing over crime rate, street light density, and socio-economic data for cities like Boston.',
    status: 'COMPLETE',
  },
  {
    dates: '2020 - 2021',
    role: 'Early Quantum Training',
    company: 'The Coding School and IBM Quantum',
    desc: 'Introduction to Quantum Computing with Qubit by Qubit, then QGSS 2021 on Quantum Machine Learning with a 100 percent final score and the Quantum Excellence certificate, plus the IBM Certified Quantum Developer credential at age 13.',
    status: 'COMPLETE',
  },
]

export type Project = { title: string; subtitle: string; desc: string; tags: string[]; accent: string; github: string; live: string }
export const projects: Project[] = [
  {
    title: 'Cue',
    subtitle: 'Intent-aware AI workspace agent',
    desc: 'Chrome extension that reads browsing context and uses a multi-agent Google ADK pipeline to predict your next five tasks. Actions execute autonomously across Google Workspace via MCP.',
    tags: ['Gemini 3', 'Google ADK', 'MCP', 'TypeScript'],
    accent: '#ffb020',
    github: 'https://github.com/Siriapps/cue',
    live: '#',
  },
  {
    title: 'Pondr',
    subtitle: '1st Place · HackAI Dallas 2026',
    desc: 'Adaptive learning via living knowledge graphs. An XGBoost model fitted to the Ebbinghaus forgetting curve predicts decaying concepts, then resurfaces them with YouTube clips, TTS, and Calendar scheduling.',
    tags: ['LangChain', 'XGBoost', 'Knowledge Graphs', 'React Flow'],
    accent: '#ff7a3d',
    github: '#',
    live: '#',
  },
  {
    title: 'SafeWay',
    subtitle: 'ACM Projects · Safety-first navigation',
    desc: 'Routes by crash risk, not just speed. Two-stage hurdle model on 2.3M+ crash records across 29,500 Chicago intersections. AUC 0.891, R2 0.745, deployed on Cloud Run with nightly retraining.',
    tags: ['CatBoost', 'SHAP', 'FastAPI', 'DuckDB', 'Cloud Run'],
    accent: '#a78bfa',
    github: 'https://github.com/Siriapps/safeway',
    live: '#',
  },
  {
    title: 'HarmoniQ',
    subtitle: '3rd Place · HackUTD, T-Mobile + MLH Auth0',
    desc: 'Unified real-time dashboard for PMs: live sentiment across 100K+ posts, Prophet-powered outage prediction, geographic heatmaps, and Gemini-powered natural language insights.',
    tags: ['scikit-learn', 'Prophet', 'Flask', 'React', 'Auth0'],
    accent: '#ffb020',
    github: 'https://github.com/Siriapps/HarmoniQ',
    live: '#',
  },
  {
    title: 'Remix',
    subtitle: 'GDSC UTD Sprints · AI mock interviews',
    desc: 'Interview prep that knows what you do not know. Semantic resume analysis, gap detection, and an adaptive interview flow that targets your weakest areas. Cut average prep time about 40 percent.',
    tags: ['FAISS', 'LangChain', 'Gemini 2.5', 'FastAPI'],
    accent: '#ff7a3d',
    github: 'https://github.com/Siriapps/remix',
    live: '#',
  },
  {
    title: 'Post-Quantum RGNN',
    subtitle: '1st Place · ACM UTD Research Symposium',
    desc: 'Recurrent Graph Neural Network decoder for RLCE post-quantum cryptographic failures. 15M+ adversarial test cases, graph-structured error sequences, 30x improvement over classical baselines.',
    tags: ['PyTorch', 'NetworkX', 'Graph NNs', 'PQ Crypto'],
    accent: '#a78bfa',
    github: 'https://github.com/Siriapps/qryptik',
    live: '#',
  },
  {
    title: 'StreamSign',
    subtitle: 'TRAIN AI · Accessible video',
    desc: 'Real-time video audio to Indian Sign Language animations. Custom NLP preprocessing handles ISL grammar restructuring before animation rendering. 90%+ accuracy.',
    tags: ['Python', 'OpenCV', 'NLP', 'Flask'],
    accent: '#ffb020',
    github: 'https://github.com/Siriapps/Stream-Sign',
    live: '#',
  },
  {
    title: 'Matcha',
    subtitle: 'Team matching for hackathons',
    desc: 'Brewing your perfect hack team. Matches hackers by complementary skills, interests, and working styles so teams form in minutes instead of the first panicked hour.',
    tags: ['JavaScript', 'React', 'Matching Algorithms'],
    accent: '#ff7a3d',
    github: 'https://github.com/Siriapps/Matcha',
    live: '#',
  },
  {
    title: 'ReelSkill',
    subtitle: 'Agents from social video',
    desc: 'DM an Instagram Reel, get back an installable AI agent skill. Turns short-form how-to content into structured, executable automations.',
    tags: ['Python', 'AI Agents', 'Instagram API'],
    accent: '#a78bfa',
    github: 'https://github.com/Siriapps/reelskill',
    live: '#',
  },
  {
    title: 'CabinIQ',
    subtitle: 'Attention triage for crews',
    desc: 'Helps flight crews prioritize attention proactively during flights, surfacing what needs a human first instead of drowning crews in alerts.',
    tags: ['JavaScript', 'Real-time Systems', 'UX'],
    accent: '#ffb020',
    github: 'https://github.com/Siriapps/CabinIQ',
    live: '#',
  },
  {
    title: 'ASL Recognition',
    subtitle: 'Computer vision · 99% accuracy',
    desc: 'A convolutional neural network that recognizes American Sign Language signs with 99 percent accuracy, an early step in a continuing thread of accessibility work.',
    tags: ['CNN', 'TensorFlow', 'Computer Vision'],
    accent: '#ff7a3d',
    github: 'https://github.com/Siriapps/American-Sign-Language-Recognition',
    live: '#',
  },
]

export const highlights = [
  { big: true, t: 'YC AI Startup School', d: 'Selected for the invite-only cohort at Chase Center, San Francisco, July 2026.' },
  { big: true, t: "Dean's List, Spring 2026", d: 'UT Dallas, Computer Science Honors, AES Merit Scholar.' },
  { big: true, t: 'Founding President, Quantum Comet', d: "Started UT Dallas's first quantum student organization in October 2026, with a faculty advisor and a six-officer board." },
  { t: '1st Place, HackAI Dallas 2026', d: 'Pondr, adaptive learning on living knowledge graphs.' },
  { t: '1st Place, Yale Quantum Hackathon 2025', d: 'BlueQubit Challenge.' },
  { t: '1st Place, ACM UTD Research Symposium, Fall 2025', d: 'Post-quantum cryptography with a recurrent graph neural network decoder, 30x over the baseline.' },
  { t: 'Gold, Rank 5, ICPC AlgoQueen 2023', d: 'Global top five.' },
  { t: '3rd Place and MLH Auth0, HackUTD 2025', d: 'HarmoniQ, with T-Mobile.' },
  { t: 'IBM Qiskit Advocate', d: 'Certified quantum developer at 13; advocate since September 2025.' },
  { t: 'Google Women Techmakers Ambassador', d: 'Workshops and talks for UT Dallas builders.' },
  { t: 'HackerRank gold badges', d: 'Python, C++ and problem solving.' },
  { t: 'Adobe Certified Professional', d: 'Graphic design and illustration, visual design, and Photoshop.' },
]

export const cities = [
  { name: 'Hyderabad', img: '/images/cities/hyderabad.jpg', note: 'Grew up here, 2010 to 2022', copy: 'Where I grew up, 2010 to 2022. The first code I wrote was here, and so was the IBM quantum developer certificate at thirteen.', alt: "Aerial view of Hyderabad's Hitec City and the Durgam Cheruvu bridge" },
  { name: 'Toronto', img: '/images/cities/toronto.jpg', note: 'High school, R H King Academy, 2022 to 2023', copy: 'High school at R H King Academy, 2022 to 2023. Competitive programming, ICPC AlgoQueen gold, and the first research teams.', alt: 'Toronto skyline with the CN Tower' },
  { name: 'Dallas', img: '/images/cities/dallas.jpg', note: 'Prosper High, then UT Dallas, 2023 onward', copy: 'Prosper High, then UT Dallas from 2023: Computer Science Honors, the research labs, Nebula Labs, and the quantum club I founded.', alt: 'Downtown Dallas skyline' },
  { name: 'San Francisco', img: '/images/cities/sanfrancisco.jpg', note: 'YC AI Startup School, July 2026', copy: 'YC AI Startup School, July 2026. Two days at Chase Center with the people building the frontier.', alt: 'Golden Gate Bridge at dusk, San Francisco' },
]

export const skills = [
  { title: 'Languages', primary: 'Python', items: ['Python', 'C++', 'Java', 'Rust', 'JavaScript', 'TypeScript', 'SQL', 'Bash'] },
  { title: 'ML and Research', primary: 'PyTorch', items: ['PyTorch', 'scikit-learn', 'XGBoost', 'CatBoost', 'Physics-Informed NNs', 'LSTM', 'SHAP', 'FAISS'] },
  { title: 'Agentic and LLM', primary: 'LangChain', items: ['LangChain', 'Google ADK', 'MCP', 'Gemini API', 'RAG Pipelines', 'Multi-Agent Orchestration'] },
  { title: 'Web and Infrastructure', primary: 'FastAPI', items: ['FastAPI', 'Flask', 'React', 'Node.js', 'Tailwind', 'MongoDB', 'DuckDB', 'Cloud Run', 'Docker'] },
  { title: 'Quantum Computing', primary: 'Qiskit', items: ['Qiskit', 'pyZX', 'ZX Calculus', 'Circuit Design', 'Variational Algorithms'] },
  { title: 'Spoken', primary: 'English', items: ['English', 'Telugu', 'Hindi'] },
]

export const ideas = [
  { name: 'Stepwise', who: 'For furniture and home-goods brands', what: 'An AI assembly guide that uses your phone camera to check each step of putting furniture together, so mistakes are caught before they become returns.' },
  { name: 'WayzIn', who: 'For hospitals, campuses and transit stations', what: "Turns a building's floor plan into hands-free, spoken directions for blind and low-vision visitors, with no beacons or sensors." },
  { name: 'Porch', who: 'For senior living communities and families', what: "An AI that joins family video calls and pulls up the photos you're talking about, helping older adults stay connected." },
]
