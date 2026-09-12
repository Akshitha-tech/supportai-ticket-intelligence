import {
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Tag,
  AlertTriangle,
  Percent,
  CheckCircle2,
  Workflow,
  ArrowRight,
  Database,
  BarChart3,
  Bot,
} from 'lucide-react';
import { PageId } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const pillars = [
    {
      icon: Tag,
      color: '#FF6B57',
      title: 'Ticket Classification',
      description:
        'Analyzes semantic intent across multi-class taxonomies using fine-tuned transformer encoders. Automatically matches customer inquiries with precision categories like Billing, Technical Outages, SSO/Identity, or Delivery.',
      metrics: '8 Production Taxonomies • 94.2% Accuracy',
      details: [
        'Multi-label entity extraction',
        'Noise removal and normalization',
        'Cross-lingual terminology parsing',
      ],
    },
    {
      icon: AlertTriangle,
      color: '#F04444',
      title: 'Priority Prediction',
      description:
        'Calculates operational urgency by evaluating customer ARR tier, downtime impact, emotional sentiment polarity, and contractual SLA terms to rank tickets from Low to Critical severity.',
      metrics: '4 Priority Tiers • 98.4% SLA Compliance',
      details: [
        'Sentiment polarity & urgency scoring',
        'Enterprise SLA deadline awareness',
        'Critical outage auto-paging triggers',
      ],
    },
    {
      icon: Percent,
      color: '#18A779',
      title: 'Confidence Scoring',
      description:
        'Generates calibrated Bayesian probability scores for every classification. Confident predictions (>85%) are dispatched autonomously, while ambiguous inquiries route to human reviewers.',
      metrics: '85% Autonomous Threshold • Fallback Safe',
      details: [
        'Bayesian posterior probability calibration',
        'Human-in-the-loop fallback gate',
        'False positive anomaly suppression',
      ],
    },
    {
      icon: BarChart3,
      color: '#15133B',
      title: 'AI-assisted Insights',
      description:
        'Aggregates ticket streams to detect emerging cluster anomalies, recurring system bugs, regional fulfillment delays, and team resolution bottlenecks in real time.',
      metrics: 'Continuous Stream Clustering • Real-time',
      details: [
        'Root-cause trend aggregation',
        'Resolution velocity tracking',
        'Dynamic executive synthesis digest',
      ],
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in-50 duration-150">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#15133B] to-[#25225E] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
            <span>SupportAI Platform Architecture</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight">SupportAI</h1>
          <p className="text-sm font-medium text-white/80 mt-1">
            AI-powered customer support ticket intelligence.
          </p>

          <p className="text-xs text-white/70 mt-4 leading-relaxed">
            SupportAI uses NLP and machine learning concepts to classify customer support tickets,
            predict priority and provide AI-assisted support insights. Built for enterprise teams
            handling thousands of mission-critical conversations every single day.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => onNavigate('analyze')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B57] hover:bg-[#ff553e] text-white transition-all shadow-sm flex items-center gap-2"
            >
              <span>Test AI Analyzer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              View Live Dashboard
            </button>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none opacity-10 flex items-center justify-center">
          <Bot className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* 4 Core Technology Pillars */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-[#15133B]">Core Intelligence Pillars</h2>
            <p className="text-xs text-[#667085]">
              Fundamental NLP and machine learning mechanisms driving autonomous classification
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: pillar.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#15133B]">{pillar.title}</h3>
                      <span className="text-[11px] font-semibold text-[#18A779]">
                        {pillar.metrics}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#667085] mt-3 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8EAF0]/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085] block mb-2">
                    Key Architectural Capabilities
                  </span>
                  <div className="space-y-1.5">
                    {pillar.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-[#17203A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#18A779] shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Machine Learning Pipeline Diagram */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#E8EAF0]">
          <Workflow className="w-4 h-4 text-[#15133B]" />
          <h3 className="text-sm font-bold text-[#15133B]">End-to-End Inference Pipeline</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0] text-center">
            <span className="w-6 h-6 rounded-full bg-[#15133B] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
              1
            </span>
            <h4 className="text-xs font-bold text-[#17203A]">Ingress & Tokenization</h4>
            <p className="text-[11px] text-[#667085] mt-1">
              Emails, webhooks & chat logs ingested and tokenized via Byte-Pair Encoding.
            </p>
          </div>

          <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0] text-center">
            <span className="w-6 h-6 rounded-full bg-[#15133B] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
              2
            </span>
            <h4 className="text-xs font-bold text-[#17203A]">Semantic Embedding</h4>
            <p className="text-[11px] text-[#667085] mt-1">
              768-dimension vectors encode customer issue context and sentiment tone.
            </p>
          </div>

          <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0] text-center">
            <span className="w-6 h-6 rounded-full bg-[#15133B] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
              3
            </span>
            <h4 className="text-xs font-bold text-[#17203A]">Multi-Task Head</h4>
            <p className="text-[11px] text-[#667085] mt-1">
              Parallel classification of Category, Priority tier, and Confidence score.
            </p>
          </div>

          <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0] text-center">
            <span className="w-6 h-6 rounded-full bg-[#18A779] text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
              4
            </span>
            <h4 className="text-xs font-bold text-[#17203A]">Autonomous Dispatch</h4>
            <p className="text-[11px] text-[#667085] mt-1">
              Routed to dedicated Tier 2/3 engineering queues or fallback triage desk.
            </p>
          </div>
        </div>
      </div>

      {/* System Specifications */}
      <div className="bg-[#F7F8FC] p-5 rounded-2xl border border-[#E8EAF0] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#667085] gap-3">
        <div>
          <span className="font-bold text-[#17203A]">SupportAI Enterprise Engine</span> • Version 4.2.0-prod
        </div>
        <div className="flex items-center gap-4">
          <span>Latency: &lt;150ms per ticket</span>
          <span>Security: SOC2 Type II Certified</span>
        </div>
      </div>
    </div>
  );
}
