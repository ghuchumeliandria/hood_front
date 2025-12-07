import SignInPageForm from "./components/_molecules/signInPageForm/SignInPageForm";
import SignUpPageForm from "./components/_molecules/signInPageForm/SignInPageForm";
import SignUpPageImages from "./components/_molecules/signUpPageImages/SignUpPageImages";
import IsLoggedIn from "./guard/IsLoggedIn.guard";
import NotLoggedIn from "./guard/NotLoggedIn.guard";



export default function Home() {




  return (
    <NotLoggedIn>

      <div className="w-full min-h-screen flex    items-center justify-between  px-10 py-6 gap-2 bg-linear-to-r from-orange-500 to-yellow-300 max-[1260px]:flex-col max-[1260px]:justify-center max-[500px]:justify-start max-[500px]:py-12 transition-all duration-200">

        <div className="relative">
          <SignUpPageImages />
        </div>

        <div className=" flex flex-col w-full max-w-[400px] ">
          <h1 className=" text-6xl  font-hotel text-center text-white mb-6 max-[500px]:text-[36px] ">
            Sick Nation
          </h1>
          <SignInPageForm />
        </div>
      </div>
    </NotLoggedIn>
  );
}
