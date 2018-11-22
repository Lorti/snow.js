import f1 from './snowflake-01';
import f2 from './snowflake-02';

const flakeBaseClass = 'snow-js-flake';
const flakeClasses = ['f1', 'f2'];

const styles = `
    .${flakeBaseClass} {
        position: absolute;
        pointer-events: none;
    }
    .${flakeBaseClass}::before,
    .${flakeBaseClass}::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background: no-repeat center;
        background-size: contain;
    }
    .${flakeBaseClass}::before {
        filter: blur(50px);
        border-radius: 50%;
        background: rgba(0, 0, 0, .25);
    }
    .f1::after {
        background-image: url("${f1}");
    }
    .f2::after {
        background-image: url("${f2}");
    }
`;

function addStyles() {
    const node = document.createElement('style');
    node.innerHTML = styles;
    document.body.appendChild(node);
}

interface Snowflake {
    el: HTMLElement,
    depth: number,
    size: number,
    px: number,
    py: number
}

export default function snow(count: number, $stage: HTMLElement) {
    addStyles();

    $stage.style.overflow = 'hidden';
    $stage.style.pointerEvents = 'none';

    const maxFlakeSize = 100;
    const minFlakeSize = 25;

    function flakeFactory(flakeClass: string): Snowflake {
        const $flake = document.createElement('div');
        $flake.classList.add(flakeBaseClass);
        $flake.classList.add(flakeClass);
        $stage.appendChild($flake);

        return {
            el: $flake,
            depth: 0,
            size: 0,
            px: 0,
            py: 0
        }
    }

    function resetFlake(flake: Snowflake, yRandom?: boolean) {
        const depth = Math.random();

        const px = 100 * Math.random();
        const py = ((yRandom) ? 100 * Math.random() : 0) - 25;
        const size = minFlakeSize + (maxFlakeSize - minFlakeSize) * depth;

        flake.depth = depth;
        flake.size = size;
        flake.px = px;
        flake.py = py;

        flake.el.style.width = `${size}px`;
        flake.el.style.height = `${size}px`;
    }

    function renderFlake(flake: Snowflake, timestamp) {
        flake.py += 0.1 + 0.25 * flake.depth;
        if (flake.py > 100) {
            resetFlake(flake);
        }

        const wind = Math.cos(timestamp / 1000) * flake.size * Math.min(flake.depth, 0.5) * 1.25;
        const left = $stage.clientWidth * flake.px / 100 - flake.size / 2;
        const top = $stage.clientHeight * flake.py / 100 - flake.size;

        // @ts-ignore
        flake.el.style.opacity = 0.8 - Math.max(0, flake.py - 75) / 25;
        flake.el.style.transform = `translate3d(${left + wind}px, ${top}px, 0)`;
    }

    const flakes: Array<Snowflake> = [];
    for (let i = 0; i < count; i++) {
        const flake = flakeFactory(flakeClasses[i % flakeClasses.length]);
        resetFlake(flake, true);
        flakes.push(flake);
    }

    const loop = function (timestamp?) {
        flakes.forEach(function (flake) {
            renderFlake(flake, timestamp);
        });
        requestAnimationFrame(loop);
    };

    loop();
}
