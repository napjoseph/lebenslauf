/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { parse as yamlParse } from "yaml";

import StaticHead from "../islands/StaticHead.tsx";
import { Config } from "../models/config.ts";
import { SectionType } from "../models/sections/index.ts";

export const handler: Handlers<Config> = {
  async GET(_, ctx) {
    const rawData = await Deno.readTextFile(
      `./src/pro-file.yaml`,
    );
    const data = yamlParse(rawData) as Config;

    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<Config>) {
  const educationalBackground = data.sections.find((section) =>
    section.content.type === SectionType.EDUCATION
  );

  return (
    <html>
      <head>
        <StaticHead />
      </head>
      <body>
        <div class={tw`p-4 mx-auto max-w-screen-lg`}>
          <div class={tw`text-center`}>
            <h1 class={tw`text-4xl font-bold uppercase`}>
              {data.meta!.head!.title}
            </h1>
            <div>Full Stack Software Engineer</div>
          </div>

          <hr class={tw`my-4`} />

          <div class={tw`my-2`}>
            <h2 class={tw`text-xl font-bold uppercase mb-2`}>
              {educationalBackground?.title || ""}
            </h2>
            <ul>
              {(educationalBackground?.content.type === SectionType.EDUCATION &&
                  educationalBackground?.content.value.items || []).map(
                  (item) => {
                    return (
                      <li>
                        <div>
                          <h3>{item.title}</h3>
                          <div class={tw`text-xs`}>
                            <span class={tw`font-semibold`}>
                              {item.from.name}
                            </span>
                            <span class={tw`mx-1`}>|</span>
                            <span class={tw`italic`}>
                              {item.from.address}
                            </span>
                          </div>
                          <div class={tw`text-xs text-gray-500`}>
                            {item.dates.start} to {item.dates.end}
                          </div>
                        </div>
                      </li>
                    );
                  },
                )}
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
