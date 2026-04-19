interface DifficultyFilterProps {
    onFilterChange: (difficulty: string) => void;
}

export const DifficultyFilter = ({ onFilterChange }: DifficultyFilterProps) => {
    return (
        <div className="flex space-x-4">
            <button
                onClick={() => onFilterChange('Facile')}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#2b2b2b] w-full md:w-32"
            >
                Facile
            </button>
            <button
                onClick={() => onFilterChange('Moyen')}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#2b2b2b] w-full md:w-32"
            >
                Moyen
            </button>
            <button
                onClick={() => onFilterChange('Difficile')}
                className="text-sm font-medium text-[#0d0d0d] bg-[#d9c7b8] border border-gray-300 rounded-lg px-4 py-2 hover:bg-[#2b2b2b] w-full md:w-32"
            >
                Difficile
            </button>
        </div>
    );
};
