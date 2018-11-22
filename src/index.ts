import snow from './snow';

const $stage: HTMLElement = document.querySelector('#stage');
const $iframe: HTMLIFrameElement = document.querySelector('iframe');

const params = new URLSearchParams(window.location.search);
const page = params.get('page');

if (page) {
    $iframe.src = decodeURIComponent(page);
} else {
    let url = prompt('Where do you want to let it snow?', 'https://manu.ninja/');
    if (url.indexOf('https://') !== 0) {
        url = `https://${url}`;
    }
    window.location.href = `?page=${encodeURIComponent(url)}`;
}

snow(10, $stage);
