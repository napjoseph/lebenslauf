import { FunctionalComponent } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { parse as parseYaml } from "yaml";
import { columnSpan } from "@columnSpan";

import {
  Config,
  DEFAULT_CONTAINER_ID,
  DEFAULT_META_BODY_CONTAINER_DATA,
  DEFAULT_META_BODY_PAGE_DATA,
  Section,
} from "../models/config.ts";
import StaticHead from "../components/document/StaticHead.tsx";
import SectionComponent from "../components/sections/SectionComponent.tsx";

export const handler: Handlers<Config> = {
  async GET(_, ctx) {
    const rawData = await Deno.readTextFile(`./lebenslauf.yaml`);
    const data = parseYaml(rawData) as Config;

    return ctx.render(data);
  },
};

const HomePage: FunctionalComponent<PageProps<Config>> = ({ data }) => {
  /** Saves all the possible widths for easier consumption. */
  const widthsMap: Map<string, number> = new Map();
  /** A list of all the pages, and the containers per page. */
  const pagesData: Map<string, Section[]>[] = [];

  (data.meta.body?.pages || [DEFAULT_META_BODY_PAGE_DATA]).forEach(
    (page, index) => {
      const containersMap: Map<string, Section[]> = new Map();
      (page.containers ?? [DEFAULT_META_BODY_CONTAINER_DATA]).forEach(
        (container) => {
          const key = `${index + 1}--${container.id}`;
          containersMap.set(key, []);
          widthsMap.set(key, container.width);
        }
      );
      pagesData.push(containersMap);
    }
  );

  const defaultContainer = pagesData[0].keys().next().value;

  data.sections.forEach((section) => {
    let page = 1;
    let key = defaultContainer;

    if (section.meta?.container !== undefined) {
      const container = section.meta?.container || DEFAULT_CONTAINER_ID;
      page = section.meta?.page || 1;
      key = `${page}--${container}`;
    }

    const value = pagesData[page - 1].get(key) || [];
    pagesData[page - 1].set(key, [...value, section]);
  });

  const plainWidths = Object.fromEntries(widthsMap.entries());
  const plainPages = Array.from(pagesData).map((content) =>
    Object.fromEntries(content.entries())
  );

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
        ></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </head>
      <body class="bg-gray-700 print:bg-white xs:m-2 md:m-3 lg:m-5">
        <main class="mx-auto lg:w-a4 flex flex-col xs:space-y-2 md:space-y-3 lg:space-y-5">
          {plainPages.map((_containersMap, index) => {
            return (
              <article class="p-4 bg-white lg:h-a4">
                <div>
                  {Array.from(pagesData[index].keys()).map((key) => {
                    const width = widthsMap.get(key) || 0;
                    // Only process full width.
                    // TODO: Make this cleaner.
                    if (width !== 12) return;

                    const sections = pagesData[index].get(key) || [];

                    return (
                      <div class={columnSpan(width)}>
                        {(sections || []).map((section) => {
                          return <SectionComponent section={section} />;
                        })}
                      </div>
                    );
                  })}
                </div>
                <div class="grid grid-cols-1 md:grid-cols-12 md:gap-6 print:grid-cols-12 print:gap-6">
                  {Array.from(pagesData[index].keys()).map((key) => {
                    const width = widthsMap.get(key) || 0;
                    // Don't process full width.
                    // TODO: Make this cleaner.
                    if (width === 12) return;

                    const sections = pagesData[index].get(key) || [];
                    return (
                      <div class={columnSpan(width)}>
                        {(sections || []).map((section) => {
                          return <SectionComponent section={section} />;
                        })}
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </main>
      </body>
    </html>
  );
};

export default HomePage;
