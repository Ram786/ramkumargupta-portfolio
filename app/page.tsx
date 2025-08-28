'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Globe, Shield, Gauge, Cpu, Cloud, Sparkles, Book, Database, Layers, LineChart, Menu, X, ArrowDownRight } from 'lucide-react';
import ThemeToggle from '../components/theme-toggle';
import TiltCard from '../components/tilt-card';
import CommandMenu from '../components/command-menu';

const Section = ({ id, title, subtitle, children }:{ id:string; title:string; subtitle?:string; children:React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 py-14 sm:py-16">
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-2 text-slate-600 dark:text-slate-300 text-base sm:text-lg">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);
const Badge = ({ children }:{ children:React.ReactNode }) => (<span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium">{children}</span>);
const Stat = ({ icon: Icon, label, value }:{ icon:any; label:string; value:string }) => (
  <div className="rounded-2xl border p-5 shadow-sm bg-white/50 dark:bg-white/5 backdrop-blur">
    <div className="flex items-center gap-3">
      <div className="rounded-xl p-2 border"><Icon className="h-5 w-5" /></div>
      <div><div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div><div className="text-xl font-semibold">{value}</div></div>
    </div>
  </div>
);
const Card = ({ title, children, right, icon: Icon }:{ title:string; children:React.ReactNode; right?:React.ReactNode; icon?:any }) => (
  <div className="rounded-2xl border p-6 shadow-sm bg-white/60 dark:bg-white/5 backdrop-blur hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-4 mb-3">
      <div className="flex items-center gap-3">
        {Icon && <div className="rounded-xl p-2 border"><Icon className="h-5 w-5" /></div>}
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
      </div>
      {right}
    </div>
    {children}
  </div>
);
const SOCIAL = [
  { href: 'https://github.com/ram786', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/ramkumar-gupta', label: 'LinkedIn', Icon: Linkedin },
  { href: 'mailto:ramgosaipur@gmail.com?subject=Let%27s%20talk%20about%20Applied%20AI%20Platform%20roles', label: 'Email', Icon: Mail }
];
const NAV = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#fullstack', label: 'Full-Stack Map' },
  { href: '#metrics', label: 'Impact' },
  { href: '#oss', label: 'Open Source' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#contact', label: 'Contact' },
];
const projects = [
  { title: 'RAG Service (E2E)', description: 'Production-ready retrieval-augmented generation over product docs with evals, caching, and cost/latency panels.', highlights: ['pgvector + hybrid search','RAG evals pipeline','Prompt-injection tests','OTel traces end-to-end'], tags: ['AI','RAG','pgvector','OpenTelemetry','Security'], repo: 'https://github.com/ram-platform-ai/rag-service', demo: '#' },
  { title: 'AI Guardrails Lab', description: 'OWASP LLM Top-10 demo with toggleable mitigations: injection isolation, output validation, PII redaction.', highlights: ['Red teaming harness','Policy & content filters','Audit logs'], tags: ['LLM Security','OWASP','Policies'], repo: 'https://github.com/ram-platform-ai/llm-guardrails-lab', demo: '#' },
  { title: 'Order Orchestrator (Idempotent)', description: 'EventBridge + Step Functions + SQS orchestration for preorder workflow with idempotency, retries, DLQ, and circuit breaker.', highlights: ['Exactly-once-like semantics','Compensation steps','Chaos tests'], tags: ['AWS','EventBridge','StepFunctions','Resilience'], repo: 'https://github.com/ram-platform-ai/order-orchestrator', demo: '#' },
  { title: 'Observability Golden Path', description: 'Drop-in template wiring logs, metrics, and traces across Next.js + Node + DB. One golden dashboard per service.', highlights: ['p95/p99 SLOs','Trace-based alerts','Service map'], tags: ['OpenTelemetry','Grafana','SLO'], repo: 'https://github.com/ram-platform-ai/otel-starter', demo: '#' },
  { title: 'IDP Service Template', description: 'Create-a-service generator with CI/CD, Terraform modules, SLOs, security checks, and cost budgets by default.', highlights: ['Backstage catalog','Golden paths','Policy as code'], tags: ['Platform','Terraform','Backstage','CI/CD'], repo: 'https://github.com/ram-platform-ai/idp-template', demo: '#' },
  { title: 'FinOps Scorecard', description: 'Unit economics for services: request-level cost (tokens + infra), autoscaling, and Savings Plans recommendations.', highlights: ['Right-sizing','Load tests (k6)','Waste reduction'], tags: ['FinOps','k6','Autoscaling'], repo: 'https://github.com/ram-platform-ai/finops-scorecard', demo: '#' },
  { title: 'Feature Flags & Experiments', description: 'Multi-tenant feature flag service with SDK, audit trail, and staged rollouts/canaries for safe experimentation.', highlights: ['Global cache','Rollout policies','Tenancy'], tags: ['Platform','Flags','Experiments'], repo: 'https://github.com/ram-platform-ai/flags', demo: '#' },
  { title: 'Search-at-Scale', description: 'Hybrid semantic + BM25 search across ~1M synthetic docs with sharding, query routing, and warm caches.', highlights: ['Consistent hashing','Shard balancer','Perf budgets'], tags: ['Search','Sharding','Scaling'], repo: 'https://github.com/ram-platform-ai/search-at-scale', demo: '#' },
  { title: 'Secure Data Boundary Gateway', description: 'Upload -> scan (DLP/AV) -> store -> signed URLs with PII redaction and strict tenancy boundaries.', highlights: ['Least-privilege IAM','Egress controls','Audit trails'], tags: ['Security','DLP','Tenancy'], repo: 'https://github.com/ram-platform-ai/data-boundary-gateway', demo: '#' },
  { title: 'AI E-commerce Assistant', description: 'Next.js storefront + Node APIs + AI copilot (RAG + tools: inventory, orders) with OTel, SLOs, and cost controls.', highlights: ['Tool-use router','Eval harness','Latency/cost targets'], tags: ['AI','Next.js','SLO','Cost'], repo: 'https://github.com/ram-platform-ai/ai-commerce', demo: '#' },
];

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/70 dark:bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-lg link-underline">Ramkumar Gupta</a>
          <nav className="hidden md:flex gap-6 text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:underline underline-offset-4">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="md:hidden rounded-full p-2 border" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu className="h-4 w-4" />
            </button>
            <div className="hidden md:flex items-center gap-3">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a key={label} href={href} aria-label={label} className="rounded-full p-2 border hover:bg-slate-100 dark:hover:bg-white/10" target="_blank" rel="noreferrer">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t bg-white/95 dark:bg-black/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <span className="font-medium">Menu</span>
              <button className="rounded-full p-2 border" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-w-7xl mx-auto px-4 pb-4 grid gap-2">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="rounded-lg border px-3 py-2 text-sm" onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
              <div className="flex items-center gap-2 pt-2">
                {SOCIAL.map(({ href, label, Icon }) => (
                  <a key={label} href={href} aria-label={label} className="rounded-full p-2 border" target="_blank" rel="noreferrer">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-white/60 dark:to-black/60" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mb-4 bg-white/50 dark:bg-white/10 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> Applied AI Platform Architect
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
                Build AI products that are <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500">observable</span>, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500">secure</span> and <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500">cost-efficient</span>.
              </h1>
              <p className="mt-5 text-lg text-slate-600 dark:text-slate-300 max-w-prose">
                Lead full-stack to platform-minded architect: RAG/agents, guardrails, OpenTelemetry, SLOs, Terraform/CDK, and FinOps baked into every feature.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#projects" className="rounded-xl bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium inline-flex items-center gap-2">Explore Projects <ArrowDownRight className="h-4 w-4" /></a>
                <a href="mailto:ramgosaipur@gmail.com?subject=Let%27s%20talk%20about%20Applied%20AI%20Platform%20roles" className="rounded-xl border px-4 py-2 text-sm font-medium flex items-center gap-2"><Mail className="h-4 w-4" /> Hire Me</a>
                <a href="#resume" className="rounded-xl border px-4 py-2 text-sm font-medium flex items-center gap-2"><Book className="h-4 w-4" /> Resume Snapshot</a>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl border shadow-glow p-6 bg-white/60 dark:bg-white/5 backdrop-blur">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Stat icon={Gauge} label="p95 latency" value="< 250 ms" />
                  <Stat icon={Shield} label="security issues" value="0 critical" />
                  <Stat icon={LineChart} label="cost / request" value="₹0.02" />
                  <Stat icon={Cloud} label="deploys / week" value="20+" />
                  <Stat icon={Cpu} label="availability" value="99.95%" />
                  <Stat icon={Database} label="data sources" value="> 1M docs" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="border-y py-4 bg-white/40 dark:bg-white/5 backdrop-blur">
          <div className="mx-auto max-w-7xl overflow-hidden">
            <div className="marquee">
              {[ 'RAG','Prompt Router','Guardrails','OpenTelemetry','SLOs','Terraform','CDK','SQS/SNS','EventBridge','Step Functions','pgvector','Feature Flags','FinOps','Grafana','k6','Playwright','Backstage' ]
                .concat([ 'RAG','Prompt Router','Guardrails','OpenTelemetry','SLOs','Terraform','CDK','SQS/SNS','EventBridge','Step Functions','pgvector','Feature Flags','FinOps','Grafana','k6','Playwright','Backstage' ])
                .map((t,i)=>(<span key={i} className="mx-4 text-sm opacity-80">• {t}</span>))}
            </div>
          </div>
        </div>
      </section>

      <Section id="skills" title="Core Skills & Stack" subtitle="Full-stack + AI + platform: what I ship with every project">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="AI Application Engineering"><div className="flex flex-wrap gap-2">{['RAG','Eval Harness','Prompt Router','Guardrails','Vector Search','Streaming'].map((t) => (<Badge key={t}>{t}</Badge>))}</div></Card>
          <Card title="Platform / DX"><div className="flex flex-wrap gap-2">{['Backstage','IDP','Golden Paths','CI/CD','Feature Flags'].map((t) => (<Badge key={t}>{t}</Badge>))}</div></Card>
          <Card title="Observability & SLOs"><div className="flex flex-wrap gap-2">{['OpenTelemetry','Grafana','p95/p99','Error Budgets','Tracing'].map((t) => (<Badge key={t}>{t}</Badge>))}</div></Card>
          <Card title="Security"><div className="flex flex-wrap gap-2">{['OWASP LLM','PII Redaction','Tenancy','Tokenization','Audit Trails'].map((t) => (<Badge key={t}>{t}</Badge>))}</div></Card>
          <Card title="Cloud & Infra"><div className="flex flex-wrap gap-2">{['AWS','Terraform','CDK','SQS/SNS','EventBridge','Step Functions'].map((t) => (<Badge key={t}>{t}</Badge>))}</div></Card>
          <Card title="Data & Stores"><div className="flex flex-wrap gap-2">{['Postgres','pgvector','DynamoDB','Redis','S3'].map((t) => (<Badge key={t}>{t}</Badge>))}</div></Card>
        </div>
      </Section>

      {/* Full-Stack Skill Map */}
      <Section id="fullstack" title="Full-Stack Skill Map" subtitle="Strengths across the stack with real production use">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Front-End">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>React & Next.js (App Router), TypeScript</li>
              <li>State: Redux & modern hooks patterns</li>
              <li>UI: Tailwind, custom component systems</li>
              <li>Accessibility & performance budgets</li>
              <li>Charts, dashboards, localization (i18n)</li>
            </ul>
          </Card>
          <Card title="Back-End">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Node.js, Express, serverless (AWS Lambda)</li>
              <li>Auth (OAuth, Azure AD), RBAC, audit trails</li>
              <li>Resilient APIs: retries, idempotency, queues</li>
              <li>ETL & data migrations (Aurora, DMS)</li>
              <li>Observability: logs, metrics, traces</li>
            </ul>
          </Card>
          <Card title="Data & Storage">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>MongoDB, PostgreSQL, DynamoDB, Redis</li>
              <li>File/object storage (S3/Cloud Storage)</li>
              <li>Vector search (pgvector), indexing at scale</li>
              <li>Schema design, performance tuning</li>
            </ul>
          </Card>
          <Card title="Cloud & DevOps">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>AWS (Lambda, API Gateway, IoT, SQS/SNS)</li>
              <li>GCP (App Engine, Cloud Functions, Pub/Sub)</li>
              <li>CI/CD (Jenkins, GitHub), IaC (Terraform/CDK)</li>
              <li>SLOs, on-call, incident playbooks</li>
            </ul>
          </Card>
        </div>
        <div className="mt-6">
          <a href="/Ramkumar_Gupta_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium">
            Download Resume (PDF)
          </a>
        </div>
      </Section>

      {/* Project Highlights */}
      <Section id="highlights" title="Project Highlights" subtitle="A taste of outcomes and trade-offs from recent work">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Consumer Apps at Scale">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Led development of web/mobile apps that improved sales and user satisfaction</li>
              <li>Localization across frontend & backend; optimized user journeys</li>
              <li>Live store tracking with AWS IoT; rigorous code reviews</li>
            </ul>
          </Card>
          <Card title="Analytics & IoT Dashboards">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Architected admin dashboards over large datasets; designed RBAC</li>
              <li>Cloud functions for image optimization; export of large datasets</li>
              <li>Built visualizations (Canvas/React) and performance-tuned APIs</li>
            </ul>
          </Card>
          <Card title="Healthcare & Imaging">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Integrated DICOM viewers; privacy and access control first</li>
              <li>Built dose tracking & protocol management modules</li>
              <li>TypeScript + React with robust forms and validation</li>
            </ul>
          </Card>
          <Card title="Data Migration & Serverless">
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Migrated TBs of data to Aurora Serverless with DMS</li>
              <li>Implemented serverless services with strong auth & localization</li>
              <li>Search/indexing, caching, and cost-aware architectures</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" subtitle="Interactive cards with motion & tilt">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map((p) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
              <TiltCard>
                <div className="group rounded-2xl border p-5 sm:p-6 shadow-sm bg-white/60 dark:bg-white/5 backdrop-blur hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl p-2 border"><Globe className="h-5 w-5" /></div>
                      <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <a className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs" href={p.demo} target="_blank" rel="noreferrer"><ExternalLink className="h-3.5 w-3.5" /> Demo</a>
                      <a className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs" href={p.repo} target="_blank" rel="noreferrer"><Github className="h-3.5 w-3.5" /> Repo</a>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
                  <ul className="mt-3 grid gap-1 text-sm list-disc list-inside">{p.highlights.map((h) => (<li key={h}>{h}</li>))}</ul>
                  <div className="mt-3 flex flex-wrap gap-2 mt-auto">{p.tags.map((t) => (<Badge key={t}>{t}</Badge>))}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Metrics */}
      <Section id="metrics" title="Impact Metrics" subtitle="What I optimize and report for every system I lead">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Stat icon={Gauge} label="p95 latency" value="< 250 ms across core APIs" />
          <Stat icon={Shield} label="security findings" value="0 critical / 0 high" />
          <Stat icon={LineChart} label="cost per request" value="₹0.02 (AI) | ₹0.005 (non-AI)" />
          <Stat icon={Cloud} label="deploy cadence" value="20–30 per week" />
          <Stat icon={Cpu} label="availability" value=">= 99.95%" />
          <Stat icon={Database} label="scale" value="> 1M docs indexed" />
        </div>
      </Section>

      {/* OSS */}
      <Section id="oss" title="Open Source & Community" subtitle="Small, consistent contributions where I build and learn">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="OpenTelemetry"><p className="text-sm text-slate-600 dark:text-slate-300">Plugin samples + docs improvements; trace context propagation utilities for Node/Next.</p></Card>
          <Card title="Backstage / IDP"><p className="text-sm text-slate-600 dark:text-slate-300">Templates and example golden paths for Node services with SLOs and budgets.</p></Card>
        </div>
      </Section>

      {/* Case Studies */}
      <Section id="case-studies" title="Case Studies (1-minute reads)" subtitle="Trade-offs with measurable results">
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Consistency vs Availability (Payments)"><ul className="list-disc list-inside text-sm space-y-1">
            <li><strong>Problem:</strong> Duplicate payment attempts under retry storms.</li>
            <li><strong>Action:</strong> Chose CP path + idempotency keys + exactly-once-like orchestration.</li>
            <li><strong>Result:</strong> Charge duplicates -> 0; p95 auth latency 220ms; error rate 0.2%.</li>
          </ul></Card>
          <Card title="FinOps Hotspot -> Unit Economics"><ul className="list-disc list-inside text-sm space-y-1">
            <li><strong>Problem:</strong> LLM endpoint cost spikes during peak traffic.</li>
            <li><strong>Action:</strong> Prompt compression + caching + model routing + autoscaling.</li>
            <li><strong>Result:</strong> Cost/request down 48% with stable p95 and quality.</li>
          </ul></Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Let's build something" subtitle="I am open to Lead/Principal roles and consulting">
        <div className="flex flex-wrap items-center gap-3">
          <a href="mailto:ramgosaipur@gmail.com?subject=Let%27s%20talk%20about%20Applied%20AI%20Platform%20roles" className="inline-flex items-center gap-2 rounded-xl bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium"><Mail className="h-4 w-4" /> Email Me</a>
          <a href="https://github.com/ram786" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium"><Github className="h-4 w-4" /> GitHub</a>
          <a href="https://www.linkedin.com/in/ramkumar-gupta" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium"><Linkedin className="h-4 w-4" /> LinkedIn</a>
        </div>
      </Section>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500">
          © {new Date().getFullYear()} Ramkumar Gupta · Built with Next.js + Tailwind · Observability-first.
        </div>
      </footer>

      {/* Command Palette */}
      <CommandMenu items={NAV} />
    </div>
  );
}
