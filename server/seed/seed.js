import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Disaster from '../models/Disaster.js';
import Resource from '../models/Resource.js';
import ResourceRequest from '../models/ResourceRequest.js';
import VolunteerProfile from '../models/VolunteerProfile.js';
import Alert from '../models/Alert.js';
import Report from '../models/Report.js';

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
      Report.deleteMany()
    ]);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Password123!',
      role: 'admin',
      isEmailVerified: true
    });

    const org = await User.create({
      name: 'Relief Org',
      email: 'org@example.com',
      password: 'Password123!',
      role: 'organization',
      isEmailVerified: true
    });

    const volunteerUser = await User.create({
      name: 'Volunteer One',
      email: 'volunteer@example.com',
      password: 'Password123!',
      role: 'volunteer',
      isEmailVerified: true
    });

    const citizen = await User.create({
      name: 'Citizen User',
      email: 'citizen@example.com',
      password: 'Password123!',
      role: 'citizen',
      isEmailVerified: true
    });

    const disaster = await Disaster.create({
      title: 'Coastal Flood',
      type: 'Flood',
      severity: 'high',
      status: 'active',
      description: 'Severe flooding in coastal region.',
      location: {
        address: 'Bay Area',
        coordinates: { type: 'Point', coordinates: [-122.4194, 37.7749] }
      },
      createdBy: org._id
    });

    const resource = await Resource.create({
      title: 'Emergency Food Packs',
      type: 'food',
      description: 'Shelf-stable meals for 200 people',
      quantity: 200,
      unit: 'packs',
      location: {
        address: 'Warehouse 12',
        coordinates: { type: 'Point', coordinates: [-122.401, 37.781] }
      },
      provider: org._id
    });

    await ResourceRequest.create({
      resourceType: 'food',
      description: 'Need 50 food packs',
      quantity: 50,
      requestedBy: citizen._id,
      disaster: disaster._id,
      matchedResource: resource._id,
      status: 'matched'
    });

    await VolunteerProfile.create({
      user: volunteerUser._id,
      skills: ['first aid', 'logistics'],
      availabilityStatus: 'available'
    });

    await Alert.create({
      title: 'Flood Warning',
      message: 'Evacuate low-lying areas immediately.',
      severity: 'critical',
      isBroadcast: true,
      disaster: disaster._id,
      createdBy: admin._id
    });

    await Report.create({
      type: 'incident',
      title: 'Initial Incident Report',
      description: 'Summary of flood impacts.',
      disaster: disaster._id,
      createdBy: org._id,
      data: { impactedHouseholds: 1200 }
    });

    console.log('Seed completed');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
