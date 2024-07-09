"use client";

import React from 'react';
import { Card, Typography } from "@material-tailwind/react";
import '../../../app/globals.css'

const TABLE_HEAD = ["Name", "Type", "Release Year", "Developer"];
const TABLE_ROWS = [
  {
    name: "JavaScript",
    type: "Programming Language",
    release_year: 1995,
    developer: "Brendan Eich"
  },
  {
    name: "Python",
    type: "Programming Language",
    release_year: 1991,
    developer: "Guido van Rossum"
  },
  {
    name: "React",
    type: "Library",
    release_year: 2013,
    developer: "Facebook"
  },
  {
    name: "AWS",
    type: "Cloud Service",
    release_year: 2006,
    developer: "Amazon"
  },
  {
    name: "Docker",
    type: "Containerization Platform",
    release_year: 2013,
    developer: "Docker Inc."
  }
];

interface Technology {
  name: string;
  type: string;
  release_year: number;
  developer: string;
}

export const ComparisonTable: React.FC = () => {
  return (
    //@ts-ignore
    <Card className="h-full w-full overflow-auto">
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className='bg-gray-900'>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-gray-700 p-2 sm:p-4 md:p-5 lg:px-14 text-white font-bold leading-none opacity-70 font-source-code-pro"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, type, release_year, developer }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-2 sm:p-4 md:p-5 lg:px-14" : "p-2 sm:p-4 md:p-5 lg:px-14 border-b border-gray-700";

            return (
              <tr key={name} className="bg-gray-800">
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal font-source-code-pro"
                    placeholder=""
                    onPointerEnterCapture={()=>{}}
                    onPointerLeaveCapture={()=>{}}
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal font-source-code-pro"
                    placeholder=""
                    onPointerEnterCapture={()=>{}}
                    onPointerLeaveCapture={()=>{}}
                  >
                    {type}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal font-source-code-pro"
                    placeholder=""
                    onPointerEnterCapture={()=>{}}
                    onPointerLeaveCapture={()=>{}}
                  >
                    {release_year}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal font-source-code-pro"
                    placeholder=""
                    onPointerEnterCapture={()=>{}}
                    onPointerLeaveCapture={()=>{}}
                  >
                    {developer}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </Card>
  );
};

export default ComparisonTable;
