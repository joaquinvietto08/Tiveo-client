import headerPic from "../../../assets/images/baner-carpinteria.jpg";
import worker1 from "../../../assets/images/data/2.png";
import worker2 from "../../../assets/images/data/3.png";
import worker3 from "../../../assets/images/data/7.png";

export default [
  {
    uid: "worker1",
    price: 1500000,
    message: "Buen día, puedo empezar mañana",
    moment: "now",
    scheduledDateTime: null,
    firstName: "Carlos",
    lastName: "Gómez",
    birthDate: "1985-02-14",
    photoURL: worker1,
    lat: -31.4168016,
    lng: -64.1900524,
    joinedAt: "2022-10-18",
    geohash: "6d6m72dpz7",
    status: "available",
    description: "Construcción y reparación de muebles de madera.",
    completedJobs: 22,
    amountRating: 9,
    starRating: 2.7,
    bannerImage: headerPic,
    phone: "098-765-4321",
    services: [
      {
        service: "carpentry",
        isLicensed: true,
      },
      {
        service: "electricity",
        isLicensed: false,
      },
      {
        service: "plumbing",
        isLicensed: true,
      },
    ],
  },
  {
    uid: "worker2",
    price: null,
    message: null,
    moment: "schedule",
    scheduledDateTime: new Date("2025-07-22T21:50:00-03:00"),
    firstName: "Luis",
    lastName: "Martínez",
    birthDate: "1982-11-10",
    joinedAt: "2025-4-18",
    photoURL: worker3,
    lat: -31.4259987,
    lng: -64.1896053,
    geohash: "6d6m5r4d3c",
    status: "available",
    description: "Servicios de pintura para interiores y exteriores.",
    completedJobs: 32,
    amountRating: 9,
    starRating: 4.7,
    bannerImage: headerPic,
    phone: "456-789-0123",
    services: [
      {
        service: "gardening",
        isLicensed: false,
      },
      {
        service: "painting",
        isLicensed: true,
      },
      {
        service: "plumbing",
        isLicensed: true,
      },
      {
        service: "electricity",
        isLicensed: false,
      },
      {
        service: "locksmith",
        isLicensed: true,
      },
      {
        service: "ironwork",
        isLicensed: true,
      },
    ],
  },
  {
    uid: "worker3",
    price: 15032,
    message:
      "Buen día, puedo empezar mañana, viva peron, vivasdfnsjdf  sdfjsdjf  h bdshf",
    moment: "schedule",
    scheduledDateTime: new Date("2025-07-22T21:50:00-03:00"),
    firstName: "Ana",
    lastName: "López",
    birthDate: "1990-06-22",
    photoURL: worker2,
    joinedAt: "2021-10-18",
    lat: -31.4122982,
    lng: -64.19324499999999,
    geohash: "6d6m71xfhg",
    status: "busy",
    description: "Reparación de cañerías y griferías.",
    completedJobs: 30,
    amountRating: 9,
    starRating: 4.7,
    bannerImage: headerPic,
    phone: "234-567-8901",
    services: [
      {
        service: "plumbing",
        isLicensed: false,
      },
    ],
  },
];
