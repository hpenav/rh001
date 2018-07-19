var noflo = require('noflo');
const sql = require('mssql')
var dateFormat = require('dateformat');

var date = dateFormat(new Date(), "yyyy-mm-dd");
var date1 = date + " 00:00:00";
var date2 = date + " 23:59:59";
var queryStr = "SELECT * FROM Veritrax5.dbo.tblEvents where "; //dEvent_Date between '" + date1 + "' and '"  + date2 + "'"; 


console.log(date1);
console.log(date2); 
console.log(queryStr);

var config = {
    user: 'octa',
    password: 'octa204!',
    server: '192.168.100.107', 
    database: 'Veritrax5' 
};

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
    
    const pool1 = new sql.ConnectionPool(config, err => {

      pool1.request() // or: new sql.Request(pool1)
        .query(queryStr, (err, result) => {
        	if(err){
            	console.log(err);
                pool1.close();
            }

            console.log(result.recordset[1]);
            pool1.close();

        })
        .on('done', result => {
        	
            pool1.close();
        })
    });
    
 
    pool1.on('error', err => {
        console.log("error>> " + err);
    })

    // Read packets we need to process
    var data = input.getData('in');
    // Process data and send output
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};
