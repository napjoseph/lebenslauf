/** @jsx h */
import { FunctionalComponent, h, JSX } from "preact";
import { tw } from "@twind";

import { Section, SectionType } from "../../models/config.ts";
import HeaderSection from "./header/HeaderSection.tsx";
import DividerSection from "./divider/DividerSection.tsx";
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
  const marginBottom = section.meta?.marginBottom ?? 0.5;
  switch (section.content.type) {
    case SectionType.HEADER:
      content = section.meta?.show
        ? <HeaderSection config={section.content.value} />
        : null;
      break;
    case SectionType.DIVIDER:
      content = section.meta?.show
        ? <DividerSection config={section.content.value} />
        : null;
      break;
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
    <section style={{ marginBottom: `${marginBottom}rem` }}>
      {(section?.meta?.title || "").trim() !== ""
        ? (
          <h2 class={tw`text-xl font-bold uppercase mb-1`}>
            {section?.meta?.title || ""}
          </h2>
        )
        : null}

      {content && content}
    </section>
  );
};

export default SectionComponent;
