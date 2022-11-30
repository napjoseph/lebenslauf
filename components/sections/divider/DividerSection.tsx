/** @jsx h */
import { Fragment, FunctionalComponent, h } from "preact";
import { tw } from "@twind";

import { DividerConfig } from "../../../models/config.ts";
import SiteLogo from "../../ui/SiteLogo.tsx";

interface DividerSectionProps {
  config: DividerConfig;
}

const DividerSection: FunctionalComponent<DividerSectionProps> = (
  { config },
) => {
  if (!config) return null;

  return (
    <Fragment>
      <div class={tw`relative`}>
        <div class={tw`absolute inset-0 flex items-center`} aria-hidden="true">
          <div class={tw`w-full border-t-1 border-gray-300`}></div>
        </div>

        <div class={tw`relative flex justify-center`}>
          <a
            href={config.url}
            title={config.title}
            target="blank"
            class={tw`px-2 bg-white`}
          >
            <div class={tw`text-gray-500 bg-white`}>
              <SiteLogo height="24" width="24" />
            </div>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default DividerSection;
