import { useEffect } from "react";
import Logo from "../assets/icons/workflow.png";
import Signin from "src/modules/Auth/Signin";
import { useSelector } from "react-redux";
import Signup from "src/modules/Auth/Signup";
import { useNavigate } from "react-router";

export default function Home() {
  const signupVisible = useSelector((state) => state.auth.signupVisible);
  const loggedIn = useSelector((state) => state.auth.logged_in);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/user");
    }
  }, [loggedIn]);

  return (
    <main className="bg-slate-200">
      <section className="h-screen flex justify-between items-center lg:flex-row flex-col gap-10 max-w-6xl mx-auto px-4 py-16">
        <div className="sm:w-2/3 w-full">
          <div className="flex justify-start items-center gap-2 mx-auto mb-4">
            <img src={Logo} className="w-12" alt="mediaharbor-logo" />
            <p className="text-xl font-black text-center uppercase w-max text-slate-800">
              FlowTrack
            </p>
          </div>

          <h1 className="md:text-3xl text-3xl text-start tracking-wide text-gray-700 mb-3 font-black">
            Empower Your Teams with Flowtrack Excellence. Navigate Workspace,
            Projects, Tasks, and Documents Effortlessly.
          </h1>
          <p className="text-base font-normal text-start text-gray-600">
            In the world of project management, simplicity is key. Workflow
            provides a seamless and effortless experience for navigating through
            projects, taking notes, and curating image galleries. Whether you're
            a seasoned pro or new to project management, our user-friendly
            interface ensures that you can easily access, organize, and find
            what you need, when you need it. Effortless navigation, at your
            fingertips.
          </p>
        </div>

        <div className="lg:w-1/3 md:w-1/2 sm:w-2/3 w-full flex justify-center items-center gap-2  flex-col">
          {signupVisible ? <Signup /> : <Signin />}
        </div>
      </section>
    </main>
  );
}
