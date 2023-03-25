import { FunctionalComponent } from "preact";
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
    <>
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t-1 border-gray-300"></div>
        </div>

        <div class="relative flex justify-center">
          <a
            href={config.url}
            title={config.title}
            target="blank"
            class="px-2 bg-white"
          >
            <div class="text-gray-500 bg-white">
              <SiteLogo height="24" width="24" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default DividerSection;
