var noflo = require('noflo');
var r = require('rethinkdbdash')({
    servers: [
        {host: 'localhost', port: 28015}
    ],
	db: "Octa"
});

exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'dos';
  c.icon = 'address-book';
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
    if(data != null) {
    	console.log(">> : " + data.AutoNum);
    	// Process data and send output
    }
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};
