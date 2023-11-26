import { useState, useEffect, PropsWithChildren } from "react";

interface CmsLink {
  text: string;
  url: string;
  type?: string;
  id?: string;
}

interface CmsText {
  value: string;
  type: string;
  id: string;
}

interface CmsImage {
  id: string;
  type: string;
  src: string;
  alt: string;
  css?: string;
}

interface HeaderModel {
  navigation: NavigationItem[];
  logo: CmsImage;
  logoHover: CmsImage;
  cart: CmsLink;
  configurator: CmsLink;
  europeFlag: CmsImage;
  europeText: CmsText;
  languages: CmsText[];
  skipText: string;
  skipUrl: string;
  cartLength?: number;
  euLink: CmsLink;
  bgColor: string;
}

interface NavigationItem {
  linkItems: CmsLink[];
  childItems: NavigationItem | undefined;
  isDesktop: boolean;
}

export const GetHeader = (pageData: any): HeaderModel => {console.log(pageData);
  // const cmsHeader = pageData.cmsComponents.find(
  //   (x) => x.type == "header"
  // ) as any;

  // if (!cmsHeader || !cmsHeader.contentSections) return {} as HeaderModel;

  const contentSection = pageData?.contentSections.find(
    (x) => x.key == "content"
  );
  const languagesSection = pageData?.contentSections.find(
    (x) => x.key == "languages"
  );

  const skipToContent = pageData?.contentSections.find(
    (x) => x.key == "skip-to-content"
  );

  const settings = pageData?.contentSections.find(
    (x) => x.key == "settings"
  );

  if (
    !contentSection ||
    !contentSection.properties ||
    !languagesSection ||
    !languagesSection.properties
  )
    return {} as HeaderModel;

  const navItems = pageData?.cmsComponents
    ?.filter((x) => x.type == "nav-section")
    .map((ns) => {
      const cmsComponents = ns.cmsComponents;
      const sectionName = ns.contentSections[0].properties.find(
        (x) => x.id == "section-name"
      ) as CmsText;
      const link = ns.contentSections[0].properties.find(
        (x) => x.id == "link"
      ) as CmsLink;
      if (cmsComponents.length) {
        return {
          linkItems: [{ text: sectionName.value, url: "" }],
          childItems: {
            linkItems: cmsComponents.map(
              (x) =>
                x.contentSections[0].properties.find(
                  (x) => x.id == "link"
                ) as CmsLink
            ),
          } as NavigationItem,
        } as NavigationItem;
      } else {
        return {
          linkItems: [link],
        } as NavigationItem;
      }
    });
  const cartLink = contentSection.properties.find(
    (p) => p.id == "cart"
  ) as unknown as CmsLink;

  const configuratorLink = contentSection.properties.find(
    (p) => p.id == "configurator"
  ) as unknown as CmsLink;

  const logo = contentSection.properties.find(
    (p) => p.id == "logo"
  ) as unknown as CmsImage;

  const logoHover = contentSection.properties.find(
    (p) => p.id == "logo-hover"
  ) as unknown as CmsImage;

  const europeFlag = contentSection.properties.find(
    (p) => p.id == "eu-flag"
  ) as unknown as CmsImage;

  const europeText = contentSection.properties.find(
    (p) => p.id == "eu-text"
  ) as unknown as CmsText;

  const euLink = contentSection.properties.find(
    (p) => p.id == "eu-link"
  ) as unknown as CmsLink;

  const languages = languagesSection.properties.map((p) => p as CmsText);

  return {
    navigation: navItems,
    cart: cartLink,
    configurator: configuratorLink,
    logo: logo,
    logoHover: logoHover,
    europeText: europeText,
    europeFlag: europeFlag,
    languages: languages,
    skipText:
      skipToContent?.properties.find((x) => x.id === "text")?.value ?? "",
    skipUrl:
      skipToContent?.properties.find((x) => x.id === "goto-href-id")?.value ??
      "",
    euLink: euLink,
    bgColor: settings?.properties.find((x) => x.id === "background-colour")?.value ?? "#fff",
  } as HeaderModel;
};

const Anchor = (props:any) => {
  const ops: any = {};
  if (props.newWindow) ops["target"] = "_blank";

  return <a 
  href={props.link.url ?? "/"}
  className={props.css}
  hrefLang={props.locale}
  {...ops}
  >
    {props.children && props.children}
  </a>
}

const NavItem = (props: NavigationItem) => {
  const [tooltipStatus, setTooltipStatus] = useState(false);

  if (props.childItems != null) {
    return (
      <li
        className={"2xl:py-0 group py-4 2xl:mx-1"}
        tabIndex={0}
        onKeyDown={(e) => {
          if (
            e.shiftKey &&
            e.code == "Tab" &&
            (e.nativeEvent.target as any)?.classList
              ?.toString()
              .includes("child-0")
          ) {
            e.stopPropagation();
            e.preventDefault();
            e.currentTarget?.previousElementSibling
              ?.querySelector("a")
              ?.focus();
          }
        }}
        onFocus={(e) => {
          setTooltipStatus(true);
          e.target?.querySelector("a")?.focus();
        }}
        onBlur={(e) => {
          setTooltipStatus(false);
        }}>
        <p
          className={
            "cursor-pointer inline-block " +
            "font-manrope uppercase text-[14px] text-ed-black2 group hover:shadow-black2 focus:shadow-black2" +
            " 2xl:block 2xl:p-0 ml-5 min-[1344px]:mx-0 2xl:mx-3 2xl:w-max 2xl:py-0 min-[1344px]:px-2 w-auto "
          }>
          {props.linkItems[0].text}
          <span className="inline-block pl-5 mt-2 relative">
            <img
              src={"/assets/svg/Path 371.svg"}
              width={10}
              height={5}
              alt="arrow"
              className="w-auto group-hover:rotate-180"
            />
          </span>
        </p>

        <YellowTooltipContent status={tooltipStatus}>
          {props.childItems.linkItems.map((l, k) => (
            <li key={k} className="w-fit">
              <Anchor
                {...{
                  link: l,
                  css: "font-manrope uppercase text-[14px] text-ed-black2 group hover:shadow-black2 focus:shadow-black2" + " child-" + k,
                }}
              />
            </li>
          ))}
        </YellowTooltipContent>
      </li>
    );
  } else {
    return (
      <li className={"2xl:py-0 group py-4 2xl:mx-1"}>
        <Anchor
          {...{
            link: props.linkItems[0],
            css:
            "font-manrope uppercase text-[14px] text-ed-black2 group hover:shadow-black2 focus:shadow-black2" +
              " 2xl:p-0 2xl:mx-1 2xl:block 2xl:w-fit 2xl:py-0 mx-5 min-[1344px]:mx-0 min-[1344px]:px-2 w-full",
          }}
        />
      </li>
    );
  }
};

const YellowTooltipContent = (
  props: PropsWithChildren<{ status: boolean }>
) => {
  const statusCls = props.status
    ? `h-fit max-h-none before:border-[10px] 
    h-fit max-h-none 
    before:border-[10px] before:border-ed-yellow
    before:relative before:mx-auto before:block before:text-center 
    before:top-[11px] before:w-[20px] before:h-[20px] before:rotate-[45deg] 
    `
    : "max-h-0 h-0";
  const ulStatusCls = props.status ? "py-4 px-6" : "";
  if (!props?.children) return null;
  return (
    <div
      className={`left-0 2xl:left-[calc(-40%-12px)] z-10 absolute flex flex-col w-max overflow-hidden 
group-hover:h-fit group-hover:max-h-none 
group-hover:before:border-[10px] group-hover:before:border-ed-yellow
group-hover:before:relative group-hover:before:mx-auto group-hover:before:block group-hover:before:text-center 
group-hover:before:top-[11px] group-hover:before:w-[20px] group-hover:before:h-[20px] group-hover:before:rotate-[45deg]
${statusCls} ${"animation transition ease-out duration-[.3s]"} `}>
      <ul
        className={`flex flex-col p-2 bg-ed-yellow  group-hover:py-4 group-hover:px-6 rounded-[15px]  gap-3 ${ulStatusCls}
`}>
        {props.children}
      </ul>
    </div>
  );
};

// const Languages = (props: { items: CmsText[] }) => {
//   const router = useRouter();
//   const [tooltipStatus, setTooltipStatus] = useState(false);
//   const locale = router.locale ?? "";
//   const defaultLanguage = router.defaultLocale ?? "";

//   if (!props) return <></>;
//   return (
//     <div
//       className="group w-full"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (
//           e.shiftKey &&
//           e.code == "Tab" &&
//           (e.nativeEvent.target as any)?.classList
//             ?.toString()
//             .includes("child-0")
//         ) {
//           e.stopPropagation();
//           e.preventDefault();
//           e.currentTarget?.parentElement?.previousElementSibling
//             ?.querySelector("a")
//             ?.focus();
//         }
//       }}
//       onFocus={(e) => {
//         setTooltipStatus(true);
//         e.target?.querySelector("a")?.focus();
//       }}
//       onBlur={(e) => {
//         setTooltipStatus(false);
//       }}>
//       <p className={" cursor-pointer inline-block" + "font-manrope uppercase text-[14px] text-ed-black2 group hover:shadow-black2 focus:shadow-black2"}>
//         {locale}
//         <span className="inline-block pl-2 mb-0.5 ">
//           <img
//             src={"/assets/svg/Path 371.svg"}
//             width={10}
//             height={5}
//             alt="arrow"
//             loading="eager"
//             className="w-auto group-hover:rotate-180 "
//           />
//         </span>
//       </p>
//       <YellowTooltipContent status={tooltipStatus}>
//         {props &&
//           props.items
//             .filter((x) => x.id != locale)
//             .map((l, k) => (
//               <li key={k} className="">
//                 <Anchor
//                   key={k}
//                   {...{
//                     link: {
//                       url: defaultLanguage == l.id ? "/" : l.value,
//                       text: l.id,
//                       id: "",
//                       type: "",
//                     },
//                     css: "font-manrope uppercase text-[14px] text-ed-black2 group hover:shadow-black2 focus:shadow-black2" + " child-" + k,
//                     locale: l.id,
//                   }}
//                 />
//               </li>
//             ))}
//       </YellowTooltipContent>
//     </div>
//   );
// };

export const MobileHeader = (props: HeaderModel) => {console.log(props)
  const [toggle, setToggle] = useState(false);
  // const { asPath } = useRouter();

  // useEffect(() => {
  //   setToggle(false); // Close the navigation panel
  // }, [asPath]);

  if (!props) return null;

  const updateStatus = () => {
    setToggle(!toggle);
  };

  const navItems = props?.navigation?.map((ni, k) => {
    ni.isDesktop = false;
    return <NavItem key={k} {...ni} />;
  });

  return (
    <header className="h-[60px] w-full min-[1344px]:hidden bg-ed-yellow ">
      <img
        src="/assets/svg/mobile-logo.svg"
        alt="logo"
        loading="eager"
        width={84}
        height={41}
        className="absolute top-[8px] left-[7px]"
      />
      <nav className="self-center w-full h-[60px] my-auto flex flex-col justify-center">
        <Anchor
          {...{
            link: props.cart,
            css: "font-manrope uppercase text-[14px] text-ed-black2 group hover:shadow-black2 focus:shadow-black2 ml-auto mr-20",
            onClick: updateStatus.bind(this),
          }}
        />
      </nav>
      <button
        id="burguer-icon"
        type="button"
        className={`bg-ed-black absolute text-ed-white aspect-[1/1] block right-0 top-0 z-10 h-[60px]
          bg-no-repeat bg-[position:_center_center] focus:border focus:border-ed-yellow
          ${
            toggle
              ? `bg-[url('/assets/svg/close.svg')]
              bg-[length:_17px]`
              : `bg-[url('/assets/svg/burguer-icon.svg')]
              bg-[length:_22.5px]`
          }
  
        `}
        aria-label="burguer menu"
        onKeyDown={(e) => {
          if (e.code == "13" || e.code == "32") updateStatus;
          if (e.code == "Tab" && !e.shiftKey && !toggle) {
            if (typeof window !== "undefined") {
              e.preventDefault();
              const firstAnchor = window.document.querySelector(
                "main  a[href]"
              ) as HTMLAnchorElement;
              firstAnchor.focus();
            }
          }
        }}
        onClick={updateStatus}></button>

      <div
        id="mobile-menu"
        className={
          "bg-ed-gray1 relative w-full h-auto z-[100]" +
          "animation transition ease-out duration-[.3s]" +
          (toggle ? " max-h-none  h-max " : " h-0  max-h-0 overflow-hidden ")
        }>
        <div className="container mx-auto bg-ed-gray1  h-full flex flex-col justify-between ">
          <ul className="w-full divide-y divide-ed-gray6 block">
            {navItems}
            <li className="py-4 inline-flex flex-row w-full">
              <div className="w-1/2 px-6">
                <Anchor
                  {...{
                    link: props.cart,
                    css: "font-manrope uppercase text-[14px] text-ed-black2 shadow-color-ed-gray3 hover:shadow-black2 focus:shadow-black2",
                  }}
                />
                <span className="text-ed-black2">{' '}|{' '}{props.cartLength}</span>
              </div>
              <div className="w-1/2 inline-flex flex-row justify-between">
                <div className="w-2/3"></div>
                <div className="w-1/3">
                  {/* <Languages {...{ items: props.languages }} /> */}
                </div>
              </div>
            </li>
          </ul>
          <div className="w-full flex flex-row my-12 px-6">
            <div className="w-3/5">
              <Anchor
                {...{
                  link: props.configurator,
                  css: "font-manrope uppercase text-[14px] text-ed-black3 bg-ed-yellow px-6 min-[1344px]:px-3 min-[1344px]:mr-3 py-4 rounded-full",
                }}
              />
            </div>
            <div className="w-2/5 flex flex-row  justify-end">
              <a href={props.euLink.url} target="_blank">
                <img
                  src={props.europeFlag.src}
                  alt={props.europeText.value ?? ""}
                  width={45}
                  height={30}
                  className="leading-normal"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};