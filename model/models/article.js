
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ArticleSchema = new Schema(
  {
    ArticleID: { type: String, unique: true },
    Author: { type: String },
    Title: { type: String },
    Description: { type: String },
    Thumbnail: { type: String },
    Status: { type: String },
    KeyWords: [String],
    Details: [{
        SubTitle: { type: String },
        Content: { type: String },
    }],
    ExternalLinks: [{
        Platform: { type: String },
        Link: { type: String },
    }],
    IssueDate: { type: Date },
    CreateDate: { type: Date },
  }
)

module.exports = mongoose.model('articles', ArticleSchema);
