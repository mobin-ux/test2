import {
  $links,
  $logo,
  $showMoreLinks,
  setLinks,
  setLogo,
  setShowMoreLinks,
} from ".";

$links.on(setLinks, (_, links) => links);
$showMoreLinks.on(setShowMoreLinks, (_, showMoreLinks) => showMoreLinks);
$logo.on(setLogo, (_, logo) => logo);
