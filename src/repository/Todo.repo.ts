//funciones y metodos de sequelize

import { InferAttributes } from "sequelize";
import {Todo} from "../models/Todo";

export const createTodo = async (description:string) => {
    try{
        const newTodo = await Todo.create ({
            description
        })

        return newTodo.id;
    } catch (error){
        console.error(error);        
    }
}

export const fetchTodoById = async(idGivenByUser:number) =>{

    try {
       const foundTodo = await Todo.findOne({  //SELECT * FROM "Todo" WHERE id == idGivenByUser
            where: {
                id: idGivenByUser
            }
    
        })

        return foundTodo;
    } catch (error) {
        console.error(error);
        
        return null;
        
    }
}
 // para cuando tenemos modelos más complejos
export const updateTodoById = async (id:number, todoModel: InferAttributes<Todo>) =>{
    try {
        const foo = await Todo.update(todoModel, {
            where:{ 
                id:todoModel.id
            }
        })

        return foo;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteTodoById = async(idGivenByUser:number) =>{

    try {
       const numberOfDestoyedRows = await Todo.destroy({  //SELECT * FROM "Todo" WHERE id == idGivenByUser
            where: {
                id: idGivenByUser
            }
    
        })

        return numberOfDestoyedRows;
    } catch (error) {
        console.error(error);
        
        return null;
        
    }
}