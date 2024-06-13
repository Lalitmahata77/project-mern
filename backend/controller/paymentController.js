import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


export const stripeCheckOutSession = catchAsycnError(async(req, res, next)=>{
    const body = req.body
    const shippingInfo = body.shippingInfo
    const line_items = body.orderItems.map((item)=>{
        return{
            price_data : {
                currency : "usd",
                product_data : {
                    name : item?.name,
                    images : [item?.image],
                    metadata : {productId : item?.product}
                },
                unit_price : item?.price * 100
            },
            tax_rates : ["txr_1PQv7AFFaZXzAW9XkdvGUt75"],
            quantity : item?.quantity
        }
    })
    const shipping_rate = body?.itemsPrice >= 200 ? "shr_1PQutyFFaZXzAW9XCJy6arPE" : "shr_1PQuvBFFaZXzAW9XgwCaU2vf";

    const session =await stripe.checkout.sessions.create({
        payment_method_type : ["Card"],
        success_url : `${process.env.FRONTEND_URL}/me/order`,
        cancel_url : `${process.env.FRONTEND_URL}`,
        coustomer_email : req?.user.email,
        client_reference_id : req?.user.id?.toString(),
        mode : "payment",
        metadata : {...shippingInfo, itemsPrice : body.itemsPrice},
        shipping_option : [
            {
                shipping_rate
            }
        ],
        line_items
    })
    res.status(200).json({
        url : session.url
    })
})