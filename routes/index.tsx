/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { parse as parseYaml } from "yaml";
import { format as formatDate, parseISO as parseDate } from "date-fns";

import StaticHead from "../islands/StaticHead.tsx";
import { Config, SectionType } from "../models/config.ts";

export const handler: Handlers<Config> = {
  async GET(_, ctx) {
    const rawData = await Deno.readTextFile(
      `./lebenslauf.yaml`,
    );
    const data = parseYaml(rawData) as Config;

    return ctx.render(data);
  },
};

/** Returns a Date in human-readable format. */
const toReadableDate = (dateString: string): string => {
  return formatDate(parseDate(dateString), "MMMM yyyy");
};

export default function Home({ data }: PageProps<Config>) {
  const personalDetails = data.sections.find((section) =>
    section.content.type === SectionType.PERSONAL_DETAILS
  );
  const educationalBackground = data.sections.find((section) =>
    section.content.type === SectionType.EDUCATION
  );
  const workExperience = data.sections.find((section) =>
    section.content.type === SectionType.WORK_EXPERIENCE
  );

  return (
    <html>
      <head>
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
      <body>
        <div class={tw`p-4 mx-auto max-w-screen-lg`}>
          <div class={tw`text-center`}>
            <h1 class={tw`text-4xl font-bold uppercase`}>
              {data.meta!.body!.header!.title}
            </h1>
            <div>{data.meta!.body!.header!.subtitle}</div>
          </div>

          <hr class={tw`my-4`} />

          <div
            class={tw
              `grid grid-cols-1 md:grid-cols-12 md:gap-4 print:grid-cols-12 print:gap-4`}
          >
            <div class={tw`col-span-4`}>
              {/* Personal Details */}
              <div class={tw`mb-2`}>
                <h2 class={tw`text-xl font-bold uppercase mb-2`}>
                  {personalDetails?.meta?.title || ""}
                </h2>
                <ul>
                  {(personalDetails?.content.type ===
                          SectionType.PERSONAL_DETAILS &&
                      personalDetails?.content.value.items || []).map(
                      (item) => {
                        return (
                          <li class={tw`my-1`}>
                            <div class={tw`text-sm`}>
                              <span class={tw`mr-2 text-gray-700`}>
                                <i class={item.icon} title={item.title}></i>
                              </span>
                              <span class={tw`text-gray-600`}>
                                <a href={item.url} target="_blank">
                                  {item.value}
                                </a>
                              </span>
                            </div>
                          </li>
                        );
                      },
                    )}
                </ul>
              </div>

              {/* Educational Background */}
              <div class={tw`mb-2`}>
                <h2 class={tw`text-xl font-bold uppercase mb-2`}>
                  {educationalBackground?.meta?.title || ""}
                </h2>
                <ul>
                  {(educationalBackground?.content.type ===
                          SectionType.EDUCATION &&
                      educationalBackground?.content.value.items || []).map(
                      (item) => {
                        return (
                          <li>
                            <div>
                              <h3>{item.title}</h3>
                              <div class={tw`text-xs text-gray-500`}>
                                <div class={tw`font-semibold`}>
                                  <a href={item.from.url} target="_blank">
                                    {item.from.name}
                                  </a>
                                </div>
                                <div>
                                  {item.from.address}
                                </div>
                                <div class={tw`text-xs text-gray-500`}>
                                  {toReadableDate(item.dates.startDate)} to{" "}
                                  {toReadableDate(item.dates.endDate)}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      },
                    )}
                </ul>
              </div>
            </div>
            <div class={tw`col-span-8`}>
              {/* Work Experience */}
              <div class={tw`mb-2`}>
                <h2 class={tw`text-xl font-bold uppercase mb-2`}>
                  {workExperience?.meta?.title || ""}
                </h2>
                <ul>
                  {(workExperience?.content.type ===
                          SectionType.WORK_EXPERIENCE &&
                      workExperience?.content.value.items || []).filter((
                      item,
                    ) => item.meta?.show ?? true
                    ).map(
                      (item) => {
                        return (
                          <li class={tw`mb-2`}>
                            <div class={tw`flex justify-between gap-2`}>
                              <div>
                                <h3>{item.title}</h3>
                                <div
                                  class={tw`text-xs text-gray-500 italic`}
                                >
                                  {toReadableDate(item.dates.startDate)} to{" "}
                                  {item.dates.endDate
                                    ? toReadableDate(item.dates.endDate)
                                    : "present"}
                                </div>
                              </div>
                              <div
                                class={tw`text-gray-500 text-right text-xs`}
                              >
                                <a href={item.company.url} target="_blank">
                                  {item.company.title}
                                </a>
                                <div class={tw`text-xs`}>
                                  {item.company.address}
                                </div>
                              </div>
                            </div>
                            <div
                              class={tw
                                `text-xs text-gray-500 text-justify mt-2`}
                            >
                              {item.description}
                            </div>
                          </li>
                        );
                      },
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
