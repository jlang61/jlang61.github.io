// Single source of truth for everything on the page.
// Edit here; components only handle presentation.

export const profile = {
  name: "Justin Lang",
  location: "San Diego, CA",
  email: "justinlang8@gmail.com",
  github: "https://github.com/jlang61",
  githubHandle: "jlang61",
  linkedin: "https://www.linkedin.com/in/justin-lang-966b0a256/",
  resume: "/Justin_Lang_Resume.pdf",
  status: "Seeking Summer 2027 internships in databases & systems",
  current: "M.S. Computer Science · UC San Diego",
  summary:
    "Most recently at NICE Actimize, I owned the report engine that turns one SQL query into a deployable AI agent. The team built ~50 agents on it, and 5 shipped to production. Before that: an on-disk Merkle trie storage engine with Ava Labs, and distributed messaging on Redis at Huupe.",
  updated: "September 2026"
};

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "~50", label: "agents built on the report engine I owned" },
  { value: "5", label: "of them shipped to production" },
  { value: "40%", label: "faster than LevelDB on an 80/20 read/write workload" },
  { value: "3.94", label: "GPA at UCSB, with High Honors" }
];

// A pipeline renders as a row of boxes joined by arrows.
// Steps marked `owned` are highlighted as the parts I was responsible for.
export type PipelineStep = { label: string; detail: string; owned?: boolean };
export type Pipeline = { caption: string; steps: PipelineStep[]; footnote?: string };

export type Highlight = { lead: string; text: string };

export type Role = {
  company: string;
  monogram: string;
  title: string;
  team?: string;
  location: string;
  dates: string;
  highlights: Highlight[];
  pipeline?: Pipeline;
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "NICE Actimize",
    monogram: "NA",
    title: "Software Engineer, R&D",
    team: "Agentic AI for Fraud Detection",
    location: "Santa Clara, CA",
    dates: "Oct 2025 – Jul 2026",
    highlights: [
      {
        lead: "Report engine.",
        text: "Co-designed and later solely owned a report engine that turns a single SQL query into a deployable agent with no code changes; the team built ~50 agents on it for testing and data exploration, 5 of which shipped to production."
      },
      {
        lead: "Production ownership.",
        text: "Solely owned two more production components: a heavily used agent flagging first-time and anomalous customer activity, and a configuration system that tunes each agent’s behavior in production with no code change or redeploy."
      },
      {
        lead: "Schema design.",
        text: "Designed from scratch the SQL schema storing agent configurations and report definitions, planning for schema evolution across future agent generations while integrating with existing legacy databases."
      },
      {
        lead: "Deployment.",
        text: "Wrote Helm charts and set resource limits for agent services on Kubernetes, managing the per-agent service lifecycle and documenting the deployment path and table DDL so the team could stand up new agents independently."
      }
    ],
    pipeline: {
      caption: "From one query to a production agent",
      steps: [
        { label: "SQL query", detail: "one query in" },
        { label: "Report engine", detail: "co-designed → sole owner", owned: true },
        { label: "Config system", detail: "tuned live, no redeploy", owned: true },
        { label: "Agent service", detail: "Helm · Kubernetes", owned: true }
      ],
      footnote: "~50 agents built · 5 shipped to production"
    },
    stack: ["SQL", "Oracle", "Kubernetes", "Helm", "LLM agents"]
  },
  {
    company: "Huupe",
    monogram: "H",
    title: "Software Engineer Intern",
    location: "San Diego, CA",
    dates: "Summers 2023, 2024",
    highlights: [
      {
        lead: "Distributed messaging.",
        text: "Architected a distributed WebSocket messaging layer on Redis Pub/Sub that replaced a manual messaging process and broadcast updates across multiple Node.js API instances, unblocking a new product launch."
      },
      {
        lead: "Backend API.",
        text: "Built the backend API for a smart basketball hoop and refactored 50+ blocking calls to async, improving responsiveness."
      }
    ],
    pipeline: {
      caption: "One message, every instance",
      steps: [
        { label: "Client A", detail: "WebSocket" },
        { label: "API instance 1", detail: "Node.js" },
        { label: "Redis Pub/Sub", detail: "fan-out layer", owned: true },
        { label: "API instance N", detail: "Node.js" },
        { label: "Client B", detail: "gets the update" }
      ]
    },
    stack: ["Node.js", "Redis", "WebSockets", "REST APIs"]
  }
];

export type Project = {
  name: string;
  kicker: string;
  context: string;
  dates: string;
  metric: { value: string; label: string };
  award?: string;
  summary: string;
  bullets: string[];
  stack: string[];
  links: { label: string; href: string }[];
  visual: "layers" | "fusion";
};

export const projects: Project[] = [
  {
    name: "Avalution",
    kicker: "On-disk Merkle trie storage engine",
    context: "UCSB Capstone with Ava Labs · 5-person team",
    dates: "Fall 2024 – Mar 2025",
    metric: { value: "40%", label: "faster than LevelDB on an 80/20 read/write workload" },
    summary:
      "Stores authenticated blockchain state as a Merkle trie directly on disk, eliminating the key-value layer conventional designs stack underneath.",
    bullets: [
      "Owned the disk manager, the revision manager for versioned trie state, and a power-of-two free-list allocator that reclaims and reuses freed disk space.",
      "Designed a differential layer tracking in-memory mutations against persisted state, giving fast reads and edits of uncommitted revisions."
    ],
    stack: ["Go", "Storage engines", "Merkle tries", "Benchmarking"],
    links: [{ label: "Source on GitHub", href: "https://github.com/jlang61/avalution" }],
    visual: "layers"
  },
  {
    name: "Cetacean Distribution Modeling",
    kicker: "Spatio-temporal species distribution model",
    context: "with Scripps Institution of Oceanography (UCSD)",
    dates: "Fall 2024 – Spring 2025",
    metric: { value: "10+ yrs", label: "of CalCOFI & CASE-STSE survey data in one model" },
    award: "Best Data Methods Award",
    summary:
      "Generalized linear mixed models predicting marine mammal density off Southern California by fusing acoustic detections, visual surveys, and eDNA observations.",
    bullets: [
      "Integrated 10+ years of CalCOFI and CASE-STSE environmental data into a single species distribution model.",
      "Received the Best Data Methods Award."
    ],
    stack: ["R", "GLMMs", "Spatio-temporal modeling"],
    links: [],
    visual: "fusion"
  }
];

export type School = {
  school: string;
  short: string;
  degree: string;
  location: string;
  dates: string;
  current?: boolean;
  honors?: string[];
  courseworkLabel: string;
  coursework: string[];
};

export const education: School[] = [
  {
    school: "University of California, San Diego",
    short: "UCSD",
    degree: "M.S. in Computer Science",
    location: "San Diego, CA",
    dates: "Sep 2026 – Jun 2028 (expected)",
    current: true,
    courseworkLabel: "Coursework in progress",
    coursework: ["Algorithms", "Recommender Systems", "Unsupervised Learning"]
  },
  {
    school: "University of California, Santa Barbara",
    short: "UCSB",
    degree: "B.S. in Computer Science, Minor in Statistics & Applied Probability",
    location: "Santa Barbara, CA",
    dates: "Jun 2025",
    honors: [
      "GPA 3.94",
      "High Honors",
      "Distinction in the Major",
      "College of Engineering Dean’s Honors (6×)"
    ],
    courseworkLabel: "Coursework",
    coursework: [
      "Databases",
      "Algorithms & Data Structures",
      "Computer Architecture",
      "Machine Learning",
      "Deep Learning"
    ]
  }
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Databases",
    items: ["SQL schema design", "Oracle SQL", "JDBC", "Redis (Pub/Sub)", "On-disk storage engines"]
  },
  {
    group: "Systems & Infra",
    items: ["Kubernetes", "Helm", "Ingress", "REST APIs", "WebSockets", "Node.js", "AWS", "Google Cloud"]
  },
  {
    group: "Languages",
    items: ["Go", "C++", "Python", "SQL", "Java", "TypeScript", "JavaScript", "R"]
  },
  {
    group: "AI / ML",
    items: ["Agentic system design", "LLM agents", "Sentiment analysis", "Statistical modeling (GLMMs)"]
  },
  {
    group: "Spoken",
    items: ["English", "Mandarin"]
  }
];

export type ArchiveItem = {
  year: number;
  name: string;
  what: string;
  stack: string;
  repo?: string;
  live?: string;
};

export const archive: ArchiveItem[] = [
  {
    year: 2024,
    name: "ucsb_food",
    what: "Find which UCSB dining hall is serving a dish today, tomorrow, or all week",
    stack: "TypeScript · React · Python",
    repo: "https://github.com/jlang61/ucsb_food",
    live: "https://ucsb-food.vercel.app"
  },
  {
    year: 2024,
    name: "PlusLiga analysis",
    what: "EDA and match-outcome prediction on 15 seasons of Polish pro volleyball",
    stack: "R · R Markdown",
    repo: "https://github.com/jlang61/PlusLiga-Analysis-2008-2023"
  },
  {
    year: 2024,
    name: "CIFAR-10 CNN",
    what: "Convolutional network for CIFAR-10 image classification",
    stack: "Python · PyTorch",
    repo: "https://github.com/jlang61/cifar10-cnn-classifier"
  },
  {
    year: 2023,
    name: "UCSB TASA website",
    what: "Website for the Taiwanese American Student Association at UCSB",
    stack: "TypeScript · React",
    repo: "https://github.com/UCSBTASA/UCSBTASA.github.io",
    live: "https://www.ucsbtasa.com"
  },
  {
    year: 2022,
    name: "TempHumidity",
    what: "iOS app for remote temperature & humidity monitoring from Raspberry Pi sensors",
    stack: "Swift · Raspberry Pi · Azure",
    repo: "https://github.com/jlang61/TempHumidity-Project"
  }
];

export const sections = [
  { id: "experience", label: "Experience", keywords: "work nice actimize huupe jobs" },
  { id: "projects", label: "Projects", keywords: "avalution cetacean storage engine" },
  { id: "education", label: "Education", keywords: "ucsd ucsb school gpa coursework" },
  { id: "archive", label: "Archive", keywords: "earlier work older projects repos" },
  { id: "contact", label: "Contact", keywords: "email hire reach" }
] as const;

export type SectionId = (typeof sections)[number]["id"];
