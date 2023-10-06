import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";
import {postsApi, queryTypes} from "../api/posts.api";
import {Post} from "../api/type";
import {RootState} from "./store";

export const getPosts = createAppAsyncThunk(
    'weatherReducer/getWeather',
    async (_, {rejectWithValue, getState}) => {
        const _sort = getState().postsSlice.queries._sort
        const _order = getState().postsSlice.queries._order

        let q = getState().postsSlice.queries.q
        if (q === '') q = null

        try {
            const res = await postsApi.getPosts({q, _sort, _order})
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }


    }
)

type initStateType = {
    posts: Post[]
    queries: queryTypes,
    postsPerPage: number,
    page: number,
}

const initialState: initStateType = {
    posts: [],
    queries: {
        q: null,
        _sort: null,
        _order: null,
    },
    postsPerPage: 10,
    page: 1,

}

const slice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            state.queries.q = action.payload
        },
        setSortParams(state, action: PayloadAction<Omit<queryTypes, 'q'>>) {
            state.queries._sort = action.payload._sort
            state.queries._order = action.payload._order
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }

})

export const selectTotalPosts = (state: RootState) => state.postsSlice.posts.length
export const selectPosts = (state: RootState) => state.postsSlice.posts
export const selectPostsPerPage = (state: RootState) => state.postsSlice.postsPerPage
export const selectSort = (state: RootState) => state.postsSlice.queries._sort
export const selectOrder = (state: RootState) => state.postsSlice.queries._order
export const selectPage = (state: RootState) => state.postsSlice.page

export const selectTotalPages = createSelector(selectTotalPosts, selectPostsPerPage, (totalPosts, postsPerPage) => {
    return Math.ceil(totalPosts / postsPerPage)
})


export const {setSearchText, setSortParams, setPage} = slice.actions
export const postsReducer = slice.reducer




