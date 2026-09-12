import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowUpRight,
  PieChart,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { CategoryItem } from '../types';

interface AnalyticsPageProps {
  categories: CategoryItem[];
}

export function AnalyticsPage({ categories }: AnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [showMoreInsights, setShowMoreInsights] = useState(false);

  // Dynamic metrics based on timeRange
  const metrics = {
    '7d': {
      resolutionRate: '91.2%',
      resolutionTrend: '↑ 4.1%',
      resolutionProgress: 91.2,
      avgResponse: '1h 48m',
      avgResponseNote: '↓ 24 min reduction',
      avgResponseProgress: 88,
      accuracy: '95.8%',
      accuracyNote: 'Based on 312 automated classifications',
      totalIngested: '312 Ingested',
      volumeTrend: [
        { period: 'Mon', total: 42, resolved: 39, automated: 38 },
        { period: 'Tue', total: 54, resolved: 50, automated: 49 },
        { period: 'Wed', total: 61, resolved: 56, automated: 54 },
        { period: 'Thu', total: 49, resolved: 46, automated: 45 },
        { period: 'Fri', total: 58, resolved: 52, automated: 51 },
        { period: 'Sat', total: 28, resolved: 26, automated: 25 },
        { period: 'Sun', total: 20, resolved: 19, automated: 18 },
      ],
      maxVolume: 70,
    },
    '30d': {
      resolutionRate: '88.4%',
      resolutionTrend: '↑ 3.2%',
      resolutionProgress: 88.4,
      avgResponse: '2h 18m',
      avgResponseNote: '↓ 18 min reduction',
      avgResponseProgress: 76,
      accuracy: '94.2%',
      accuracyNote: 'Zero model hallucinations across taxonomy',
      totalIngested: '1,248 Ingested',
      volumeTrend: [
        { period: 'Week 1', total: 290, resolved: 272, automated: 260 },
        { period: 'Week 2', total: 315, resolved: 294, automated: 288 },
        { period: 'Week 3', total: 342, resolved: 310, automated: 318 },
        { period: 'Week 4', total: 301, resolved: 288, automated: 279 },
      ],
      maxVolume: 360,
    },
    '90d': {
      resolutionRate: '86.9%',
      resolutionTrend: '↑ 2.1%',
      resolutionProgress: 86.9,
      avgResponse: '2h 35m',
      avgResponseNote: '↓ 12 min reduction',
      avgResponseProgress: 68,
      accuracy: '93.6%',
      accuracyNote: 'Evaluated across 3,840 ingested tickets',
      totalIngested: '3,840 Ingested',
      volumeTrend: [
        { period: 'Month 1', total: 1180, resolved: 1040, automated: 1010 },
        { period: 'Month 2', total: 1320, resolved: 1190, automated: 1160 },
        { period: 'Month 3', total: 1340, resolved: 1210, automated: 1180 },
      ],
      maxVolume: 1500,
    },
  }[timeRange];

  const categoryBreakdown = [
    { name: 'Billing', count: timeRange === '7d' ? 78 : timeRange === '90d' ? 950 : 312, percent: 25, confidence: 95.1 },
    { name: 'Technical Issue', count: timeRange === '7d' ? 71 : timeRange === '90d' ? 880 : 286, percent: 23, confidence: 93.8 },
    { name: 'Account', count: timeRange === '7d' ? 53 : timeRange === '90d' ? 640 : 214, percent: 17, confidence: 94.7 },
    { name: 'Delivery', count: timeRange === '7d' ? 46 : timeRange === '90d' ? 570 : 187, percent: 15, confidence: 92.6 },
    { name: 'General Query', count: timeRange === '7d' ? 36 : timeRange === '90d' ? 440 : 143, percent: 11, confidence: 91.9 },
    { name: 'Security & Other', count: timeRange === '7d' ? 28 : timeRange === '90d' ? 360 : 106, percent: 9, confidence: 94.8 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in-50 duration-150">
      {/* Page Header with Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#15133B] tracking-tight">Analytics</h1>
          <p className="text-xs text-[#667085] mt-1">
            Understand ticket trends, categories and AI performance.
          </p>
        </div>

        {/* Date Filter Control */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#E8EAF0] shadow-xs self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 text-[#667085] ml-2 mr-1" />
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === range
                  ? 'bg-[#15133B] text-white shadow-xs'
                  : 'text-[#667085] hover:text-[#17203A] hover:bg-[#F7F8FC]'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Metrics: Resolution Rate, Average Response Time, AI Classification Accuracy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Resolution Rate */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">Resolution Rate</span>
            <div className="w-8 h-8 rounded-lg bg-[#18A779]/10 text-[#18A779] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#17203A]">88.4%</div>
            <div className="text-xs font-semibold text-[#18A779] flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>↑ 3.2%</span>
              <span className="text-[#667085] font-normal">first-contact resolution</span>
            </div>
          </div>
          <div className="w-full bg-[#F7F8FC] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#18A779] h-full rounded-full" style={{ width: '88.4%' }} />
          </div>
        </div>

        {/* Average Response Time */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">Average Response Time</span>
            <div className="w-8 h-8 rounded-lg bg-[#15133B]/5 text-[#15133B] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#15133B]" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#17203A]">2h 18m</div>
            <div className="text-xs font-semibold text-[#18A779] flex items-center gap-1 mt-1">
              <span>↓ 18 min reduction</span>
              <span className="text-[#667085] font-normal">vs target 3h 00m</span>
            </div>
          </div>
          <div className="w-full bg-[#F7F8FC] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#15133B] h-full rounded-full" style={{ width: '76%' }} />
          </div>
        </div>

        {/* AI Classification Accuracy */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">AI Classification Accuracy</span>
            <div className="w-8 h-8 rounded-lg bg-[#18A779]/10 text-[#18A779] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-[#18A779]">94.2%</div>
            <div className="text-xs text-[#667085] mt-1 font-normal">
              Zero model hallucinations across taxonomy
            </div>
          </div>
          <div className="w-full bg-[#F7F8FC] h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#18A779] h-full rounded-full" style={{ width: '94.2%' }} />
          </div>
        </div>
      </div>

      {/* AI Insights Section (Prominent Enterprise Block) */}
      <div className="bg-gradient-to-r from-[#15133B] to-[#211E52] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6B57]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">AI Insights & Automated Observations</h3>
            <p className="text-[11px] text-white/70">Synthesized from 1,248 incoming customer tickets and routing outcomes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-[#FF6B57] text-xs font-bold mb-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Volume Spike</span>
            </div>
            <p className="text-xs font-semibold text-white leading-relaxed">
              "Billing tickets increased 18% this month."
            </p>
            <p className="text-[11px] text-white/70 mt-1.5 leading-relaxed">
              Primarily driven by Stripe gateway webhook timeouts on the 1st of the billing cycle.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-[#F59E0B] text-xs font-bold mb-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>SLA Bottleneck</span>
            </div>
            <p className="text-xs font-semibold text-white leading-relaxed">
              "Technical issues have the highest average resolution time."
            </p>
            <p className="text-[11px] text-white/70 mt-1.5 leading-relaxed">
              Average resolution reaches 4h 12m due to cluster diagnostic artifact gathering.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 text-[#18A779] text-xs font-bold mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Model Confidence Peak</span>
            </div>
            <p className="text-xs font-semibold text-white leading-relaxed">
              "AI classification confidence is highest for Account tickets."
            </p>
            <p className="text-[11px] text-white/70 mt-1.5 leading-relaxed">
              Average confidence reached 96.4% on SAML SSO and credential reset inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Ticket Volume Over Time & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Volume Over Time */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAF0]">
            <div>
              <h3 className="text-sm font-bold text-[#15133B]">Ticket Volume Over Time</h3>
              <p className="text-xs text-[#667085] mt-0.5">Ingested tickets vs resolved rate by cycle</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#15133B]">{metrics.totalIngested}</span>
          </div>

          <div className="space-y-4 mt-6">
            {metrics.volumeTrend.map((item, i) => {
              const totalWidth = Math.round((item.total / metrics.maxVolume) * 100);
              const resolvedWidth = Math.round((item.resolved / metrics.maxVolume) * 100);
              return (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[#17203A]">{item.period}</span>
                    <span className="text-[#667085]">
                      <strong className="text-[#17203A]">{item.resolved}</strong> / {item.total} tickets resolved ({Math.round((item.resolved/item.total)*100)}%)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-[#F7F8FC] rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#15133B] rounded-l-full transition-all duration-300"
                      style={{ width: `${resolvedWidth}%` }}
                      title={`Resolved: ${item.resolved}`}
                    />
                    <div
                      className="h-full bg-[#FF6B57] transition-all duration-300"
                      style={{ width: `${Math.max(0, totalWidth - resolvedWidth)}%` }}
                      title={`In Backlog: ${item.total - item.resolved}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8EAF0] flex items-center justify-between text-xs text-[#667085]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#15133B]" />
                <span>Resolved Tickets</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FF6B57]" />
                <span>Active Backlog</span>
              </span>
            </div>
            <span>Auto-triage active</span>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8EAF0]">
            <div>
              <h3 className="text-sm font-bold text-[#15133B]">Category Distribution</h3>
              <p className="text-xs text-[#667085] mt-0.5">Distribution across primary taxonomies</p>
            </div>
            <span className="text-xs font-bold text-[#18A779] bg-[#18A779]/10 px-2 py-0.5 rounded-full">
              6 Clusters
            </span>
          </div>

          <div className="space-y-3 mt-5">
            {categoryBreakdown.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#17203A]">{cat.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#667085]">{cat.count} ({cat.percent}%)</span>
                    <span className="text-[11px] font-bold text-[#18A779]">{cat.confidence}% conf</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-[#F7F8FC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#15133B] rounded-full transition-all"
                    style={{ width: `${cat.percent * 3.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-3 border-t border-[#E8EAF0] text-xs text-[#667085] flex items-center justify-between">
            <span>Model Version: DistilBERT-MultiTask-Support-v4</span>
            <span className="font-semibold text-[#15133B]">Calibrated Threshold: 85%</span>
          </div>
        </div>
      </div>

      {/* Priority Distribution Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs">
        <h3 className="text-sm font-bold text-[#15133B] mb-1">Priority Distribution & SLA Matrix</h3>
        <p className="text-xs text-[#667085] mb-5">Response and resolution benchmarks enforced per severity</p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#F04444]/5 border border-[#F04444]/20">
            <span className="text-xs font-bold text-[#F04444] uppercase tracking-wider block">Critical</span>
            <div className="text-2xl font-extrabold text-[#F04444] mt-1">94</div>
            <div className="text-xs text-[#667085] mt-1 font-medium">SLA: &lt; 1 hour (99.1% met)</div>
          </div>

          <div className="p-4 rounded-xl bg-[#F04444]/5 border border-[#F04444]/20">
            <span className="text-xs font-bold text-[#F04444] uppercase tracking-wider block">High Priority</span>
            <div className="text-2xl font-extrabold text-[#17203A] mt-1">321</div>
            <div className="text-xs text-[#667085] mt-1 font-medium">SLA: &lt; 2 hours (96.4% met)</div>
          </div>

          <div className="p-4 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/20">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider block">Medium Priority</span>
            <div className="text-2xl font-extrabold text-[#17203A] mt-1">542</div>
            <div className="text-xs text-[#667085] mt-1 font-medium">SLA: &lt; 8 hours (94.0% met)</div>
          </div>

          <div className="p-4 rounded-xl bg-[#3B82F6]/5 border border-[#3B82F6]/20">
            <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider block">Low Priority</span>
            <div className="text-2xl font-extrabold text-[#17203A] mt-1">291</div>
            <div className="text-xs text-[#667085] mt-1 font-medium">SLA: &lt; 24 hours (98.2% met)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
