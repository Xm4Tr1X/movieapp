
let Apiconfig = function () {
    const baseUrl = 'https://api.themoviedb.org/3/';
    let confData = null, baseImageUrl = null, url = null;

    function getConfig() {
        let url = baseUrl + 'configuration?api_key=' + APIKEY;
        fetch(url).then(result => result.json()).then(data => {
            Apiconfig.baseImageUrl = data.images.secure_base_url;
            configData = data.images;
            console.log('config', data);
            Movies.init();
        }).catch(err => alert(err));
    }
    function init() {
        getConfig();
    }
    return {
        init,
        baseUrl,
        baseImageUrl
    }
}();



