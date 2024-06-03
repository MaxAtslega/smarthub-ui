import React, { useEffect, useRef, useState } from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/store";

interface NumberSwiperProps {
    elementId: string;
    maxNumberCol1: number;
    maxNumberCol2: number;
    setValue: (value: (((prevState: string) => string) | string)) => void;
    value: string;
    timer: string;
}

const TimeSwiper: React.FC<NumberSwiperProps> = ({ timer, elementId, setValue, maxNumberCol1, value, maxNumberCol2 }) => {
    const swiperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const digits = timer.toString().split(':').reverse();

        digits.forEach((digit, i) => {
            const column = i + 1;
            const number = getNumber(column, 'active');
            if(number && number.innerText != digit){
                getNumber(column, digit)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }, [timer]);

    useEffect(() => {
        const swiperElement = swiperRef.current;
        if (!swiperElement) return;


        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        const value = parseInt(target.innerText);
                        const columnElement = target.parentElement;
                        if (!columnElement) return;

                        const oldValue = parseInt(columnElement.dataset.value || '0');
                        const column = parseInt(columnElement.dataset.column || '0');
                        const nextColumn = column + 1;
                        const maxNumber = getMaxNumber(column);

                        columnElement.querySelector('.number-swiper-active-number')?.classList.remove('number-swiper-active-number');
                        target.classList.add('number-swiper-active-number');

                        if (target.classList.contains('last-zero')) {
                            if (swiperElement) {
                                swiperElement.querySelector(`#center-${column}`)?.scrollIntoView();
                            }
                        }

                        columnElement.dataset.value = value.toString();

                        let total = '';
                        swiperElement.querySelectorAll('.number-swiper-column').forEach((col) => {
                            total += ":"+(col as HTMLElement).dataset.value;
                        });

                        setValue(total.slice(1, total.length-1));
                    }
                });
            },
            {
                root: swiperElement,
                rootMargin: '0px',
                threshold: 1,
            }
        );

        swiperElement.querySelectorAll(".number-swiper-column li").forEach((number) => {
            observer.observe(number);
        });

        return () => {
            observer.disconnect();
        };
    }, []);



    const getNumber = (column: number, value: string | 'active') => {
        const columnElement = swiperRef.current?.querySelector(`.number-swiper-column-${column}`);
        if (!columnElement) return null;

        if (value === 'active') {
            return columnElement.querySelector('.number-swiper-active-number') as HTMLElement;
        }

        return Array.from(columnElement.getElementsByTagName('li')).findLast((li) => {
            return li.textContent == value.toString()
        });
    };

    const setColumnValue = (column: number, value: number | 'up' | 'down') => {
        const columnElement = swiperRef.current?.querySelector(`.number-swiper-column-${column}`);
        if (!columnElement) return;

        let newValue: number;
        let newElement: HTMLElement | null | undefined = undefined;

        if (typeof value === 'number') {
            newValue = value > 9 ? 0 : value < 0 ? 9 : value;
            newElement = getNumber(column, newValue.toString());
        } else {
            const activeElement = getNumber(column, 'active');
            if (value === 'up') {
                newElement = activeElement?.nextElementSibling as HTMLElement;

            } else if (value === 'down') {
                newElement = activeElement?.previousElementSibling as HTMLElement;
            }
        }

        if (newElement) {
            setTimeout(() => {
                if (newElement) {
                    newElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1000);
        }
    };


    const getMaxNumber = (column: number): number => {
        if (column === 1) return maxNumberCol1;
        if (column === 2) return maxNumberCol2;
        return 9; // default fallback
    };

    const renderColumn = (columnNumber: number, maxNumber: number, title: string) => {
        const numbers = Array.from({ length: maxNumber }, (_, i) => i);
        return (
            <div className="flex justify-center flex-col">
                <div className={"mb-3 text-center opacity-60"}>
                    <span className={"text-xl mb-2"}>{title}</span>
                </div>
                <ol className={`number-swiper-column number-swiper-column-${columnNumber}`} data-column={columnNumber}>
                    <li className="last-zero">00</li>
                    {numbers.map((num) => (
                        <li key={num + 1}>{String(num + 1).padStart(2, "0")}</li>
                    ))}
                    <li id={`center-${columnNumber}`} className="number-swiper-active-number">00</li>
                    {numbers.map((num) => (
                        <li key={`repeat-${num + 1}`}>{String(num + 1).padStart(2, "0")}</li>
                    ))}
                    <li className="last-zero">00</li>
                </ol>
            </div>

        );
    };

    return (
        <div id={elementId} className="flex justify-center items-center" ref={swiperRef}>
            {renderColumn(2, maxNumberCol2, "")}
            <span className={"mt-[3.5rem]"}>:</span>
            {renderColumn(1, maxNumberCol1, "")}
        </div>
    );
};

export default TimeSwiper;
