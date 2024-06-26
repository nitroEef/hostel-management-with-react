const express = require("express");
const {
  createNewRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/createNewRoom", createNewRoom);
router.get("/get-all-room",  getAllRooms);
router.get("/get-single-room/:roomId", getRoom);
router.patch("/update-room/:roomId",updateRoom);
router.delete("/delete-room/:roomId", deleteRoom);


module.exports = router;
