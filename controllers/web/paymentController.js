const authUser = require('../../utils/auth');
const ROUTES = require("../../routes/routes");
const { stripe } = require('../../services/paymentService');
const config = require('../../config/config');




exports.index = async (req, res) => {
  try {
    const isPremium = req.body.o == "1";

    const user = await authUser(req);
    if (user.hasActiveSubscriptions) {
      res.redirect("back");
    }
    const redirect = req.body.redirect || "index";
    var session = await stripe.checkout.sessions.create({
      customer: user.stripeId,
      billing_address_collection: 'auto',
      shipping_address_collection: {
      },
      line_items: [
        {

          price: isPremium ? config.stripePremiumPriceID : config.stripePriceID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: req.protocol + '://' + req.get('host') + ROUTES.CHECKOUT_SUCCESS + "?redirect=" + redirect,
      cancel_url: req.protocol + '://' + req.get('host') + ROUTES.CHECKOUT_CANCEL + "?redirect=" + redirect,
    });

    res.redirect(303, session.url);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.success = async (req, res) => {
  try {
    const user = await authUser(req);
    const redirect = req.query.redirect || "index";
    res.render(redirect, { user, checkoutSuccess: true, redirect_url: redirect == "index" ? "/" : ("/" + redirect) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cancel = async (req, res) => {
  try {
    const user = await authUser(req);
    const redirect = req.query.redirect || "index";
    res.render(redirect, { user, checkoutCancel: true, redirect_url: redirect == "index" ? "/" : ("/" + redirect) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.revoke = async (req, res) => {
  try {
    const user = await authUser(req);
    await stripe.subscriptions.cancel(user.currentSub.id);
    res.redirect("back");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}