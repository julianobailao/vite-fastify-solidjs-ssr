export const Footer = () => {
  return (
    <footer class={"justify-center items-center flex p-5"}>
      &copy; {new Date().getFullYear()} - <a href={"https://julianobailao.github.io"}>Juliano Bailão</a> -{" "}
      <a class={"p-1"} href={"https://github.com/julianobailao/vite-typescript-solidjs-ssr"}>
        Repo
      </a>
    </footer>
  );
};
