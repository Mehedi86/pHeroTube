// find year,day, hour ...
const findTimeFormat = (timeInSeconds) => {
    if (timeInSeconds < 86400) {
        const hour = parseInt(timeInSeconds / 3600);
        let remainingSeconds = (timeInSeconds % 3600);
        const minute = parseInt(remainingSeconds / 60);
        remainingSeconds = (remainingSeconds % 60);
        if (hour === 0 && minute === 0) {
            return `${remainingSeconds} seconds ago`;
        }
        else if (hour === 0) {
            return `${minute} minutes ${remainingSeconds} seconds ago`
        }
        else {
            return `${hour} hours ${minute} minutes ${remainingSeconds} seconds ago`
        }
    }
    else {
        return "N/A";
    }
}

// fetch the catagories from catagories api
const getCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => getCatagoryData(data.categories))
        .catch(err => console.log(err));
}

// fetch the videos from videos api
const getVideos = async (searchText= "") => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const videosData = await response.json();
        getVideoData(videosData.videos);
    }
    catch (err) {
        console.log(err);
    }
};

//work for render video catagory wise
const catagoryVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            getVideoData(data.category);
            removeActiveBtn();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('activeBtn');
        })
        .catch(err => console.log(err));
}
//  remove active button design
const removeActiveBtn = () =>{
    const activeButtons = document.getElementsByClassName('catagory-btn');
    for(let activeButton of activeButtons){
        activeButton.classList.remove('activeBtn');
    }
}
// next work of getCategories
const getCatagoryData = (catagories) => {
    const catagoryDiv = document.getElementById('catagories');
    catagories.forEach(catagory => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
        <button id="btn-${catagory.category_id}" onclick="catagoryVideo(${catagory.category_id})" class="btn catagory-btn">${catagory.category}<button>
        `;
        catagoryDiv.append(buttonDiv);
    })
};

// next work of getVideos
const getVideoData = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    if(videos.length == 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class ="min-h-[290px] w-[290px] mx-auto text-center justify-center my-14">
        <img class="w-full" src="./assets/Icon.png" alt="">
        </div>
        <p class="text-4xl font-bold py-4 text-center">No Content Available</p>
        `;
        return;
    }
    else{
        videoContainer.classList.add('grid');
    }
    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = 'card card-compact py-4';
        card.innerHTML = `
        <figure class = "h-[200px] relative">
        <img class = "w-full h-full object-cover" src="${video.thumbnail}" alt="">
        <span class="absolute right-2 bottom-2 p-1 bg-black text-white rounded">${findTimeFormat(video.others.posted_date)}</span>
        </figure>
        <div class ="py-4 flex gap-2">
            <div>
                <img class= "w-10 h-10 rounded-full object-cover mt-2" src="${video.authors[0].profile_picture}" alt="">
            </div>
            <div class="">
            <p class="text-2xl font-bold">${video.title}</p>
            <div class="flex itmes-center gap-2">
            <p class="text-gray-600">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified === "" ? "" : `<img class= "w-6" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt=" ">`}
            </div>
            <p class="py-1">${video.others.views} views</p>
            </div>
        </div>
        `;
        videoContainer.append(card);
    })
};

document.getElementById('searchText').addEventListener('keyup', (event)=>{
    getVideos(event.target.value);
})
getCatagories();
getVideos();

const ob = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}