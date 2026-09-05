import express from "express";
import axios from "axios";
import pg from "pg";

const app = express();
const PORT = 3000;
const API_URL = "https://covers.openlibrary.org/b/id";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ifobook",
  password: "5466",
  port: 5432,
});
db.connect();

app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", async(req, res) => {
    try {
        const result = await db.query("SELECT * FROM books ORDER BY id ASC");
        res.render("index", {
          data: result.rows,
        });
    } catch (error) {
        console.log(error(error));
        res.status(500).send("Error retrieving books");
        
        
    }
    
  
});

app.post("/create", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}2579-S.jpg`);
    console.log(result.data);

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
    console.log(error.error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
