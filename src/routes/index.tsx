/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import StaticHead from "../islands/StaticHead.tsx";

export default function Home() {
  return (
    <html>
      <head>
        <StaticHead />
      </head>
      <body>
        <div class={tw`p-4 mx-auto max-w-screen-lg`}>
          <h1 class={tw`text-4xl font-bold uppercase`}>Nap Joseph Calub</h1>
          <div>Full Stack Software Engineer</div>
        </div>
      </body>
    </html>
  );
}
