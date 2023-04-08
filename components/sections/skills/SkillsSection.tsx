import { FunctionalComponent } from "preact";
import {
  DEFAULT_SKILLS_CONFIG_PROFICIENCY_MAP,
  SkillsConfig,
  SkillsConfigOrderBy,
  SkillsConfigProficiencyMap,
  SkillsConfigSortBy,
  SkillsItemChild,
} from "../../../models/config.ts";
import { calculateTotalUsage } from "../../../utils/dateUtils.ts";

interface SkillsSectionProps {
  config: SkillsConfig;
}

const SkillsSection: FunctionalComponent<SkillsSectionProps> = ({ config }) => {
  if (!config.items) return null;

  const useYears = config.meta?.useYears ?? false;
  const useProficiencyMap = config.meta?.useProficiencyMap ?? false;
  const proficiencyMap: SkillsConfigProficiencyMap =
    config.meta?.proficiencyMap ?? DEFAULT_SKILLS_CONFIG_PROFICIENCY_MAP;
  const sortBy: SkillsConfigSortBy =
    config.meta?.sortBy ?? SkillsConfigSortBy.NONE;
  const orderBy: SkillsConfigOrderBy =
    config.meta?.orderBy ?? SkillsConfigOrderBy.ASCENDING;

  const showInfo = (item: SkillsItemChild): string => {
    if (useYears) return calculateTotalUsage(item.totalMonths);
    if (useProficiencyMap) return `${proficiencyMap[item.rating]}`;
    return `${item.rating}`;
  };

  const sortCategoryItems: (
    a: SkillsItemChild,
    b: SkillsItemChild
  ) => number = (a, b) => {
    if (sortBy === SkillsConfigSortBy.NONE) {
      return 0;
    } else if (sortBy === SkillsConfigSortBy.RATING) {
      if (a.rating > b.rating) {
        return orderBy === SkillsConfigOrderBy.ASCENDING ? 1 : -1;
      }
      if (a.rating < b.rating) {
        return orderBy === SkillsConfigOrderBy.ASCENDING ? -1 : 1;
      }
      return 0;
    } else if (sortBy === SkillsConfigSortBy.TITLE) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return orderBy === SkillsConfigOrderBy.ASCENDING ? 1 : -1;
      }
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return orderBy === SkillsConfigOrderBy.ASCENDING ? -1 : 1;
      }
      return 0;
    } else if (sortBy === SkillsConfigSortBy.YEARS) {
      if (a.totalMonths > b.totalMonths) {
        return orderBy === SkillsConfigOrderBy.ASCENDING ? 1 : -1;
      }
      if (a.totalMonths < b.totalMonths) {
        return orderBy === SkillsConfigOrderBy.ASCENDING ? -1 : 1;
      }
      return 0;
    }

    return 0;
  };

  return (
    <>
      <ul>
        {(config.items || [])
          .filter((category) => category.meta?.show ?? true)
          .map((category) => {
            return (
              <li class="mb-2">
                <div>
                  <h3 class="leading-5 text-xs font-semibold">
                    {category.title}
                  </h3>
                  <div class="text-xs">
                    <ul>
                      {(category.items || [])
                        .filter((item) => item.meta?.show ?? true)
                        .sort(sortCategoryItems)
                        .map((item) => {
                          return (
                            <li class="flex justify-between gap-2">
                              <span>{item.title}</span>
                              <span
                                class="text-gray-500"
                                title={`${item.rating} out of 10`}
                              >
                                {showInfo(item)}
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default SkillsSection;
