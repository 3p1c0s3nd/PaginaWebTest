const Url = require('../models/Url.js');
const { nanoid } = require('nanoid');

const leerUrls = async(req, res) =>{
    try{
        const urls = await Url.find().lean();
        res.render("home", {urls: urls});
    }catch(err){
        console.log(err);
        res.send("Hubo un error");
    }

}


const agregarUrl = async(req, res) =>{
    
    console.log(req.body);
    const { origin } = req.body;

    try{
        const url = new Url({origin: origin, shortURL: nanoid(6)});
        await url.save();
        res.redirect("/");
    }catch(err){
        console.log(err);
        res.send("Hubo un error");
    }
};


const eliminarUrl = async(req, res) =>{
    const { id } = req.params;
    try{
        await Url.findByIdAndDelete(id);
        res.redirect("/");
    }catch(err){
        console.log(err);
        res.send("Hubo un error");
    }
}

const editarUrlForm = async(req, res) =>{
    const { id } = req.params;
    try {
        const url = await Url.findById(id).lean();
        console.log(url);
        res.render("home", {url});
    } catch (error) {
        console.log("Hubo un error");
        res.send("Hubo un error al editar la url");
    }
   
}

const editarUrl = async(req, res) =>{
    const { id } = req.params;
    const { origin } = req.body;
    try {
       await Url.findByIdAndUpdate(id, {origin});
       res.redirect("/");
    } catch (error) {
        console.log("Hubo un error");
        res.send("Hubo un error al editar la url");
    }
}

const redireccionamiento = async(req, res) =>{
    const { shortURL } = req.params;
   try {
     const urlDB = await Url.findOne({shortURL: shortURL});
     console.log(urlDB.origin);
     res.redirect(urlDB.origin);
   } catch (error) {
       console.log("Hubo un error");
       res.send("Hubo un error al redireccionar");  
   }
}

module.exports = {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento
};