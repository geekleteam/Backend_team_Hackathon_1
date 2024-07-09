// src/components/Tag.js
import React from 'react';

const Tag = ({ attribute, selected, onClick }) => {
    return (
        <span
            onClick={() => onClick(attribute)}
            className={`cursor-pointer inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 ${
                selected ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-300'
            }`}
        >
            {attribute.replace(/_/g, ' ')}
        </span>
    );
};

export default Tag;
