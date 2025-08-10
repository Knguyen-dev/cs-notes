
/*
- Planning to update our state in our postsSlice so we need the 
    useDispatch custom hook from redux, and then the corresponding 
    reducer functions that we export from our slice.
*/
import {useDispatch, useSelector} from "react-redux";
import {postAdded} from "./postsSlice";
import {selectAllUsers} from "../users/usersSlice";

import {useState} from "react";




export default function AddPostForm() {
    /*
    Again it's okay to have local state, or define state for a single component.
    Not all state needs to be in the redux store, because not all state is used in 
    multiple components across our application. title and content 
    are going to simply be used here, and so they don't need to be included in the redux 
    store.
    */
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);


    // Tracks the current user selected that's writing the post
    const [userId, setUserId] = useState(null);

    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();

    /*
    - Our post submission function
    */
    const onSavePostClicked = () => {
        dispatch(postAdded(title, content, userId));
        setTitle("");
        setContent("");
    }


    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));


    // Only allow submission if title, content, and userId is defined
    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);


    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
      )
}