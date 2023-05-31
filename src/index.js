// write your code here
const baseAPI = 'http://localhost:3000/ramens';
const ramenMenu = document.getElementById('ramen-menu');
const currentRamen = document.getElementById('ramen-detail');
const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json'
}
let menuArr = [];

fetch(baseAPI)
    .then(resp => resp.json())
    .then(data => {
        menuArr = data;
        const currentRamenImage = document.getElementById('detail-image');
        currentRamenImage.src = `${menuArr[0].image}`;

        const currentRamenName = document.getElementById('name');
        currentRamenName.textContent = menuArr[0].name;

        const currentRamenRestaurant = document.getElementById('restaurant');
        currentRamenRestaurant.textContent = menuArr[0].restaurant;

        const rating = document.getElementById('rating-display');
        rating.textContent = menuArr[0].rating;

        const comment = document.getElementById('comment-display');
        comment.textContent = menuArr[0].comment;
    })

function renderPage() {
    fetch(baseAPI)
        .then(resp => resp.json())
        .then(data => {
            menuArr = data;

            for (let i = 0; i < data.length; i++){
                const newRamen = document.createElement('img');
                newRamen.src = `${data[i].image}`;

                ramenMenu.append(newRamen);

                newRamen.addEventListener('click', (event) => {
                    const currentRamenImage = document.getElementById('detail-image');
                    currentRamenImage.src = `${menuArr[i].image}`;

                    const currentRamenName = document.getElementById('name');
                    currentRamenName.textContent = menuArr[i].name;

                    const currentRamenRestaurant = document.getElementById('restaurant');
                    currentRamenRestaurant.textContent = menuArr[i].restaurant;

                    const rating = document.getElementById('rating-display');
                    rating.textContent = menuArr[i].rating;

                    const comment = document.getElementById('comment-display');
                    comment.textContent = menuArr[i].comment;
                })
            }
        });
}

document.getElementById('new-ramen').addEventListener('submit', (event) => {
    event.preventDefault();
    
    fetch(baseAPI, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            name: event.target.name.value,
            restaurant: event.target.restaurant.value,
            image: event.target.image.value,
            rating: event.target.rating.value,
            comment: event.target.comment.value
        })
    })
    .then(resp => resp.json())
    .then(data => {
        event.target.name.value = '';
        event.target.restaurant.value = '';
        event.target.image.value = '';
        event.target.rating.value = '';
        event.target.comment.value = '';
        ramenMenu.innerHTML = '';
        renderPage();
    })
})
/*
for (let i = 0; i < menuArr.length; i++){
    document.getElementById('edit-ramen').addEventListener('submit', (event) => {
        event.preventDefault();
    
        fetch(`${baseAPI}/${menuArr[i].id}`,{
            headers,
            method: 'PATCH',
            body: JSON.stringify({
                rating: event.target.rating.value,
                comment: event.target.newComment.value
            })
        })
        .then(resp => resp.json())
        .then(data => {
            ramenMenu.innerHTML = '';
            renderPage();
        })
    })
}
*/
renderPage();
