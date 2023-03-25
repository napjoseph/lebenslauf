import { FunctionalComponent } from "preact";

const StaticHead: FunctionalComponent = () => {
  return (
    <>
      <link rel="manifest" href={"/manifest.json"} />

      <link
        rel="apple-touch-icon"
        href={"/apple-touch-icon.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={"/favicon-32x32.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={"/favicon-16x16.png"}
      />
      <link rel="icon" type="image/x-icon" href={"/favicon.ico"} />

      <link rel="author" href={"/humans.txt"} />

      <meta name="theme-color" content="#ffffff" />
    </>
  );
};

export default StaticHead;
