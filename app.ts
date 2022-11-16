import express, { Request, Response, Application } from "express";
const app: Application = express();
app.use(express.json());
import axios from "axios";

app.post("/location", async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude);
  try {
    // make an third party api call to get details
    const apiResponse = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );``
const result = apiResponse?.data || undefined;
   if (!result || apiResponse.status !== 200) {
    return res.send(404).json({error: true, message: 'Invalid latitiude and longitude'});
   }
   const { countryName, city} = result;
    return res
      .status(200)
      .json({ msg: "result for your search", country: countryName, city: city });
  } catch (error: any) {
      console.log(error.status);
    return res.status( 500).json({ msg: "Did not get the loction", Error: error.message });
  }
});
app.listen(2389, () => {
  console.log("app is listing on port 2389");
});

















