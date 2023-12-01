import * as React from "react";

interface IChevron extends React.SVGProps<SVGSVGElement> {
    side: 'right' | 'left' | 'up' | 'down'
}

function Chevron(props: IChevron) {
    const side = props?.side ?? 'down';
    const getSide = () => {
        switch (side) {
            case 'up':
                return '-rotate-90'
            case 'left':
                return 'rotate-180'
            case 'down':
                return 'rotate-90'
            case 'right':
                return ''
            default:
                break;
        }
    }
    return (
        <svg className={`${props?.className} ${getSide()} `} width="1em" height="1em" viewBox="0 0 12 12" fill="none" {...props}>
            <path
                d="M3.127 5.611l4.45-4.45a.55.55 0 01.777 0l.52.52a.55.55 0 010 .775L5.347 6l3.527 3.544a.55.55 0 010 .776l-.52.52a.55.55 0 01-.777 0l-4.45-4.452a.55.55 0 010-.777z"
                fill="currentColor"
            />
        </svg>
    );
}

export default Chevron;
