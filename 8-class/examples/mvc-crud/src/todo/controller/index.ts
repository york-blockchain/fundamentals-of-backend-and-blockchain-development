import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { ToDoInstance } from "../model"

class ToDoController {
    async create(req: Request, res: Response) {
        const id = uuidv4()
        try {
            const todoItem = await ToDoInstance.create({ ...req.body, id })
            return res.status(201).json({ record: todoItem, msg: 'Successfully created todo item' })
        } catch (e) {
            return res.status(500).json({ msg: 'failed to create', route: "/create" })
        }
    }

    async readPagination(req: Request, res: Response) {
        try {
            const limit = (req.query.limit as number | undefined) || 10
            const offset = req.query.offset as number | undefined
            const todoItems = await ToDoInstance.findAll({ where: {}, limit, offset })
            return res.status(201).json({ records: todoItems })
        }
        catch (e) {
            return res.status(500).json({ msg: 'failed to read', route: "/read" })
        }
    }

    async readByID(req: Request, res: Response) {
        try {
            const todoItem = await ToDoInstance.findOne({ where: { id: req.params.id } })
            return res.status(201).json({ record: todoItem })
        } catch (e) {
            return res.status(500).json({ msg: 'failed to read', route: "/read/:id" })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const todoItem = await ToDoInstance.findOne({ where: { id: req.params.id } })

            if (!todoItem) {
                return res.status(404).json({ msg: "Cannot find existing record" })
            }
            const updatedToDoItem = await todoItem.update({
                completed: !todoItem.getDataValue("completed")
            })

            return res.status(201).json({ record: updatedToDoItem })
        } catch (e) {
            return res.status(500).json({ msg: 'failed to update', route: "/update/:id" })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const todoItem = await ToDoInstance.findOne({ where: { id: req.params.id } })

            if (!todoItem) {
                return res.status(404).json({ msg: "Cannot find existing record" })
            }
            const deletedToDoItem = await todoItem.destroy()

            return res.status(201).json({ record: deletedToDoItem })
        } catch (e) {
            return res.status(500).json({ msg: 'failed to delete', route: "/delete/:id" })
        }
    }
}

export default new ToDoController()