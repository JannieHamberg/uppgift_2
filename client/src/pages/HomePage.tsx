import { useEffect, useState, ChangeEvent, FormEvent } from "react"


const App = () => {
  const [user, setUser] = useState<string>("")
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch('http://localhost:3001/api/auth/authorize', {
        credentials: "include"
      })
      const data = await response.json()
      if (response.status === 200) {
        setUser(data.email)
      } else {
        setUser("")
      }
    }
    authorize()
  }, [])

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const register = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
    const data = await response.json();
    console.log(data);
    // Add error handling here
  };

  const login = async () => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const data = await response.json();
    if (response.status === 200) {
        setEmail(data.email);
        setPassword("");
        window.location.href = "/";
    } 
    else {
        alert("Du har angivit ett felaktigt använamn eller lösenord. Försök igen!");
        setEmail("");
        setPassword("");
    }
};

const logout = async () => {
  const response = await fetch('http://localhost:3001/api/auth/logout', {
      method: "POST",
      credentials: "include"
  })

  if (response.status === 200) {
    setUser("")
  }
}


  return (
    <div className="home-content mt-20 flex justify-center ">
      <div className="mt-20">
      <h1>{user ? "INLOGGAD:" + user : "UTLOGGAD"}</h1>
      </div>
      
      <form onSubmit={register}>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" required />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required />
        <button type="submit">Registrera 😁</button>
      </form>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="registerUser" placeholder="Email"></input>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="registerPassword" placeholder="Password"></input>
      <button onClick={login}>Logga in</button>
      <button onClick={logout}>Logga ut</button>


    </div>
    
  )
}


export default App