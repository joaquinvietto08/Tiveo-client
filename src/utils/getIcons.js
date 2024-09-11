import electricity from "../../assets/svgs/home/electricity";
import plumbing from "../../assets/svgs/home/plumbing";
import gas from "../../assets/svgs/home/gas";
import gardening from "../../assets/svgs/home/gardening";
import locksmith from "../../assets/svgs/home/locksmith";
import painting from "../../assets/svgs/home/painting";
import construction from "../../assets/svgs/home/construction";
import pool from "../../assets/svgs/home/pool";
import carpentry from "../../assets/svgs/home/carpentry";
import glass from "../../assets/svgs/home/glass";
import pets from "../../assets/svgs/home/pets";
import security from "../../assets/svgs/home/security";
import ironwork from "../../assets/svgs/home/ironwork";
import technology from "../../assets/svgs/home/technology";
import beauty from "../../assets/svgs/home/beauty";
import vehicles from "../../assets/svgs/home/vehicles";
import freight from "../../assets/svgs/home/freight";
import events from "../../assets/svgs/home/events";
import photography from "../../assets/svgs/home/photography";
import music from "../../assets/svgs/home/music";

export const getIcon = (serviceName) => {
  const iconMap = {
    electricity,
    plumbing,
    gas,
    gardening,
    locksmith,
    painting,
    construction,
    pool,
    carpentry,
    glass,
    pets,
    security,
    ironwork,
    technology,
    beauty,
    vehicles,
    freight,
    events,
    photography,
    music,
  };

  return iconMap[serviceName] || null;
};
