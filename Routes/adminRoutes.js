const express = require('express');
const router = express.Router();

const { upload } = require('../Middlewares/fileupload')


const userController = require('../Controllers/userController')
const courseController = require('../Controllers/courseControler');
const termsAndConditionsController = require('../Controllers/termsAndConditionsController');
const privacypolicyController = require('../Controllers/privacyPolicyController');
// const purchaseController = require('../controllers/purchaseControllerr');
// const itemController = require('../controllers/itemController');
// const CenterController = require('../Controllers/centerController')
// const salesController = require('../controllers/salesController')




// User routes
router.post('/users/create',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'idProof', maxCount: 1 }]), userController.createUser)
router.get('/users/getall',userController.getallUsers)
router.get('/users/get/:id', userController.getUserById)
router.put('/users/status/:id', userController.userStatus)
router.put('/users/delete/:id', userController.deleteUserById)
router.post('/users/update/:id',userController.updateUserById)
router.post('/users/userlogin',userController.loginUser)
router.get('/users/instructor/getall',userController.getInstructors)
//router.post('/users/adminlogin',userController.loginUser)
//router.post('/users/employeelogin',userController.loginUser)


// Routes for course
router.post('/course/create', courseController.createCourse);
router.get('/course/getall', courseController.getCourses);
router.get('/course/get/:id', courseController.getCourse)
router.get('/course/filter/get', courseController.getCoursesfilter);
router.put('/course/update/:id', courseController.updateCourse);
router.delete('/course/delete/:id', courseController.deleteCourse);

// Routes for terms and conditions
router.post('/terms&conditions/add', termsAndConditionsController.createTermsAndConditions);
router.get('/terms&conditions/get/:id', termsAndConditionsController.getTermsAndCondition);
router.get('/terms&conditions/getall', termsAndConditionsController.getTermsAndConditions);
router.put('/terms&conditions/update/:id', termsAndConditionsController.updateTermsAndConditions);
router.delete('/terms&conditions/delete/:id', termsAndConditionsController.deleteTermsAndConditions);

// Routes for privacy policy
router.post('/privacypolicy/add', privacypolicyController.createPrivacyPolicy);
router.get('/privacypolicy/getall', privacypolicyController.getPrivacyPolicies);
router.get('/privacypolicy/get/:id', privacypolicyController.getPrivacyPolicy);
router.put('/privacypolicy/update/:id', privacypolicyController.updatePrivacyPolicy);
router.delete('/privacypolicy/delete/:id', privacypolicyController.deletePrivacyPolicy);



// // Routes purchase
// router.post('/recordPurchase', purchaseController.addPurchase);
// router.get('/getAllPurchases', purchaseController.getAllPurchases);
// router.get('/getPurchaseById/:id', purchaseController.getPurchaseById);
// router.put('/updatePurchaseById/:id', purchaseController.updatePurchaseById);
// router.delete('/deletePurchaseById/:id', purchaseController.deletePurchaseById);

// //Routes for items
// router.post('/items/add', itemController.addItem);
// router.get('/items/getall', itemController.getItems);


// // Routes for Center
// router.post('/center/add', CenterController.addCenter);
// router.get('/center/getall', CenterController.getCenters);
// router.get('/center/get/:id', CenterController.getCenter);
// router.put('/center/update/:id', CenterController.updateCenter);
// router.delete('/center/delete/:id', CenterController.deleteCenter);


// // routes for sales 
// router.post('/sales/add', salesController.addSale);
// router.get('/sales/getall', salesController.getSale);
// router.get('/sales/get/:id', salesController.getSales);
// router.get('/sales/get/:centerId', salesController.getSaleBasedOnCenter);


module.exports = router