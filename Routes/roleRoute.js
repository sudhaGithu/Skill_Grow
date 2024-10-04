const express = require('express');
const router = express.Router();
const roleController = require('../Controllers/RolesControllers/roleController');
const moduleController = require('../Controllers/RolesControllers/masterModuleController')
const masterpermissionController = require('../Controllers/RolesControllers/masterPermissionsController')
const assignedpermissionsController = require('../Controllers/RolesControllers/assignedPermissionsController') 
const permissionController = require('../Controllers/RolesControllers/permissionController')
//const authentication = require('../middlewares/authenticate')


// Role Routes
router.post('/addroles', roleController.addRole);
router.put('/updaterole/:id', roleController.updateRole);
router.delete('/deleterole/:id', roleController.deleteRole);
router.get('/getallroles', roleController.getAllRole);
router.get('/getrole/:id',roleController.getRole);
router.patch('/restorerole/:id',roleController.restoreRole);

//master module Routes
router.post('/addmastermodule', moduleController.addmasterModule);
router.put('/updatemastermodule/:id', moduleController.updatemasterModule);
router.delete('/deletemastermodule/:id', moduleController.deletemasterModule);
router.get('/getallrmastermodule', moduleController.getallmasterModule);
router.get('/getmastermodule/:id',moduleController.getmasterModule);
router.patch('/restoremastermodule/:id',moduleController.restoremasterModule);

// master permissions Routes
router.post('/addmasterpermission', masterpermissionController.addPermission);
router.put('/updatemasterpermission/:id', masterpermissionController.updatePermission);
router.delete('/deletemasterpermission/:id', masterpermissionController.deletePermission);
router.get('/getallrmasterpermission', masterpermissionController.getAllPermission);
router.get('/getmasterpermission/:id',masterpermissionController.getPermission);
router.patch('/restoremastepermission/:id',masterpermissionController.restorePermission);

// permissions centers Routes
router.post('/addpermissioncenter',assignedpermissionsController.addpermissionsCenter);
router.put('/updatepermissioncenter/:id', assignedpermissionsController.updatepermissionsCenter);
router.delete('/deletepermissioncenter/:id', assignedpermissionsController.deletepermissionsCenter);
router.get('/getallpermissioncenter', assignedpermissionsController.getAllpermissionsCenter);
router.get('/getpermissioncenter/:id',assignedpermissionsController.getpermissionsCenter);
router.patch('/restorepermissioncenter/:id',assignedpermissionsController.restorepermissionsCenter);


// Permission Routes
router.post('/permissions', permissionController.addPermission);
router.put('/permissions/:id', permissionController.editPermission);
router.delete('/permissions/:id', permissionController.deletePermission);
router.get('/permissions', permissionController.getPermissions);
router.get('/permissions/:id', permissionController.getPermissionById);

module.exports = router;



//29