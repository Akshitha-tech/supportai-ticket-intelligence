import { useState } from 'react';
import {
  Sparkles,
  RotateCcw,
  Tag,
  AlertTriangle,
  UserCheck,
  Send,
  CheckCircle2,
  Cpu,
  Mail,
  MessageSquare,
  Phone,
  Globe,
  ArrowRight,
  TrendingDown,
  Layers,
  Check,
} from 'lucide-react';
import { Ticket, TicketSource, TicketPriority } from '../types';
import { PRESET_ANALYSIS_TICKETS } from '../data/mockData';

interface AnalyzeTicketPageProps {
  onAddTicketToHistory: (newTicket: Ticket) => void;
  onNavigateToHistory: () => void;
}

interface AnalysisResultData {
  category: string;
  priority: TicketPriority;
  confidence: number;
  assignment: string;
  assignedTeam: string;
  keywords: string[];
  sentiment: {
    label: 'Positive' | 'Neutral' | 'Negative' | 'Urgent';
    score: number;
  };
  reason: string;
  recommendedAction: string;
  customerImpact: string;
  slaTarget: string;
}

export function AnalyzeTicketPage({
  onAddTicketToHistory,
  onNavigateToHistory,
}: AnalyzeTicketPageProps) {
  const [ticketText, setTicketText] = useState('');
  const [source, setSource] = useState<TicketSource>('Email');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultData | null>(null);
  const [savedToHistory, setSavedToHistory] = useState(false);

  const sources: { id: TicketSource; icon: typeof Mail; label: string }[] = [
    { id: 'Email', icon: Mail, label: 'Email' },
    { id: 'Chat', icon: MessageSquare, label: 'Chat' },
    { id: 'Phone', icon: Phone, label: 'Phone' },
    { id: 'Web Portal', icon: Globe, label: 'Web Portal' },
  ];

  const handleSelectPreset = (preset: typeof PRESET_ANALYSIS_TICKETS[0]) => {
    setTicketText(preset.text);
    setSource(preset.source);
    setAnalysisResult(null);
    setSavedToHistory(false);
  };

  const handleClear = () => {
    setTicketText('');
    setAnalysisResult(null);
    setSavedToHistory(false);
  };

  const handleAnalyze = () => {
    let currentText = ticketText.trim();
    if (!currentText) {
      currentText = PRESET_ANALYSIS_TICKETS[0].text;
      setTicketText(currentText);
      setSource(PRESET_ANALYSIS_TICKETS[0].source);
    }

    setIsAnalyzing(true);
    setSavedToHistory(false);

    // Simulate realistic inference delay
    setTimeout(() => {
      const lower = currentText.toLowerCase();

      let result: AnalysisResultData;

      if (lower.includes('invoice') || lower.includes('bill') || lower.includes('charge') || lower.includes('refund') || lower.includes('stripe')) {
        result = {
          category: 'Billing',
          priority: 'High',
          confidence: 95.1,
          assignment: 'Tier 2 Billing',
          assignedTeam: 'Tier 2 Billing Operations',
          keywords: ['invoice reconciliation', 'double charge', 'credit card failure', 'audit compliance', 'refund'],
          sentiment: { label: 'Negative', score: -0.74 },
          reason: 'Identified recurring monetary discrepancy with explicit billing identifiers, card decline indicators, and financial deadline pressure.',
          recommendedAction: 'Verify transaction ledger in Stripe Gateway, issue credit memo reversal, notify account controller with consolidated PDF.',
          customerImpact: 'Enterprise Account ($120,000/yr ARR) - Escalated SLA target 1 hour.',
          slaTarget: '1h 00m'
        };
      } else if (lower.includes('outage') || lower.includes('500') || lower.includes('api') || lower.includes('graphql') || lower.includes('bug') || lower.includes('cluster') || lower.includes('crash')) {
        result = {
          category: 'Technical Issue',
          priority: 'Critical',
          confidence: 97.4,
          assignment: 'Tier 3 Engineering Escalations',
          assignedTeam: 'Tier 3 Engineering',
          keywords: ['HTTP 500 error', 'cluster outage', 'production ingress', 'connection pool', 'Kafka queue overflow'],
          sentiment: { label: 'Urgent', score: -0.92 },
          reason: 'Production-impacting technical failure affecting critical services with high queue backlog and SLA Level 1 escalation.',
          recommendedAction: 'Page on-call SRE lead immediately, investigate database connection pool saturation, execute horizontal pod scaling.',
          customerImpact: 'Mission Critical Partner - Systemic production outage with potential data pipeline loss.',
          slaTarget: '30m'
        };
      } else if (lower.includes('sso') || lower.includes('okta') || lower.includes('saml') || lower.includes('login') || lower.includes('password') || lower.includes('mfa')) {
        result = {
          category: 'Account',
          priority: 'High',
          confidence: 96.2,
          assignment: 'Identity & Access Support',
          assignedTeam: 'Identity & Access',
          keywords: ['SAML assertion', 'Okta SSO', 'invalid signature', 'tenant lockout', 'workforce authentication'],
          sentiment: { label: 'Urgent', score: -0.85 },
          reason: 'Workforce authentication failure due to identity federation token signature mismatch blocking entire support operations.',
          recommendedAction: 'Regenerate federation metadata XML, reconcile audience restriction URL, provide emergency SAML rollover certificate.',
          customerImpact: '320 global support operators blocked from accessing customer care systems.',
          slaTarget: '45m'
        };
      } else if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('customs') || lower.includes('pallet') || lower.includes('hardware') || lower.includes('carrier')) {
        result = {
          category: 'Delivery',
          priority: 'High',
          confidence: 93.8,
          assignment: 'Logistics & Dispatch',
          assignedTeam: 'Logistics',
          keywords: ['damaged equipment', 'intermodal transit', 'DHL tracking', 'Frankfurt terminal', 'water sensor alert'],
          sentiment: { label: 'Urgent', score: -0.65 },
          reason: 'Physical hardware consignment arrived damaged with moisture breach indicators requiring expedited logistics intervention.',
          recommendedAction: 'File RMA transit claim with carrier, authorize expedited air-freight replacement batch from European hub.',
          customerImpact: 'Deployment schedule paused for 40 industrial sensor gateways.',
          slaTarget: '2h 00m'
        };
      } else {
        result = {
          category: 'General Query',
          priority: 'Medium',
          confidence: 91.5,
          assignment: 'Tier 1 Support Generalists',
          assignedTeam: 'Customer Care Support',
          keywords: ['product inquiry', 'documentation', 'operational guideline', 'onboarding'],
          sentiment: { label: 'Neutral', score: 0.15 },
          reason: 'Standard customer inquiry regarding product configuration and integration guidance.',
          recommendedAction: 'Provide step-by-step knowledge base documentation and offer architecture consultation follow-up.',
          customerImpact: 'Standard operational support inquiry.',
          slaTarget: '4h 00m'
        };
      }

      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 550);
  };

  const handleSaveToHistory = () => {
    if (!analysisResult) return;

    const newTicket: Ticket = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: 'Enterprise Client',
      customerCompany: 'Analyzed Account Corp',
      customerEmail: 'ops@analyzedclient.com',
      subject: ticketText.slice(0, 70).replace(/\n/g, ' ') + (ticketText.length > 70 ? '...' : ''),
      body: ticketText,
      category: analysisResult.category,
      priority: analysisResult.priority,
      aiConfidence: analysisResult.confidence,
      assignedTo: analysisResult.assignment.includes('Billing') ? 'Sarah Jenkins' : analysisResult.assignment.includes('Engineering') ? 'Marcus Vance' : 'David Chen',
      assignedTeam: analysisResult.assignedTeam,
      status: 'Open',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      source,
      extractedKeywords: analysisResult.keywords,
      sentiment: analysisResult.sentiment,
      classificationReason: analysisResult.reason,
      recommendedAction: analysisResult.recommendedAction,
      customerImpact: analysisResult.customerImpact,
      slaTarget: analysisResult.slaTarget
    };

    onAddTicketToHistory(newTicket);
    setSavedToHistory(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in-50 duration-150">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#15133B] tracking-tight">Analyze Ticket</h1>
        <p className="text-xs text-[#667085] mt-1">
          Analyze a customer support ticket using SupportAI.
        </p>
      </div>

      {/* Quick Test Presets */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8EAF0] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-[#15133B] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
            Quick Test Evaluation Presets
          </span>
          <span className="text-[11px] text-[#667085]">Click any scenario to populate:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_ANALYSIS_TICKETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="p-2.5 text-left rounded-xl bg-[#F7F8FC] hover:bg-[#F0F2F8] border border-[#E8EAF0] hover:border-[#15133B]/30 transition-all text-xs group"
            >
              <div className="font-bold text-[#17203A] group-hover:text-[#15133B] truncate">{preset.title}</div>
              <div className="text-[11px] text-[#667085] mt-0.5 flex items-center gap-1">
                <span>Via {preset.source}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8EAF0] shadow-xs space-y-5">
        {/* Source Selector */}
        <div>
          <label className="block text-xs font-bold text-[#17203A] mb-2 uppercase tracking-wider text-[#667085]">
            Ticket Ingress Source
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {sources.map((src) => {
              const Icon = src.icon;
              const isSelected = source === src.id;
              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => setSource(src.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-[#15133B] text-white border-[#15133B] shadow-sm'
                      : 'bg-[#F7F8FC] text-[#667085] border-[#E8EAF0] hover:bg-white hover:text-[#17203A]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FF6B57]' : 'text-[#667085]'}`} />
                  <span>{src.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Text Area */}
        <div>
          <label htmlFor="ticket-input-area" className="block text-xs font-bold text-[#17203A] mb-2 uppercase tracking-wider text-[#667085]">
            Ticket Raw Text or Conversation
          </label>
          <textarea
            id="ticket-input-area"
            rows={7}
            placeholder="Paste customer ticket or conversation here..."
            value={ticketText}
            onChange={(e) => {
              setTicketText(e.target.value);
              if (savedToHistory) setSavedToHistory(false);
            }}
            className="w-full p-4 text-xs font-normal text-[#17203A] placeholder-[#667085] bg-[#F7F8FC] focus:bg-white border border-[#E8EAF0] focus:border-[#15133B] focus:ring-1 focus:ring-[#15133B] rounded-xl outline-none transition-all leading-relaxed"
          />
          <div className="flex justify-between text-[11px] text-[#667085] mt-1.5 px-1">
            <span>Character count: {ticketText.length}</span>
            <span>Supports raw emails, API logs, and chat transcripts</span>
          </div>
        </div>

        {/* Action Buttons: Clear and Analyze Ticket */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E8EAF0]">
          <button
            id="analyze-clear-btn"
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#17203A] hover:bg-[#F7F8FC] transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            id="analyze-submit-btn"
            type="button"
            disabled={isAnalyzing}
            onClick={handleAnalyze}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
              isAnalyzing
                ? 'bg-[#CBD5E1] text-white cursor-not-allowed'
                : 'bg-[#15133B] hover:bg-[#25225E] text-white shadow-[#15133B]/10 active:scale-[0.98]'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-[#FF6B57]" />
                <span>Running NLP Pipeline...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#FF6B57]" />
                <span>Analyze Ticket</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Analysis Result (Visually prominent, enterprise state change) */}
      {analysisResult && (
        <div
          id="analysis-result-panel"
          className="bg-white rounded-2xl border-2 border-[#15133B]/20 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
        >
          {/* Header banner */}
          <div className="bg-[#15133B] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FF6B57]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">SupportAI Classification Result</h3>
                <p className="text-[11px] text-white/70">NLP Transformer model v4.2 • Ingested via {source}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-[#18A779] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>AI Confidence: {analysisResult.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Primary Metrics Grid */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Predicted Category */}
              <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0]">
                <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">
                  Predicted Category
                </span>
                <p className="text-base font-extrabold text-[#15133B] mt-1">
                  {analysisResult.category}
                </p>
                <span className="text-[10px] text-[#667085] font-mono mt-0.5 block">
                  Taxonomy: Tier 1 Auto-Route
                </span>
              </div>

              {/* Predicted Priority */}
              <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0]">
                <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">
                  Predicted Priority
                </span>
                <p className="text-base font-extrabold text-[#F04444] mt-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  {analysisResult.priority}
                </p>
                <span className="text-[10px] text-[#667085] mt-0.5 block">
                  SLA Target: {analysisResult.slaTarget}
                </span>
              </div>

              {/* Suggested Assignment */}
              <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0]">
                <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">
                  Suggested Assignment
                </span>
                <p className="text-base font-extrabold text-[#17203A] mt-1 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#15133B]" />
                  {analysisResult.assignment}
                </p>
                <span className="text-[10px] text-[#667085] mt-0.5 block">
                  {analysisResult.assignedTeam}
                </span>
              </div>

              {/* Sentiment */}
              <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0]">
                <span className="text-[11px] font-semibold text-[#667085] uppercase tracking-wider block">
                  Sentiment
                </span>
                <p className="text-base font-extrabold text-[#17203A] mt-1 flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      analysisResult.sentiment.label === 'Urgent' || analysisResult.sentiment.label === 'Negative'
                        ? 'bg-[#F04444]'
                        : 'bg-[#18A779]'
                    }`}
                  />
                  {analysisResult.sentiment.label}
                </p>
                <span className="text-[10px] text-[#667085] mt-0.5 block">
                  Polarity Score: {analysisResult.sentiment.score}
                </span>
              </div>
            </div>

            {/* Extracted Keywords */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#667085] block mb-2">
                Extracted Keywords & Entity Tokens
              </span>
              <div className="flex flex-wrap gap-2">
                {analysisResult.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#15133B]/5 border border-[#15133B]/10 text-[#15133B] flex items-center gap-1.5"
                  >
                    <Tag className="w-3 h-3 text-[#FF6B57]" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Explanation Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0]">
                <h4 className="text-xs font-bold text-[#15133B] uppercase tracking-wider mb-1">
                  Classification Reason
                </h4>
                <p className="text-xs text-[#17203A] leading-relaxed">
                  {analysisResult.reason}
                </p>
              </div>

              <div className="bg-[#18A779]/5 p-4 rounded-xl border border-[#18A779]/20">
                <h4 className="text-xs font-bold text-[#18A779] uppercase tracking-wider mb-1">
                  Recommended Action
                </h4>
                <p className="text-xs text-[#17203A] leading-relaxed">
                  {analysisResult.recommendedAction}
                </p>
              </div>

              <div className="bg-[#F7F8FC] p-4 rounded-xl border border-[#E8EAF0]">
                <h4 className="text-xs font-bold text-[#15133B] uppercase tracking-wider mb-1">
                  Customer Impact
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {analysisResult.customerImpact}
                </p>
              </div>
            </div>

            {/* Bottom Actions: Save to History */}
            <div className="pt-4 border-t border-[#E8EAF0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-[#667085]">
                Analysis verified against calibrated multi-class Bayesian confidence thresholds.
              </span>

              <div className="flex items-center gap-3">
                {savedToHistory ? (
                  <button
                    onClick={onNavigateToHistory}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#18A779] text-white flex items-center gap-1.5 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved! View in Ticket History</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    id="save-to-history-btn"
                    onClick={handleSaveToHistory}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#15133B] hover:bg-[#25225E] text-white transition-all duration-150 flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FF6B57]" />
                    <span>Dispatch & Log to Ticket History</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
