const apiUrl = 'http://localhost:5000/post/';

export const selectPostList = async (authorId: string) => {
    let result = { message: '', result: [{ postId: 0, title: '', content: '', checked: false }]};
    await fetch(apiUrl + '/list/' + authorId + '/', {
        method: 'GET',
    }).then(res => res.json()).then((data) => { result = data });
    if(result.result) {
        return { test: true, result: result.result};
    } 
    return { test: false, result: null}
}

export const insertPost = async (content: string, authorId: string) => {
    let result = { message: '', result: { postId: 0 }};
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: `{"content": "${content}", "authorId": "${authorId}"}`,
    }).then(res => res.json()).then((data) => { result = data });
}

export const updatePostCheck = async (postId: number, checked: boolean) => {
    let result = { message: '', result: { postId: 0, checked: false }};
    await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: `{"postId": ${postId}, "checked": ${!checked}}`,
    }).then(res => res.json()).then((data) => { result = data });
}

export const deletePost = async (postId: number) => {
    let result = { message: '', result: { postId: 0 }};
    await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: `{"postId": ${postId}}`,
    }).then(res => res.json()).then((data) => { result = data });
}