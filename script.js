import {data as emoji} from './data.js'

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

let request = document.querySelector('.card__search')

let searchResult;
function search(obj, str) {
    searchResult = obj.filter(el => el.title === str || el.keywordsFiltered.includes(str))
    document.querySelector('.card__container').innerHTML='';
    return renderCard(searchResult)
}



request.onkeypress = function(e) {
    let key = e.which || e.keyCode
    if (key === 13) {
        search(emoji, request.value);
    }
}

