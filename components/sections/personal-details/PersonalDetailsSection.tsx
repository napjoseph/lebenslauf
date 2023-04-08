import { FunctionalComponent } from "preact";
import { PersonalDetailsConfig } from "../../../models/config.ts";

interface PersonalDetailsSectionProps {
  config: PersonalDetailsConfig;
}

const PersonalDetailsSection: FunctionalComponent<
  PersonalDetailsSectionProps
> = ({ config }) => {
  if (!config.items) return null;

  return (
    <>
      <ul>
        {(config.items || [])
          .filter((item) => item.meta?.show ?? true)
          .map((item) => {
            return (
              <li class="mb-1">
                <div class="text-sm">
                  <span class="mr-2 text-gray-700">
                    <i class={item.icon} title={item.title}></i>
                  </span>
                  <span>
                    <a href={item.url} title={item.description} target="_blank">
                      {item.value}
                    </a>
                  </span>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default PersonalDetailsSection;
