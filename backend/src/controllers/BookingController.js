const { Booking, User, Mentor, Tech } = require('../models/index');

module.exports = {
  async index(req, res) {
    const { decoded } = req;
    const { description } = req.query;

    const userId = decoded.id;
    const userAccess = decoded.access;

    const response = {
      bookings: [],
      status: 200,
      error: []
    }

    let techId = null;
    let user = null;
    let filter = null;

    await User.findById(userId)
      .then(data => {
        if(!data) {
          response.status = 404;
          response.error.push('User not found');
        }
        else {
          user = data;
        }
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally();

    if(user && (userAccess === 'JEDI')) {
      await Mentor.findOne({ userId: userId })
        .then(mentor => {
          if(!mentor) {
            response.status = 404;
            response.error.push('Mentor not found');
          }
          else {
            filter = { jediId: mentor._id };
          }
        })
        .catch(err => {
          console.log(err);

          response.status = 400;
          response.error.push(err.message);
        })
        .finally();
    }
    else if(user && (userAccess === 'PADAWAN')) {
      filter = { padawanId: userId }
    }

    if(description) {
      await Tech.findOne({ description })
        .then(tech => {
          if(tech) {
            techId = tech._id;
          }
          else {
            response.status = 404;
            response.error.push('Tech not found');
          }
        })
        .catch(err => {
          console.log(err);

          response.status = 400;
          response.error.push(err.message);
        })
        .finally(_ => {
          filter = {
            ...filter,
            techId
          }
        });
    }

    await Booking.find(filter)
      .populate('techId')
      .populate('padawanId')
      .populate({
        path: 'jediId',
        populate: {
          path: 'userId'
        }
      })
      .populate('updatedBy')
      .then(bookings => {
        response.bookings = bookings;
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally();

    return res.status(response.status).json(response);
  },

  async store(req, res) {
    const { decoded } = req;
    const { jediId, techId, date } = req.body
    const padawanId = decoded.id;

    const body = {
      ...req.body,
      updatedBy: padawanId,
      padawanId
    };

    const response = {
      booking: {},
      status: 201,
      error: []
    }

    let padawan = null;
    let jedi = null;
    let jediIsAvailable = true;
    let tech = null;

    await User.findById(padawanId)
      .then(user => {
        if (!user) {
          response.status = 404;
          response.error.push('User not found');
        }
        else {
          padawan = user;
        }
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally();

    await Mentor.findById(jediId)
      .then(mentor => {
        if(!mentor) {
          response.status = 404;
          response.error.push('Mentor not found');
        }
        else {
          jedi = mentor;
        }
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally();

    await Tech.findById(techId)
      .then(data => {
        if(!data) {
          response.status = 404;
          response.error.push('Tech not found');
        }
        else {
          tech = data;
        }
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally();

    if(jedi && padawan && tech) {
      await Booking.findOne({ date, jediId })
        .then(booking => {
          if(booking) {
            response.status = 400;
            response.error.push('The jedi master is not available at this date');

            jediIsAvailable = false;
          }
        })
        .catch(err => {
          console.log(err);

          response.status = 400;
          response.error.push(err.message);
        })
        .finally();

      if(jediIsAvailable) {
        await Booking.create(body)
          .then(async booking => {
            await booking
              .populate('techId')
              .populate('padawanId')
              .populate({
                path: 'jediId',
                populate: {
                  path: 'userId'
                }
              })
              .execPopulate();

            response.booking = booking;
          })
          .catch(err => {
            console.log(err);

            response.status = 400;
            response.error.push(err.message);
          })
          .finally();
      }
    }

    return res.status(response.status).json(response);
  },

  async update(req, res) {
    const { decoded } = req;
    const { bookingId } = req.params;

    const userId = decoded.id;

    const response = {
      booking: {},
      status: 201,
      error: []
    }

    let user = null;

    const filter = { _id: bookingId };
    const update = { ...req.body, updatedBy: userId };
    const options = { new: true };

    await User.findById(userId)
      .then(data => {
        if(!data) {
          response.status = 404;
          response.error.push('User not found');
        }
        else {
          user = data;
        }
      })
      .catch(err => {
        console.log(err);

        response.status = 400;
        response.error.push(err.message);
      })
      .finally();

    if(user) {
      await Booking.findByIdAndUpdate(filter, update, options)
      .populate('techId')
      .populate('padawanId')
      .populate({
        path: 'jediId',
        populate: {
          path: 'userId'
        }
      })
      .then(booking => {
        if(!booking) {
          response.status = 404;
          response.error.push('Booking not found');
        }
        else {
          response.booking = booking;
        }
      })
      .catch(err => {
        response.status - 400;
        response.error.push(err.message);
      })
      .finally();
    }


    return res.status(response.status).json(response);
  }
}