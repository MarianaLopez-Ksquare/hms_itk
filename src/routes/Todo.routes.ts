import { Router, Request, Response } from "express";
import { createTodo, deleteTodoById, fetchTodoById, updateTodoById} from '../repository/Todo.repo'
export const TodoRouter = Router ();

TodoRouter.post ('/',async(req:Request, res: Response) =>{
    const {description} = req.body;

    if (!description){
        res.status(400)
        return res.send({
            message: 'No description'
        })
    }

const newTodo = await createTodo (description);

res.status(201);
res.send({
    id: newTodo
})
})

TodoRouter.get ('/:todoId', async (req:Request,res:Response)=>{
    
    //conversion del todoId para tener congruencia entre el tipo de dato definido en el modelo
    const todoId = Number (req.params['todoId']);

    //validaciones 

    if (todoId <= 0){
        res.status(400);
        res.send({
            error:'Invalid id'
        })
    }

    const foundTodo = await fetchTodoById (todoId);
    if (!foundTodo){
        res.status(404); //(404)not found info  -- 400 error del usuario (bad request)
        return res.send({
            error:'Todo not found'
        })
    }

    console.log(foundTodo);
    

    res.send(foundTodo);
})

TodoRouter.put ('/:todoId',async (req:Request,res:Response) => {
    const todoId = Number (req.params['todoId']);
    const body = req.body;
    if (todoId <= 0){
        res.status(404);
        res.send({
            error:'Invalid id'
        })
    }

    const affectedRows = await updateTodoById (todoId,body);

    if (!affectedRows){
        res.status(400);
        return res.send({
            error: 'Somenthing went wrong'
        })
    }

    if (affectedRows [0] === 0){
        res.status(400);
        return res.send({
            error: 'Update failed'
        })
    }

    const foundTodo = await fetchTodoById (todoId)

    res.status(200);
    return res.send(foundTodo)
})

TodoRouter.delete ('/:todoId',async (req:Request,res:Response) => {
    const todoId = Number (req.params['todoId']);
    if (todoId <= 0){
        res.status(404);
        res.send({
            error:'Invalid id'
        })
    }

    const array = await deleteTodoById (todoId);
    if (!array){
        return res.status (400).send ({
            error: 'Cannot delete'
        })
    }

    return res.sendStatus (200);
})