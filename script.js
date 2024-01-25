import {data as emoji} from './data.js'

let title = document.querySelector('title')
let randomEmoji = emoji[Math.floor(Math.random()*emoji.length)]['symbol'] 
title.textContent = `Emoji Finder ${randomEmoji}`

renderCard(emoji)

function renderCard(emoji) {
    emoji.forEach(el => {
        createCard(el)
    })
}

function createCard(obj) {
    const container = document.querySelector('.card__container')

    const card = document.createElement('article')
    card.className = 'card__card';

    filterKeywords(obj)

    card.innerHTML = `
    <p class="card__emoji">${obj.symbol}</p>
    <h2 class="card__name">${obj.title}</h2>
    <h3 class="card__keywords">${obj.keywordsFiltered}</h3>`

    container.append(card)
}

function filterKeywords(obj) {
    let keywords = obj.keywords.split(' ');
    let keywordsFiltered = keywords.filter((el, index) => {
    return keywords.indexOf(el) === index
    });
    obj.keywordsFiltered = keywordsFiltered.join(' ')
}

let request = document.querySelector('.card__search');

function search(obj, str) {
    str = str.trim().toLowerCase();
    let searchResult = obj.filter(el => el.title.toLowerCase() === str || el.keywordsFiltered.includes(str))
    document.querySelector('.card__container').innerHTML='';
    request.value = ''
    return renderCard(searchResult)
}



request.onkeypress = function(e) {
    let key = e.which || e.keyCode
    if (key === 13) {
        search(emoji, request.value);
    }
}

