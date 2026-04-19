export const recipeReducer = (state, action) => {
    switch (action.actionType) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'UPDATE_INGREDIENT':
            return {
                ...state,
                Ingredient: state.Ingredient.map((key, index) =>
                    index === action.index
                        ? { ...key, [action.field]: action.value }
                        : key,
                ),
            };
        case 'ADD_INGREDIENT':
            return {
                ...state,
            };
        case 'DELETE_INGREDIENT':
            return { ...state };
        case 'UPDATE_PREPARATION':
            return {
                ...state,
                Preparations: state.Preparations.map((key, index) =>
                    index === action.index
                        ? { ...key, [action.field]: action.value }
                        : key,
                ),
            };
        case 'ADD_PREPARATION':
            return {
                ...state,
            };
        case 'DELETE_PREPARATION':
            return { ...state };
        case 'UPDATE_MOVIE':
            console.log('update movie:', action.field, action.value);

            return {
                ...state,
                Movie: {
                    ...state.Movie,
                    [action.field]: action.value,
                },
            };
        default:
            return state;
    }
};
