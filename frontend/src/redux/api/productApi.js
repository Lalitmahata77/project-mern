import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const productApi = createApi({
    reducerPath : "productApi",
    baseQuery : fetchBaseQuery({baseUrl : "/api/v1"}),
    tagTypes : ["Product"],
    endpoints : (builder)=>({
        getProducts : builder.query({
            query : (params) => ({
                url : "/products",
                params : {
                    page : params?.page,
                    keyword : params?.keyword,
                    category : params?.category,
                    "price[gte]" : params.min,
                    "price[lte]" : params.max,
                    "ratings[gte" : params.ratings
                }
            })
        }),
        getProductsDetails : builder.query({
            query : (id) => `/products/${id}`,
            providesTags : ["Product"]
        }),
        submitRating : builder.mutation({
            query(body){
                return{
                    url : "/reviews",
                    method : "POST",
                    body
                }
            },
            invalidatesTags : ["Product"]
        }),
        canUserReview : builder.query({
            query :(productId) => `/can_review/?productId=${productId}`
        })
    })
})

export const {useGetProductsQuery, useGetProductsDetailsQuery, useSubmitRatingMutation, useCanUserReviewQuery} = productApi;