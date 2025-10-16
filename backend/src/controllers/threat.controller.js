// Add this new function to the file
export async function getThreatStats(req, res) {
  try {
    // For now, let's return some mock data so the chart renders
    const mockData = [
      { date: "Aug 20", count: 12 },
      { date: "Aug 21", count: 25 },
      { date: "Aug 22", count: 18 },
      { date: "Aug 23", count: 34 },
      { date: "Aug 24", count: 28 },
      { date: "Aug 25", count: 42 },
    ];
    res.json(mockData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch threat stats" });
  }
}