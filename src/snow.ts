import f1 from './snowflake-01';
import f2 from './snowflake-02';

const styles = `
    .snow-js-flake {
        position: absolute;
        pointer-events: none;
    }
    .snow-js-flake::before,
    .snow-js-flake::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        background: no-repeat center;
        background-size: contain;
    }
    .snow-js-flake::before {
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

export default function snow(count: number, $stage: HTMLElement) {
    addStyles();

    $stage.style.overflow = 'hidden';
    $stage.style.pointerEvents = 'none';

    const maxFlakeSize = 100;
    const minFlakeSize = 25;
    const flakeClasses = ['f1', 'f2'];

    function resetFlake($flake, yRandom?: boolean) {
        const depth = Math.random();

        const px = 100 * Math.random();
        const py = ((yRandom) ? 100 * Math.random() : 0) - 25;
        const size = minFlakeSize + (maxFlakeSize - minFlakeSize) * depth;

        $flake.data = {
            depth: depth,
            size: size,
            px: px,
            py: py
        };

        $flake.style.width = `${size}px`;
        $flake.style.height = `${size}px`;
    }

    function renderFlake($flake, timestamp) {
        let data = $flake.data;

        data.py += 0.1 + 0.25 * data.depth;
        if (data.py > 100) {
            resetFlake($flake);
            data = $flake.data;
        }

        const wind = Math.cos(timestamp / 1000) * data.size * Math.min(data.depth, 0.5);
        const left = $stage.clientWidth * data.px / 100 - data.size / 2;
        const top = $stage.clientHeight * data.py / 100 - data.size;

        $flake.style.opacity = 0.8 - Math.max(0, data.py - 75) / 25;
        $flake.style.transform = `translate3d(${left + wind}px, ${top}px, 0)`;

        $flake.data = data;
    }

    const flakes = [];
    for (let i = 0; i < count; i++) {
        const $flake = document.createElement('div');
        $flake.classList.add('snow-js-flake');
        $flake.classList.add(flakeClasses[i % flakeClasses.length]);
        $stage.appendChild($flake);
        resetFlake($flake, true);
        flakes.push($flake);
    }

    const loop = function (timestamp?) {
        flakes.forEach(function (flake) {
            renderFlake(flake, timestamp);
        });
        requestAnimationFrame(loop);
    };

    loop();
}
