import React, { ComponentPropsWithRef } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { twMerge } from '@jakxz/tw-classnames';
import { useDotButton } from './EmblaCarouselDotButton';
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from './EmblaCarouselArrowButtons';

type Props = {
    children: React.ReactNode;
    prevBtnChildren: React.ReactNode;
    nextBtnChildren: React.ReactNode;
    DotsWrapperClass: string;
    ButtonsWrapperClass: string;
    prevButtonProps: ComponentPropsWithRef<'button'>;
    NextButtonProps: ComponentPropsWithRef<'button'>;
    emblaContainerClassName?: string;
    emblaClassName?: string;
    DotButton: React.ReactNode;
    options: EmblaOptionsType;
    enableButtons: boolean;
    enableDots: boolean;
};
function EmblaCarousel({
    children,
    nextBtnChildren,
    prevBtnChildren,
    options,
    emblaClassName,
    emblaContainerClassName,
    ButtonsWrapperClass,
    DotsWrapperClass,
    NextButtonProps,
    prevButtonProps,
    enableButtons = false,
    enableDots = false,
}: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const {
        nextBtnDisabled,
        prevBtnDisabled,
        onNextButtonClick,
        onPrevButtonClick,
    } = usePrevNextButtons(emblaApi);
    return (
        <div className={twMerge('embla', emblaClassName)}>
            <div className="embla__viewport" ref={emblaRef}>
                <ul
                    className={twMerge(
                        'embla__container',
                        emblaContainerClassName
                    )}
                >
                    {children}
                </ul>
            </div>
            {enableButtons && (
                <div className={twMerge(ButtonsWrapperClass)}>
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    >
                        {prevBtnChildren}
                    </PrevButton>
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    >
                        {nextBtnChildren}
                    </NextButton>
                </div>
            )}
            {enableDots && <div className={twMerge()}></div>}
        </div>
    );
}

export default EmblaCarousel;
