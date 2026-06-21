import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  FileText, 
  Search, 
  X, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Brain,
  BookMarked,
  Filter
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  publishedAt: string;
  aiSummary: string;
  content: string;
  recommended: string[];
}

const TOPICS = [
  "All Articles",
  "Power Platform",
  "Dynamics 365",
  "Enterprise Architecture",
  "AI Strategy",
  "Azure",
  "Data Platforms",
  "Automation",
  "Software Engineering"
];

const LOCAL_ARTICLES: Article[] = [
  {
    id: "arch_foundations",
    title: "The Zero-Trust Operational Core",
    excerpt: "Why legacy ERP systems fail under modern demand and how to decouple business logic from unscalable databases.",
    category: "Enterprise Architecture",
    readTime: "8 MIN READ",
    author: "Dr. Elena Rostova",
    publishedAt: "OCTOBER 12, 2026",
    aiSummary: "Modern enterprise systems must shift from monolithic ERPs to composable microservices. Zero-trust architecture ensures data integrity while allowing flexible frontend deployments.",
    content: `For decades, the enterprise was built around single, monolithic databases. This architecture served its purpose when operations were centralized and batch-processed overnight. Today, real-time demand obliterates batch windows.

A zero-trust operational core assumes constant volatility. By decoupling the interface layer from the data persistence layer, organizations can update their client-facing applications without risking core ledger corruption. We explore the structural necessities of this transition.

1. The API Gateway as a Sovereign Border
Instead of direct database connections, all data must pass through an API gateway featuring strict throttling, rate limiting, and zero-trust authentication.

2. Event-Driven Propagation
When a record changes, it should emit an event rather than lock a table. This allows secondary systems to react asynchronously, ensuring the primary system never degrades in performance during high-throughput peaks.`,
    recommended: ["data_lake_sync", "power_plat_gov"]
  },
  {
    id: "ai_strategy_2026",
    title: "Beyond the Chatbot: True Cognitive Workflows",
    excerpt: "Moving past superficial AI implementations into deep, deterministic operational intelligence.",
    category: "AI Strategy",
    readTime: "12 MIN READ",
    author: "Marcus Vance",
    publishedAt: "NOVEMBER 04, 2026",
    aiSummary: "LLMs are evolving from conversational interfaces to deterministic workflow engines. AI strategy must focus on embedding intelligence directly into operational pipelines, not just chatbots.",
    content: `The initial wave of AI adoption was marked by floating chatbots layered over existing, broken interfaces. This "band-aid" approach failed to deliver structural ROI.

True cognitive workflows embed the AI layer into the data pipeline. When a contract is uploaded, it isn't waiting for a user to query a bot; it is immediately processed by an LLM in the background, extracting key clauses, updating the CRM, and triggering a review task for the legal department.

The next frontier is hybrid determinism: combining the probabilistic nature of LLMs with the absolute strictness of traditional code execution.`,
    recommended: ["azure_scale", "arch_foundations"]
  },
  {
    id: "power_plat_gov",
    title: "Citizen Developers within Elite Frameworks",
    excerpt: "How to govern low-code solutions without stifling operational innovation.",
    category: "Power Platform",
    readTime: "6 MIN READ",
    author: "Sarah Chen",
    publishedAt: "JANUARY 18, 2026",
    aiSummary: "Low-code platforms require strict environmental governance. Establish clear data loss prevention (DLP) policies and center of excellence (CoE) guidelines before allowing citizen development.",
    content: `The democratization of software development is a dual-edged sword. While it enables rapid problem-solving on the front lines, it inevitably leads to "shadow IT" if left ungoverned.

To safely deploy Power Platform, organizations must adopt a tiered environment strategy:
- Personal Productivity (Default Environment)
- Departmental Operations (Dedicated Environments with DLP)
- Enterprise Core (Pro-development managed solutions)

By enforcing these boundaries, enterprise architecture teams can sleep at night while business units innovate at the speed of their immediate needs.`,
    recommended: ["dynamics_omni", "arch_foundations"]
  },
  {
    id: "dynamics_omni",
    title: "The Unified Customer Truth",
    excerpt: "Breaking down the barriers between sales forecasting and customer service realities.",
    category: "Dynamics 365",
    readTime: "9 MIN READ",
    author: "James Halbert",
    publishedAt: "FEBRUARY 22, 2026",
    aiSummary: "Dynamics 365 breaks operational silos by unifying sales and service records. This creates a contiguous lifecycle where service agents can cross-sell and sales reps anticipate support issues.",
    content: `Sales and Service are not two separate departments; they are two phases of the exact same customer lifecycle. 

When a salesperson pitches a renewal, they must know if there are three open critical support tickets. When a support agent resolves a complex issue, they should be able to trigger a high-probability cross-sell opportunity. Dynamics 365, built atop Dataverse, achieves this by enforcing a single relational definition of "The Customer."`,
    recommended: ["power_plat_gov", "ai_strategy_2026"]
  },
  {
    id: "azure_scale",
    title: "Serverless Resilience Patterns",
    excerpt: "Architecting cloud functions that handle unpredictable global load spikes seamlessly.",
    category: "Azure",
    readTime: "11 MIN READ",
    author: "Dr. Elena Rostova",
    publishedAt: "MARCH 30, 2026",
    aiSummary: "Serverless auto-scaling requires careful state management. Use decentralized queues and stateless functions to prevent cascading failures during massive traffic spikes.",
    content: `A system is only as scalable as its tightest bottleneck. You can have endless compute power via Azure Functions, but if they all connect to a single standard SQL instance, the database will throttle and crash the entire pipeline.

Resilient cloud architecture requires buffer zones. Service Bus queues act as shock absorbers, taking in millions of requests per second and feeding them to backend processors at the exact maximum rate the persistence layer can handle.`,
    recommended: ["arch_foundations", "data_lake_sync"]
  },
  {
    id: "data_lake_sync",
    title: "Fabric and the End of Data Silos",
    excerpt: "How OneLake architecture fundamentally alters enterprise reporting speed.",
    category: "Data Platforms",
    readTime: "7 MIN READ",
    author: "Aisha Patel",
    publishedAt: "APRIL 14, 2026",
    aiSummary: "Microsoft Fabric consolidates analytical storage. By separating compute from storage and utilizing a unified delta lake format, organizations eliminate redundant data copying.",
    content: `For years, data engineering consisted of copying data from point A, transforming it at point B, and serving it at point C. This meant you paid for storage three times and accepted constant latency.

By standardizing on open delta-parquet formats within a unified lakehouse, compute engines can query the exact same files simultaneously. A Power BI report reads the same physical storage sector as an Azure Machine Learning training run. Copying data is obsolete.`,
    recommended: ["azure_scale", "ai_strategy_2026"]
  }
];

export default function KnowledgeCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("All Articles");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const [summarizedIds, setSummarizedIds] = useState<string[]>([]);
  
  // Reading Progress State
  const articleContentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: articleContentRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const filteredArticles = LOCAL_ARTICLES.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedTopic === "All Articles" || art.category === selectedTopic;
    return matchesSearch && matchesCategory;
  });

  const activeArticle = LOCAL_ARTICLES.find(a => a.id === selectedArticleId);
  const recommendedArticles = activeArticle
    ? LOCAL_ARTICLES.filter(a => activeArticle.recommended.includes(a.id))
    : [];

  const triggerAISummary = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSummarizingId(id);
    setTimeout(() => {
      setSummarizedIds(prev => [...prev, id]);
      setSummarizingId(null);
    }, 1500);
  };

  return (
    <section className="space-y-12 py-12" id="knowledge-center-section">
      
      {/* Editorial Header - HBR Inspired */}
      <div className="space-y-6 pb-8 border-b-2 border-white/10 max-w-5xl">
        <span className="font-serif text-sm tracking-[0.2em] text-[#cfa86b] uppercase font-bold flex items-center space-x-2">
          <BookMarked className="h-4 w-4" />
          <span>Thought Leadership Center</span>
        </span>
        <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Systemic Insights & <br/> Strategic Architecture.
        </h2>
        <p className="max-w-2xl font-sans text-lg text-gray-400 leading-relaxed">
          Premium briefings on the intersection of deep software engineering, cutting-edge AI strategy, and global operational scale.
        </p>
      </div>

      {/* Advanced Filtering & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search deep research, topics, or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-sm pl-12 pr-4 py-4 font-sans text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#cfa86b]/60 transition-colors shadow-inner"
          />
        </div>
      </div>

      {/* Topics Rail */}
      <div className="flex flex-wrap items-center gap-2 pb-6">
        <div className="flex items-center space-x-2 mr-4 text-gray-500 border-r border-white/10 pr-4 py-1">
          <Filter className="h-4 w-4" />
          <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Perspectives</span>
        </div>
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`rounded-sm px-4 py-2 font-display text-xs uppercase tracking-wider transition-all border ${
              selectedTopic === topic
                ? "bg-white text-black font-bold border-white shadow-lg"
                : "text-gray-400 border-white/10 hover:text-white hover:border-white/30"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Briefings Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredArticles.map((article) => {
          const isSummarized = summarizedIds.includes(article.id);
          const isSummarizing = summarizingId === article.id;

          return (
            <div
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="group cursor-pointer rounded-sm border border-white/5 bg-slate-950 flex flex-col justify-between hover:border-[#cfa86b]/40 hover:bg-slate-900/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#cfa86b]">
                    {article.category}
                  </span>
                  <div className="flex items-center space-x-1.5 font-sans text-[10px] text-gray-500 font-bold">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-white leading-snug group-hover:text-[#cfa86b] transition-colors line-clamp-3">
                  {article.title}
                </h3>

                <p className="font-sans text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="pt-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                  By {article.author} // {article.publishedAt}
                </div>
              </div>

              {/* Cognitive AI Summary Trigger (Footer of card) */}
              <div className="border-t border-white/5 bg-slate-900/30 p-6 min-h-[100px] flex items-center justify-center">
                {isSummarized ? (
                  <div className="space-y-2 w-full">
                    <div className="flex items-center justify-between text-[#cfa86b] border-b border-[#cfa86b]/10 pb-2">
                      <span className="font-mono text-[9px] uppercase font-bold tracking-widest flex items-center space-x-2">
                        <Brain className="h-3 w-3" />
                        <span>AI Embedded Summary</span>
                      </span>
                    </div>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed">
                      {article.aiSummary}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={(e) => triggerAISummary(article.id, e)}
                    disabled={isSummarizing}
                    className="w-full flex items-center justify-center space-x-2 border border-white/10 rounded bg-slate-950 py-3 text-[10px] font-mono font-bold tracking-widest uppercase text-gray-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
                  >
                    <Sparkles className={`h-3 w-3 text-cyan-400 ${isSummarizing ? "animate-spin" : ""}`} />
                    <span>{isSummarizing ? "Synthesizing Core Concepts..." : "Generate AI Abstract"}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reader Overlay */}
      <AnimatePresence>
        {selectedArticleId && activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col pt-16 lg:pt-0"
          >
            {/* Reading Progress Bar */}
            <motion.div 
              style={{ scaleX }} 
              className="fixed top-0 left-0 right-0 h-1.5 bg-[#cfa86b] origin-left z-[60]"
            />

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950 relative z-50">
               <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Hemisystems Knowledge Center</span>
               <button
                 onClick={() => setSelectedArticleId(null)}
                 className="flex items-center space-x-2 text-gray-400 hover:text-white"
               >
                 <span className="font-mono text-xs uppercase tracking-widest">Close Briefing</span>
                 <X className="h-5 w-5" />
               </button>
            </div>

            <div 
              ref={articleContentRef}
              className="flex-1 overflow-y-auto w-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
                
                {/* Article Header */}
                <div className="space-y-6 text-center border-b border-white/10 pb-12">
                  <div className="inline-block border border-[#cfa86b]/40 bg-[#cfa86b]/5 px-3 py-1 text-[#cfa86b] font-mono text-[10px] font-bold uppercase tracking-widest">
                    {activeArticle.category} Strategy
                  </div>
                  
                  <h3 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                    {activeArticle.title}
                  </h3>

                  <div className="flex items-center justify-center space-x-4 font-mono text-xs text-gray-500 uppercase tracking-widest">
                    <span className="text-white">By {activeArticle.author}</span>
                    <span>|</span>
                    <span>{activeArticle.publishedAt}</span>
                    <span>|</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>

                {/* AI Executive Summary Block inside reader */}
                <div className="bg-slate-900 border-l-2 border-[#cfa86b] p-6 space-y-3 shadow-lg my-12">
                   <div className="flex items-center space-x-2 text-[#cfa86b]">
                     <Brain className="h-4 w-4" />
                     <span className="font-mono text-[10px] uppercase font-bold tracking-widest">AI Executive Abstract</span>
                   </div>
                   <p className="font-sans text-[15px] font-semibold text-gray-300 leading-relaxed">
                     {activeArticle.aiSummary}
                   </p>
                </div>

                {/* Main Content Body */}
                <article className="font-sans text-[17px] text-gray-300 leading-loose whitespace-pre-line selection:bg-[#cfa86b]/30 space-y-6 max-w-none">
                  {activeArticle.content}
                </article>

                {/* Recommendations Engine */}
                {recommendedArticles.length > 0 && (
                  <div className="border-t border-white/10 pt-16 mt-16 pb-24">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-white block mb-8 flex items-center space-x-3">
                      <ArrowRight className="h-4 w-4 text-[#cfa86b]"/>
                      <span>Continue Reading</span>
                    </span>
                    
                    <div className="grid gap-6 sm:grid-cols-2">
                      {recommendedArticles.map((rec) => (
                        <div
                          key={rec.id}
                          onClick={() => {
                            articleContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                            setSelectedArticleId(rec.id);
                          }}
                          className="rounded-sm border border-white/10 bg-slate-900/50 p-6 hover:border-[#cfa86b]/50 hover:bg-slate-900 transition-all cursor-pointer space-y-3 group"
                        >
                          <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-gray-500 block mb-2">
                            {rec.category}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#cfa86b] transition-colors leading-snug">
                            {rec.title}
                          </h4>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#cfa86b] flex items-center space-x-1 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-sm mt-4">
                            <span>Read Briefing</span>
                            <ArrowRight className="h-3 w-3" />
                         </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
