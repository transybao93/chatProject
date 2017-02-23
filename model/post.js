/**
 * Mongoose Schema
 */
var postSchema = mongoose.Schema({
  pTitle: { type: String, trim: true, required: true },
  pContent: { type: String, trim: true, required: true },
  pAuthor: { type: String, trim: true, required: true },
  pCreatedAt: { type: Date, default: Date.now },
});
var Post = mongoose.model('Post', postSchema, 'forum');
//insert some data
var post = new Post({
  pTitle: 'Post sample',
  pContent: 'Post sample content',
  pAuthor: 'Tran Sy Bao',
  pCreatedAt: new Date(),
});
// add data to database
post.save(function(err,data){
  if(err)
  {
    console.log('Error: ' + err);
  }else{
    console.log('Saved!');
  }
});