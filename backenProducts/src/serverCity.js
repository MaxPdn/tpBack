import app from "./appCity.js";
import {fetchUsers} from "./data/city.js";
const PORT = 3000;
app.listen(PORT, async () => {
  await fetchUsers();
  console.log(`Serveur démarré sur le port ${PORT}`);
});


