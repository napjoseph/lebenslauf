/** @jsx h */
import { FunctionalComponent, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { parse as parseYaml } from "yaml";

import { tw } from "@twind";
import { columnSpan } from "@columnSpan";

import { Config, Section } from "../models/config.ts";
import StaticHead from "../components/document/StaticHead.tsx";
import SectionComponent from "../components/sections/SectionComponent.tsx";

export const handler: Handlers<Config> = {
  async GET(_, ctx) {
    const rawData = await Deno.readTextFile(
      `./lebenslauf.yaml`,
    );
    const data = parseYaml(rawData) as Config;

    return ctx.render(data);
  },
};

const HomePage: FunctionalComponent<PageProps<Config>> = ({ data }) => {
  const containersMap: Map<string, Section[]> = new Map();
  const containersWidthMap: Map<string, number> = new Map();
  const containerKeys: string[] = [];
  (data.meta.body?.containers || []).forEach((item) => {
    containerKeys.push(item.id);
    containersMap.set(item.id, []);
    containersWidthMap.set(item.id, item.width);
  });
  if (containersMap.size === 0) {
    containerKeys.push("default");
    containersMap.set("default", []);
  }
  const defaultContainer = containersMap.keys().next().value;

  data.sections.forEach((section) => {
    const key = section.meta?.container || defaultContainer;
    const value = containersMap.get(key) || [];
    containersMap.set(key, [...value, section]);
  });

  return (
    <html>
      <head>
        <title>{data.meta.head?.title || ""}</title>

        <StaticHead />

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
          integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        >
        </script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </head>
      <body class={tw`bg-gray-700 print:bg-white xs:m-2 md:m-3 lg:m-5`}>
        <main class={tw`p-4 mx-auto max-w-screen-a4 bg-white`}>
          <div class={tw`text-center`}>
            <h1 class={tw`text-4xl font-bold uppercase`}>
              {data.meta.body!.header!.title}
            </h1>
            <div>{data.meta.body!.header!.subtitle}</div>
          </div>

          <hr class={tw`my-4`} />

          <div
            class={tw
              `grid grid-cols-1 md:grid-cols-12 md:gap-6 print:grid-cols-12 print:gap-6`}
          >
            {containerKeys.map((key) => {
              const sections = containersMap.get(key) || [];
              const width = containersWidthMap.get(key) || 0;
              return (
                <div class={columnSpan(width)}>
                  {(sections || []).map((section) => {
                    return <SectionComponent section={section} />;
                  })}
                </div>
              );
            })}
          </div>
        </main>
      </body>
    </html>
  );
};

export default HomePage;
