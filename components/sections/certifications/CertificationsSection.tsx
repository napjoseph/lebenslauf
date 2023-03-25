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

const CertificationsSection: FunctionalComponent<CertificationsSectionProps> = (
  { config },
) => {
  if (!config.items) return null;
  const { meta = DEFAULT_CERTIFICATIONS_META } = config;

  return (
    <>
      <CertificationsList meta={meta} items={config.items} firstLevel={true} />
    </>
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
}) => {
  return (
    <>
      <ul class="list-square ml-6">
        {(items || []).filter((
          item,
        ) => item.meta?.show ?? true).sort((a, b) => {
          const d1 = a.issuedDate ?? "";
          const d2 = b.issuedDate ?? "";
          if (d1 > d2) return -1;
          if (d1 < d2) return 1;
          return 0;
        }).map(
          (item) => {
            let title = (
              <h3
                class={firstLevel
                  ? tw`text-gray-900`
                  : tw`text-gray-900 text-xs`}
              >
                {item.title}
              </h3>
            );
            if (item.credentialUrl && item.credentialUrl !== "") {
              title = (
                <h3
                  class={firstLevel
                    ? tw`text-gray-900`
                    : tw`text-gray-900 text-xs`}
                >
                  <a href={item.credentialUrl}>
                    {item.title}
                  </a>
                </h3>
              );
            }

            return (
              <li class="text-gray-900">
                <div class="justify-between">
                  {title}
                  <div class="text-gray-500 text-xs">
                    {createSubHeaderItems(meta, item)}
                  </div>

                  {item.children && (
                    <div>
                      <CertificationsList
                        meta={meta}
                        items={item.children}
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          },
        )}
      </ul>
    </>
  );
};

const createSubHeaderItems = (
  meta: CertificationsMeta,
  item: CertificationsItem,
): JSX.Element => {
  const items: JSX.Element[] = [];
  (meta.subHeaderItems || []).map((subHeaderItem) => {
    switch (subHeaderItem) {
      case "credentialType":
        items.push(
          <span>
            <span class="mr-1">Credential Type:</span>
            <span class="font-medium break-words">
              {mapCredentialTypeValue(meta, item)}
            </span>
          </span>,
        );
        break;
      case "credentialId":
        if ((item.credentialId || "") !== "") {
          // Shorten the credential ID if it's too long.
          // For example, LinkedIn Learning Cert IDs have 64 characters.
          const credentialId = item.credentialId?.substring(0, 25);

          items.push(
            <span class="break-words">
              <span class="mr-1">Credential ID:</span>
              <span class="font-medium">
                <a href={item.verificationUrl}>
                  {credentialId}
                </a>
              </span>
            </span>,
          );
        }
        break;
      case "offeredBy":
        if ((item.offeredBy || "") !== "") {
          items.push(
            <span>
              <span class="mr-1">Offered By:</span>
              <span class="font-medium break-words">
                {mapOfferedByValue(meta, item)}
              </span>
            </span>,
          );
        }
        break;
      case "issuingOrganization":
        items.push(
          <span>
            <span class="mr-1">Issuer:</span>
            <span class="font-medium break-words">
              {mapIssuingOrganizationValue(meta, item)}
            </span>
          </span>,
        );
        break;
      case "issuedDate":
        items.push(
          <span>
            <span class="mr-1">Issued Date:</span>
            <span class="font-medium break-words">
              {toReadableDate(item.issuedDate ?? "")}
            </span>
          </span>,
        );
        break;
      case "gradeAchieved":
        items.push(
          <span>
            <span class="mr-1">Grade Achieved:</span>
            <span class="font-medium break-words">
              {item.gradeAchieved}
            </span>
          </span>,
        );
        break;
    }
  });

  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={index} class="inline">
            {!!index && <span class="mx-1">|</span>}
            {item}
          </div>
        );
      })}
    </>
  );
};

const mapCredentialTypeValue = (
  meta: CertificationsMeta,
  item: CertificationsItem,
): JSX.Element => {
  const key = item.credentialType || "";
  const results = (meta.credentialTypeMapping ?? []).filter((mapItem) =>
    mapItem.key === key
  );

  if (results.length === 0) {
    return <>{item.credentialType}</>;
  }

  const mapping = results[0];
  return <>{mapping.displayName}</>;
};

const mapIssuingOrganizationValue = (
  meta: CertificationsMeta,
  item: CertificationsItem,
): JSX.Element => {
  const key = item.issuingOrganization || "";
  const results = (meta.issuingOrganizationMapping ?? []).filter((mapItem) =>
    mapItem.key === key
  );

  if (results.length === 0) {
    return <>{item.issuingOrganization}</>;
  }

  const mapping = results[0];
  if (mapping.url) {
    return (
      <>
        <a href={mapping.url}>
          {mapping.displayName}
        </a>
      </>
    );
  }

  return <>{mapping.displayName}</>;
};

const mapOfferedByValue = (
  meta: CertificationsMeta,
  item: CertificationsItem,
): JSX.Element => {
  const key = item.offeredBy || "";
  const results = (meta.offeredByMapping ?? []).filter((mapItem) =>
    mapItem.key === key
  );

  if (results.length === 0) {
    return <>{item.offeredBy}</>;
  }

  const mapping = results[0];
  if (mapping.url) {
    return (
      <>
        <a href={mapping.url}>
          {mapping.displayName}
        </a>
      </>
    );
  }

  return <>{mapping.displayName}</>;
};

export default CertificationsSection;
