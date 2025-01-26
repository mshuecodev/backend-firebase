// controllers/itemController.js
const db = require("../utils/firebase")
const { convertObjtoArray } = require("../utils/convertObjtoArray")

const ItemController = {
	// Create a new item (auto-generate ID)
	create: async (req, res) => {
		const { name, description } = req.body
		if (!name || !description) {
			return res.status(400).json({ message: "Missing required fields." })
		}
		try {
			const ref = db.ref("items").push() // Auto-generate ID
			await ref.set({ name, description })
			res.status(201).json({ message: "Item created successfully.", id: ref.key })
		} catch (error) {
			res.status(500).json({ message: "Failed to create item.", error })
		}
	},

	// Get all items
	getAll: async (req, res) => {
		try {
			const snapshot = await db.ref("items").once("value")
			const data = snapshot.val()

			// Convert object to array
			const list = await convertObjtoArray(data)
			res.status(200).json(list || [])
		} catch (error) {
			res.status(500).json({ message: "Failed to fetch items.", error })
		}
	},

	// Get a single item by ID
	getOne: async (req, res) => {
		const { id } = req.params
		try {
			const snapshot = await db.ref(`items/${id}`).once("value")
			const item = snapshot.val()

			if (!item) {
				return res.status(404).json({ message: "Item not found." })
			}
			res.status(200).json(item)
		} catch (error) {
			res.status(500).json({ message: "Failed to fetch item.", error })
		}
	},

	// Update an existing item
	update: async (req, res) => {
		const { id } = req.params
		const updates = req.body
		try {
			await db.ref(`items/${id}`).update(updates)
			res.status(200).json({ message: "Item updated successfully." })
		} catch (error) {
			res.status(500).json({ message: "Failed to update item.", error })
		}
	},

	// Delete an item
	delete: async (req, res) => {
		const { id } = req.params
		try {
			await db.ref(`items/${id}`).remove()
			res.status(200).json({ message: "Item deleted successfully." })
		} catch (error) {
			res.status(500).json({ message: "Failed to delete item.", error })
		}
	}
}

module.exports = ItemController
