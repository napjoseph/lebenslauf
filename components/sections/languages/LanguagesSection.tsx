/** @jsx h */
import { Fragment, FunctionalComponent, h } from "preact";

import { tw } from "@twind";

import { LanguagesConfig } from "../../../models/config.ts";

interface LanguagesSectionProps {
  config: LanguagesConfig;
}

const LanguagesSection: FunctionalComponent<LanguagesSectionProps> = (
  { config },
) => {
  if (!config.items) return null;

  return (
    <Fragment>
      <ul>
        {(config.items || []).map(
          (item) => {
            return (
              <li class={tw`mb-2`}>
                <div>
                  <div>{item.title}</div>
                  <div class={tw`text-gray-500 text-xs`}>
                    {item.description}
                  </div>
                </div>
              </li>
            );
          },
        )}
      </ul>
    </Fragment>
  );
};

export default LanguagesSection;
