import { fetchGifURL } from "../src/giphyAPI"

/*
- Our mock fetch function. Allowing us to test our real async functions, but 
	it just doesn't call to the api, fakes it.
*/
globalThis.fetch = jest.fn()

/*
- Test our function if it returns a correct gif url. Our mockJson our own copy of the json object that's 
returned from the giphy api call.
*/
test("fetchGifURL returns correct gif url", async () => {
    const mockJson = {
        data: {
            images: {
                original: {
                    url: "https://example.com/mock-gif-url.gif",
                },
            },
        },
    }

    /*
	- Customize the fetch response so that when we call fetch, it'll return a promise that resolve to the mockJson object
    , with the .json() method. This simulates a response object as when we call fetch function in fetchGifURL
	it'll return our customized promise instead.
	*/
    globalThis.fetch.mockResolvedValue({
        json: () => Promise.resolve(mockJson),
    })

    // Call the function we're testing, which should return the gif url.
    // Remember, that our fetch function will now receive a fake response object for its json parsing and dissecting process.
    const result = await fetchGifURL("test-search")
    expect(result).toBe("https://example.com/mock-gif-url.gif")

    /*
	- Tests if the fetchGifURL attempted to fetch data from the correct api endpoint. So we just put the expected url or endpoint 
    where we call the api, and make sure if the fetch function is calling it
	*/
    const expectedURL =
        "https://api.giphy.com/v1/gifs/translate?api_key=NEs7tmX6Z6Up0BlOyfGtmFbMHoe2fTKh&s=test-search"

    expect(global.fetch).toHaveBeenCalledWith(expectedURL, expect.any(Object))
})
