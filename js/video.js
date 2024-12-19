// fetch the catagories from catagories api
const getCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => getCatagoryData(data.categories))
        .catch(err => console.log(err));
}

// fetch the videos from videos api
const getVideos = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
        const videosData = await response.json();
        getVideoData(videosData.videos);
    }
    catch (err) {
        console.log(err);
    }
};

// next work of getCategories
const getCatagoryData = (catagories) => {
    const catagoryDiv = document.getElementById('catagories');
    catagories.forEach(catagory => {
        const catagoryButton = document.createElement('button');
        catagoryButton.classList = "btn";
        catagoryButton.innerText = catagory.category;
        catagoryDiv.append(catagoryButton);
    })
};

// next work of getVideos
const getVideoData = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = 'card card-compact py-4';
        card.innerHTML = `
        <figure class = "h-[200px]">
        <img class = "w-full h-full object-cover" src="${video.thumbnail}" alt="">
        </figure>
        <div class ="py-4 flex gap-2">
            <div>
                <img class= "w-10 h-10 rounded-full object-cover mt-2" src="${video.authors[0].profile_picture}" alt="">
            </div>
            <div class="">
            <p class="text-2xl font-bold">${video.title}</p>
            <div class="flex itmes-center gap-2">
            <p class="text-gray-600">${video.authors[0].profile_name}</p>
            <img class= "w-6" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="">
            </div>
            <p class="py-1">${video.others.views} views</p>
            </div>
        </div>
        `;
        videoContainer.append(card);
    })
}
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