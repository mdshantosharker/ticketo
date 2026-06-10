const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const db = client.db("ticketo");
    const organizationCollection = db.collection("organizations");
    const eventsCollection = db.collection("events");
    const bookingCollection = db.collection("bookings");
    const paymentCollection = db.collection("payments");

    app.get("/api/organizations/:email", async (req, res) => {
      const { email } = req.params;
      const result = await organizationCollection.findOne({
        organizerEmail: email,
      });
      res.send(result);
    });

    app.post("/api/organizations", async (req, res) => {
      const {
        organizationName,
        logo,
        website,
        description,
        organizerEmail,
        status,
      } = req.body;

      const addData = {
        organizationName,
        logo,
        website,
        description,
        organizerEmail,
        status,
        createdAt: new Date(),
        status: "active",
      };

      const result = await organizationCollection.insertOne(addData);
      res.send(result);
    });

    app.patch("/api/organizations/:id", async (req, res) => {
      const { id } = req.params;
      const { organizationName, logo, website, description, organizerEmail } =
        req.body;

      const updateData = {
        organizationName,
        logo,
        website,
        description,
        organizerEmail,
      };

      const result = await organizationCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: updateData,
        },
      );

      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
