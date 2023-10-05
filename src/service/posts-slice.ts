import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";
import {postsApi, queryTypes} from "../api/posts.api";
import {Post} from "../api/type";
import {RootState} from "./store";

export const getPosts = createAppAsyncThunk(
    'weatherReducer/getWeather',
    async (_, {rejectWithValue, getState}) => {
        const _sort = getState().postsSlice.filters._sort
        const _order = getState().postsSlice.filters._order

        let q = getState().postsSlice.filters.q
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
    filters: queryTypes,
    postsPerPage: number,
}

const initialState: initStateType = {
    posts: [],
    filters: {
        q: null,
        _sort: null,
        _order: null,
    },
    postsPerPage: 10,

}

const slice = createSlice({
    name: 'postsSlice',
    initialState,
    reducers: {
        setSearchText(state, action: PayloadAction<string>) {
            state.filters.q = action.payload
        },
        setSortParams(state, action: PayloadAction<Omit<queryTypes, 'q'>>) {
            state.filters._sort = action.payload._sort
            state.filters._order = action.payload._order
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
export const selectSort = (state: RootState) => state.postsSlice.filters._sort
export const selectOrder = (state: RootState) => state.postsSlice.filters._order

export const selectTotalPages = createSelector(selectTotalPosts, selectPostsPerPage, (totalPosts, postsPerPage) => {
    return Math.ceil(totalPosts / postsPerPage)
})


export const {setSearchText, setSortParams} = slice.actions
export const postsReducer = slice.reducer




