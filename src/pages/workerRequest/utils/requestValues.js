import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { LocationContext } from "../../../context/LocationContext";

export const buildRequestValues = (
  [description, images, services, moment, scheduledDateTime],
  worker,
  user,
  location
) => ({
  user: {
    userId: user.uid,
    displayName: user.displayName,
  },
  address: {
    addressId: location.place_id,
    address: location.formatted_address,
    floor: location?.floor || "",
    instructions: location?.notes || "",
    phone: location?.phoneNumber || "",
  },
  worker: {
    workerId: worker?.uid || "",
    firstName: worker?.firstName || "",
    lastName: worker?.lastName || "",
    profilePicture: worker?.photoURL || "",
  },
  description,
  images,
  services,
  scheduledDateTime,
  moment,
});

export const useRequestValues = (data, worker) => {
  const { user } = useContext(UserContext);
  const { location } = useContext(LocationContext);
  return buildRequestValues(data, worker, user, location);
};
