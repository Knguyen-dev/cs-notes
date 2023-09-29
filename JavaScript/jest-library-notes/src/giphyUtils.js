function createGifRequestURL(searchTerm) {
    const apiKey = "NEs7tmX6Z6Up0BlOyfGtmFbMHoe2fTKh"; // free api key
    const baseURL = `https://api.giphy.com/v1/gifs/translate?`;
    const requestURL = `${baseURL}api_key=${apiKey}&s=${searchTerm}`;
    return requestURL;
}

export {
	createGifRequestURL
}