const noflo = require('noflo');
const sql = require('mssql')

 var config = {
    user: 'octa',
    password: 'octa204!',
    server: '192.168.100.107', 
    database: 'Veritrax5' 
};

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'uno';
  c.icon = '500px';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Packet to forward'
  });
  c.outPorts.add('out', {
    datatype: 'all'
  });
  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasData('in')) {
      return;
    }
    console.log("-->");
    
    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query('SELECT * FROM Veritrax5.dbo.tblEvents')
        }).then(result => {
          let rows = result.recordset
          
          sql.close();
        }).catch(err => {

          sql.close();
        });
      });
      
    // Read packets we need to process
    const data = input.getData('in');
  	console.log(rows[1]);
    // Process data and send output
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};
