import { FunctionalComponent } from "preact";
import { toReadableDate, toReadableDuration } from "@dateUtils";

import { EducationConfig } from "../../../models/config.ts";

interface EducationSectionProps {
  config: EducationConfig;
}

const EducationSection: FunctionalComponent<EducationSectionProps> = ({
  config,
}) => {
  if (!config.items) return null;

  const now = new Date().toISOString();

  return (
    <>
      <ul>
        {(config.items || []).map((item) => {
          return (
            <li>
              <div>
                <h3 class="leading-4">{item.title}</h3>
                <div class="text-xs text-gray-500">
                  <div class="font-semibold">
                    <a href={item.from.url} target="_blank">
                      {item.from.name}
                    </a>
                  </div>
                  <div>
                    <a
                      href={`https://www.google.com/maps/place/${item.from.address}`}
                      target="_blank"
                    >
                      {item.from.address}
                    </a>
                  </div>
                  <div
                    class="text-xs text-gray-500"
                    title={toReadableDuration(
                      item.dates.startDate,
                      item.dates.endDate ?? now
                    )}
                  >
                    {toReadableDate(item.dates.startDate)} to{" "}
                    {toReadableDate(item.dates.endDate)}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default EducationSection;
