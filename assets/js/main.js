function weatherAPI () {
    var weatherCard = document.getElementById('weather-card');
    
    var urlGent = " https://api.openweathermap.org/data/2.5/weather?q=Gent," +
            "country=be&" +
            "units=metric&" +
            "appId=fb1d78a5252fd1b6b096d9000cc33a11";

    var urlEeklo = " https://api.openweathermap.org/data/2.5/weather?q=Eeklo," +
            "country=be&" +
            "units=metric&" +
            "appId=fb1d78a5252fd1b6b096d9000cc33a11";
        
    function getRequest(url) {
        var req = new Request(url);
        fetch(req)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
            var tempStr = ''; 
            tempStr += `
            <div class="card-header">
                <h1>${data.name}</h1>
            </div>
            <div class="card-body">
                <p>${data.weather[0].main}</p>
                <p>${Math.round( data.main.temp * 10) / 10} °C</p>
                <p>${Math.round( data.wind.speed * 10) / 10} km/h</p>
            </div>`;
            weatherCard.innerHTML += tempStr;
        })
    };
    getRequest(urlGent);
    getRequest(urlEeklo);
};

function newsAPI () {
    var newsCard = document.getElementById('news-card');
    var url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d35e757f98ba4030bc2ba0ac3965554c';
    var req = new Request(url);
    fetch(req)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        for (var i = 0; i < data.articles.length; i++){
            var article = data.articles[i];
            var tempStr = ''; 
            tempStr += `
            <div class="card">
                <div class="card-header">
                    ${article.title}
                </div>
                <div class="card-body">
                    <img src="${(article.urlToImage)?article.urlToImage:""}">
                    <blockquote class="blockquote mb-0">
                        <p>${(article.description)?article.description:''}</p>
                        <p><a href="${article.url}">Go to the article!</a></p>
                        <footer class="blockquote-footer">${(article.author)?article.author:'Unknown'} in <cite title="Source Title">${(article.source.name)?article.source.name:'Unknown'}</cite></footer>
                    </blockquote>
                </div>
            </div>`
            newsCard.innerHTML += tempStr;
        }
    })
}


if(document.getElementById("weather-card")){
    weatherAPI();
}
else if (document.getElementById("news-card")){
    newsAPI();
}