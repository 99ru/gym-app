import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="p-4 text-center flex items-center justify-center">
      <p className="text-lg mr-2">Project in progress🚀</p>
      <a
        href="https://github.com/99ru/gym-app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black"
      >
        <FaGithub size={24} />
      </a>
    </footer>
  );
};

export default Footer;
