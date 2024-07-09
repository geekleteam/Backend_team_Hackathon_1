"use client";

import React, { useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

const LineChart = () => {
    const commonXValues = ["React", "Angular", "Vue", "Svelte", "Next.js", "Gatsby", "React Native", "Flutter", "Swift", "Kotlin", "Xamarin", "Ionic"];

    const initialData = [
        {
            id: "Web",
            color: '#2563eb',
            data: commonXValues.map((x, index) => ({
                x,
                y: [120, 210, 300, 350, 200, 380, 0, 0, 0, 0, 0, 0][index] || 0,
            })),
        },
        {
            id: "Mobile",
            color: '#e11d48',
            data: commonXValues.map((x, index) => ({
                x,
                y: [0, 0, 0, 0, 0, 0, 80, 140, 220, 300, 250, 330][index] || 0,
            })),
        },
        {
            id: "JavaScript",
            color: '#22c55e',
            data: commonXValues.map((x, index) => ({
                x,
                y: [100, 200, 250, 320, 270, 400, 0, 0, 0, 0, 0, 0][index] || 0,
            })),
        },
        {
            id: "Python",
            color: '#fbbf24',
            data: commonXValues.map((x, index) => ({
                x,
                y: [90, 150, 200, 280, 230, 300, 0, 0, 0, 0, 0, 0][index] || 0,
            })),
        },
        {
            id: "Database",
            color: '#6366f1',
            data: commonXValues.map((x, index) => ({
                x,
                y: [70, 130, 170, 210, 190, 220, 0, 0, 0, 0, 0, 0][index] || 0,
            })),
        },
        {
            id: "Tools",
            color: '#ef4444',
            data: commonXValues.map((x, index) => ({
                x,
                y: [50, 100, 150, 200, 180, 250, 0, 0, 0, 0, 0, 0][index] || 0,
            })),
        },
    ];

    const [visibleLines, setVisibleLines] = useState({
        Web: true,
        Mobile: true,
        JavaScript: true,
        Python: true,
        Database: true,
        Tools: true,
    });

    const handleLegendClick = (id) => {
        setVisibleLines((prevVisibleLines) => ({
            ...prevVisibleLines,
            [id]: !prevVisibleLines[id],
        }));
    };

    const filteredData = initialData.filter(line => visibleLines[line.id]);

    return (
        <div className="w-[600px] h-[500px] flex flex-col items-center">
            <div className="mb-4">
                {initialData.map((line) => (
                    <button 
                        key={line.id}
                        className={`mr-2 p-2 rounded text-white`}
                        style={{ backgroundColor: visibleLines[line.id] ? line.color : '#d1d5db' }}  // Tailwind gray-300
                        onClick={() => handleLegendClick(line.id)}
                    >
                         {line.id}
                    </button>
                ))}
            </div>
            <div className="w-[600px] h-[400px]">
                <ResponsiveLine
                    data={filteredData}
                    margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 16,
                        legend: 'Technology/Tool',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 16,
                        legend: 'Speed (ms)',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }}
                    colors={initialData.map(line => line.color)}
                    pointSize={6}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    gridYValues={6}
                    theme={{
                        tooltip: {
                            container: {
                                background: '#333',
                                color: '#ddd',
                                fontSize: '12px',
                                borderRadius: '4px',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                                padding: '5px 9px',
                            },
                        },
                        grid: {
                            line: {
                                stroke: '#e0e0e0',
                                strokeWidth: 1,
                            },
                        },
                    }}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            onClick: handleLegendClick,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    role="application"
                    ariaLabel="Nivo line chart demo"
                    curve="natural"
                />
            </div>
        </div>
    );
};

export default LineChart;
