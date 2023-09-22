import React, { useEffect, useState } from 'react';
import './dropdownSelect.css';
import { Item } from '../api'
import CrossIcon from "../icons/cross.svg";

type MultipleSelectProps = {
    multiple: true
    value: Item[]
    onChange: (value: Item[]) => void
}

type SingleSelectProps = {
    multiple: false
    value?: Item
    onChange: (value: Item | undefined) => void
}

type SelectProps = {
    options: Item[]
} & (SingleSelectProps | MultipleSelectProps)

const MultiSelectDropdown = ({ multiple, value, onChange, options }: SelectProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [hasSelection, setHasSelection] = useState(false);

    // function clearOptions() {
    //     multiple ? onChange([]) : onChange(undefined)
    // }

    function selectOption(option: Item) {

        if (multiple === true) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option])
            }
        } else {
            if (option !== value) onChange(option)
        }
        setHasSelection(true)
    }

    function isOptionSelected(option: Item) {
        return multiple ? value.includes(option) : option === value
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
                        multiple === true ? value.map((v, index) => (
                            <button
                                key={index}

                                className="option-badge"
                            >
                                {v.label}

                                <span className="remove-btn" onClick={e => {
                                    e.stopPropagation()
                                    selectOption(v)
                                }}>&times;</span>
                            </button>
                        )) : value?.label)
                        : (
                            "Select your item..."
                        )}
                </span>
                {/* <button onClick={e => {
                    e.stopPropagation()
                    clearOptions()
                }} className='clear-btn'>&times;</button> */}

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
