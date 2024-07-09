"use client";
import React from 'react';

// @ts-ignore
export const Card = ({ children, className }) => (
  <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>
);

// @ts-ignore
export const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-200">{children}</div>
);

// @ts-ignore
export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

// @ts-ignore
export const CardDescription = ({ children }) => (
  <p className="text-gray-600">{children}</p>
);

// @ts-ignore
export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
