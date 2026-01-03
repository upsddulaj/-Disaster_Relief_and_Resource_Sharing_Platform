import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import Disaster from "../models/Disaster.js";
import Resource from "../models/Resource.js";
import ResourceRequest from "../models/ResourceRequest.js";
import VolunteerProfile from "../models/VolunteerProfile.js";
import Alert from "../models/Alert.js";
import Report from "../models/Report.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Promise.all([
      User.deleteMany(),
      Disaster.deleteMany(),
      Resource.deleteMany(),
      ResourceRequest.deleteMany(),
      VolunteerProfile.deleteMany(),
      Alert.deleteMany(),
      Report.deleteMany(),
    ]);

    const [admin, org, org2, volunteerUser, citizen, citizen2] =
      await User.create([
        {
          name: "Admin User",
          email: "admin@example.com",
          password: "Password123!",
          role: "admin",
          isEmailVerified: true,
        },
        {
          name: "Relief Org",
          email: "org@example.com",
          password: "Password123!",
          role: "organization",
          isEmailVerified: true,
        },
        {
          name: "Community Care",
          email: "org2@example.com",
          password: "Password123!",
          role: "organization",
          isEmailVerified: true,
        },
        {
          name: "Volunteer One",
          email: "volunteer@example.com",
          password: "Password123!",
          role: "volunteer",
          isEmailVerified: true,
        },
        {
          name: "Citizen User",
          email: "citizen@example.com",
          password: "Password123!",
          role: "citizen",
          isEmailVerified: true,
        },
        {
          name: "Citizen Two",
          email: "citizen2@example.com",
          password: "Password123!",
          role: "citizen",
          isEmailVerified: true,
        },
      ]);

    const [flood, wildfire] = await Disaster.create([
      {
        title: "Coastal Flood",
        type: "Flood",
        severity: "high",
        status: "active",
        description: "Severe flooding in coastal region.",
        location: {
          address: "Bay Area",
          coordinates: { type: "Point", coordinates: [-122.4194, 37.7749] },
        },
        timeline: [
          {
            message: "Heavy rains reported",
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          },
          {
            message: "River levels rising",
            createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
          },
        ],
        createdBy: org._id,
      },
      {
        title: "Wildfire North Ridge",
        type: "Wildfire",
        severity: "critical",
        status: "contained",
        description:
          "Wildfire affecting the northern ridge and nearby communities.",
        location: {
          address: "North Ridge",
          coordinates: { type: "Point", coordinates: [-118.2437, 34.0522] },
        },
        timeline: [
          {
            message: "Smoke observed",
            createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          },
          {
            message: "Fireline established",
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          },
        ],
        createdBy: org2._id,
      },
    ]);

    const [foodPacks, medKits, shelterKits] = await Resource.create([
      {
        title: "Emergency Food Packs",
        type: "food",
        description: "Shelf-stable meals for 200 people",
        quantity: 200,
        unit: "packs",
        location: {
          address: "Warehouse 12",
          coordinates: { type: "Point", coordinates: [-122.401, 37.781] },
        },
        status: "allocated",
        provider: org._id,
      },
      {
        title: "Medical Kits",
        type: "medical",
        description: "First aid kits with trauma supplies",
        quantity: 80,
        unit: "kits",
        location: {
          address: "Field Hospital Depot",
          coordinates: { type: "Point", coordinates: [-118.25, 34.05] },
        },
        status: "available",
        provider: org2._id,
      },
      {
        title: "Temporary Shelter Tents",
        type: "shelter",
        description: "Family-size tents with mats",
        quantity: 40,
        unit: "tents",
        location: {
          address: "Logistics Hub",
          coordinates: { type: "Point", coordinates: [-122.41, 37.78] },
        },
        status: "delivered",
        provider: org._id,
      },
    ]);

    await ResourceRequest.create([
      {
        resourceType: "food",
        description: "Need 50 food packs",
        quantity: 50,
        requestedBy: citizen._id,
        disaster: flood._id,
        matchedResource: foodPacks._id,
        status: "matched",
      },
      {
        resourceType: "medical",
        description: "Requesting 20 trauma kits for field responders",
        quantity: 20,
        requestedBy: citizen2._id,
        disaster: wildfire._id,
        status: "open",
      },
      {
        resourceType: "shelter",
        description: "Urgent tents for 10 families",
        quantity: 10,
        requestedBy: citizen._id,
        disaster: flood._id,
        matchedResource: shelterKits._id,
        status: "fulfilled",
      },
    ]);

    await VolunteerProfile.create([
      {
        user: volunteerUser._id,
        skills: ["first aid", "logistics"],
        availabilityStatus: "available",
        assignedDisasters: [flood._id],
      },
      {
        user: org2._id,
        skills: ["coordination", "shelter management"],
        availabilityStatus: "busy",
        assignedDisasters: [wildfire._id],
      },
    ]);

    await Alert.create([
      {
        title: "Flood Warning",
        message: "Evacuate low-lying areas immediately.",
        severity: "critical",
        isBroadcast: true,
        disaster: flood._id,
        createdBy: admin._id,
      },
      {
        title: "Air Quality Notice",
        message: "Smoke levels high near North Ridge. Limit outdoor activity.",
        severity: "warning",
        isBroadcast: true,
        disaster: wildfire._id,
        createdBy: org2._id,
      },
    ]);

    await Report.create([
      {
        type: "incident",
        title: "Initial Incident Report",
        description: "Summary of flood impacts.",
        disaster: flood._id,
        createdBy: org._id,
        data: { impactedHouseholds: 1200 },
      },
      {
        type: "resource",
        title: "Shelter Deployment",
        description: "Tents delivered to coastal evacuation center.",
        disaster: flood._id,
        createdBy: org._id,
        data: { sheltersDelivered: 10, etaMinutes: 45 },
      },
      {
        type: "incident",
        title: "Hotspots Contained",
        description: "Two wildfire hotspots contained by crews.",
        disaster: wildfire._id,
        createdBy: org2._id,
        data: { hotspots: 2, personnel: 35 },
      },
    ]);

    console.log("Seed completed");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
