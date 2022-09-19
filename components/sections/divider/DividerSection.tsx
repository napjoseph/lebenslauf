/** @jsx h */
import { Fragment, FunctionalComponent, h } from "preact";

import { tw } from "@twind";

import { DividerConfig } from "../../../models/config.ts";

interface DividerSectionProps {
  config: DividerConfig;
}

const DividerSection: FunctionalComponent<DividerSectionProps> = (
  { config },
) => {
  if (!config) return null;

  return (
    <Fragment>
      <hr class={tw`my-4`} />
    </Fragment>
  );
};

export default DividerSection;
