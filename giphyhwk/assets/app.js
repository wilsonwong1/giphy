$(document).ready(function () {
    let topics = ['Hulk', 'Iron Man', 'Captain America', 'Thanos'];
    const textInput = $('.user-input');
    const searchBtn = $('.search-btn');
    let searchInput
    let defaultSearch = $('.default-search');
    let selectedGif = $('.selected-gif');
    searchBtn.on('click', function (e) {
        e.preventDefault();
        // console.log('hello')
        searchInput = textInput.val();
        topics.push(searchInput);
        console.log(topics);
        // console.log(textInput.val());
        newButtons();
    });
    function newButtons() {
        defaultSearch.empty();
        for (let i = 0; i < topics.length; i++) {
            let btn = $('<button>');
            btn.attr({ 'class': 'topic-btn', 'data-name': topics[i] });
            btn.text(topics[i]);
            defaultSearch.append(btn);
        };
    };
    newButtons();
    $(document).on('click', '.topic-btn', function () {
        let searchText = $(this).attr('data-name');
        const api_Key = 'Dozxpz2v89Db9ayj3RBzlF461g21ticx';
        const baseUrl = 'https://api.giphy.com/v1/gifs/search';
        const queryUrl = baseUrl + '?api_key=' + api_Key +
            '&q=' + searchText
        // + '&limit=25&offset=0&rating=G&lang=en';
        console.log(queryUrl);
        $.ajax({
            method: 'GET',
            url: queryUrl
        }).then(resp => {
            console.log(resp);
            let data = resp.data
            selectedGif.empty();
            for (let i = 0; i < data.length; i++) {
                let rating = data[i].rating;
                let title = data[i].title;
                let gif = data[i].images.fixed_height_still.url;
                selectedGif.append(
                    `<div class ="content">
                    <p>${rating} ${title}</p>
                    <img src="${gif}" class="allimages" data-state="still" alt="giphyimages">
                </div>`
                );
            };
        });
    });
    $(document).on('click', '.allimages', function () {
        console.log('working');
        let state = $(this).attr('data-state');
        let still = $(this).attr('src').replace('/200', '/200_s');
        let animate = $(this).attr('src').replace('/200_s', '/200');
        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
            console.log(state);
        } else {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
            console.log(state);
        }
    });
});