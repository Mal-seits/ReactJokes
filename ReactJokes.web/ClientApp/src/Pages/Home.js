import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import getAxios from '../AuthAxios';

const Home = () => {
    const [joke, setJoke] = useState({});
    const { user } = useUserContext();
    const isLoggedIn = !!user;
    const [disableLikes, setDisableLikes] = useState(false);
    const [disableDislikes, setDisableDislikes] = useState(false);
  
    const getJokeFunc = async () => {

        const { data } = await getAxios().get('/api/jokes/getajoke');
        let jokeWithLikes = getJokeWithLikes(data);
        setJoke(jokeWithLikes);
        jokeWithLikes.likes > 0 ? setDisableLikes(true) : setDisableLikes(false);
        jokeWithLikes.dislikes > 0 ? setDisableDislikes(true) : setDisableDislikes(false);
        let ulj = data.userLikedJokes.find(u => u.jokeId == data.id);
        if (ulj !== undefined) {
            const {data : oneMinute} = await getAxios().get(`/api/jokes/isbeforeoneminute?date=${ulj.time}`);
            if(!oneMinute){
                setDisableDislikes(true);
                setDisableLikes(true);
            }
        }
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

    useEffect(() => {
        const getJoke = async () => {
            getJokeFunc();
        }
        getJoke();

    }, [])

    const onRefreshClick = async () => {
        getJokeFunc();
    }

    const onLikeClick = async () => {

        let userLikedJoke = {
            jokeId: joke.id,
            liked: true
        };
        addLikeOrDislike(userLikedJoke);
        setDisableLikes(true);
        setDisableDislikes(false);
    }

    const addLikeOrDislike = async (userLikedJoke) => {
        const { data } = await getAxios().post('/api/jokes/likeordislikeajoke', userLikedJoke);
        let jokeWithLikes = getJokeWithLikes(data);
        setJoke(jokeWithLikes);

    }

    const onDislikeClick = async () => {

        let userLikedJoke = {
            jokeId: joke.id,
            liked: false
        };
        addLikeOrDislike(userLikedJoke);
        setDisableDislikes(true);
        setDisableLikes(false);
    }


    return (
        <div className="col-md-6 offset-md-3 card card-body bg-light">
            <div>
                <h4>{joke.setup}</h4>
                <h4>{joke.punchline}</h4>
                <div>
                    {!isLoggedIn &&
                        <div>
                            <a href="/login">Want to like or dislike a joke? Login to your account here!</a>
                        </div>
                    }
                    {!!isLoggedIn &&

                        <div>
                            <button disabled={disableLikes} onClick={onLikeClick} className="btn btn-primary">Like</button>
                            <button disabled={disableDislikes} onClick={onDislikeClick} className="btn btn-danger">Dislike</button>
                        </div>
                    }
                    <br />
                    <h4>Likes: {!!joke && joke.likes}</h4>
                    <h4>Dislikes: {!!joke && joke.dislikes}</h4>
                    <h4><button onClick={onRefreshClick} className="btn btn-link">Refresh</button></h4>
                </div>
            </div>
        </div>
    )
}
export default Home;