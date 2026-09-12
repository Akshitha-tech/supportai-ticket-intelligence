import { useState } from 'react';
import {
  User,
  Bell,
  Cpu,
  UserCheck,
  Palette,
  Shield,
  Save,
  Mail,
  Smartphone,
  Webhook,
  Sparkles,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface SettingsPageProps {
  onShowToast: (title: string, description?: string, type?: 'success' | 'error' | 'info') => void;
}

type SettingsTab = 'profile' | 'notifications' | 'ai' | 'assignment' | 'appearance' | 'security';

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-[#FF6B57]' : 'bg-[#E8EAF0]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export function SettingsPage({ onShowToast }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('ai');

  // Form states
  const [profileName, setProfileName] = useState('Alex Mercer');
  const [profileEmail, setProfileEmail] = useState('alex.mercer@supportai.io');
  const [profileRole, setProfileRole] = useState('Lead Designer & Support Admin');
  const [timezone, setTimezone] = useState('America/Los_Angeles (PST)');

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [smsUrgent, setSmsUrgent] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  // AI Preferences
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [autoTagging, setAutoTagging] = useState(true);
  const [sentimentAnalysis, setSentimentAnalysis] = useState(true);
  const [fallbackQueue, setFallbackQueue] = useState('Human Triage Queue');
  const [modelTemperature, setModelTemperature] = useState('Deterministic (0.1)');

  // Ticket Assignment
  const [routingMode, setRoutingMode] = useState('Skill-Based Affinity');
  const [maxTicketsPerAgent, setMaxTicketsPerAgent] = useState('15');
  const [autoEscalateAfterHours, setAutoEscalateAfterHours] = useState('2');

  // Appearance
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  // Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('8 hours');

  const handleSave = () => {
    onShowToast(
      'Settings Saved Successfully',
      'All enterprise preferences and AI routing thresholds have been committed.',
      'success'
    );
  };

  const tabs: { id: SettingsTab; label: string; icon: typeof User; description: string }[] = [
    { id: 'profile', label: 'Profile', icon: User, description: 'Credentials & profile details' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Escalations & alert channels' },
    { id: 'ai', label: 'AI Preferences', icon: Cpu, description: 'Confidence cutoffs & NLP modes' },
    { id: 'assignment', label: 'Ticket Assignment', icon: UserCheck, description: 'Workload & routing algorithms' },
    { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme palette & UI density' },
    { id: 'security', label: 'Security', icon: Shield, description: '2FA & session auth rules' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-in fade-in-50 duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#15133B]/5 text-[#15133B] text-[11px] font-semibold mb-1 border border-[#15133B]/10">
            <Sliders className="w-3 h-3 text-[#FF6B57]" />
            <span>Workstation Configuration</span>
          </div>
          <h1 className="text-2xl font-bold text-[#15133B] tracking-tight">Settings</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Configure system preferences, AI thresholds, and autonomous assignment rules.
          </p>
        </div>

        <button
          id="settings-save-btn"
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#FF6B57] hover:bg-[#ff553e] text-white shadow-sm shadow-[#FF6B57]/25 flex items-center gap-2 transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5 text-white" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-[#E8EAF0] shadow-xs overflow-hidden flex flex-col md:flex-row min-h-[580px]">
        {/* Dark Navy Settings Navigation Panel */}
        <div className="w-full md:w-64 bg-[#15133B] text-white p-4 shrink-0 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#15133B]">
          <div>
            <div className="px-3 py-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                Settings Navigation
              </span>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`settings-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left ${
                      isActive
                        ? 'bg-[#FF6B57] text-white shadow-sm shadow-[#FF6B57]/20 font-bold'
                        : 'text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.99]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-white/70'}`} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate">{tab.label}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-3 mt-6 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div className="flex items-center gap-2 text-white font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B57]" />
              <span>Model In Sync</span>
            </div>
            <p className="text-[10px] text-white/60 mt-1">
              Active inference checkpoints automatically adopt updated thresholds.
            </p>
          </div>
        </div>

        {/* Tab Content Panels (Clean White Content Card) */}
        <div className="flex-1 p-6 md:p-8 bg-[#FFFFFF] overflow-y-auto">
          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="border-b border-[#E8EAF0] pb-4">
                <h3 className="text-base font-bold text-[#15133B]">Profile Information</h3>
                <p className="text-xs text-[#667085] mt-0.5">Your personal credentials and display preferences</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#15133B] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  AM
                </div>
                <div>
                  <button className="px-3.5 py-1.5 rounded-xl border border-[#E8EAF0] text-xs font-semibold text-[#15133B] hover:bg-[#F7F8FC] transition-colors">
                    Upload New Avatar
                  </button>
                  <p className="text-[11px] text-[#667085] mt-1">PNG, JPG or SVG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17203A] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] focus:bg-white border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#17203A] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] focus:bg-white border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#17203A] mb-1.5">Job Title</label>
                  <input
                    type="text"
                    value={profileRole}
                    onChange={(e) => setProfileRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] focus:bg-white border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#17203A] mb-1.5">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                    <option value="America/New_York (EST)">America/New_York (EST)</option>
                    <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                    <option value="Europe/Berlin (CET)">Europe/Berlin (CET)</option>
                    <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="border-b border-[#E8EAF0] pb-4">
                <h3 className="text-base font-bold text-[#15133B]">Notification Preferences</h3>
                <p className="text-xs text-[#667085] mt-0.5">Control how SupportAI alerts your team on escalations</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC]/50 hover:bg-[#F7F8FC] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#15133B]/5 text-[#15133B] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17203A]">Email Escalation Alerts</div>
                      <div className="text-[11px] text-[#667085]">Receive immediate email when high-priority tickets arrive</div>
                    </div>
                  </div>
                  <Toggle id="toggle-email-alerts" checked={emailAlerts} onChange={setEmailAlerts} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC]/50 hover:bg-[#F7F8FC] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#15133B]/5 text-[#15133B] flex items-center justify-center shrink-0">
                      <Webhook className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17203A]">Slack Webhook Broadcast</div>
                      <div className="text-[11px] text-[#667085]">Broadcast triage events to #support-incident-feed</div>
                    </div>
                  </div>
                  <Toggle id="toggle-slack-alerts" checked={slackAlerts} onChange={setSlackAlerts} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC]/50 hover:bg-[#F7F8FC] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F04444]/10 text-[#F04444] flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17203A]">Urgent SMS for Critical Outages</div>
                      <div className="text-[11px] text-[#667085]">Send emergency SMS to on-call engineer for &lt;1h SLA tickets</div>
                    </div>
                  </div>
                  <Toggle id="toggle-sms-alerts" checked={smsUrgent} onChange={setSmsUrgent} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC]/50 hover:bg-[#F7F8FC] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#15133B]/5 text-[#15133B] flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#17203A]">Daily AI Intelligence Digest</div>
                      <div className="text-[11px] text-[#667085]">Morning summary of ticket trends, resolution rates, and SLA health</div>
                    </div>
                  </div>
                  <Toggle id="toggle-daily-digest" checked={dailyDigest} onChange={setDailyDigest} />
                </div>
              </div>
            </div>
          )}

          {/* AI PREFERENCES */}
          {activeTab === 'ai' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="border-b border-[#E8EAF0] pb-4">
                <h3 className="text-base font-bold text-[#15133B]">AI Preferences & Calibration</h3>
                <p className="text-xs text-[#667085] mt-0.5">Control machine learning confidence cutoffs and fallback protocols</p>
              </div>

              {/* Confidence Threshold Slider */}
              <div className="p-5 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC] space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-xs font-bold text-[#17203A] block">
                      Autonomous Classification Threshold
                    </label>
                    <p className="text-[11px] text-[#667085]">
                      Tickets with AI confidence below this score are diverted to the human review queue.
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-[#15133B] bg-white px-3 py-1 rounded-lg border border-[#E8EAF0] shadow-xs">
                    {confidenceThreshold}%
                  </span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={99}
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-[#FF6B57] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-[#667085] uppercase">
                  <span>Conservative (70%)</span>
                  <span className="text-[#FF6B57]">Recommended (85%)</span>
                  <span>Strict (99%)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17203A] mb-1.5">Model Inference Mode</label>
                  <select
                    value={modelTemperature}
                    onChange={(e) => setModelTemperature(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="Deterministic (0.1)">Deterministic (0.1) - Enterprise Standard</option>
                    <option value="Balanced (0.3)">Balanced (0.3) - Creative Classification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17203A] mb-1.5">Uncertainty Fallback Queue</label>
                  <select
                    value={fallbackQueue}
                    onChange={(e) => setFallbackQueue(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="Human Triage Queue">Human Triage Queue (Tier 1)</option>
                    <option value="Lead Designer Review">Lead Designer Review</option>
                    <option value="Senior Operations Desk">Senior Operations Desk</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC]/50 hover:bg-[#F7F8FC] transition-colors">
                  <div>
                    <div className="text-xs font-bold text-[#17203A]">Automatic Keyword & Entity Tagging</div>
                    <div className="text-[11px] text-[#667085]">Extract entities (e.g. invoice IDs, error codes, URLs) automatically</div>
                  </div>
                  <Toggle id="toggle-autotag" checked={autoTagging} onChange={setAutoTagging} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC]/50 hover:bg-[#F7F8FC] transition-colors">
                  <div>
                    <div className="text-xs font-bold text-[#17203A]">Real-time Sentiment Polarity Analysis</div>
                    <div className="text-[11px] text-[#667085]">Analyze emotional polarity and prioritize frustrated enterprise accounts</div>
                  </div>
                  <Toggle id="toggle-sentiment" checked={sentimentAnalysis} onChange={setSentimentAnalysis} />
                </div>
              </div>
            </div>
          )}

          {/* TICKET ASSIGNMENT */}
          {activeTab === 'assignment' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="border-b border-[#E8EAF0] pb-4">
                <h3 className="text-base font-bold text-[#15133B]">Ticket Assignment Rules</h3>
                <p className="text-xs text-[#667085] mt-0.5">Automate workload distribution and escalation thresholds</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#17203A] mb-1.5">Routing Algorithm</label>
                  <select
                    value={routingMode}
                    onChange={(e) => setRoutingMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="Skill-Based Affinity">Skill-Based Affinity (Recommended)</option>
                    <option value="Round Robin Balanced">Round Robin Balanced</option>
                    <option value="Least Workload First">Least Workload First</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17203A] mb-1.5">Max Concurrent Tickets / Agent</label>
                  <select
                    value={maxTicketsPerAgent}
                    onChange={(e) => setMaxTicketsPerAgent(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="10">10 Active Tickets</option>
                    <option value="15">15 Active Tickets</option>
                    <option value="20">20 Active Tickets</option>
                    <option value="Unlimited">Unlimited</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC]">
                <label className="block text-xs font-bold text-[#17203A] mb-1">
                  Automatic SLA Escalation
                </label>
                <p className="text-[11px] text-[#667085] mb-3">
                  Re-route tickets if unassigned or unanswered within the specified window:
                </p>
                <div className="flex gap-2.5">
                  {['1', '2', '4', '8'].map((hr) => (
                    <button
                      key={hr}
                      type="button"
                      onClick={() => setAutoEscalateAfterHours(hr)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        autoEscalateAfterHours === hr
                          ? 'bg-[#15133B] text-white border-[#15133B] shadow-xs'
                          : 'bg-white text-[#667085] border-[#E8EAF0] hover:bg-[#F7F8FC]'
                      }`}
                    >
                      {hr} Hours
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="border-b border-[#E8EAF0] pb-4">
                <h3 className="text-base font-bold text-[#15133B]">Appearance & Interface Density</h3>
                <p className="text-xs text-[#667085] mt-0.5">Customize display properties of the SupportAI workstation</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17203A] mb-2">Display Density</label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setDensity('comfortable')}
                    className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                      density === 'comfortable'
                        ? 'border-[#15133B] bg-[#15133B]/5 ring-1 ring-[#15133B]'
                        : 'border-[#E8EAF0] hover:bg-[#F7F8FC]'
                    }`}
                  >
                    <div className="text-[#17203A]">Comfortable</div>
                    <div className="text-[11px] font-normal text-[#667085] mt-0.5">Generous spacing, optimal for desktop review</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDensity('compact')}
                    className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                      density === 'compact'
                        ? 'border-[#15133B] bg-[#15133B]/5 ring-1 ring-[#15133B]'
                        : 'border-[#E8EAF0] hover:bg-[#F7F8FC]'
                    }`}
                  >
                    <div className="text-[#17203A]">Compact</div>
                    <div className="text-[11px] font-normal text-[#667085] mt-0.5">Higher information density for triage operators</div>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC] space-y-2">
                <span className="text-xs font-bold text-[#17203A] block">Theme Color Palette</span>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-4 h-4 rounded-full bg-[#15133B] ring-1 ring-black/10" />
                    <span className="font-mono text-[11px] text-[#17203A] font-semibold">#15133B (Navy)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-4 h-4 rounded-full bg-[#FF6B57]" />
                    <span className="font-mono text-[11px] text-[#17203A] font-semibold">#FF6B57 (Coral)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-4 h-4 rounded-full bg-[#18A779]" />
                    <span className="font-mono text-[11px] text-[#17203A] font-semibold">#18A779 (Success)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-4 h-4 rounded-full bg-[#F04444]" />
                    <span className="font-mono text-[11px] text-[#17203A] font-semibold">#F04444 (High/Critical)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="border-b border-[#E8EAF0] pb-4">
                <h3 className="text-base font-bold text-[#15133B]">Enterprise Security & Auth</h3>
                <p className="text-xs text-[#667085] mt-0.5">Manage session durations and multi-factor compliance</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E8EAF0] bg-[#F7F8FC]/50 hover:bg-[#F7F8FC] transition-colors">
                  <div>
                    <div className="text-xs font-bold text-[#17203A]">Enforce Two-Factor Authentication (2FA)</div>
                    <div className="text-[11px] text-[#667085]">Require hardware security key or TOTP token for all team members</div>
                  </div>
                  <Toggle id="toggle-2fa" checked={twoFactorAuth} onChange={setTwoFactorAuth} />
                </div>

                <div className="p-4 rounded-xl border border-[#E8EAF0] bg-white space-y-2">
                  <label className="block text-xs font-bold text-[#17203A]">Inactivity Session Timeout</label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full max-w-xs px-3.5 py-2.5 text-xs text-[#17203A] bg-[#F7F8FC] border border-[#E8EAF0] focus:border-[#15133B] rounded-xl outline-none cursor-pointer"
                  >
                    <option value="1 hour">1 hour</option>
                    <option value="4 hours">4 hours</option>
                    <option value="8 hours">8 hours (Standard Workday)</option>
                    <option value="24 hours">24 hours</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
