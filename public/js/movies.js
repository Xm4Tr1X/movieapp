//the main module that performs search and handles user events
let Movies = function () {
    let searchButton, container, myList;
    let movieData;
    function getDOM() {
        searchButton = document.getElementById('search-movies');
        container = document.getElementById('movie-grid');
        myList = document.getElementById('show-list');
    }
    function registerEvents() {
        searchButton.addEventListener('keyup', function (event) {
            if (event.keyCode === 13 && this.value.length > 0) {
                event.preventDefault();
                search();
            }
        });
        document.addEventListener('click', function (event) {
            if (event.target.matches('.add')) {
                addtoList(event.target)
            }
            if (event.target.matches('.remove')) {
                removeFromList(event.target);
            }

        }, false);

        myList.addEventListener('click', _renderList);

    }
    function search() {
        let url = Apiconfig.baseUrl + 'search/movie?api_key=' + APIKEY + '&query=' + searchButton.value;
        fetch(url)
            .then(result => result.json())
            .then(data => {
                Movies.movieData = data;
                _renderSearch()
            })
            .catch(err => alert(err));

    }

    function _renderSearch() {
        if (Movies.movieData.total_results === 0) {
            container.innerHTML = 'No results found';
        } else {
            let html = '';
            Movies.movieData.results.forEach(movie => {
                html += htmlTemplate(movie, 1);
            });
            container.innerHTML = html;
        }
    }
    function htmlTemplate(data, add) {
        if (data.poster_path === null || data.id === null || data.title === null || data.release_date === null) {
            return '';
        }
        let html = '<div class="flex-item"  data-id=' + data.id + '>' +
            '<img src = "' + Apiconfig.baseImageUrl + 'w185' + data.poster_path + '" alt = "' + data.title + '" >';
        if (add) {
            html += '<div class="media-hidden green"><a href="#"class="icon btn btn-primary add" data-release="' + data.release_date + '" data-title="' + data.title + '" data-poster="' + data.poster_path + '" title="Add to watch list">Add to watch list</a></div>';
        } else {
            html += '<div class="media-hidden red"><a href="#"class="icon btn btn-secondary remove" data-release="' + data.release_date + '" data-title="' + data.title + '" data-poster="' + data.poster_path + '" title="Remove from watch list">Remove from watch list</a></div>';
        }
        html += '<div class="flex movie-details">' +
            '<p class="movie-title" title="' + data.title + '">' + data.title + '</p>' +
            '<p>' + data.release_date + '</p>' +
            '</div>' +
            '</div > ';
        return html;
    }

    function addtoList(self) {
        WatchList.add(getMovieObj(self));
    }
    function removeFromList(self) {
        WatchList.remove(self.parentElement.parentElement.getAttribute('data-id'));
        _renderList();
    }

    function _renderList() {
        let list = WatchList.list();
        if (list.length === 0) {
            container.innerHTML = 'No movies in watchlist.';
        } else {
            let html = '';
            list.forEach(element => {
                html += htmlTemplate(element);
            });
            container.innerHTML = html;
        }


    }
    function getMovieObj(self) {
        return {
            id: self.parentElement.parentElement.getAttribute('data-id'),
            poster_path: self.getAttribute('data-poster'),
            title: self.getAttribute('data-title'),
            release_date: self.getAttribute('data-release')
        }
    }

    function init() {
        getDOM();
        registerEvents();
    }
    return {
        init, movieData
    }
}();