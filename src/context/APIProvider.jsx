import { createContext, useEffect, useState } from "react";
import { API, Settings } from "../api";
import { getSetApis } from "../api/config";
export const APIContext = createContext(null);
import notice from "../../notice.json";

const APIProvider = ({ children }) => {
  const [logo, setLogo] = useState("");
  const [icon, setIcon] = useState("");

  const [noticeLoaded, setNoticeLoaded] = useState(false);

  const baseUrl = notice?.result?.settings?.baseUrl;
  useEffect(() => {
    getSetApis(setNoticeLoaded, baseUrl);
  }, [noticeLoaded, baseUrl]);

  useEffect(() => {
    if (noticeLoaded) {
      const icon = `${API.assets}/${Settings.siteUrl}/nav-sprite.svg`;
      setIcon(icon);

      const logo = `${API.assets}/${Settings.siteUrl}/logo.png`;
      setLogo(logo);

      const FavIconLink = document.createElement("link");
      FavIconLink.rel = "icon";
      FavIconLink.type = "image/png";
      FavIconLink.href = `${API.assets}/${Settings.siteUrl}/favicon.png`;
      document.head.appendChild(FavIconLink);
      /* Site title */
      document.title = Settings.siteTitle;
    }
  }, [noticeLoaded]);

  if (!noticeLoaded) {
    return;
  }
  const stateInfo = {
    logo,
    setLogo,
    icon,
    setIcon,
  };
  return (
    <APIContext.Provider value={stateInfo}>{children}</APIContext.Provider>
  );
};

export default APIProvider;
