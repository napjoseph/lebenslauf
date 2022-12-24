/** @jsx h */
import { Fragment, FunctionalComponent, h } from "preact";

import { tw } from "@twind";
import { toReadableDate, toReadableDuration } from "@dateUtils";

import { ProjectsConfig } from "../../../models/config.ts";

interface ProjectsSectionProps {
  config: ProjectsConfig;
}

const ProjectsSection: FunctionalComponent<ProjectsSectionProps> = (
  { config },
) => {
  if (!config.items) return null;

  const now = new Date().toISOString();

  return (
    <Fragment>
      <ul class={tw`list-square ml-6`}>
        {(config.items || []).map(
          (item) => {
            return (
              <li>
                <div>
                  <div>
                    <div class={tw`text-gray-900`}>
                      <a href={item.linkTo} target="_blank">
                        <h3>{item.title}</h3>
                      </a>
                    </div>
                    <div
                      class={tw`text-xs text-gray-500`}
                    >
                      {item.dates.start !== "" && (
                        <span
                          class={tw`font-semibold`}
                          title={toReadableDuration(
                            item.dates.start,
                            item.dates.end ?? now,
                          )}
                        >
                          {toReadableDate(item.dates.start)} to{" "}
                          {toReadableDate(item.dates.end ?? now)}
                        </span>
                      )}

                      {item.dates.start !== "" && item.tags && (
                        <span class={tw`mx-1`}>|</span>
                      )}

                      {item.tags && (
                        <span>
                          <ul class={tw`inline`}>
                            {[...item.tags]
                              .sort((a, b) => {
                                return a.toLowerCase().localeCompare(
                                  b.toLowerCase(),
                                );
                              })
                              .map((tag, index) => {
                                return (
                                  <li
                                    key={index}
                                    class={tw`inline-block`}
                                  >
                                    <span class={tw`italic`}>
                                      {tag}
                                    </span>
                                    {index !== item.tags.length - 1 && (
                                      <span class={tw`mr-1`}>,</span>
                                    )}
                                  </li>
                                );
                              })}
                          </ul>
                        </span>
                      )}
                    </div>
                  </div>

                  {item.roles && (
                    <div>
                      <ul class={tw`mt-1 ml-6 list-square`}>
                        {item.roles.map((role, index) => {
                          return (
                            <li key={index} class={tw`leading-4`}>
                              <span class={tw`text-xs`}>{role}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            );
          },
        )}
      </ul>
    </Fragment>
  );
};

export default ProjectsSection;
