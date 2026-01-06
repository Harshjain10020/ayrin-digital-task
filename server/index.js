
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());


function readSubmissions() {
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function writeSubmissions(submissions) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
}


function validateSubmission(body) {
    const errors = {};
    const { name, email, subject, message } = body;


    if (!name || name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }


    if (!email) {
        errors.email = 'Email is required';
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Invalid email format';
        }
    }


    const allowedSubjects = [
        'General Inquiry',
        'Technical Support',
        'Feedback',
        'Partnership',
        'Other',
    ];
    if (!subject) {
        errors.subject = 'Subject is required';
    } else if (!allowedSubjects.includes(subject)) {
        errors.subject = 'Invalid subject';
    }


    if (!message || message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }

    return errors;
}


app.post('/api/contact', (req, res) => {
    const errors = validateSubmission(req.body);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    const submissions = readSubmissions();

    const newSubmission = {
        id: submissions.length ? submissions[submissions.length - 1].id + 1 : 1,
        name: req.body.name.trim(),
        email: req.body.email.trim(),
        subject: req.body.subject,
        message: req.body.message.trim(),
        createdAt: new Date().toISOString(),
    };

    submissions.push(newSubmission);
    writeSubmissions(submissions);

    return res.status(201).json({
        id: newSubmission.id,
        message: 'Thank you for your message!',
    });
});


app.get('/api/contact', (req, res) => {
    const submissions = readSubmissions();
    res.status(200).json({ submissions });
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
