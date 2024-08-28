const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/web/homeController");
const ROUTES = require("../routes");
const webAuthMiddleware = require("../../middlewares/web/authMiddleware");
const loginController = require("../../controllers/web/loginController");
const logoutController = require("../../controllers/web/logoutController");
const registerController = require("../../controllers/web/registerController");
const paymentController = require("../../controllers/web/paymentController");
const preventLogin = require("../../middlewares/web/preventLogin");
const profileController = require("../../controllers/web/profileController");


router.get(ROUTES.BASE, homeController.index);
router.get(ROUTES.LOGIN, preventLogin, loginController.index);
router.get(ROUTES.LOGOUT, logoutController.index);
router.get(ROUTES.REGISTER, preventLogin, registerController.index);


router.post(ROUTES.FORM_CONTACT, homeController.formContact);


router.post(ROUTES.LOGIN, loginController.post);
router.post(ROUTES.REGISTER, registerController.post);

router.get(ROUTES.CHECKOUT_SUCCESS, webAuthMiddleware, paymentController.success);
router.get(ROUTES.CHECKOUT_CANCEL, webAuthMiddleware, paymentController.cancel);
router.post(ROUTES.CHECKOUT, webAuthMiddleware, paymentController.index);
router.post(ROUTES.REVOKE_SUB, webAuthMiddleware, paymentController.revoke);

router.get(ROUTES.PROFILE, webAuthMiddleware, profileController.index);
router.post(ROUTES.PROFILE, webAuthMiddleware, profileController.updateUser);


module.exports = router;
