export const normalizeType = (event: any) => {
  const text = (event.detail || event.type || "").toLowerCase()

  if (text.includes("goal")) return "goal"
  if (text.includes("yellow")) return "yellow"
  if (text.includes("red")) return "red"
  if (text.includes("sub")) return "sub"
  if (text.includes("penalty")) return "penalty"
  if (text.includes("var")) return "var"

  return "other"
}

export const eventConfig: any = {
  goal: { icon: "⚽", label: "Goal" },
  yellow: { icon: "🟨", label: "Yellow Card" },
  red: { icon: "🟥", label: "Red Card" },
  sub: { icon: "🔄", label: "Substitution" },
  penalty: { icon: "🎯", label: "Penalty" },
  var: { icon: "📺", label: "VAR" },
  other: { icon: "⚪", label: "Event" }
}