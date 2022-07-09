/** @jsx h */
import { Fragment, FunctionalComponent, h } from "preact";

import { tw } from "@twind";
import { toReadableDate } from "@dateUtils";

import { WorkExperienceConfig } from "../../../models/config.ts";

interface WorkExperienceSectionProps {
  config: WorkExperienceConfig;
}

const WorkExperienceSection: FunctionalComponent<WorkExperienceSectionProps> = (
  { config },
) => {
  if (!config.items) return null;

  return (
    <Fragment>
      <ul>
        {(config.items || []).filter((
          item,
        ) => item.meta?.show ?? true).map(
          (item) => {
            return (
              <li class={tw`mb-2`}>
                <div class={tw`flex justify-between gap-2`}>
                  <div>
                    <h3>{item.title}</h3>
                    <div
                      class={tw`text-xs text-gray-500`}
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
                    <a
                      href={item.company.url}
                      target="_blank"
                      class={tw`font-semibold`}
                    >
                      {item.company.title}
                    </a>
                    <div class={tw`text-xs`}>
                      {item.company.address}
                    </div>
                  </div>
                </div>
                <div
                  class={tw`text-xs text-gray-500 text-justify mt-2`}
                >
                  {item.description}
                </div>
              </li>
            );
          },
        )}
      </ul>
    </Fragment>
  );
};

export default WorkExperienceSection;
