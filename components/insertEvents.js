var noflo = require('noflo');
const moment = require('moment');

var _todayDate = moment(new Date()).format("YYYY-MM-DD");

var r = require('rethinkdbdash')({
    servers: [
        {host: 'localhost', port: 28015}
    ],
	db: "Octa"
});


exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'insertEvents';
  c.icon = 'toggle-right';
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
    // Read packets we need to process
    var data = input.getData('in');
    console.log(data.employeeID);
    r.table("AxtraxEvents").filter(r.row('employeeID')
      .eq(data.employeeID))
      .run().then(function(result){
          if(result.length > 0 ){
              var _index = result[0].id;
              r.table("AxtraxEvents").get(_index).update(
                 { "AxtraxRecords": r.row("AxtraxRecords").default([]).append(data) }
              );
          }//if
      })
    
    // Process data and send output
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};
