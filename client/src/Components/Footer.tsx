import { LoginButton } from "../Buttons/LoginButton"
import { LogoutButton } from "../Buttons/LogoutButton"

export const Footer = () => { 

    return (
        <div className="flex flex-col-reverse items-center justify-center mt-40 bg-custom-purple px-5 py-5 md:flex-row md:p-20 ">
            <div className="w-full md:w-1/3 text-white text-center pt-4 pb-4 md:pt-0">
          {/*   <FontAwesomeIcon icon={faFacebook} size="2xl" className="px-4 pt-4"/>
            <FontAwesomeIcon icon={faInstagram} size="2xl" />
            <FontAwesomeIcon icon={faSquareXTwitter} size="2xl" className="px-4"/> */}
            <p className="pt-8">© copyright all rights reserved 2024</p>
            </div>
            <div className="w-full md:w-1/3 text-white text-center pt-0 md:pt-4 md:pb-0">
                <ul className="text-lg leading-loose">
                    <li>
                        <a href="#">Contact</a>
                    </li>
                    <li>
                        <a href="#">Contributors</a>
                    </li>
                    <li>
                        <a href="#">License</a>
                    </li>
                    <li className="text-purple-600">
                       {/*  {isAuthenticated ? <LogoutButton /> : <LoginButton />   } */}
                       <LoginButton />
                       <LogoutButton />
                    </li>
                </ul>
                
                </div>
            <div className="w-full md:w-1/3 text-white text-right pb-0 md:py-4">
               {/*  <img src="../../Images/xploreLoggaPurpule.png" alt="logo" className="mx-auto  h-64 w-auto object-contain"/> */}
            </div>
        </div>
    )
}
