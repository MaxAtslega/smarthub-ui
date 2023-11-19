import { useCallback, useRef, useState, MouseEvent, TouchEvent } from "react";

type LongPressEvent = MouseEvent | TouchEvent;
type EventCallback = (event: LongPressEvent) => void;

const useLongPress = (
    onLongPress: EventCallback,
    onClick: EventCallback,
    { shouldPreventDefault = true, delay = 300 }: { shouldPreventDefault?: boolean, delay?: number } = {}
) => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<NodeJS.Timeout | number | null>(null);
    const target = useRef<EventTarget | null>(null);

    const start = useCallback((event: LongPressEvent) => {
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener("touchend", preventDefault, {
                    passive: false
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    const clear = useCallback(
        (event: LongPressEvent, shouldTriggerClick = true) => {
            if (timeout.current) clearTimeout(timeout.current);
            shouldTriggerClick && !longPressTriggered && onClick(event);
            setLongPressTriggered(false);
            if (shouldPreventDefault && target.current) {
                (target.current as HTMLElement).removeEventListener("touchend", preventDefault);
            }
        },
        [shouldPreventDefault, onClick, longPressTriggered]
    );

    return {
        onMouseDown: (e: MouseEvent) => start(e),
        onTouchStart: (e: TouchEvent) => start(e),
        onMouseUp: (e: MouseEvent) => clear(e),
        onMouseLeave: (e: MouseEvent) => clear(e, false),
        onTouchEnd: (e: TouchEvent) => clear(e)
    };
};

const isTouchEvent = (event: any): event is TouchEvent => {
    return "touches" in event;
};

const preventDefault: EventListener = (event: Event) => {
    const touchEvent = event;
    if (!isTouchEvent(touchEvent)) return;

    if (touchEvent.touches.length < 2 && touchEvent.preventDefault) {
        touchEvent.preventDefault();
    }
};

export default useLongPress;
