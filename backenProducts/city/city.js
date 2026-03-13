import axios from "axios";
let users = []; // tableau local

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users",
    );
    console.log("Données récupérées avec succès");
    users = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données");
  }
};

export { fetchUsers, users };
