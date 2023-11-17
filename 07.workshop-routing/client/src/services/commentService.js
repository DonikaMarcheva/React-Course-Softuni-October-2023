import * as request from "../lib/request.js"

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export const getAll =async () =>{
    const result = await request.get(baseUrl);

    return Object.values(result);
}

export const create = async (gameId, userName, text) => {
    const newComment = await request.post(baseUrl,{
        gameId,
        userName,
        text
    })
    return newComment
}