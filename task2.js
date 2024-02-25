const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/studentDB')
  .then(() => console.log('DB connected successfully'))
  .catch(e => console.log('Not connected', e));

const academicRecordSchema = new mongoose.Schema({
  studentID: Number,
  name: String,
  grades: { type: Map, of: String },
  subjects: [String],
  // Add other pertinent academic information
});

const coCurricularSchema = new mongoose.Schema({
  studentID: Number,
  name: String,
  activityType: String,
  duration: Number,
  achievements: String,
  // Add other fields as needed
});

const AcademicRecord = new mongoose.model('AcademicRecord', academicRecordSchema);
const CoCurricularActivity = new mongoose.model('CoCurricularActivity', coCurricularSchema);

const createDocument = async () => {
  try {
    const academicData = new AcademicRecord({
      studentID: 1,
      name: 'John Doe',
      grades: { 'Math': 'A', 'Science': 'B' },
      subjects: ['Math', 'Science'],
    });
    await academicData.save();

    const coCurricularData = new CoCurricularActivity({
      studentID: 1,
      name: 'John Doe',
      activityType: 'Sports',
      duration: 2,
      achievements: 'Winner of inter-school basketball competition',
    });
    await coCurricularData.save();

    await AcademicRecord.create([
      {
        studentID: 2,
        name: 'Jane Doe',
        grades: { 'Math': 'B', 'Science': 'A' },
        subjects: ['Math', 'Science'],
      },
      {
        studentID: 3,
        name: 'Alice Smith',
        grades: { 'Math': 'A', 'Science': 'A+' },
        subjects: ['Math', 'Science'],
      },
    ]);

    await CoCurricularActivity.create([
      {
        studentID: 2,
        name: 'Jane Doe',
        activityType: 'Music',
        duration: 3,
        achievements: 'First place in piano competition',
      },
      {
        studentID: 3,
        name: 'Alice Smith',
        activityType: 'Debate',
        duration: 2,
        achievements: 'Best speaker in regional debate championship',
      },
    ]);

  } catch (error) {
    console.error('Error:', error);
  }
};

const getDocument = async () => {
  try {
    const academicResult = await AcademicRecord.find();
    console.log('Academic Records:', academicResult);

    const coCurricularResult = await CoCurricularActivity.find();
    console.log('Co-curricular Activities:', coCurricularResult);

    // Update data
    await AcademicRecord.updateOne({ studentID: 1 }, { $set: { grades: { 'Math': 'A+', 'Science': 'A' } } });
    const updatedAcademicRecord = await AcademicRecord.findOne({ studentID: 1 });
    console.log('Updated Academic Record:', updatedAcademicRecord);

    // Delete data
    await AcademicRecord.deleteOne({ studentID: 1 });
    await CoCurricularActivity.deleteOne({ studentID: 1 });

  } catch (error) {
    console.error('Error:', error);
  }
};

createDocument().then(getDocument); // Call the functions sequentially
