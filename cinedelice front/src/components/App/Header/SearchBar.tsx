import { useState, useEffect } from 'react';
import './header.scss';
import { API_URL } from '../../../config';
import { Recipe, Movie } from '../Routes/CatalogPage/models';
import { useNavigate } from 'react-router-dom';
import Autosuggest, { SuggestionSelectedEventData } from 'react-autosuggest';

// function fetch recipes

const fetchRecipes = async () => {
    try {
        const response = await fetch(
            `${API_URL}/recipes`,
        );
        const data = await response.json();
        return data.map((item: { id: string; name: string }) => ({
            id: item.id,
            name: item.name,
            type: 'recipe',
        }));
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};

const fetchMovies = async () => {
    try {
        const response = await fetch(`${API_URL}/movies`);
        const data = await response.json();
        return data.map((item: { id: string; name: string }) => ({
            id: item.id,
            name: item.name,
            type: 'movie',
        }));
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};
// component SearchBar
const SearchBar: React.FC = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<Recipe | Movie[]>([]);
    const [allItems, setAllItems] = useState<Recipe | Movie[]>([]);

    // navigate to another page
    const navigate = useNavigate();

    // get all recipes
    useEffect(() => {
        const fetchData = async () => {
            const recipes = await fetchRecipes();
            const movies = await fetchMovies();
            setAllItems([...recipes, ...movies]);
        };

        fetchData();
    }, []);
    // Gestion de la récupération des suggestions basées sur la valeur entrée
    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        const filteredSuggestions = allItems.filter((item) =>
            item.name.toLowerCase().startsWith(value.toLowerCase()),
        );
        setSuggestions(filteredSuggestions);
    };

    // Gestion de la sélection d'une suggestion
    const onSuggestionSelected = (
        _: React.FormEvent<HTMLInputElement>,
        data: SuggestionSelectedEventData<Recipe | Movie>,
    ) => {
        setValue(data.suggestion.name);
        if (data.suggestion.type === 'recipe') {
            navigate(`/recette/${data.suggestion.id}`);
        } else if (data.suggestion.type === 'movie') {
            navigate(`/recette/${data.suggestion.id}`);
        }
    };

    // Gestion de l'event pour aller sur la page de la recette
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const selectedItem = allItems.find(
                (item) => item.name.toLowerCase() === value.toLowerCase(),
            );
            if (selectedItem) {
                if (selectedItem.type === 'recipe') {
                    navigate(`/recette/${selectedItem.id}`);
                } else if (selectedItem.type === 'movie') {
                    navigate(`/recette/${selectedItem.id}`);
                }
            }
        }
    };
    // Propriétés pour l'input de la barre de recherche
    const inputProps: Autosuggest.InputProps<Recipe | Movie> = {
        placeholder: 'Poulet',
        value,
        onChange: (
            _: React.FormEvent<HTMLElement>,
            { newValue }: Autosuggest.ChangeEvent,
        ) => {
            setValue(newValue);
        },
        onKeyDown: handleKeyDown,
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => (
                <div className="md:cursor-pointer hover:bg-skin transition-all duration-200">
                    {suggestion.name} (
                    {suggestion.type === 'recipe' ? 'Recette' : 'Film'})
                </div>
            )}
            inputProps={inputProps}
        />
    );
};
export default SearchBar;
