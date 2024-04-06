const fetchUsers = require('../../helpers/fetchUsers');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    
    const { email, password } = req.body;

    const users = await fetchUsers();
    const userAlreadyExists = users.find(u => u.email === email);

    if (userAlreadyExists) {
        return res.status(400).json('Användaren finns redan, välj en annan e-postadress');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        email,
        password: hashedPassword
    }
    users.push(newUser);
    await fs.writeFile('./data/users.json', JSON.stringify(users, null, 2));

    res.status(201).json(newUser.email);

}

const login = async (req, res) => {
    const { email, password } = req.body;

    const users = await fetchUsers();
    const userExists = users.find(u => u.email === email);

    if (!userExists || !await bcrypt.compare(password, userExists.password)) {
        return res.status(400).json('Fel e-postadress eller lösenord');
    }

    req.session.users = userExists
    res.status(200).json(userExists.email);

}


const logout = (req, res) => {
    req.session = null;
    res.status(200).json('Du är nu utloggad');
}   

const authorize = (req, res) => {
    if (!req.session.users) {
        return res.status(401).json('Du är inte inloggad');
    }
    res.status(200).json(req.session.users);
}

module.exports = { register, login, logout, authorize }