import express from "express"
import ToDoControllerInstance from "../controller"
import MiddlewareInstance from "../../middleware"
import ToDoValidatorInstance from "../validator"

const router = express.Router()

router.post(
    "/create",
    ToDoValidatorInstance.checkCreateToDo,
    MiddlewareInstance.handleValidationError,
    ToDoControllerInstance.create
)

router.get(
    "/read",
    ToDoValidatorInstance.checkReadToDo,
    MiddlewareInstance.handleValidationError,
    ToDoControllerInstance.readPagination
)

router.get(
    "/read/:id",
    ToDoValidatorInstance.checkIdParam,
    MiddlewareInstance.handleValidationError,
    ToDoControllerInstance.readByID
)

router.put(
    "/update/:id",
    ToDoValidatorInstance.checkIdParam,
    MiddlewareInstance.handleValidationError,
    ToDoControllerInstance.update
)

router.delete(
    "/delete/:id",
    ToDoValidatorInstance.checkIdParam,
    MiddlewareInstance.handleValidationError,
    ToDoControllerInstance.delete
)

export default router;