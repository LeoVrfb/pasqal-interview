import React, { useEffect, useState } from 'react';
import './dropdownSelect.css';
import { Item, getData } from '../api'
import SearchIcon from '../icons/search.svg'
import CrossIcon from '../icons/cross.svg'

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
    const [searchInput, setSearchInput] = useState('');
    const [filtered, setFiltered] = useState<Item[]>([]);



    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            // Appelle la fonction getData avec la valeur de searchInput.
            const filteredData = await getData(searchInput);

            // Met à jour filteredOptions uniquement si le composant est toujours monté.
            if (isMounted) {
                setFiltered(filteredData);
            }
        };
        // Appelle fetchData lorsque searchInput change.
        fetchData();
        // Nettoie la variable isMounted lorsque le composant est démonté.
        return () => {
            isMounted = false;
        };
    }, [searchInput]);

    // J'ai toujours le problème de 'Entretien ménager' que je n'arrive pas à résoudre. Je sais que ça doit venir de parentId? mais incapable de débug...



    function selectOption(option: Item) {
        if (multiple === true) {
            const updatedValue = value.includes(option)
                ? value.filter((o) => o !== option)
                : [...value, option];
            onChange(updatedValue);
        } else {
            onChange(option !== value ? option : undefined);
        }
        setHasSelection(true);
        setSearchInput('');
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

            <div onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className='container'>
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
                            "select your tiems..."
                        )}
                </span>

                <div className="divider"></div>
                <div className="caret"></div>

                <ul className={`optionsSelect ${isOpen ? "show" : ""}`} >
                    <div className='search-bar'  >
                        <SearchIcon className="search-icon" />
                        <input
                            type="text"
                            placeholder='search your item...'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onClick={e => {
                                setIsOpen(true)
                                e.stopPropagation()
                            }}
                            className="search-input"
                        />

                        < CrossIcon className="clear-btn"
                            onClick={(e: any) => {
                                e.stopPropagation()
                                setIsOpen(true)
                                setSearchInput('')
                            }} />

                    </div>
                    {filtered.map((option, index) => (
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
