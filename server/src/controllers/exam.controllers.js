import { User } from "../models/users.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import mongoose from "mongoose"
import { Exam } from "../models/exam.model.js";
import cron from "node-cron";
import nodemailer from "nodemailer";
import { searchGemini } from "../utils/geminiSearch.js";

const createExam = asyncHandler(async(req, res) => {
   try {
    const {examName} = req.body
    if(!examName) {
        throw new apiError(400, "write the exam name")
    }

    const examExist = await Exam.findOne({examName : examName})
     
    if(examExist){
        return res
               .status(200)
               .json(new apiResponse(200, examExist, "exam name already there new exam" ))
    }

    const exam = await Exam.create(
        {
            examName : examName,
            owner : req.user?._id
        }
    )
    return res.status(200).json(new apiResponse(200, exam, "new exam name registered"))
        
    } catch (error) {
        throw new apiError(error , "unable to create database")
    }
})

let notificationJob = null;

const sendUserNotifications = asyncHandler(async (req, res) => {
    try {
        // Get userId from req.user (assuming authentication middleware sets req.user)
        const userId = req.user?._id;
        if (!userId) throw new apiError(400, "User ID not found in request");

        // Get user with email only
        const user = await User.findById(userId).select("email");
        console.log(user);
        if (!user) throw new apiError(404, "User not found");

        // Get all exams owned by the user
        const exams = await Exam.find({ owner: userId });
        console.log(exams);
        const examNames = exams.map(exam => exam.examName);
        console.log(examNames);
        let notifications = [];
        for (const examName of examNames) {
            const result = await searchGemini(examName);
            notifications.push({ exam: examName, details: result });
        }
        console.log(notifications);

        // Setup nodemailer transporter (use the same config as in index.js)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Compose mail and change this "to" to user.email now is only for testing purpose.
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: "kratosgow895@gmail.com",
            subject: "Your Exam Notifications",
            text: notifications.map(n => `${n.exam}:\n${n.details}`).join("\n\n")
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json(new apiResponse(200, notifications, "Notifications sent"));
    } catch (error) {
        console.log(error);
        throw new apiError(500, error.message || "Unable to send notifications");
    }
});

const startNotificationJob = asyncHandler(async (req, res) => {
    if (notificationJob) {
         console.log("chron job has been implemented sucessfully");
        return res.status(400).json(new apiResponse(400, null, "Notification job already running"));
    }
    //.schedule schedules the chron job this will run at 5pm daily untill not stopped
    notificationJob = cron.schedule("0 0 * * *", () => {
        sendUserNotifications();
    });
    return res.status(200).json(new apiResponse(200, null, "Notification job started"));
});

const stopNotificationJob = asyncHandler(async (req, res) => {
    if (notificationJob) {
        console.log("chron job stopped sucessfully")
        //.stop helps in stopping chrnjob
        notificationJob.stop();
        notificationJob = null;
        return res.status(200).json(new apiResponse(200, null, "Notification job stopped"));
    }
    return res.status(400).json(new apiResponse(400, null, "No active notification job"));
});

export {
    createExam,
    sendUserNotifications,
    startNotificationJob,
    stopNotificationJob
}