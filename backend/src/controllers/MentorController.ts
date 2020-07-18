/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import MentorModel from '../models/Mentor';
import SkillModel, { Skill } from '../models/Skill';
import UserModel from '../models/User';
import { Day } from '../utils/enum';
// import Mentor from '../models/Mentor';
// import Tech from '../models/Tech';
// import User from '../models/User';
// import mail from '../utils/mail';

class MentorController {
  // async index(req, res) {
  //   const { decoded } = req;

  //   if (!await User.findOne({ _id: decoded.id })) {
  //     return res.status(404).json({
  //       error: 'User not found',
  //     });
  //   }

  //   if (!req.query.tech) {
  //     return res.status(400).json({
  //       error: 'Tech paramater expected',
  //     });
  //   }

  //   const tech = await Tech.findOne({
  //     description: req.query.tech,
  //   });

  //   if (!tech) {
  //     return res.status(404).json({
  //       error: 'Tech not found',
  //     });
  //   }

  //   const mentors = await Mentor.find().where('skills.tech').equals(tech._id).populate('user_id')
  //     .populate('skills.tech');

  //   if (mentors.length == 0) {
  //     return res.status(404).json({
  //       error: 'No mentors found for given paramater',
  //     });
  //   }

  //   return res.json(mentors);
  // };

  // async show(req, res) {
  //   const { decoded } = req;

  //   const mentor = await Mentor.findOne({ user_id: decoded.id });

  //   if (!mentor || !(await User.findById(decoded.id))) {
  //     return res.status(404).json({
  //       error: 'User not found',
  //     });
  //   }

  //   await mentor.populate('user_id').populate('skills.tech').execPopulate();

  //   return res.json(mentor);
  // },

  async store(request: Request, response: Response): Promise<Response<any>> {
    const mentorData = request.body;
    const { filename } = request.file;

    try {
      if (!mentorData.availableDays) {
        throw new TypeError('availableDays is undefined');
      }

      if (!mentorData.skills) {
        throw new TypeError('skills is undefined');
      }

      const user = await UserModel.create({
        ...mentorData,
        access: 'JEDI',
        avatar: filename,
      });

      const availableDays: Day[] = mentorData.availableDays
        .split(',')
        .map((day: string) => Day[
          day.trim().toUpperCase() as keyof typeof Day
        ]);

      const skills: [] = mentorData.skills.split(';').map(
        (info: string) => ({
          mentorUserId: user._id,
          tech: info.split(',')[0],
          price: info.split(',')[1],
        }),
      );

      const serializedSkills = (await SkillModel.create(skills)).map((skill) => skill._id);

      const serializedMentorData = {
        userId: user._id,
        availableDays,
        skills: serializedSkills,
      };

      const mentor = await MentorModel.create(serializedMentorData);

      console.log(mentor);

      return response.json(mentor);
    } catch (error) {
      const { name, message, ...err } = error;
      return response.status(400).json({ name, message, ...err });
    }
    // let user = await User.findOne({ email });

    // if (!user) {
    //   user = await User.create({
    //     ...req.body,
    //     access: 'MENTOR',
    //     avatar: filename,
    //   });
    // }

    // let mentor = await Mentor.findOne({ user_id: user._id });

    // if (mentor) {
    //   return res.status(400).json({
    //     error: 'Mentor already exists',
    //   });
    // }

    // const availableAt = req.body.availableOn.split(',');
    // const skills = req.body.skills.split(';').map(
    //   (info) => ({
    //     tech: info.split(',')[0],
    //     price: info.split(',')[1],
    //   }),
    // );

    // const data = {
    //   ...req.body,
    //   availableAt,
    //   skills,
    // };

    // try {
    //   mentor = await Mentor.create({
    //     user_id: user._id,
    //     skills,
    //     availableAt,
    //   });
    // } catch (err) {
    //   return res.status(400).json({
    //     error: err.message,
    //   });
    // }

    // await mentor.populate('user_id').populate('skills.tech').execPopulate();

    // mail.send('welcome', user);

    return response.json({});
  };
};

export default MentorController;
