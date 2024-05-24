const express = require("express")
const { Show, User } = require("../models")
const { check, validationResult } = require("express-validator")

const router = express.Router()

// GET request to return all Shows
router.get("/", async (request, response) => {
    const shows = await Show.findAll()
    response.json(shows)
    })

// GET request to return one show from it's id    
router.get("/:id", async (request, response) => {
        const show = await Show.findByPk(request.params.id)
        response.json(show)
        })


        // GET all users who watched a show
router.get("/:id/watchedBy", async (request, response) => {
    const show = await Show.findByPk(request.params.id, {include:{
        model: User,
    }, attributes: ["title"]})
    response.json(show)
})


        // PUT update the available property of a show
router.put("/:id/status", async (request, response) => {
    const show = await Show.findByPk(request.params.id);
    if(show){
        show.available = !show.available; // Toggles the value of show.available
        await show.save();
        response.json(show)
    } else {
        response.status(404).send("Not found.")
    }
})
            
            



        // DELETE a show
router.delete("/:id", async (request, response) => {
    const deletedShow = await Show.findByPk(request.params.id)
    if(deletedShow){
        deletedShow.destroy
        response.status(204).send("Deleted")
  } else {
    response.status(404).send("Not found")
}
        })

        // router.delete("/:id", async (request, response) => {
        //     const deletedShow = await Show.destroy({where: {id: request.params.id}})
        //     response.json(deletedShow)
        //             })



        // GET shows of a particular genre (genre in req.query)
router.get("genres/genre", async (request, response) =>{
    const returnedShow = await Show.findAll({
        where:{
            genre: request.params.genre
        }
    })
    response.json(returnedShow)
})





module.exports = router;