var noflo = require('noflo');
const sql = require('mssql')
var moment = require('moment');

var date = moment(new Date()).format("YYYY-MM-DD");
var date1 = date + " 00:00:00";
var date2 = date + " 23:59:59";
var queryStr = "SELECT * FROM Veritrax5.dbo.tblEvents where dEvent_Date between '" + date1 + "' and '"  + date2 + "' and iReader = 1"; 

var config = {
    user: 'octa',
    password: 'octa204!',
    server: '192.168.100.107', 
    database: 'Veritrax5' 
};

var resultData = null;

exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'sql';
  c.icon = 'android';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Packet to forward'
  });
  c.outPorts.add('out', {
    datatype: 'all'
  });
  c.process(function (input, output) {
    // Check preconditions on input data
    if (!input.hasData('in')) {
      return;
    }
    
    try{
      const pool1 = new sql.ConnectionPool(config, err => {

        pool1.request() // or: new sql.Request(pool1)
          .query(queryStr, (err, result) => {
          
          	  try{
                if(err){
                    console.log(err);
                    pool1.close();
                }

                resultData = result.recordset;
                pool1.close();
              }
          	  catch(err){
                console.log(err.message);
                pool1.close();
          	  }
          

              if(resultData == null)
                 return;
          
          	  console.log(resultData[1]);
              console.log(resultData[1].dEvent_Date);
              var d1 = moment(new Date(resultData[1].dEvent_Date);
                              console.log(">>>>>>>");
              console.log(d1);
          
          	  var date1 = new Date(resultData[1].dEvent_Date);
              var date2 = new Date(resultData[0].dEvent_Date);                     
              if(resultData[1].dEvent_Date > resultData[0].dEvent_Date ){
                  console.log("is later date..." + date1 - date2);
              }

          
              var data = null;;
          	  for(var k=0; k<resultData.length; k++){
                 data = resultData[k]; 
                 console.log(k  + ": " + data.AutoNum);
                
                 // Process data and send output
                 output.send({
                     out: data
                 });
                
                 // Deactivate
              	 output.done();
              }//for

          })//query

      });//pool1
    }
    catch(err){
    	cosole.log(err.message);
    }
    
  });
  return c;
};