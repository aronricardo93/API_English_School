const database = require('../models')

class NivelController{
    static async pegarTodosOsNiveis(req,res){
        try {
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmNivel(req,res){
        const { id } = req.params
        try {
            const pegaNivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })
            res.status(200).json(pegaNivel)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    
    static async criaNivel(req,res){
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            res.status(201).json(novoNivelCriado)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    
    static async atualizaNivel(req,res){
        const { id } = req.params
        const novoNivel = req.body

        try {
            await database.Niveis.update(novoNivel,{
                where:{
                    id: Number(id)
                }
            })
            const nivelAtualizado = await database.Niveis.findOne({
                where:{
                    id: Number(id)
                }
            })
            res.status(200).json(nivelAtualizado)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    
    static async apagaNivel(req,res){
        const { id } = req.params
        try {                          
            await database.Niveis.destroy({where: { id: Number(id)}})
           return res.status(200) //.json({message: `ID ${id} deletado!`})
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}


module.exports = NivelController