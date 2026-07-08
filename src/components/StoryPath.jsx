export default function StoryPath({ scenes, activeId, onSelect, compact = false }) {
  return (
    <div className={`relative ${compact ? "py-4" : "py-8"}`}>
      <div className="flex items-center gap-0 overflow-x-auto no-scrollbar px-2">
        {scenes.map((scene, i) => {
          const isActive = scene.id === activeId;
          const isPast = activeId ? scene.id < activeId : false;
          return (
            <div key={scene.id} className="flex items-center shrink-0">
              <button
                onClick={() => onSelect && onSelect(scene.id)}
                className="group flex flex-col items-center gap-2 px-3"
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={`relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 ${
                    compact ? "w-10 h-10 text-lg" : "w-16 h-16 text-2xl"
                  } ${
                    isActive
                      ? "bg-gradient-to-br from-gold to-terracotta shadow-glow scale-110"
                      : isPast
                      ? "bg-royal/12"
                      : "bg-royal/8 group-hover:bg-royal/12"
                  } border-2 ${isActive ? "border-gold" : "border-bright/30"}`}
                >
                  {scene.image ? (
                    <img src={scene.image} alt={scene.nameFr} className="w-full h-full object-cover" />
                  ) : (
                    scene.emoji
                  )}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold animate-twinkle" />
                  )}
                </span>
                {!compact && (
                  <span
                    className={`text-[11px] font-body text-center max-w-[80px] leading-tight ${
                      isActive ? "text-terracotta font-semibold" : "text-navy/60"
                    }`}
                  >
                    {scene.nameFr}
                  </span>
                )}
              </button>
              {i < scenes.length - 1 && (
                <span
                  className={`h-[3px] ${compact ? "w-6" : "w-10"} rounded-full ${
                    isPast ? "bg-gradient-to-r from-bright to-lavender" : "bg-bright/6"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
