export default function StatCard({ icon: Icon, label, value, accent = "from-bright to-lavender" }) {
  return (
    <div className="rounded-2xl bg-royal/6 border border-bright/15 p-5 flex items-center gap-4 hover:border-bright/40 transition-colors">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center shrink-0`}>
        <Icon size={22} className="text-navy" />
      </div>
      <div>
        <p className="text-2xl font-display font-semibold text-navy">{value}</p>
        <p className="text-xs text-navy/60">{label}</p>
      </div>
    </div>
  );
}
