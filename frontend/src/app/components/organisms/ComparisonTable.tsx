"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from "@material-tailwind/react";
import '../../../app/globals.css';
import LoadingSpinner from './../LoadingSpinner';
import Tag from './../Tag';
import { useGlobalState } from "@/context/GlobalStateProvider";

const techCategories = require('../../../data/tech_list.json');

const ComparisonTable = () => {
    const { parameters } = useGlobalState();
    const [currentPath, setCurrentPath] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(techCategories);
    const [selectedTechs, setSelectedTechs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [visibleColumns, setVisibleColumns] = useState([]);

    useEffect(() => {
        if (apiData && apiData.length > 0) {
            const allAttributes = Object.keys(apiData[0][Object.keys(apiData[0])[0]].attributes);
            setVisibleColumns(allAttributes.slice(0, 5)); // Initialize with the first 5 attributes
        }
    }, [apiData]);

    const navigate = (key, isFinal = false) => {
        if (isFinal) {
            toggleSelection(key);
        } else {
            const nextCategory = currentCategory[key];
            setCurrentPath([...currentPath, key]);
            setCurrentCategory(nextCategory);
        }
    };

    const navigateBack = () => {
        const newPath = currentPath.slice(0, -1);
        const newCategory = newPath.reduce((acc, key) => acc[key], techCategories);
        setCurrentPath(newPath);
        setCurrentCategory(newCategory || techCategories);
    };

    const toggleSelection = (tech) => {
        setSelectedTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
    };

    const toggleColumnVisibility = (column) => {
        setVisibleColumns(prev => prev.includes(column) ? prev.filter(c => c !== column) : [...prev, column]);
    };

    const submitSelection = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/compare-assistant', {
                technologies: selectedTechs,
                relevant_parameters: [],
                output_format: "Detailed Comparison"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setApiData(response.data.comparisons); // Store the "comparisons" part of the response
        } catch (error) {
            console.error('Error submitting technology selections:', error);
        } finally {
            setLoading(false);
        }
    };

    const replaceUnderscores = (text) => {
        return typeof text === 'string' ? text.replace(/_/g, ' ') : text;
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-white text-gray-800">
            <Card className="w-full max-w-6xl p-4 mb-4">
                {currentPath.length > 0 && (
                    <button onClick={navigateBack} className="mb-4 bg-blue-500 text-white p-2 rounded">Back</button>
                )}
                <div className="grid grid-cols-3 gap-4">
                    {Array.isArray(currentCategory) ?
                        currentCategory.map((item) => (
                            <Tag key={item} attribute={replaceUnderscores(item)} selected={selectedTechs.includes(item)} onClick={() => navigate(item, true)} />
                        )) :
                        Object.keys(currentCategory).map(key => (
                            <button key={key} onClick={() => navigate(key)} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                                {replaceUnderscores(key)}
                            </button>
                        ))
                    }
                </div>
            </Card>
            {selectedTechs.length > 0 && (
                <Card className="w-full max-w-6xl p-4">
                    <div>
                        <h3>Selected Technologies:</h3>
                        {selectedTechs.map(tech => <Tag key={tech} attribute={replaceUnderscores(tech)} selected={true} onClick={() => toggleSelection(tech)} />)}
                    </div>
                    <button onClick={submitSelection} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </Card>
            )}
            {loading ? (
                <LoadingSpinner />
            ) : (
                apiData && (
                    <>
                        <Card className="w-full max-w-6xl p-4 mt-4">
                            <h2 className="text-lg font-bold mb-2">Comparison Results:</h2>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-4 py-2 text-left">Technology</th>
                                            {visibleColumns.map((header) => (
                                                <th key={header} className="px-4 py-2 text-left">{replaceUnderscores(header)}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {apiData.map((tech, idx) => (
                                            <tr key={idx} className="bg-white border-b">
                                                <td className="px-4 py-2">{replaceUnderscores(tech[Object.keys(tech)[0]].name)}</td>
                                                {visibleColumns.map((column, columnIdx) => (
                                                    <td key={columnIdx} className="px-4 py-2">{replaceUnderscores(tech[Object.keys(tech)[0]].attributes[column])}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                        <Card className="w-full max-w-6xl p-4">
                            <h3>Toggle Columns:</h3>
                            <div className="flex flex-wrap">
                                {Object.keys(apiData[0][Object.keys(apiData[0])[0]].attributes).map((attribute) => (
                                    <button
                                        key={attribute}
                                        onClick={() => toggleColumnVisibility(attribute)}
                                        className={`m-2 text-white font-bold py-2 px-4 rounded ${visibleColumns.includes(attribute) ? 'bg-green-500' : 'bg-gray-500'}`}
                                    >
                                        {replaceUnderscores(attribute)}
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </>
                )
            )}
        </div>
    );
};

export default ComparisonTable;
