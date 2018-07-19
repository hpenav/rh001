var noflo = require('noflo');
const sql = require('mssql')
var dateFormat = require('dateformat');

var date = dateFormat(new Date(), "yyyy-mm-dd");
var date1 = date + " 00:00:00";
var date2 = date + " 23:59:59";
var queryStr = "SELECT * FROM Veritrax5.dbo.tblEvents where dEvent_Date between '" + date1 + "' and '"  + date2 + "'"; 

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
    console.log("-->");
    
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
                console.log(resultData);
                pool1.close();
              }
          	  catch(err){
                console.log(err.message);
                pool1.close();
          	  }
          

 
    
             if(resultData == null)
               return;
             else{
 				var data = resultData;
                console.log("---------");
    		    console.log(resultData[1]);
                
               
               // Process data and send output
               output.send({
                     out: data[1];
               });
               // Deactivate
               output.done();
              }//if
          
          })//query

      });//pool1
    }
    catch(err){
    	cosole.log(err.message);
    }
    
    
    
  });
  return c;
};
