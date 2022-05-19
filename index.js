const atlasCuster = '<replace_with_your_cluster_name>';
const sendGridKey = 'replace_with_your_send_grid_key'

exports = async function(event){
  const sendgrid = require('@sendgrid/mail');
  sendgrid.setApiKey(sendGridKey);
  const {fullDocument, ns} = event;
  const {templateId, to = [], templateData} = fullDocument;
  const { db, coll } = ns;
  const collection = context.services.get(atlasCuster).db(db).collection(coll);

  try{
    const msg= {
      from: 'My email <email@example.com>',
      templateId,
      personalizations: [
        {
          to: to.map(x => ({email:x})), // type of 'to': string[]
          dynamicTemplateData: templateData
        },
      ],
    };
    const sentResponse = await sendgrid.send(msg);
    
    collection.updateOne({_id:fullDocument._id}, {$set:{
      sent:true,
      sentAt: new Date(),
      sentResponse
    }})
    
  } catch(err){
    console.error(err);
    collection.updateOne({_id:fullDocument._id}, {$set:{
      error:true,
      errorDetails: err
    }})
  }
};
