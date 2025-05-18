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
    userId: user.user.uid,
    displayName: user.user.displayName,
  },
  address: {
    addressId: location.location.place_id,
    address: location.location.formatted_address,
    floor: location.location?.floor,
    instructions: location.location?.notes,
    phone: location.location?.phoneNumber,
  },
  worker: {
    workerId: worker.uid,
    firstName: worker.firstName,
    lastName: worker.lastName,
    profilePicture: worker.photoURL,
  },
  description,
  images,
  services,
  scheduledDateTime,
  moment,
});

export const useRequestValues = (data, worker) => {
  const user = useContext(UserContext);
  const location = useContext(LocationContext);
  return buildRequestValues(data, worker, user, location);
};
