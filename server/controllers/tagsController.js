const Tag = require('../models/tagsModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllTags = catchAsync(async (req, res, next) => {
  const { category } = req.query;
  if (!category) return next(new AppError('Please provide a category', 400));

  const tags = await Tag.find({ category });
  res.status(200).json({
    status: 'success',
    results: tags.length,
    data: {
      tags
    }
  });
});

exports.createTag = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  let tag = await Tag.findOne({ name });
  if (tag) {
    res.status(400).json({
      status: 'fail',
      message: 'Tag already exists'
    });
  }
  tag = await Tag.create({
    name, userID: _id
  });
  res.status(201).json({
    status: 'success',
    data: {
      tag
    }
  });
});

exports.deleteTag = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) return next(new AppError('No tag found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: null
  });
});
