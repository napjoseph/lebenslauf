/** @jsx h */
import { Fragment, FunctionalComponent, h } from "preact";

import { tw } from "@twind";

import {
  DEFAULT_SKILLS_CONFIG_PROFICIENCY_MAP,
  SkillsConfig,
  SkillsConfigOrderBy,
  SkillsConfigProficiencyMap,
  SkillsConfigSortBy,
  SkillsItemChild,
} from "../../../models/config.ts";

interface SkillsSectionProps {
  config: SkillsConfig;
}

const SkillsSection: FunctionalComponent<SkillsSectionProps> = (
  { config },
) => {
  if (!config.items) return null;

  const useYears = config.meta?.useYears ?? false;
  const useProficiencyMap = config.meta?.useProficiencyMap ?? false;
  const proficiencyMap: SkillsConfigProficiencyMap =
    config.meta?.proficiencyMap ?? DEFAULT_SKILLS_CONFIG_PROFICIENCY_MAP;
  const sortBy: SkillsConfigSortBy = config.meta?.sortBy ??
    SkillsConfigSortBy.NONE;
  const orderBy: SkillsConfigOrderBy = config.meta?.orderBy ??
    SkillsConfigOrderBy.ASCENDING;

  const showInfo = (item: SkillsItemChild): string => {
    if (useYears && item.years === 1) return `${item.years} year`;
    if (useYears && item.years !== 1) return `${item.years} years`;
    if (useProficiencyMap) return `${proficiencyMap[item.rating]}`;
    return `${item.rating}`;
  };

  const sortCategoryItems: (a: SkillsItemChild, b: SkillsItemChild) => number =
    (
      a,
      b,
    ) => {
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
      }

      return 0;
    };

  return (
    <Fragment>
      <ul>
        {(config.items || []).filter((category) => category.meta?.show ?? true)
          .map(
            (category) => {
              return (
                <li class={tw`mb-2`}>
                  <div>
                    <h3>{category.title}</h3>
                    <div class={tw`text-xs text-gray-500`}>
                      <ul>
                        {(category.items || []).filter((item) =>
                          item.meta?.show ?? true
                        ).sort(sortCategoryItems).map((item) => {
                          return (
                            <li class={tw`flex justify-between gap-2`}>
                              <span class={tw`font-semibold`}>
                                {item.title}
                              </span>
                              <span title={`${item.rating} out of 10`}>
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
            },
          )}
      </ul>
    </Fragment>
  );
};

export default SkillsSection;
