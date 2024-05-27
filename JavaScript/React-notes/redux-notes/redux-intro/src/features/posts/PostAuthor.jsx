import {useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice";

/*
- We store the author of a post with just their 
userId. So to get stuff like the user object, we'll
use state and finding.

*/
export default function PostAuthor({userId}) {
    const users = useSelector(selectAllUsers);

    const author = users.find(user => user.id === userId);

    return (
        <span>by {author ? author.name : "Unknown Author"}</span>
    )
}