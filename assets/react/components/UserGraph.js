import React, { useEffect, useRef } from "../lib/react.js";
import html from "../lib/html.js";
import { loadChartModule } from "../lib/loadChart.js";

export default function UserGraph({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let chartInstance;
    loadChartModule().then(({ default: Chart }) => {
      if (!canvasRef.current) return;
      chartInstance = new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels: data?.labels || ["Q1", "Q2", "Q3", "Q4"],
          datasets: [
            {
              label: "Active users",
              data: data?.values || [120, 180, 320, 410],
              backgroundColor: "rgba(202, 168, 81, 0.5)",
              borderRadius: 12,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    });
    return () => chartInstance?.destroy();
  }, [data]);

  return html`
    <div className="chart-card">
      <h3>User growth</h3>
      <canvas ref=${canvasRef} height="220"></canvas>
    </div>
  `;
}

