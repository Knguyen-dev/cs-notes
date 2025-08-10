 /*
 - Example: Making a bulletin board example with user posts. We're going to need some state
 to handle rendering and updating user posts, so we'll create a slice 
 of state for that
 
 
 
 */

import {createSlice} from "@reduxjs/toolkit";
import {sub} from "date-fns";
// Makes it easy to generate ids
import {nanoid} from "@reduxjs/toolkit";


const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {


        reactionAdded(state, action) {
            const {postId, reaction} = action.payload;
            const existingPost = state.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },

        /*
        We expect the payload to be a new post (form data).
        Remember that inside createSlice, we can directly mutate state, 
        and it all works under the hood, so push this new post into our state
        */
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },



            /*
            - Prepare function accepts title and content, and 
            then it creates the 'payload object that our reducer is expecting.
            As a result, it abstracts away the idea of creating the 'post object'.
            
            Before: dispatch(postAdded({id, title, content, userId}));

            Now: dispatch(postAdded(title, content, userId));
            We simply pass in the arguments that are needed for 
            our prepare function


            */
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,

                        // All posts start with zero reactions
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        },

                        // Save the current date
                        date: new Date().toISOString()
                    }

                }
            }
        }

    }
})


// Export our action creator functions (state updating functions)
export const {reactionAdded, postAdded} = postsSlice.actions;


/*
- Instead of doing useSelector(state => state.posts) in each of your 
  components that needs to access the posts state, instead define a callback
  function that we'll pass into 'useSelector'. As a result, in the future if you changed 
  the structure of the state, to something like state.goodPosts, you'd only need
  to make the change here, instead of making the change everywhere else in your code.

  Now do useSelector(selectAllPosts)
*/
export const selectAllPosts = (state) => state.posts;

// Export the .reducer so that we can add it to our store, allowing us to provide our reducer functions we'll define later
export default postsSlice.reducer;