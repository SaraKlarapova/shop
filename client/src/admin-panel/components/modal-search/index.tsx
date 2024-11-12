import React, { RefObject, useEffect, useRef, useState, useMemo } from 'react';
import styles from './index.module.scss'
import { useOutsideClick } from 'utils/useOutsideClick';
import Expand from 'assets/icons/expang.svg'
import SearchIcon from 'assets/icons/search-icon.svg'
import { Option } from 'interfaces';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';



interface SelectWithSearch {
    options: Option[];
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    isVisible: boolean
    setOption: (a: Option) => void
}

export const SelectWithSearch: React.FC<SelectWithSearch> = ({ options, setIsVisible, setOption, isVisible }) => {

    const [isAllowed, setIsAllowed] = useState(false);
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

            if (inputRef.current) {
                inputRef.current.focus();
            }
        })
    }, [isVisible])

    const handleSelectOption = (option: Option) => {
        setTimeout(() => {
            setOption(option);
            setIsVisible(false);
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

    return (
        <>
            {isVisible && <div className={styles.selectSearch} ref={ref}>
                <div className={styles.boxInputIcon}>
                    <div className={styles.boxFlexInputSearch}>
                        <img src={SearchIcon} />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className={styles.searchInput}
                            placeholder='Выберите тест'
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
            </div>
            }
        </>
    );
};

export interface OptionWithImage {
    img?: string | JSX.Element;
    value: string | number;
    label: string;
}

interface Props {
    options: OptionWithImage[] | [];
    setSelected?: (value: any) => void;
    label?: string;
    dynamicValue?: string
    setValue?: UseFormSetValue<any>
    watch?: UseFormWatch<any>
}

export const SelectWithSearchZod: React.FC<Props> = ({ options,
    setSelected,
    dynamicValue,
    setValue,
    label,
    watch }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [isAllowed, setIsAllowed] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const hookFormValue = watch?.(label as any);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const foundLabelByValue = useMemo(() => {
        const foundOption = options.find(el => el.value === hookFormValue);

        return foundOption?.label
    }, [hookFormValue])

    const handleClickOutside = () => {
        if (isAllowed) {
            setIsVisible(false);
        }
    }

    const ref: RefObject<HTMLDivElement> = useOutsideClick(handleClickOutside);

    useEffect(() => {
        setTimeout(() => {
            setIsAllowed(isVisible);

            if (inputRef.current) {
                inputRef.current.focus();
            }
        })
    }, [isVisible])

    const handleSelectOption = (option: OptionWithImage) => {
        setTimeout(() => {
            setSelected?.(option);

            console.log(option.value)

            setValue?.(label ?? "", option.value, {
                shouldValidate: true
            });

            setIsVisible(false);
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

    return (
        <div className={styles.wrapper}>
            <div className={styles.trigger} onClick={() => setIsVisible(true)}>
                <span className={styles.value}>{dynamicValue ? dynamicValue : foundLabelByValue ? foundLabelByValue : "Select"}</span>
                {isVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
            {isVisible && <div className={styles.selectSearch} ref={ref}>
                <div className={styles.boxInputIcon}>
                    <div className={styles.boxFlexInputSearch}>
                        <img src={SearchIcon} />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className={styles.searchInput}
                            placeholder='Выберите тест'
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
            </div>
            }
        </div>
    );
};
