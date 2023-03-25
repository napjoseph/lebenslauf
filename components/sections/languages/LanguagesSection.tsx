import { FunctionalComponent } from "preact";
import { LanguagesConfig } from "../../../models/config.ts";

interface LanguagesSectionProps {
  config: LanguagesConfig;
}

const LanguagesSection: FunctionalComponent<LanguagesSectionProps> = (
  { config },
) => {
  if (!config.items) return null;

  return (
    <>
      <ul>
        {(config.items || []).map(
          (item) => {
            return (
              <li class="mb-2">
                <div>
                  <div>{item.title}</div>
                  <div class="text-gray-500 text-xs">
                    {item.description}
                  </div>
                </div>
              </li>
            );
          },
        )}
      </ul>
    </>
  );
};

export default LanguagesSection;
