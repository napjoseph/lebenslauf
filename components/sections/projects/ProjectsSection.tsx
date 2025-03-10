import { FunctionalComponent } from "preact";
import { toReadableDate, toReadableDuration } from "@dateUtils";

import { ProjectsConfig } from "../../../models/config.ts";

interface ProjectsSectionProps {
  config: ProjectsConfig;
}

const ProjectsSection: FunctionalComponent<ProjectsSectionProps> = ({
  config,
}) => {
  if (!config.items) return null;

  const now = new Date().toISOString();

  return (
    <>
      <ul class="flex flex-col gap-2">
        {config.items.map((item) => {
          return (
            <li>
              <div>
                <div>
                  <div class="text-gray-900">
                    <a href={item.linkTo} target="_blank">
                      <h3 class="leading-4">{item.title}</h3>
                    </a>
                  </div>
                  <div class="text-xs text-gray-500 flex flex-wrap leading-4">
                    {item.dates.start !== "" && (
                      <span
                        class="font-semibold inline-flex"
                        title={toReadableDuration(
                          item.dates.start,
                          item.dates.end ?? now
                        )}
                      >
                        {toReadableDate(item.dates.start)} to{" "}
                        {toReadableDate(item.dates.end ?? now)}
                      </span>
                    )}

                    {item.dates.start !== "" && item.tags && (
                      <span class="mx-1 inline-flex">/</span>
                    )}

                    {item.tags && (
                      <>
                        {item.tags
                          .sort((a, b) =>
                            a.toLowerCase().localeCompare(b.toLowerCase())
                          )
                          .map((tag, index) => (
                            <span
                              key={index}
                              class="inline-flex break-words min-w-0"
                            >
                              {tag}
                              {index !== item.tags.length - 1 && (
                                <span class="mr-1">,</span>
                              )}
                            </span>
                          ))}
                      </>
                    )}
                  </div>
                </div>

                {item.roles && (
                  <div>
                    <ul class="mt-1 ml-6 list-square">
                      {item.roles.map((role, index) => {
                        return (
                          <li key={index} class="leading-4">
                            <span class="text-xs">{role}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProjectsSection;
