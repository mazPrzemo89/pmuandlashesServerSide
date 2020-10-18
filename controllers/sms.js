const TheSmsWorksApi = require('the-sms-works');

exports.sendSMS = (req, res) => {
  var defaultClient = TheSmsWorksApi.ApiClient.instance;

  // Configure API key authorization: JWT
  var JWT = defaultClient.authentications['JWT'];
  JWT.apiKey = process.env.SMS_TOKEN;
  // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
  JWT.apiKeyPrefix = 'JWT';

  var apiInstance = new TheSmsWorksApi.MessagesApi();

  var smsMessage = new TheSmsWorksApi.Message(); // Message | Message properties

  smsMessage.sender = 'Your_company'
  smsMessage.destination = req.body.destination
  smsMessage.content = req.body.content


  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      res.json({
        message: 'SMS sent'
      })
    }
  };
  apiInstance.sendMessage(smsMessage, callback);
}

exports.scheduleSMS = (req, res) => {
  let day = req.body.day
  let month = req.body.month
  let year = req.body.year
  let scheduleDate;

  if (day === '01') {
    scheduleDate = new Date(year, parseInt(month) - 1, 0, 15, 00)
  } else {
    scheduleDate = new Date(year, parseInt(month) - 1, parseInt(day) - 1, 15, 00)
  }
  var defaultClient = TheSmsWorksApi.ApiClient.instance;

  // Configure API key authorization: JWT
  var JWT = defaultClient.authentications['JWT'];
  JWT.apiKey = process.env.SMS_TOKEN;
  // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
  JWT.apiKeyPrefix = 'JWT';

  var apiInstance = new TheSmsWorksApi.MessagesApi();

  var smsMessage = new TheSmsWorksApi.Message(); // Message | Message properties

  smsMessage.sender = 'Your_Company'
  smsMessage.destination = req.body.destination
  smsMessage.content = req.body.content
  smsMessage.schedule = scheduleDate

  var callback = function (error, data, response) {
    if (error) {
      console.error(error);
    } else {
      res.json({
        message: 'SMS sent'
      })
    }
  };
  if (scheduleDate > new Date()) {
    apiInstance.scheduleMessage(smsMessage, callback);
  }

}