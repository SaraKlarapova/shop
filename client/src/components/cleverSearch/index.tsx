import React, { RefObject, useEffect, useRef, useState } from 'react';
import styles from './index.module.scss'
import { useOutsideClick } from 'utils/useOutsideClick';
import Expand from 'assets/icons/expang.svg'
import SearchIcon from 'assets/icons/search-icon.svg'

interface Option {
    value: string;
    label: string;
}

interface SelectWithSearch {
    options: Option[];
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    isVisible: boolean
    setOption: (a: any) => void
    option: Option | null
}

export const SelectWithSearch: React.FC<SelectWithSearch> = ({ options, setIsVisible, setOption, option, isVisible }) => {

    const [isAllowed, setIsAllowed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleClickOutside = () => {
        if (isAllowed) {
            setIsVisible(false);
        }
    }

    const ref: RefObject<HTMLDivElement> = useOutsideClick(handleClickOutside);

    useEffect(() => {
        setTimeout(() => {
            setIsAllowed(isVisible);
        })
    }, [isVisible])

    const handleSelectOption = (option: Option) => {
        setTimeout(() => {
            setOption(option);
            setIsOpen(false);
        });
    };

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsVisible(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleOpen = () => {
        setIsOpen(prev => !prev);

        if (!isOpen) {
            setSearch('')
        }

        setTimeout(() => {
            if (inputRef.current && !isOpen) {
                inputRef.current.focus();
            }
        })
    }

    return (
        <>
            {isVisible && <div className={styles.selectSearch} ref={ref}>
                <div
                    onClick={handleOpen}
                    className={styles.allBox} >
                    {option ?
                        <div className={`${styles.boxSelect} ${styles.dopActive}`}>
                            <div className={styles.labelSearch}>
                                {/* <img src={eth} alt='crypto' /> */}
                                {option.label}
                            </div>
                            <img src={Expand} />
                        </div> :
                        <div className={`${styles.boxSelect}`}>
                            <span>Выберите...</span>
                            <img src={Expand} />
                        </div>
                    }
                </div>
                {isOpen && (
                    <div className={styles.boxInputIcon}>
                        <div className={styles.boxFlexInputSearch}>
                            <img src={SearchIcon} />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className={styles.searchInput}
                                placeholder='Select crypto...'
                                ref={inputRef}
                            />
                        </div>
                        <ul className={styles.ul}>
                            {filteredOptions.map(option => (
                                <div className={styles.boxImgLi}
                                    onClick={() => handleSelectOption(option)}>
                                    <li key={option.value}>
                                        {option.label}
                                    </li>
                                </div>
                            ))}
                            {
                                filteredOptions.length === 0 ? <span className={styles.notfound}>Ничего не найдено</span> : <></>
                            }
                        </ul>
                    </div>
                )}
            </div>}
        </>
    );
};
