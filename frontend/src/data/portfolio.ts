export type SkillGroup = {
  name: string
  skills: string[]
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  location?: string
  summary: string
  highlights: string[]
  technologies: string[]
  featured: boolean
  type: "Internship" | "Leadership"
}

export type Project = {
  slug: string
  details?: {
    problem: string
    solution: string
    architecture: { label: string; description: string }[]
  }
  name: string
  eyebrow: string
  description: string
  stack: string[]
  features: string[]
  impact?: string
  note?: string
  featured?: boolean
  status: "Concept" | "In Development" | "Project" | "Live Demo"
  githubUrl: string | null
  demoUrl: string | null
}

export const profile = {
  name: "Nithin Deepa",
  location: "United States",
  github: "https://github.com/ndeepa-cloud",
  linkedin: "https://www.linkedin.com/in/nithin-deepa" as string | null,
  resumePath: "/Nithin_Deepa_Resume.pdf" as string | null,
  graduation: "May 2027",
  university: "Murray State University",
  degree: "Bachelor's in Computer Science",
}

export const experiences: ExperienceItem[] = [
  {
    role: "AI Engineer Intern",
    company: "Padsnap (AI Startup)",
    period: "May 2026 – Jul 2026",
    summary: "Built conversational real estate intelligence, automated content generation pipelines, and high-performance streaming backend APIs.",
    highlights: [
      "Built a retrieval-augmented generation (RAG) pipeline with LangChain, ChromaDB, and Hugging Face embeddings for semantic retrieval over real estate data, improving answer relevance and grounding responses across 500+ interactions.",
      "Designed an LLM-powered content generation pipeline that automated property descriptions, listing headlines, social media captions, and email marketing content.",
      "Implemented real-time LLM response streaming through three Flask API endpoints using Server-Sent Events (SSE) and the Groq streaming API.",
      "Orchestrated multi-step AI agent workflows in LangGraph by combining retrieval, tool calls, and task automation to deliver source-cited answers over pgvector.",
    ],
    technologies: ["Python", "Flask", "LangChain", "LangGraph", "ChromaDB", "Hugging Face", "Groq API", "SSE", "pgvector", "RAG"],
    featured: true,
    type: "Internship",
  },
  {
    role: "President",
    company: "Indian Students Association · Murray State University",
    period: "Feb 2024 – Feb 2026",
    summary: "Executive campus leadership directing organization operations, cross-cultural initiatives, and student advocacy for international students.",
    highlights: [
      "Led a 200+ member student organization, overseeing budget management, event planning, and cross-cultural initiatives to promote student engagement and campus inclusion.",
      "Organized 10+ campus-wide events, coordinating activities and connecting international students with academic resources, professional development opportunities, and university support services.",
    ],
    technologies: ["Executive Leadership", "Budget Management", "Event Planning", "Community Mentorship"],
    featured: false,
    type: "Leadership",
  },
]

export const skillGroups: SkillGroup[] = [
  {
    name: "Programming",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "C++"],
  },
  {
    name: "Frontend",
    skills: ["React", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    name: "Backend",
    skills: ["FastAPI", "Flask", "REST APIs", "Server-Sent Events", "Node.js"],
  },
  {
    name: "AI / GenAI",
    skills: [
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "LangChain",
      "LangGraph",
      "Prompt Engineering",
      "Vector Embeddings",
      "Vector Search",
      "Groq API",
      "Gemini API",
      "Hugging Face",
      "AI Agents",
    ],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "SQL Server", "ChromaDB", "pgvector", "Supabase", "Azure SQL"],
  },
  {
    name: "Developer Tools",
    skills: [
      "AWS",
      "Google Cloud (Cloud Run)",
      "Docker",
      "Git",
      "GitHub",
      "Render",
      "Vercel",
      "Google Cloud Vertex AI",
      "VS Code",
    ],
  },
]

export const projects: Project[] = [
  {
    name: "Padsnap AI Assistant",
    slug: "padsnap-ai-assistant",
    details: {
      problem: "Property discovery and preparing structured marketing content are the real estate workflows this project addresses.",
      solution: "A conversational assistant supports natural-language property discovery and generates structured property marketing content.",
      architecture: [
        {
          label: "Backend",
          description: "Python and Flask provide REST APIs.",
        },
        {
          label: "AI model and API",
          description: "Llama 3 is integrated through the Groq API.",
        },
        {
          label: "Response delivery",
          description: "Server-Sent Events stream AI responses.",
        },
      ],
    },
    eyebrow: "Real Estate AI Application",
    description: "An AI-powered real estate assistant developed during an AI engineering internship, enabling natural-language property discovery and automated generation of structured marketing content.",
    stack: [
      "Python",
      "Flask",
      "Groq API",
      "Llama 3",
      "REST APIs",
      "SSE",
    ],
    features: [
      "Natural-language property discovery with Llama 3 via Groq",
      "Flask REST APIs with streaming responses over SSE",
      "Structured property marketing content generation",
      "500+ interactions, as reported in my resume",
    ],
    impact: "Improved accessibility to property information through conversational AI and automated marketing workflows.",
    status: "Live Demo",
    featured: true,
    githubUrl: null,
    demoUrl: "https://padsnap-ai-assistant.onrender.com/",
  },
  {
    name: "RAG Market Intelligence System",
    slug: "rag-market-intelligence",
    details: {
      problem: "Users need to locate relevant information in uploaded documents and understand the source material behind an answer.",
      solution: "The system ingests PDF and text documents, retrieves relevant chunks semantically, and produces context-aware answers with source citations.",
      architecture: [
        {
          label: "Application",
          description: "Python and Flask support the document intelligence application.",
        },
        {
          label: "Ingestion",
          description: "PDF and text documents are preprocessed and split into chunks.",
        },
        {
          label: "Embeddings and storage",
          description: "Hugging Face all-MiniLM-L6-v2 embeddings are stored and indexed in ChromaDB.",
        },
        {
          label: "Retrieval and answering",
          description: "Top-k semantic similarity retrieval and LangChain support source-grounded question answering.",
        },
      ],
    },
    eyebrow: "Retrieval-Augmented Generation / Document Intelligence",
    description: "A retrieval-augmented generation system that enables users to search uploaded documents and receive contextual answers grounded in relevant source material.",
    stack: [
      "Python",
      "LangChain",
      "ChromaDB",
      "Hugging Face",
      "Flask",
    ],
    features: [
      "PDF and text ingestion, preprocessing, and chunking",
      "all-MiniLM-L6-v2 embeddings indexed in ChromaDB",
      "Top-k semantic similarity retrieval with LangChain",
      "Context-aware answers with source citations",
    ],
    impact: "Made document exploration more efficient through semantic search and source-grounded AI answers.",
    status: "Project",
    featured: true,
    githubUrl: null,
    demoUrl: null,
  },
  {
    name: "AI Outreach Agent",
    slug: "ai-outreach-agent",
    details: {
      problem: "Contact management and communication campaigns involve multiple connected workflows.",
      solution: "The application brings together contact management, call screening, AI-generated replies, and campaign workflows.",
      architecture: [
        {
          label: "Frontend",
          description: "React and TypeScript.",
        },
        {
          label: "Backend",
          description: "FastAPI.",
        },
        {
          label: "Data technologies",
          description: "PostgreSQL and Supabase.",
        },
        {
          label: "AI integration",
          description: "Gemini supports AI communication workflows.",
        },
      ],
    },
    eyebrow: "AI Communication Automation",
    description: "An AI-powered outreach application designed to support contact management and communication workflows.",
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Supabase", "Gemini"],
    features: ["Contact management", "Call screening", "AI-generated replies", "Campaign workflows"],
    status: "Live Demo",
    featured: true,
    githubUrl: null,
    demoUrl: "https://ai-outreach-agent-pi.vercel.app/",
  },
  {
    name: "OpsPilot",
    slug: "opspilot",
    details: {
      problem: "Operational work is the focus of this exploration into AI assistance and workflow automation.",
      solution: "Engineered full-stack AI operations platform enabling document intelligence, conversational querying, and automated task workflows with pgvector.",
      architecture: [
        {
          label: "Full-Stack Architecture",
          description: "Python, FastAPI, React, TypeScript, LangGraph, and pgvector.",
        },
      ],
    },
    eyebrow: "AI operations copilot",
    description: "An AI operations assistant exploring how language models, retrieval-augmented generation, and workflow automation can support operational work.",
    stack: ["Python", "FastAPI", "React", "TypeScript", "LangGraph", "pgvector", "RAG"],
    features: ["Exploring AI operations assistance", "RAG pipeline with document parsing", "PostgreSQL/pgvector vector search"],
    status: "In Development",
    githubUrl: null,
    demoUrl: null,
  },
  {
    name: "College Management Portal",
    slug: "college-management-portal",
    eyebrow: "Full-Stack Software Engineering",
    description: "A full-stack application for managing college-related workflows. Further project details are being prepared.",
    stack: [],
    features: [],
    status: "Project",
    githubUrl: null,
    demoUrl: null,
  },
]

export const interests = [
  "Applied AI Engineering",
  "Generative AI and LLM applications",
  "Full-stack software development",
  "RAG systems and AI agents",
]

export const academicAreas = [
  "Data Structures and Algorithms",
  "Database Management Systems",
  "Computer Security",
  "Software Engineering",
  "Artificial Intelligence and Machine Learning",
  "Backend and Web Development",
]
