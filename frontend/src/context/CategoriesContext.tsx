import { createContext, useState } from "react";

type CategoryContext = { [key: string]: any };

export const CategoriesContext = createContext<CategoryContext>({});

export const CategoriesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchAllCategories = async () => {
        const response = await fetch('/api/games/categories');

        if (response.status === 500) {
            setError('Can not connect to server');
            return;
        };

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        };

        if (response.ok) {
            setAllCategories(json.map((el: { _id: string; }) => el._id).sort());
            setError(null);
        };
    };

    return (
        <CategoriesContext.Provider value={{ allCategories, fetchAllCategories, error }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesContextProvider;

