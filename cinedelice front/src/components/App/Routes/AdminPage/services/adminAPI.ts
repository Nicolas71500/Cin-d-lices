import axios from 'axios';
import { API_URL } from '../../../../../config';

const api = axios.create({ baseURL: API_URL, withCredentials: true });

export interface IAdminUser {
    id: number;
    first_name: string | null;
    last_name: string | null;
    username: string;
    email_address: string;
    role_id: number;
    Role?: { id: number; name: string };
}

export interface IAdminRecipe {
    id: number;
    name: string;
    picture: string;
    difficulty: string;
    anecdote: string | null;
    total_duration: number;
    dish_types_id: number;
    movie_id: number;
    User: { username: string };
    Movie: { id: number; name: string };
    DishType: { id: number; name: string };
}

export interface IAdminMovie {
    id: number;
    name: string;
    picture: string;
    category_id: number;
    Category: { id: number; name: string };
}

export interface IRole {
    id: number;
    name: string;
}

export interface IDishType {
    id: number;
    name: string;
}

export interface ICategory {
    id: number;
    name: string;
}

export interface IAdminData {
    users: IAdminUser[];
    recipes: IAdminRecipe[];
    movies: IAdminMovie[];
    roles: IRole[];
    dishTypes: IDishType[];
    categories: ICategory[];
}

export interface IPreparationItem {
    description: string;
    step_position: number;
}

export interface IIngredientItem {
    id?: number;
    name: string;
    quantity: string | null;
    recipe_id?: number;
}

export interface IRecipeFull {
    id: number;
    name: string;
    difficulty: string;
    anecdote: string | null;
    total_duration: number;
    Preparations: IPreparationItem[];
    Ingredient: IIngredientItem[];
}

export async function fetchAdminData(): Promise<IAdminData> {
    const res = await api.get('/admin/data');
    return res.data;
}

export async function fetchRecipeFull(id: number): Promise<IRecipeFull> {
    const res = await api.get(`/recipes/${id}`);
    return res.data;
}

export async function deleteUserAdmin(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
}

export async function updateUserRoleAdmin(id: number, role_id: number): Promise<IAdminUser> {
    const res = await api.patch(`/users/${id}/role`, { role_id });
    return res.data;
}

export async function deleteRecipeAdmin(id: number): Promise<void> {
    await api.delete(`/recipes/${id}`);
}

export interface IRecipeUpdatePayload {
    name: string;
    difficulty: string;
    anecdote: string;
    total_duration: number;
    dish_types_id: number;
    movie_id: number;
    preparations?: { description: string }[];
    ingredients?: { name: string; quantity: string }[];
}

export async function updateRecipeAdmin(id: number, payload: IRecipeUpdatePayload): Promise<IAdminRecipe> {
    const res = await api.put(`/recipes/${id}`, payload);
    return res.data;
}

export async function deleteMovieAdmin(id: number): Promise<void> {
    await api.delete(`/movies/${id}`);
}

export interface IMovieUpdatePayload {
    name: string;
    category_id: number;
}

export async function updateMovieAdmin(id: number, payload: IMovieUpdatePayload): Promise<IAdminMovie> {
    const res = await api.put(`/movies/${id}`, payload);
    return res.data;
}

export async function addIngredientToDB(name: string, quantity: string): Promise<void> {
    await api.post('/ingredient', { name, quantity: quantity || null });
}
