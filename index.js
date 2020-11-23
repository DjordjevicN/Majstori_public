
const bcrypt = require('bcrypt')
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const saltRounds = 10;
// ADD npm i node-geo da uzima adrese od usera

const port = process.env.PORT || 3001
// ******************* 
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'majstori'
})
//connect
db.connect((err) => {
    if (err) {
        throw err

    }
    console.log('SQL CONNECTED WOOHOO');
});
const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// *********************************************************
// GET ALL USERS
app.get('/profile', (req, res) => {
    let sql = `SELECT * FROM user`
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results)

    })
})
// UPDATE USER PROFILE
app.post('/updateUser', (req, res) => {
    let { id, firstName, lastName, address, email, password, aboutMe, phoneNumber, avatar, updated_at } = req.body.value;

    let sql = `UPDATE user SET 
    firstName ='${firstName}' ,
    lastName = '${lastName}',
    address="${address}",
    email="${email}",
    password="${password}",
    aboutMe="${aboutMe}",
    phoneNumber="${phoneNumber}",
    avatar="${avatar}",
    updated_at="${updated_at}"
     WHERE id = ${id}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to update user' })
            throw err
        };
        res.send({ results, notification: 'User Updated' })
    })
})
// UPDATE USER PROFILE CREDIT
app.post('/updateUsersCredit', (req, res) => {
    let { credit, id } = req.body.value;

    let sql = `UPDATE user SET 
    credit ='${credit}'
     WHERE id = ${id}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to update user' })
            throw err
        };
        res.send({ results, notification: 'User Updated' })
    })
})
// DELETE PROFILE
app.get('/deleteUser/:id', (req, res) => {
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to delete user' })
            throw err
        };
        res.send({ results, notification: 'User Deleted' })
    })
})
// GET PROFILE BY ID
app.get('/getUserById/:id', (req, res) => {
    let sql = `SELECT * FROM user WHERE id = '${req.params.id}'`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to find user' })
            throw err
        };
        res.send({ results, notification: 'Refresh' })
    })
})
// GET FULL PROFILE BY ID
app.get('/getFullProfileById/:id', (req, res) => {
    let sql = `SELECT * FROM services JOIN user ON user.id = services.User_id AND  user.id = '${req.params.id}'`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to find user' })
            throw err
        };
        res.send({ results, notification: 'Refresh' })
    })
})
// GET PROFILE WITH FILTER by category display on services after search
app.post('/getSearchServices', (req, res) => {
    const { category, page } = req.body.value;
    let sql = `SELECT * FROM services INNER JOIN user ON services.User_id = user.id WHERE services.serviceCategory='${category}' ORDER BY service_ID DESC LIMIT 5 OFFSET ${page}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to search' })
            throw err
        };
        res.send({ results, notification: 'Search completed' })
    })
})
// CREATE SERVICES
app.post('/createNewService', (req, res) => {
    const { serviceCategory, servicePrice, serviceDescription, User_id } = req.body.value
    let post = { serviceCategory, servicePrice, serviceDescription, User_id };
    let sql = 'INSERT INTO services SET ?'
    let query = db.query(sql, post, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to create Service' })
            throw err
        };
        res.send({ results, notification: 'Service Created' })
    })
})
// GET SERVICE BY USERS ID || MY SERVICES
app.get('/getServices/:id', (req, res) => {
    let sql = `SELECT * FROM services WHERE User_id = '${req.params.id}';`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'There are no Services found' })
            throw err
        };
        res.send({ results, notification: 'New services are in' })
    })
})
// DELETE SERVICES
app.get('/deleteService/:id', (req, res) => {
    let sql = `DELETE FROM Services WHERE service_ID = ${req.params.id}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to remove service' })
            throw err
        };
        res.send({ results, notification: 'Service Removed' })
    })
})
// CREATE TASK
app.post('/createTask', (req, res) => {
    let { taskCategory,
        taskTitle,
        taskPrice,
        taskDescription,
        taskAddress,
        taskLatitude,
        taskLongitude,
        taskStartTime,
        taskEndTime,
        taskStartDate,
        taskEndDate,
        taskCreated_at,
        User_id } = req.body.value
    let post = {
        taskCategory,
        taskTitle,
        taskPrice,
        taskDescription,
        taskAddress,
        taskLatitude,
        taskLongitude,
        taskStartTime,
        taskEndTime,
        taskStartDate,
        taskEndDate,
        taskCreated_at,
        User_id
    }
    let sql = 'INSERT INTO task SET ?'
    let query = db.query(sql, post, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to create Task' })
            throw err
        };
        res.send({ results, notification: 'Task Created' })
    })
})
// GET MY TASKS
app.get('/getMyTasks/:id', (req, res) => {
    let sql = `SELECT * FROM task WHERE User_id = '${req.params.id}';`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'There are no Tasks found' })
            throw err
        };
        res.send({ results, notification: 'New tasks are in' })
    })
})
// DELETE TASK
app.get('/deleteTask/:id', (req, res) => {
    let sql = `DELETE FROM task WHERE task_ID = ${req.params.id}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to remove service' })
            throw err
        };
        res.send({ results, notification: 'Service Removed' })
    })
})
// GET NEWEST TASKS
app.get('/getNewestTasks', (req, res) => {
    let sql = `SELECT * FROM task ORDER BY task_ID DESC LIMIT 5`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to load tasks' })
            throw err
        };
        res.send({ results, notification: 'Tasks loaded' })
    })
})
// GET TASK WITH FILTER and  LIMIT TO LAST 10 
app.post('/getFilteredTasks', (req, res) => {
    const { category, page } = req.body.value;
    let sql = `SELECT * FROM task WHERE taskCategory = '${category}' ORDER BY task_ID DESC LIMIT 10 OFFSET ${page}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to load tasks' })
            throw err
        };
        res.send({ results, notification: 'Tasks loaded' })
    })
})
// GET TASK LATEST 10 
app.get('/getLatestTasks', (req, res) => {
    let sql = `SELECT * FROM task ORDER BY task_ID DESC LIMIT 5`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to load tasks' })
            throw err
        };
        res.send({ results, notification: 'Tasks loaded' })
    })
})
// GET TASK PAGE and USER
app.get('/getTaskById/:id', (req, res) => {
    let sql = `SELECT * FROM task JOIN user ON  task_ID = '${req.params.id}' AND user.id = task.User_id`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to find user' })
            throw err
        };
        res.send({ results, notification: 'Refresh' })
    })
})
// UPDATE TASK
// CREATE TASK_OFFER
app.post('/sendOffer', (req, res) => {
    let { offerMessage,
        offerPrice,
        offerCreated_at,
        offerApproved,
        Task_User_id,
        Task_task_ID,
        User_id } = req.body.value

    let post = {
        offerMessage,
        offerPrice,
        offerApproved,
        offerCreated_at,
        Task_User_id,
        Task_task_ID,
        User_id
    }
    let sql = 'INSERT INTO offer SET ?'
    let query = db.query(sql, post, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to create Task' })
            throw err
        };
        res.send({ results, notification: 'Task Created' })
    })
})
// GET TASK_OFFER FOR MY ID
app.get('/getMyOffers/:id', (req, res) => {

    let sql = `SELECT * FROM offer JOIN user ON user.id = offer.User_id AND  offer.Task_User_id = '${req.params.id}' JOIN task ON task_ID = offer.Task_task_ID`

    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'There are no new offers' })
            throw err
        };
        res.send({ results, notification: 'New offers are in' })
    })
})
// GET TASK_OFFER PROPOSALS FOR MY ID
app.get('/getMyProposals/:id', (req, res) => {
    let sql = `SELECT * FROM offer JOIN user ON '${req.params.id}' = offer.User_id AND  offer.Task_User_id = user.id JOIN task ON task_ID = offer.Task_task_ID`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'There are no new offers' })
            throw err
        };
        res.send({ results, notification: 'New offers are in' })
    })
})
// // APPROVE PROPOSAL
app.post('/approveProposal', (req, res) => {
    let { offer_ID, offerApproved } = req.body.value;
    let sql = `UPDATE offer SET offerApproved ='${offerApproved}' WHERE offer_ID = ${offer_ID}`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to update Proposal' })
            throw err
        };
        res.send({ results, notification: 'Proposal Updated' })
    })
})
// DELETE TASK_OFFER THAT I OWN

// ********* TO DO **********

// CREATE ADMIN_LOG => 

// SEND NEWS
app.post('/sendNews', (req, res) => {

    let { newsTitle, newsMessage, newsCreated_at } = req.body.value.news
    console.log(newsTitle, newsMessage, newsCreated_at);
    let post = { newsTitle, newsMessage, newsCreated_at };
    let sql = 'INSERT INTO news SET ?'
    let query = db.query(sql, post, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to create Service' })
            throw err
        };
        res.send({ results, notification: 'Service Created' })
    })
})


//GET ALL NEWS
app.get('/getNews', (req, res) => {
    let sql = `SELECT * FROM news ORDER BY newsId DESC`
    let query = db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'There are no new news' })
            throw err
        };
        res.send({ results, notification: 'New News are in' })
    })
})


// GET PROFILE by email and password || LOGIN ||
app.post('/loginUser', (req, res) => {
    const { email, password } = req.body.value
    let sql = `SELECT * FROM user WHERE email = '${email}'`
    let query = db.query(sql, async (err, results) => {
        if (err) {
            throw err
        } else if (results) {
            // let match = true
            let match = await bcrypt.compare(password, results[0].password) || password
            if (match) {
                res.send({ results, notification: 'User Logged in' })
            }
        }
    })
})
//CREATE NEW USER AKA SIGNUP
app.post('/adduser', async (req, res) => {
    let { firstName, email, password, credit, taskerRank, taskerVipStatus, tasker, verified, created_at } = req.body.newUser;
    // hash the password
    let newPassword = await bcrypt.hash(password, saltRounds)
    let sql = `INSERT INTO user SET 
    firstName="${firstName}",
    email="${email}",
    password="${newPassword}",
    credit="${credit}",
    tasker="${tasker}",
    taskerRank="${taskerRank}",
    taskerVipStatus="${taskerVipStatus}",
    verified="${verified}",
    created_at="${created_at}"`
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.send({ notification: 'Fail to create Service' })
            throw err
        };
        res.send({ results, notification: 'Service Created' })
    })
})



app.listen(port, () => {
    console.log(`Listening on ${port}`);
})