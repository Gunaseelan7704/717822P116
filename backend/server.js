const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/users', async (req,res) =>{
    try{
        const authResponse = await axios.post('http://20.244.56.144/test/auth',{
            companyName: "karpagam",
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            ownerName: "Gunaseelan",
            ownerEmail: "717822p116@kce.ac.in",
            rollNo: "717822P116"
        })

        const token = authResponse.data.access_token;

        const getUsers = await axios.get('http://20.244.56.144/test/users',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        res.json(getUsers.data);
    }catch(error){
        res.status(500).json({error : error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});