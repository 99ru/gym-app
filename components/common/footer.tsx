import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
  <section className="mt-12">
    <footer className="p-4 text-center items-center justify-center absolute inset-x-0 bottom-0 sm:block hidden">
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
     </section>
  );
};

export default Footer;
