const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt=require('bcrypt');
require('dotenv').config();
const {OpenAI}=require('openai');
const app = express();
const port = 3001;
var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'MedConnect',
  password: 'Guru@2003',
  port: 5433,
});

db.connect();
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

let conversationState = {
    currentQuestion: 0,
    questions: [],
    options:[],
    userResponses: []
};


app.post('/message', async (req, res) => {
  const userMessage = req.body.message;
  if(req.body.message==="hi"){
    conversationState.currentQuestion=0;
  }
  console.log(conversationState.currentQuestion);
  if (conversationState.currentQuestion < 4) {
      
    const predefinedQuestions = [
      {
          question: "What symptoms are you experiencing?",
          options: ["Fever", "Cough", "Headache", "Fatigue","Other"]
      },
      {
          question: "How long have you been experiencing these symptoms?",
          options: ["Less than a week", "1-2 weeks", "More than 2 weeks","Other"]
      },
      {
        question: "Have you tried any home remedies?",
        options: ["Yes", "No","Other"]
    },
    {
      question: "Do you have any pre-existing medical conditions?",
      options: ["Yes", "No","Other"]
  },
    
  ];
      if(conversationState.currentQuestion===0){
        conversationState.questions.push(predefinedQuestions[conversationState.currentQuestion].question);
        conversationState.options.push(predefinedQuestions[conversationState.currentQuestion].options);
      }
      else{
        conversationState.userResponses.push(userMessage);
        conversationState.questions.push(predefinedQuestions[conversationState.currentQuestion].question);
        conversationState.options.push(predefinedQuestions[conversationState.currentQuestion].options);
      }

      const currentPredefinedQuestion = predefinedQuestions[conversationState.currentQuestion];
      conversationState.currentQuestion++;

      res.json({ message: currentPredefinedQuestion.question,options: currentPredefinedQuestion.options });
  } else if (conversationState.currentQuestion < 10) {
      conversationState.userResponses.push(userMessage);
      conversationState.currentQuestion++;

      const additionalMessage = {
        role: "assistant",
        content: "provide relevent follow-up question with question mark at the end of the question with options that gets further important data from the user that helps in the successful and the best diagnosis of the disease.Strictly Dont repeat the questions already answered by the user.Always add others or say it descriptive as final options based on the question at the end.Strictly Give the question in one line and give the options in separate lines with 1. 2. tags"
    };
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationState.questions.map(question => ({ role: "user", content: question })).concat({role:"user","content":"The options provided for each question are:"}).concat(conversationState.options.map(opt => ({ role: "user", content: opt.join(',') }))).concat({role:"user","content":"The answers provided for each question by the user are:"}).concat(conversationState.userResponses.map(response => ({ role: "user", content: response }))).concat(additionalMessage),
      max_tokens: 2048
    });
      const messageContent = completion.choices[0].message.content;
      const [questionPart, optionsPart] = messageContent.split('?');
      const question = questionPart.trim();
      const options = optionsPart.split('\n').slice(1).map(option => option.trim());
      conversationState.questions.push(question);
      res.json({ message: question, options: options });


  } else {
      conversationState.userResponses.push(userMessage);
      const additionalMessage = {
        role: "assistant",
        content: "from the above set of questions and answers accurately diagnose the disease/condition and provide the name of the disease for sure the user experiences and suggest what are some home remedies and what is the specialist they should visit to get treatment."
    };
      const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: conversationState.questions.map(question => ({ role: "user", content: question })).concat(conversationState.userResponses.map(response => ({ role: "user", content: response })).concat(additionalMessage)),
          max_tokens: 2048
      });
      conversationState.currentQuestion=0;
      res.json({ message: completion.choices[0].message.content });
  }
});
app.get('/api/doctors', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM doctor_details WHERE name ILIKE $1 OR specialisation ILIKE $1 ORDER BY experience desc', ['%' + req.query.prompt + '%']);    
res.json(result.rows);

  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/department', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM doctor_details WHERE department ILIKE $1 ORDER BY experience DESC', [`%${req.query.special}%`]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/getdoctors', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM doctor_details');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/signin', async (req, res) => {
  try {
    const { name, email, password,userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO patients (name, email_id, password,userType) VALUES ($1, $2, $3,$4)';
    await db.query(query, [name, email, hashedPassword,userType]);
    
    console.log(req.body);
    res.status(201).send(email);
  } catch (error) {
    console.error('Error registering user here:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = 'SELECT usertype, password FROM patients WHERE email_id ILIKE $1';
    const result = await db.query(query, [username]);

    if (result.rows.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    const storedPasswordHash = result.rows[0].password;
    const userType = result.rows[0].usertype;

    bcrypt.compare(password, storedPasswordHash, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (isMatch) {
        res.status(201).json({userType});
      } else {
        res.status(400).send('Invalid password');
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/getdoctorid', async (req, res) => {
  try {
    const { email } = req.query;
    const result = await db.query('SELECT id FROM doctor_details WHERE email_id = $1', [email]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching doctor ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getappointments', async (req, res) => {
  try {
    const { doctorId } = req.query;
    const result = await db.query('SELECT * FROM appointment_slots WHERE doctor_id = $1', [doctorId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/cancelappointment', async (req, res) => {
  try {
    const { id, email } = req.query;
    const mailidResult = await db.query('SELECT patient_email_id FROM appointment_slots WHERE id = $1', [id]);
    const mailid = mailidResult.rows[0].patient_email_id; 

    const doctorResult = await db.query('SELECT name FROM doctor_details WHERE email_id = $1', [email]);
    const doctor = doctorResult.rows[0].name; 

    const dateResult = await db.query('SELECT appointment_date FROM appointment_slots WHERE id = $1', [id]);
    const date = dateResult.rows[0].appointment_date;

    const timeResult = await db.query('SELECT appointment_time FROM appointment_slots WHERE id = $1', [id]);
    const time = timeResult.rows[0].appointment_time;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'guruprinting2003@gmail.com',
        pass: 'exuh vgox auhg mzbp' 
      }
    });
    
    var mailOptions = {
      from: 'guruprinting2003@gmail.com',
      to: mailid,
      subject: 'Cancellation of appointment',
      text: 'Your appointment with '+doctor+' on '+date+' at '+time+' has been cancelled due to certain concerns by the doctor/admin.Kindly rebook in the same slot/other slots.'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    await db.query('DELETE FROM appointment_slots WHERE id = $1', [id]);
    res.status(204).send(); 
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/confirmappointment', async (req, res) => {
  try {
    const { id, email } = req.query;
    const mailidResult = await db.query('SELECT patient_email_id FROM appointment_slots WHERE id = $1', [id]);
    const mailid = mailidResult.rows[0].patient_email_id; 

    const doctorResult = await db.query('SELECT name FROM doctor_details WHERE email_id = $1', [email]);
    const doctor = doctorResult.rows[0].name; 

    const dateResult = await db.query('SELECT appointment_date FROM appointment_slots WHERE id = $1', [id]);
    const date = dateResult.rows[0].appointment_date;

    const timeResult = await db.query('SELECT appointment_time FROM appointment_slots WHERE id = $1', [id]);
    const time = timeResult.rows[0].appointment_time; 

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'guruprinting2003@gmail.com',
        pass: 'exuh vgox auhg mzbp' 
      }
    });

    var mailOptions = {
      from: 'guruprinting2003@gmail.com',
      to: mailid, 
      subject: 'Confirmation of appointment',
      text: `Your appointment with ${doctor} on ${date} at ${time} has been confirmed by the doctor/admin. Never miss the slot and be present at the allotted time respectively for the appointment.`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    await db.query('UPDATE appointment_slots SET status = $1 WHERE id = $2', ['confirmed', id]);
    res.status(200).send({ message: 'Appointment confirmed successfully.' }); 
  } catch (error) {
    console.error('Error confirming appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});


app.get('/getdetails', async (req, res) => {
  try {
      const { id } = req.query;
      const result = await db.query('SELECT * FROM doctor_details WHERE id=$1', [id]);
      console.log(result.rows);
      res.json(result.rows);
  } catch (error) {
      console.error("Error fetching doctor details:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getavailable",async(req,res)=>{
  try {
    const { id } = req.query;
    const result = await db.query('SELECT working_days,available_time_slots FROM doctor_details WHERE id=$1', [id]);
    console.log(result.rows[0]);
    res.json(result.rows);
} catch (error) {
    console.error("Error fetching doctor details:", error);
    res.status(500).json({ error: "Internal server error" });
}
});
app.post('/bookapp', async (req, res) => {
  try {
      
      const { values, id, email } = req.body;
      const { appointmentDate, appointmentTime, condition, procedure, conditionDescription, firstName, dateOfBirth, gender, phoneNumber } = values;

      const appointmentCount = await db.query('SELECT COUNT(*) FROM appointment_slots WHERE appointment_date = $1 AND appointment_time = $2', [appointmentDate, appointmentTime]);

      if (appointmentCount >= 20) {
          return res.status(200).send('Slots are filled.');
      }

      const insertQuery = `INSERT INTO appointment_slots (doctor_id, appointment_date, appointment_time, patient_email_id, patient_name, patient_condition, condition_description, procedure, date_of_birth, gender, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
      await db.query(insertQuery, [id, appointmentDate, appointmentTime, email, firstName, condition, conditionDescription, procedure, dateOfBirth, gender, phoneNumber]);

      res.status(201).send('Appointment booked successfully.');
  } catch (error) {
      console.error('Error booking appointment:', error);
      res.status(400).send('Error booking appointment.');
  }
});
app.get('/getappointment', async (req, res) => {
  try {
    console.log(req.query.email);
    const result = await db.query('SELECT * FROM appointment_slots where patient_email_id=$1',[req.query.email]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/cancelappointment', async (req, res) => {
  try {
    const { id } = req.body;
    const query = 'DELETE FROM appointment_slots WHERE id = $1';
    await db.query(query, [id]);
    res.status(200).send('Appointment canceled successfully.');
  } catch (error) {
    console.error('Error canceling appointment:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/api/adddoctor', async (req, res) => {
  const {
    name,
    specialisation,
    experience,
    qualification,
    fees,
    known_languages,
    available_time_slots,
    working_days,
    department,
    description,
    image_url,
    achievements,
    honors,
    awards,
    working_history,
    email_id
  } = req.body;

  try {

    const insertQuery = `
      INSERT INTO doctor_details 
      (name, specialisation, experience, qualification, fees, known_languages, available_time_slots, working_days, department, description, image_url, achievements, honors, awards, working_history, email_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    `;

    const insertValues = [
      name,
      specialisation,
      experience,
      qualification,
      fees,
      known_languages,
      available_time_slots,
      working_days,
      department,
      description,
      image_url,
      achievements,
      honors,
      awards,
      working_history,
      email_id
    ];

    await db.query(insertQuery, insertValues);

    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
