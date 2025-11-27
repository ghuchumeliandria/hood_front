import SignInPageForm from "./components/_molecules/signInPageForm/SignInPageForm";
import SignUpPageForm from "./components/_molecules/signInPageForm/SignInPageForm";
import SignUpPageImages from "./components/_molecules/signUpPageImages/SignUpPageImages";



export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between  px-2 md:px-20 bg-linear-to-r from-orange-500 to-yellow-300">

      <div className=" flex justify-center items-center mb-10 md:mb-0 relative">
        <SignUpPageImages />
      </div>

      <div className=" flex flex-col w-full max-w-[400px] ">
        <h1 className=" text-6xl font-hotel text-center text-white mb-6 ">
          Sick Nation
        </h1>
        <SignInPageForm />
      </div>
    </div>
  );
}
