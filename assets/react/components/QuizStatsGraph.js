import React, { useEffect, useRef } from "../lib/react.js";
import html from "../lib/html.js";
import { loadChartModule } from "../lib/loadChart.js";

export default function QuizStatsGraph({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let chartInstance;
    loadChartModule().then(({ default: Chart }) => {
      if (!canvasRef.current) return;
      chartInstance = new Chart(canvasRef.current, {
        type: "doughnut",
        data: {
          labels: ["Completed", "In progress", "Abandoned"],
          datasets: [
            {
              data: data?.values || [62, 24, 14],
              backgroundColor: [
                "rgba(202, 168, 81, 0.85)",
                "rgba(9, 10, 15, 0.2)",
                "rgba(9, 10, 15, 0.1)",
              ],
            },
          ],
        },
        options: {
          plugins: { legend: { position: "bottom" } },
        },
      });
    });
    return () => chartInstance?.destroy();
  }, [data]);

  return html`
    <div className="chart-card">
      <h3>Quiz completion</h3>
      <canvas ref=${canvasRef} height="220"></canvas>
    </div>
  `;
}

