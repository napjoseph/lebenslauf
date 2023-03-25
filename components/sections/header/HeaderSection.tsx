import { FunctionalComponent } from "preact";
import { HeaderConfig } from "../../../models/config.ts";

interface HeaderSectionProps {
  config: HeaderConfig;
}

const HeaderSection: FunctionalComponent<HeaderSectionProps> = (
  { config },
) => {
  if (!config) return null;

  return (
    <>
      <div class="text-center">
        <h1 class="text-4xl font-bold uppercase">
          {config.title}
        </h1>
        {config.subtitle.trim() !== ""
          ? <div>{config.subtitle.trim()}</div>
          : null}
      </div>
    </>
  );
};

export default HeaderSection;
