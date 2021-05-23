import React, { useState, useEffect } from 'react';
import getAxios from '../AuthAxios';

const ViewAll = () => {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        const getJokes = async () => {
            const { data } = await getAxios().get('/api/jokes/getalljokes');
            setJokes(data);
        }
        getJokes();
    }, [])
    const createJokeHTML = jokeWithoutLikes => {
        let joke = getJokeWithLikes(jokeWithoutLikes);
        return (
            <div className="card card-body bg-light mb-3">
                <h5>{joke.setup}</h5>
                <h5>{joke.punchline}</h5>
                <span>Likes: {joke.likes}</span>
                <br />
                <span>Dislikes: {joke.dislikes}</span>
            </div>)
    }
    const getJokeWithLikes = data => {

        let jokeWithLikes = {
            id: data.id,
            setup: data.setup,
            punchline: data.punchline,
            likes: data.userLikedJokes.filter(ulj => ulj.liked === true).length,
            dislikes: data.userLikedJokes.filter(ulj => ulj.liked !== true).length
        };
        return jokeWithLikes;
    }

    return (
        <>
            {jokes && jokes.map(j => createJokeHTML(j))}
        </>
    )

}
export default ViewAll;