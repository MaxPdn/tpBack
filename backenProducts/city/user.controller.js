import { users } from "./city.js";


//GET /users (Pagination)
const getAllUsers = (req, res) => {
  const { page, limit, sort } = req.query;

  let result = [...users];

  // Tri (bonus)
  if (sort) {
    result.sort((a, b) => a[sort]?.localeCompare(b[sort]));
  }

  // Pagination
  if (page && limit) {
    const start = (page - 1) * limit;
    const end = start + Number(limit);
    result = result.slice(start, end);
  }

  res.json(result);
};

//GET /users/:id
const getUserId = (req, res) => {
  const id = Number(req.params.id);
console.log(users);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  res.json(user);
};

//Filtrage par ville
const filtrageVille = (req, res) => {
  const city = req.params.city.toLowerCase();

  const filtered = users.filter(
    (user) => user.address.city.toLowerCase() === city,
  );

  res.json(filtered);
};

//Filtrage par username

const getFiltrageUserName = (req, res) => {
  const username = req.params.username.toLowerCase();

  const filtered = users.filter(
    (user) => user.username.toLowerCase() === username,
  );

  res.json(filtered);
};

//Double filtrage
const getDoubleFiltrage = (req, res) => {
  const { city, username } = req.params;

  const filtered = users.filter(
    (user) =>
      user.address.city.toLowerCase() === city.toLowerCase() &&
      user.username.toLowerCase() === username.toLowerCase(),
  );

  res.json(filtered);
};

//POST /users
const postUsers = (req, res) => {
  const newUser = req.body;

  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const userToAdd = {
    ...newUser,
    id: newId,
    createdAt: new Date(),
  };

  users.push(userToAdd);

  res.status(201).json(userToAdd);
};

//PUT /users/:id
const putUsersId = (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  users[index] = {
    ...users[index],
    ...req.body,
  };

  res.json(users[index]);
};

//DELETE /users/:id
const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  const initialLength = users.length;
  users = users.filter((u) => u.id !== id);

  if (users.length === initialLength) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  res.json({ message: "Utilisateur supprimé" });
};

//DELETE /users/range/:min/:max
const deleteUserRang = (req, res) => {
  const min = Number(req.params.min);
  const max = Number(req.params.max);

  const initialLength = users.length;

  users = users.filter((u) => u.id < min || u.id > max);

  if (users.length === initialLength) {
    return res.json({ message: "Aucun utilisateur dans cette plage" });
  }

  res.json({ message: "Utilisateurs supprimés avec succès" });
};
export const userController = {
  getAllUsers,
  getUserId,
  filtrageVille,
  getFiltrageUserName,
  getDoubleFiltrage,
  postUsers,
  putUsersId,
  deleteUser,
  deleteUserRang,
};
