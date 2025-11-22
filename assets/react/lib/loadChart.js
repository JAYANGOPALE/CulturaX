let chartPromise;

export async function loadChartModule() {
  if (!chartPromise) {
    chartPromise = import("https://esm.sh/chart.js@4.4.1/auto");
  }
  return chartPromise;
}

