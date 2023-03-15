/** @jsx h */
import { Fragment, FunctionalComponent, h } from "preact";

import { tw } from "@twind";

import { PersonalDetailsConfig } from "../../../models/config.ts";

interface PersonalDetailsSectionProps {
  config: PersonalDetailsConfig;
}

const PersonalDetailsSection: FunctionalComponent<PersonalDetailsSectionProps> =
  (
    { config },
  ) => {
    if (!config.items) return null;

    return (
      <Fragment>
        <ul>
          {(config.items || []).filter((item) => item.meta?.show ?? true).map(
            (item) => {
              return (
                <li class={tw`mb-1`}>
                  <div class={tw`text-sm`}>
                    <span class={tw`mr-2 text-gray-700`}>
                      <i class={item.icon} title={item.title}></i>
                    </span>
                    <span class={tw`text-gray-600`}>
                      <a
                        href={item.url}
                        title={item.description}
                        target="_blank"
                      >
                        {item.value}
                      </a>
                    </span>
                  </div>
                </li>
              );
            },
          )}
        </ul>
      </Fragment>
    );
  };

export default PersonalDetailsSection;
