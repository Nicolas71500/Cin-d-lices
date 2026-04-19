interface TabNavigationProps {
    switchTab: boolean;
    toggleTab: () => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
    switchTab,
    toggleTab,
}) => (
    <div className="flex m-4 flex-col">
        <button
            onClick={toggleTab}
            className={`px-4 py-2 rounded ${switchTab ? 'bg-transparent text-skin' : 'bg-dark-red text-skin'}`}
        >
            Mes Recettes
        </button>
        <button
            onClick={toggleTab}
            className={`px-4 py-2 rounded ${switchTab ? 'bg-dark-red text-skin' : 'bg-transparent text-skin'}`}
        >
            Mes Informations personnelles
        </button>
    </div>
);

export default TabNavigation;
