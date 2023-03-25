import { FunctionalComponent } from "preact";
import { toReadableDate, toReadableDuration } from "@dateUtils";

import { WorkExperienceConfig } from "../../../models/config.ts";

interface WorkExperienceSectionProps {
  config: WorkExperienceConfig;
}

const WorkExperienceSection: FunctionalComponent<WorkExperienceSectionProps> = (
  { config },
) => {
  if (!config.items) return null;

  const now = new Date().toISOString();

  return (
    <>
      <ul>
        {(config.items || []).filter((
          item,
        ) => item.meta?.show ?? true).map(
          (item) => {
            return (
              <li class="mb-2">
                <div class="flex justify-between gap-2">
                  <div>
                    <h3>{item.title}</h3>
                    <div
                      class="text-xs text-gray-500"
                      title={toReadableDuration(
                        item.dates.startDate,
                        item.dates.endDate ?? now,
                      )}
                    >
                      {toReadableDate(item.dates.startDate)} to{" "}
                      {item.dates.endDate
                        ? toReadableDate(item.dates.endDate)
                        : "present"}
                    </div>
                  </div>
                  <div class="text-gray-500 text-right text-xs">
                    <a
                      href={item.company.url}
                      target="_blank"
                      class="font-semibold"
                    >
                      {item.company.title}
                    </a>
                    <div class="text-xs">
                      <a
                        href={`https://www.google.com/maps/place/${item.company.address}`}
                        target="_blank"
                      >
                        {item.company.address}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="text-xs text-gray-600 text-justify mt-2">
                  {item.description}
                </div>
              </li>
            );
          },
        )}
      </ul>
    </>
  );
};

export default WorkExperienceSection;
