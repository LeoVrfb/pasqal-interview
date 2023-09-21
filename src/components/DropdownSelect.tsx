import React, { useEffect, useState } from 'react';
import './dropdownSelect.css';
import { Item } from '../api'


type SelectProps = {
    options: Item[]
    value?: Item
    onChange: (value: Item | undefined) => void
}

const MultiSelectDropdown = ({ value, onChange, options }: SelectProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [hasSelection, setHasSelection] = useState(false);

    function selectOption(option: Item) {
        onChange(option)
        setHasSelection(true);
    }

    function isOptionSelected(option: Item) {
        return option === value
    }

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(0)
        }
    }, [isOpen])

    return (
        <>

            <div onClick={() => setIsOpen(prev => !prev)} onBlur={() => setIsOpen(false)} tabIndex={0} className='container'>
                <span className={`values ${hasSelection ? '' : 'placeholder'}`}>
                    {hasSelection ? (
                        value?.label
                    ) : (
                        "Select your item..."
                    )}</span>

                <div className="divider"></div>
                <div className="caret"></div>
                <ul className={`optionsSelect ${isOpen ? "show" : ""}`}>
                    {options.map((option, index) => (
                        <li onClick={e => {
                            e.stopPropagation()
                            selectOption(option)
                            setIsOpen(false)
                        }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            key={option.label}
                            className={`optionSelect ${isOptionSelected(option) ? "selected" : ""} ${index === highlightedIndex ? "highlighted" : ""}`}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MultiSelectDropdown;
