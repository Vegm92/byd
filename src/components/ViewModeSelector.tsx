import { Badge } from "@/components/ui/badge";
import { useViewMode, ViewMode } from "@/contexts/ViewModeContext";

const ViewModeSelector = () => {
  const { viewMode, setViewMode } = useViewMode();

  const modes: { key: ViewMode; label: string; description: string }[] = [
    { key: 'all', label: 'All Vehicles', description: 'Complete fleet' },
    { key: 'small', label: 'Small SUVs', description: 'ATTO 2 + compact competitors' },
    { key: 'big', label: 'Large SUVs', description: 'Full-size SUVs' }
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-medium text-[var(--byd-gray)] uppercase tracking-wide">
        View Options
      </div>
      <div className="flex gap-1">
        {modes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => setViewMode(mode.key)}
            className={`px-3 py-1 text-xs font-medium rounded-md border transition-all duration-200 ${
              viewMode === mode.key
                ? 'border-[var(--byd-red)] bg-[var(--byd-red)] text-white'
                : 'border-gray-300 bg-white text-[var(--byd-gray)] hover:border-[var(--byd-red)] hover:text-[var(--byd-red)]'
            }`}
            title={mode.description}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewModeSelector;