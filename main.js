/*Descrizione
BONUS
Formattare le date in formato italiano (gg/mm/aaaa)
Gestire l"assenza dell"immagine profilo con un elemento di fallback che contiene le iniziali dell"utente (es. Luca Formicola > LF).
Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.*/
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": "https://unsplash.it/300/300?image=46"
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

function invertDate(date) {
    const dateElement = date.split("-");
    return `${dateElement[2]}/${dateElement[1]}/${dateElement[0]}`;
}


function createPost(post) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${post.author.image}">
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${post.author.name}</div>
                    <div class="post-meta__time">${invertDate(post.created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${post.content}</div>
        <div class="post__image">
            <img src="${post.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button" href="#" data-postid="${post.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                    <i id="hearth" class="like-icon fas fa-heart"></i>
                </div>
            </div> 
        </div>
    `;

    return postElement;
}

function showPosts() {
    const container = document.getElementById("container");
    posts.forEach(function(post) {
        const postElement = createPost(post);
        container.appendChild(postElement);
    });
    
}
showPosts();

const likedPost = [];

function clickLike(like) {

    like.preventDefault();

    const likeButton = like.target.closest(".js-like-button");

    const postId = Number(likeButton.dataset.postid);

    const likeCounter = document.getElementById(`like-counter-${postId}`);

    const actualLikes = Number(likeCounter.textContent);

    const heartIcon = document.getElementById("hearth")

    if (likedPost.includes(postId)) {

        likeCounter.textContent = actualLikes - 1;

        likeButton.classList.remove("like-button--liked");

        heartIcon.classList.remove("liked");

        const index = likedPost.indexOf(postId);

        if (index > -1) {
            likedPost.splice(index, 1);
        }

    } else {
        likeCounter.textContent = actualLikes + 1;

        likeButton.classList.add("like-button--liked");

        heartIcon.classList.add("liked");
        
        likedPost.push(postId);
    }
}
document.addEventListener("click", clickLike);