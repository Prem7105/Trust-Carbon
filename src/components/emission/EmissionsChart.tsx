import React from 'react';
import { ChartData } from '../../types';

interface EmissionsChartProps {
  chartData: ChartData[];
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({ chartData }) => {
  const maxValue = chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Live Emissions Data
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Monitoring</span>
        </div>
      </div>

      <div className="relative h-80 bg-gray-50 rounded-lg p-4">
        {chartData.length > 0 && (
          <svg className="w-full h-full" viewBox="0 0 800 300">
            <defs>
              <linearGradient
                id="chartGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {[300, 325, 350, 375, 400, 425, 450].map((value, index) => (
              <g key={value}>
                <line
                  x1="40"
                  y1={280 - index * 40}
                  x2="760"
                  y2={280 - index * 40}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                <text
                  x="35"
                  y={285 - index * 40}
                  textAnchor="end"
                  className="text-xs fill-gray-500"
                >
                  {value}
                </text>
              </g>
            ))}

            {chartData.length > 1 && (
              <>
                <path
                  d={`M 40 ${
                    280 - ((chartData[0].value - 300) / 150) * 240
                  } ${chartData
                    .map(
                      (point, index) =>
                        `L ${40 + index * (720 / (chartData.length - 1))} ${
                          280 - ((point.value - 300) / 150) * 240
                        }`
                    )
                    .join(" ")} L ${
                    40 +
                    (chartData.length - 1) * (720 / (chartData.length - 1))
                  } 280 L 40 280 Z`}
                  fill="url(#chartGradient)"
                />

                <path
                  d={`M 40 ${
                    280 - ((chartData[0].value - 300) / 150) * 240
                  } ${chartData
                    .map(
                      (point, index) =>
                        `L ${40 + index * (720 / (chartData.length - 1))} ${
                          280 - ((point.value - 300) / 150) * 240
                        }`
                    )
                    .join(" ")}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                />

                {chartData.map((point, index) => (
                  <circle
                    key={index}
                    cx={40 + index * (720 / (chartData.length - 1))}
                    cy={280 - ((point.value - 300) / 150) * 240}
                    r="3"
                    fill="#ef4444"
                  />
                ))}
              </>
            )}

            {chartData
              .filter((_, index) => index % 4 === 0)
              .map((point, index) => (
                <text
                  key={index}
                  x={40 + index * 4 * (720 / (chartData.length - 1))}
                  y="295"
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {point.time}
                </text>
              ))}

            <text
              x="15"
              y="150"
              textAnchor="middle"
              transform="rotate(-90 15 150)"
              className="text-sm fill-gray-700 font-medium"
            >
              CO₂ Levels (ppm)
            </text>
          </svg>
        )}
      </div>

      <div className="flex items-center justify-center mt-4 space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">CO₂ Emissions</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Current:{" "}
            {chartData.length > 0
              ? chartData[chartData.length - 1].value
              : "--"}{" "}
            ppm
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Peak: {chartData.length > 0 ? maxValue : "--"} ppm
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmissionsChart;