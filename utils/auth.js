const config = require("../config/config");
const User = require("../models/userModel");
const { createCustomer, stripe } = require("../services/paymentService");
const { getCookie } = require("./cookies");
const jwt = require("jsonwebtoken");
const { getDateInfo, strDate, dateFromStamp } = require("./date");

async function authUser(req, tk = "") {
    if (tk == undefined) {
        return null;
    }
    const token = tk.trim() === "" ? getCookie(req, "_tk") : tk;

    if (!token) {
        return null;
    }
    try {
        const decoded = await jwt.verify(token, config.jwtSecret);
        req.headers.authorization = token;
        req.user = decoded;
        const user = await User.findById(req.user.userId);
        if (!user) return null;


        var stripeId = user.stripeId ?? (await createCustomer(user)).id;
        const subscriptions = (await stripe.subscriptions.list({
            customer: stripeId
        })).data;

        const actives = subscriptions.filter(sub => sub.status === "active");

        const attributes = { ...user._doc };

        for (const sub of actives) {
            const sub_items = sub.items.data;
            for (const item of sub_items) {
                const price = item.price.id;
                if (price === config.stripePriceID || price === config.stripePremiumPriceID) {

                    attributes.currentSub = sub;
                    attributes.hasActiveSubscriptions = true;
                    attributes.isPremium = price === config.stripePremiumPriceID;



                    attributes.subName = price === config.stripePremiumPriceID ? "Plan PREMIUM" : "Plan STANDARD";

                    const subEndTimestamp = sub.current_period_end * 1000
                    const subStartTimestamp = sub.current_period_start * 1000
                    attributes.subEnd = {
                        strFull: strDate(subEndTimestamp, true, true),
                        strDate: strDate(subEndTimestamp),
                        strDateWithDay: strDate(subEndTimestamp, true),
                        strDateWithTime: strDate(subEndTimestamp, false, true),
                        date: dateFromStamp(subEndTimestamp)
                    };
                    attributes.subStart = {
                        strFull: strDate(subStartTimestamp, true, true),
                        strDate: strDate(subStartTimestamp),
                        strDateWithDay: strDate(subStartTimestamp, true),
                        strDateWithTime: strDate(subStartTimestamp, false, true),
                        date: dateFromStamp(subStartTimestamp)
                    };



                    return {
                        ...attributes,
                        model: user,
                    };
                }
            }
        }

        attributes.hasActiveSubscriptions = false;
        return{...attributes,model: user};
    } catch (err) {
        return null;
    }
}

module.exports = authUser;