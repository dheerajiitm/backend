  
const express = require("express");
require("./db")
const Person = require("./model.js")

const app = express();
app.use(express.json());


app.post('/api/persons', async (req, res) => {
    try{
        const persons = new Person({
            name: req.body.name,
            email: req.body.email
        })
        await persons.save();

        return res.status(201).send(persons);
    } catch (e) {
        return res.status(500).send(e)
    }
});

app.get('/api/persons', async (req, res) => {
    try {
        const persons = await Person.find();
        return res.status(200).send(persons);
    } catch (e) {
        return res.status(500).send(e)
    }
})

app.get('/api/persons/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const persons = await Person.findById(_id);
        return res.status(200).send(persons);
    } catch (e) {
        return res.status(500).send(e)
    }
});

app.patch('/api/persons/:id',async (req, res) => {
    const _id = req.params.id
    try {
        const persons = await Person.findByIdAndUpdate(_id, req.body)
        if(persons) {
            const personUp = await Person.findById(_id);
            return res.status(200).send(personUp)
        } 
        else{
            return res.status(400).send("User details have successfully been updated")
        }
    } catch(e) {
       return res.status(500).send(e) 
    }
})
app.delete('/api/persons/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const persons = await Person.findByIdAndDelete(_id);
        if(persons) {
            return res.status(400).send("User has been deleted successfuly")
        }
        return res.send("User deletion failed");
    } catch (e) {
        return res.status(500).send(e)
    }
})

app.listen(3000, () => {console.log("Lisenting on Port 3000")})