const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Article = require("./Article");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}))



// اتصال بقاعدة البيانات
mongoose.connect("mongodb+srv://moragame660:wEf1OkRe6ioTWpRH@cluster0.j74solx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.error("Failed to connect to database", err);
    });

// Route for handling POST request
app.post('/send/data', async (req, res) => {
    try {
        const data = req.body;  // الحصول على البيانات المرسلة
        console.log("Received data:", data);

        // إنشاء مقال جديد وحفظ البيانات في قاعدة البيانات
        const newArticle = new Article({
            body: data
        });

        await newArticle.save();  // حفظ المقال الجديد في قاعدة البيانات
        console.log("Article saved successfully!");

        // إرسال استجابة بعد نجاح العملية
        res.status(200).send("Data received and saved successfully!");

    } catch (err) {
        console.log("Error in server:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/send",async (req,res)=>{
})


let PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
