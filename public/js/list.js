//maintain watchlist
let WatchList = function () {
    let idArr = [], objArr = [];
    function add(movie) {
        if (getIndex(movie.id) !== -1) {
            alert('Movie already added to list');
            return false;
        }
        idArr.push(movie.id);
        objArr.push(movie);
    }

    function remove(id) {
        let index = getIndex(id);
        if (index === -1) {
            alert('Movie not found');
            return false;
        }
        idArr.splice(index, 1);
        objArr.splice(index, 1);
    }

    function list() {
        return objArr;
    }

    function getIndex(id) {
        let index = idArr.indexOf(id);
        return index;
    }

    return {
        list,
        add,
        remove
    };
}();