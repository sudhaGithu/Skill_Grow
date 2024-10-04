const mongoose = require('mongoose');
const Admin = require('../Models/userModel');
const Role = require('../Models/Roles/roleModel')
const Permission = require('../Models/Roles/permission');
const MasterModule = require('../Models/Roles/masterModuleModel');
const MasterPermissions = require('../Models/Roles/modulePermissions');
const assignedPermissions = require('../Models/Roles/assignedPermissions');
const bcrypt = require('bcryptjs');

async function setupInitialData() {
  // Check if the SuperAdmin role exists
  let superAdminRole = await Role.findOne({ name: 'SuperAdmin' });
  if (!superAdminRole) {
    superAdminRole = new Role({ name: 'SuperAdmin' });
    await superAdminRole.save();
  }

  // Check if the SuperAdmin user exists
  let superAdmin = await Admin.findOne({ email: 'heshvithatech@gmail.com' });
  if (!superAdmin) {
    const hashedPassword = await bcrypt.hash('1234', 10);
    superAdmin = new Admin({
      fullName: 'heshvithatech',
      email: 'heshvithatech@gmail.com',
      password: hashedPassword,
      phoneNumber: '1234567890',
      role: superAdminRole._id,
    });
    await superAdmin.save();
  }

  // // Define permissions
  // const permissions = ['Create', 'Read', 'Update', 'Delete'];
  // for (const perm of permissions) {
  //   let permission = await Permission.findOne({ name: perm });
  //   if (!permission) {
  //     permission = new Permission({ name: perm });
  //     await permission.save();
  //   }
  // }

  // // Define master modules
  // const modules = [
  //   'Bed Manager',
  //   'Billing Management',
  //   'Inventory Management',
  //   'Pharmacy Management',
  //   'Schedule',
  //   'Admin',
  //   'IVF Centers',
  //   'Customers',
  //   'Employees',
  //   'Treatments',
  //   'Insurance',
  //   'Bookings'
  // ];
  // for (const moduleName of modules) {
  //   let module = await MasterModule.findOne({ modulename: moduleName });
  //   if (!module) {
  //     module = new MasterModule({ modulename: moduleName });
  //     await module.save();
  //   }
  // }

  // // Assign permissions to modules
  // for (const moduleName of modules) {
  //   const module = await MasterModule.findOne({ modulename: moduleName });
  //   if (module) {
  //     const modulePermissions = await Permission.find();
  //     let masterPermission = await MasterPermissions.findOne({ moduleId: module._id });
  //     if (!masterPermission) {
  //       masterPermission = new MasterPermissions({
  //         moduleId: module._id,
  //         permissions: modulePermissions.map(p => p._id)
  //       });
  //       await masterPermission.save();
  //     }
  //   }
  // }

  //   // Create CenterAdminModule
  //   const assignedPermission = await assignedPermissions.findOne({ adminId: superAdmin._id });
  //   const adminId = superAdmin._id
  //   if (!assignedPermission) {

  //       // Retrieve all modules and permissions from the database
  //       const modules = await MasterModule.find().exec();
  //       const permissions = await Permission.find().exec();
  //       // Ensure we have modules and permissions
  //       if (!modules.length || !permissions.length) {
  //           return res.status(404).json({ error: 'No modules or permissions found' });
  //       }

  //       // Map permissions to their IDs for easy lookup
  //       const permissionMap = permissions.reduce((map, permission) => {
  //           map[permission._id] = permission._id;
  //           return map;
  //       }, {});

  //       // Construct modulePermissions array
  //       const modulePermissions = modules.map(module => {
  //           // For simplicity, assume each module should get all permissions
  //           const modulePermission = {
  //               moduleId: module._id,
  //               permissions: permissions.map(permission => permission._id)
  //           };
  //           return modulePermission;
  //       });


  //       // Create and save the CenterAdminModule document
  //       const newAssignedPermissions = new assignedPermissions({
  //           adminId,
  //           modulePermissions
  //       });

  //       await newAssignedPermissions.save();
        //res.status(201).json({ message: 'CenterAdminModule created successfully', data: newCenterAdminModule });


    // } else {
    //   console.log('permissions for superAdmin already exists for SuperAdmin:', assignedPermission);
    // }

  console.log('Setup completed successfully');
}

module.exports = setupInitialData;
