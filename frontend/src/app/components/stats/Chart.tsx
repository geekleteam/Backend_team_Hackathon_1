"use client";
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card/card";
import LineChart from '@/app/components/stats/LineChart'

const Chart: React.FC = () => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>A line chart visualizing some data.</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart />
      </CardContent>
    </Card>
  );
}

export default Chart;

