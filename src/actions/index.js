import jsonPlaceholder from '../api/jsonPlaceHolder';
import _ from 'lodash';
//Defining a function that is going to return a function
export const fetchPostsAndUsers = ()=> async(dispatch, getState)=>{
 //console.log('befer posts');
 await dispatch(fetchPosts());
 //console.log(getState().posts);
 const userIds = _.uniq(_.map(getState().posts, 'userId'));
 console.log(userIds);
 userIds.forEach(id => dispatch(fetchUser(id)));

}
export const fetchPosts =() => async dispatch=>{
        const response = await jsonPlaceholder.get('./posts');
        dispatch({type: 'FETCH_POSTS', payload:response.data})
    };

export const fetchUser = id => async dispatch =>{
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type:'FETCH_USER', payload:response.data});
}
/* export const fetchUser = id=>dispatch =>_fetchUser(id,dispatch);
const _fetchUser = _.memoize(async (id,dispatch)=>{
    const response = await jsonPlaceholder.get(`./users/${id}`);
    dispatch({type: 'FETCH_USER', payload : response.data})
}); */
