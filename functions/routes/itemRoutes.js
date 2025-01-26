// routes/itemRoutes.js
const express = require("express")
const ItemController = require("../controllers/itemController")

const router = express.Router()

// Define CRUD routes
router.post("/", ItemController.create) // Create item
router.get("/", ItemController.getAll) // Get all items
router.get("/:id", ItemController.getOne) // Get one item
router.put("/:id", ItemController.update) // Update item
router.delete("/:id", ItemController.delete) // Delete item

module.exports = router
