import React from 'react';
import { FiPlus, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const SectionHeader = ({
    title,
    icon,
    onAdd,
    isCollapsed = false,
    onToggleCollapse,
    showAddButton = true,
    addButtonText = 'Add'
}) => {
    return (
        <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-200">
            <div className="flex items-center gap-3">
                {onToggleCollapse && (
                    <button
                        onClick={onToggleCollapse}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                        {isCollapsed ? <FiChevronDown size={20} /> : <FiChevronUp size={20} />}
                    </button>
                )}
                {icon && <span className="text-2xl">{icon}</span>}
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>

            {showAddButton && onAdd && (
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                    <FiPlus size={16} />
                    {addButtonText}
                </button>
            )}
        </div>
    );
};

export default SectionHeader;
