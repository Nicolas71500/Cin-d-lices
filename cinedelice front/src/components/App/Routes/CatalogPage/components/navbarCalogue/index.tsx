import { DifficultyFilter } from '../difficultyFIlter';
import { DishTypeFilter } from '../dishtypeFIlter';
import AddRecipeModal from '../modal';

interface NavBarCalogueProps {
    onDifficultyFilterChange: (difficulty: string) => void;
    onDishTypeFilterChange: (dishType: number) => void;
    onAddRecipe: (newRecipe: any) => void;
}

export const NavBarCalogue = (props: NavBarCalogueProps) => {
    const { onDifficultyFilterChange, onDishTypeFilterChange, onAddRecipe } =
        props;

    return (
        <>
            <div className="flex flex-wrap justify-center space-y-4 md:flex-col md:items-center mb-6">
                {/* Filters by difficulty */}
                <DifficultyFilter onFilterChange={onDifficultyFilterChange} />
                {/* Modal to add a recipe */}

                <AddRecipeModal onAddRecipe={onAddRecipe} />

                {/* Filters by dish type */}
                <DishTypeFilter onFilterChange={onDishTypeFilterChange} />
            </div>
        </>
    );
};
