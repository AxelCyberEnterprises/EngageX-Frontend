import { Dispatch, SetStateAction, useState } from "react";

const AccessDeniedPage = ({
  setIsAllowed,
}: {
  setIsAllowed: Dispatch<SetStateAction<boolean>>;
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trimEnd() !== import.meta.env.VITE_ENGAGEX_PASS) {
      setError("Incorrect password");
    } else {
      setIsAllowed(true);
    }
  };

  return (
    <div
      className="bg-black h-[100vh] w-[100vw] space-y-10 fixed top-0 right-0"
      style={{ textAlign: "center" }}
    >
      <h1 className="text-8xl mt-[10rem] text-gray-500">Access Denied</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          className="w-[50%]"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button
          type="submit"
          className="mx-auto mt-20 bg-white py-3 px-20 text-lg text-black"
        >
          Enter
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AccessDeniedPage;
