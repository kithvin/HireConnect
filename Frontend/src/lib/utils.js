export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
    case "medium":
      return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
    case "hard":
      return "bg-rose-500/15 text-rose-400 border border-rose-500/30";
    default:
      return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
  }
};
