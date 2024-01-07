import { useState } from "react";
import Categories from "../components/Categories/Categories";
import Games from "../components/Games/Games";
import CategoriesContextProvider from "../context/CategoriesContext";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("none");
    const pullCategory = (prop: string) => {
        setSelectedCategory(prop);
    };

    return (
        <CategoriesContextProvider>
            <Categories pullCategory={pullCategory} />
            <Games selectedCategory={selectedCategory} />
        </CategoriesContextProvider>
    );
};

export default Home;