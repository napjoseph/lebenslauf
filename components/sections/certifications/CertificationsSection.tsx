import { FunctionalComponent, JSX } from "preact";
import { tw } from "twind";
import { toReadableDate } from "@dateUtils";
import {
  CertificationsConfig,
  CertificationsItem,
  CertificationsMeta,
  DEFAULT_CERTIFICATIONS_META,
} from "../../../models/config.ts";

interface CertificationsSectionProps {
  config: CertificationsConfig;
}

const CertificationsSection: FunctionalComponent<
  CertificationsSectionProps
> = ({ config }) => {
  if (!config.items) return null;
  const { meta = DEFAULT_CERTIFICATIONS_META } = config;

  return (
    <CertificationsList meta={meta} items={config.items} firstLevel={true} />
  );
};

interface CertificationsListProps {
  meta: CertificationsMeta;
  items: CertificationsItem[];
  firstLevel?: boolean;
}

const CertificationsList: FunctionalComponent<CertificationsListProps> = ({
  meta = DEFAULT_CERTIFICATIONS_META,
  items = [],
  firstLevel = false,
}) => (
  <ul class="list-square ml-6 flex flex-col">
    {sortedItems(items)
      .filter(visibleItem)
      .map((item) => (
        <li class="text-gray-900">
          <div class="justify-between">
            {renderTitle(item, firstLevel)}
            <div class="text-gray-500 text-xs flex flex-wrap">
              {createSubHeaderItems(meta, item)}
            </div>
            {item.children && (
              <div>
                <CertificationsList meta={meta} items={item.children} />
              </div>
            )}
          </div>
        </li>
      ))}
  </ul>
);

const sortedItems = (items: CertificationsItem[]) =>
  items.sort((a, b) => (b.issuedDate || "").localeCompare(a.issuedDate || ""));

const visibleItem = (item: CertificationsItem) => item.meta?.show ?? true;

const renderTitle = (item: CertificationsItem, firstLevel: boolean) => {
  const titleClass = tw`text-gray-900 leading-4 ${firstLevel ? "" : "text-xs"}`;
  const titleContent = item.title;

  return item.credentialUrl ? (
    <h3 class={titleClass}>
      <a href={item.credentialUrl}>{titleContent}</a>
    </h3>
  ) : (
    <h3 class={titleClass}>{titleContent}</h3>
  );
};

const createSubHeaderItems = (
  meta: CertificationsMeta,
  item: CertificationsItem
): JSX.Element => {
  const filteredSubHeaderItems =
    meta.subHeaderItems?.filter((subHeaderItem) => {
      const element = renderSubHeaderItem(subHeaderItem, meta, item);
      return element !== null;
    }) ?? [];
  const total = filteredSubHeaderItems.length;

  return (
    <>
      {filteredSubHeaderItems?.map((subHeaderItem, index) => {
        return (
          <span key={index} class="inline-flex">
            {renderSubHeaderItem(subHeaderItem, meta, item)}
            {index !== total - 1 && <span class="mx-1">/</span>}
          </span>
        );
      })}
    </>
  );
};

const renderSubHeaderItem = (
  subHeaderItem: string,
  meta: CertificationsMeta,
  item: CertificationsItem
): JSX.Element | null => {
  switch (subHeaderItem) {
    case "credentialType":
      return renderLabelValue(
        "Credential Type",
        mapCredentialTypeValue(meta, item)
      );
    case "credentialId":
      return item.credentialId ? renderCredentialId(item) : null;
    case "offeredBy":
      return item.offeredBy
        ? renderLabelValue("Offered By", mapOfferedByValue(meta, item))
        : null;
    case "issuingOrganization":
      return item.issuingOrganization
        ? renderLabelValue("Issuer", mapIssuingOrganizationValue(meta, item))
        : null;
    case "issuedDate":
      return item.issuedDate
        ? renderLabelValue("Issued Date", toReadableDate(item.issuedDate ?? ""))
        : null;
    case "gradeAchieved":
      return item.gradeAchieved
        ? renderLabelValue("Grade Achieved", item.gradeAchieved ?? "")
        : null;
    default:
      return null;
  }
};

const renderLabelValue = (label: string, value: JSX.Element | string) => (
  <span>
    <span class="mr-1">{label}:</span>
    <span class="font-medium break-words">{value}</span>
  </span>
);

const renderCredentialId = (item: CertificationsItem) => {
  const credentialId = item.credentialId?.substring(0, 40);
  return renderLabelValue(
    "Credential ID",
    <a href={item.verificationUrl}>{credentialId}</a>
  );
};

const mapCredentialTypeValue = (
  meta: CertificationsMeta,
  item: CertificationsItem
): JSX.Element => {
  const key = item.credentialType || "";
  const results = (meta.credentialTypeMapping ?? []).filter(
    (mapItem) => mapItem.key === key
  );

  if (results.length === 0) {
    return <>{item.credentialType}</>;
  }

  const mapping = results[0];
  return <>{mapping.displayName}</>;
};

const mapIssuingOrganizationValue = (
  meta: CertificationsMeta,
  item: CertificationsItem
): JSX.Element => {
  const key = item.issuingOrganization || "";
  const results = (meta.issuingOrganizationMapping ?? []).filter(
    (mapItem) => mapItem.key === key
  );

  if (results.length === 0) {
    return <>{item.issuingOrganization}</>;
  }

  const mapping = results[0];
  if (mapping.url) {
    return (
      <>
        <a href={mapping.url}>{mapping.displayName}</a>
      </>
    );
  }

  return <>{mapping.displayName}</>;
};

const mapOfferedByValue = (
  meta: CertificationsMeta,
  item: CertificationsItem
): JSX.Element => {
  const key = item.offeredBy || "";
  const results = (meta.offeredByMapping ?? []).filter(
    (mapItem) => mapItem.key === key
  );

  if (results.length === 0) {
    return <>{item.offeredBy}</>;
  }

  const mapping = results[0];
  if (mapping.url) {
    return (
      <>
        <a href={mapping.url}>{mapping.displayName}</a>
      </>
    );
  }

  return <>{mapping.displayName}</>;
};

export default CertificationsSection;
