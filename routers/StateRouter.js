import express from "express";
import expressAsyncHandler from "express-async-handler";
import stateModel from "../Models/StateModel.js";
import { isAdmin, isAuth, isSeller } from "../utils.js";
const StateRouter = express.Router();
StateRouter.post(
  "/state",
  expressAsyncHandler(async (req, res) => {
    const stateDetails = new stateModel({
      iso: req.body.iso,
      state: req.body.state,
      zone: req.body.zone,
      country: req.body.country,
      checked: req.body.checked,
      countrtyId: req.body.countrtyId,
    });
    const StateData = await stateDetails.save();
    res.send({
      message: "State Added",
      category: StateData,
    });
  }),
);

StateRouter.get(
  "/statelist",
  expressAsyncHandler(async (req, res) => {
    const Statedetails = await stateModel.find().sort({ createdAt: -1 });

    if (Statedetails) {
      res.send(Statedetails);
    } else {
      res.status(404).send({ message: "State details Not Found" });
    }
  }),
);

StateRouter.put(
  "/updatestate/:id",

  expressAsyncHandler(async (req, res) => {
    const Id = req.params.id;
    const stateUpdate = await stateModel.findById(Id);
    if (stateUpdate) {
      stateUpdate.iso = req.body.iso;
      stateUpdate.state = req.body.state;
      stateUpdate.zone = req.body.zone;
      stateUpdate.country = req.body.country;
      stateUpdate.checked = req.body.checked;
      const updatedState = await stateUpdate.save();

      res.send({ message: " Updated", Statedetail: updatedState });
    } else {
      res.status(404).send({ message: "State Not Found" });
    }
  }),
);

StateRouter.delete(
  "/deletestate/:id",
  expressAsyncHandler(async (req, res) => {
    const deletestate = await stateModel.findById(req.params.id);

    if (deletestate) {
      const deleteState1 = await deletestate.remove();
      res.send({ message: "Attributed Deleted", deleteAtt: deleteState1 });
    } else {
      res.status(404).send({ message: "State Details Not Found" });
    }
  }),
);

StateRouter.put(
  "/activeenable/:id",

  expressAsyncHandler(async (req, res) => {
    const Id = req.body.id;

    const Attributemaster = await stateModel.findById({
      _id: Id,
    });

    if (Attributemaster) {
      if (req.body.deactive === false) {
        Attributemaster.checked = req.body.deactive;
      } else {
        Attributemaster.checked = req.body.active;
      }
      const updatecAtt = await Attributemaster.save();

      res.send({ message: "Category Updated", Enablemaster: updatecAtt });
    }

    //   res.send({ message: "Category Updated", Attmaster: updatecAtt });
  }),
);

StateRouter.put("/checkboxitem/:id", isAuth, async (req, res) => {
  const statemasterId = req.body.checkboxId;

  let updatestatemaster = [];
  for (let i = 0; i < statemasterId.length; i++) {
    const statesmaster = await stateModel.findById({
      _id: statemasterId[i],
    });

    if (statesmaster) {
      if (req.body.checkedshow === true) {
        statesmaster.checked = req.body.checkedshow;
      } else {
        statesmaster.checked = req.body.checkedhide;
      }
      updatestatemaster = await statesmaster.save();
    }
  }
  res.send({ message: "State Updated", statemaster: updatestatemaster });
});

StateRouter.delete(
  "/deletebulk/:id",
  expressAsyncHandler(async (req, res) => {
    const deletId = req.body.id;
    let deletestate;
    for (let i = 0; i < deletId.length; i++) {
      const deleteState = await stateModel.findById({ _id: deletId[i] });
      deletestate = await deleteState.remove();
    }
    res.send({ message: "Attributed Deleted", deleteAtt: deletestate });
  }),
);

StateRouter.put("/checkzone/:id", isAuth, async (req, res) => {
  const statemasterId = req.body.checkboxId;

  let updatestatemaster = [];
  for (let i = 0; i < statemasterId.length; i++) {
    const statesmaster = await stateModel.findById({
      _id: statemasterId[i],
    });

    if (statesmaster) {
      statesmaster.zone = req.body.checkedshow;

      updatestatemaster = await statesmaster.save();
    }
  }
  res.send({ message: "State Updated", statemaster: updatestatemaster });
});
export default StateRouter;
