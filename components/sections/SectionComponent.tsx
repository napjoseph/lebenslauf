/** @jsx h */
import { FunctionalComponent, h, JSX } from "preact";
import { tw } from "@twind";
import Linkify from "linkify-react";

import { Section, SectionType } from "../../models/config.ts";
import HeaderSection from "./header/HeaderSection.tsx";
import DividerSection from "./divider/DividerSection.tsx";
import EducationSection from "./education/EducationSection.tsx";
import LanguagesSection from "./languages/LanguagesSection.tsx";
import PersonalDetailsSection from "./personal-details/PersonalDetailsSection.tsx";
import SkillsSection from "./skills/SkillsSection.tsx";
import WorkExperienceSection from "./work-experience/WorkExperienceSection.tsx";
import CertificationsSection from "./certifications/CertificationsSection.tsx";
import ProjectsSection from "./projects/ProjectsSection.tsx";

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
    case SectionType.CERTIFICATIONS:
      content = section.meta?.show
        ? <CertificationsSection config={section.content.value} />
        : null;
      break;
    case SectionType.PROJECTS:
      content = section.meta?.show
        ? <ProjectsSection config={section.content.value} />
        : null;
      break;
  }

  const sectionFooter = (section?.meta?.footer || "").trim();

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

      {sectionFooter !== ""
        ? (
          <div class={tw`text-xs mt-5 text-right`}>
            <Linkify
              as="p"
              options={{ defaultProtocol: "https", render: renderLink }}
            >
              {sectionFooter}
            </Linkify>
          </div>
        )
        : null}
    </section>
  );
};

// deno-lint-ignore no-explicit-any
const renderLink = ({ attributes, content }: any) => {
  const { href, ...props } = attributes;
  return (
    <a href={href} class={tw`font-medium`} {...props} target="_blank">
      {content}
    </a>
  );
};

export default SectionComponent;
