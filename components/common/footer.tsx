import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="mt-12">
      <footer className="p-4 text-center items-center justify-center absolute inset-x-0 bottom-0 sm:block hidden">
        
        <a
          href="https://github.com/99ru/gym-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black flex items-center"
        >
          <FaGithub size={24} />
          <span className="ml-2">Github</span>
        </a>
      </footer>
    </section>
  );
};

export default Footer;
