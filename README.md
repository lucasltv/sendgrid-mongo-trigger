# sendgrid-mongo-trigger
MongoDB trigger to send emails via SENDGRID node API. 

- Zero dependencies
- Zero cloud dependency (AWS event bridge, Azure, GCP, etc).
- Just copy and paste this code in your MongoDB Atlas Trigger.
- The cheapest way to send emails: sendgrid has a forever free plan.
- The easiest way to send one or more emails: ```db.inserOne({to:["test@test.com.br"], templateId: "<sendgrid_template_id>", templateData: {xpto:1}]})``` (insertMany works too)
- Sendgrid use handlebars to render your custom template data into html template.

1. Copy and paste the ```index.js``` file content to your Atlas Realm Function
2. Replace with your send grid key
3. Create a new trigger with "insert" event for your desired collection (ie: emails)
4. Test creating some dynamic template in your send grid account (https://mc.sendgrid.com/dynamic-templates)
