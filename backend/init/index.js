const mongoose = require("mongoose");
const initData = require("./data.js"); // Ensure data.js has hospital data
const docData=require("./doctorData.js");
const Hospital = require("../models/hospital.js"); //  hospital model
const Doctors=require("../models/doctors.js")//doctor  model
const Medicine=require("../models/medicine.js");
const medData=require("./medData.js");
const Pharmacy=require("../models/pharmacy.js");
const pharmData=require("./pharmData.js");

const MONGO_URL ="mongodb+srv://mayankkumarverma306:14102003@cluster0.vzu4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection Error:", err));

async function main() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

const initDB = async () => {
  try {
    await Hospital.deleteMany({});
    console.log("🗑️ Cleared existing hospital data");

    // Assign an owner field if needed (optional)
    // initData.data = initData.data.map((obj) => ({
    //   ...obj,
    //   owner: "6782d424cfdd24d833ce1999", // Replace with actual user ID if needed
    // }));

    await Hospital.insertMany(initData.data);
    console.log("✅ Hospital data initialized successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  }
};
const initDoc = async () => {
  try {
    await Doctors.deleteMany({});
    console.log("🗑️ Cleared existing doctors data");

    await Doctors.insertMany(docData.data);
    console.log("✅ Doctors data initialized successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  }
};
const assignDoctorsToHospitals = async () => {
  try {
    // 1️⃣ Fetch all hospitals
    const hospitals = await Hospital.find(); // Fetch full documents to use instances
    if (hospitals.length === 0) {
      console.log("❌ No hospitals found!");
      return;
    }

    // 2️⃣ Fetch all doctors
    const doctors = await Doctors.find(); // Fetch full documents to use instances
    if (doctors.length === 0) {
      console.log("❌ No doctors found!");
      return;
    }

    const doctorsPerHospital = 5;
    let doctorIndex = 0;
    const doctorUpdates = [];
    const hospitalUpdates = [];

    // 3️⃣ Assign doctors to hospitals
    for (let i = 0; i < hospitals.length; i++) {
      const hospital = hospitals[i];
      let assignedDoctors = [];

      for (let j = 0; j < doctorsPerHospital; j++) {
        if (doctorIndex >= doctors.length) break;
        const doctor = doctors[doctorIndex];

        assignedDoctors.push(doctor);

        // ✅ Update doctor without manually extracting `_id`
        doctorUpdates.push(
          Doctors.findByIdAndUpdate(
            doctor,
            { $push: { hospitalID: hospital } }, // Pass full instance
            { new: true, runValidators: true }
          )
        );

        console.log(`✅ Updated doctor ${doctor._id} with hospital ${hospital._id}`);
        doctorIndex++;
      }

      // ✅ Update hospital with assigned doctors
      hospitalUpdates.push(
        Hospital.findByIdAndUpdate(
          hospital,
          { $set: { doctors: assignedDoctors } }, // Pass doctor instances directly
          { new: true, runValidators: true }
        )
      );

      console.log(`✅ Assigned ${assignedDoctors.length} doctors to hospital ${hospital._id}`);
    }

    // 4️⃣ Execute all updates in parallel for better performance
    await Promise.all([...doctorUpdates, ...hospitalUpdates]);

    console.log("🎉 Doctors successfully assigned to hospitals!");

  } catch (error) {
    console.error("❌ Error assigning doctors:", error);
  } finally {
    mongoose.connection.close(); // Close DB connection
  }
};
const initMed = async () => {
  try {
    await Medicine.deleteMany({});
    console.log("🗑️ Cleared existing medicine data");

    await Medicine.insertMany(medData.data);
    console.log("✅ Medicine data initialized successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  }
};
const initPharm = async () => {
  try {
    await Pharmacy.deleteMany({});
    console.log("🗑️ Cleared existing pharmacy data");

    // Convert medicine IDs to ObjectId before inserting
    const formattedPharmacies = pharmData.data.map(pharmacy => ({
      ...pharmacy,
      medicines: pharmacy.medicines.map(med => ({
        medicine: new mongoose.Types.ObjectId(med.medicine), // Convert to ObjectId
        stock: med.stock
      }))
    }));

    await Pharmacy.insertMany(formattedPharmacies);
    console.log("✅ Pharmacy data initialized successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  }
};
const updateMedicinePharmacies = async () => {
  try {
    console.log("🔄 Updating medicine documents with pharmacy references...");

    // Fetch all pharmacies
    const pharmacies = await Pharmacy.find({});

    // Iterate through each pharmacy
    for (const pharmacy of pharmacies) {
      for (const med of pharmacy.medicines) {
        const medicineId = med.medicine; // Extract medicine ObjectId

        // Update the medicine document by adding the pharmacy ObjectId
        await Medicine.findByIdAndUpdate(
          medicineId,
          { $addToSet: { pharmacies: pharmacy._id } }, // $addToSet prevents duplicate entries
          { new: true }
        );
      }
    }

    console.log("✅ Medicines updated successfully with pharmacy references!");
  } catch (error) {
    console.error("❌ Error updating medicines:", error);
  }
};




// const checkPharmaciesSellingMedicine = async (medicineId) => {
//   try {
//     const medicine = await Medicine.findById(medicineId).populate("pharmacies");

//     if (!medicine) {
//       console.log("❌ Medicine not found.");
//       return;
//     }

//     console.log(`🔍 The medicine "${medicine.name}" is available at:`);
//     medicine.pharmacies.forEach((pharmacy) => {
//       console.log(`🏥 ${pharmacy.name} - ${pharmacy.address}`);
//     });
//   } catch (error) {
//     console.error("❌ Error fetching pharmacies:", error);
//   }
// };

// // Call the function with the given medicine ObjectId
// checkPharmaciesSellingMedicine("67d2bd0941c281d66bba23f1");

