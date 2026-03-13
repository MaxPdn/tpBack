import app from "../src/appCity.js";
import {fetchUsers} from "./city.js";
const PORT = 3000;
app.listen(PORT, async () => {
  await fetchUsers();
  console.log(`Serveur démarré sur le port ${PORT}`);
});


