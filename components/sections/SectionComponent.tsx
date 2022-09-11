/** @jsx h */
import { FunctionalComponent, h, JSX } from "preact";
import { tw } from "@twind";

import { Section, SectionType } from "../../models/config.ts";
import EducationSection from "./education/EducationSection.tsx";
import LanguagesSection from "./languages/LanguagesSection.tsx";
import PersonalDetailsSection from "./personal-details/PersonalDetailsSection.tsx";
import SkillsSection from "./skills/SkillsSection.tsx";
import WorkExperienceSection from "./work-experience/WorkExperienceSection.tsx";

interface SectionComponentProps {
  section: Section;
}

const SectionComponent: FunctionalComponent<SectionComponentProps> = (
  { section },
) => {
  let content: JSX.Element | null = null;
  switch (section.content.type) {
    case SectionType.EDUCATION:
      content = section.meta?.show
        ? <EducationSection config={section.content.value} />
        : null;
      break;
    case SectionType.LANGUAGES:
      content = section.meta?.show
        ? <LanguagesSection config={section.content.value} />
        : null;
      break;
    case SectionType.PERSONAL_DETAILS:
      content = section.meta?.show
        ? <PersonalDetailsSection config={section.content.value} />
        : null;
      break;
    case SectionType.WORK_EXPERIENCE:
      content = section.meta?.show
        ? <WorkExperienceSection config={section.content.value} />
        : null;
      break;
    case SectionType.SKILLS:
      content = section.meta?.show
        ? <SkillsSection config={section.content.value} />
        : null;
      break;
  }

  return (
    <div class={tw`mb-3`}>
      <h2 class={tw`text-xl font-bold uppercase mb-1`}>
        {section?.meta?.title || ""}
      </h2>
      {content && content}
    </div>
  );
};

export default SectionComponent;
