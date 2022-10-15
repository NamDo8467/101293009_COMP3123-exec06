const Note = require("../models/NotesModel")
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
const route = require("express").Router()

route.post("/notes", async (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({
			message: "Note content can not be empty"
		})
	}
	//TODO - Write your code here to save the note
	try {
		const { noteTitle, noteDescription, priority } = req.body

		const dateAdded = new Date(req.body.dateAdded)
		const dateUpdated = new Date(req.body.dateUpdated)
		if (!["HIGH", "MEDIUM", "LOW"].includes(priority)) {
			throw new Error("Priority should be either HIGH, MEDIUM or LOW")
		}

		const note = await Note.create({ noteTitle, noteDescription, priority, dateAdded, dateUpdated })
		res.status(200).send(note)
	} catch (err) {
		res.status(400).send(err.message)
	}
})

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
route.get("/notes", async (req, res) => {
	//TODO - Write your code here to returns all note
	try {
		const notes = await Note.find()
		res.status(200).send(notes)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
route.get("/notes/:noteId", async (req, res) => {
	// Validate request
	const id = req.params.noteId
	if (id == null || id == undefined) {
		return res.status(400).send({
			message: "Note ID can not be empty"
		})
	}
	//TODO - Write your code here to return onlt one note using noteid
	try {
		const note = await Note.findById(id)
		res.status(200).send(note)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
route.put("/notes/:noteId", async (req, res) => {
	// Validate request

	if (req.body == {}) {
		return res.status(400).send({
			message: "Note content can not be empty"
		})
	}
	const id = req.params.noteId
	if (id == null || id === undefined) {
		res.status(400).send({ message: "Note ID can not be empty" })
	}

	try {
		const { noteTitle, noteDescription, priority } = req.body
		const dateAdded = new Date(req.body.dateAdded)
		const dateUpdated = new Date(req.body.dateUpdated)
		if (!["HIGH", "MEDIUM", "LOW"].includes(priority)) {
			throw new Error("Priority should be either HIGH, MEDIUM or LOW")
		}

		const updatedResult = await Note.findByIdAndUpdate(
			{ _id: id },
			{ noteTitle, noteDescription, priority, dateAdded, dateUpdated }
		)
		res.status(200).send(updatedResult)
	} catch (error) {
		res.status(400).send(error.message)
	}

	//TODO - Write your code here to update the note using noteid
})

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
route.delete("/notes/:noteId", async (req, res) => {
	// Validate request
	//TODO - Write your code here to delete the note using noteid
	const id = req.params.noteId

	try {
		const removedResult = await Note.findByIdAndRemove({ _id: id })
		res.status(200).send(removedResult)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

module.exports = route
