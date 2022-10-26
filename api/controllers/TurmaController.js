const database = require('../models')

class TurmaController{
    static async pegarTodasAsTurmas(req,res){
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaTurma(req,res){
        const { id } = req.params 
        try {
            const pegaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(pegaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarTurma(req,res){
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(201).json(novaTurmaCriada)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    static async atualizarTurma(req,res){
        const {id} = req.params
        const novaTurma = req.body
        try {
            await database.Turmas.update(novaTurma, {where: {id: Number(id)}})
            const turmaAtualizada = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(turmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarTurma(req,res){
        const { id } = req.params
        try {
            await database.Turmas.destroy({where: {id: Number(id)}})
            return res.status(200)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController