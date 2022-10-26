const database = require('../models')

class PessoaController{
    static async pegarTodasAsPessoas(req,res){
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req,res){
        const { id } = req.params
        
        try {
            const umaPessoa = await database.Pessoas.findOne({where : {id: Number(id) }})
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json({message: 'ID inválido!'})
        }
    }

    static async criarPessoa(req,res){
        const novaPessoa = req.body

        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizarPessoa(req,res){
        const { id } = req.params
        const novaInfo = req.body

        try {
            await database.Pessoas.update(novaInfo, { where: { id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarPessoa(req,res){
        const { id } = req.params

        try {
            await database.Pessoas.destroy({where: { id: Number(id)}})
            return res.status(200).json({message: `ID: ${id} deletado!`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //Matricula

    static async pegaUmaMatricula(req,res){
        const { estudanteId, matriculaId } = req.params
        
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where : {
                    id: Number(matriculaId), 
                    estudante_id: Number(estudanteId) 
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json({message: 'ID inválido!'})
        }
    }

    static async criarMatricula(req,res){
        const {estudanteId} = req.params

                              /* Fazendo um "Spread"(Pegando o valor do paramentro pessoas e atribuindo ao
                              atributo estudante_id, que está no objeto matricula) */
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
      //const novaMatricula = {...req.body, estudante_id: Number(req.params.estudanteId)}                        

        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    
    static async atualizarMatricula(req,res){
        const { estudanteId, matriculaId } = req.params
        const novaInfo = req.body

        try {
            await database.Matriculas.update(novaInfo, { where: { 
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }
        })
            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId)
                }
            })
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarMatricula(req,res){
        const { matriculaId } = req.params

        try {
            await database.Matriculas.destroy({
                where: { 
                    id: Number(matriculaId)
                }
            })
            return res.status(200).json({message: `ID: ${matriculaId} deletado!`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController