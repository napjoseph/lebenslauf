/** @jsx h */
import { Fragment, FunctionalComponent, h } from "preact";

import { tw } from "@twind";

import { HeaderConfig } from "../../../models/config.ts";

interface HeaderSectionProps {
  config: HeaderConfig;
}

const HeaderSection: FunctionalComponent<HeaderSectionProps> = (
  { config },
) => {
  if (!config) return null;

  return (
    <Fragment>
      <div class={tw`text-center`}>
        <h1 class={tw`text-4xl font-bold uppercase`}>
          {config.title}
        </h1>
        {config.subtitle.trim() !== ""
          ? <div>{config.subtitle.trim()}</div>
          : null}
      </div>
    </Fragment>
  );
};

export default HeaderSection;
