import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { LocationContext } from "../../../context/LocationContext";

export const buildRequestValues = (
  [
    description,
    images,
    services,
    moment,
    scheduledDateTime,
    addressDetails = {},
  ],
  worker,
  user,
  location
) => ({
  client: {
    clientId: user.uid,
    displayName: user.displayName,
  },
  address: {
    address: location.formatted_address.split(",")[0],
    geohash: location?.geometry?.geohash || "",
    floor: addressDetails.floor ?? location?.floor ?? "",
    instructions: addressDetails.instructions ?? location?.notes ?? "",
    phone: addressDetails.phone ?? location?.phoneNumber ?? "",
  },
  worker: {
    workerId: worker?.uid || "",
    workerName: worker?.workerName || "",
    profilePicture: worker?.photoURL || "",
  },
  description,
  images,
  services,
  scheduledDateTime: scheduledDateTime ?? "",
  moment,
});

export const useRequestValues = (data, worker) => {
  const { user } = useContext(UserContext);
  const { location } = useContext(LocationContext);
  return buildRequestValues(data, worker, user, location);
};
