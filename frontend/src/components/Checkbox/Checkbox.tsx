import { useState } from "react";

const Checkbox = (props: { categoryInput: string, checked: boolean, handleChange: (category: string, isChecked: boolean) => void }) => {
    const { checked, categoryInput, handleChange } = props;

    const [isChecked, setIsChecked] = useState<boolean>(checked);

    // adds/removes category on click, changes the state of the checkbox 
    const handleCheck = () => {
        handleChange(categoryInput, !isChecked);
        setIsChecked(!isChecked);
    };

    return (
        <>
            <input type="checkbox" defaultChecked={isChecked} value={categoryInput} className="checkbox" id={categoryInput} onChange={handleCheck} />
            <label htmlFor={categoryInput}>{categoryInput}</label>
        </>
    );
};

export default Checkbox;