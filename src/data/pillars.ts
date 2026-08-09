import { PillarData, PortfolioProject } from "../types";

export const PILLARS_DATA: PillarData[] = [
  {
    id: "branding",
    title: "Strategic Branding",
    shortTitle: "Branding",
    subtitle: "Cultural Positioning & Identity Architecture",
    iconName: "Compass",
    color: "#10b981", // Emerald Teal
    accentGlow: "rgba(16, 185, 129, 0.4)",
    tags: ["Cultural Positioning", "Gen Z Strategy", "Brand Architecture", "Visual Identity Systems", "Monopoly Positioning"],
    description: "Strategic Branding is about defining and codifying a brand's unique core narrative, visual identity, and cultural positioning. It encompasses crafting bespoke design systems, brand architecture, messaging frameworks, and distinct aesthetic guidelines that command instant market authority, foster authentic audience loyalty, and establish an unassailable category monopoly.",
    metrics: [
      { label: "Brand Resonance Boost", value: "+340%" },
      { label: "Market Differentiation", value: "98.4%" },
      { label: "Avg Identity Value", value: "10x ROI" }
    ],
    caseStudy: {
      client: "Luxury & Heritage Sector",
      industry: "High-End Gen Z Heritage",
      impact: "Re-engineered brand architecture resulting in significant valuation growth within 9 months.",
      quote: "COMIWAY didn't just design a logo; they codified an entire cultural movement."
    },
    interactiveFeatureTitle: "Brand Resonance Matrix",
    interactiveFeatureDesc: "Simulate how your brand's archetype aligns with Gen Z cultural vectors and competitive white spaces."
  },
  {
    id: "websites",
    title: "Website Building",
    shortTitle: "Websites",
    subtitle: "Custom UX/UI & High-Performance Digital Real Estate",
    iconName: "Layout",
    color: "#3b82f6", // Vibrant Electric Blue
    accentGlow: "rgba(59, 130, 246, 0.4)",
    tags: ["Custom UX/UI", "High-Performance Digital Real Estate", "3D Glassmorphism", "Sub-100ms Speed", "Full-Stack Web3"],
    description: "Website Building is about engineering high-performance digital real estate that bridges bespoke UX/UI design with cutting-edge web architecture. It includes crafting fluid WebGL micro-interactions, intuitive user journeys, sub-100ms load velocity, and fully responsive cross-platform interfaces engineered to maximize conversion rates and user dwell time.",
    metrics: [
      { label: "Avg Load Velocity", value: "< 70ms" },
      { label: "Conversion Lift", value: "+215%" },
      { label: "Interactive Dwell Time", value: "4.2 min" }
    ],
    caseStudy: {
      client: "MedTech & Health Sector",
      industry: "MedTech & Digital Health",
      impact: "Built a 3D glassmorphic patient portal that reduced bounce rate to 11% and tripled booked consults.",
      quote: "The web application COMIWAY built feels like operating software from 2030."
    },
    interactiveFeatureTitle: "Digital Real Estate Speed Inspector",
    interactiveFeatureDesc: "Test custom glass interface renders, FPS physics, and micro-interaction reactivity."
  },
  {
    id: "ai",
    title: "AI Solutions",
    shortTitle: "AI Solutions",
    subtitle: "Empathic AI, EDIE & Core CX Automation",
    iconName: "Cpu",
    color: "#8b5cf6", // Radiant Violet / Magenta
    accentGlow: "rgba(139, 92, 246, 0.4)",
    tags: ["Comiway.ai", "EDIE", "CORE CX", "Custom AI Workflows", "Neural Orchestration"],
    description: "AI Solutions is about architecting and integrating custom artificial intelligence models, neural network workflows, and intelligent automation pipelines. It includes building empathic conversational agents, automated customer experience (CX) engines, real-time lead qualification systems, and predictive data processors that streamline operational bottlenecks.",
    metrics: [
      { label: "Support Resolution", value: "94.2%" },
      { label: "CX Response Latency", value: "280ms" },
      { label: "Operational Cost Cut", value: "-62%" }
    ],
    caseStudy: {
      client: "Financial Intelligence Sector",
      industry: "Financial Intelligence",
      impact: "Integrated EDIE AI to qualify 15,000+ monthly leads with zero human overhead and 99.1% accuracy.",
      quote: "EDIE is the first AI assistant our users genuinely enjoy conversing with."
    },
    interactiveFeatureTitle: "EDIE AI Live Neural Sandbox",
    interactiveFeatureDesc: "Test EDIE's empathic intelligence on real strategy queries and brand architecture scenarios."
  },
  {
    id: "blueprinting",
    title: "Strategic Blueprinting",
    shortTitle: "Blueprinting",
    subtitle: "Growth Roadmaps & Market Monopoly Strategy",
    iconName: "GitCommit",
    color: "#00f5a0", // Neon Emerald
    accentGlow: "rgba(0, 245, 160, 0.4)",
    tags: ["Growth Roadmaps", "Market Monopoly Strategy", "Scale Acceleration", "ROI Architecture", "Unfair Advantage"],
    description: "Strategic Blueprinting is about formulating actionable, multi-phase growth roadmaps and go-to-market strategies for sustainable market expansion. It involves identifying high-value market gaps, establishing key performance milestones, optimizing operational workflows, and building durable competitive moats that accelerate long-term revenue growth.",
    metrics: [
      { label: "Average Growth Scale", value: "4.8x" },
      { label: "Time-to-Market", value: "-45%" },
      { label: "Monopoly Moat Index", value: "9.2/10" }
    ],
    caseStudy: {
      client: "Supply Chain Sector",
      industry: "Cross-Border Supply Chain",
      impact: "Formulated a 12-month monopoly blueprint expanding presence from regional markets to 6 Asian hubs.",
      quote: "COMIWAY provided the exact strategic map we needed to out-navigate legacy players."
    },
    interactiveFeatureTitle: "AI Growth Pathway Generator",
    interactiveFeatureDesc: "Input your brand specifications and receive a customized 4-phase architectural growth roadmap."
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "proj-1",
    title: "Case Study 1: Industrial Market Stranglehold",
    client: "Large-Scale Industrial Manufacturer",
    category: "blueprinting",
    description: "Complex, multi-tiered 3D structure built from polished steel beams and translucent glass, with a matrix of glowing golden trajectory lines and statistical overlays indicating growth and market share.",
    context: "A large-scale industrial client facing market stagnation.",
    problem: "The client was operating in a mature, highly fragmented industrial manufacturing market characterized by low margins and intense price competition. Organic growth had flatlined, and market share was eroding due to lack of differentiation and inefficient, siloed operations. The primary challenge was finding a path to dominate a saturated market.",
    solution: "We developed a '12-Month Monopoly Strategic Blueprint.' This involved a fundamental shift towards a high-margin service model integrated with the core manufacturing output. We implemented an end-to-end data integration strategy ('Data-Driven Ops'), utilizing proprietary analysis to optimize supply chain efficiency and identify untapped, high-value micro-segments.",
    impact: "Within 12 months, the client successfully executed the blueprint, achieving a decisive market monopoly in their primary operating region. This strategic shift resulted in exponential revenue growth (moving beyond single-digit growth) and secured a dominant 38% market share.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    tags: ["Monopoly Blueprint", "Data-Driven Ops", "Supply Chain Optimization"],
    results: "38% Market Share • Exponential Revenue Growth • Regional Monopoly",
    year: "2026",
    featured: true
  },
  {
    id: "proj-2",
    title: "Case Study 2: Fast-Track GTM Strategy (EV Sector)",
    client: "Emerging EV Mobility Brand",
    category: "branding",
    description: "Dynamic, swirling 3D representation of an electric vehicle's high-performance drivetrain, with data streams of energy flow, optimization metrics, and key time markers.",
    context: "An emerging electric vehicle brand preparing for market entry.",
    problem: "An emerging EV manufacturer faced significant barriers to entry in a market dominated by entrenched players. The challenge was multifaceted: intense range anxiety among potential consumers, fragmented charging infrastructure, and a crowded landscape making brand recall difficult. They needed a high-impact strategy to enter the market rapidly and build immediate credibility.",
    solution: "We formulated a 'Fast-Track Go-To-Market (GTM) Strategy' with a heavy emphasis on phygital (physical + digital) experience. Instead of broad marketing, we targeted a niche early-adopter segment. A central component was developing an optimized user experience (UX) and incorporating advanced 'Range Simulation' tools into the digital buying journey, addressing the core consumer point directly.",
    impact: "The execution of the strategy resulted in the fastest market entry recorded in that segment, surpassing all initial launch targets. More importantly, the campaign successfully established strong brand trust and product credibility from day one, laying a solid foundation for long-term growth.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200&auto=format&fit=crop",
    tags: ["Fast-Track GTM", "Phygital CX", "Range Simulation", "EV Sector"],
    results: "Record Fast Market Entry • Exceeded All Launch Targets • High Brand Trust",
    year: "2026",
    featured: true
  },
  {
    id: "proj-3",
    title: "Case Study 3: Phygital Conversion Optimization (Bio-Retail)",
    client: "Boutique Wellness & Retail Brand",
    category: "websites",
    description: "Intricate, detailed 3D model of a futuristic, bio-integrated retail environment, showcasing how digital interactions blend seamlessly with physical nature and customer flow patterns.",
    context: "A boutique wellness/retail brand seeking to bridge offline and online presence.",
    problem: "A premium retail brand, blending wellness products with nature-based spaces, suffered from significant operational inefficiencies in their physical stores. Despite strong footfall, in-store conversion rates were low, and they lacked actionable insights into customer behavior due to a 'data capture gap' between their physical operations and digital analysis.",
    solution: "We designed an integrated 'Phygital Experiential Architecture' that reimagined the store layout through the lens of 'Bio-Retail Strategy.' This involved embedding IoT (Internet of Things) sensors ('IoT-Flow Optimization') and utilizing our CORE simulation sandbox to model and test different customer journey flows. This allowed us to optimize product placement and staffing in real-time, bridging the gap between physical space and digital analytics.",
    impact: "The redesigned store architecture saw an immediate and sustained higher conversion rate, with a double-digit percentage increase in average transaction value. The brand gained access to actionable Customer Experience (CX) insights, allowing them to continually refine operational logic and marketing based on real-world behavioral data.",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop",
    tags: ["Phygital Architecture", "Bio-Retail Strategy", "IoT-Flow Optimization"],
    results: "Double-Digit Order Value Increase • Sustained High Conversion • IoT Insights",
    year: "2025",
    featured: true
  },
  {
    id: "proj-4",
    title: "Case Study 4: AI Retainer (Empathic Ecosystem)",
    client: "Digital Service Provider",
    category: "ai",
    description: "Beautiful, complex 3D rendering of an empathic AI interface, visualized as interlocking neural network clusters forming a recognizable, yet abstract, human profile.",
    context: "A digital service provider struggling with user engagement and retention.",
    problem: "A digital platform utilizing AI for user interaction was experiencing a critically high churn rate. Users were disengaging rapidly after the initial interaction. Analysis revealed that the primary reason was a lack of 'persistent memory' in the AI, making interactions feel robotic, shallow, and repetitive. The client needed a way to transform their AI from a transaction tool into a meaningful companion to build long-term loyalty.",
    solution: "We implemented the 'Comiway.ai Empathic AI Ecosystem' on a retainer model. This involved replacing standard interaction protocols with our proprietary 'Digital Relative' architecture. We integrated this new empathic layer with our EDIE infrastructure (for personalized backend processing) and CORE (to model complex emotional journeys), creating a persistent, emotionally intelligent interface that remembers user history and preferences over the long term.",
    impact: "The introduction of the empathic ecosystem resulted in a dramatic shift in user behavior. The client achieved >90% customer retention within the primary user cohort, a record high for their platform. The deeper, more personalized interactions fostered profound deep brand loyalty, significantly increasing the lifetime value of each user and reducing acquisition costs.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    tags: ["Empathic AI Ecosystem", "Digital Relative Architecture", "EDIE & CORE"],
    results: ">90% Customer Retention • High LTV / Reduced CAC • Deep Brand Loyalty",
    year: "2026",
    featured: true
  }
];
