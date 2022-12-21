/** @jsx h */
import { Fragment, FunctionalComponent, h, JSX } from "preact";

import { tw } from "@twind";
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
    <Fragment>
      <CertificationsList meta={meta} items={config.items} firstLevel={true} />
    </Fragment>
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
    <Fragment>
      <ul class={tw`list-square ml-6`}>
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
              <li class={tw`text-gray-900`}>
                <div class={tw`flex justify-between`}>
                  <div>
                    {title}
                    <div class={tw`text-gray-500 text-xs`}>
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
                </div>
              </li>
            );
          },
        )}
      </ul>
    </Fragment>
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
            <span class={tw`mr-1`}>Credential Type:</span>
            <span class={tw`font-medium break-words`}>
              {mapCredentialTypeValue(meta, item)}
            </span>
          </span>,
        );
        break;
      case "credentialId":
        if ((item.credentialId || "") !== "") {
          items.push(
            <span>
              <span class={tw`mr-1`}>Credential ID:</span>
              <span class={tw`font-medium break-words`}>
                <a href={item.verificationUrl}>
                  {item.credentialId}
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
              <span class={tw`mr-1`}>Offered By:</span>
              <span class={tw`font-medium break-words`}>
                {mapOfferedByValue(meta, item)}
              </span>
            </span>,
          );
        }
        break;
      case "issuingOrganization":
        items.push(
          <span>
            <span class={tw`mr-1`}>Issuer:</span>
            <span class={tw`font-medium break-words`}>
              {mapIssuingOrganizationValue(meta, item)}
            </span>
          </span>,
        );
        break;
      case "issuedDate":
        items.push(
          <span>
            <span class={tw`mr-1`}>Issued Date:</span>
            <span class={tw`font-medium break-words`}>
              {toReadableDate(item.issuedDate ?? "")}
            </span>
          </span>,
        );
        break;
      case "gradeAchieved":
        items.push(
          <span>
            <span class={tw`mr-1`}>Grade Achieved:</span>
            <span class={tw`font-medium break-words`}>
              {item.gradeAchieved}
            </span>
          </span>,
        );
        break;
    }
  });

  return (
    <Fragment>
      {items.map((item, index) => {
        return (
          <Fragment key={index}>
            {!!index && <span class={tw`mx-1`}>|</span>}
            {item}
          </Fragment>
        );
      })}
    </Fragment>
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
    return <Fragment>{item.credentialType}</Fragment>;
  }

  const mapping = results[0];
  return <Fragment>{mapping.displayName}</Fragment>;
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
    return <Fragment>{item.issuingOrganization}</Fragment>;
  }

  const mapping = results[0];
  if (mapping.url) {
    return (
      <Fragment>
        <a href={mapping.url}>
          {mapping.displayName}
        </a>
      </Fragment>
    );
  }

  return <Fragment>{mapping.displayName}</Fragment>;
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
    return <Fragment>{item.offeredBy}</Fragment>;
  }

  const mapping = results[0];
  if (mapping.url) {
    return (
      <Fragment>
        <a href={mapping.url}>
          {mapping.displayName}
        </a>
      </Fragment>
    );
  }

  return <Fragment>{mapping.displayName}</Fragment>;
};

export default CertificationsSection;
