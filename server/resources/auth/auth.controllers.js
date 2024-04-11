require('dotenv').config();

const fetchUsers = require('../../helpers/fetchUsers');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const register = async (req, res) => {
    
        const { email, password } = req.body;
    try{
        const user = await fetchUsers();
        const userAlreadyExists = user.find(u => u.email === email);

        if (userAlreadyExists) {
            return res.status(400).json('Användaren finns redan, välj en annan e-postadress');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = await stripe.customers.create({
            email: email
        })

        const newUser = {
            email,
            password: hashedPassword,
            stripeCustomerId: customer.id
        }
        user.push(newUser);
        await fs.writeFile('./data/users.json', JSON.stringify(user, null, 2));

        res.status(201).json(newUser.email);

} catch (error) {
    console.error(error);
    res.status(500).json('Serverfel');
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await fetchUsers();
    const userExists = user.find(u => u.email === email);

    if (!userExists || !await bcrypt.compare(password, userExists.password)) {
        return res.status(400).json('Fel e-postadress eller lösenord');
    }

    req.session.user = userExists
    res.status(200).json(userExists.email);

}


const logout = (req, res) => {
    req.session = null;
    res.status(200).json('Du är nu utloggad');
}   

const authorize = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json('Du är inte inloggad');
    }
    res.status(200).json(req.session.user);
}

module.exports = { register, login, logout, authorize }