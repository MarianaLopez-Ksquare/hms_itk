import {URL} from "../models/URL.models"

//Crear una nueva URL
//Dado un ID obtener un nuevo ID

export const createURL = async (id:string, origUrl: string) => {

    const newModel = URL.build ({
        id,
        origUrl
    })

    const res = await newModel.save();

    return res.id
}

export const fetchUrlById = async (id:string) => {
    try {
        const urlFetched = await URL.findByPk(id);

        if (!urlFetched) {
            return 'Record not found'
        }

        return urlFetched.origUrl;

    } catch (error) {
        
    }
}