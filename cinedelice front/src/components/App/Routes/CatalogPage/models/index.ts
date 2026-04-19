export interface Recipe {
    id: number;
    name: string;
    picture: string;
    movie_id: number | null;
    type: string;
}

export interface Movie {
    id: number;
    name: string;
    picture: string;
    type: string;
}

export interface AddRecipeModalProps {
    onAddRecipe: (newRecipe: any) => void;
}

export type Recipes = Recipe[];
export type Movies = Movie[];
