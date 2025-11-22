import React, { useEffect, useRef } from "../lib/react.js";
import html from "../lib/html.js";
import { loadChartModule } from "../lib/loadChart.js";

export default function VisitGraph({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let chartInstance;
    loadChartModule().then(({ default: Chart }) => {
      if (!canvasRef.current) return;
      chartInstance = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: data?.labels || ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              label: "Visits",
              data: data?.values || [32, 40, 35, 60, 54],
              borderColor: "#caa851",
              backgroundColor: "rgba(202, 168, 81, 0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    });

    return () => chartInstance?.destroy();
  }, [data]);

  return html`
    <div className="chart-card">
      <h3>Daily visits</h3>
      <canvas ref=${canvasRef} height="220"></canvas>
    </div>
  `;
}

