import express from "express";
import upload from "../middleware/image.js";
import { isAuth, isSeller, isAdmin } from "../utils.js";
import expressAsyncHandler from "express-async-handler";
import CategoryMaster from "../Models/categoryMasterModel.js";
const categoryMasterRouter = express.Router();
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import subCategoryMaster from "../Models/categorysubMasterModel.js";
import ThirdCategoryMaster from "../Models/categoryThirdModel.js";
import FourthCategoryMaster from "../Models/categoryFourthModel.js";

// categoryMasterRouter.post(
//   "/",
//   isAuth,
//   upload.single("coverimg"),
//   async (req, res) => {
//     console.log("req=================================", req.body);
//     if (req.body.parent == "undefined") {
//       const categories = new CategoryMaster({
//         name: req.body.name,
//         checked: req.body.checked,
//         parent: req.body.parent,
//         description: req.body.description,
//       });
//       const CategoryMasteruploaded = await categories.save();

//       res.send({
//         message: "Category created",
//         categorymaster: CategoryMasteruploaded,
//       });
//     } else {
//       let categoryParenttest = await CategoryMaster.findById(req.body.parent);
//       if (categoryParenttest) {
//         const categories = new CategoryMaster({
//           name: req.body.name,
//           checked: req.body.checked,
//           parent: req.body.parent,
//           description: req.body.description,
//         });

//         categoryParenttest.children.push(categories);
//         const CategoryMasteruploaded = await categoryParenttest.save();
//       } else {
//         if (req.body.childname === "child-1") {
//           const categories = new CategoryMaster({
//             name: req.body.name,
//             checked: req.body.checked,
//             parent: req.body.parent,
//             parentId: req.body.parentId,
//             description: req.body.description,
//           });
//           let ones = req.body.childIndex;
//           let item = await CategoryMaster.update(
//             { _id: req.body.parentId },
//             {
//               $push: {
//                 ["children." + ones + ".children"]: categories,
//               },
//             }
//           );
//         } else if (req.body.childname === "child-2") {
//           const categories = new CategoryMaster({
//             name: req.body.name,
//             checked: req.body.checked,
//             parent: req.body.parent,
//             parentId: req.body.parentId,
//             description: req.body.description,
//           });
//           let child1 = req.body.child1;
//           let test = req.body.childIndex;
//           let item = await CategoryMaster.update(
//             { _id: req.body.parentId },
//             {
//               $push: {
//                 // "children.$[].children.2.children": categories,
//                 ["children." + child1 + ".children." + test + ".children"]:
//                   categories,
//               },
//             }
//           );
//         } else if (req.body.childname === "child-3") {
//           const categories = new CategoryMaster({
//             name: req.body.name,
//             checked: req.body.checked,
//             parent: req.body.parent,
//             parentId: req.body.parentId,
//             description: req.body.description,
//           });
//           let child1 = req.body.child1;
//           let childs2 = req.body.child2;
//           let childindex = req.body.childIndex;
//           let item = await CategoryMaster.update(
//             { _id: req.body.parentId },
//             {
//               $push: {
//                 ["children." +
//                   child1 +
//                   ".children." +
//                   childs2 +
//                   ".children." +
//                   childindex +
//                   ".children"]: categories,
//               },
//             }
//           );
//         } else if (req.body.childname === "child-4") {
//           const categories = new CategoryMaster({
//             name: req.body.name,
//             checked: req.body.checked,
//             parent: req.body.parent,
//             parentId: req.body.parentId,
//             description: req.body.description,
//           });
//           let child1 = req.body.child1;
//           let childs2 = req.body.child2;
//           let childs3 = req.body.child3;
//           let childindex = req.body.childIndex;
//           let item = await CategoryMaster.update(
//             { _id: req.body.parentId },
//             {
//               $push: {
//                 ["children." +
//                   child1 +
//                   ".children." +
//                   childs2 +
//                   ".children." +
//                   childs3 +
//                   ".children." +
//                   childindex +
//                   ".children"]: categories,
//               },
//             }
//           );
//         } else if (req.body.childname === "child-5") {
//           const categories = new CategoryMaster({
//             name: req.body.name,
//             checked: req.body.checked,
//             parent: req.body.parent,
//             parentId: req.body.parentId,
//             description: req.body.description,
//           });
//           let child1 = req.body.child1;
//           let childs2 = req.body.child2;
//           let childs3 = req.body.child3;
//           let childs4 = req.body.child4;
//           let childindex = req.body.childIndex;
//           let item = await CategoryMaster.update(
//             { _id: req.body.parentId },
//             {
//               $push: {
//                 ["children." +
//                   child1 +
//                   ".children." +
//                   childs2 +
//                   ".children." +
//                   childs3 +
//                   ".children." +
//                   childs4 +
//                   ".children." +
//                   childindex +
//                   ".children"]: categories,
//               },
//             }
//           );
//         } else if (req.body.childname === "child-6") {
//           const categories = new CategoryMaster({
//             name: req.body.name,
//             checked: req.body.checked,
//             parent: req.body.parent,
//             parentId: req.body.parentId,
//             description: req.body.description,
//           });
//           let child1 = req.body.child1;
//           let childs2 = req.body.child2;
//           let childs3 = req.body.child3;
//           let childs4 = req.body.child4;
//           let childs5 = req.body.child5;
//           let childindex = req.body.childIndex;
//           let item = await CategoryMaster.update(
//             { _id: req.body.parentId },
//             {
//               $push: {
//                 ["children." +
//                   child1 +
//                   ".children." +
//                   childs2 +
//                   ".children." +
//                   childs3 +
//                   ".children." +
//                   childs4 +
//                   ".children." +
//                   childs5 +
//                   ".children." +
//                   childindex +
//                   ".children"]: categories,
//               },
//             }
//           );
//         } else if (req.body.childname === "child-7") {
//           const categories = new CategoryMaster({
//             name: req.body.name,
//             checked: req.body.checked,
//             parent: req.body.parent,
//             parentId: req.body.parentId,
//             description: req.body.description,
//           });
//           let child1 = req.body.child1;
//           let childs2 = req.body.child2;
//           let childs3 = req.body.child3;
//           let childs4 = req.body.child4;
//           let childs5 = req.body.child5;
//           let childs6 = req.body.child6;
//           let childindex = req.body.childIndex;

//           let item = await CategoryMaster.update(
//             { _id: req.body.parentId },
//             {
//               $push: {
//                 ["children." +
//                   child1 +
//                   ".children." +
//                   childs2 +
//                   ".children." +
//                   childs3 +
//                   ".children." +
//                   childs4 +
//                   ".children." +
//                   childs5 +
//                   ".children." +
//                   childs6 +
//                   ".children." +
//                   childindex +
//                   ".children"]: categories,
//               },
//             }
//           );
//         } else if (req.body.childname === "child-8") {
//           const categories = new CategoryMaster({
//             name: req.body.name,
//             checked: req.body.checked,
//             parent: req.body.parent,
//             parentId: req.body.parentId,
//             description: req.body.description,
//           });
//           let child1 = req.body.child1;
//           let childs2 = req.body.child2;
//           let childs3 = req.body.child3;
//           let childs4 = req.body.child4;
//           let childs5 = req.body.child5;
//           let childs6 = req.body.child6;
//           let childs7 = req.body.child7;
//           let childindex = req.body.childIndex;
//           let item = await CategoryMaster.update(
//             { _id: req.body.parentId },
//             {
//               $push: {
//                 ["children." +
//                   child1 +
//                   ".children." +
//                   childs2 +
//                   ".children." +
//                   childs3 +
//                   ".children." +
//                   childs4 +
//                   ".children." +
//                   childs5 +
//                   ".children." +
//                   childs6 +
//                   ".children." +
//                   childs7 +
//                   ".children." +
//                   childindex +
//                   ".children"]: categories,
//               },
//             }
//           );
//         }
//   if(parentId && "chid1"){
//     const categories = new CategoryMaster({
//       name: req.body.name,
//       checked: req.body.checked,
//       parent: req.body.parent,
//       description: req.body.description,
//     });
//     let item = await   CategoryMaster.update({_id: "64ad482afee1acf22289af55", }, {
//       '$push': {
//          "children": categories
//       }
//     });
//   }

//   let item = await   CategoryMaster.update({_id: "64ad482afee1acf22289af55", }, {
//     '$push': {
//        "children.$[].children.$[].children.$[].children.$[].children": categories
//     }
//   });
//   }
// }

// // var descendants = [];
// // var stack = [];
// let item = await CategoryMaster.update(
//   {
//     _id: "6437c972011fdc5ad767775b",
//     "children._id": "6437c972011fdc5ad767775b",
//   },
//   {
//     $push: {
//       "children.$.children": { name: "test item name" },
//     },
//   }
// );

// console.log("item---------->>", item);
// stack.push(item);
// while (stack.length > 0) {
//   var currentnode = stack.pop();
//   var children = db.users.find({ userparentid: currentnode.username });
//   while (true === children.hasNext()) {
//     var child = children.next();
//     descendants.push(child.username);
//     stack.push(child);
//   }
// }
// descendants.join(",");
// const CategoryMasteruploaded = await categories.save();
// console.log(req);
// let categoryParent;
// if (req.body.parent != "home" && req.body.parent != "undefined") {
//   categoryParent = await CategoryMaster.findById(req.body.parent);
//   if (categoryParent) {
//     if (req.file === undefined) {
//       const subcategory = new subCategoryMaster({
//         name: req.body.name,
//         checked: req.body.checked,
//         parent: req.body.parent,
//         description: req.body.description,
//       });
//       const updatedsubcategory = await subcategory.save();
//       categoryParent.children.push(updatedsubcategory);
//       const updatedCategory = await categoryParent.save();
//       res.status(201).send({
//         message: "Category Added",
//         categorymaster: updatedCategory,
//       });
//     } else {
//       const subcategory = new subCategoryMaster({
//         name: req.body.name,
//         checked: req.body.checked,
//         parent: req.body.parent,
//         description: req.body.description,
//         coverimg: req.file.filename,
//       });
//       const updatedsubcategory = await subcategory.save();
//       categoryParent.children.push(updatedsubcategory);
//       const updatedCategory = await categoryParent.save();
//       res.status(201).send({
//         message: "Category Added",
//         categorymaster: updatedCategory,
//       });
//     }
//   } else {
//     const categoryChild = await subCategoryMaster.findById(req.body.parent);
//     if (categoryChild) {
//       if (req.file === undefined) {
//         const categoryParent = await CategoryMaster.findById({
//           _id: categoryChild.parent,
//         });
//         const thirdcategory = new ThirdCategoryMaster({
//           name: req.body.name,
//           checked: req.body.checked,
//           parent: req.body.parent,
//           description: req.body.description,
//         });

//         let garanChildUpdate = CategoryMaster.updateOne(
//           {
//             _id: categoryChild.parent,
//             "children._id": categoryChild._id,
//           },
//           {
//             $push: { "children.$.children": thirdcategory },
//           },
//           { new: true }
//         );

//         await garanChildUpdate;
//         const CategoryGrandChild = await thirdcategory.save();
//         categoryChild.children.push(CategoryGrandChild);
//         const updatedCategory = await categoryChild.save();
//         res.status(201).send({
//           message: "Category Added",
//           categorymaster: updatedCategory,
//         });
//       } else {
//         const categoryParent = await CategoryMaster.findById({
//           _id: categoryChild.parent,
//         });
//         const thirdcategory = new ThirdCategoryMaster({
//           name: req.body.name,
//           checked: req.body.checked,
//           parent: req.body.parent,
//           description: req.body.description,
//           coverimg: req.file.filename,
//         });

//         let garanChildUpdate = CategoryMaster.updateOne(
//           {
//             _id: categoryChild.parent,
//             "children._id": categoryChild._id,
//           },
//           {
//             $push: { "children.$.children": thirdcategory },
//           },
//           { new: true }
//         );

//         await garanChildUpdate;
//         const CategoryGrandChild = await thirdcategory.save();
//         categoryChild.children.push(CategoryGrandChild);
//         const updatedCategory = await categoryChild.save();
//         res.status(201).send({
//           message: "Category Added",
//           categorymaster: updatedCategory,
//         });
//       }
//     } else {
//       const categorygrandChild = await ThirdCategoryMaster.findById(
//         req.body.parent
//       );
//       const categoryChild = await subCategoryMaster.findById({
//         _id: categorygrandChild.parent,
//       });
//       const categoryParent = await CategoryMaster.findById({
//         _id: categoryChild.parent,
//       });
//       if (categorygrandChild) {
//         const fourthcategory = new FourthCategoryMaster({
//           name: req.body.name,
//           checked: req.body.checked,
//           parent: req.body.parent,
//           description: req.body.description,
//           coverimg: req.file.filename,
//         });

//         let userChatGroupUpdate = CategoryMaster.updateOne(
//           {
//             _id: categoryChild.parent,
//             "children._id": categorygrandChild.parent,
//             "children._id": categorygrandChild._id,
//           },
//           {
//             $push: { "children.$[].children": fourthcategory },
//           },
//           { new: true }
//         );
//         await userChatGroupUpdate;
//       }
//     }
//   }
// } else {
//   if (req.file === undefined) {
//     const categories = new CategoryMaster({
//       name: req.body.name,
//       checked: req.body.checked,
//       parent: req.body.parent,
//       description: req.body.description,
//     });
//     const CategoryMasteruploaded = await categories.save();

//     res.send({
//       message: "Category created",
//       categorymaster: CategoryMasteruploaded,
//     });
//   } else {
//     const categories = new CategoryMaster({
//       name: req.body.name,
//       checked: req.body.checked,
//       parent: req.body.parent,
//       description: req.body.description,
//       coverimg: req.file.filename,
//     });
//     const CategoryMasteruploaded = await categories.save();

//     res.send({
//       message: "Category created",
//       categorymaster: CategoryMasteruploaded,
//     });
//   }
// }
//   }
// );

// categoryMasterRouter.get(
//   '/categorymasterList',
//   expressAsyncHandler(async (req, res) => {
//     const categorymaster = await CategoryMaster.find();
//     if (categorymaster) {
//       res.send(categorymaster);
//     } else {
//       res.status(404).send({ message: 'Category Not Found' });
//     }
//   })
// );

categoryMasterRouter.post(
  "/",
  isAuth,
  upload.single("coverimg"),
  async (req, res) => {
    // console.log("req----------------------------", req);
    let categoryParent;
    if (req.body.parent != "home" && req.body.parent != "undefined") {
      categoryParent = await CategoryMaster.findById(req.body.parent);
      if (categoryParent) {
        if (req.file === undefined) {
          const subcategory = new subCategoryMaster({
            name: req.body.name,
            checked: req.body.checked,
            parent: req.body.parent,
            description: req.body.description,
          });
          const updatedsubcategory = await subcategory.save();
          categoryParent.children.push(updatedsubcategory);
          const updatedCategory = await categoryParent.save();
          res.status(201).send({
            message: "Category Added",
            categorymaster: updatedCategory,
          });
        } else {
          const subcategory = new subCategoryMaster({
            name: req.body.name,
            checked: req.body.checked,
            parent: req.body.parent,
            description: req.body.description,
            coverimg: req.file.filename,
          });
          const updatedsubcategory = await subcategory.save();
          categoryParent.children.push(updatedsubcategory);
          const updatedCategory = await categoryParent.save();
          res.status(201).send({
            message: "Category Added",
            categorymaster: updatedCategory,
          });
        }
      } else {
        const categoryChild = await subCategoryMaster.findById(req.body.parent);
        if (categoryChild) {
          if (req.file === undefined) {
            const categoryParent = await CategoryMaster.findById({
              _id: categoryChild.parent,
            });
            const thirdcategory = new ThirdCategoryMaster({
              name: req.body.name,
              checked: req.body.checked,
              parent: req.body.parent,
              description: req.body.description,
            });

            let garanChildUpdate = CategoryMaster.updateOne(
              {
                _id: categoryChild.parent,
                "children._id": categoryChild._id,
              },
              {
                $push: { "children.$.children": thirdcategory },
              },
              { new: true }
            );

            await garanChildUpdate;
            const CategoryGrandChild = await thirdcategory.save();
            categoryChild.children.push(CategoryGrandChild);
            const updatedCategory = await categoryChild.save();
            res.status(201).send({
              message: "Category Added",
              categorymaster: updatedCategory,
            });
          } else {
            const categoryParent = await CategoryMaster.findById({
              _id: categoryChild.parent,
            });
            const thirdcategory = new ThirdCategoryMaster({
              name: req.body.name,
              checked: req.body.checked,
              parent: req.body.parent,
              description: req.body.description,
              coverimg: req.file.filename,
            });

            let garanChildUpdate = CategoryMaster.updateOne(
              {
                _id: categoryChild.parent,
                "children._id": categoryChild._id,
              },
              {
                $push: { "children.$.children": thirdcategory },
              },
              { new: true }
            );

            await garanChildUpdate;
            const CategoryGrandChild = await thirdcategory.save();
            categoryChild.children.push(CategoryGrandChild);
            const updatedCategory = await categoryChild.save();
            res.status(201).send({
              message: "Category Added",
              categorymaster: updatedCategory,
            });
          }
        } else {
          const categorygrandChild = await ThirdCategoryMaster.findById(
            req.body.parent
          );
          const categoryChild = await subCategoryMaster.findById({
            _id: categorygrandChild.parent,
          });
          const categoryParent = await CategoryMaster.findById({
            _id: categoryChild.parent,
          });
          if (categorygrandChild) {
            const fourthcategory = new FourthCategoryMaster({
              name: req.body.name,
              checked: req.body.checked,
              parent: req.body.parent,
              description: req.body.description,
              coverimg: req.file.filename,
            });

            let userChatGroupUpdate = CategoryMaster.updateOne(
              {
                _id: categoryChild.parent,
                "children._id": categorygrandChild.parent,
                "children._id": categorygrandChild._id,
              },
              {
                $push: { "children.$[].children": fourthcategory },
              },
              { new: true }
            );
            await userChatGroupUpdate;
          }
        }
      }
    } else {
      if (req.file === undefined) {
        const categories = new CategoryMaster({
          name: req.body.name,
          checked: req.body.checked,
          parent: req.body.parent,
          description: req.body.description,
        });
        const CategoryMasteruploaded = await categories.save();

        res.send({
          message: "Category created",
          categorymaster: CategoryMasteruploaded,
        });
      } else {
        const categories = new CategoryMaster({
          name: req.body.name,
          checked: req.body.checked,
          parent: req.body.parent,
          description: req.body.description,
          coverimg: req.file.filename,
        });
        const CategoryMasteruploaded = await categories.save();

        res.send({
          message: "Category created",
          categorymaster: CategoryMasteruploaded,
        });
      }
    }
  }
);

categoryMasterRouter.get(
  "/categoryMasterSideList",
  expressAsyncHandler(async (req, res) => {
    const categorymaster = await CategoryMaster.find().limit(4);
    if (categorymaster) {
      res.send(categorymaster);
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryMasterRouter.delete(
  "/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const categoryobj = await CategoryMaster.findById(req.params.id);
    if (categoryobj) {
      const deletecategory = await categoryobj.remove();
      res.send({ message: "Category Deleted", categoryobj: deletecategory });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryMasterRouter.put(
  "/master/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  upload.single("coverimg"),
  expressAsyncHandler(
  async (req, res) => {
    if (req.body.Cname == "Parent") {
      const categoryobj = await CategoryMaster.findById(req.body.id);
      categoryobj.name = req.body.name;
      categoryobj.checked = req.body.checked;
      categoryobj.parent = req.body.parent;
      categoryobj.description = req.body.description;
      const updatecategoryobj = await categoryobj.save();
    } else if (req.body.Cname == "child-1") {
      const categoryobj = await CategoryMaster.findById(req.body.parent);
      let child1 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { _id: categoryobj._id },
        {
          $set: {
            ["children." + child1 + ".name"]: req.body.name,
            ["children." + child1 + ".checked"]: req.body.checked,
            ["children." + child1 + ".description"]: req.body.description,
            ["children." + child1 + ".parent"]: req.body.parent,
          },
        }
      );
    } else if (req.body.Cname == "child-2") {
      const parentId = req.body.catparent[0];
      const categoryobj = await CategoryMaster.findById(parentId);
      let child1 = req.body.childs1;
      let child2 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { _id: categoryobj._id },
        {
          $set: {
            ["children." + child1 + ".children." + child2 + ".name"]:
              req.body.name,
            ["children." + child1 + ".children." + child2 + ".checked"]:
              req.body.checked,
            ["children." + child1 + ".children." + child2 + ".description"]:
              req.body.description,
            ["children." + child1 + ".children." + child2 + ".parent"]:
              req.body.parent,
          },
        }
      );
    } else if (req.body.Cname == "child-3") {
      const categoryobj = await CategoryMaster.findById(req.body.pId);
      let child1 = req.body.childs1;
      let child2 = req.body.childs2;
      let child3 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { id: categoryobj?._id },
        {
          $set: {
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".name"]: req.body.name,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".checked"]: req.body.checked,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".description"]: req.body.description,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".parent"]: req.body.parent,
          },
        }
      );
    } else if (req.body.Cname == "child-4") {
      const categoryobj = await CategoryMaster.findById(req.body.pId);
      let child1 = req.body.childs1;
      let child2 = req.body.childs2;
      let child3 = req.body.childs3;
      let child4 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { _id: categoryobj._id },
        {
          $set: {
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".name"]: req.body.name,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".checked"]: req.body.checked,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".description"]: req.body.description,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".parent"]: req.body.parent,
          },
        }
      );
    } else if (req.body.Cname == "child-5") {
      const categoryobj = await CategoryMaster.findById(req.body.pId);
      let child1 = req.body.childs1;
      let child2 = req.body.childs2;
      let child3 = req.body.childs3;
      let child4 = req.body.childs4;
      let child5 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { _id: categoryobj._id },
        {
          $set: {
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".name"]: req.body.name,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".checked"]: req.body.checked,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".description"]: req.body.description,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".parent"]: req.body.parent,
          },
        }
      );
    } else if (req.body.Cname == "child-6") {
      const categoryobj = await CategoryMaster.findById(req.body.pId);
      let child1 = req.body.childs1;
      let child2 = req.body.childs2;
      let child3 = req.body.childs3;
      let child4 = req.body.childs4;
      let child5 = req.body.childs5;
      let child6 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { _id: categoryobj._id },
        {
          $set: {
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".name"]: req.body.name,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".checked"]: req.body.checked,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".description"]: req.body.description,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".parent"]: req.body.parent,
          },
        }
      );
    } else if (req.body.Cname == "child-7") {
      const categoryobj = await CategoryMaster.findById(req.body.pId);
      let child1 = req.body.childs1;
      let child2 = req.body.childs2;
      let child3 = req.body.childs3;
      let child4 = req.body.childs4;
      let child5 = req.body.childs5;
      let child6 = req.body.childs6;
      let child7 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { _id: categoryobj._id },
        {
          $set: {
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".name"]: req.body.name,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".checked"]: req.body.checked,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".description"]: req.body.description,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".parent"]: req.body.parent,
          },
        }
      );
    } else if (req.body.Cname == "child-8") {
      const categoryobj = await CategoryMaster.findById(req.body.pId);
      let child1 = req.body.childs1;
      let child2 = req.body.childs2;
      let child3 = req.body.childs3;
      let child4 = req.body.childs4;
      let child5 = req.body.childs5;
      let child6 = req.body.childs6;
      let child7 = req.body.childs7;
      let child8 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { _id: categoryobj._id },
        {
          $set: {
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".children." +
            child8 +
            ".name"]: req.body.name,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".children." +
            child8 +
            ".checked"]: req.body.checked,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".children." +
            child8 +
            ".description"]: req.body.description,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".children." +
            child8 +
            ".parent"]: req.body.parent,
          },
        }
      );
    } else if (req.body.Cname == "child-9") {
      const categoryobj = await CategoryMaster.findById(req.body.pId);
      let child1 = req.body.childs1;
      let child2 = req.body.childs2;
      let child3 = req.body.childs3;
      let child4 = req.body.childs4;
      let child5 = req.body.childs5;
      let child6 = req.body.childs6;
      let child7 = req.body.childs7;
      let child8 = req.body.childs8;
      let child9 = req.body.childIndex;
      let test = await CategoryMaster.update(
        { _id: categoryobj._id },
        {
          $set: {
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".children." +
            child8 +
            ".children." +
            child9 +
            ".name"]: req.body.name,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".children." +
            child8 +
            ".children." +
            child9 +
            ".checked"]: req.body.checked,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".children." +
            child8 +
            ".children." +
            child9 +
            ".description"]: req.body.description,
            ["children." +
            child1 +
            ".children." +
            child2 +
            ".children." +
            child3 +
            ".children." +
            child4 +
            ".children." +
            child5 +
            ".children." +
            child6 +
            ".children." +
            child7 +
            ".children." +
            child8 +
            ".children." +
            child9 +
            ".parent"]: req.body.parent,
          },
        }
      );
    }
    // const categorymasterId = req.params.id;
    // const categoryobj = await CategoryMaster.findById(req.body.pId);
    // // console.log("categoryobj------>>", categoryobj);
    // let test = await CategoryMaster.update(
    //   { _id: "64afdb4bd388557f7374a595" },
    //   {
    //     $set: {
    //       "children.0.children.0.name": req.body.name,
    //       "children.0.children.0.checked": req.body.checked,
    //       "children.0.children.0.description": req.body.description,
    //       "children.0.children.0.parent": req.body.parent,
    //     },
    //   }
    // );

    //   const category = await CategoryMaster.update({
    //     "_id" : ObjectId("5702e0c732faf57c7bb9ebe9"),
    //     'projects._id': '1'
    //   },
    //   { $set: { 'projects.tasks.$.completed': newData }}
    // )
    // if (categoryobj) {
    //   categoryobj.name = req.body.name;
    //   categoryobj.checked = req.body.checked;
    //   categoryobj.parent = req.body.parent;
    //   categoryobj.description = req.body.description;
    //   if (req.file === undefined) {
    //     categoryobj.coverimg = categoryobj.coverimg;
    //   } else {
    //     categoryobj.coverimg = req.file.filename;
    //   }
    //   // categoryobj.fieldname=req.file.fieldname;
    //   // categoryobj.originalname= req.file.originalname;
    //   // categoryobj.path=req.file.path;
    //   // categoryobj.filename= req.file.filename;
    //   // categoryobj.mimetype= req.file.mimetype;
    //   // categoryobj.filename= req.file.filename;
    //   const updatecategoryobj = await categoryobj.save();
    //   res.send({ message: "Category Updated", categoryobj: updatecategoryobj });
    // } else {
    //   res.status(404).send({ message: "Category Not Found" });
    // }
  })
);

categoryMasterRouter.put(
  "/child/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  upload.single("coverimg"),
  expressAsyncHandler(
  async (req, res) => {
    const parentId = req.body.parent;
    const paramid = req.params.id;
    let categoryobjs = await CategoryMaster.findById(parentId);
    let categoryChildObject = await subCategoryMaster.findById(paramid);
    let categoryobj = await CategoryMaster.update(
      {
        name: categoryobjs.name,
      },
      {
        $pull: {
          children: {
            name: categoryChildObject.name,
          },
        },
      }
    );
    let parenttt;
    const childdId = await subCategoryMaster.findById(paramid);
    if (childdId) {
      parenttt = await CategoryMaster.findById(parentId);
      childdId.name = req.body.name;
      childdId.checked = req.body.checked;
      childdId.parent = req.body.parent;
      childdId.description = req.body.description;
      // if (req.file === undefined) {
      //   categoryChildObject.coverimg = categoryobj.coverimg;
      // } else {
      //   categoryChildObject.coverimg = req.file.filename;
      // }
      const updateChildObj = await childdId.save();
      parenttt.children.push(updateChildObj);
      const updatedCategory = await parenttt.save();
      // console.log("categoryChildObject", updatedCategory);
      //
      res.send({
        message: "category updated",
        categoryChildObject: updatedCategory,
      });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryMasterRouter.put(
  "/grandchild/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  upload.single("coverimg"),
  expressAsyncHandler(async (req, res) => {
    // console.log(req);
    const grandchildId = req.params.id;
    const childId = req.body.parent;
    let categoryGrandChildObject = await ThirdCategoryMaster.findById(
      grandchildId
    );
    let categoryChildObject = await subCategoryMaster.findById(childId);
    let categoryobjs = await CategoryMaster.findById(
      categoryChildObject.parent
    );

    let categoryobj = await CategoryMaster.update(
      {
        name: categoryobjs.name,
      },
      {
        $pull: {
          children: {
            name: categoryChildObject.name,
          },
        },
      }
    );
    let categorychildobj = await subCategoryMaster.update(
      {
        name: categoryChildObject.name,
      },
      {
        $pull: {
          children: {
            name: categoryGrandChildObject.name,
          },
        },
      }
    );

    let Parentnew;
    let Childnew;
    if (categoryGrandChildObject) {
      Childnew = await subCategoryMaster.findById(
        categoryGrandChildObject.parent
      );
      Parentnew = await CategoryMaster.findById(Childnew.parent);
      categoryGrandChildObject.name = req.body.name;
      categoryGrandChildObject.checked = req.body.checked;
      categoryGrandChildObject.parent = req.body.parent;
      categoryGrandChildObject.description = req.body.description;
      const updateGrandChildObj = await categoryGrandChildObject.save();
      Childnew.children.push(updateGrandChildObj);
      const childId = await Childnew.save();
      Parentnew.children.push(childId);
      const ParentId = await Parentnew.save();
      res.send({
        message: "category updated",
        categoryGrandChildObject: ParentId,
      });
    }
  })
);

categoryMasterRouter.get(
  "/show/:filename",
  expressAsyncHandler(async (req, res) => {
    const filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  })
);

categoryMasterRouter.get(
  "/categoryMasterList",
  expressAsyncHandler(async (req, res) => {
    const categorymaster = await CategoryMaster.find().sort({ createdAt: -1 });
    // console.log("req", categorymaster);
    if (categorymaster) {
      res.send(categorymaster);
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryMasterRouter.get(
  "/ChildList",
  expressAsyncHandler(async (req, res) => {
    // console.log('req',req);
    const Childcategory = await subCategoryMaster.find();
    if (Childcategory) {
      res.send(Childcategory);
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryMasterRouter.get(
  "/categorySubChildList",
  expressAsyncHandler(async (req, res) => {
    // console.log('req',req);
    const Childcategory = await subCategoryMaster.find();
    if (Childcategory) {
      res.send(Childcategory);
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryMasterRouter.get(
  "/garnChildList",
  expressAsyncHandler(async (req, res) => {
    const grandChild = await ThirdCategoryMaster.find();
    if (grandChild) {
      res.send(grandChild);
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryMasterRouter.get(
  "/show/:filename",
  expressAsyncHandler(async (req, res) => {
    const filename = req.params.filename;
    const conn = mongoose.connection;
    var gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    gfs.files.find({ filename: filename }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
      var readstream = bucket.openDownloadStreamByName(filename);
      return readstream.pipe(res);
    });
  })
);

categoryMasterRouter.put(
  "/checkboxitem/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const categorymasterId = req.body.checkboxId;
    let updatecategorymaster = [];
    for (let i = 0; i < categorymasterId.length; i++) {
      const categorymaster = await CategoryMaster.findById({
        _id: categorymasterId[i],
      });

      if (categorymaster) {
        if (req.body.checkedshow === true) {
          categorymaster.checked = req.body.checkedshow;
        } else {
          categorymaster.checked = req.body.checkedhide;
        }
        updatecategorymaster = await categorymaster.save();
      }
    }
    res.send({
      message: "Category Updated",
      categorymaster: updatecategorymaster,
    });
  })
);

categoryMasterRouter.put("/childcheckbox/:id", async (req, res) => {
  const subcategoryId = req.body.childId;
  let updatesubcategory = [];
  for (let i = 0; i < subcategoryId.length; i++) {
    const subcategory = await subCategoryMaster.findById({
      _id: subcategoryId[i],
    });
    if (subcategory) {
      if (req.body.checkedshow === true) {
        subcategory.checked = req.body.checkedshow;
      } else {
        subcategory.checked = req.body.checkedhide;
      }
      updatesubcategory = await subcategory.save();
    }
  }

  res.send({ message: "Category Updated", subcategory: updatesubcategory });
});

categoryMasterRouter.put("/grandchildcheckbox/:id", async (req, res) => {
  const grandcategoryId = req.body.grandchildId;
  let updategrandcategory = [];
  for (let i = 0; i < grandcategoryId.length; i++) {
    const grandcategory = await ThirdCategoryMaster.findById({
      _id: grandcategoryId[i],
    });
    if (grandcategory) {
      if (req.body.checkedshow === true) {
        grandcategory.checked = req.body.checkedshow;
      } else {
        grandcategory.checked = req.body.checkedhide;
      }
      updategrandcategory = await grandcategory.save();
    }
  }
  res.send({ message: "Category Updated", grandcategory: updategrandcategory });
});

categoryMasterRouter.put(
  "/parentEnable/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.id;

    const Attributemaster = await CategoryMaster.findById({ _id: attributeId });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.checked = req.body.active;
      } else {
        Attributemaster.checked = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

categoryMasterRouter.put(
  "/childEnable/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.id;

    const Attributemaster = await subCategoryMaster.findById({
      _id: attributeId,
    });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.checked = req.body.active;
      } else {
        Attributemaster.checked = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

categoryMasterRouter.put(
  "/grandEnable/:id",
  isAuth,
  // isAdmin,
  // isSeller,
  expressAsyncHandler(async (req, res) => {
    const attributeId = req.body.id;

    const Attributemaster = await ThirdCategoryMaster.findById({
      _id: attributeId,
    });

    if (Attributemaster) {
      if (req.body.active === true) {
        Attributemaster.checked = req.body.active;
      } else {
        Attributemaster.checked = req.body.deactive;
      }
      const updatecAtt = await Attributemaster.save();
      res.send({ message: "Category Updated", Attmaster: updatecAtt });
    }

    // res.send({ message: "Category Updated", Attmaster: updatecAtt });
  })
);

categoryMasterRouter.delete(
  "/masterdelete/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await CategoryMaster.findById({ _id: deletId[i] });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
  })
);

categoryMasterRouter.delete(
  "/childdelete/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await subCategoryMaster.findById({
        _id: deletId[i],
      });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
  })
);

categoryMasterRouter.delete(
  "/grandchilddelete/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deleteemploye;
    for (let i = 0; i < deletId.length; i++) {
      const deleteEmploye = await ThirdCategoryMaster.findById({
        _id: deletId[i],
      });
      deleteemploye = await deleteEmploye.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deleteemploye });
  })
);

categoryMasterRouter.delete(
  "/Categorydelete/:id",
  expressAsyncHandler(async (req, res) => {
    console.log("req----------------delete", req.body);
    // const categoryobj = await CategoryMaster.findById(req.body.parentId);
    // console.log('categoryobj----------------delete', categoryobj);
    // let deletechilddata;
    // // let data;
    // for (let i = 0; i < categoryobj.children.length; i++) {
    //   const childdele = categoryobj.children[i];
    //   // data.push(categoryobj.children[i])
    //   deletechilddata = await childdele.remove();
    // }
    // console.log('deletechilddata----------------delete', deletechilddata);

    try {
      if (req.body.parent == "undefined") {
        let result = await CategoryMaster.findByIdAndUpdate({
          parentId: child.parent,
        });

        result.remove();
        res.send({ message: "Category Successfully Deleted" });
      } else {
        let child1 = req.body.child1;
        let childs2 = req.body.child2;
        let childs3 = req.body.child3;
        let childs4 = req.body.child4;
        let childs5 = req.body.child5;
        let childs6 = req.body.child6;
        let childs7 = req.body.child7;
        let childs8 = req.body.child8;
        let childindex = req.body.childIndex;
        if (req.body.childname === "child-1") {
          let result = await CategoryMaster.findByIdAndUpdate(
            { _id: req.body.parentId },
            {
              $pull: {
                ["children"]: {
                  _id: mongoose.Types.ObjectId(req.body._id),
                },
              },
            }
          );
        } else if (req.body.childname === "child-2") {
          let result = await CategoryMaster.findByIdAndUpdate(
            { _id: req.body.parentId },
            {
              $pull: {
                ["children." + child1 + ".children"]: {
                  _id: mongoose.Types.ObjectId(req.body.childId),
                },
              },
            }
          );
        } else if (req.body.childname === "child-3") {
          let result = await CategoryMaster.findByIdAndUpdate(
            { _id: req.body.parentId },
            {
              $pull: {
                ["children." + child1 + ".children." + childs2 + ".children"]: {
                  _id: mongoose.Types.ObjectId(req.body.childId),
                },
              },
            }
          );
        } else if (req.body.childname === "child-4") {
          let result = await CategoryMaster.findByIdAndUpdate(
            { _id: req.body.parentId },
            {
              $pull: {
                ["children." +
                child1 +
                ".children." +
                childs2 +
                ".children." +
                childs3 +
                ".children"]: {
                  _id: mongoose.Types.ObjectId(req.body.childId),
                },
              },
            }
          );
        } else if (req.body.childname === "child-5") {
          let result = await CategoryMaster.findByIdAndUpdate(
            { _id: req.body.parentId },
            {
              $pull: {
                ["children." +
                child1 +
                ".children." +
                childs2 +
                ".children." +
                childs3 +
                ".children." +
                childs4 +
                ".children"]: {
                  _id: mongoose.Types.ObjectId(req.body.childId),
                },
              },
            }
          );
        } else if (req.body.childname === "child-6") {
          let result = await CategoryMaster.findByIdAndUpdate(
            { _id: req.body.parentId },
            {
              $pull: {
                ["children." +
                child1 +
                ".children." +
                childs2 +
                ".children." +
                childs3 +
                ".children." +
                childs4 +
                ".children." +
                childs5 +
                ".children"]: {
                  _id: mongoose.Types.ObjectId(req.body.childId),
                },
              },
            }
          );
        } else if (req.body.childname === "child-7") {
          let result = await CategoryMaster.findByIdAndUpdate(
            { _id: req.body.parentId },
            {
              $pull: {
                ["children." +
                child1 +
                ".children." +
                childs2 +
                ".children." +
                childs3 +
                ".children." +
                childs4 +
                ".children." +
                childs5 +
                ".children." +
                childs6 +
                ".children." +
                childs7 +
                ".children"]: {
                  _id: mongoose.Types.ObjectId(req.body.childId),
                },
              },
            }
          );
        } else if (req.body.childname === "child-8") {
          let result = await CategoryMaster.findByIdAndUpdate(
            { _id: req.body.parentId },
            {
              $pull: {
                ["children." +
                child1 +
                ".children." +
                childs2 +
                ".children." +
                childs3 +
                ".children." +
                childs4 +
                ".children." +
                childs5 +
                ".children." +
                childs6 +
                ".children." +
                childs7 +
                ".children." +
                childs8 +
                ".children"]: {
                  _id: mongoose.Types.ObjectId(req.body.childId),
                },
              },
            }
          );
        }
      }
      res.send({ message: "Category Deleted" });
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  })
);

export default categoryMasterRouter;
