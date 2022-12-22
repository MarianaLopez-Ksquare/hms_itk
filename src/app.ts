import express, { Application, Request, Response } from "express";
const app: Application = express();
import {TodoRouter} from './routes/Todo.routes'
import {v4 as uuidv4} from 'uuid';
import { URLRouter } from "./routes/URL.routes";
import { UserRouter } from "./routes/User.routes";
import { AdminRouter } from "./routes/Admin.routes";
import { AppointmentsRouter } from "./routes/Appointments.routes";
app.use(express.json());

app.use('/todos' , TodoRouter);
app.use('/users', UserRouter)
app.use("/appointments", AppointmentsRouter)
app.use('/admin', AdminRouter)
app.use ('/u', URLRouter)

const idPrueba = uuidv4();
console.log('Aqui esta el ID:', idPrueba)


app.get("/", (req: Request, res: Response) => {
  res.send('Holaaaaaaaa');
})

export default app;