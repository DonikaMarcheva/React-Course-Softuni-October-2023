import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as gameService from "../../services/gameService.js"
import * as commentService from "../../services/commentService.js"

export default function GameDetails () {
    const [game,setGame] = useState({});
    const [comments, setComments] =useState([])
    const {gameId} = useParams();    

    useEffect(()=>{
        gameService.getOne(gameId)
        .then(setGame)

        commentService.getAll()
        .then(setComments)
    },[gameId])
    const addCommentHandler=async(e) =>{
        e.preventDefault();
        const formData=new FormData(e.currentTarget);
        const newComment= await commentService.create(
            gameId,
            formData.get('username'),
            formData.get('comment')
            );
            setComments(state=>[...state,newComment])
        }


    return (
        <section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">

            <div className="game-header">
                <img className="game-img" src={game.imageUrl} />
                <h1>{game.title}</h1>
                <span className="levels">MaxLevel: {game.maxLevel}</span>
                <p className="type">{game.category}</p>
            </div>

            <p className="text">
                {game.summary}
            </p>

            {/* <!-- Bonus ( for Guests and Users ) --> */}
            <div className="details-comments">
                <h2>Comments:</h2>
                <ul>
                    {/* <!-- list all comments for current game (If any) --> */}
                        {comments.map(({ _id, username, text }) => (
                            <li key={_id} className="comment">
                                <p>{username}: {text}</p>
                            </li>
                        ))}
                    {/* <li className="comment">
                        <p>Content: I rate this one quite highly.</p>
                    </li> */}

                </ul>
                {/* <!-- Display paragraph: If there are no games in the database --> */}
                    {comments.length===0 && <p className="no-comment">No comments.</p>}
                {/* <p className="no-comment">No comments.</p> */}
            </div>

            {/* <!-- Edit/Delete buttons ( Only for creator of this game )  -->
            <div className="buttons">
                <a href="#" className="button">Edit</a>
                <a href="#" className="button">Delete</a>
            </div> */}
        </div>

        {/* <!-- Bonus --> */}
        {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={addCommentHandler}>
                <input type="text" name="userName" placeholder="userName"/>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input className="btn submit" type="submit" value="Add Comment"/>
            </form>
        </article>

    </section>
    );
}