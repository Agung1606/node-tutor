const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
    const job = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ job, count: job.length });
}

const getJob = async (req, res) => {
    // const { id: jobId } = req.params;
    // const { userId } = req.user;
    const {
        params: { id: jobId },
        user: { userId }
    } = req;

    const job = await Job.findOne(
        {
            _id: jobId,
            createdBy: userId
        }
    );

    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
    // req.body.company = 'Tokopedia';
    // req.body.position = 'Fullstack Web Developer';
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
    // const { id: jobId } = req.params;
    // const { userId } = req.user;
    const {
        params: { id: jobId },
        user: { userId },
        body: { company, position }
    } = req;

    if(company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty');
    }

    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );

    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {
    // const { id: jobId } = req.params;
    // const { userId } = req.user;
    const {
        params: { id: jobId },
        user: { userId }
    } = req;

    const job = await Job.findByIdAndRemove(
        {
            _id: jobId,
            createdBy: userId
        }
    );

    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }

    res.status(StatusCodes.OK).send();
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}